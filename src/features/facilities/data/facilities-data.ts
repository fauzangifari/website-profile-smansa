export type FacilityCategory =
  | "Semua"
  | "Laboratorium"
  | "Akademik"
  | "Teknologi"
  | "Penunjang"
  | "Ibadah";

export type Facility = {
  id: string;
  name: string;
  category: Exclude<FacilityCategory, "Semua">;
  icon: string;
  shortDescription: string;
  description: string;
  highlights: string[];
  images: {
    src: string;
    alt: string;
  }[];
};

export const facilitiesIntro = {
  main: "SMA Negeri 1 Samarinda menyediakan fasilitas sarana dan prasarana yang lengkap dan modern sebagai penunjang proses belajar mengajar yang berkualitas. Setiap fasilitas dirancang untuk mendukung pengembangan potensi akademik, karakter, dan keterampilan siswa secara optimal.",
  sub: "Dengan lingkungan belajar yang kondusif dan fasilitas berstandar tinggi, SMANSA berkomitmen menghadirkan pengalaman pendidikan terbaik bagi seluruh sivitas akademika.",
};

export const facilitiesStats = [
  { value: "11", label: "Total Fasilitas" },
  { value: "4", label: "Laboratorium" },
  { value: "30+", label: "Ruang Kelas" },
  { value: "1", label: "Perpustakaan" },
];

export const facilityCategories: FacilityCategory[] = [
  "Semua",
  "Laboratorium",
  "Akademik",
  "Teknologi",
  "Penunjang",
  "Ibadah",
];

export const facilities: Facility[] = [
  {
    id: "ruang-multimedia",
    name: "Ruang Multimedia",
    category: "Teknologi",
    icon: "MonitorPlay",
    shortDescription:
      "Ruang belajar interaktif berteknologi tinggi yang mendukung pembelajaran visual dan presentasi modern.",
    description:
      "Ruang Multimedia SMANSA merupakan fasilitas teknologi terdepan yang dirancang khusus untuk mendukung pembelajaran interaktif dan presentasi akademik. Ruangan ini dilengkapi dengan perangkat audio-visual bermutu tinggi, proyektor resolusi tinggi, dan sistem suara surround yang memungkinkan siswa dan guru menyampaikan materi dengan cara yang lebih menarik dan efektif. Ruang ini menjadi pusat kegiatan presentasi, seminar internal, pemutaran film edukatif, serta pelatihan digital bagi siswa.",
    highlights: [
      "Proyektor resolusi tinggi dan layar lebar interaktif",
      "Sistem audio surround berkualitas profesional",
      "Kapasitas hingga 60 orang dengan tempat duduk teater",
      "Koneksi internet stabil untuk streaming dan virtual meeting",
      "Digunakan untuk seminar, presentasi, dan pelatihan digital",
    ],
    images: [
      {
        src: "https://placehold.co/800x600/e0eeff/0057b5?text=Ruang+Multimedia",
        alt: "Ruang Multimedia SMANSA tampak depan",
      },
      {
        src: "https://placehold.co/800x600/dff0ff/006fe8?text=Proyektor+%26+Layar",
        alt: "Proyektor dan layar interaktif ruang multimedia",
      },
      {
        src: "https://placehold.co/800x600/e8f4ff/0057b5?text=Area+Presentasi",
        alt: "Area presentasi dan podium ruang multimedia",
      },
    ],
  },
  {
    id: "laboratorium-biologi",
    name: "Laboratorium Biologi",
    category: "Laboratorium",
    icon: "Microscope",
    shortDescription:
      "Laboratorium lengkap dengan peralatan ilmiah modern untuk praktikum biologi dan penelitian sains.",
    description:
      "Laboratorium Biologi SMANSA dilengkapi dengan peralatan praktikum yang lengkap dan modern, mendukung eksplorasi ilmiah siswa dalam mempelajari makhluk hidup, ekosistem, dan proses biologis. Fasilitas ini memiliki mikroskop binokuler dan monokuler, preparat awetan, model anatomi, serta peralatan eksperimen standar laboratorium nasional. Laboratorium ini menjadi wadah bagi siswa untuk mengembangkan keterampilan ilmiah, berpikir kritis, dan rasa ingin tahu terhadap dunia biologi.",
    highlights: [
      "Mikroskop binokuler dan monokuler dalam jumlah memadai",
      "Koleksi preparat awetan dan model anatomi 3D",
      "Peralatan eksperimen lengkap sesuai standar nasional",
      "Lemari penyimpanan spesimen yang terorganisir",
      "Meja praktikum individual dengan wastafel",
    ],
    images: [
      {
        src: "https://placehold.co/800x600/e0fff4/0f766e?text=Lab+Biologi",
        alt: "Laboratorium Biologi SMANSA tampak umum",
      },
      {
        src: "https://placehold.co/800x600/d5fdf0/0f766e?text=Mikroskop+%26+Alat",
        alt: "Peralatan mikroskop laboratorium biologi",
      },
      {
        src: "https://placehold.co/800x600/e8fff8/0a6058?text=Meja+Praktikum",
        alt: "Meja praktikum laboratorium biologi",
      },
    ],
  },
  {
    id: "laboratorium-komputer",
    name: "Laboratorium Komputer",
    category: "Laboratorium",
    icon: "Desktop",
    shortDescription:
      "Lab komputer modern dengan unit PC terkini yang mendukung pembelajaran TIK dan ujian berbasis komputer.",
    description:
      "Laboratorium Komputer SMANSA hadir sebagai pusat pembelajaran teknologi informasi dan komunikasi yang mutakhir. Ruangan ini dilengkapi dengan puluhan unit komputer berspesifikasi tinggi, koneksi internet fiber optik berkecepatan tinggi, serta perangkat lunak pendidikan yang terlisensi. Laboratorium ini digunakan untuk pembelajaran TIK, pelaksanaan ANBK dan ujian berbasis komputer, pelatihan coding, hingga kegiatan ekstrakurikuler berbasis teknologi. Setiap unit komputer dirawat secara berkala untuk menjamin performa optimal.",
    highlights: [
      "40+ unit komputer berspesifikasi tinggi",
      "Koneksi internet fiber optik berkecepatan tinggi",
      "Perangkat lunak pendidikan dan desain berlisensi resmi",
      "Mendukung pelaksanaan ANBK dan UTBK berbasis komputer",
      "AC central dan ruangan ber-AC untuk kenyamanan belajar",
    ],
    images: [
      {
        src: "https://placehold.co/800x600/e0eeff/3395ff?text=Lab+Komputer",
        alt: "Laboratorium Komputer SMANSA tampak umum",
      },
      {
        src: "https://placehold.co/800x600/dde8ff/007aff?text=Unit+Komputer",
        alt: "Unit-unit komputer laboratorium",
      },
      {
        src: "https://placehold.co/800x600/e8eeff/0057b5?text=Area+Server",
        alt: "Area server dan jaringan laboratorium komputer",
      },
    ],
  },
  {
    id: "laboratorium-kimia",
    name: "Laboratorium Kimia",
    category: "Laboratorium",
    icon: "Flask",
    shortDescription:
      "Laboratorium kimia berstandar keamanan tinggi dengan peralatan dan bahan kimia lengkap untuk praktikum.",
    description:
      "Laboratorium Kimia SMANSA dirancang dengan standar keamanan tinggi untuk mendukung kegiatan praktikum kimia yang aman dan efektif. Dilengkapi dengan lemari asam (fume hood), peralatan gelas laboratorium lengkap, timbangan analitik, serta koleksi bahan kimia yang terkelola dengan baik sesuai standar keselamatan. Siswa dapat melakukan berbagai eksperimen mulai dari reaksi kimia dasar hingga analisis kimia tingkat lanjut. Laboratorium ini juga digunakan sebagai sarana persiapan olimpiade sains bidang kimia.",
    highlights: [
      "Lemari asam (fume hood) berstandar keselamatan internasional",
      "Koleksi bahan kimia lengkap dan tersimpan dengan aman",
      "Timbangan analitik presisi tinggi",
      "Peralatan gelas laboratorium dari brand ternama",
      "Sistem ventilasi khusus untuk keamanan udara ruangan",
    ],
    images: [
      {
        src: "https://placehold.co/800x600/fff8e0/b45309?text=Lab+Kimia",
        alt: "Laboratorium Kimia SMANSA tampak umum",
      },
      {
        src: "https://placehold.co/800x600/fff3d0/a16207?text=Lemari+Asam",
        alt: "Lemari asam dan peralatan lab kimia",
      },
      {
        src: "https://placehold.co/800x600/fffae8/92400e?text=Bahan+Kimia",
        alt: "Rak penyimpanan bahan kimia laboratorium",
      },
    ],
  },
  {
    id: "laboratorium-fisika",
    name: "Laboratorium Fisika",
    category: "Laboratorium",
    icon: "Atom",
    shortDescription:
      "Laboratorium fisika dengan instrumen eksperimen lengkap untuk memahami konsep fisika secara langsung.",
    description:
      "Laboratorium Fisika SMANSA menyediakan ruang eksplorasi sains yang komprehensif bagi siswa untuk memahami prinsip-prinsip fisika melalui pengalaman langsung. Fasilitas ini memiliki berbagai instrumen eksperimen seperti set optik, alat listrik dan magnet, peralatan mekanika, hingga kit elektronika dasar. Dengan pendekatan pembelajaran berbasis eksperimen, siswa dapat membuktikan teori fisika secara empiris dan mengembangkan kemampuan analisis data serta pemecahan masalah ilmiah yang komprehensif.",
    highlights: [
      "Set eksperimen optika, mekanika, dan kelistrikan lengkap",
      "Instrumen pengukuran presisi tinggi (multimeter, osiloskop)",
      "Kit elektronika dan rangkaian listrik untuk siswa",
      "Meja eksperimen anti-getar untuk pengukuran akurat",
      "Digunakan untuk persiapan OSN Fisika tingkat nasional",
    ],
    images: [
      {
        src: "https://placehold.co/800x600/f0e8ff/7c3aed?text=Lab+Fisika",
        alt: "Laboratorium Fisika SMANSA tampak umum",
      },
      {
        src: "https://placehold.co/800x600/ede0ff/6d28d9?text=Instrumen+Fisika",
        alt: "Instrumen dan peralatan laboratorium fisika",
      },
      {
        src: "https://placehold.co/800x600/f5f0ff/5b21b6?text=Eksperimen+Optika",
        alt: "Peralatan eksperimen optika dan cahaya",
      },
    ],
  },
  {
    id: "perpustakaan",
    name: "Perpustakaan",
    category: "Akademik",
    icon: "Books",
    shortDescription:
      "Perpustakaan modern dengan koleksi buku lengkap dan ruang baca yang nyaman sebagai pusat literasi sekolah.",
    description:
      "Perpustakaan SMANSA merupakan jantung literasi sekolah yang menyediakan koleksi buku, jurnal, dan referensi akademik yang kaya dan terus diperbarui. Ruang baca yang luas dan nyaman dirancang untuk mendukung budaya membaca dan belajar mandiri siswa. Fasilitas ini dilengkapi dengan sistem katalog digital, area komputer untuk pencarian referensi, dan ruang diskusi kelompok. Perpustakaan juga mengadakan berbagai program literasi dan kompetisi membaca untuk mendorong minat baca seluruh warga sekolah.",
    highlights: [
      "Koleksi lebih dari 10.000 judul buku dan referensi akademik",
      "Sistem katalog digital dan pencarian buku online",
      "Ruang baca luas dengan pencahayaan alami yang nyaman",
      "Area komputer untuk riset dan referensi digital",
      "Ruang diskusi kelompok yang kondusif",
    ],
    images: [
      {
        src: "https://placehold.co/800x600/fff0e8/c2410c?text=Perpustakaan",
        alt: "Perpustakaan SMANSA tampak umum",
      },
      {
        src: "https://placehold.co/800x600/ffe8d8/b45309?text=Rak+Buku",
        alt: "Rak koleksi buku perpustakaan SMANSA",
      },
      {
        src: "https://placehold.co/800x600/ffeedd/a16207?text=Ruang+Baca",
        alt: "Ruang baca dan area belajar perpustakaan",
      },
    ],
  },
  {
    id: "kafetaria",
    name: "Kafetaria",
    category: "Penunjang",
    icon: "CookingPot",
    shortDescription:
      "Kafetaria bersih dan nyaman menyajikan makanan sehat dan bergizi untuk seluruh warga sekolah.",
    description:
      "Kafetaria SMANSA hadir sebagai pusat makan yang sehat, bersih, dan nyaman bagi seluruh siswa, guru, dan karyawan sekolah. Dikelola dengan standar kebersihan dan keamanan pangan yang ketat, kafetaria menyajikan berbagai pilihan menu makanan dan minuman bergizi dengan harga yang terjangkau. Fasilitas ini memiliki area makan yang luas dengan kapasitas besar, serta dilengkapi dengan wastafel cuci tangan untuk menjaga higienitas. Kafetaria juga berperan dalam mendukung program kantin sehat sekolah.",
    highlights: [
      "Standar kebersihan dan keamanan pangan yang terjaga",
      "Pilihan menu makanan sehat dan bergizi harga terjangkau",
      "Kapasitas tempat duduk yang luas dan nyaman",
      "Fasilitas wastafel dan cuci tangan tersedia",
      "Dikelola dalam program kantin sehat sekolah",
    ],
    images: [
      {
        src: "https://placehold.co/800x600/e8fff0/15803d?text=Kafetaria",
        alt: "Kafetaria SMANSA tampak umum",
      },
      {
        src: "https://placehold.co/800x600/d5fce8/166534?text=Area+Makan",
        alt: "Area makan kafetaria SMANSA",
      },
      {
        src: "https://placehold.co/800x600/e0fce8/14532d?text=Stand+Makanan",
        alt: "Stand makanan dan minuman kafetaria",
      },
    ],
  },
  {
    id: "ruang-kelas",
    name: "Ruang Kelas",
    category: "Akademik",
    icon: "Chalkboard",
    shortDescription:
      "Ruang kelas modern yang kondusif dengan fasilitas belajar lengkap untuk mendukung proses pembelajaran.",
    description:
      "Ruang kelas SMANSA dirancang untuk menciptakan suasana belajar yang kondusif, nyaman, dan inspiratif. Setiap kelas dilengkapi dengan proyektor atau layar interaktif, papan tulis, meja kursi ergonomis, serta pencahayaan dan ventilasi yang baik. Dengan lebih dari 30 ruang kelas yang tersebar di gedung-gedung sekolah, setiap kelas dirancang untuk menampung 32–36 siswa dengan kepadatan yang ideal. Pengelolaan kelas yang baik mendukung atmosfer akademik yang positif dan produktif.",
    highlights: [
      "30+ ruang kelas yang tersebar dan terorganisir",
      "Proyektor dan layar untuk pembelajaran visual",
      "Meja kursi ergonomis yang nyaman",
      "Pencahayaan alami dan ventilasi udara yang baik",
      "Kapasitas ideal 32–36 siswa per kelas",
    ],
    images: [
      {
        src: "https://placehold.co/800x600/e8f0ff/1d4ed8?text=Ruang+Kelas",
        alt: "Ruang kelas SMANSA tampak depan",
      },
      {
        src: "https://placehold.co/800x600/ddeeff/1e40af?text=Papan+%26+Proyektor",
        alt: "Papan tulis dan proyektor ruang kelas",
      },
      {
        src: "https://placehold.co/800x600/e0e8ff/1d4ed8?text=Suasana+Kelas",
        alt: "Suasana belajar di ruang kelas SMANSA",
      },
    ],
  },
  {
    id: "masjid",
    name: "Masjid",
    category: "Ibadah",
    icon: "Mosque",
    shortDescription:
      "Masjid sekolah yang megah dan nyaman sebagai pusat kegiatan ibadah dan pembinaan karakter islami.",
    description:
      "Masjid SMANSA merupakan fasilitas ibadah yang megah dan nyaman bagi seluruh warga sekolah yang beragama Islam. Fasilitas ini tidak hanya berfungsi sebagai tempat shalat, tetapi juga sebagai pusat pembinaan karakter islami, pelaksanaan kajian agama, serta berbagai kegiatan keagamaan seperti peringatan hari besar Islam dan pesantren kilat. Masjid dilengkapi dengan fasilitas wudhu yang memadai, sound system yang baik, serta ruang yang luas dan sejuk untuk kenyamanan beribadah seluruh jamaah.",
    highlights: [
      "Kapasitas jamaah yang luas untuk seluruh warga sekolah",
      "Fasilitas wudhu putra dan putri yang memadai",
      "Sound system berkualitas untuk kegiatan keagamaan",
      "Pusat kegiatan kajian, PHBI, dan pesantren kilat",
      "Lingkungan masjid yang bersih dan terawat",
    ],
    images: [
      {
        src: "https://placehold.co/800x600/fff8e0/d97706?text=Masjid+SMANSA",
        alt: "Masjid SMANSA tampak luar",
      },
      {
        src: "https://placehold.co/800x600/fdf4d0/b45309?text=Interior+Masjid",
        alt: "Interior ruang shalat masjid SMANSA",
      },
      {
        src: "https://placehold.co/800x600/fffbe8/92400e?text=Tempat+Wudhu",
        alt: "Fasilitas tempat wudhu masjid SMANSA",
      },
    ],
  },
  {
    id: "parkiran",
    name: "Parkiran Motor/Mobil",
    category: "Penunjang",
    icon: "Car",
    shortDescription:
      "Area parkir yang luas, aman, dan tertata rapi untuk kendaraan siswa, guru, dan tamu sekolah.",
    description:
      "Area parkir SMANSA menyediakan ruang yang luas dan tertata untuk kendaraan bermotor roda dua maupun roda empat milik siswa, guru, karyawan, dan tamu sekolah. Dilengkapi dengan sistem keamanan berupa petugas parkir dan kamera pengawas (CCTV), area parkir dijaga keamanannya selama jam sekolah berlangsung. Pengaturan zona parkir yang terstruktur memastikan kelancaran arus masuk dan keluar kendaraan, serta memberikan rasa aman bagi pemilik kendaraan.",
    highlights: [
      "Area parkir luas dengan kapasitas kendaraan besar",
      "Zona terpisah untuk sepeda motor dan mobil",
      "Pengawasan petugas parkir selama jam sekolah",
      "CCTV untuk keamanan kendaraan terparkir",
      "Sistem keluar-masuk yang tertib dan teratur",
    ],
    images: [
      {
        src: "https://placehold.co/800x600/f0f0f0/334155?text=Area+Parkir",
        alt: "Area parkir SMANSA tampak umum",
      },
      {
        src: "https://placehold.co/800x600/e8e8e8/1e293b?text=Parkir+Motor",
        alt: "Area parkir sepeda motor SMANSA",
      },
      {
        src: "https://placehold.co/800x600/f5f5f5/475569?text=Parkir+Mobil",
        alt: "Area parkir mobil SMANSA",
      },
    ],
  },
  {
    id: "koperasi",
    name: "Koperasi",
    category: "Penunjang",
    icon: "Storefront",
    shortDescription:
      "Koperasi sekolah yang menyediakan kebutuhan alat tulis, buku, seragam, dan keperluan belajar siswa.",
    description:
      "Koperasi SMANSA hadir sebagai unit usaha sekolah yang melayani kebutuhan perlengkapan belajar seluruh warga sekolah. Koperasi menyediakan berbagai kebutuhan seperti alat tulis, buku pelajaran, seragam sekolah, perlengkapan olahraga, hingga kebutuhan harian lainnya dengan harga yang terjangkau dan kompetitif. Dikelola secara profesional oleh pengurus yang terdiri dari guru dan siswa, koperasi ini juga menjadi sarana pembelajaran kewirausahaan dan manajemen ekonomi bagi siswa secara langsung.",
    highlights: [
      "Menyediakan alat tulis, buku, dan seragam sekolah",
      "Harga terjangkau dan kompetitif untuk warga sekolah",
      "Dikelola oleh pengurus guru dan siswa",
      "Sarana pembelajaran kewirausahaan siswa",
      "Operasional setiap hari sekolah aktif",
    ],
    images: [
      {
        src: "https://placehold.co/800x600/e0f5e0/166534?text=Koperasi+Sekolah",
        alt: "Koperasi SMANSA tampak depan",
      },
      {
        src: "https://placehold.co/800x600/d5f0d5/15803d?text=Rak+Produk",
        alt: "Rak produk dan perlengkapan koperasi sekolah",
      },
      {
        src: "https://placehold.co/800x600/e8fce8/14532d?text=Kasir+Koperasi",
        alt: "Area kasir dan pelayanan koperasi SMANSA",
      },
    ],
  },
];
