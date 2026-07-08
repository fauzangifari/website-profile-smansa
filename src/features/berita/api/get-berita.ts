import type {
  BeritaDetail,
  BeritaDetailResponse,
  BeritaListItem,
  BeritaListResponse,
} from "@/features/berita/types/berita";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

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

  return data.result;
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

  return data.result;
}
