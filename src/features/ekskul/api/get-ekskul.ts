import type {
  ExtracurricularDetail,
  ExtracurricularDetailResponse,
  ExtracurricularListItem,
  ExtracurricularListResponse,
} from "@/features/ekskul/types/ekskul-detail";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export async function getEkstrakurikulerList(params?: {
  page?: number;
  limit?: number;
}): Promise<ExtracurricularListItem[]> {
  const search = new URLSearchParams();
  if (params?.page) search.set("page", String(params.page));
  if (params?.limit) search.set("limit", String(params.limit));
  const qs = search.toString();

  const res = await fetch(
    `${BASE_URL}/api/public/extracurriculars${qs ? `?${qs}` : ""}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(
      `Gagal mengambil data ekstrakurikuler: ${res.status} ${res.statusText}`
    );
  }

  const data: ExtracurricularListResponse = await res.json();

  if (!data.success) {
    throw new Error(data.message ?? "Respons API tidak berhasil");
  }

  return data.result;
}

export async function getEkstrakurikulerBySlug(
  slug: string
): Promise<ExtracurricularDetail | null> {
  const res = await fetch(
    `${BASE_URL}/api/public/extracurriculars/${encodeURIComponent(slug)}`,
    { cache: "no-store" }
  );

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(
      `Gagal mengambil detail ekstrakurikuler: ${res.status} ${res.statusText}`
    );
  }

  const data: ExtracurricularDetailResponse = await res.json();

  if (!data.success || !data.result) {
    return null;
  }

  return data.result;
}
