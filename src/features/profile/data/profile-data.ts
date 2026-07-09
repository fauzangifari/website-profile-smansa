export const profileParagraphs = [
  "SMA Negeri 1 Samarinda memanfaatkan sepenuhnya lokasinya di salah satu kota paling dinamis dan beragam di Kalimantan. Dengan misi untuk menyediakan pendidikan berkualitas bagi semua, sekolah ini berkomitmen memberikan layanan terbaik kepada siswa, terutama mereka yang membutuhkan.",
  "Sejak didirikan pada tahun 1953, SMA Negeri 1 Samarinda terus berkembang sebagai pusat akademik unggulan, menggambar ulang batas pemikiran intelektual dan kreatif. Pendekatan pendidikan yang ketat dan multidimensi di sekolah ini mendorong integrasi lintas disiplin serta menumbuhkan pola pikir progresif. Siswa diberikan kebebasan akademik untuk merancang jalur belajar mereka sendiri, mempersiapkan diri menghadapi dunia yang kompleks dan terus berubah.",
];

export const profileImages = [
  {
    src: "/images/profil/smansa-profil-body1.jpg",
    alt: "Dokumentasi profil SMA Negeri 1 Samarinda",
    label: "Ruang Belajar SMANSA",
    description:
      "Suasana pembelajaran yang menjadi pusat aktivitas akademik siswa.",
  },
  {
    src: "/images/profil/smansa-profil-body2.jpg",
    alt: "Kegiatan sekolah SMA Negeri 1 Samarinda",
    label: "Kegiatan Sekolah",
    description:
      "Kegiatan sekolah yang mendukung pembentukan karakter dan kolaborasi.",
  },
  {
    src: "/images/profil/smansa-profil-body3.jpg",
    alt: "Lingkungan SMA Negeri 1 Samarinda",
    label: "Lingkungan Sekolah",
    description:
      "Lingkungan sekolah sebagai ruang tumbuh yang tertib dan kondusif.",
  },
];

export const profileStats = [
  {
    value: "1.000+",
    label: "Siswa/siswi",
    description: "Komunitas belajar aktif di SMA Negeri 1 Samarinda.",
  },
  {
    value: "#1",
    label: "Prestasi",
    description: "Semangat berprestasi dan pembelajaran yang progresif.",
  },
];

export type ProfileSummaryCard = {
  iconName: "sejarah" | "visi-misi" | "struktur" | "alumni";
  label: string;
  title: string;
  description: string;
  href: string;
  cta: string;
};

export const profileSummaryCards: ProfileSummaryCard[] = [
  {
    iconName: "sejarah",
    label: "Sejarah",
    title: "Perjalanan SMANSA sejak 1953",
    description:
      "Berdiri dari perjuangan para tokoh masyarakat untuk menghadirkan sekolah lanjutan atas di Samarinda, lalu tumbuh menjadi salah satu pusat pendidikan penting di Kalimantan Timur.",
    href: "/sejarah",
    cta: "Baca sejarah",
  },
  {
    iconName: "visi-misi",
    label: "Visi & Misi",
    title: "Arah pendidikan dan karakter sekolah",
    description:
      "Komitmen SMANSA menjadi ruang belajar unggul, berkarakter, berwawasan global, adaptif terhadap teknologi, demokratis, dan peduli lingkungan.",
    href: "/visi-misi",
    cta: "Lihat visi & misi",
  },
  {
    iconName: "struktur",
    label: "Struktur Organisasi",
    title: "Susunan kepemimpinan sekolah",
    description:
      "Kepala sekolah, wakil, dan tenaga pendidik yang menjalankan tata kelola dan keseharian akademik SMA Negeri 1 Samarinda.",
    href: "/struktur-organisasi",
    cta: "Lihat struktur",
  },
  {
    iconName: "alumni",
    label: "Alumni",
    title: "Jejak lulusan SMANSA",
    description:
      "Kisah dan pencapaian alumni SMA Negeri 1 Samarinda yang berkiprah di berbagai bidang dan penjuru negeri.",
    href: "/alumni",
    cta: "Lihat alumni",
  },
];
