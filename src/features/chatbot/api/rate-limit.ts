import "server-only";

// Rate limiter in-memory (per IP): dua lapis —
//   1. Sliding window per menit (cegah burst/spam sesaat).
//   2. Plafon harian berbasis "kredit" (cegah satu IP menguras kuota AI seharian).
//
// Model kredit: tiap permintaan yang diterima memakai BASE_COST kredit di depan.
// Jawaban Gemini menambah kredit EKSTRA sebanding panjangnya (via chargeAnswerCost,
// dipanggil SETELAH jawaban selesai). Efeknya: jawaban panjang "berbiaya" lebih
// besar terhadap jatah harian, jadi pengguna yang meminta jawaban panjang lebih
// cepat kena batas — sementara pertanyaan pendek/FAQ tetap murah.
//
// Cukup untuk deployment single Node server (kasus SMANSA saat ini). Untuk
// deployment multi-instance/serverless, ganti dengan penyimpanan bersama
// (mis. Redis/Upstash).
//
// Catatan: plafon global (lintas-IP) ditangani terpisah oleh budget.ts. Limiter
// ini mencegah SATU pengunjung menghabiskan kuota untuk yang lain.

type Bucket = {
  count: number; // permintaan dalam window menit berjalan
  resetAt: number; // akhir window menit
  dayCredits: number; // kredit terpakai dalam hari berjalan (WITA)
  dayKey: string; // penanda hari WITA
};

const buckets = new Map<string, Bucket>();

/** Ambil integer dari env dengan nilai default (abaikan nilai non-positif/invalid). */
function envInt(name: string, fallback: number): number {
  const parsed = Number(process.env[name]);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

const WINDOW_MS = 60_000; // 1 menit
// Batas burst per menit per IP.
const MAX_PER_WINDOW = envInt("CHAT_RL_WINDOW_MAX", 4);
// Jatah kredit harian per IP.
const DAILY_CREDITS = envInt("CHAT_RL_DAILY_CREDITS", 30);
// Biaya dasar tiap permintaan yang diterima (dipungut di depan).
const BASE_COST = envInt("CHAT_RL_BASE_COST", 1);
// Berapa karakter jawaban Gemini setara 1 kredit ekstra.
const CHARS_PER_CREDIT = envInt("CHAT_RL_CHARS_PER_CREDIT", 400);
// Batas atas kredit ekstra dari satu jawaban (cegah satu jawaban menguras jatah).
const MAX_ANSWER_COST = envInt("CHAT_RL_MAX_ANSWER_COST", 10);

export interface RateLimitResult {
  ok: boolean;
  retryAfter: number; // detik
}

/** Tanggal (YYYY-MM-DD) menurut WITA/UTC+8. */
function witaDayKey(): string {
  return new Date(Date.now() + 8 * 3_600_000).toISOString().slice(0, 10);
}

/** Detik tersisa sampai tengah malam WITA (untuk Retry-After plafon harian). */
function secondsUntilWitaMidnight(): number {
  const witaNow = Date.now() + 8 * 3_600_000;
  const msIntoDay = witaNow % 86_400_000;
  return Math.ceil((86_400_000 - msIntoDay) / 1000);
}

export function rateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  const today = witaDayKey();

  // Bersihkan sesekali agar map tidak tumbuh tanpa batas.
  if (buckets.size > 1000) {
    for (const [key, value] of buckets) {
      if (now >= value.resetAt && value.dayKey !== today) buckets.delete(key);
    }
  }

  let bucket = buckets.get(ip);

  // Inisialisasi / reset harian.
  if (!bucket || bucket.dayKey !== today) {
    bucket = { count: 0, resetAt: now + WINDOW_MS, dayCredits: 0, dayKey: today };
    buckets.set(ip, bucket);
  }

  // 1. Plafon harian (berbasis kredit).
  if (bucket.dayCredits >= DAILY_CREDITS) {
    return { ok: false, retryAfter: secondsUntilWitaMidnight() };
  }

  // 2. Sliding window per menit.
  if (now >= bucket.resetAt) {
    bucket.count = 0;
    bucket.resetAt = now + WINDOW_MS;
  }
  if (bucket.count >= MAX_PER_WINDOW) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  // Pungut biaya dasar di depan.
  bucket.count += 1;
  bucket.dayCredits += BASE_COST;
  return { ok: true, retryAfter: 0 };
}

/**
 * Bebankan kredit EKSTRA untuk satu jawaban Gemini, sebanding panjangnya.
 * Panggil SETELAH jawaban selesai disusun — jalur FAQ/cache tidak memanggil ini,
 * jadi jawaban murah tetap murah. Kredit yang menumpuk membuat permintaan
 * BERIKUTNYA dari IP itu lebih cepat menyentuh plafon harian.
 */
export function chargeAnswerCost(ip: string, answerChars: number): void {
  const bucket = buckets.get(ip);
  // Bucket bisa hilang bila hari berganti / ter-evict di tengah permintaan → lewati.
  if (!bucket || bucket.dayKey !== witaDayKey()) return;
  const extra = Math.min(
    MAX_ANSWER_COST,
    Math.ceil(Math.max(0, answerChars) / CHARS_PER_CREDIT),
  );
  bucket.dayCredits += extra;
}
