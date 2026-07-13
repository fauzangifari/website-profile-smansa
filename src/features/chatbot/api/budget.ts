import "server-only";

// Penjaga anggaran harian GLOBAL untuk panggilan Gemini.
//
// Free-tier Gemini punya batas harian per-project. Alih-alih menunggu error 429
// keras (yang membuat sebagian user gagal), kita hitung sendiri jumlah panggilan
// per hari. Saat mendekati/melewati plafon, route beralih ke "mode FAQ-only"
// secara proaktif sehingga sisa kuota AI dihemat untuk pertanyaan yang benar-benar
// baru, dan bot tetap berguna (menjawab dari FAQ + mengarahkan ke halaman).
//
// State in-memory (cukup untuk single Node server). Reset otomatis tiap ganti
// hari menurut zona WITA (UTC+8), bukan zona server.

const DAILY_BUDGET = Number(process.env.GEMINI_DAILY_BUDGET) || 200;
const NEAR_RATIO = 0.85;

type BudgetStatus = "ok" | "nearLimit" | "exhausted";

let count = 0;
let hardExhausted = false; // di-set saat Gemini benar-benar balas 429
let dayKey = "";

/** Tanggal (YYYY-MM-DD) menurut WITA/UTC+8 — tanpa DST, stabil. */
function witaDayKey(): string {
  return new Date(Date.now() + 8 * 3_600_000).toISOString().slice(0, 10);
}

function rollIfNewDay(): void {
  const today = witaDayKey();
  if (today !== dayKey) {
    dayKey = today;
    count = 0;
    hardExhausted = false;
  }
}

export function budgetState(): BudgetStatus {
  rollIfNewDay();
  if (hardExhausted || count >= DAILY_BUDGET) return "exhausted";
  if (count >= DAILY_BUDGET * NEAR_RATIO) return "nearLimit";
  return "ok";
}

/** Catat satu panggilan Gemini. Panggil SEBELUM memanggil model. */
export function noteGeminiCall(): void {
  rollIfNewDay();
  count += 1;
}

/** Tandai kuota benar-benar habis (dipicu saat model membalas 429). */
export function markExhausted(): void {
  rollIfNewDay();
  hardExhausted = true;
}
