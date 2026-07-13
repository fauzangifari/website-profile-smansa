import "server-only";

// Layer 2 — cache jawaban Gemini per-pertanyaan (in-memory, single Node server).
//
// Kunci = pertanyaan TERAKHIR yang dinormalisasi (bukan seluruh history) agar
// hit-rate tinggi saat banyak orang menanyakan hal serupa dan menghindari
// "poisoning" oleh konteks percakapan yang berbeda-beda.
//
// TTL disamakan dengan TTL Knowledge Base (30 menit) supaya jawaban di cache
// tidak lebih basi dari data sumbernya.

const TTL_MS = 30 * 60 * 1000; // 30 menit — selaras TTL knowledge-base.ts
const MAX_ENTRIES = 500;

type Entry = { answer: string; at: number };

const cache = new Map<string, Entry>();

/** Normalisasi ringan: lowercase, buang tanda baca, rapatkan spasi. */
export function normalizeQuestion(question: string): string {
  return question
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // buang diakritik (combining marks)
    .replace(/[^a-z0-9\s]/g, " ") // buang tanda baca
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Topik yang jawabannya berubah-ubah (berita/prestasi/agenda terbaru) TIDAK
 * boleh di-cache agar tidak menyajikan info basi.
 */
export function isCacheable(question: string): boolean {
  const q = normalizeQuestion(question);
  if (!q) return false;
  const volatile = ["berita", "terbaru", "terkini", "prestasi", "agenda", "juara", "lomba"];
  return !volatile.some((word) => q.includes(word));
}

export function getCached(key: string): string | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.at >= TTL_MS) {
    cache.delete(key);
    return null;
  }
  // Segarkan urutan (LRU): hapus lalu set ulang → jadi paling baru dipakai.
  cache.delete(key);
  cache.set(key, entry);
  return entry.answer;
}

export function setCached(key: string, answer: string): void {
  if (!key || !answer.trim()) return;
  cache.delete(key);
  cache.set(key, { answer, at: Date.now() });
  // Evict entri paling lama dipakai bila melebihi kapasitas.
  while (cache.size > MAX_ENTRIES) {
    const oldest = cache.keys().next().value;
    if (oldest === undefined) break;
    cache.delete(oldest);
  }
}
