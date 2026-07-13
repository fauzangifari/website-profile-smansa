import type {
  DirektoriDetailResponse,
  DirektoriKategori,
  DirektoriListResponse,
  DirektoriPerson,
  DirektoriPersonDetail,
} from "@/features/direktori/types/direktori";
import { normalizeMediaUrl } from "@/lib/utils";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

// API publik SIMS menolak limit > 50 (HTTP 400), jadi ambil per halaman ≤ 50.
const PAGE_LIMIT = 50;

/** Peta kategori direktori → segmen resource pada API publik. */
const RESOURCE: Record<DirektoriKategori, string> = {
  guru: "teachers",
  tendik: "staff",
};

const LABEL: Record<DirektoriKategori, string> = {
  guru: "guru",
  tendik: "tenaga kependidikan",
};

/** Objek mentah dari API sebelum dinormalisasi ke tipe kanonik. */
type RawPerson = Record<string, unknown>;

/**
 * Ambil nilai string pertama yang non-kosong dari sederet kemungkinan key.
 * Toleran terhadap perbedaan nama field antar-backend (internal LAN vs publik).
 */
function pick(raw: RawPerson, keys: string[]): string {
  for (const key of keys) {
    const value = raw[key];
    if (typeof value === "string" && value.trim() !== "") return value;
    if (typeof value === "number") return String(value);
  }
  return "";
}

/** Petakan item mentah daftar → DirektoriPerson kanonik. */
function mapPerson(raw: RawPerson): DirektoriPerson {
  return {
    id: pick(raw, ["id", "teacherId", "staffId", "_id", "uuid"]),
    name: pick(raw, ["name", "fullName", "nama", "namaLengkap"]),
    photoUrl:
      normalizeMediaUrl(
        pick(raw, ["photoUrl", "photo", "photo_url", "avatar", "foto"])
      ) ?? "",
  };
}

/** Petakan objek mentah detail → DirektoriPersonDetail kanonik. */
function mapPersonDetail(raw: RawPerson): DirektoriPersonDetail {
  const nip = pick(raw, ["nip", "nipNippppk", "nip_nippppk", "nomorInduk"]);
  return {
    ...mapPerson(raw),
    nip: nip || "-",
    email: pick(raw, ["email", "emailSekolah", "email_sekolah"]),
  };
}

/**
 * Ambil seluruh daftar direktori untuk sebuah kategori. Melakukan paginasi
 * dengan limit ≤ 50 lalu menggabungkan hasilnya (jumlah guru bisa > 50).
 */
export async function getDirektoriList(
  kategori: DirektoriKategori
): Promise<DirektoriPerson[]> {
  const resource = RESOURCE[kategori];
  const collected: DirektoriPerson[] = [];
  let page = 1;

  while (true) {
    const search = new URLSearchParams({
      page: String(page),
      limit: String(PAGE_LIMIT),
    });

    const res = await fetch(
      `${BASE_URL}/api/public/${resource}?${search.toString()}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(
        `Gagal mengambil data ${LABEL[kategori]}: ${res.status} ${res.statusText}`
      );
    }

    const data: DirektoriListResponse = await res.json();

    if (!data.success) {
      throw new Error(data.message ?? "Respons API tidak berhasil");
    }

    const batch = (data.result as RawPerson[]).map(mapPerson);
    collected.push(...batch);

    const total = data.meta?.total;
    const reachedTotal =
      typeof total === "number" && collected.length >= total;

    // Berhenti bila sudah mencapai total, atau batch terakhir tidak penuh.
    if (batch.length < PAGE_LIMIT || reachedTotal) {
      break;
    }

    page += 1;
  }

  // Buang item tanpa id agar link ke halaman detail dijamin valid.
  return collected.filter((person) => person.id !== "");
}

/** Cari satu orang berdasarkan id; `null` bila tidak ditemukan. */
export async function getPersonById(
  kategori: DirektoriKategori,
  id: string
): Promise<DirektoriPersonDetail | null> {
  const resource = RESOURCE[kategori];

  const res = await fetch(
    `${BASE_URL}/api/public/${resource}/${encodeURIComponent(id)}`,
    { cache: "no-store" }
  );

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(
      `Gagal mengambil detail ${LABEL[kategori]}: ${res.status} ${res.statusText}`
    );
  }

  const data: DirektoriDetailResponse = await res.json();

  if (!data.success || !data.result) {
    return null;
  }

  return mapPersonDetail(data.result as RawPerson);
}
