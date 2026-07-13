import type {
  BeritaDetail,
  BeritaDetailResponse,
  BeritaListItem,
  BeritaListResponse,
} from "@/features/berita/types/berita";
import { normalizeMediaUrl } from "@/lib/utils";
import { sanitizeCmsHtml } from "@/lib/sanitize-html";
import { placeholderImages } from "@/features/landing/data/landing-data";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

// Cover dari API bisa kosong ("") atau punya double-slash yang memicu 403 CDN.
// Normalisasi + fallback placeholder agar next/image tak pernah menerima "".
function withCover<T extends { coverImageUrl: string }>(item: T): T {
  return {
    ...item,
    coverImageUrl: normalizeMediaUrl(item.coverImageUrl) ?? placeholderImages.news,
  };
}

export async function getBeritaList(params?: {
  page?: number;
  limit?: number;
}): Promise<BeritaListItem[]> {
  const search = new URLSearchParams();
  if (params?.page) search.set("page", String(params.page));
  if (params?.limit) search.set("limit", String(params.limit));
  const qs = search.toString();

  const res = await fetch(
    `${BASE_URL}/api/public/posts${qs ? `?${qs}` : ""}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(
      `Gagal mengambil data berita: ${res.status} ${res.statusText}`
    );
  }

  const data: BeritaListResponse = await res.json();

  if (!data.success) {
    throw new Error(data.message ?? "Respons API tidak berhasil");
  }

  return data.result.map(withCover);
}

export async function getBeritaBySlug(
  slug: string
): Promise<BeritaDetail | null> {
  const res = await fetch(
    `${BASE_URL}/api/public/posts/${encodeURIComponent(slug)}`,
    { cache: "no-store" }
  );

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(
      `Gagal mengambil detail berita: ${res.status} ${res.statusText}`
    );
  }

  const data: BeritaDetailResponse = await res.json();

  if (!data.success || !data.result) {
    return null;
  }

  // Sanitasi HTML CMS sebelum sampai ke komponen (anti stored-XSS).
  return withCover({
    ...data.result,
    contentHtml: sanitizeCmsHtml(data.result.contentHtml),
  });
}
