import type { Redirect } from "next/dist/lib/load-custom-routes";

/**
 * Redirect 301 dari URL website lama (WordPress) ke website baru (Next.js).
 *
 * Konteks: migrasi domain `www.sman1samarinda.sch.id` dari WordPress ke Next.js.
 * Tujuan: tidak ada 404 untuk URL yang bernilai + mewariskan otoritas SEO.
 *
 * Sumber URL lama diambil dari WordPress core sitemap (`/wp-sitemap.xml`)
 * yang masih live saat migrasi. Semua `source` ditulis TANPA trailing slash;
 * Next mencocokkan `/x` dan `/x/`.
 *
 * PENTING: URL lama posts & pages sama-sama di root `/`, sehingga TIDAK boleh
 * memakai catch-all `/:slug` (akan menelan route asli seperti `/profil`).
 * Karena itu setiap slug ditulis eksplisit, kecuali namespace aman
 * (`/category`, `/tag`, `/member`, `/author`) yang tidak punya padanan route.
 */

// Pakai 301 eksplisit (bukan `permanent: true` yang menghasilkan 308) —
// 301 adalah sinyal migrasi permanen yang paling universal dikenali crawler.
const STATUS_301 = 301 as const;

/**
 * Grup A — 58 artikel berita lama: `/{slug}` -> `/berita/{slug}`.
 * Slug SIMS = slug WordPress lama (persis), jadi mapping 1:1.
 */
const beritaSlugs = [
  "motivasi-doa-bersama-smansa",
  "daftar-siswa-lulus-snbp-2025",
  "kelulusan-sma-negeri-1-samarinda-2025",
  "pengumuman-hasil-spmb-tahap-1-dan-2-sma-negeri-1-samarinda",
  "atlet-muda-sman-1-samarinda-harumkan-sekolah-dalam-berbagai-kejuaraan-olahraga",
  "prestasi-gemilang-vicky-elang-minnerva-di-dunia-musik-klasik-dan-drummer-festival-2025",
  "passus-sman-1-samarinda-raih-empat-penghargaan-bergengsi-di-lpbb-saprasaga-2025",
  "juara-1-lomba-film-pendek-dalam-event-chemist-fun-days-cfd-xv-jenjang-sma-tingkat-nasional-diselenggarakan-oleh-fkip-kimia-universitas-mulawarman-tahun-2023",
  "berpartisipasi-dalam-lomba-film-pendek-di-festival-lomba-seni-dan-sastra-siswa-nasional-fls3n-tingkat-sma-dan-smk-tahun-2025",
  "berpartisipasi-dalam-kegiatan-diskusi-dan-pemutaran-hasil-produksi-5-film-bertema-kebudayaan-dan-pendidikan-kaltim-bertempat-di-taman-budaya-pada-20-agustus-2025",
  "pertemuan-rutin-ekstrakurikuler-smansa-digital-creator-dengan-pelatih-bapak-abdul-azis-s-sn",
  "siswa-sman-1-samarinda-borong-prestasi-di-taekwondo-mulawarman-championship-2025",
  "tim-sman-1-samarinda-juara-2-lomba-cerdas-cermat-summerfest-2025",
  "teater-dahana-sman-1-samarinda-raih-juara-2-drama-musikal-summerfest-2025",
  "spartan-smansa-raih-predikat-best-supporter-di-fazzio-youth-festival-samarinda",
  "dua-siswa-smansa-raih-juara-harapan-1-di-lomba-video-summerfest-2025",
  "aksi-memukau-scarecrow-antarkan-smansa-raih-juara-3-dance-competition",
  "siswa-smansa-siap-hadapi-era-digital-lewat-pelatihan-digital-marketing-2025",
  "tim-kimia-sma-negeri-1-samarinda-juara-2-cerdas-cermat",
  "sma-negeri-1-samarinda-raih-juara-2-lomba-cerdas-cermat-alkitab",
  "prestasi-cemerlang-sman-1-samarinda-di-porprov-kaltim-juara-1-dan-2-pencak-silat-putri",
  "diya-meizahra-maharani-raih-juara-2-junior-degen-di-kejuaraan-anggar-provinsi-kalimantan-timur",
  "tim-scarecrow-sman-1-samarinda-raih-juara-1-dan-2-di-good-day-school-talent-competition-2025",
  "lembayung-almira-rubina-raih-juara-3-lomba-menyanyi-di-good-day-school-talent-competition-2025",
  "empat-siswa-sman-1-samarinda-terpilih-sebagai-duta-siswa-kota-samarinda-2025",
  "oryza-noveila-anugerah-harumkan-nama-sman-1-samarinda-di-ajang-speech-competition",
  "ide-brilian-antarkan-kayla-zhivanna-huang-raih-juara-2-poster-ilmiah-di-universitas-mulawarman",
  "scarecrow-sman-1-samarinda-bersinar-dalam-berbagai-lomba-dance-2025",
  "debater-muda-sman-1-samarinda-tunjukkan-keunggulan-di-hi-zone-2025",
  "sman-1-samarinda-torehkan-prestasi-di-ajang-cerdas-cermat-fakultas-kehutanan-universitas-mulawarman",
  "tim-sman-1-samarinda-raih-juara-harapan-3-di-the-4th-mathematics-competition-universitas-mulawarman",
  "villa-ahzha-meidyra-raih-medali-silver-di-international-kangaroo-linguistic-contest-ikic",
  "teater-dahana-sma-negeri-1-samarinda-sukses-di-lomba-bank-indonesia",
  "tim-sman-1-samarinda-juara-1-lomba-cerdas-cermat-cinta-bangga-paham-rupiah",
  "prestasi-membanggakan-sman-1-samarinda-kuasai-ams-speech-competition",
  "carissa-julia-kirana-raih-juara-1-kategori-5k-teens-female-di-lomba-lari-nasional-bayan-run-2025",
  "dinda-elfrida-dan-khalila-harumkan-nama-sman-1-samarinda-di-gubernur-cup-baseball-2025",
  "juara-1-lomba-membaca-alkitab-eugenia-jesica-wujudkan-prestasi-sma-negeri-1-samarinda",
  "tim-tari-tradisional-sman-1-samarinda-borong-prestasi-di-tiga-ajang-bergengsi",
  "zhievana-awania-ishinta-dari-sman-1-samarinda-juara-1-world-dance-masters",
  "fatih-degen-pratama-raih-perunggu-indonesia-open-fencing-championship-2025",
  "siswa-sman-1-samarinda-ikuti-awmun-xii-di-bali-sebagai-delegasi-portugal",
  "sman-1-samarinda-raih-juara-1-lomba-cerdas-cermat-bulan-bahasa-2025",
  "qeysha-safina-qory-aqsoma-raih-juara-3-lomba-speech-contest-bulan-bahasa-2025",
  "lembayung-almira-rubina-raih-juara-3-lomba-menyanyi-lagu-daerah-bulan-bahasa-2025",
  "guru-matematika-sma-negeri-1-kota-samarinda-ibu-gita-chandra-febriliana-s-pd-berhasil-meraih-penghargaan-sebagai-penulis-buku-berbagi-praktik-baik-etam-kayuh-bebaya-yang-di-naungi-oleh-dinas-provins",
  "guru-bahasa-inggris-sma-negeri-1-kota-samarinda-bapak-alkahvi-m-pd-berhasil-meraih-penghargaan-penghargaan-karya-advertisement-game-tahun-2025",
  "asesmen-akhir-satuan-pendidikan-aasp-2025-2026",
  "smansa-berbagi-2026",
  "halalbihalal-2026",
  "siswa-siswi-sma-negeri-1-samarinda-yang-sudah-berhasil-lolos-seleksi-nasional-berdasarkan-prestasi-snbp-tahun-2026",
  "aliya-oryza-diterima-melalui-letter-of-acceptance-loa-conditional",
  "pelepasan-siswa-siswi-kelas-xii-angkatan-70",
  "pengumuman-kelulusan-angkatan-70",
  "asesmen-akhir-semester-aas-genap-2025-2026",
  "sosialisasi-tata-tertib-sekolah-dan-pembagian-rapor-semester-genap-2026",
  "pengumuman-hasil-seleksi-spmb-tahap-i-sma-negeri-1-samarinda-tahun-ajaran-2026-2027",
  "pengumuman-hasil-seleksi-spmb-tahap-2-sma-negeri-1-samarinda-tahun-ajaran-2026-2027",
];

/**
 * Grup B — halaman Indonesia dengan slug berbeda (mapping eksplisit).
 * Halaman yang slug-nya sudah sama (/profil, /sejarah, /kemitraan,
 * /struktur-organisasi, /prestasi, /kokurikuler, /bilingual) tidak perlu entri.
 */
const pageMappings: Array<[string, string]> = [
  ["/visimisi", "/visi-misi"],
  ["/kepemimpinan", "/struktur-organisasi"],
  // /direktori-guru kini punya halaman sendiri (slug sama), jadi tanpa entri redirect.
  ["/direktori-tenaga-kependidikan", "/direktori-tendik"],
  ["/teachers", "/direktori-guru"],
  ["/sekolah", "/profil"],
  ["/pusat-informasi", "/berita"],
  ["/news", "/berita"],
  ["/events", "/berita"],
  ["/alumni-club", "/alumni"],
];

/** Grup C — halaman ekstrakurikuler lama -> indeks /ekstrakurikuler. */
const ekskulSlugs = [
  "basket",
  "handball",
  "club-kimia",
  "club-ekonomi",
  "club-geografi",
  "club-kebumian",
  "klub-debat-bahasa-indonesia",
  "teater-dahana",
  "tari-tradisional",
  "rohis-ainul-yaqin",
  "paduan-suara",
  "smansa-digitech",
  "sdc",
];

/** Grup D — halaman fasilitas lama -> /sarana-prasarana. */
const saranaSlugs = [
  "ruang-multimedia",
  "laboratorium-komputer",
  "laboratorium-kimia",
  "laboratorium-fisika",
  "laboratorium-biologi",
  "perpustakaan",
];

/** Grup E — halaman kompetisi/prestasi lama -> /prestasi. */
const prestasiSlugs = [
  "non-akademik",
  "akademik",
  "fls3n",
  "osn",
  "o2sn",
  "opsi",
  "ldbi",
  "nsdc",
  "kompetisi-keagamaan",
];

/**
 * Grup F — ±85 halaman demo tema WordPress (bahasa Inggris) -> beranda `/`.
 * Ini konten demo template yang ikut terindeks, bukan konten sekolah.
 */
const demoSlugs = [
  "my-account",
  "student-life",
  "giving-information",
  "information-for-parents",
  "faculties-information",
  "undergraduate",
  "graduate",
  "online-education",
  "how-to-apply",
  "dates-deadlines",
  "financial-aid",
  "tuition-fees",
  "student-activities",
  "support-guidance",
  "fitness-athletics",
  "the-campus-experience",
  "schedule-a-tour",
  "apply-form",
  "campus-information",
  "2020-2021-vera-list-center-seminar-series-as-for-protocols",
  "communication-studies",
  "finance",
  "international-business",
  "economics",
  "management",
  "marketing",
  "biology",
  "chemistry",
  "biochemistry",
  "chemical-physics",
  "computer-science",
  "engineering",
  "data-science",
  "environmental-studies",
  "environmental-science",
  "engineering-physics",
  "design",
  "fine-arts",
  "architecture",
  "art-history",
  "biotechnology",
  "corporate-finance",
  "major-in-economics",
  "public-administration",
  "business-media",
  "business-ethics",
  "marketing-2",
  "financial-economics-concentration",
  "development-concentration",
  "international-economics",
  "financial-analysis",
  "information-system",
  "entrepreneurship-and-innovation",
  "nonprofit-administration",
  "chemistry-2",
  "computer-science-2",
  "data-science-2",
  "energy-system-management",
  "philosophy",
  "politics",
  "psychology",
  "public-relations",
  "critical-diversity-studies",
  "english",
  "english-minors",
  "history-2",
  "comparative-literature-and-culture",
  "cultural-anthropology",
  "architecture-2",
  "fashion-design",
  "arts-in-design",
  "interior-design",
  "product-design",
  "design-management",
  "arts-in-landscape-design",
  "media-and-communication-design",
  "request-info",
  "degree-requirements",
  "faq",
  "landing-page",
];

export const legacyRedirects: Redirect[] = [
  // Grup A — berita per-artikel
  ...beritaSlugs.map((slug) => ({
    source: `/${slug}`,
    destination: `/berita/${slug}`,
    statusCode: STATUS_301,
  })),

  // Grup B — halaman Indonesia slug berbeda
  ...pageMappings.map(([source, destination]) => ({
    source,
    destination,
    statusCode: STATUS_301,
  })),

  // Grup C — ekstrakurikuler
  ...ekskulSlugs.map((slug) => ({
    source: `/${slug}`,
    destination: "/ekstrakurikuler",
    statusCode: STATUS_301,
  })),

  // Grup D — sarana & prasarana
  ...saranaSlugs.map((slug) => ({
    source: `/${slug}`,
    destination: "/sarana-prasarana",
    statusCode: STATUS_301,
  })),

  // Grup E — prestasi & kompetisi
  ...prestasiSlugs.map((slug) => ({
    source: `/${slug}`,
    destination: "/prestasi",
    statusCode: STATUS_301,
  })),

  // Grup F — halaman demo tema -> beranda
  ...demoSlugs.map((slug) => ({
    source: `/${slug}`,
    destination: "/",
    statusCode: STATUS_301,
  })),

  // Grup G — namespace taxonomy WordPress (wildcard aman)
  { source: "/category/:slug*", destination: "/berita", statusCode: STATUS_301 },
  { source: "/tag/:slug*", destination: "/berita", statusCode: STATUS_301 },
  { source: "/member/:slug*", destination: "/struktur-organisasi", statusCode: STATUS_301 },
  { source: "/author/:slug*", destination: "/", statusCode: STATUS_301 },
];
