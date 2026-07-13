import "server-only";

// Layer 1 — pencocokan FAQ berbasis skor kata-kunci (tanpa dependency, tanpa API).
//
// Dipilih ketimbang embeddings karena: embeddings butuh panggilan API (menambah
// beban kuota — kontra-produktif) atau model lokal berat; domain sangat sempit &
// terpola; deterministik & mudah diaudit admin sekolah.
//
// Gagal-aman: bila tak ada entri yang cukup yakin, kembalikan null → biarkan
// Gemini yang menjawab. Salah-diam (null) lebih baik daripada salah-jawab.

import { faqEntries } from "@/features/chatbot/data/faq-data";

const DEFAULT_MIN_SCORE = 1;

// Stopword ID ringan — kata umum yang tak membantu pencocokan topik.
const STOPWORDS = new Set([
  "yang", "di", "ke", "dari", "dan", "atau", "untuk", "pada", "dengan", "ada",
  "apa", "apakah", "adalah", "itu", "ini", "saya", "kamu", "kak", "min", "tolong",
  "mohon", "bisa", "boleh", "mau", "ingin", "nih", "dong", "ya", "sih", "kah",
  "the", "a", "is",
]);

function tokenize(text: string): Set<string> {
  const tokens = text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // buang diakritik (combining marks)
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
  return new Set(tokens);
}

/**
 * Cocokkan pertanyaan dengan FAQ. Kembalikan jawaban (string) bila yakin, atau
 * null bila tidak ada yang cocok.
 */
export function matchFaq(question: string): string | null {
  const tokens = tokenize(question);
  if (tokens.size === 0) return null;

  let best: { score: number; answer: string } | null = null;

  for (const entry of faqEntries) {
    // Gerbang topik: minimal satu kata `mustInclude` harus muncul.
    const gateHits = entry.mustInclude.filter((w) => tokens.has(w)).length;
    if (gateHits === 0) continue;

    const kwHits = entry.keywords.filter((w) => tokens.has(w)).length;
    // Gerbang topik berbobot lebih tinggi daripada kata biasa.
    const score = gateHits * 2 + kwHits;

    if (score < (entry.minScore ?? DEFAULT_MIN_SCORE)) continue;
    if (!best || score > best.score) best = { score, answer: entry.answer };
  }

  return best?.answer ?? null;
}
