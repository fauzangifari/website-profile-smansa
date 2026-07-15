// Data Struktur Organisasi SMAN 1 Samarinda.
//
// File PLAIN (tanpa import @phosphor-icons/react) agar bisa dipakai baik oleh
// halaman (client) maupun Knowledge Base chatbot (server). Ikon mapel disimpan
// sebagai nama string; komponen me-resolve-nya lewat ICON_MAP lokal.

export type OrgGroup = "kepala" | "waka" | "koordinator";

export type OrgMember = {
  role: string;
  name: string;
  nip: string;
  rank: string;
  group: OrgGroup;
  /** Ringkasan tugas/tanggung jawab (dipakai chatbot; halaman boleh mengabaikan). */
  description: string;
};

export const orgMembers: OrgMember[] = [
  {
    role: "Plt. KEPALA SEKOLAH",
    name: "Syawal Arifin, S.S., M.Pd.",
    nip: "NIP 198202012011011003",
    rank: "Penata Tingkat I",
    group: "kepala",
    description:
      "Memimpin pengelolaan sekolah, penyelenggaraan pendidikan, pembinaan sivitas akademika, dan hubungan dengan alumni.",
  },
  {
    role: "WAKA KURIKULUM",
    name: "Aniek Widajanti, M.Pd.",
    nip: "NIP 196802101988112001",
    rank: "Pembina Tingkat I, IV/b",
    group: "waka",
    description:
      "Mengelola pembinaan, pengawasan, serta pengembangan kurikulum sekolah.",
  },
  {
    role: "WAKA HUMAS",
    name: "Hermawati, S.Pd.",
    nip: "NIP 197311202000122002",
    rank: "Pembina Tingkat I, IV/b",
    group: "waka",
    description:
      "Mengelola komunikasi dan kerja sama sekolah dengan pihak eksternal.",
  },
  {
    role: "WAKA SARPRAS",
    name: "Ali Mursid, S.Pd., M.Pd.",
    nip: "NIP 197004181994011002",
    rank: "Pembina Utama Muda, IV/c",
    group: "waka",
    description:
      "Mengelola fasilitas dan infrastruktur untuk mendukung kegiatan operasional sekolah.",
  },
  {
    role: "WAKA KESISWAAN",
    name: "Syodiqul Huda, S.Pd., M.Pd.",
    nip: "NIP 198012032005021007",
    rank: "Penata Tingkat I, III/d",
    group: "waka",
    description:
      "Mengelola pembinaan, pengawasan, pengembangan ekstrakurikuler, dan kesejahteraan siswa.",
  },
  {
    role: "KOORDINATOR TAS",
    name: "Khusnul Sugiarto, S.M.",
    nip: "NIPPPK 199502162025211013",
    rank: "Operator Layanan Operasional",
    group: "koordinator",
    description:
      "Mengelola perencanaan, pelaksanaan, dan evaluasi layanan administrasi sekolah.",
  },
  {
    role: "BENDAHARA",
    name: "Chairunisa Puspanegara, S.Pd.",
    nip: "NIPPPK 198411042025212021",
    rank: "Pengadministrasi Perkantoran",
    group: "koordinator",
    description:
      "Mengelola perencanaan, pelaksanaan, dan pelaporan keuangan sekolah.",
  },
  {
    role: "KOORDINATOR PERPUSTAKAAN",
    name: "Bagus Baskoro K.R., S.Pd.",
    nip: "NIPPPK 199212142022211006",
    rank: "Guru Ahli Pertama",
    group: "koordinator",
    description:
      "Mengelola layanan perpustakaan sebagai pusat literasi dan sumber belajar sekolah.",
  },
  {
    role: "KEPALA LABORATORIUM",
    name: "Mila Susan Shofiani, S.Pd.",
    nip: "NIPPPK 199505032023212021",
    rank: "Guru Ahli Pertama",
    group: "koordinator",
    description:
      "Mengelola layanan laboratorium sebagai pusat sumber belajar sekolah.",
  },
];

export type MataPelajaran = {
  name: string;
  /** Nama ikon Phosphor (di-resolve lewat ICON_MAP di komponen). */
  iconName: string;
};

export const mataPelajaran: MataPelajaran[] = [
  { name: "Pendidikan Agama Islam", iconName: "MoonStars" },
  { name: "Pendidikan Agama Kristen", iconName: "Cross" },
  { name: "Pendidikan Agama Katholik", iconName: "Church" },
  { name: "Pendidikan Agama Hindu", iconName: "HandsPraying" },
  { name: "Pendidikan Pancasila dan Kewarganegaraan", iconName: "FlagBanner" },
  { name: "Bahasa Indonesia", iconName: "BookOpen" },
  { name: "Bahasa Inggris", iconName: "Translate" },
  { name: "Bahasa Jerman", iconName: "Chat" },
  { name: "Matematika", iconName: "MathOperations" },
  { name: "Sejarah", iconName: "Scroll" },
  { name: "Pendidikan Jasmani, Olahraga, dan Kesehatan", iconName: "SoccerBall" },
  { name: "Seni Budaya", iconName: "Palette" },
  { name: "Prakarya dan Kewirausahaan", iconName: "Wrench" },
  { name: "Informatika", iconName: "Laptop" },
  { name: "Fisika", iconName: "Atom" },
  { name: "Kimia", iconName: "Flask" },
  { name: "Biologi", iconName: "Dna" },
  { name: "Geografi", iconName: "GlobeHemisphereWest" },
  { name: "Sosiologi", iconName: "UsersThree" },
  { name: "Ekonomi", iconName: "Coins" },
  { name: "Bimbingan Konseling", iconName: "Compass" },
];
