import "server-only";

// Rate limiter in-memory (per IP): dua lapis —
//   1. Sliding window per menit (cegah burst/spam sesaat).
//   2. Plafon harian (cegah satu IP menguras kuota AI seharian).
//
// Cukup untuk deployment single Node server (kasus SMANSA saat ini). Untuk
// deployment multi-instance/serverless, ganti dengan penyimpanan bersama
// (mis. Redis/Upstash).
//
// Catatan: plafon global (lintas-IP) ditangani terpisah oleh budget.ts. Limiter
// ini mencegah SATU pengunjung menghabiskan kuota untuk yang lain.

type Bucket = {
  count: number; // dalam window menit berjalan
  resetAt: number; // akhir window menit
  dayCount: number; // dalam hari berjalan (WITA)
  dayKey: string; // penanda hari WITA
};

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 60_000; // 1 menit
const MAX_PER_WINDOW = 5; // maksimal 5 pesan / menit / IP
const DAILY_MAX = 40; // maksimal 40 pesan / hari / IP

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
    bucket = { count: 0, resetAt: now + WINDOW_MS, dayCount: 0, dayKey: today };
    buckets.set(ip, bucket);
  }

  // 1. Plafon harian.
  if (bucket.dayCount >= DAILY_MAX) {
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

  bucket.count += 1;
  bucket.dayCount += 1;
  return { ok: true, retryAfter: 0 };
}
