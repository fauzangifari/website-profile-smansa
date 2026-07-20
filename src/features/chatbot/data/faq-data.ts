import "server-only";

// Data FAQ untuk Layer 1 (deflection tanpa panggilan Gemini).
//
// Jawaban WAJIB mengutip konstanta dari modul data existing agar tidak "drift"
// dari sumber kebenaran. Sertakan path halaman (mis. /denah-sekolah) — client
// (`chat-message.tsx`) otomatis mengubahnya jadi tautan yang bisa diklik.
//
// PENTING soal presisi: `mustInclude` adalah gerbang topik — minimal satu kata
// di dalamnya harus muncul di pertanyaan agar entri dipertimbangkan. `keywords`
// menambah skor untuk memilih entri terbaik saat beberapa cocok.

import { siteConfig } from "@/config/site";
import { contactInfo } from "@/features/landing/data/landing-data";
import { daftarUlangSchedule } from "@/features/daftar-ulang/data/daftar-ulang-data";
import { schoolAddress } from "@/features/school-map/data/school-map-data";

const ENROLLMENT_URL = "https://sims.sman1samarinda.sch.id/enrollment";
const org = siteConfig.organization;

export type FaqEntry = {
  id: string;
  /** Gerbang topik: minimal satu harus muncul di pertanyaan. */
  mustInclude: string[];
  /** Kata penambah skor (memilih entri terbaik). */
  keywords: string[];
  /** Ambang skor minimum (default 1). Naikkan untuk entri rawan false-positive. */
  minScore?: number;
  answer: string;
};

export const faqEntries: FaqEntry[] = [
  {
    id: "alamat",
    mustInclude: ["alamat", "lokasi", "letak", "dimana", "peta", "maps"],
    keywords: ["sekolah", "smansa", "denah", "arah", "jalan"],
    answer:
      `Alamat SMA Negeri 1 Samarinda:\n` +
      `${schoolAddress}\n\n` +
      `Lihat denah & area sekolah di /denah-sekolah.`,
  },
  {
    id: "kontak",
    mustInclude: ["kontak", "telepon", "telpon", "telp", "email", "hubungi", "nomor", "wa", "whatsapp"],
    keywords: ["sekolah", "smansa", "admin", "tata", "usaha"],
    answer:
      `Kontak SMA Negeri 1 Samarinda:\n` +
      `- Telepon: ${org.phone}\n` +
      `- Email: ${org.email}\n` +
      `- Jam layanan administrasi: ${contactInfo.hours}`,
  },
  {
    id: "jam",
    mustInclude: ["jam", "pukul", "buka", "tutup", "operasional"],
    keywords: ["masuk", "sekolah", "layanan", "administrasi", "kantor", "tata", "usaha"],
    answer:
      `Jam layanan administrasi SMANSA: ${contactInfo.hours}.\n\n` +
      `Untuk jam kegiatan belajar-mengajar (KBM) siswa, silakan hubungi sekolah langsung di ${org.phone} ya, karena bisa berbeda per jenjang/hari.`,
  },
  {
    id: "berdiri",
    mustInclude: ["berdiri", "sejarah", "kapan", "tahun", "usia", "umur"],
    keywords: ["smansa", "sekolah", "didirikan", "berapa"],
    answer:
      `SMA Negeri 1 Samarinda berdiri pada **14 September 1953** (lebih dari 70 tahun).\n\n` +
      `Selengkapnya di /sejarah.`,
  },
  {
    id: "daftar-ulang",
    mustInclude: ["spmb", "ppdb", "ulang", "registrasi", "pendaftaran", "mendaftar", "enrollment"],
    keywords: ["daftar", "siswa", "baru", "berkas", "syarat", "jadwal", "cara", "formulir"],
    answer:
      `Informasi pendaftaran siswa baru (SPMB) & daftar ulang:\n` +
      `- Jadwal pengumpulan berkas: ${daftarUlangSchedule.tanggal}, pukul ${daftarUlangSchedule.waktu}\n` +
      `- Formulir daftar ulang online: ${ENROLLMENT_URL}\n\n` +
      `Detail syarat & berkas ada di /daftar-ulang.`,
  },
  {
    id: "ekskul",
    mustInclude: ["ekskul", "ekstrakurikuler", "eskul", "eskskul"],
    keywords: ["kegiatan", "klub", "apa", "saja", "daftar", "olahraga", "seni"],
    answer:
      `SMANSA punya banyak ekstrakurikuler — mulai olahraga (Basket, Handball), seni & budaya (Paduan Suara, Tari Tradisional, Teater), teknologi (Digital Creator), hingga keagamaan.\n\n` +
      `Daftar lengkap & terbaru ada di /ekstrakurikuler.`,
  },
  {
    id: "kalender",
    mustInclude: ["kalender", "libur", "agenda", "jadwal"],
    keywords: ["akademik", "semester", "ujian", "kapan", "tahun", "ajaran"],
    minScore: 2,
    answer: `Kalender akademik lengkap (jadwal, agenda, dan hari libur) ada di /kalender-akademik.`,
  },
];

/** Pesan saat kuota AI habis (mode FAQ-only) — bukan pertanyaan umum. */
export const FAQ_ONLY_MESSAGE =
  `Maaf, asisten AI sedang penuh permintaan saat ini. 🙏\n\n` +
  `Sementara itu:\n` +
  `- Info pendaftaran & daftar ulang: /daftar-ulang\n` +
  `- Pertanyaan lain bisa langsung ke sekolah: ${org.phone} atau ${org.email}\n\n` +
  `Coba lagi beberapa saat lagi ya.`;
