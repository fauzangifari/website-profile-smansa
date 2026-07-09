import type { SearchEntry } from "@/features/search/data/search-index";

const MAX_RESULTS = 12;
const MAX_SUGGESTIONS = 8;

function matchText(entry: SearchEntry): string {
  return [entry.title, entry.description, ...(entry.keywords ?? [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

/**
 * Filter index secara case-insensitive terhadap judul, deskripsi, dan keyword.
 * Query kosong → kembalikan sebagian halaman sebagai saran awal.
 * Ranking: judul yang diawali query didahulukan dari yang sekadar mengandungnya.
 */
export function filterSearch(
  query: string,
  entries: SearchEntry[],
): SearchEntry[] {
  const q = query.trim().toLowerCase();

  if (!q) {
    return entries
      .filter((entry) => entry.group === "Halaman")
      .slice(0, MAX_SUGGESTIONS);
  }

  const matches = entries.filter((entry) => matchText(entry).includes(q));

  matches.sort((a, b) => {
    const aStarts = a.title.toLowerCase().startsWith(q) ? 0 : 1;
    const bStarts = b.title.toLowerCase().startsWith(q) ? 0 : 1;
    if (aStarts !== bStarts) return aStarts - bStarts;
    return a.title.localeCompare(b.title);
  });

  return matches.slice(0, MAX_RESULTS);
}
