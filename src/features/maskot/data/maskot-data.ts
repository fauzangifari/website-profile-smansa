export type MaskotTrait = {
  title: string;
  description: string;
  /** Nama ikon Phosphor — dipetakan ke komponen di maskot-content.tsx */
  icon: string;
};

export type CostumeImage = {
  src: string;
  alt: string;
};

export type CostumeCategory = {
  id: string;
  label: string;
  /** Keterangan singkat kapan/mengapa dikenakan */
  caption: string;
  images: CostumeImage[];
};

// Gambar maskot utama (hero). Ganti nilai ini untuk memilih kostum lain.
export const maskotImage = "/images/maskot/sarungsmd-1.png";
export const maskotImageAlt =
  "RANGSA, maskot burung enggang SMA Negeri 1 Samarinda mengenakan busana Sarung Samarinda";
export const maskotName = "RANGSA";
export const maskotTagline = "Sang Rangkong SMANSA";

// Bagian "Asal Nama"
export const originParagraphs: string[] = [
  'RANGSA lahir dari perpaduan dua kata: "Rangkong" nama lain dari burung enggang, satwa khas Kalimantan yang dihormati dalam budaya Dayak dan "SMANSA", sebutan akrab SMA Negeri 1 Samarinda. Dalam satu kata, RANGSA menyatukan identitas alam Borneo dengan jati diri sekolah.',
  "Ia bukan sekadar maskot; ia adalah penjelmaan semangat sekolah yang berdiri kokoh sejak 14 September 1953.",
];

// Bagian "Mengapa Enggang?"
export const whyEnggangParagraphs: string[] = [
  "Bagi masyarakat Dayak di tanah Kalimantan, enggang bukan burung biasa. Ia adalah lambang kepemimpinan, keluhuran budi, dan kehormatan. Enggang terbang paling tinggi di antara penghuni rimba, seolah menjadi penjaga langit Borneo. Ia dikenal setia pada satu pasangan seumur hidup simbol kesetiaan dan tanggung jawab. Dan ia berperan sebagai penyebar benih di hutan, menumbuhkan kehidupan baru ke segala penjuru.",
  "Karakter-karakter inilah yang selaras dengan perjalanan SMANSA: sebuah sekolah pelopor yang memimpin, menjunjung nilai, dan menumbuhkan generasi demi generasi.",
];

// Bagian "Makna di Balik Setiap Sifat"
export const maskotTraits: MaskotTrait[] = [
  {
    title: "Sang Pionir yang Terbang Tinggi",
    description:
      "Sebagaimana enggang terbang mengatasi kanopi hutan, RANGSA mewakili posisi SMANSA sebagai sekolah menengah atas pertama di Samarinda. Sejak 1953, ia terbang lebih dulu, membuka jalan bagi pendidikan tinggi di Kalimantan Timur, dan tak pernah berhenti mengangkasa hingga menjadi mercusuar pendidikan setelah lebih dari tujuh dekade.",
    icon: "Bird",
  },
  {
    title: "Sang Penjaga Kehormatan",
    description:
      "Paruh enggang yang menjulang bagai gading adalah lambang sesuatu yang berharga dan langka. RANGSA membawa nilai ini sebagai pengingat bahwa SMANSA menjunjung tinggi integritas, kualitas, dan martabat — dari perjuangan menjadi sekolah negeri pada 1955 hingga terpilih sebagai pionir Rintisan Sekolah Bertaraf Internasional.",
    icon: "Crown",
  },
  {
    title: "Sang Penumbuh Kehidupan",
    description:
      "Seperti enggang yang menebar benih ke seluruh rimba, SMANSA tak menyimpan ilmunya sendiri. Ia pernah membuka cabang di Tarakan yang kemudian tumbuh mandiri menjadi sekolah tersendiri. RANGSA melambangkan semangat berbagi dan menumbuhkan — mencetak ribuan alumni yang menyebar dan berkontribusi di berbagai bidang pembangunan.",
    icon: "Plant",
  },
  {
    title: "Sang Sahabat Setia",
    description:
      "Kesetiaan enggang pada pasangannya menjadi cermin loyalitas warga SMANSA — antara guru dan murid, antara alumni dan almamater. RANGSA mengajak setiap siswa untuk mencintai sekolahnya, menjaga nama baiknya, dan pulang membawa kebanggaan.",
    icon: "Heart",
  },
];

// Bagian "Semangat yang Dibawa RANGSA"
export const spiritParagraphs: string[] = [
  "RANGSA hadir bukan hanya sebagai gambar yang menghiasi seragam atau layar aplikasi. Ia adalah pengingat harian: bahwa setiap siswa SMANSA adalah pewaris semangat pionir yang berani terbang tinggi, penjaga kehormatan yang menjunjung nilai, dan penumbuh kehidupan yang siap berbagi manfaat bagi tanah Kalimantan Timur dan Indonesia.",
];

export const closingTagline = "Terbang Tinggi, Menjaga Kehormatan, Menumbuhkan Kehidupan.";

// ── Galeri Kostum ──
// Sumber kostum. `files` harus sama persis dengan nama file di public/images/maskot/
// (perhatikan `putiabu-1` tanpa huruf "h", berbeda dari `putihabu-2/3/4`).
// Keterangan (`caption`) masih DRAF — silakan koreksi, termasuk arti "PDH".
type CostumeSource = {
  id: string;
  label: string;
  caption: string;
  /** Frasa untuk teks alt: "RANGSA mengenakan {altSubject} SMA Negeri 1 Samarinda" */
  altSubject: string;
  files: string[];
};

const costumeSources: CostumeSource[] = [
  {
    id: "putih-abu",
    label: "Putih Abu-Abu",
    caption: "Seragam nasional yang dikenakan untuk upacara bendera dan hari-hari awal pekan.",
    altSubject: "seragam putih abu-abu",
    files: ["putiabu-1.png", "putihabu-2.png", "putihabu-3.png", "putihabu-4.png"],
  },
  {
    id: "batik",
    label: "Batik",
    caption: "Batik khas SMANSA — menampilkan identitas dan kebanggaan sekolah.",
    altSubject: "seragam batik",
    files: ["batik-1.png", "batik-2.png"],
  },
  {
    id: "pramuka",
    label: "Pramuka",
    caption: "Seragam kepramukaan untuk kegiatan kepanduan dan pembentukan karakter.",
    altSubject: "seragam Pramuka",
    files: ["pramuka-1.png", "pramuka-2.png"],
  },
  {
    id: "pdh",
    label: "PDH",
    caption: "Pakaian Dinas Harian untuk kegiatan organisasi dan keseharian sekolah.",
    altSubject: "seragam PDH",
    files: ["pdh-1.png", "pdh-2.png"],
  },
  {
    id: "olahraga",
    label: "Olahraga",
    caption: "Kaus dan celana training untuk pelajaran PJOK serta kegiatan olahraga.",
    altSubject: "seragam olahraga",
    files: ["olahraga-1.png", "olahraga-2.png", "olahraga-3.png"],
  },
  {
    id: "sarung-smd",
    label: "Sarung Samarinda",
    caption: "Busana adat bertenun khas Samarinda, kebanggaan kota tepian Sungai Mahakam.",
    altSubject: "busana Sarung Samarinda",
    files: ["sarungsmd-1.png", "sarungsmd-2.png"],
  },
];

export const maskotCostumes: CostumeCategory[] = costumeSources.map((source) => ({
  id: source.id,
  label: source.label,
  caption: source.caption,
  images: source.files.map((file) => ({
    src: `/images/maskot/${file}`,
    alt: `RANGSA mengenakan ${source.altSubject} SMA Negeri 1 Samarinda`,
  })),
}));

export const totalCostumes = maskotCostumes.reduce(
  (count, category) => count + category.images.length,
  0,
);
