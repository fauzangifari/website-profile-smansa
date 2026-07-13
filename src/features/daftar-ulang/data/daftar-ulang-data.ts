// Data Daftar Ulang SMAN 1 Samarinda.
//
// File PLAIN (tanpa import @phosphor-icons/react) agar bisa dipakai halaman
// (client) dan Knowledge Base chatbot (server). Ikon disimpan sebagai string.

export const daftarUlangSchedule = {
  tanggal: "6–8 Juli 2026",
  waktu: "08.00–13.00 WITA",
} as const;

export type DaftarUlangRequirement = {
  title: string;
  description: string;
  /** Nama ikon Phosphor (di-resolve lewat ICON_MAP di komponen). */
  iconName: "FileText" | "CheckCircle";
  downloadLabel?: string;
  downloadHref?: string;
  externalLink?: string;
  externalLinkLabel?: string;
};

export const daftarUlangRequirements: DaftarUlangRequirement[] = [
  {
    title: "Surat Keterangan Bebas Narkoba",
    description:
      "Opsional pada saat daftar ulang, namun wajib diserahkan paling lambat satu bulan setelah daftar ulang.",
    iconName: "FileText",
  },
  {
    title: "Surat Pernyataan Keaslian Berkas SPMB",
    description: "Wajib diisi, ditandatangani, dan diserahkan.",
    iconName: "FileText",
    downloadLabel: "Unduh Template",
    downloadHref: "/documents/surat-pernyataan-keaslian-berkas.docx",
  },
  {
    title: "Surat Pernyataan Mematuhi Tata Tertib Sekolah",
    description: "Tata tertib dapat dilihat di halaman Tata Tertib SMANSA.",
    iconName: "FileText",
    downloadLabel: "Unduh Template",
    downloadHref: "/documents/surat-pernyataan-mematuhi-tata-tertib.docx",
    externalLink: "/tata-tertib",
    externalLinkLabel: "Lihat Tata Tertib",
  },
  {
    title: "Bukti Formulir Daftar Ulang",
    description:
      "Telah mengisi formulir daftar ulang online melalui portal SIMS.",
    iconName: "CheckCircle",
    externalLink: "https://sims.sman1samarinda.sch.id/enrollment",
    externalLinkLabel: "Isi Formulir Online",
  },
];

export type DaftarUlangAdditional = {
  title: string;
  description: string;
};

export const daftarUlangAdditional: DaftarUlangAdditional[] = [
  {
    title: "Hadir Secara Langsung",
    description:
      "Calon peserta didik wajib hadir secara langsung saat proses daftar ulang (tidak boleh diwakilkan sepenuhnya).",
  },
  {
    title: "Warna Map Pemberkasan",
    description:
      "Membawa map berwarna merah untuk peserta didik laki-laki dan map berwarna biru untuk peserta didik perempuan.",
  },
];

export const daftarUlangWarning =
  "Calon peserta didik yang tidak melakukan daftar ulang sesuai jadwal yang telah ditentukan akan dianggap mengundurkan diri dan tidak dinyatakan sebagai peserta didik SMA Negeri 1 Samarinda.";
