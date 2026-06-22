export const visionMissionSourceUrl =
  "https://www.sman1samarinda.sch.id/visimisi/";

export const visionStatement =
  "Terwujudnya sekolah unggul yang berlandaskan delapan dimensi profil lulusan, berprestasi, berdaya saing global, berwawasan digital, demokratis, dan peduli lingkungan";

export const missionItems = [
  {
    number: "01",
    title: "Akhlak dan Ketakwaan",
    theme: "Karakter",
    description:
      "Membentuk murid yang beriman, bertakwa kepada Tuhan Yang Maha Esa, dan berakhlak mulia sesuai nilai-nilai delapan dimensi profil lulusan.",
  },
  {
    number: "02",
    title: "Pembelajaran Mendalam",
    theme: "Akademik",
    description:
      "Menyelenggarakan pembelajaran mendalam yang humanis, adaptif dan berbasis teknologi guna menghasilkan murid unggul dalam bidang akademik maupun non-akademik.",
  },
  {
    number: "03",
    title: "Keterampilan Abad Ini",
    theme: "Kompetensi",
    description:
      "Mengembangkan keterampilan berpikir kritis, kreatif, komunikatif, dan kolaboratif melalui pembelajaran intrakurikuler, ekstrakurikuler, serta kokulikuler.",
  },
  {
    number: "04",
    title: "Sekolah Aman dan Inklusif",
    theme: "Iklim Sekolah",
    description:
      "Menciptakan budaya sekolah yang ramah anak, aman, inklusif, serta mendukung tumbuh kembang murid secara optimal.",
  },
  {
    number: "05",
    title: "Gotong Royong",
    theme: "Komunitas",
    description:
      "Menumbuhkan semangat gotong royong, kepedulian sosial, dan kebersamaan seluruh warga sekolah dalam membangun iklim sekolah yang harmonis.",
  },
  {
    number: "06",
    title: "Literasi Digital",
    theme: "Teknologi",
    description:
      "Mengembangkan literasi digital dan kesiapan menghadapi era globalisasi dengan tetap menjunjung tinggi nilai budaya bangsa.",
  },
  {
    number: "07",
    title: "Sekolah Hijau",
    theme: "Lingkungan",
    description:
      "Menanamkan sikap peduli lingkungan melalui berbagai program sekolah berwawasan ekologi demi terciptanya sekolah hijau dan berkelanjutan.",
  },
  {
    number: "08",
    title: "Adaptif Masa Depan",
    theme: "Inovasi",
    description:
      "Mendorong keterbukaan terhadap perubahan, inovasi, dan pengembangan diri dalam menghadapi tantangan masa depan.",
  },
] as const;

export const missionStatements = missionItems.map((item) => item.description);

export const visionMissionFocusAreas = [
  {
    label: "Karakter",
    value: "Iman, takwa, akhlak mulia",
  },
  {
    label: "Pembelajaran",
    value: "Mendalam, humanis, adaptif",
  },
  {
    label: "Kompetensi",
    value: "Kritis, kreatif, komunikatif, kolaboratif",
  },
  {
    label: "Masa Depan",
    value: "Digital, global, peduli lingkungan",
  },
] as const;
