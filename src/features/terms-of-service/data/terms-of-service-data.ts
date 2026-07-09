// ─── Syarat & Ketentuan — SMA Negeri 1 Samarinda ──────────────────────────────
// Mencakup aplikasi SIMSDIG (Sistem Informasi Manajemen Sekolah Digital) dan
// website profil sekolah. Struktur & gaya diadaptasi dari halaman Kebijakan
// Privasi (lihat features/privacy-policy) agar konsisten.
//
// Tersedia dalam dua bahasa (id / en) — dipilih lewat toggle pada halaman.
//
// CATATAN: Isi bersifat template referensi, BUKAN nasihat hukum. Sebaiknya
// ditinjau pihak sekolah sebelum dipublikasikan. Beberapa nilai masih placeholder
// (tanggal berlaku, nama pengembang/vendor).

// ─── Tipe data ────────────────────────────────────────────────────────────────
export type Locale = "id" | "en";

export type TermsBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "subsection"; title: string; items: string[] };

export type TermsReference = {
  label: string;
  url: string;
};

export type TermsSection = {
  /** Slug anchor — dijaga sama antar bahasa agar scroll-spy tetap konsisten. */
  id: string;
  no: number;
  title: string;
  /** Nama ikon Phosphor, di-resolve lewat ICON_MAP di komponen. */
  icon: string;
  /** Ringkasan singkat untuk daftar isi & aksesibilitas. */
  summary: string;
  blocks: TermsBlock[];
  /** Dasar hukum yang dirujuk bagian ini, ditautkan ke JDIH BPK. */
  references?: TermsReference[];
};

/** String antarmuka (di luar isi ketentuan) per bahasa. */
export type TermsUi = {
  eyebrow: string;
  pageTitle: string;
  pageDescription: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  heroTitle: string;
  heroSubtitle: string;
  lastUpdatedLabel: string;
  lastUpdated: string;
  tocLabel: string;
  sectionLabel: string;
  legalBasisLabel: string;
  disclaimer: string;
  toggleLabel: string;
};

// ─── Metadata (netral bahasa) ─────────────────────────────────────────────────
export const termsMeta = {
  version: "1.0",
  schoolName: "SMA Negeri 1 Samarinda",
  schoolShort: "SMANSA",
  appName: "SIMSDIG",
  appLong: "Sistem Informasi Manajemen Sekolah Digital",
  // Email disimpan terpisah agar dapat di-obfuscate saat render (anti-scraping).
  emailUser: "admin",
  emailDomain: "sman1samarinda.sch.id",
  developer: "Tim Pengembang SIMSDIG", // PLACEHOLDER — nama/kontak vendor
  websiteDomain: "sman1samarinda.sch.id",
};

// ─── String antarmuka ─────────────────────────────────────────────────────────
export const termsUi: Record<Locale, TermsUi> = {
  id: {
    eyebrow: "Legal",
    pageTitle: "Syarat & Ketentuan",
    pageDescription:
      "Ketentuan penggunaan aplikasi SIMSDIG dan website profil SMA Negeri 1 Samarinda — hak dan kewajiban pengguna, aturan penggunaan, hak kekayaan intelektual, serta batasan tanggung jawab.",
    breadcrumbHome: "Beranda",
    breadcrumbCurrent: "Syarat & Ketentuan",
    heroTitle: "Syarat & Ketentuan SMANSA",
    heroSubtitle:
      "Berlaku untuk aplikasi SIMSDIG dan website profil SMA Negeri 1 Samarinda.",
    lastUpdatedLabel: "Terakhir diperbarui:",
    lastUpdated: "8 Juli 2026", // PLACEHOLDER — konfirmasi tanggal berlaku
    tocLabel: "Daftar Isi",
    sectionLabel: "Bagian",
    legalBasisLabel: "Dasar Hukum",
    disclaimer:
      "Dokumen ini merupakan syarat & ketentuan umum dan bukan nasihat hukum. Untuk kebutuhan kepatuhan yang spesifik, silakan berkonsultasi dengan pihak yang berwenang.",
    toggleLabel: "Ganti bahasa",
  },
  en: {
    eyebrow: "Legal",
    pageTitle: "Terms of Service",
    pageDescription:
      "Terms governing your use of the SIMSDIG application and the SMA Negeri 1 Samarinda profile website — user rights and obligations, acceptable use, intellectual property, and limitation of liability.",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Terms of Service",
    heroTitle: "SMANSA Terms of Service",
    heroSubtitle:
      "Applies to the SIMSDIG application and the SMA Negeri 1 Samarinda profile website.",
    lastUpdatedLabel: "Last updated:",
    lastUpdated: "July 8, 2026", // PLACEHOLDER — confirm effective date
    tocLabel: "Table of Contents",
    sectionLabel: "Section",
    legalBasisLabel: "Legal Basis",
    disclaimer:
      "This document constitutes general terms of service and does not constitute legal advice. For specific compliance needs, please consult a qualified authority.",
    toggleLabel: "Switch language",
  },
};

// ─── Isi ketentuan (Bahasa Indonesia) ─────────────────────────────────────────
const sectionsId: TermsSection[] = [
  {
    id: "pendahuluan",
    no: 1,
    title: "Pendahuluan & Penerimaan Ketentuan",
    icon: "Info",
    summary: "Siapa kami dan bagaimana ketentuan ini berlaku.",
    blocks: [
      {
        kind: "paragraph",
        text: "Selamat datang di layanan digital SMA Negeri 1 Samarinda (“Sekolah”, “kami”). Syarat & Ketentuan ini (“Ketentuan”) mengatur akses dan penggunaan Anda atas aplikasi SIMSDIG (Sistem Informasi Manajemen Sekolah Digital) serta website profil sekolah (sman1samarinda.sch.id).",
      },
      {
        kind: "paragraph",
        text: "Dengan mengakses, mendaftar, atau menggunakan layanan kami, Anda menyatakan telah membaca, memahami, dan menyetujui untuk terikat oleh Ketentuan ini beserta Kebijakan Privasi kami. Apabila Anda tidak menyetujui sebagian atau seluruh Ketentuan ini, mohon untuk tidak menggunakan layanan kami.",
      },
      {
        kind: "paragraph",
        text: "Bagi pengguna yang belum cukup umur, penggunaan layanan dilakukan dalam kerangka penyelenggaraan pendidikan dan di bawah kewenangan Sekolah serta orang tua/wali.",
      },
    ],
  },
  {
    id: "definisi",
    no: 2,
    title: "Definisi",
    icon: "BookOpen",
    summary: "Arti istilah-istilah yang digunakan dalam ketentuan ini.",
    blocks: [
      {
        kind: "list",
        items: [
          "“Sekolah” berarti SMA Negeri 1 Samarinda sebagai penyelenggara layanan.",
          "“Layanan” berarti aplikasi SIMSDIG dan/atau website profil sekolah beserta seluruh fitur di dalamnya.",
          "“SIMSDIG” berarti Sistem Informasi Manajemen Sekolah Digital, termasuk versi web maupun aplikasi Android/iOS.",
          "“Website” berarti situs profil sekolah pada domain sman1samarinda.sch.id.",
          "“Pengguna” berarti setiap pihak yang mengakses Layanan, termasuk murid, orang tua/wali, guru, tenaga kependidikan, dan pengunjung umum.",
          "“Akun” berarti identitas terdaftar yang diberikan kepada Pengguna untuk mengakses fitur SIMSDIG sesuai perannya.",
          "“Konten” berarti data, teks, foto, dokumen, dan materi lain yang tersedia pada Layanan atau yang diunggah/dibuat oleh Pengguna.",
        ],
      },
    ],
  },
  {
    id: "ruang-lingkup",
    no: 3,
    title: "Ruang Lingkup Layanan",
    icon: "Stack",
    summary: "Layanan apa yang dicakup oleh ketentuan ini.",
    blocks: [
      {
        kind: "paragraph",
        text: "Ketentuan ini berlaku untuk dua layanan yang saling terkait:",
      },
      {
        kind: "list",
        items: [
          "Aplikasi SIMSDIG — platform pengelolaan sekolah yang digunakan oleh murid, orang tua/wali, guru, dan tenaga kependidikan, mencakup fitur seperti presensi/kehadiran, data akademik, serta pengelolaan surat dan dokumen.",
          "Website profil sekolah (sman1samarinda.sch.id) — situs informasi publik berisi profil, berita, program, ekstrakurikuler, prestasi, fasilitas, alumni, dan SPMB.",
        ],
      },
      {
        kind: "paragraph",
        text: "Sebagian fitur SIMSDIG masih dalam tahap pengembangan dan dapat berubah, ditambah, atau dihentikan sewaktu-waktu. Aplikasi SIMSDIG dikembangkan oleh pengembang pihak ketiga untuk kepentingan Sekolah; Sekolah bertindak sebagai penyelenggara layanan.",
      },
    ],
  },
  {
    id: "akun",
    no: 4,
    title: "Akun & Pendaftaran",
    icon: "UserCircle",
    summary: "Ketentuan mengenai akun pengguna.",
    blocks: [
      {
        kind: "list",
        items: [
          "Akun SIMSDIG diberikan oleh Sekolah sesuai peran Anda (murid, orang tua/wali, guru, atau tenaga kependidikan). Sebagian layanan tidak membuka pendaftaran mandiri.",
          "Anda wajib menjaga kerahasiaan kredensial akun (nama pengguna dan kata sandi) dan tidak membagikannya kepada pihak lain.",
          "Anda bertanggung jawab atas seluruh aktivitas yang terjadi melalui akun Anda.",
          "Anda wajib memberikan informasi yang benar, akurat, dan terkini, serta memperbarui data bila terjadi perubahan.",
        ],
      },
      {
        kind: "paragraph",
        text: "Segera beri tahu Sekolah apabila Anda mengetahui atau menduga adanya penggunaan akun tanpa izin atau pelanggaran keamanan lainnya.",
      },
    ],
  },
  {
    id: "penggunaan-diterima",
    no: 5,
    title: "Penggunaan yang Diperbolehkan & Dilarang",
    icon: "CheckCircle",
    summary: "Aturan perilaku pengguna atas layanan.",
    blocks: [
      {
        kind: "paragraph",
        text: "Anda setuju untuk menggunakan Layanan hanya untuk tujuan yang sah dan sesuai dengan penyelenggaraan pendidikan.",
      },
      {
        kind: "subsection",
        title: "Kewajiban Anda",
        items: [
          "Menggunakan Layanan sesuai peran dan kewenangan yang diberikan.",
          "Mematuhi peraturan sekolah dan ketentuan hukum yang berlaku.",
          "Menghormati hak privasi warga sekolah lainnya.",
        ],
      },
      {
        kind: "subsection",
        title: "Anda dilarang",
        items: [
          "Mengakses atau mencoba mengakses akun, data, atau sistem tanpa hak.",
          "Mengunggah atau menyebarkan konten yang melanggar hukum, menyinggung SARA, memfitnah, mengandung pornografi, atau melanggar hak pihak lain.",
          "Mengganggu, merusak, atau membebani sistem secara tidak wajar (misalnya peretasan, penyebaran malware, atau serangan otomatis).",
          "Menyalahgunakan Layanan untuk tujuan komersial yang tidak berkaitan dengan pendidikan, penipuan, atau kegiatan melawan hukum.",
          "Merekayasa balik (reverse engineering) atau menyalin bagian Layanan tanpa izin tertulis.",
        ],
      },
    ],
    references: [
      {
        label: "UU No. 11 Tahun 2008 jo. UU No. 19 Tahun 2016 tentang Informasi dan Transaksi Elektronik",
        url: "https://peraturan.bpk.go.id/Details/37582/uu-no-19-tahun-2016",
      },
    ],
  },
  {
    id: "konten-pengguna",
    no: 6,
    title: "Konten Pengguna",
    icon: "UploadSimple",
    summary: "Tanggung jawab atas konten yang Anda unggah.",
    blocks: [
      {
        kind: "paragraph",
        text: "Sebagian fitur memungkinkan Anda mengunggah atau membuat Konten (misalnya foto presensi, dokumen, atau surat). Anda tetap bertanggung jawab penuh atas Konten yang Anda unggah dan menjamin bahwa Anda berhak melakukannya.",
      },
      {
        kind: "paragraph",
        text: "Dengan mengunggah Konten, Anda memberikan Sekolah lisensi terbatas dan bebas royalti untuk menyimpan, menampilkan, dan memproses Konten tersebut sejauh diperlukan untuk mengoperasikan Layanan dan menyelenggarakan pendidikan. Sekolah dapat menghapus atau menonaktifkan Konten yang dinilai melanggar Ketentuan ini atau ketentuan hukum yang berlaku.",
      },
    ],
  },
  {
    id: "kekayaan-intelektual",
    no: 7,
    title: "Hak Kekayaan Intelektual",
    icon: "Copyright",
    summary: "Kepemilikan atas merek dan konten layanan.",
    blocks: [
      {
        kind: "paragraph",
        text: "Nama, logo, merek, desain, teks, dan seluruh Konten resmi pada Layanan merupakan milik Sekolah atau pengembang aplikasi, dan dilindungi oleh hak kekayaan intelektual sesuai ketentuan yang berlaku.",
      },
      {
        kind: "paragraph",
        text: "Anda tidak diperkenankan menyalin, memodifikasi, mendistribusikan, atau menggunakan materi tersebut untuk tujuan di luar penggunaan Layanan tanpa izin tertulis dari pihak yang berhak.",
      },
    ],
  },
  {
    id: "privasi",
    no: 8,
    title: "Privasi & Perlindungan Data",
    icon: "Lock",
    summary: "Bagaimana data pribadi Anda diperlakukan.",
    blocks: [
      {
        kind: "paragraph",
        text: "Pengumpulan dan pemrosesan data pribadi Anda diatur dalam Kebijakan Privasi kami, yang merupakan bagian tak terpisahkan dari Ketentuan ini. Kami mendorong Anda untuk membaca Kebijakan Privasi guna memahami bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda.",
      },
      {
        kind: "list",
        items: [
          "Selengkapnya, lihat halaman Kebijakan Privasi kami di {{privacy}}.",
        ],
      },
    ],
  },
  {
    id: "ketersediaan",
    no: 9,
    title: "Ketersediaan Layanan & Pemeliharaan",
    icon: "Wrench",
    summary: "Ketentuan mengenai ketersediaan dan perubahan layanan.",
    blocks: [
      {
        kind: "paragraph",
        text: "Layanan disediakan “sebagaimana adanya” (as is) dan “sebagaimana tersedia” (as available). Kami berupaya menjaga Layanan tetap dapat diakses, namun tidak menjamin Layanan bebas dari gangguan, kesalahan, atau penghentian sementara.",
      },
      {
        kind: "list",
        items: [
          "Kami dapat melakukan pemeliharaan, pembaruan, atau perbaikan yang dapat menyebabkan Layanan tidak tersedia untuk sementara waktu.",
          "Kami dapat menambah, mengubah, atau menghentikan fitur tertentu sewaktu-waktu untuk peningkatan layanan.",
        ],
      },
    ],
  },
  {
    id: "penafian",
    no: 10,
    title: "Penafian & Batasan Tanggung Jawab",
    icon: "WarningCircle",
    summary: "Batas tanggung jawab Sekolah dan pengembang.",
    blocks: [
      {
        kind: "paragraph",
        text: "Sepanjang diizinkan oleh hukum yang berlaku, Sekolah dan pengembang aplikasi tidak bertanggung jawab atas kerugian tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan menggunakan Layanan.",
      },
      {
        kind: "paragraph",
        text: "Kami tidak bertanggung jawab atas kerugian yang diakibatkan oleh kelalaian Pengguna dalam menjaga kerahasiaan akun, penggunaan Layanan di luar peruntukannya, atau gangguan yang berada di luar kendali wajar kami. Ketentuan ini tidak menghapus tanggung jawab yang menurut hukum tidak dapat dikecualikan.",
      },
    ],
  },
  {
    id: "penangguhan",
    no: 11,
    title: "Penangguhan & Penghentian Akun",
    icon: "Prohibit",
    summary: "Kondisi akun dapat ditangguhkan atau dihentikan.",
    blocks: [
      {
        kind: "paragraph",
        text: "Kami dapat menangguhkan atau menghentikan akses Anda ke Layanan, baik sebagian maupun seluruhnya, apabila Anda melanggar Ketentuan ini, melakukan aktivitas yang membahayakan keamanan sistem, atau atas dasar ketentuan hukum yang berlaku.",
      },
      {
        kind: "list",
        items: [
          "Akun juga dapat dinonaktifkan ketika murid lulus atau pindah, atau ketika guru/tenaga kependidikan tidak lagi bertugas di Sekolah.",
          "Setelah penghentian, hak Anda untuk menggunakan Layanan berakhir, namun ketentuan yang menurut sifatnya tetap berlaku (misalnya hak kekayaan intelektual dan batasan tanggung jawab) akan terus berlaku.",
        ],
      },
    ],
  },
  {
    id: "hukum",
    no: 12,
    title: "Hukum yang Berlaku & Penyelesaian Sengketa",
    icon: "Scales",
    summary: "Hukum yang mengatur dan cara menyelesaikan sengketa.",
    blocks: [
      {
        kind: "paragraph",
        text: "Ketentuan ini diatur dan ditafsirkan berdasarkan hukum Republik Indonesia. Setiap perselisihan yang timbul sehubungan dengan Layanan akan diupayakan diselesaikan terlebih dahulu secara musyawarah untuk mufakat.",
      },
      {
        kind: "paragraph",
        text: "Apabila musyawarah tidak mencapai kesepakatan, penyelesaian dapat ditempuh melalui jalur hukum sesuai ketentuan yang berlaku di Indonesia.",
      },
    ],
    references: [
      {
        label: "UU No. 11 Tahun 2008 jo. UU No. 19 Tahun 2016 tentang Informasi dan Transaksi Elektronik",
        url: "https://peraturan.bpk.go.id/Details/37582/uu-no-19-tahun-2016",
      },
      {
        label: "UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi",
        url: "https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022",
      },
    ],
  },
  {
    id: "perubahan-kontak",
    no: 13,
    title: "Perubahan Ketentuan & Kontak",
    icon: "Envelope",
    summary: "Pembaruan ketentuan dan cara menghubungi kami.",
    blocks: [
      {
        kind: "paragraph",
        text: "Kami dapat memperbarui Ketentuan ini dari waktu ke waktu untuk menyesuaikan dengan perubahan layanan atau ketentuan hukum. Perubahan akan dipublikasikan pada halaman ini, dan tanggal “terakhir diperbarui” di bagian atas akan diperbarui. Dengan terus menggunakan Layanan setelah perubahan berlaku, Anda dianggap menyetujui Ketentuan yang telah diperbarui.",
      },
      {
        kind: "paragraph",
        text: "Untuk pertanyaan atau keterangan lebih lanjut mengenai Ketentuan ini, silakan hubungi:",
      },
      {
        kind: "list",
        items: [
          "SMA Negeri 1 Samarinda — Jl. Drs. H. Anang Hasyim, Air Hitam, Samarinda, Kalimantan Timur 75124.",
          "Email: {{email}}",
          "Telepon: (0541) 741305.",
          "Untuk hal teknis terkait aplikasi SIMSDIG, Sekolah dapat meneruskan pertanyaan Anda kepada tim pengembang.",
        ],
      },
    ],
  },
];

// ─── Isi ketentuan (English) ──────────────────────────────────────────────────
const sectionsEn: TermsSection[] = [
  {
    id: "pendahuluan",
    no: 1,
    title: "Introduction & Acceptance of Terms",
    icon: "Info",
    summary: "Who we are and how these terms apply.",
    blocks: [
      {
        kind: "paragraph",
        text: "Welcome to the digital services of SMA Negeri 1 Samarinda (“the School”, “we”). These Terms of Service (“Terms”) govern your access to and use of the SIMSDIG application (Sistem Informasi Manajemen Sekolah Digital — Digital School Management Information System) and the school profile website (sman1samarinda.sch.id).",
      },
      {
        kind: "paragraph",
        text: "By accessing, registering for, or using our services, you confirm that you have read, understood, and agreed to be bound by these Terms together with our Privacy Policy. If you do not agree with any part of these Terms, please do not use our services.",
      },
      {
        kind: "paragraph",
        text: "For users who are minors, use of the services takes place within the framework of education and under the authority of the School and parents/guardians.",
      },
    ],
  },
  {
    id: "definisi",
    no: 2,
    title: "Definitions",
    icon: "BookOpen",
    summary: "The meaning of terms used in these Terms.",
    blocks: [
      {
        kind: "list",
        items: [
          "“The School” means SMA Negeri 1 Samarinda as the provider of the services.",
          "“Services” means the SIMSDIG application and/or the school profile website and all features within them.",
          "“SIMSDIG” means the Digital School Management Information System, including its web version and Android/iOS applications.",
          "“Website” means the school profile site at the domain sman1samarinda.sch.id.",
          "“User” means any party who accesses the Services, including students, parents/guardians, teachers, education personnel, and general visitors.",
          "“Account” means the registered identity granted to a User to access SIMSDIG features according to their role.",
          "“Content” means data, text, photos, documents, and other materials available on the Services or uploaded/created by Users.",
        ],
      },
    ],
  },
  {
    id: "ruang-lingkup",
    no: 3,
    title: "Scope of Services",
    icon: "Stack",
    summary: "Which services these Terms cover.",
    blocks: [
      {
        kind: "paragraph",
        text: "These Terms apply to two related services:",
      },
      {
        kind: "list",
        items: [
          "The SIMSDIG application — a school-management platform used by students, parents/guardians, teachers, and education personnel, covering features such as attendance, academic data, and the management of letters and documents.",
          "The school profile website (sman1samarinda.sch.id) — a public information site covering the school profile, news, programs, extracurriculars, achievements, facilities, alumni, and admissions (SPMB).",
        ],
      },
      {
        kind: "paragraph",
        text: "Some SIMSDIG features are still under development and may be changed, added, or discontinued at any time. SIMSDIG is developed by a third-party developer on behalf of the School; the School acts as the service provider.",
      },
    ],
  },
  {
    id: "akun",
    no: 4,
    title: "Accounts & Registration",
    icon: "UserCircle",
    summary: "Terms regarding user accounts.",
    blocks: [
      {
        kind: "list",
        items: [
          "SIMSDIG accounts are issued by the School according to your role (student, parent/guardian, teacher, or education personnel). Some services do not offer self-registration.",
          "You must keep your account credentials (username and password) confidential and must not share them with others.",
          "You are responsible for all activity that occurs through your account.",
          "You must provide true, accurate, and up-to-date information, and update your data when it changes.",
        ],
      },
      {
        kind: "paragraph",
        text: "Notify the School promptly if you become aware of or suspect any unauthorized use of your account or any other security breach.",
      },
    ],
  },
  {
    id: "penggunaan-diterima",
    no: 5,
    title: "Acceptable & Prohibited Use",
    icon: "CheckCircle",
    summary: "Rules for user conduct on the Services.",
    blocks: [
      {
        kind: "paragraph",
        text: "You agree to use the Services only for lawful purposes and in accordance with the delivery of education.",
      },
      {
        kind: "subsection",
        title: "Your obligations",
        items: [
          "Use the Services according to the role and authority granted to you.",
          "Comply with school regulations and applicable law.",
          "Respect the privacy rights of other members of the school community.",
        ],
      },
      {
        kind: "subsection",
        title: "You must not",
        items: [
          "Access or attempt to access accounts, data, or systems without authorization.",
          "Upload or distribute content that is unlawful, discriminatory, defamatory, pornographic, or that infringes the rights of others.",
          "Disrupt, damage, or unreasonably burden the systems (for example hacking, distributing malware, or automated attacks).",
          "Misuse the Services for commercial purposes unrelated to education, fraud, or unlawful activity.",
          "Reverse engineer or copy any part of the Services without written permission.",
        ],
      },
    ],
    references: [
      {
        label: "Law No. 11 of 2008 as amended by Law No. 19 of 2016 on Electronic Information and Transactions",
        url: "https://peraturan.bpk.go.id/Details/37582/uu-no-19-tahun-2016",
      },
    ],
  },
  {
    id: "konten-pengguna",
    no: 6,
    title: "User Content",
    icon: "UploadSimple",
    summary: "Responsibility for content you upload.",
    blocks: [
      {
        kind: "paragraph",
        text: "Some features allow you to upload or create Content (for example attendance photos, documents, or letters). You remain fully responsible for the Content you upload and warrant that you have the right to do so.",
      },
      {
        kind: "paragraph",
        text: "By uploading Content, you grant the School a limited, royalty-free license to store, display, and process that Content to the extent necessary to operate the Services and deliver education. The School may remove or disable Content deemed to violate these Terms or applicable law.",
      },
    ],
  },
  {
    id: "kekayaan-intelektual",
    no: 7,
    title: "Intellectual Property",
    icon: "Copyright",
    summary: "Ownership of the Services' marks and content.",
    blocks: [
      {
        kind: "paragraph",
        text: "The name, logo, trademarks, design, text, and all official Content on the Services belong to the School or the application developer and are protected by intellectual property rights under applicable law.",
      },
      {
        kind: "paragraph",
        text: "You may not copy, modify, distribute, or use such materials for purposes beyond using the Services without written permission from the rights holder.",
      },
    ],
  },
  {
    id: "privasi",
    no: 8,
    title: "Privacy & Data Protection",
    icon: "Lock",
    summary: "How your personal data is treated.",
    blocks: [
      {
        kind: "paragraph",
        text: "The collection and processing of your personal data is governed by our Privacy Policy, which forms an integral part of these Terms. We encourage you to read the Privacy Policy to understand how we collect, use, and protect your data.",
      },
      {
        kind: "list",
        items: [
          "For details, see our Privacy Policy page at {{privacy}}.",
        ],
      },
    ],
  },
  {
    id: "ketersediaan",
    no: 9,
    title: "Service Availability & Maintenance",
    icon: "Wrench",
    summary: "Terms on availability and changes to the Services.",
    blocks: [
      {
        kind: "paragraph",
        text: "The Services are provided “as is” and “as available”. We strive to keep the Services accessible but do not guarantee that they will be free from interruption, error, or temporary suspension.",
      },
      {
        kind: "list",
        items: [
          "We may carry out maintenance, updates, or repairs that may make the Services temporarily unavailable.",
          "We may add, change, or discontinue certain features at any time to improve the Services.",
        ],
      },
    ],
  },
  {
    id: "penafian",
    no: 10,
    title: "Disclaimers & Limitation of Liability",
    icon: "WarningCircle",
    summary: "The limits of the School's and developer's liability.",
    blocks: [
      {
        kind: "paragraph",
        text: "To the extent permitted by applicable law, the School and the application developer are not liable for any indirect, incidental, or consequential losses arising from the use of, or inability to use, the Services.",
      },
      {
        kind: "paragraph",
        text: "We are not responsible for losses caused by a User's failure to keep their account confidential, use of the Services outside their intended purpose, or disruptions beyond our reasonable control. Nothing in these Terms excludes liability that cannot be excluded by law.",
      },
    ],
  },
  {
    id: "penangguhan",
    no: 11,
    title: "Suspension & Termination of Accounts",
    icon: "Prohibit",
    summary: "When an account may be suspended or terminated.",
    blocks: [
      {
        kind: "paragraph",
        text: "We may suspend or terminate your access to the Services, in whole or in part, if you violate these Terms, engage in activity that endangers system security, or on the basis of applicable law.",
      },
      {
        kind: "list",
        items: [
          "Accounts may also be deactivated when a student graduates or transfers, or when a teacher/education personnel no longer serves at the School.",
          "Upon termination, your right to use the Services ends, but provisions that by their nature survive (for example intellectual property and limitation of liability) will continue to apply.",
        ],
      },
    ],
  },
  {
    id: "hukum",
    no: 12,
    title: "Governing Law & Dispute Resolution",
    icon: "Scales",
    summary: "The governing law and how disputes are resolved.",
    blocks: [
      {
        kind: "paragraph",
        text: "These Terms are governed by and construed in accordance with the laws of the Republic of Indonesia. Any dispute arising in connection with the Services shall first be resolved amicably through deliberation to reach consensus.",
      },
      {
        kind: "paragraph",
        text: "If deliberation does not reach agreement, resolution may be pursued through legal channels in accordance with the laws applicable in Indonesia.",
      },
    ],
    references: [
      {
        label: "Law No. 11 of 2008 as amended by Law No. 19 of 2016 on Electronic Information and Transactions",
        url: "https://peraturan.bpk.go.id/Details/37582/uu-no-19-tahun-2016",
      },
      {
        label: "Law No. 27 of 2022 on Personal Data Protection",
        url: "https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022",
      },
    ],
  },
  {
    id: "perubahan-kontak",
    no: 13,
    title: "Changes to Terms & Contact",
    icon: "Envelope",
    summary: "How the Terms are updated and how to reach us.",
    blocks: [
      {
        kind: "paragraph",
        text: "We may update these Terms from time to time to reflect changes in our services or legal requirements. Changes will be published on this page, and the “last updated” date at the top will be revised. By continuing to use the Services after changes take effect, you are deemed to accept the updated Terms.",
      },
      {
        kind: "paragraph",
        text: "For questions or further information about these Terms, please contact:",
      },
      {
        kind: "list",
        items: [
          "SMA Negeri 1 Samarinda — Jl. Drs. H. Anang Hasyim, Air Hitam, Samarinda, East Kalimantan 75124.",
          "Email: {{email}}",
          "Phone: (0541) 741305.",
          "For technical matters regarding the SIMSDIG application, the School may forward your inquiry to the development team.",
        ],
      },
    ],
  },
];

export const termsSections: Record<Locale, TermsSection[]> = {
  id: sectionsId,
  en: sectionsEn,
};
