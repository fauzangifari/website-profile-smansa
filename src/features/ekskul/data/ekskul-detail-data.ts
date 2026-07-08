import type { EkskulDetail } from "@/features/ekskul/types/ekskul-detail";

export const ekskulDetails: EkskulDetail[] = [
  {
    slug: "ekonomi",
    title: "Club Ekonomi",
    category: "akademik",
    categoryLabel: "Akademik",
    shortDescription:
      "Wadah pengembangan wawasan ekonomi dan bisnis melalui diskusi, simulasi pasar, serta persiapan Olimpiade Sains Nasional (OSN) bidang Ekonomi.",
    description: [
      "Club Ekonomi SMAN 1 Samarinda merupakan wadah bagi siswa yang memiliki minat mendalam pada ilmu ekonomi, akuntansi, dan bisnis. Melalui kegiatan rutin, anggota diajak memahami konsep ekonomi mikro dan makro secara aplikatif, tidak hanya sebatas teori di kelas.",
      "Selain persiapan kompetisi seperti OSN Ekonomi dan lomba akuntansi tingkat kota/provinsi, club ini juga rutin mengadakan simulasi pasar modal, studi kasus bisnis, serta kunjungan ke instansi ekonomi dan keuangan sebagai bentuk pembelajaran langsung di lapangan.",
    ],
    coverImage: "https://placehold.co/1600x900/003366/FFFFFF.png?text=Club+Ekonomi",
    schedule: [
      { days: ["Selasa"], time: "15.30 - 17.00", location: "Ruang Kelas XI IPS 2" },
      { days: ["Jumat"], time: "13.30 - 15.00", location: "Laboratorium Ekonomi" },
    ],
    socialMedia: [
      {
        platform: "instagram",
        handle: "@clubekonomi.smansa",
        url: "https://instagram.com/clubekonomi.smansa",
      },
      {
        platform: "whatsapp",
        handle: "Grup Info Club Ekonomi",
        url: "https://chat.whatsapp.com/contoh-club-ekonomi",
      },
    ],
    vision:
      "Menjadi wadah unggulan dalam membentuk siswa yang literat secara ekonomi, kritis dalam berpikir, dan siap berprestasi di tingkat regional maupun nasional.",
    mission: [
      "Mengembangkan pemahaman konsep ekonomi secara aplikatif dan kontekstual.",
      "Mempersiapkan anggota secara intensif untuk OSN dan kompetisi ekonomi lainnya.",
      "Membangun budaya diskusi, riset, dan literasi keuangan di lingkungan sekolah.",
    ],
    structure: {
      pembina: {
        name: "Dra. Hj. Siti Rahmawati, M.Pd.",
        role: "Guru Ekonomi",
        photo: "https://placehold.co/400x400/003366/FFFFFF.png?text=Siti+R.",
      },
      ketua: {
        name: "Muhammad Rizky Ardiansyah",
        kelas: "XI IPS 1",
        photo: "https://placehold.co/400x400/003366/FFFFFF.png?text=Rizky+A.",
      },
      anggota: [
        {
          name: "Aulia Ramadhani",
          role: "Wakil Ketua",
          photo: "https://placehold.co/400x400/003366/FFFFFF.png?text=Aulia+R.",
        },
        {
          name: "Naufal Hakim",
          role: "Sekretaris",
          photo: "https://placehold.co/400x400/003366/FFFFFF.png?text=Naufal+H.",
        },
        {
          name: "Keisha Amelia Putri",
          role: "Bendahara",
          photo: "https://placehold.co/400x400/003366/FFFFFF.png?text=Keisha+P.",
        },
      ],
    },
    registrationLink: "https://forms.gle/contoh-pendaftaran-club-ekonomi",
    contact: {
      phone: "081234567890",
      email: "siti.rahmawati@sman1samarinda.sch.id",
    },
    programs: [
      {
        title: "Simulasi Pasar Modal",
        description:
          "Praktik langsung analisis saham dan investasi menggunakan aplikasi simulasi pasar modal untuk pemula.",
        image: "https://placehold.co/600x400/003366/FFFFFF.png?text=Pasar+Modal",
      },
      {
        title: "Bootcamp OSN Ekonomi",
        description:
          "Pembahasan intensif materi dan latihan soal OSN Ekonomi bersama alumni dan guru pembina.",
        image: "https://placehold.co/600x400/003366/FFFFFF.png?text=Bootcamp+OSN",
      },
      {
        title: "Kunjungan Industri & Perbankan",
        description:
          "Kunjungan ke lembaga keuangan dan pelaku usaha untuk memahami praktik ekonomi di dunia nyata.",
        image: "https://placehold.co/600x400/003366/FFFFFF.png?text=Kunjungan+Industri",
      },
    ],
    faq: [
      {
        question: "Siapa saja yang boleh mendaftar Club Ekonomi?",
        answer:
          "Seluruh siswa kelas X dan XI dari jurusan apa pun dapat mendaftar, tidak terbatas hanya untuk siswa IPS.",
      },
      {
        question: "Apakah ada seleksi untuk menjadi anggota?",
        answer:
          "Ada seleksi singkat berupa wawancara minat dan motivasi, tanpa tes tertulis, untuk memastikan kesungguhan calon anggota.",
      },
      {
        question: "Apakah club ini hanya fokus pada persiapan lomba?",
        answer:
          "Tidak. Selain persiapan kompetisi, club ini juga menjadi ruang belajar dan diskusi santai seputar ekonomi dan keuangan sehari-hari.",
      },
      {
        question: "Bagaimana cara menghubungi pengurus club?",
        answer:
          "Anggota dan calon anggota dapat menghubungi pembina melalui kontak yang tertera pada bagian narahubung di halaman ini.",
      },
    ],
  },
];
