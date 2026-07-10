export type SiteNavItem = {
  label: string;
  href: string;
  children?: SiteNavItem[];
};

export const siteConfig = {
  name: "SMA Negeri 1 Samarinda",
  shortName: "SMANSA",
  description:
    "Website profile SMA Negeri 1 Samarinda sebagai pusat informasi sekolah, program, prestasi, fasilitas, berita, alumni, dan SPMB.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://www.sman1samarinda.sch.id",
  keywords: [
    "SMA Negeri 1 Samarinda",
    "SMAN 1 Samarinda",
    "SMANSA Samarinda",
    "SMA Samarinda",
    "sekolah menengah atas Samarinda",
    "SPMB Samarinda",
    "profil sekolah Samarinda",
  ],
  // Data organisasi — dipakai untuk structured data (JSON-LD) & kontak.
  organization: {
    logo: "/images/brand/logo.png",
    email: "info@sman1samarinda.sch.id",
    phone: "+62-541-741305",
    address: {
      street: "Jl. Drs. H. Anang Hasyim, Air Hitam",
      locality: "Kota Samarinda",
      region: "Kalimantan Timur",
      postalCode: "75124",
      country: "ID",
    },
  },
  // TODO: ganti dengan URL akun media sosial resmi sekolah.
  // Dipakai di footer & sebagai `sameAs` pada JSON-LD organisasi.
  // Kosongkan ("") entri yang belum punya akun agar tidak ditampilkan.
  social: {
    facebook: "https://www.facebook.com/",
    x: "https://x.com/",
    linkedin: "https://www.linkedin.com/",
    youtube: "https://www.youtube.com/",
    instagram: "https://www.instagram.com/",
  },
} as const;

export const mainNavItems: SiteNavItem[] = [
  { label: "Beranda", href: "/" },
  {
    label: "Tentang",
    href: "#",
    children: [
      { label: "Profil", href: "/profil" },
      { label: "Sejarah", href: "/sejarah" },
      { label: "Visi & Misi", href: "/visi-misi" },
      { label: "Struktur Organisasi", href: "/struktur-organisasi" },
      { label: "Denah Sekolah", href: "/denah-sekolah" },
      { label: "Sarana dan Prasarana", href: "/sarana-prasarana" },
      { label: "Tata Tertib", href: "/tata-tertib" },
      { label: "Kemitraan", href: "/kemitraan" },
    ]
  },
  {
    label: "Akademik",
    href: "#",
    children: [
      { label: "Ekstrakurikuler", href: "/ekstrakurikuler" },
      { label: "Prestasi", href: "/prestasi" },
      { label: "Kalender Akademik", href: "/kalender-akademik" },
      { label: "Pengumuman Kelulusan", href: "https://kelulusan.sman1samarinda.sch.id" },
      { label: "Alumni", href: "/alumni" },
    ]
  },
  {
    label: "Aplikasi Kami",
    href: "#",
    children: [
      { label: "SIMSDIG", href: "/simsdig" },
      { label: "Moodle E-Learning", href: "https://lms.sman1samarinda.sch.id" },
      { label: "Pijar Sekolah", href: "https://portal.pijarsekolah.id/cbtsman1samarinda" },
      { label: "E-Rapor", href: "https://erapor.sman1samarinda.sch.id/" },
    ]
  },
  {
    label: "Kegiatan",
    href: "#",
    children: [
      { label: "Berita", href: "/berita" },
      { label: "Kokurikuler", href: "/kokurikuler" },
      { label: "Bilingual", href: "/bilingual" },
    ]
  },
];
