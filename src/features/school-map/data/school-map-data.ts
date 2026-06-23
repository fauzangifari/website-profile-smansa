export type SchoolArea = {
  id: string;
  number: number;
  name: string;
  description: string;
  iconName: string;
  accentColor: string;
  badgeColor: string;
  features: string[];
};

export const schoolAreas: SchoolArea[] = [
  {
    id: "gedung-sekolah",
    number: 1,
    name: "Gedung Sekolah",
    description:
      "Gedung utama tempat berlangsungnya kegiatan belajar mengajar. Dilengkapi ruang kelas modern, ruang guru, dan ruang kepala sekolah.",
    iconName: "Buildings",
    accentColor: "from-blue-50/60 to-cyan-50/20",
    badgeColor: "bg-brand-primary-soft text-brand-primary",
    features: [
      "Ruang kelas ber-AC",
      "Ruang kepala sekolah",
      "Ruang guru & tata usaha",
      "Ruang wakil kepala sekolah",
      "Aula serbaguna",
    ],
  },
  {
    id: "gedung-cafetaria",
    number: 2,
    name: "Gedung Cafetaria",
    description:
      "Pusat konsumsi siswa dan warga sekolah. Menyediakan berbagai pilihan makanan dan minuman yang sehat dan terjangkau.",
    iconName: "ForkKnife",
    accentColor: "from-orange-50/60 to-amber-50/20",
    badgeColor: "bg-orange-100 text-orange-700",
    features: [
      "Area makan outdoor & indoor",
      "Kantin sehat tersertifikasi",
      "Koperasi sekolah",
      "Area istirahat siswa",
    ],
  },
  {
    id: "gedung-perpustakaan",
    number: 3,
    name: "Gedung Perpustakaan",
    description:
      "Pusat sumber belajar dan literasi siswa. Koleksi buku lengkap, ruang baca nyaman, dan akses digital untuk mendukung pembelajaran.",
    iconName: "Books",
    accentColor: "from-emerald-50/60 to-teal-50/20",
    badgeColor: "bg-emerald-100 text-emerald-700",
    features: [
      "Koleksi buku teks & referensi",
      "Ruang baca kondusif",
      "Akses internet & e-library",
      "Ruang diskusi kelompok",
    ],
  },
  {
    id: "gedung-osis",
    number: 4,
    name: "Gedung OSIS",
    description:
      "Pusat kegiatan kesiswaan dan organisasi intra sekolah. Tempat siswa berorganisasi, berkarya, dan mengembangkan jiwa kepemimpinan.",
    iconName: "UsersThree",
    accentColor: "from-violet-50/60 to-purple-50/20",
    badgeColor: "bg-violet-100 text-violet-700",
    features: [
      "Sekretariat OSIS & MPK",
      "Ruang ekstrakurikuler",
      "Ruang rapat siswa",
      "Studio kreasi & seni",
    ],
  },
  {
    id: "masjid-ainul-yaqin",
    number: 5,
    name: "Masjid Ainul Yaqin",
    description:
      "Fasilitas ibadah utama warga sekolah. Masjid Ainul Yaqin menjadi pusat kegiatan keagamaan, pembinaan karakter, dan kerohanian siswa.",
    iconName: "MosqueDome",
    accentColor: "from-amber-50/60 to-yellow-50/20",
    badgeColor: "bg-amber-100 text-amber-700",
    features: [
      "Kapasitas besar untuk jamaah",
      "Tempat wudu terpisah putra/putri",
      "Ruang kajian & pembinaan",
      "Perpustakaan Al-Qur'an",
    ],
  },
  {
    id: "gedung-laboratorium",
    number: 6,
    name: "Gedung Laboratorium",
    description:
      "Gedung laboratorium terpadu untuk mendukung pembelajaran sains dan teknologi. Dilengkapi peralatan modern dan standar keamanan tinggi.",
    iconName: "Flask",
    accentColor: "from-cyan-50/60 to-sky-50/20",
    badgeColor: "bg-cyan-100 text-cyan-700",
    features: [
      "Laboratorium Fisika",
      "Laboratorium Kimia",
      "Laboratorium Biologi",
      "Laboratorium Komputer",
      "Laboratorium Multimedia",
    ],
  },
  {
    id: "gedung-auditorium",
    number: 7,
    name: "Gedung Auditorium",
    description:
      "Gedung serbaguna berkapasitas besar untuk kegiatan akademik, pentas seni, wisuda, dan acara besar sekolah. Dilengkapi sistem audio-visual modern.",
    iconName: "MicrophoneStage",
    accentColor: "from-rose-50/60 to-pink-50/20",
    badgeColor: "bg-rose-100 text-rose-700",
    features: [
      "Kapasitas ratusan kursi",
      "Panggung & sistem pencahayaan",
      "Sistem audio-visual profesional",
      "Ruang backstage & persiapan",
    ],
  },
];

export const schoolMapStats = [
  { value: "7", label: "Gedung & Area" },
  { value: "30+", label: "Ruang Kelas" },
  { value: "5", label: "Laboratorium" },
  { value: "5+ Ha", label: "Luas Kampus" },
];

export const schoolAddress =
  "Jl. Drs. H. Anang Hasyim, Air Hitam, Kec. Samarinda Ulu, Kota Samarinda, Kalimantan Timur 75124";

export const googleMapsEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.686858387968!2d117.12754847472344!3d-0.4651170995303201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df67f121c44491d%3A0xdfddab921de5db0!2sSMA%20Negeri%201%20Samarinda!5e0!3m2!1sid!2sid!4v1781099331917!5m2!1sid!2sid";
