import type { NextRequest } from "next/server";

import { siteConfig } from "@/config/site";
import {
  QuotaExhaustedError,
  isGeminiConfigured,
  streamChatResponse,
} from "@/features/chatbot/api/gemini";
import { getKnowledgeBase } from "@/features/chatbot/api/knowledge-base";
import { rateLimit } from "@/features/chatbot/api/rate-limit";
import { matchFaq } from "@/features/chatbot/api/faq";
import { budgetState, markExhausted, noteGeminiCall } from "@/features/chatbot/api/budget";
import { getCached, isCacheable, normalizeQuestion, setCached } from "@/features/chatbot/api/response-cache";
import { streamString } from "@/features/chatbot/api/stream-string";
import { FAQ_ONLY_MESSAGE } from "@/features/chatbot/data/faq-data";
import type { ChatMessage, ChatRequestBody } from "@/features/chatbot/types/chat";

// SDK @google/genai butuh Node runtime (bukan edge).
export const runtime = "nodejs";

const MAX_MESSAGE_LEN = 1000; // karakter per pesan
const MAX_HISTORY = 12; // pesan terakhir yang dikirim ke model
// Plafon ukuran body. Isi wajar: ~12 pesan × 1000 char ≈ 12 KB; 32 KB memberi
// kelonggaran untuk overhead JSON sambil menolak payload raksasa sebelum di-parse.
const MAX_BODY_BYTES = 32 * 1024;

// Origin/Referer yang diizinkan memanggil endpoint chat. Selain same-origin
// (host sama dengan request), allowlist ini menutup skrip eksternal yang
// menembak endpoint langsung. Override lewat env CHAT_ALLOWED_ORIGINS (koma).
const isDev = process.env.NODE_ENV !== "production";
const ALLOWED_ORIGINS: string[] = (
  process.env.CHAT_ALLOWED_ORIGINS?.split(",").map((s) => s.trim()).filter(Boolean) ?? [
    siteConfig.url,
    ...(isDev ? ["http://localhost:3000", "http://localhost:3001"] : []),
  ]
);

/** Tolak permintaan yang bukan dari situs sendiri (blokir skrip iseng). */
function isAllowedOrigin(req: NextRequest): boolean {
  const host = req.headers.get("host");
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");

  const matchesHost = (value: string): boolean => {
    try {
      return Boolean(host) && new URL(value).host === host;
    } catch {
      return false;
    }
  };
  const inAllowlist = (value: string, prefix = false): boolean =>
    ALLOWED_ORIGINS.some((o) => (prefix ? value.startsWith(o) : value === o));

  if (origin) return matchesHost(origin) || inAllowlist(origin);
  if (referer) return matchesHost(referer) || inAllowlist(referer, true);
  // Keduanya absen → tolak (fetch same-origin browser selalu mengirim Origin).
  return false;
}

/** Ambil IP klien. Asumsi: di belakang satu proxy tepercaya (x-real-ip di-set proxy). */
function getIp(req: NextRequest): string {
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    // Entri KIRI bisa dipalsukan klien; ambil entri paling KANAN (dari proxy).
    const parts = forwarded.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length) return parts[parts.length - 1]!;
  }
  return "unknown";
}

function jsonError(
  message: string,
  status: number,
  extraHeaders?: Record<string, string>,
): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...extraHeaders },
  });
}

/** Validasi & bersihkan body → daftar pesan siap kirim, atau null jika invalid. */
function parseMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object") return null;
  const messages = (body as ChatRequestBody).messages;
  if (!Array.isArray(messages) || messages.length === 0) return null;
  // Batasi iterasi bila Content-Length absen/chunked (kita hanya pakai ~12 pesan
  // terakhir). Menolak array raksasa sebelum loop memproses tiap elemen.
  if (messages.length > 100) return null;

  const cleaned: ChatMessage[] = [];
  for (const item of messages) {
    if (!item || typeof item !== "object") return null;
    const { role, content } = item as ChatMessage;
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string") return null;
    const trimmed = content.trim();
    if (!trimmed) continue;
    cleaned.push({ role, content: trimmed.slice(0, MAX_MESSAGE_LEN) });
  }
  if (!cleaned.length) return null;

  const history = cleaned.slice(-MAX_HISTORY);
  // Pesan terakhir harus dari pengguna.
  if (history[history.length - 1]!.role !== "user") return null;
  return history;
}

export async function POST(req: NextRequest): Promise<Response> {
  // A. Blokir permintaan lintas-origin (skrip iseng menembak endpoint).
  if (!isAllowedOrigin(req)) {
    return jsonError("Permintaan tidak diizinkan.", 403);
  }

  // B & C. Rate limit per IP (burst/menit + plafon harian).
  const limit = rateLimit(getIp(req));
  if (!limit.ok) {
    return jsonError(
      "Maaf, permintaan sedang terlalu banyak. Coba lagi sebentar lagi ya. 🙏",
      429,
      { "Retry-After": String(limit.retryAfter) },
    );
  }

  // D. Pastikan chatbot terkonfigurasi.
  if (!isGeminiConfigured()) {
    return jsonError(
      "Maaf, chatbot belum aktif saat ini. Silakan hubungi sekolah lewat halaman kontak.",
      503,
    );
  }

  // E. Tolak body kelewat besar sebelum di-parse (hemat memori/CPU).
  const contentLength = Number(req.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return jsonError("Permintaan terlalu besar.", 413);
  }

  // F. Parse & validasi input.
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError("Format permintaan tidak valid.", 400);
  }
  const messages = parseMessages(body);
  if (!messages) {
    return jsonError("Pesan tidak valid atau kosong.", 400);
  }
  const lastUser = messages[messages.length - 1]!.content;

  // ── Mulai jalur "sukses selalu 200 text/plain" ──────────────────────────────

  // LAYER 1 — FAQ deflection (tanpa panggilan Gemini).
  const faqAnswer = matchFaq(lastUser);
  if (faqAnswer) return streamString(faqAnswer);

  // LAYER 2 — cache jawaban (tanpa panggilan Gemini).
  const cacheKey = normalizeQuestion(lastUser);
  const cached = getCached(cacheKey);
  if (cached) return streamString(cached);

  // BUDGET GUARD — bila kuota AI (perkiraan) sudah habis, mode FAQ-only.
  if (budgetState() === "exhausted") {
    return streamString(FAQ_ONLY_MESSAGE);
  }

  // Rangkai knowledge base (di-cache di modulnya). Hanya jalur Gemini yang
  // membutuhkannya — FAQ/cache/degradasi di atas tidak menyentuh ini.
  let knowledgeBase: string;
  try {
    knowledgeBase = await getKnowledgeBase();
  } catch {
    return jsonError(
      "Maaf, sedang ada kendala mengambil data sekolah. Coba lagi beberapa saat lagi.",
      500,
    );
  }

  // LAYER 3 — Gemini (dengan rantai fallback model di dalamnya). Setelah stream
  // dimulai, status HTTP tidak bisa diubah, jadi error di tengah dikirim sebagai
  // teks yang sopan.
  noteGeminiCall();
  const encoder = new TextEncoder();
  const canCache = isCacheable(lastUser);
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let acc = "";
      try {
        for await (const chunk of streamChatResponse(messages, knowledgeBase)) {
          acc += chunk;
          controller.enqueue(encoder.encode(chunk));
        }
        if (acc.trim() && canCache) setCached(cacheKey, acc);
      } catch (err) {
        // LAYER 4 — degradasi anggun saat kuota benar-benar habis.
        if (err instanceof QuotaExhaustedError) {
          markExhausted();
          controller.enqueue(
            encoder.encode(acc.trim() ? `\n\n${QUOTA_DEGRADE_TAIL}` : FAQ_ONLY_MESSAGE),
          );
        } else {
          controller.enqueue(
            encoder.encode(
              acc.trim()
                ? "\n\nMaaf, jawaban terputus. Silakan coba lagi sebentar lagi."
                : "Maaf, terjadi kendala saat menyusun jawaban. Silakan coba lagi sebentar lagi.",
            ),
          );
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "X-Accel-Buffering": "no", // cegah buffering oleh Nginx agar stream mengalir
      "Cache-Control": "no-store",
    },
  });
}

const QUOTA_DEGRADE_TAIL =
  "(Maaf, asisten AI sedang penuh permintaan, jawaban mungkin terpotong. Untuk info pendaftaran lihat /daftar-ulang.)";
