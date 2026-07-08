import type {
  BeritaAttachment,
  BeritaCategory,
  BeritaListItem,
} from "@/features/berita/types/berita";

// Berita terurut dari yang terbaru (publishedAt desc).
export const sortByPublishedDesc = (
  list: BeritaListItem[]
): BeritaListItem[] =>
  [...list].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

// Kategori unik yang benar-benar dipakai pada data (untuk pil filter).
export const getBeritaCategories = (
  list: BeritaListItem[]
): BeritaCategory[] => {
  const seen = new Map<string, BeritaCategory>();
  for (const item of list) {
    if (item.category && !seen.has(item.category.slug)) {
      seen.set(item.category.slug, item.category);
    }
  }
  return [...seen.values()];
};

// Berita terkait: kategori sama dulu, dilengkapi item terbaru lain bila kurang.
export const getRelatedBerita = (
  list: BeritaListItem[],
  currentSlug: string,
  limit = 3
): BeritaListItem[] => {
  const sorted = sortByPublishedDesc(list);
  const current = sorted.find((item) => item.slug === currentSlug);
  const others = sorted.filter((item) => item.slug !== currentSlug);
  if (!current) return others.slice(0, limit);

  const sameCategory = others.filter(
    (item) => item.category?.slug === current.category?.slug
  );
  const rest = others.filter(
    (item) => item.category?.slug !== current.category?.slug
  );
  return [...sameCategory, ...rest].slice(0, limit);
};

const tanggalFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const formatTanggal = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return tanggalFormatter.format(date);
};

// --- Lampiran (attachment dokumen) ---------------------------------------

export type BeritaLampiran = {
  label: string; // nama file (di-derive dari URL — API tidak mengirim label)
  url: string;
  ext: string; // "pdf" | "doc" | "docx"
};

const DOC_EXT = ["pdf", "doc", "docx"] as const;

// Ambil nama file dari URL: buang query/hash, decode, ambil segmen terakhir.
const fileNameFromUrl = (url: string): string => {
  try {
    const { pathname } = new URL(url, "http://_");
    const last = pathname.split("/").filter(Boolean).pop() ?? "";
    return decodeURIComponent(last) || url;
  } catch {
    return url;
  }
};

const extFromName = (name: string): string => {
  const clean = name.split(/[?#]/)[0];
  const dot = clean.lastIndexOf(".");
  return dot >= 0 ? clean.slice(dot + 1).toLowerCase() : "";
};

// Attachment dokumen (pdf/doc/docx) untuk kartu "Lampiran".
// Deteksi gabungan: pakai `type` bila cocok, jika tidak jatuh ke ekstensi URL —
// robust terhadap nilai `type` dari API yang belum pasti.
export const getBeritaLampiran = (
  attachments: BeritaAttachment[] = []
): BeritaLampiran[] =>
  attachments
    .map((att) => {
      const label = fileNameFromUrl(att.url);
      const typeExt = att.type?.toLowerCase() ?? "";
      const ext = (DOC_EXT as readonly string[]).includes(typeExt)
        ? typeExt
        : extFromName(label);
      return { label, url: att.url, ext };
    })
    .filter((att) => (DOC_EXT as readonly string[]).includes(att.ext));
