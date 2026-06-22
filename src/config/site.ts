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
};

export const mainNavItems: SiteNavItem[] = [
  { label: "Beranda", href: "#beranda" },
  {
    label: "Tentang",
    href: "#",
    children: [
      { label: "Profil", href: "/profil" },
      { label: "Sejarah", href: "/sejarah" },
      { label: "Visi & Misi", href: "/visi-misi" },
      { label: "Struktur Organisasi", href: "/struktur-organisasi" },
    ],
  },
  {
    label: "Berita",
    href: "#"
  },
  {
    label: "Program",
    href: "#",
    children: [
      { label: "Bilingual", href: "/bilingual" },
      { label: "Kemitraan", href: "/kemitraan" },
      { label: "Kokurikuler", href: "/kokurikuler" },
    ],
  },
  {
    label: "Ekstrakurikuler",
    href: "#",
    children: [
      { label: "Akademik", href: "/akademik" },
      { label: "Non Akademik", href: "/non-akademik" },
    ]
  },
  {
    label: "Sarpras",
    href: "/sarana-prasarana",
  },
  {
    label: "Prestasi",
    href: "#"
  },
  {
    label: "E-Learning",
    href: "#",
    children: [
      { label: "Moodle", href: "https://lms.sman1samarinda.sch.id" },
      { label: "Google Classroom", href: "https://classroom.google.com/" },
      { label: "Pijar Sekolah", href: "https://portal.pijarsekolah.id/cbtsman1samarinda" },
      { label: "E-Raport", href: "https://erapor.sman1samarinda.sch.id/" },
    ]
  },
  {
    label: "Alumni",
    href: "/alumni",
  }
];
