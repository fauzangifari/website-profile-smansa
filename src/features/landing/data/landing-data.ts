import type { AssetSlot } from "@/features/landing/types";

export const reasonsData = [
  {
    title: "Prestasi Akademik yang Unggul",
    description:
      "Secara konsisten meraih prestasi di tingkat kota, provinsi, hingga nasional dalam berbagai ajang kompetisi.",
    iconName: "Trophy",
  },
  {
    title: "Tenaga Pendidik Profesional",
    description:
      "Didukung oleh guru-guru berkompeten dan berpengalaman yang menggunakan metode pembelajaran interaktif.",
    iconName: "ChalkboardTeacher",
  },
  {
    title: "Fasilitas Lengkap & Modern",
    description:
      "Ruang kelas nyaman, laboratorium lengkap, perpustakaan digital, serta fasilitas olahraga yang memadai.",
    iconName: "Buildings",
  },
  {
    title: "Lingkungan yang Kondusif",
    description:
      "Suasana belajar yang aman, nyaman, dan disiplin dengan penanaman budaya positif dan karakter kuat.",
    iconName: "ShieldCheck",
  },
  {
    title: "Ekstrakurikuler Beragam",
    description:
      "Berbagai pilihan kegiatan untuk mengembangkan minat, bakat, dan jiwa kepemimpinan siswa di luar kelas.",
    iconName: "Palette",
  },
  {
    title: "Alumni Berprestasi",
    description:
      "Ikatan alumni yang solid dan sukses di berbagai bidang, siap memberikan motivasi dan jaringan luas.",
    iconName: "Student",
  },
];

export const alumniData = [
  {
    name: "Dr. Andi Pratama",
    role: "Direktur RSUD",
    institution: "RSUD A. Wahab Sjahranie",
    angkatan: "2001",
    quote:
      "SMANSA mengajarkan saya bahwa disiplin dan kerja keras bukan hanya nilai—itu adalah fondasi hidup.",
    image: "https://placehold.co/600x800/dbeafe/1e40af.png?text=Andi+Pratama",
  },
  {
    name: "Prof. Budi Santoso",
    role: "Guru Besar",
    institution: "Universitas Mulawarman",
    angkatan: "1998",
    quote:
      "Rasa ingin tahu yang ditanamkan di SMANSA menjadi bahan bakar perjalanan akademik saya hingga hari ini.",
    image: "https://placehold.co/600x800/e0f2fe/0369a1.png?text=Budi+Santoso",
  },
  {
    name: "Ir. Citra Lestari",
    role: "CEO & Co-Founder",
    institution: "Tech Borneo",
    angkatan: "2005",
    quote:
      "Di sinilah saya pertama kali berani bermimpi besar. SMANSA bukan sekadar sekolah—ia adalah launchpad.",
    image: "https://placehold.co/600x800/ccfbf1/0f766e.png?text=Citra+Lestari",
  },
  {
    name: "Drg. Dian Novita",
    role: "Dokter Gigi Spesialis",
    institution: "Klinik Denta Prima",
    angkatan: "2007",
    quote:
      "Guru-guru SMANSA tidak hanya mendidik—mereka menginspirasi untuk menjadi versi terbaik dari diri sendiri.",
    image: "https://placehold.co/600x800/fef3c7/b45309.png?text=Dian+Novita",
  },
  {
    name: "Rizky Fauzan, S.Kom.",
    role: "Software Engineer",
    institution: "Gojek Indonesia",
    angkatan: "2010",
    quote:
      "Nilai kolaborasi yang saya pelajari di SMANSA jadi kunci saya bertahan dan berkembang di industri teknologi.",
    image: "https://placehold.co/600x800/f0fdf4/15803d.png?text=Rizky+Fauzan",
  },
];

export const placeholderImages = {
  hero: "https://placehold.co/1200x900/dbeafe/1e40af.png?text=Hero+SMANSA",
  about:
    "https://placehold.co/1000x750/e0f2fe/0369a1.png?text=Tentang+SMANSA",
  principal:
    "https://placehold.co/800x1000/dbeafe/1e40af.png?text=Kepala+Sekolah",
  leader:
    "https://placehold.co/800x1000/ccfbf1/0f766e.png?text=Jajaran+Pimpinan",
  staff: "https://placehold.co/800x1000/fef3c7/b45309.png?text=Tenaga+Sekolah",
  facility:
    "https://placehold.co/800x600/e0f2fe/0369a1.png?text=Fasilitas+SMANSA",
  achievement:
    "https://placehold.co/800x600/fef3c7/b45309.png?text=Prestasi+SMANSA",
  news: "https://placehold.co/800x600/dbeafe/1e40af.png?text=Berita+SMANSA",
  newsAlt:
    "https://placehold.co/800x600/ccfbf1/0f766e.png?text=Kegiatan+Sekolah",
  spmb: "https://placehold.co/800x600/fef3c7/b45309.png?text=Informasi+SPMB",
};

export const assetManifest: AssetSlot[] = [
  {
    key: "logo",
    label: "Logo SMANSA",
    fallback: "SMANSA",
  },
  {
    key: "hero",
    label: "Foto gedung SMA Negeri 1 Samarinda",
    src: placeholderImages.hero,
    fallback: "Foto hero resmi belum tersedia",
  },
  {
    key: "principal",
    label: "Foto kepala sekolah",
    src: placeholderImages.principal,
    fallback: "Foto kepala sekolah",
  },
  {
    key: "facility",
    label: "Foto fasilitas sekolah",
    src: placeholderImages.facility,
    fallback: "Foto fasilitas",
  },
];

export const heroNodes = [
  { label: "Tentang", href: "#tentang", tone: "blue", description: "Sejarah, visi-misi, dan identitas SMAN 1 Samarinda." },
  { label: "Keunggulan", href: "#keunggulan", tone: "amber", description: "Alasan utama memilih SMANSA sebagai ruang belajar unggul." },
  { label: "Pimpinan", href: "#kepemimpinan", tone: "teal", description: "Jajaran pimpinan dan tenaga sekolah yang mengelola layanan pendidikan." },
  { label: "Berita", href: "#berita", tone: "sky", description: "Informasi, pengumuman, dan kegiatan terbaru sekolah." },
  { label: "Alumni", href: "#alumni", tone: "green", description: "Jejaring lulusan sukses yang menginspirasi." },
  { label: "SPMB", href: "#spmb", tone: "blue", description: "Informasi seleksi penerimaan siswa baru terkini." },
];

export const stats = [
  { label: "Siswa aktif", value: null, note: "Menunggu data resmi" },
  { label: "Guru aktif", value: null, note: "Menunggu data resmi" },
  { label: "Tenaga kependidikan", value: null, note: "Menunggu data resmi" },
  { label: "Prestasi", value: null, note: "Menunggu data resmi" },
];

export const benefits = [
  {
    title: "Prestasi akademik",
    description: "Ruang tumbuh untuk kompetisi, riset, dan pembelajaran yang terarah.",
  },
  {
    title: "Tenaga pendidik profesional",
    description: "Guru dan tenaga kependidikan mendukung proses belajar yang disiplin.",
  },
  {
    title: "Fasilitas lengkap",
    description: "Laboratorium, perpustakaan, ruang multimedia, dan fasilitas pendukung.",
  },
  {
    title: "Lingkungan kondusif",
    description: "Budaya sekolah yang mendorong karakter, kolaborasi, dan tanggung jawab.",
  },
  {
    title: "Ekstrakurikuler beragam",
    description: "Pilihan kegiatan akademik dan non-akademik untuk minat siswa.",
  },
  {
    title: "Alumni berprestasi",
    description: "Jejaring alumni menjadi bagian dari inspirasi dan kontribusi sekolah.",
  },
];

export const leaders = [
  {
    name: "Syawal Arifin, S.S., M.Pd.",
    role: "Plt. Kepala Sekolah",
    imageSrc: "/images/hero/kepemimpinan-kepala-sekolah.jpg",
    description:
      "Memimpin pengelolaan sekolah, penyelenggaraan pendidikan, pembinaan sivitas akademika, dan hubungan dengan alumni.",
  },
  {
    name: "Aniek Widajanti, M.Pd.",
    role: "Wakil Bidang Kurikulum",
    imageSrc: "/images/hero/kepemimpinan-aniek-widajanti.jpg",
    description:
      "Mengelola pembinaan, pengawasan, serta pengembangan kurikulum sekolah.",
  },
  {
    name: "Ali Mursid, M.Pd.",
    role: "Wakil Bidang Sarpras",
    imageSrc: "/images/hero/kepemimpinan-ali-mursid.jpg",
    description:
      "Mengelola fasilitas dan infrastruktur untuk mendukung kegiatan operasional sekolah.",
  },
  {
    name: "Hermawati, S.Pd.",
    role: "Wakil Bidang Humas",
    imageSrc: "/images/hero/kepemimpinan-hermawati.jpg",
    description:
      "Mengelola komunikasi dan kerja sama sekolah dengan pihak eksternal.",
  },
  {
    name: "Syodiqul Huda, M.Pd.",
    role: "Wakil Bidang Kesiswaan",
    imageSrc: "/images/hero/kepemimpinan-syodiqul-huda.jpg",
    description:
      "Mengelola pembinaan, pengawasan, pengembangan ekstrakurikuler, dan kesejahteraan siswa.",
  },
  {
    name: "Khusnul Sugiarto, S.M.",
    role: "Koordinator TAS",
    imageSrc: "/images/hero/kepemimpinan-khusnul-sugiarto.jpg",
    description:
      "Mengelola perencanaan, pelaksanaan, dan evaluasi layanan administrasi sekolah.",
  },
  {
    name: "Chairunisa P, S.Pd.",
    role: "Bendahara Sekolah",
    imageSrc: "/images/hero/kepemimpinan-chairunisa-puspanegara.jpg",
    description:
      "Mengelola perencanaan, pelaksanaan, dan pelaporan keuangan sekolah.",
  },
  {
    name: "Bagus Baskoro, K.R., S.Pd.",
    role: "Kepala Perpustakaan",
    imageSrc: "/images/hero/kepemimpinan-bagus-baskoro.jpg",
    description:
      "Mengelola layanan perpustakaan sebagai pusat literasi dan sumber belajar sekolah.",
  },
  {
    name: "Mila Susan Shofiani, S.Pd.",
    role: "Kepala Laboratorium",
    imageSrc: "/images/hero/kepemimpinan-mila-susan.jpg",
    description:
      "Mengelola layanan laboratorium sebagai pusat sumber belajar sekolah.",
  },
];

export const programs = [
  {
    title: "Bilingual",
    category: "Program unggulan",
    description:
      "Pembelajaran dengan penguatan kemampuan bahasa dan komunikasi global.",
  },
  {
    title: "Kemitraan",
    category: "Kolaborasi",
    description:
      "Kerja sama sekolah dengan mitra untuk memperkaya pengalaman belajar.",
  },
  {
    title: "Kokurikuler",
    category: "Penguatan karakter",
    description:
      "Kegiatan pendamping pembelajaran untuk membangun kompetensi siswa.",
  },
];

export const extracurriculars = [
  "Akademik",
  "Non-Akademik",
  "Olahraga",
  "Seni",
  "Organisasi",
  "Keagamaan",
];

export const achievements = [
  {
    title: "Prestasi akademik dan non-akademik",
    category: "Featured",
    level: "Kota sampai nasional",
    year: "Data resmi",
    description:
      "Daftar prestasi akan mengikuti data publikasi resmi sekolah.",
  },
  {
    title: "Kompetisi siswa",
    category: "Kompetisi",
    level: "OSN, FLS3N, O2SN, OPSI",
    year: "Berkala",
    description:
      "Informasi kompetisi membantu siswa menemukan jalur pengembangan minat.",
  },
];

export const facilities = [
  {
    name: "Ruang Multimedia",
    imageSrc:
      "https://placehold.co/800x600",
  },
  {
    name: "Laboratorium Biologi",
    imageSrc:
      "https://placehold.co/800x600",
  },
  {
    name: "Laboratorium Komputer",
    imageSrc:
      "https://placehold.co/800x600",
  },
  {
    name: "Laboratorium Kimia",
    imageSrc: "https://placehold.co/800x600",
  },
  {
    name: "Laboratorium Fisika",
    imageSrc: "https://placehold.co/800x600",
  },
  {
    name: "Perpustakaan",
    imageSrc:
      "https://placehold.co/800x600",
  },
];

export const news = [
  {
    title: "Berita dan pengumuman sekolah",
    category: "Berita",
    date: "Update berkala",
    imageSrc: placeholderImages.news,
    excerpt:
      "Publikasi resmi sekolah akan tampil sebagai kanal informasi untuk siswa, orang tua, dan masyarakat.",
  },
  {
    title: "Informasi kegiatan SMANSA",
    category: "Kegiatan",
    date: "Update berkala",
    imageSrc: placeholderImages.newsAlt,
    excerpt:
      "Dokumentasi kegiatan sekolah menjadi bagian dari arsip dan komunikasi publik.",
  },
  {
    title: "Informasi SPMB",
    category: "SPMB",
    date: "Sesuai jadwal resmi",
    imageSrc: placeholderImages.spmb,
    excerpt:
      "Informasi penerimaan peserta didik baru ditampilkan jelas dan mudah ditemukan.",
  },
];

export const newsSectionGroups = [
  {
    key: "berita",
    label: "Berita",
    eyebrow: "Kabar Sekolah",
    description:
      "Kumpulan kabar terbaru seputar kegiatan, layanan, dan publikasi resmi SMANSA.",
    href: "/posts",
    tone: "primary",
    items: [
      {
        title: "Kegiatan pembelajaran semester baru dimulai",
        date: "Update terbaru",
        imageSrc: placeholderImages.news,
        excerpt:
          "Informasi awal kegiatan belajar mengajar dan agenda sekolah untuk seluruh warga SMANSA.",
        href: "#berita",
      },
      {
        title: "Dokumentasi kegiatan sekolah diperbarui",
        date: "Update berkala",
        imageSrc: placeholderImages.newsAlt,
        excerpt:
          "Publikasi kegiatan siswa, guru, dan komunitas sekolah disusun sebagai arsip informasi.",
        href: "#berita",
      },
      {
        title: "Layanan informasi sekolah terpusat",
        date: "Informasi resmi",
        imageSrc: placeholderImages.facility,
        excerpt:
          "Kanal berita menjadi rujukan utama untuk kabar sekolah yang mudah ditemukan.",
        href: "#berita",
      },
    ],
  },
  {
    key: "prestasi",
    label: "Prestasi",
    eyebrow: "Capaian Siswa",
    description:
      "Sorotan capaian akademik dan non-akademik dari siswa, guru, dan komunitas sekolah.",
    href: "#prestasi",
    tone: "warning",
    items: [
      {
        title: "Rekap prestasi akademik dan non-akademik",
        date: "Data resmi",
        imageSrc: placeholderImages.achievement,
        excerpt:
          "Daftar prestasi sekolah akan diperbarui mengikuti publikasi dan arsip resmi.",
        href: "#prestasi",
      },
      {
        title: "Informasi kompetisi siswa aktif",
        date: "Berkala",
        imageSrc: placeholderImages.achievement,
        excerpt:
          "Siswa dapat memantau peluang kompetisi seperti OSN, FLS3N, O2SN, dan OPSI.",
        href: "#prestasi",
      },
      {
        title: "Pembinaan minat dan bakat berkelanjutan",
        date: "Program sekolah",
        imageSrc: placeholderImages.newsAlt,
        excerpt:
          "Sekolah mendukung pengembangan talenta melalui pembinaan dan pendampingan.",
        href: "#prestasi",
      },
    ],
  },
  {
    key: "pengumuman",
    label: "Pengumuman",
    eyebrow: "Informasi Penting",
    description:
      "Pengumuman administrasi, agenda penting, dan informasi layanan untuk siswa dan orang tua.",
    href: "/posts?kategori=pengumuman",
    tone: "success",
    items: [
      {
        title: "Informasi SPMB dan layanan penerimaan",
        date: "Sesuai jadwal resmi",
        imageSrc: placeholderImages.spmb,
        excerpt:
          "Informasi penerimaan siswa baru ditampilkan jelas mengikuti ketentuan terbaru.",
        href: "#spmb",
      },
      {
        title: "Jadwal layanan administrasi sekolah",
        date: "Senin - Jumat",
        imageSrc: placeholderImages.about,
        excerpt:
          "Layanan administrasi sekolah tersedia pada jam kerja untuk kebutuhan warga sekolah.",
        href: "#kontak",
      },
      {
        title: "Kanal kontak resmi SMANSA",
        date: "Informasi layanan",
        imageSrc: placeholderImages.hero,
        excerpt:
          "Alamat, telepon, email, dan peta sekolah tersedia untuk memudahkan komunikasi.",
        href: "#kontak",
      },
    ],
  },
] as const;

export const partners = ["Pijar", "Google Classroom", "ERAPOR", "Alumni"];

export const contactInfo = {
  address: "Jl. Kadrie Oening No.1, Air Hitam, Kec. Samarinda Ulu, Kota Samarinda, Kalimantan Timur 75124",
  phone: "(0541) 741434",
  email: "info@sman1samarinda.sch.id",
  hours: "Senin - Jumat, 07:30 - 16:00 WITA",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.686858387968!2d117.12754847472344!3d-0.4651170995303201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df67f121c44491d%3A0xdfddab921de5db0!2sSMA%20Negeri%201%20Samarinda!5e0!3m2!1sid!2sid!4v1781099331917!5m2!1sid!2sid",
};

export const ctaJoin = {
  title: "Siap Menjadi Bagian dari SMANSA?",
  description: "Bergabunglah dengan komunitas pembelajar yang dinamis dan berprestasi. Temukan potensi terbaikmu di SMA Negeri 1 Samarinda.",
  buttonText: "Informasi Pendaftaran (SPMB)",
  buttonHref: "#spmb",
};

export const statsData = [
  {
    value: 92,
    suffix: "%",
    label: "Lulusan PTN",
    description: "Diterima di perguruan tinggi favorit",
  },
  {
    value: 500,
    suffix: "+",
    label: "Prestasi Nasional",
    description: "Medali akademik & non-akademik",
  },
  {
    value: 1200,
    suffix: "+",
    label: "Siswa Aktif",
    description: "Talenta muda berbakat & kreatif",
  },
];
