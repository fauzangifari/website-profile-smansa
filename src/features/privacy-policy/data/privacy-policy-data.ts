// ─── Kebijakan Privasi — SMA Negeri 1 Samarinda ───────────────────────────────
// Mencakup aplikasi SIMSDIG (Sistem Informasi Manajemen Sekolah Digital) dan
// website profil sekolah. Struktur diadaptasi dari kebijakan privasi SIMSDIG
// (referensi: akhmadqasim.com) dan disesuaikan untuk SMANSA.
//
// Tersedia dalam dua bahasa (id / en) — dipilih lewat toggle pada halaman.
//
// CATATAN: Isi bersifat template referensi, BUKAN nasihat hukum. Sebaiknya
// ditinjau pihak sekolah sebelum dipublikasikan. Beberapa nilai masih placeholder
// (tanggal berlaku, nama pengembang/vendor, penyedia infrastruktur).

// ─── Tipe data ────────────────────────────────────────────────────────────────
export type Locale = "id" | "en";

export type PolicyBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "subsection"; title: string; items: string[] };

export type PolicyReference = {
  label: string;
  url: string;
};

export type PolicySection = {
  /** Slug anchor — dijaga sama antar bahasa agar scroll-spy tetap konsisten. */
  id: string;
  no: number;
  title: string;
  /** Nama ikon Phosphor, di-resolve lewat ICON_MAP di komponen. */
  icon: string;
  /** Ringkasan singkat untuk daftar isi & aksesibilitas. */
  summary: string;
  blocks: PolicyBlock[];
  /** Dasar hukum yang dirujuk bagian ini, ditautkan ke JDIH BPK. */
  references?: PolicyReference[];
};

/** String antarmuka (di luar isi kebijakan) per bahasa. */
export type PolicyUi = {
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
export const policyMeta = {
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
export const policyUi: Record<Locale, PolicyUi> = {
  id: {
    eyebrow: "Legal",
    pageTitle: "Kebijakan Privasi",
    pageDescription:
      "Penjelasan mengenai bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda di aplikasi SIMSDIG dan website profil SMA Negeri 1 Samarinda.",
    breadcrumbHome: "Beranda",
    breadcrumbCurrent: "Kebijakan Privasi",
    heroTitle: "Kebijakan Privasi SMANSA",
    heroSubtitle:
      "Berlaku untuk aplikasi SIMSDIG dan website profil SMA Negeri 1 Samarinda.",
    lastUpdatedLabel: "Terakhir diperbarui:",
    lastUpdated: "8 Juli 2026", // PLACEHOLDER — konfirmasi tanggal berlaku
    tocLabel: "Daftar Isi",
    sectionLabel: "Bagian",
    legalBasisLabel: "Dasar Hukum",
    disclaimer:
      "Dokumen ini merupakan kebijakan privasi umum dan bukan nasihat hukum. Untuk kebutuhan kepatuhan yang spesifik, silakan berkonsultasi dengan pihak yang berwenang.",
    toggleLabel: "Ganti bahasa",
  },
  en: {
    eyebrow: "Legal",
    pageTitle: "Privacy Policy",
    pageDescription:
      "How we collect, use, and protect your personal data across the SIMSDIG application and the SMA Negeri 1 Samarinda profile website.",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Privacy Policy",
    heroTitle: "SMANSA Privacy Policy",
    heroSubtitle:
      "Applies to the SIMSDIG application and the SMA Negeri 1 Samarinda profile website.",
    lastUpdatedLabel: "Last updated:",
    lastUpdated: "July 8, 2026", // PLACEHOLDER — confirm effective date
    tocLabel: "Table of Contents",
    sectionLabel: "Section",
    legalBasisLabel: "Legal Basis",
    disclaimer:
      "This document is a general privacy policy and does not constitute legal advice. For specific compliance needs, please consult a qualified authority.",
    toggleLabel: "Switch language",
  },
};

// ─── Isi kebijakan (Bahasa Indonesia) ─────────────────────────────────────────
const sectionsId: PolicySection[] = [
  {
    id: "pendahuluan",
    no: 1,
    title: "Pendahuluan & Ruang Lingkup",
    icon: "Info",
    summary: "Siapa kami dan layanan apa yang dicakup kebijakan ini.",
    blocks: [
      {
        kind: "paragraph",
        text: "SMA Negeri 1 Samarinda (“Sekolah”, “kami”) menghormati privasi setiap pengguna layanan digital kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, membagikan, dan melindungi data pribadi Anda.",
      },
      {
        kind: "paragraph",
        text: "Kebijakan ini berlaku untuk dua layanan yang saling terkait:",
      },
      {
        kind: "list",
        items: [
          "Aplikasi SIMSDIG (Sistem Informasi Manajemen Sekolah Digital) — platform pengelolaan sekolah yang digunakan oleh murid, orang tua/wali, guru, dan tenaga kependidikan.",
          "Website profil sekolah (sman1samarinda.sch.id) — situs informasi publik berisi profil, berita, program, ekstrakurikuler, prestasi, fasilitas, alumni, dan SPMB.",
        ],
      },
      {
        kind: "paragraph",
        text: "Dengan menggunakan aplikasi SIMSDIG maupun website ini, Anda dianggap telah membaca, memahami, dan menyetujui praktik yang dijelaskan dalam kebijakan ini. Aplikasi SIMSDIG dikembangkan oleh pengembang pihak ketiga untuk kepentingan Sekolah; Sekolah bertindak sebagai pengendali data (data controller) atas data pengguna.",
      },
    ],
  },
  {
    id: "informasi-dikumpulkan",
    no: 2,
    title: "Informasi yang Kami Kumpulkan",
    icon: "Database",
    summary: "Jenis data yang kami kumpulkan dari tiap kelompok pengguna.",
    blocks: [
      {
        kind: "paragraph",
        text: "Jenis data yang kami kumpulkan bergantung pada peran Anda dan cara Anda menggunakan layanan kami.",
      },
      {
        kind: "subsection",
        title: "Data akun & autentikasi (semua peran)",
        items: [
          "Informasi akun: nama pengguna, kata sandi (tersimpan dalam bentuk hash), serta peran (murid, orang tua/wali, guru, atau tenaga kependidikan).",
          "Riwayat Data sesi login, waktu akses, dan aktivitas dasar untuk menjaga keamanan akun.",
          "Riwayat Data presensi/kehadiran, termasuk waktu dan — jika fitur terkait diaktifkan — lokasi serta foto saat presensi.",
        ],
      },
      {
        kind: "subsection",
        title: "Data murid",
        items: [
          "Identitas: nama lengkap, NISN/NIS, tempat & tanggal lahir, jenis kelamin, dan foto.",
          "Data demografis dan keluarga: alamat, nama orang tua/wali, serta kontak yang relevan.",
          "Data akademik: kelas, riwayat nilai, rapor, dan catatan kegiatan sekolah.",
        ],
      },
      {
        kind: "subsection",
        title: "Data guru & tenaga kependidikan",
        items: [
          "Data kepegawaian dan identitas: nama, NIP/NUPTK, serta jabatan.",
          "Data kontak dan penugasan mengajar atau tugas administratif.",
        ],
      },
      {
        kind: "subsection",
        title: "Surat & dokumen",
        items: [
          "Dokumen administratif sekolah, surat menyurat, dan berkas terkait yang diunggah atau dibuat melalui aplikasi.",
        ],
      },
      {
        kind: "subsection",
        title: "Data pengunjung website",
        items: [
          "Data yang Anda kirimkan secara sukarela melalui formulir (misalnya nama dan kontak pada formulir pendaftaran/hubungi kami), bila tersedia.",
          "Cookie fungsional — lihat bagian Cookie & Autentikasi.",
        ],
      },
      {
        kind: "subsection",
        title: "Izin perangkat (aplikasi android/iOS)",
        items: [
          "Kamera — untuk mengambil foto presensi atau mengunggah dokumen.",
          "Lokasi (GPS) — untuk memverifikasi presensi berbasis lokasi, bila fitur ini diaktifkan.",
          "Galeri/penyimpanan — untuk memilih dan mengunggah foto atau berkas.",
        ],
      },
      {
        kind: "paragraph",
        text: "Izin perangkat hanya digunakan sesuai fungsi di atas dan hanya aktif ketika Anda memberikan persetujuan pada perangkat Anda.",
      },
    ],
  },
  {
    id: "penggunaan",
    no: 3,
    title: "Bagaimana Kami Menggunakan Informasi",
    icon: "GearSix",
    summary: "Tujuan pemrosesan data Anda.",
    blocks: [
      {
        kind: "paragraph",
        text: "Kami menggunakan data pribadi Anda untuk tujuan berikut:",
      },
      {
        kind: "list",
        items: [
          "Administrasi pendidikan: mengelola data murid, guru, kelas, nilai, dan kegiatan sekolah.",
          "Manajemen presensi/kehadiran warga sekolah.",
          "Penyediaan dan pengoperasian layanan aplikasi serta website.",
          "Keamanan sistem, pencegahan penyalahgunaan, dan menjaga integritas data.",
          "Komunikasi resmi sekolah, pengumuman, dan penyampaian informasi kepada pengguna.",
          "Pemenuhan kewajiban administratif dan pelaporan sesuai ketentuan yang berlaku.",
        ],
      },
      {
        kind: "paragraph",
        text: "Kami tidak menggunakan data pribadi Anda untuk iklan atau tujuan komersial yang tidak berkaitan dengan penyelenggaraan pendidikan.",
      },
    ],
  },
  {
    id: "berbagi-data",
    no: 4,
    title: "Berbagi Data & Layanan Pihak Ketiga",
    icon: "ShareNetwork",
    summary: "Dengan siapa data dibagikan dan dalam kondisi apa.",
    blocks: [
      {
        kind: "paragraph",
        text: "Kami tidak menjual data pribadi Anda. Data hanya dapat diakses atau dibagikan dalam keadaan berikut:",
      },
      {
        kind: "list",
        items: [
          "Akses internal sekolah: pihak berwenang di lingkungan sekolah (misalnya wali kelas, guru, dan administrator) sesuai peran dan kebutuhan tugasnya.",
          "Penyedia infrastruktur teknis: menggunakan database dan server yang terletak di Indonesia.",
          "Kepatuhan hukum: mengungkapkan data ketika diwajibkan oleh hukum, peraturan pemerintah, atau proses hukum yang berlaku di Indonesia — termasuk ketentuan pelindungan data pribadi dan penyelenggaraan sistem elektronik sebagaimana dirujuk pada Dasar Hukum di bawah.",
        ],
      },
      {
        kind: "paragraph",
        text: "Kami tidak menggunakan layanan periklanan pihak ketiga maupun analitik yang memperjualbelikan data pengguna.",
      },
    ],
    references: [
      {
        label: "UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi",
        url: "https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022",
      },
      {
        label: "PP No. 71 Tahun 2019 tentang Penyelenggaraan Sistem dan Transaksi Elektronik",
        url: "https://peraturan.bpk.go.id/Details/122030/pp-no-71-tahun-2019",
      },
      {
        label: "Permenkominfo No. 20 Tahun 2016 tentang Perlindungan Data Pribadi dalam Sistem Elektronik",
        url: "https://peraturan.bpk.go.id/Details/150543/permenkominfo-no-20-tahun-2016",
      },
    ],
  },
  {
    id: "keamanan",
    no: 5,
    title: "Keamanan Data",
    icon: "ShieldCheck",
    summary: "Langkah perlindungan dan pembagian tanggung jawab.",
    blocks: [
      {
        kind: "list",
        items: [
          "Kata sandi disimpan dalam bentuk hash, bukan sebagai teks biasa.",
          "Transmisi data dilindungi enkripsi (HTTPS/TLS) saat dikirim antar sistem.",
          "Kontrol akses berbasis peran membatasi data yang dapat dilihat setiap pengguna.",
          "Pemantauan sistem dilakukan untuk mendeteksi aktivitas yang tidak wajar.",
        ],
      },
      {
        kind: "paragraph",
        text: "Sekolah bertindak sebagai pengendali data (data controller) atas data warga sekolah, sedangkan pengembang aplikasi bertindak sebagai penyedia teknis (data processor). Meskipun kami menerapkan langkah pengamanan yang wajar, tidak ada sistem yang sepenuhnya bebas risiko; kami tidak dapat menjamin keamanan mutlak atas data yang dikirimkan melalui internet.",
      },
    ],
  },
  {
    id: "cookie",
    no: 6,
    title: "Cookie & Autentikasi",
    icon: "Cookie",
    summary: "Cookie yang kami gunakan dan tujuannya.",
    blocks: [
      {
        kind: "paragraph",
        text: "Kami menggunakan cookie fungsional yang diperlukan agar layanan dapat berjalan dengan baik, terutama untuk autentikasi dan preferensi pengguna. Cookie ini antara lain:",
      },
      {
        kind: "list",
        items: [
          "Token sesi — menjaga Anda tetap masuk (login) selama sesi berlangsung.",
          "Preferensi — menyimpan pilihan dasar tampilan atau bahasa, bila tersedia.",
        ],
      },
      {
        kind: "paragraph",
        text: "Kami tidak menggunakan cookie untuk pelacakan iklan. Anda dapat mengelola atau menghapus cookie melalui pengaturan peramban, namun beberapa fitur mungkin tidak berfungsi optimal jika cookie dinonaktifkan.",
      },
    ],
  },
  {
    id: "retensi",
    no: 7,
    title: "Penyimpanan, Retensi & Penghapusan Data",
    icon: "ClockCounterClockwise",
    summary: "Berapa lama data disimpan dan bagaimana dihapus.",
    blocks: [
      {
        kind: "list",
        items: [
          "Data disimpan selama dibutuhkan untuk tujuan penyelenggaraan pendidikan dan sepanjang akun/relasi Anda dengan sekolah masih aktif.",
          "Akun dapat dinonaktifkan ketika murid lulus atau pindah, atau ketika guru/tenaga kependidikan tidak lagi bertugas di sekolah.",
          "Sebagian data akademik mungkin perlu disimpan lebih lama untuk memenuhi kewajiban arsip dan pelaporan sesuai ketentuan yang berlaku.",
        ],
      },
      {
        kind: "paragraph",
        text: "Anda dapat mengajukan permintaan koreksi atau penghapusan data melalui kontak resmi kami. Permintaan akan kami tanggapi dalam jangka waktu yang wajar, dengan memperhatikan batasan hukum dan kebutuhan arsip sekolah.",
      },
    ],
  },
  {
    id: "privasi-anak",
    no: 8,
    title: "Privasi Anak",
    icon: "Baby",
    summary: "Perlindungan data murid di bawah umur.",
    blocks: [
      {
        kind: "paragraph",
        text: "Sebagian pengguna layanan kami adalah anak di bawah umur. Pengumpulan dan pemrosesan data murid dilakukan dalam kerangka penyelenggaraan pendidikan dan di bawah kewenangan sekolah serta orang tua/wali.",
      },
      {
        kind: "paragraph",
        text: "Kami berupaya mematuhi ketentuan perlindungan anak yang berlaku, khususnya Undang-Undang Perlindungan Anak. Persetujuan orang tua/wali dianggap terwakili melalui hubungan resmi antara murid dan sekolah. Orang tua/wali dapat menghubungi sekolah untuk pertanyaan mengenai data anak mereka.",
      },
    ],
    references: [
      {
        label: "UU No. 35 Tahun 2014 tentang Perlindungan Anak",
        url: "https://peraturan.bpk.go.id/Details/38723/uu-no-35-tahun-2014",
      },
      {
        label: "UU No. 23 Tahun 2002 tentang Perlindungan Anak",
        url: "https://peraturan.bpk.go.id/Details/44473",
      },
    ],
  },
  {
    id: "lokasi-penyimpanan",
    no: 9,
    title: "Lokasi Penyimpanan Data",
    icon: "MapPinLine",
    summary: "Di mana data Anda disimpan dan diproses.",
    blocks: [
      {
        kind: "paragraph",
        text: "Data pada umumnya disimpan dan diproses di Indonesia. Dalam hal tertentu, sebagian pemrosesan teknis dapat melibatkan penyedia infrastruktur yang beroperasi lintas negara (misalnya layanan CDN/keamanan). Dalam hal demikian, kami mengupayakan penyedia yang menerapkan standar keamanan yang memadai.",
      },
    ],
  },
  {
    id: "pelanggaran-data",
    no: 10,
    title: "Pemberitahuan Pelanggaran Data",
    icon: "WarningCircle",
    summary: "Tindakan kami bila terjadi kebocoran data.",
    blocks: [
      {
        kind: "paragraph",
        text: "Apabila terjadi pelanggaran atau kebocoran data pribadi yang berdampak pada Anda, kami akan mengambil langkah penanganan dan memberikan pemberitahuan kepada pihak yang terdampak serta otoritas yang berwenang sesuai ketentuan yang berlaku, termasuk Undang-Undang Pelindungan Data Pribadi (UU PDP) — pada prinsipnya dalam waktu paling lama 72 jam sejak pelanggaran diketahui.",
      },
    ],
    references: [
      {
        label: "UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi",
        url: "https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022",
      },
    ],
  },
  {
    id: "keputusan-otomatis",
    no: 11,
    title: "Pengambilan Keputusan Otomatis",
    icon: "Robot",
    summary: "Kami tidak melakukan profiling otomatis.",
    blocks: [
      {
        kind: "paragraph",
        text: "Saat ini kami tidak menggunakan algoritma kecerdasan buatan atau profiling otomatis untuk mengambil keputusan yang menimbulkan dampak hukum atau signifikan terhadap Anda. Setiap keputusan penting terkait murid, guru, atau tenaga kependidikan tetap melibatkan penilaian manusia.",
      },
    ],
  },
  {
    id: "data-agregat",
    no: 12,
    title: "Data Anonim & Agregat",
    icon: "ChartBar",
    summary: "Penggunaan data yang telah dianonimkan.",
    blocks: [
      {
        kind: "paragraph",
        text: "Kami dapat menggunakan data yang telah dianonimkan atau diagregasi — sehingga tidak dapat lagi mengidentifikasi individu — untuk keperluan statistik, pelaporan, atau peningkatan layanan. Data dalam bentuk ini tidak tunduk pada pembatasan yang sama dengan data pribadi.",
      },
    ],
  },
  {
    id: "hak-anda",
    no: 13,
    title: "Hak Anda & Pengaduan",
    icon: "Scales",
    summary: "Hak Anda sebagai subjek data dan cara mengajukan keluhan.",
    blocks: [
      {
        kind: "paragraph",
        text: "Sebagai subjek data, Anda memiliki hak untuk:",
      },
      {
        kind: "list",
        items: [
          "Mengakses data pribadi Anda yang kami simpan.",
          "Meminta koreksi atas data yang tidak akurat atau tidak lengkap.",
          "Meminta penghapusan data, dengan memperhatikan batasan hukum dan kebutuhan arsip.",
        ],
      },
      {
        kind: "paragraph",
        text: "Jika Anda memiliki keluhan mengenai pengelolaan data pribadi, Anda dapat menyampaikannya kepada sekolah melalui kontak resmi. Kami akan menindaklanjuti setiap pengaduan secara wajar dan dalam waktu yang patut.",
      },
    ],
  },
  {
    id: "kontak",
    no: 14,
    title: "Kontak & Perubahan Kebijakan",
    icon: "Envelope",
    summary: "Cara menghubungi kami dan pembaruan kebijakan.",
    blocks: [
      {
        kind: "paragraph",
        text: "Untuk pertanyaan, permintaan terkait data pribadi, atau pengaduan, silakan hubungi:",
      },
      {
        kind: "list",
        items: [
          "SMA Negeri 1 Samarinda — Jl. Drs. H. Anang Hasyim, Air Hitam, Samarinda, Kalimantan Timur 75124.",
          "Email: {{email}}",
          "Untuk hal teknis terkait aplikasi SIMSDIG, sekolah dapat meneruskan pertanyaan Anda kepada tim pengembang.",
        ],
      },
      {
        kind: "paragraph",
        text: "Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu untuk menyesuaikan dengan perubahan layanan atau ketentuan hukum. Perubahan akan dipublikasikan pada halaman ini, dan tanggal “terakhir diperbarui” di bagian atas akan diperbarui. Kami menganjurkan Anda meninjau halaman ini secara berkala.",
      },
    ],
  },
];

// ─── Isi kebijakan (English) ──────────────────────────────────────────────────
const sectionsEn: PolicySection[] = [
  {
    id: "pendahuluan",
    no: 1,
    title: "Introduction & Scope",
    icon: "Info",
    summary: "Who we are and which services this policy covers.",
    blocks: [
      {
        kind: "paragraph",
        text: "SMA Negeri 1 Samarinda (“the School”, “we”) respects the privacy of every user of our digital services. This Privacy Policy explains how we collect, use, store, share, and protect your personal data.",
      },
      {
        kind: "paragraph",
        text: "This policy applies to two related services:",
      },
      {
        kind: "list",
        items: [
          "The SIMSDIG application (Sistem Informasi Manajemen Sekolah Digital — Digital School Management Information System) — a school-management platform used by students, parents/guardians, teachers, and education personnel.",
          "The school profile website (sman1samarinda.sch.id) — a public information site covering the school profile, news, programs, extracurriculars, achievements, facilities, alumni, and admissions (SPMB).",
        ],
      },
      {
        kind: "paragraph",
        text: "By using the SIMSDIG application or this website, you are deemed to have read, understood, and agreed to the practices described in this policy. SIMSDIG is developed by a third-party developer on behalf of the School; the School acts as the data controller of user data.",
      },
    ],
  },
  {
    id: "informasi-dikumpulkan",
    no: 2,
    title: "Information We Collect",
    icon: "Database",
    summary: "The types of data we collect from each group of users.",
    blocks: [
      {
        kind: "paragraph",
        text: "The data we collect depends on your role and how you use our services.",
      },
      {
        kind: "subsection",
        title: "Account & authentication data (all roles)",
        items: [
          "Account information: username, password (stored as a hash), and role (student, parent/guardian, teacher, or education personnel).",
          "Login session history, access times, and basic activity to keep your account secure.",
          "Attendance history, including time and — if the related feature is enabled — location and a photo taken at check-in.",
        ],
      },
      {
        kind: "subsection",
        title: "Student data",
        items: [
          "Identity: full name, NISN/NIS (national/school student ID), place & date of birth, gender, and photo.",
          "Demographic and family data: address, parent/guardian names, and relevant contacts.",
          "Academic data: class, grade history, report cards, and records of school activities.",
        ],
      },
      {
        kind: "subsection",
        title: "Teacher & education personnel data",
        items: [
          "Employment and identity data: name, NIP/NUPTK (staff ID), and position.",
          "Contact details and teaching assignments or administrative duties.",
        ],
      },
      {
        kind: "subsection",
        title: "Letters & documents",
        items: [
          "School administrative documents, correspondence, and related files uploaded or created through the application.",
        ],
      },
      {
        kind: "subsection",
        title: "Website visitor data",
        items: [
          "Data you submit voluntarily through forms (for example, name and contact details on a registration/contact form), where available.",
          "Functional cookies — see the Cookies & Authentication section.",
        ],
      },
      {
        kind: "subsection",
        title: "Device permissions (Android/iOS app)",
        items: [
          "Camera — to take attendance photos or upload documents.",
          "Location (GPS) — to verify location-based attendance, if this feature is enabled.",
          "Gallery/storage — to select and upload photos or files.",
        ],
      },
      {
        kind: "paragraph",
        text: "Device permissions are used only for the functions above and are active only when you grant consent on your device.",
      },
    ],
  },
  {
    id: "penggunaan",
    no: 3,
    title: "How We Use Your Information",
    icon: "GearSix",
    summary: "The purposes for which we process your data.",
    blocks: [
      {
        kind: "paragraph",
        text: "We use your personal data for the following purposes:",
      },
      {
        kind: "list",
        items: [
          "Educational administration: managing student, teacher, class, grade, and school-activity data.",
          "Managing attendance of the school community.",
          "Providing and operating the application and website services.",
          "System security, preventing misuse, and maintaining data integrity.",
          "Official school communications, announcements, and delivering information to users.",
          "Meeting administrative and reporting obligations in accordance with applicable regulations.",
        ],
      },
      {
        kind: "paragraph",
        text: "We do not use your personal data for advertising or commercial purposes unrelated to the delivery of education.",
      },
    ],
  },
  {
    id: "berbagi-data",
    no: 4,
    title: "Data Sharing & Third-Party Services",
    icon: "ShareNetwork",
    summary: "Who data is shared with and under what conditions.",
    blocks: [
      {
        kind: "paragraph",
        text: "We do not sell your personal data. Data may only be accessed or shared in the following circumstances:",
      },
      {
        kind: "list",
        items: [
          "Internal school access: authorized parties within the school (for example, homeroom teachers, teachers, and administrators) according to their role and duties.",
          "Technical infrastructure providers: using databases and servers located in Indonesia.",
          "Legal compliance: disclosing data when required by law, government regulations, or legal processes applicable in Indonesia — including personal data protection and electronic systems provisions as referenced in the Legal Basis below.",
        ],
      },
      {
        kind: "paragraph",
        text: "We do not use third-party advertising services or analytics that trade in user data.",
      },
    ],
    references: [
      {
        label: "Law No. 27 of 2022 on Personal Data Protection",
        url: "https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022",
      },
      {
        label: "Government Regulation No. 71 of 2019 on the Implementation of Electronic Systems and Transactions",
        url: "https://peraturan.bpk.go.id/Details/122030/pp-no-71-tahun-2019",
      },
      {
        label: "MoCI Regulation No. 20 of 2016 on Personal Data Protection in Electronic Systems",
        url: "https://peraturan.bpk.go.id/Details/150543/permenkominfo-no-20-tahun-2016",
      },
    ],
  },
  {
    id: "keamanan",
    no: 5,
    title: "Data Security",
    icon: "ShieldCheck",
    summary: "Protective measures and the division of responsibility.",
    blocks: [
      {
        kind: "list",
        items: [
          "Passwords are stored as a hash, not as plain text.",
          "Data transmission is protected by encryption (HTTPS/TLS) when sent between systems.",
          "Role-based access control limits the data each user can see.",
          "Systems are monitored to detect unusual activity.",
        ],
      },
      {
        kind: "paragraph",
        text: "The School acts as the data controller of the school community's data, while the application developer acts as the technical provider (data processor). Although we apply reasonable safeguards, no system is entirely free of risk; we cannot guarantee absolute security of data transmitted over the internet.",
      },
    ],
  },
  {
    id: "cookie",
    no: 6,
    title: "Cookies & Authentication",
    icon: "Cookie",
    summary: "The cookies we use and their purposes.",
    blocks: [
      {
        kind: "paragraph",
        text: "We use functional cookies that are necessary for the services to work properly, primarily for authentication and user preferences. These include:",
      },
      {
        kind: "list",
        items: [
          "Session token — keeps you logged in for the duration of your session.",
          "Preferences — stores basic display or language choices, where available.",
        ],
      },
      {
        kind: "paragraph",
        text: "We do not use cookies for advertising tracking. You can manage or delete cookies through your browser settings, though some features may not work optimally if cookies are disabled.",
      },
    ],
  },
  {
    id: "retensi",
    no: 7,
    title: "Data Storage, Retention & Deletion",
    icon: "ClockCounterClockwise",
    summary: "How long data is kept and how it is deleted.",
    blocks: [
      {
        kind: "list",
        items: [
          "Data is retained for as long as needed for educational purposes and while your account/relationship with the school remains active.",
          "Accounts may be deactivated when a student graduates or transfers, or when a teacher/education personnel no longer serves at the school.",
          "Some academic data may need to be retained longer to meet archival and reporting obligations under applicable regulations.",
        ],
      },
      {
        kind: "paragraph",
        text: "You may request correction or deletion of your data through our official contact. We will respond within a reasonable time, subject to legal limits and the school's archival needs.",
      },
    ],
  },
  {
    id: "privasi-anak",
    no: 8,
    title: "Children's Privacy",
    icon: "Baby",
    summary: "Protecting the data of underage students.",
    blocks: [
      {
        kind: "paragraph",
        text: "Some users of our services are minors. The collection and processing of student data is carried out within the framework of education and under the authority of the school and parents/guardians.",
      },
      {
        kind: "paragraph",
        text: "We strive to comply with applicable child protection provisions, in particular the Child Protection Law. Parental/guardian consent is deemed represented through the formal relationship between the student and the school. Parents/guardians may contact the school with questions about their child's data.",
      },
    ],
    references: [
      {
        label: "Law No. 35 of 2014 on Child Protection",
        url: "https://peraturan.bpk.go.id/Details/38723/uu-no-35-tahun-2014",
      },
      {
        label: "Law No. 23 of 2002 on Child Protection",
        url: "https://peraturan.bpk.go.id/Details/44473",
      },
    ],
  },
  {
    id: "lokasi-penyimpanan",
    no: 9,
    title: "Data Storage Location",
    icon: "MapPinLine",
    summary: "Where your data is stored and processed.",
    blocks: [
      {
        kind: "paragraph",
        text: "Data is generally stored and processed in Indonesia. In certain cases, some technical processing may involve infrastructure providers operating across borders (for example, CDN/security services). In such cases, we seek providers that apply adequate security standards.",
      },
    ],
  },
  {
    id: "pelanggaran-data",
    no: 10,
    title: "Data Breach Notification",
    icon: "WarningCircle",
    summary: "What we do in the event of a data breach.",
    blocks: [
      {
        kind: "paragraph",
        text: "In the event of a personal data breach or leak that affects you, we will take remedial action and notify affected parties and the competent authorities in accordance with applicable regulations, including the Personal Data Protection Law (UU PDP) — in principle within 72 hours of the breach becoming known.",
      },
    ],
    references: [
      {
        label: "Law No. 27 of 2022 on Personal Data Protection",
        url: "https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022",
      },
    ],
  },
  {
    id: "keputusan-otomatis",
    no: 11,
    title: "Automated Decision-Making",
    icon: "Robot",
    summary: "We do not carry out automated profiling.",
    blocks: [
      {
        kind: "paragraph",
        text: "We currently do not use artificial-intelligence algorithms or automated profiling to make decisions that produce legal or similarly significant effects on you. Any important decision concerning students, teachers, or education personnel still involves human judgment.",
      },
    ],
  },
  {
    id: "data-agregat",
    no: 12,
    title: "Anonymous & Aggregate Data",
    icon: "ChartBar",
    summary: "Use of anonymized data.",
    blocks: [
      {
        kind: "paragraph",
        text: "We may use anonymized or aggregated data — such that it can no longer identify individuals — for statistics, reporting, or service improvement. Data in this form is not subject to the same restrictions as personal data.",
      },
    ],
  },
  {
    id: "hak-anda",
    no: 13,
    title: "Your Rights & Complaints",
    icon: "Scales",
    summary: "Your rights as a data subject and how to complain.",
    blocks: [
      {
        kind: "paragraph",
        text: "As a data subject, you have the right to:",
      },
      {
        kind: "list",
        items: [
          "Access the personal data we hold about you.",
          "Request correction of inaccurate or incomplete data.",
          "Request deletion of data, subject to legal limits and archival needs.",
        ],
      },
      {
        kind: "paragraph",
        text: "If you have a complaint about how your personal data is handled, you may raise it with the school through our official contact. We will address every complaint reasonably and within a proper timeframe.",
      },
    ],
  },
  {
    id: "kontak",
    no: 14,
    title: "Contact & Policy Changes",
    icon: "Envelope",
    summary: "How to reach us and how the policy is updated.",
    blocks: [
      {
        kind: "paragraph",
        text: "For questions, requests concerning your personal data, or complaints, please contact:",
      },
      {
        kind: "list",
        items: [
          "SMA Negeri 1 Samarinda — Jl. Drs. H. Anang Hasyim, Air Hitam, Samarinda, East Kalimantan 75124.",
          "Email: {{email}}",
          "For technical matters regarding the SIMSDIG application, the school may forward your inquiry to the development team.",
        ],
      },
      {
        kind: "paragraph",
        text: "We may update this Privacy Policy from time to time to reflect changes in our services or legal requirements. Changes will be published on this page, and the “last updated” date at the top will be revised. We encourage you to review this page periodically.",
      },
    ],
  },
];

export const policySections: Record<Locale, PolicySection[]> = {
  id: sectionsId,
  en: sectionsEn,
};
