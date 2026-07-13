import "server-only";

import { GoogleGenAI } from "@google/genai";

import { buildSystemInstruction } from "@/features/chatbot/data/system-prompt";
import type { ChatMessage } from "@/features/chatbot/types/chat";

// Model termurah/tercepat tier "flash-lite" yang tersedia untuk API key baru.
// (gemini-2.5-flash-lite sudah di-gate untuk pengguna baru.) Ganti lewat env
// GEMINI_MODEL bila perlu, mis. "gemini-flash-lite-latest" atau "gemini-2.5-flash".
const DEFAULT_MODEL = "gemini-3.1-flash-lite";
// Model cadangan: dipakai bila model utama kena kuota (429). Karena batas
// free-tier bersifat per-model, model cadangan punya "ember" kuota terpisah.
const DEFAULT_FALLBACK_MODEL = "gemini-3.1-flash";

/** Dilempar bila SEMUA model dalam rantai kehabisan kuota (429). */
export class QuotaExhaustedError extends Error {
  constructor(options?: { cause?: unknown }) {
    super("Gemini quota exhausted", options);
    this.name = "QuotaExhaustedError";
  }
}

/** Deteksi error kuota/limit dari @google/genai (bentuknya bervariasi antar versi). */
function isQuotaError(err: unknown): boolean {
  const e = err as { status?: number; code?: number; response?: { status?: number }; message?: string };
  const status = e?.status ?? e?.code ?? e?.response?.status;
  if (status === 429) return true;
  return /RESOURCE_EXHAUSTED|quota|rate limit|too many requests|429/i.test(String(e?.message ?? ""));
}

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

let client: GoogleGenAI | null = null;

/** True jika API key Gemini tersedia (dipakai route untuk gagal cepat + sopan). */
export function isGeminiConfigured(): boolean {
  return Boolean(process.env.GEMINI_API_KEY);
}

function getClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY belum diset di environment server.");
  }
  if (!client) {
    client = new GoogleGenAI({ apiKey });
  }
  return client;
}

/**
 * Stream jawaban Gemini sebagai potongan teks.
 *
 * `knowledgeBase` menjadi bagian stabil dari systemInstruction (prefix yang
 * di-cache implicit oleh Gemini 2.5). Riwayat percakapan dipetakan ke format
 * Gemini (assistant → "model").
 */
export async function* streamChatResponse(
  messages: ChatMessage[],
  knowledgeBase: string,
): AsyncGenerator<string> {
  // Hook uji: paksa kondisi "kuota habis" tanpa benar-benar menghabiskan kuota.
  if (process.env.CHAT_FORCE_QUOTA === "1") {
    throw new QuotaExhaustedError();
  }

  const ai = getClient();
  const today = dateFormatter.format(new Date());

  const contents = messages.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }],
  }));

  const config = {
    systemInstruction: buildSystemInstruction(knowledgeBase, today),
    temperature: 0.3,
    maxOutputTokens: 1024,
    // Tanya-jawab grounded tidak butuh reasoning bertahap; matikan "thinking"
    // agar lebih cepat, hemat token, dan seluruh output jadi jawaban.
    thinkingConfig: { thinkingBudget: 0 },
  };

  // Rantai model: utama → cadangan. Model cadangan punya kuota harian terpisah.
  const primary = process.env.GEMINI_MODEL || DEFAULT_MODEL;
  const fallback = process.env.GEMINI_MODEL_FALLBACK || DEFAULT_FALLBACK_MODEL;
  const chain = fallback && fallback !== primary ? [primary, fallback] : [primary];

  let yieldedAny = false;
  let lastErr: unknown;

  for (const model of chain) {
    try {
      const stream = await ai.models.generateContentStream({ model, contents, config });
      for await (const chunk of stream) {
        const text = chunk.text;
        if (text) {
          yieldedAny = true;
          yield text;
        }
      }
      return; // sukses
    } catch (err) {
      lastErr = err;
      // Hanya boleh pindah model bila BELUM ada output (stream tak bisa ditarik
      // ulang). Error 429 hampir selalu terjadi sebelum chunk pertama.
      if (isQuotaError(err) && !yieldedAny) continue;
      if (isQuotaError(err)) throw new QuotaExhaustedError({ cause: err });
      throw err; // error non-kuota → teruskan apa adanya
    }
  }

  // Seluruh rantai kehabisan kuota.
  throw new QuotaExhaustedError({ cause: lastErr });
}
