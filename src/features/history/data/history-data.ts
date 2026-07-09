export type Milestone = {
  year: string;
  title: string;
  description: string;
  icon?: string;
};

export type HistoricalFigure = {
  name: string;
  role: string;
  period: string;
  image?: string;
};

export const historyDescription = [
  "SMA Negeri 1 Samarinda memiliki sejarah panjang yang membentang lebih dari 70 tahun. Berawal dari inisiatif tokoh masyarakat dan pejabat daerah di Samarinda yang menyadari pentingnya pendidikan tingkat menengah atas bagi pemuda-pemudi di Kalimantan Timur.",
  "Sejak berdiri pada tahun 1953, sekolah ini telah bertransformasi dari sebuah SMA partikelir (swasta) menjadi salah satu institusi pendidikan negeri paling prestisius di wilayah ini, melahirkan ribuan alumni yang berkontribusi di berbagai bidang pembangunan.",
];

export const historyMilestones: Milestone[] = [
  {
    year: "14 Sept 1953",
    title: "Pendirian Sebagai SMA Partikelir",
    description:
      "Dibentuk tim pembentuk yang diketuai oleh Achmad Yusuf. Sekolah resmi berdiri sebagai SMA swasta pertama di Samarinda, menempati bekas asrama pelajar.",
    icon: "Buildings",
  },
  {
    year: "11 Juni 1955",
    title: "Peresmian Status Negeri",
    description:
      "Melalui SK No. 30/JSP/55, sekolah resmi menjadi SMA Negeri. Diresmikan oleh Koordinator Residen Datu Maju Urang dengan pimpinan pertama Bapak Van der Wil.",
    icon: "SealCheck",
  },
  {
    year: "1960 - 1964",
    title: "Ekspansi & Cabang Filial",
    description:
      "Membuka cabang filial di Tarakan untuk memperluas akses pendidikan. Cabang ini kemudian berdiri mandiri menjadi SMA Negeri Tarakan pada tahun 1965.",
    icon: "Globe",
  },
  {
    year: "1993 - 1994",
    title: "Inisiatif SMA Unggul",
    description:
      "Bertepatan dengan HUT ke-40, alumni membentuk Yayasan Melati untuk mendirikan SMA Unggul yang awalnya beroperasi di lingkungan SMAN 1 Samarinda.",
    icon: "GraduationCap",
  },
  {
    year: "Era RSBI",
    title: "Pionir Rintisan Sekolah Bertaraf Internasional",
    description:
      "SMAN 1 Samarinda terpilih sebagai salah satu dari 100 sekolah pionir RSBI di Indonesia, mengukuhkan standar kualitas pembelajaran tingkat global.",
    icon: "Star",
  },
  {
    year: "Masa Kini",
    title: "Relokasi Kampus Modern",
    description:
      "Berpindah dari lokasi lama di Jalan Bhayangkara (dahulu Jalan Melati) ke kampus modern yang luas dan representatif di Jalan Drs. H. Anang Hasyim.",
    icon: "MapPinLine",
  },
];

export const historicalFigures: HistoricalFigure[] = [
  // Leadership Chronology starting from first principal
  { name: "Van der Wil", role: "Kepala Sekolah", period: "1954 - 1955", image: "/images/sejarah/van-der-wil.jpg" },
  { name: "Moenadi Arief", role: "Kepala Sekolah", period: "1955 - 1957", image: "/images/sejarah/moenadi-arief.jpg" },
  { name: "Soeyadi", role: "Kepala Sekolah", period: "1957 - 1959", image: "/images/sejarah/soeyadi.jpg" },
  { name: "Yusuf Achuntanair", role: "Kepala Sekolah", period: "1961 - 1962", image: "/images/sejarah/yusuf-achuntanair.jpg" },
  { name: "C. Husodo", role: "Kepala Sekolah", period: "1962 - 1963", image: "/images/sejarah/c-husodo.jpg" },
  { name: "Syahraini Prawiro", role: "Kepala Sekolah", period: "1963 - 1966", image: "/images/sejarah/syahraini-prawiro.jpg" },
  { name: "Awang Adriani", role: "Kepala Sekolah", period: "1966 - 1968", image: "/images/sejarah/awang-adriani.jpg" },
  { name: "Syahraini Prawiro", role: "Kepala Sekolah", period: "1966 - 1970", image: "/images/sejarah/syahraini-prawiro.jpg" },
  { name: "Siti Maryam Iskandar", role: "Kepala Sekolah", period: "1970 - 1977", image: "/images/sejarah/siti-maryam-iskandar.jpg" },
  { name: "Sjahbandi", role: "Kepala Sekolah", period: "1977 - 1983", image: "/images/sejarah/sjahbandi.jpg" },
  { name: "Husinjah", role: "Kepala Sekolah", period: "1983 - 1986", image: "/images/sejarah/husinah.jpg" },
  { name: "Romansyah", role: "Kepala Sekolah", period: "1986 - 1990", image: "/images/sejarah/romansyah.jpg" },
  { name: "Achmadsyah", role: "Kepala Sekolah", period: "1990 - 1995", image: "/images/sejarah/achmadsyah.jpg" },
  { name: "M. Hatta", role: "Kepala Sekolah", period: "1995 - 2000", image: "/images/sejarah/m-hatta.jpg" },
  { name: "M. Aini Yasin", role: "Kepala Sekolah", period: "2000 - 2003", image: "/images/sejarah/m-aini-yasin.jpg" },
  { name: "Suardi", role: "Kepala Sekolah", period: "2003 - 2012", image: "/images/sejarah/suardi.jpg" },
  { name: "K. Suhariyatno", role: "Kepala Sekolah", period: "2012 - 2015", image: "/images/sejarah/k-suhariyatno.jpg" },
  { name: "H. Budiono", role: "Kepala Sekolah", period: "2015 - 2020", image: "/images/sejarah/h-budiono.jpg" },
  { name: "I Putu Suberata", role: "Kepala Sekolah", period: "2020 - 2026", image: "/images/sejarah/i-putu-suberta.jpg" },
  { name: "Syawal Arifin", role: "Plt. Kepala Sekolah", period: "2026 - Sekarang" },
];

export const historySourceUrl = "https://www.sman1samarinda.sch.id/sejarah/";
