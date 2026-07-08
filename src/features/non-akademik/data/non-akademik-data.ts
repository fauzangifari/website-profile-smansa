import { 
  Trophy, 
  MusicNotes, 
  Palette, 
  Code, 
  Camera, 
  Heart, 
  Users, 
  Cpu,
  Basketball,
  Pulse,
  MicrophoneStage,
  MaskHappy,
  Icon
} from "@phosphor-icons/react";

export interface NonAkademikActivity {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: Icon;
  imageUrl?: string;
}

export interface NonAkademikCategory {
  id: string;
  title: string;
  description: string;
  icon: Icon;
  activities: NonAkademikActivity[];
}

export const NON_AKADEMIK_PHILOSOPHY = {
  title: "Panggung Bakat dan Minat",
  description: "SMAN 1 Samarinda memandang potensi siswa sebagai sesuatu yang unik dan tidak terbatas. Program non-akademik adalah panggung utama untuk mengolah bakat terpendam dan minat spesifik siswa menjadi keunggulan nyata.",
  goals: [
    {
      title: "Pengembangan Pribadi",
      description: "Menumbuhkan bakat di luar ruang kelas untuk keseimbangan diri.",
      icon: Users,
    },
    {
      title: "Pelepas Stres",
      description: "Aktivitas produktif sebagai penyeimbang beban akademik.",
      icon: Heart,
    },
    {
      title: "Soft Skills",
      description: "Mengasah kerja sama tim, kepemimpinan, dan manajemen waktu.",
      icon: Trophy,
    },
    {
      title: "Pembentukan Karakter",
      description: "Membantu siswa menemukan jati diri dan jaringan pertemanan.",
      icon: Pulse,
    },
  ],
};

export const NON_AKADEMIK_CATEGORIES: NonAkademikCategory[] = [
  {
    id: "olahraga",
    title: "Olahraga",
    description: "Pengembangan bakat dan prestasi di bidang atletik dan kompetisi fisik.",
    icon: Trophy,
    activities: [
      {
        id: "basket",
        slug: "basket",
        name: "Basket",
        description: "Pengembangan bakat dan strategi dalam olahraga bola basket.",
        icon: Basketball,
      },
      {
        id: "handball",
        slug: "handball",
        name: "Handball",
        description: "Pengembangan bakat dan kerja sama tim dalam olahraga bola tangan.",
        icon: Pulse,
      },
    ],
  },
  {
    id: "seni-budaya",
    title: "Seni & Budaya",
    description: "Wadah ekspresi kreatif, pelestarian budaya, dan pengembangan estetika.",
    icon: Palette,
    activities: [
      {
        id: "paduan-suara",
        slug: "paduan-suara",
        name: "Paduan Suara",
        description: "Wadah bagi siswa yang memiliki minat di bidang olah vokal kelompok.",
        icon: MicrophoneStage,
      },
      {
        id: "tari-tradisional",
        slug: "tari-tradisional",
        name: "Tari Tradisional",
        description: "Pelestarian dan pengembangan bakat seni tari daerah Nusantara.",
        icon: MusicNotes,
      },
      {
        id: "teater-dahana",
        slug: "teater-dahana",
        name: "Teater Dahana",
        description: "Wadah ekspresi seni peran, pertunjukan panggung, dan sastra.",
        icon: MaskHappy,
      },
    ],
  },
  {
    id: "teknologi",
    title: "Teknologi & Kreativitas Digital",
    description: "Mempersiapkan siswa menghadapi era digital melalui inovasi dan kreasi konten.",
    icon: Cpu,
    activities: [
      {
        id: "digital-creator",
        slug: "digital-creator",
        name: "SMANSA Digital Creator",
        description: "Fokus pada pembuatan konten kreatif digital dan multimedia.",
        icon: Camera,
      },
      {
        id: "digitech",
        slug: "digitech",
        name: "SMANSA DIGITECH",
        description: "Fokus pada pengembangan teknologi, robotik, dan inovasi digital.",
        icon: Code,
      },
    ],
  },
  {
    id: "keagamaan",
    title: "Keagamaan",
    description: "Pembinaan karakter religius dan spiritualitas siswa.",
    icon: Heart,
    activities: [
      {
        id: "rohis",
        slug: "rohis",
        name: "Rohis 'Ainul Yaqin",
        description: "Organisasi kerohanian Islam untuk pembinaan karakter religius.",
        icon: Users,
      },
    ],
  },
];
