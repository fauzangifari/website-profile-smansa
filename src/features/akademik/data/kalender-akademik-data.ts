// ─── Kalender Akademik SMAN 1 Samarinda ───────────────────────────────────────
// Tahun Ajaran 2026/2027

export type EventType = "libur" | "ujian" | "kegiatan" | "raport" | "masuk";

export type CalendarEvent = {
  id: string;
  startDate: string; // format YYYY-MM-DD
  endDate: string; // format YYYY-MM-DD
  title: string;
  type: EventType;
  colorClass: string;
  icon: string;
};

// Data Statistik
export const kalenderStats = {
  gasal: {
    hariEfektif: 114,
    pekanEfektif: 23,
  },
  genap: {
    hariEfektif: 108,
    pekanEfektif: 24,
  },
  total: {
    hariEfektif: 222,
    pekanEfektif: 47,
  },
};

// Daftar Event Spesifik
export const calendarEvents: CalendarEvent[] = [
  // Semester Gasal
  {
    id: "libur-akhir-tp",
    startDate: "2026-07-01",
    endDate: "2026-07-10",
    title: "Libur Akhir TP 2025/2026",
    type: "libur",
    colorClass: "bg-red-500 text-white border-red-600",
    icon: "Sun",
  },
  {
    id: "mpls",
    startDate: "2026-07-13",
    endDate: "2026-07-15",
    title: "Hari Pertama Masuk / MPLS",
    type: "masuk",
    colorClass: "bg-orange-500 text-white border-orange-600",
    icon: "Flag",
  },
  {
    id: "hut-ri",
    startDate: "2026-08-17",
    endDate: "2026-08-17",
    title: "Hari Kemerdekaan RI",
    type: "libur",
    colorClass: "bg-red-500 text-white border-red-600",
    icon: "FlagBanner",
  },
  {
    id: "pts-gasal",
    startDate: "2026-09-21",
    endDate: "2026-09-26",
    title: "Penilaian Tengah Semester Gasal",
    type: "ujian",
    colorClass: "bg-slate-400 text-white border-slate-500",
    icon: "Exam",
  },
  {
    id: "pembagian-pts",
    startDate: "2026-10-02",
    endDate: "2026-10-02",
    title: "Pembagian Laporan Tengah Semester",
    type: "raport",
    colorClass: "bg-purple-500 text-white border-purple-600",
    icon: "FileText",
  },
  {
    id: "hut-smansa",
    startDate: "2026-10-24",
    endDate: "2026-10-24",
    title: "Perayaan HUT SMANSA ke 73",
    type: "kegiatan",
    colorClass: "bg-yellow-400 text-yellow-900 border-yellow-500",
    icon: "Confetti",
  },
  {
    id: "pas-gasal",
    startDate: "2026-12-01",
    endDate: "2026-12-09",
    title: "Asesmen Sumatif Akhir Semester Gasal",
    type: "ujian",
    colorClass: "bg-purple-600 text-white border-purple-700",
    icon: "Exam",
  },
  {
    id: "pembagian-raport-gasal",
    startDate: "2026-12-18",
    endDate: "2026-12-18",
    title: "Pembagian Raport Semester Gasal",
    type: "raport",
    colorClass: "bg-indigo-600 text-white border-indigo-700",
    icon: "FileText",
  },
  {
    id: "libur-semester-gasal",
    startDate: "2026-12-21",
    endDate: "2026-12-31",
    title: "Libur Semester Gasal",
    type: "libur",
    colorClass: "bg-yellow-300 text-yellow-900 border-yellow-400",
    icon: "Sun",
  },

  // Semester Genap
  {
    id: "masuk-genap",
    startDate: "2027-01-04",
    endDate: "2027-01-04",
    title: "Hari Pertama Masuk Semester Genap",
    type: "masuk",
    colorClass: "bg-orange-500 text-white border-orange-600",
    icon: "Flag",
  },
  {
    id: "libur-awal-puasa",
    startDate: "2027-03-10",
    endDate: "2027-03-12",
    title: "Libur Awal Puasa",
    type: "libur",
    colorClass: "bg-blue-400 text-white border-blue-500",
    icon: "Moon",
  },
  {
    id: "libur-sekitar-hari-raya",
    startDate: "2027-04-06",
    endDate: "2027-04-14",
    title: "Libur Sekitar Hari Raya",
    type: "libur",
    colorClass: "bg-fuchsia-500 text-white border-fuchsia-600",
    icon: "Star",
  },
  {
    id: "asesmen-akhir-satuan",
    startDate: "2027-05-03",
    endDate: "2027-05-10",
    title: "Asesmen Akhir Satuan Pendidikan",
    type: "ujian",
    colorClass: "bg-green-500 text-white border-green-600",
    icon: "Exam",
  },
  {
    id: "pelepasan-kelas-xii",
    startDate: "2027-05-15",
    endDate: "2027-05-15",
    title: "Pelepasan Siswa Kelas XII",
    type: "kegiatan",
    colorClass: "bg-pink-500 text-white border-pink-600",
    icon: "GraduationCap",
  },
  {
    id: "pas-genap",
    startDate: "2027-06-07",
    endDate: "2027-06-15",
    title: "Asesmen Sumatif Akhir Semester Genap",
    type: "ujian",
    colorClass: "bg-purple-600 text-white border-purple-700",
    icon: "Exam",
  },
  {
    id: "pembagian-raport-genap",
    startDate: "2027-06-25",
    endDate: "2027-06-25",
    title: "Pembagian Raport Semester Genap",
    type: "raport",
    colorClass: "bg-indigo-600 text-white border-indigo-700",
    icon: "FileText",
  },
  {
    id: "libur-semester-genap",
    startDate: "2027-06-28",
    endDate: "2027-07-15",
    title: "Libur Semester Genap",
    type: "libur",
    colorClass: "bg-yellow-300 text-yellow-900 border-yellow-400",
    icon: "Sun",
  },
];

// ─── Kategori Legenda ────────────────────────────────────────────────────────
export const kalenderLegends = [
  { label: "Hari Pertama Masuk Sekolah / MPLS", colorClass: "bg-orange-500" },
  { label: "Libur Semester", colorClass: "bg-yellow-300" },
  { label: "Libur Hari Raya & Keagamaan", colorClass: "bg-fuchsia-500" },
  { label: "Libur Awal Puasa", colorClass: "bg-blue-400" },
  { label: "Asesmen Sumatif / Ujian", colorClass: "bg-purple-600" },
  { label: "Asesmen Akhir Satuan Pendidikan", colorClass: "bg-green-500" },
  { label: "Penilaian Tengah Semester", colorClass: "bg-slate-400" },
  { label: "Pembagian Raport", colorClass: "bg-indigo-600" },
  { label: "Pelepasan Siswa Kelas XII", colorClass: "bg-pink-500" },
];
