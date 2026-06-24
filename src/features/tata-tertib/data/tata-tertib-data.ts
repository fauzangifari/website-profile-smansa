// ─── Tata Tertib Murid SMAN 1 Samarinda ───────────────────────────────────────
// Berdasarkan SK Kepala SMAN 1 Samarinda No. 400.3.8/2016/SMAN1SMR
// Ditetapkan: Samarinda, 30 Juni 2025
// Kepala: I Putu Suberata, S.Pd., M.Si — NIP. 19651231 198803 1 063

export type TataTertibItem = {
  text: string;
  sub?: string[]; // sub-items (nested)
};

export type TataTertibSection = {
  id: string;
  pasal: string;
  title: string;
  icon: string;
  colorClass: string; // Tailwind accent
  items: TataTertibItem[];
};

export type TataTertibBab = {
  bab: string;
  title: string;
  sections: TataTertibSection[];
};

// ─── Metadata SK ──────────────────────────────────────────────────────────────
export const tataTertibMeta = {
  nomorSK: "400.3.8/2016/SMAN1SMR",
  ditetapkanDi: "Samarinda",
  tanggal: "30 Juni 2025",
  kepalaSekolah: "I Putu Suberata, S.Pd., M.Si",
  nip: "19651231 198803 1 063",
  totalBab: 7,
  totalPasal: 28,
  tahunAjaran: "2024/2025",
};

// ─── Stats ────────────────────────────────────────────────────────────────────
export const tataTertibStats = [
  { value: "7", label: "BAB" },
  { value: "28", label: "Pasal" },
  { value: "2024", label: "Tahun Ajaran" },
  { value: "30 Jun", label: "Berlaku Sejak" },
];

// ─── Seragam per hari ─────────────────────────────────────────────────────────
export type SeragamHari = {
  hari: string;
  putra: string[];
  putri: string[];
};

export const seragamPerHari: SeragamHari[] = [
  {
    hari: "Senin",
    putra: [
      "Kemeja putih lengan pendek dengan logo OSIS di saku kiri dan badge merah putih di atas, lengan kanan terdapat badge SMA Negeri 1 Samarinda.",
      "Celana panjang abu-abu SMA — rapi dan formal (tidak boleh cutbray, baggy, hipster, pipa, ketat, atau skater).",
      "Memakai topi SMA Negeri 1 Samarinda saat upacara bendera hari Senin.",
    ],
    putri: [
      "Kemeja putih lengan panjang dengan logo OSIS di saku kiri dan badge merah putih di atas, lengan kanan terdapat badge SMA Negeri 1 Samarinda.",
      "Rok panjang abu-abu SMA — rapi dan formal (tidak boleh cutbray, baggy, hipster, pipa, ketat, atau skater).",
      "Memakai topi SMA Negeri 1 Samarinda saat upacara bendera hari Senin.",
    ],
  },
  {
    hari: "Selasa",
    putra: [
      "Seragam Pakaian Dinas Harian (PDH) SMAN 1 Samarinda lengan pendek dengan logo sekolah di lengan kanan dan nama murid di dada kiri.",
      "Celana panjang coklat khas PDH SMAN 1 Samarinda — rapi dan formal.",
    ],
    putri: [
      "Seragam PDH SMAN 1 Samarinda lengan panjang dengan logo sekolah di lengan kanan dan nama murid di dada kiri.",
      "Rok panjang crem khas PDH SMAN 1 Samarinda — rapi dan formal.",
    ],
  },
  {
    hari: "Rabu",
    putra: [
      "Seragam sarung Samarinda khas SMAN 1 Samarinda lengan pendek dengan logo sekolah di dada kiri dan nama murid dengan desain sablon.",
      "Celana panjang putih — rapi dan formal.",
    ],
    putri: [
      "Seragam sarung Samarinda dengan dalaman baju lengan panjang putih dilapisi rompi SMAN 1 Samarinda yang dimasukkan.",
      "Rok panjang sarung Samarinda khas SMAN 1 Samarinda — rapi dan formal.",
    ],
  },
  {
    hari: "Kamis",
    putra: [
      "Baju batik khas SMAN 1 Samarinda lengan pendek dengan badge merah putih di atas saku kiri dan nama murid.",
      "Celana panjang putih — rapi dan formal.",
    ],
    putri: [
      "Baju batik khas SMAN 1 Samarinda lengan panjang dengan badge merah putih di atas saku kiri dan nama murid.",
      "Rok panjang putih — rapi dan formal.",
    ],
  },
  {
    hari: "Jumat",
    putra: [
      "Seragam pramuka lengan pendek lengkap dengan segala atributnya: logo Samarinda, tunas kelapa, nomor gugus depan di lengan kanan, logo SMAN 1 Samarinda di dada kiri.",
      "Celana panjang pramuka — rapi dan formal.",
    ],
    putri: [
      "Seragam pramuka lengan panjang lengkap dengan segala atributnya: logo Samarinda, tunas kelapa, nomor gugus depan di lengan kanan, logo SMAN 1 Samarinda di dada kiri.",
      "Rok panjang pramuka — rapi dan formal.",
    ],
  },
];

// ─── Ketentuan Seragam Umum ───────────────────────────────────────────────────
export const ketentUanSeragamUmum: TataTertibItem[] = [
  { text: "Baju dimasukkan ke dalam celana/rok kecuali baju batik dan baju bermodel khusus yang memang tidak dimasukkan." },
  { text: "Memakai ikat pinggang berwarna hitam dan tidak berlebihan." },
  { text: "Memakai sepatu berwarna hitam polos dan kaos kaki putih polos (minimal setinggi mata kaki)." },
  { text: "Bagi murid putri yang mengenakan jilbab wajib memakai jilbab putih polos (tidak bercorak atau bermotif) saat berseragam senin-kamis dan jilbab coklat polos saat berseragam pramuka." },
  { text: "Tas yang dibawa adalah tas ransel sekolah." },
  { text: "Tidak memakai jaket, sweater, atau sejenisnya selama jam pelajaran berlangsung." },
];

// ─── Sections utama ───────────────────────────────────────────────────────────
export const tataTertibSections: TataTertibSection[] = [
  // ── Upacara Bendera ────────────────────────────────────────────────────────
  {
    id: "upacara",
    pasal: "Pasal 6",
    title: "Upacara Bendera",
    icon: "Flag",
    colorClass: "blue",
    items: [
      { text: "Seluruh murid, pendidik, dan tenaga kependidikan wajib mengikuti upacara bendera yang ditentukan sekolah, Dinas Pendidikan Kaltim, maupun Pemerintah." },
      { text: "Upacara bendera dilaksanakan setiap hari Senin." },
      { text: "Petugas upacara hari Senin dilaksanakan secara bergiliran setiap kelas dengan didampingi PASSUS SMAN 1 Samarinda." },
      { text: "Petugas upacara hari besar dilaksanakan oleh PASSUS SMAN 1 Samarinda." },
      { text: "Peserta wajib memakai seragam sesuai peraturan dan mengenakan topi yang telah ditentukan sekolah (putra dan putri tidak boleh beda)." },
      { text: "Selama upacara, seluruh peserta wajib menjaga ketenangan, kedisiplinan, dan ketertiban serta menjaga nilai-nilai penyelenggaraan upacara." },
      {
        text: "Selama upacara, peserta tidak diperbolehkan:",
        sub: [
          "Menggunakan alat komunikasi elektronik dalam bentuk apapun.",
          "Membuat kegaduhan dan mengganggu jalannya upacara.",
          "Membawa kipas angin portable.",
        ],
      },
      { text: "Apabila terjadi pelanggaran, akan dimasukkan dalam poin pelanggaran." },
    ],
  },

  // ── Proses Pembelajaran ───────────────────────────────────────────────────
  {
    id: "kbm",
    pasal: "Pasal 7",
    title: "Proses Pembelajaran (KBM)",
    icon: "BookOpenText",
    colorClass: "emerald",
    items: [
      { text: "Waktu pembelajaran utama Senin–Kamis dimulai pukul 07.00 dan berakhir pukul 15.30. Hari Jumat pukul 07.00–11.45 WITA." },
      { text: "Murid harus sudah hadir di sekolah sebelum pukul 07.00 WITA." },
      { text: "Murid yang datang melewati pukul 07.00 WITA dianggap terlambat dan wajib menghubungi orang tua/wali sebelum diizinkan masuk." },
      { text: "Murid melakukan kegiatan literasi, menyimak, dan membaca kitab suci atau buku non-pelajaran mulai pukul 07.00 WITA." },
      { text: "Murid harus mengikuti pelajaran sesuai dengan jadwal yang telah ditentukan." },
      { text: "Murid wajib memakai sepatu berwarna hitam polos saat KBM berlangsung." },
      { text: "Murid wajib memakai tas ransel sekolah." },
      { text: "Murid tidak diperkenankan memakai jaket, sweater, dsb. selama jam pelajaran berlangsung." },
      { text: "Selama jam pelajaran, ruang kelas harus terbebas dari barang-barang yang berpotensi mengganggu proses pembelajaran." },
      { text: "Segala macam alat komunikasi dan barang elektronik tidak boleh dipergunakan dan disimpan di tempat yang telah disiapkan, kecuali diizinkan oleh pendidik." },
      { text: "Murid berhak mengajukan usul, keberatan, atau saran terhadap sistem KBM sesuai prosedur dan etika berpendapat." },
      { text: "Murid yang terlambat 2 kali berturut-turut wajib menghubungi orang tua/wali untuk menjemput." },
      { text: "Murid wajib menjalankan ibadah sholat Dzuhur/Ashar/Jumatan di Masjid sekolah bagi yang beragama Islam." },
    ],
  },

  // ── Kendaraan ─────────────────────────────────────────────────────────────
  {
    id: "kendaraan",
    pasal: "Pasal 9–13",
    title: "Tata Tertib Berkendaraan",
    icon: "Car",
    colorClass: "amber",
    items: [
      { text: "Murid yang menggunakan kendaraan bermotor wajib memiliki Surat Izin Mengemudi (SIM) yang sah." },
      { text: "Kendaraan yang digunakan harus sesuai ketentuan: berplat nomor resmi, tidak dimodifikasi secara berlebihan." },
      { text: "Murid wajib mematuhi seluruh peraturan lalu lintas selama mengendarai kendaraan ke/dari sekolah." },
      { text: "Kendaraan bermotor diparkir di tempat yang telah ditentukan oleh sekolah." },
      { text: "Murid dilarang mengendarai kendaraan bermotor di dalam lingkungan sekolah dengan kecepatan tinggi." },
      { text: "Murid dilarang memakai helm yang dimodifikasi sehingga tidak memenuhi standar keselamatan." },
      { text: "Kendaraan bermotor yang tidak sesuai ketentuan dapat dirazia oleh pihak sekolah." },
    ],
  },

  // ── Rambut & Penampilan ───────────────────────────────────────────────────
  {
    id: "penampilan",
    pasal: "Pasal 14",
    title: "Rambut & Penampilan",
    icon: "Scissors",
    colorClass: "violet",
    items: [
      { text: "Murid putra dilarang berambut panjang: ujung rambut bagian depan melebihi jidat, bagian samping melebihi telinga, dan bagian belakang melebihi kerah baju." },
      { text: "Murid putra harus menjaga jenggot tetap rapi." },
      { text: "Murid putri dilarang memakai make-up atau perhiasan yang berlebihan." },
      { text: "Dilarang memakai pewarna kuku dengan warna apapun (putra maupun putri)." },
      { text: "Murid putri: dilarang membuat lubang tindik yang berlebihan atau tindik yang tidak berada pada tempatnya, dan dilarang menato tubuh." },
      { text: "Murid putra: dilarang membuat lubang tindik atau memakai anting-anting di telinga atau anggota tubuh lainnya, dan dilarang menato tubuh." },
      { text: "Dilarang mengecat rambut dengan warna apapun." },
      { text: "Dilarang memakai sandal dan kaos oblong (selain kaos olahraga) di lingkungan sekolah pada jam sekolah." },
    ],
  },

  // ── Kartu Pelajar ─────────────────────────────────────────────────────────
  {
    id: "kartu-pelajar",
    pasal: "Pasal 15",
    title: "Kartu Pelajar",
    icon: "IdentificationCard",
    colorClass: "sky",
    items: [
      { text: "Kartu Pelajar diberikan kepada setiap murid yang terdaftar sebagai murid aktif di SMAN 1 Samarinda." },
      { text: "Kartu Pelajar harus selalu dibawa murid sebagai identitas pelajar." },
      { text: "Dalam hal terjadi kehilangan atau kerusakan Kartu Pelajar, dapat diberikan Kartu Pelajar Pengganti oleh sekolah dengan syarat tertentu." },
      { text: "Kartu Pelajar diterbitkan dalam kondisi baik dan aman dari ancaman kerusakan air." },
      { text: "Kartu Pelajar ditarik kembali oleh sekolah manakala pelajar tersebut sudah tidak menjadi murid di sekolah." },
      {
        text: "Kartu Pelajar sekurang-kurangnya memuat:",
        sub: ["Identitas sekolah", "Nama murid", "Foto murid", "Nomor Induk Siswa Nasional (NISN)", "Jenis Kelamin", "Agama", "Alamat rumah", "Identitas dan tanda tangan Kepala Sekolah serta cap sekolah."],
      },
    ],
  },

  // ── Kegiatan Berorganisasi ────────────────────────────────────────────────
  {
    id: "organisasi",
    pasal: "Pasal 19",
    title: "Kegiatan Berorganisasi",
    icon: "UsersThree",
    colorClass: "teal",
    items: [
      { text: "OSIS SMAN 1 Samarinda merupakan satu-satunya organisasi murid yang sah dan diakui sekolah sebagai wadah murid berorganisasi." },
      { text: "Tamu yang akan berkunjung menemui OSIS harus melalui sekolah terlebih dahulu." },
      { text: "Razia mengenai pelaksanaan tata tertib dilaksanakan oleh pendidik dan yang berhak membantu jalannya proses razia." },
      { text: "Seluruh anggota OSIS diharapkan dapat menjaga etika berorganisasi." },
    ],
  },

  // ── Hal yang Dilarang ─────────────────────────────────────────────────────
  {
    id: "larangan",
    pasal: "Pasal 22",
    title: "Hal-Hal yang Dilarang",
    icon: "ProhibitInset",
    colorClass: "rose",
    items: [
      { text: "Melakukan hal-hal yang dapat merusak nama baik sekolah." },
      { text: "Keluar kelas tanpa izin pendidik mata pelajaran yang sedang mengajar." },
      { text: "Berada di area kantin sekolah pada saat KBM berlangsung." },
      { text: "Membawa senjata dalam bentuk apapun selain gunting dan cutter untuk tugas sekolah." },
      { text: "Menggunakan senjata dalam bentuk apapun untuk mengancam bahkan melukai orang lain." },
      { text: "Membawa alat atau barang yang dapat mengganggu kegiatan belajar mengajar." },
      { text: "Melakukan bullying atau perundungan kepada seluruh warga SMAN 1 Samarinda." },
      { text: "Menggunakan handphone yang tidak di-silent, membawa headset, dan speaker." },
      { text: "Merokok maupun membawa rokok baik di sekolah, di rumah, maupun di lingkungan masyarakat, termasuk vape dan liquid." },
      { text: "Memakai seragam yang bahan, potongan, dan ketentuan harinya tidak sesuai ketentuan SMAN 1 Samarinda." },
      { text: "Memakai make-up atau perhiasan yang berlebihan bagi murid putri." },
      { text: "Membawa, memakai, dan mengedarkan narkotika, psikotropika, zat-zat adiktif berbahaya, obat terlarang, dan miras di dalam maupun luar lingkungan sekolah." },
      { text: "Melakukan perkelahian dengan sesama murid atau dengan murid dari sekolah lain, secara individu maupun berkelompok." },
      { text: "Menjadi provokator perkelahian." },
      { text: "Melakukan tindakan perjudian dalam bentuk apapun." },
      { text: "Melakukan tindakan kriminalitas, mabuk, serta tindakan asusila." },
      { text: "Melakukan tindakan perusakan, pemindahan, dan penyalahgunaan fasilitas sekolah; misalnya coret-coret, mencuri, dll." },
      { text: "Membuang sampah tidak pada tempatnya." },
      { text: "Menyaksikan, membawa benda-benda, atau melakukan segala sesuatu yang mengandung unsur pornografi dan pornoaksi." },
      { text: "Membuat pengumuman/publikasi tanpa seizin sekolah." },
      { text: "Melakukan tindakan pemborosan listrik, air, dan fasilitas lain di sekolah." },
      { text: "Mengancam, menganiaya, dan/atau mengeroyok kepala sekolah, pendidik, tenaga kependidikan, dan/atau sesama murid." },
      { text: "Menyontek, menerima, dan/atau memberi bantuan pada saat Ulangan atau Ujian." },
      { text: "Berpacaran di lingkungan sekolah, dan/atau sampai hamil dan/atau menghamili." },
    ],
  },

  // ── Barang Razia ──────────────────────────────────────────────────────────
  {
    id: "razia",
    pasal: "Pasal 23",
    title: "Hal-Hal yang Dirazia",
    icon: "MagnifyingGlass",
    colorClass: "orange",
    items: [
      { text: "Rokok, vape dan liquid, minuman keras, narkotika, psikotropika, zat-zat adiktif berbahaya, dan obat-obatan terlarang." },
      { text: "Senjata dalam bentuk apapun (kecuali cutter dan gunting untuk tugas)." },
      { text: "Segala macam buku bacaan di luar buku pelajaran; misalnya: komik, majalah hiburan, dll." },
      { text: "Segala macam mainan yang tidak berhubungan dengan KBM dan tidak diperbolehkan pendidik." },
      { text: "Segala sesuatu yang mengandung unsur pornografi dan pornoaksi." },
      { text: "Segala macam tipe-x dalam bentuk cair." },
      {
        text: "Bahan/alat kecantikan untuk murid putri:",
        sub: ["Lipstik atau sejenisnya", "Maskara dan alat pelentik bulu mata", "Pemerah pipi (blush on)", "Eye shadow"],
      },
      {
        text: "Perhiasan untuk murid putra yang dibawa dan/atau dikenakan:",
        sub: ["Gelang (segala aksesoris yang melingkar di pergelangan tangan/kaki, kecuali jam tangan)", "Kalung (segala aksesoris yang melingkar di leher)", "Anting/tindik (segala aksesoris yang dipasang di telinga)", "Cincin (segala aksesoris yang melingkar di jari tangan/kaki)"],
      },
      { text: "Handphone yang tidak di-silent dan headset." },
      { text: "Kendaraan bermotor yang tidak sesuai ketentuan yang telah ditentukan." },
      {
        text: "Seragam yang tidak sesuai:",
        sub: ["Tidak sesuai ketentuan hari", "Tidak sesuai bahan dan model yang ditentukan sekolah", "Tidak memakai ikat pinggang sesuai kriteria", "Jilbab untuk murid putri tidak sesuai kriteria", "Kaos kaki tidak sesuai kriteria"],
      },
      { text: "Barang bukti pelanggaran dapat disita dan dikembalikan kepada murid setelah menaati prosedur yang berlaku dan mendatangi BK." },
    ],
  },

  // ── Sanksi ────────────────────────────────────────────────────────────────
  {
    id: "sanksi",
    pasal: "Pasal 24",
    title: "Sanksi",
    icon: "Warning",
    colorClass: "red",
    items: [
      { text: "Peringatan langsung atau lisan kepada murid." },
      { text: "Peringatan tertulis kepada peserta didik dan/atau orang tua/wali peserta didik yang bersangkutan." },
      { text: "Murid yang melakukan pelanggaran beberapa kali diperingatkan oleh Perwakilan Kelas; pelanggaran berikutnya dilaporkan kepada wali kelas; pelanggaran selanjutnya dilaporkan kepada BK." },
      { text: "Peserta didik yang melakukan pelanggaran akan dikenakan poin sesuai tingkat pelanggaran." },
      { text: "Setiap per 15 (lima belas) poin atau jika dipandang perlu, pihak sekolah yang diwakili Wali Kelas dan pendidik BK dapat memanggil orangtua/Wali." },
      { text: "Jumlah maksimal poin yang diberikan baik secara langsung maupun kumulatif dari beberapa pelanggaran adalah 100 (seratus) poin." },
      { text: "Murid yang membawa/memakai/mengedarkan NARKOBA dan zat adiktif lainnya akan diberikan sanksi berupa dikeluarkan dari sekolah." },
    ],
  },

  // ── Penegakan Tata Tertib ─────────────────────────────────────────────────
  {
    id: "penegakan",
    pasal: "Pasal 25",
    title: "Penegakan Tata Tertib",
    icon: "ShieldCheck",
    colorClass: "indigo",
    items: [
      { text: "Penegakan tata tertib menjadi tanggung jawab semua elemen sekolah (kepala sekolah, pendidik, tenaga kependidikan, dan murid)." },
      { text: "Penegakan tata tertib ditempuh melalui tindakan persuasif, pemberian sanksi, dan pemberian poin." },
      {
        text: "Setiap pelanggaran terhadap tata tertib yang dilakukan murid, pendidik dan/atau tenaga kependidikan berkewajiban:",
        sub: [
          "Memperingatkan dan membina murid tersebut.",
          "Melaporkan secara online dengan mengisi form laporan pelanggaran terhadap tata tertib secara lengkap.",
          "Guru BK menindaklanjuti laporan online dengan memanggil terlapor untuk pembinaan lanjutan dan mengarsip pelanggaran ke dalam kartu kontrol terlapor.",
        ],
      },
      { text: "Ketentuan poin pelanggaran tertuang dalam lampiran tersendiri." },
    ],
  },
];

// ─── Kategori Tab untuk navigasi ──────────────────────────────────────────────
export type TataTertibCategory = {
  id: string;
  label: string;
  icon: string;
  sectionIds: string[];
};

export const tataTertibCategories: TataTertibCategory[] = [
  { id: "semua", label: "Semua", icon: "List", sectionIds: [] },
  { id: "seragam", label: "Seragam", icon: "TShirt", sectionIds: ["seragam"] },
  { id: "kbm", label: "KBM", icon: "BookOpenText", sectionIds: ["upacara", "kbm"] },
  { id: "penampilan", label: "Penampilan", icon: "Scissors", sectionIds: ["penampilan"] },
  { id: "organisasi", label: "Organisasi", icon: "UsersThree", sectionIds: ["kartu-pelajar", "organisasi"] },
  { id: "larangan", label: "Larangan", icon: "ProhibitInset", sectionIds: ["larangan", "razia"] },
  { id: "sanksi", label: "Sanksi", icon: "Warning", sectionIds: ["sanksi", "penegakan"] },
];
