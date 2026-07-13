// Tipe data Direktori Guru & Tenaga Kependidikan (Tendik) SMAN 1 Samarinda.
//
// Mengikuti envelope API publik SIMS. File PLAIN (tanpa import @phosphor-icons/react
// atau komponen client) agar aman diimpor baik oleh Server Component (halaman/route)
// maupun helper server.

export type DirektoriKategori = "guru" | "tendik";

/** Item daftar direktori (GET /api/public/teachers | /api/public/staff). */
export type DirektoriPerson = {
  /** Identitas unik & stabil dari API; dipakai sebagai key rute detail. */
  id: string;
  /** Nama lengkap beserta gelar. */
  name: string;
  /** URL foto (sudah dinormalisasi). Kosong ("") → memakai fallback inisial. */
  photoUrl: string;
};

/** Detail direktori (GET /api/public/teachers/{id} | /api/public/staff/{id}). */
export type DirektoriPersonDetail = DirektoriPerson & {
  /** NIP/NIPPPK; bisa "-" atau kosong bila tidak ada. */
  nip: string;
  /** Email sekolah. */
  email: string;
};

/** Metadata paginasi standar envelope API publik SIMS. */
export type DirektoriMeta = {
  page?: number;
  limit?: number;
  total?: number;
};

/** Envelope respons daftar direktori. */
export type DirektoriListResponse = {
  success: boolean;
  message: string;
  meta: DirektoriMeta;
  errors: unknown[];
  result: DirektoriPerson[];
};

/** Envelope respons detail direktori. */
export type DirektoriDetailResponse = {
  success: boolean;
  message: string;
  meta: DirektoriMeta;
  errors: unknown[];
  result: DirektoriPersonDetail;
};
