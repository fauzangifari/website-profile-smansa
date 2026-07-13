import "server-only";

import { mainNavItems, siteConfig, type SiteNavItem } from "@/config/site";
import { getBeritaList } from "@/features/berita/api/get-berita";
import { getEkstrakurikulerList } from "@/features/ekskul/api/get-ekskul";
import { getAchievements } from "@/features/prestasi/api/get-achievements";
import { formatTanggal, sortByPublishedDesc } from "@/features/berita/utils/berita-helpers";
import {
  formatDate,
  formatLevel,
  formatRank,
  formatType,
  getStudentMembers,
} from "@/features/prestasi/utils/achievement-helpers";

// ── Data statis (source of truth di repo) ──────────────────────────────────
// Catatan: JANGAN import `non-akademik-data.ts` / `search-index.ts` di sini —
// keduanya menarik `@phosphor-icons/react` yang client-only dan bisa memicu
// error di konteks server. Kategori ekskul non-akademik di-inline di bawah,
// dan navigasi dirakit langsung dari `mainNavItems`.
import { profileParagraphs } from "@/features/profile/data/profile-data";
import {
  historicalFigures,
  historyDescription,
  historyMilestones,
} from "@/features/history/data/history-data";
import { missionItems, visionStatement } from "@/features/vision-mission/data/vision-mission-data";
import { contactInfo } from "@/features/landing/data/landing-data";
import { mataPelajaran, orgMembers } from "@/features/struktur-organisasi/data/struktur-data";
import {
  daftarUlangAdditional,
  daftarUlangRequirements,
  daftarUlangSchedule,
  daftarUlangWarning,
} from "@/features/daftar-ulang/data/daftar-ulang-data";
import { policySections } from "@/features/privacy-policy/data/privacy-policy-data";
import { termsSections } from "@/features/terms-of-service/data/terms-of-service-data";
import {
  ketentUanSeragamUmum,
  seragamPerHari,
  tataTertibMeta,
  tataTertibSections,
} from "@/features/tata-tertib/data/tata-tertib-data";
import { facilities, facilitiesStats } from "@/features/facilities/data/facilities-data";
import { schoolAddress, schoolAreas, schoolMapStats } from "@/features/school-map/data/school-map-data";
import { calendarEvents } from "@/features/akademik/data/kalender-akademik-data";
import { akademikClubs } from "@/features/akademik/data/akademik-data";
import { kokurikulerDescription, tkaProgram } from "@/features/kokurikuler/data/kokurikuler-data";
import { bilingualDescription, bilingualPrograms } from "@/features/bilingual/data/bilingual-data";
import { partnershipPrograms, partnershipSteps } from "@/features/partnership/data/partnership-data";
import { alumniStats } from "@/features/alumni/data/alumni-data";

// ── Konstanta ──────────────────────────────────────────────────────────────

// Ekskul non-akademik (di-inline agar modul server bebas dari phosphor).
const EKSKUL_NON_AKADEMIK: { kategori: string; kegiatan: string[] }[] = [
  { kategori: "Olahraga", kegiatan: ["Basket", "Handball"] },
  { kategori: "Seni & Budaya", kegiatan: ["Paduan Suara", "Tari Tradisional", "Teater Dahana"] },
  { kategori: "Teknologi & Kreativitas Digital", kegiatan: ["SMANSA Digital Creator", "SMANSA DIGITECH"] },
  { kategori: "Keagamaan", kegiatan: ["Rohis 'Ainul Yaqin"] },
];

// URL pendaftaran (SPMB) & sistem sekolah — dari mainNavItems / enrollment SIMS.
const ENROLLMENT_URL = "https://sims.sman1samarinda.sch.id/enrollment";

const TTL_MS = 30 * 60 * 1000; // 30 menit
const LIVE_TIMEOUT_MS = 6000; // batas tunggu tiap panggilan SIMS

// ── Helper ─────────────────────────────────────────────────────────────────

/** Batasi durasi sebuah promise agar SIMS yang lambat tidak menggantung chat. */
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("SIMS timeout")), ms),
    ),
  ]);
}

type CalendarEvent = (typeof calendarEvents)[number];

function formatEventDate(ev: CalendarEvent): string {
  if (ev.startDate === ev.endDate) return formatTanggal(ev.startDate);
  return `${formatTanggal(ev.startDate)} – ${formatTanggal(ev.endDate)}`;
}

function formatItems(items: { text: string; sub?: string[] }[]): string[] {
  return items.map((item) =>
    item.sub?.length ? `${item.text} (${item.sub.join("; ")})` : item.text,
  );
}

/** Ratakan nav → daftar halaman internal & tautan aplikasi eksternal. */
function collectNav(): { internal: { label: string; href: string }[]; external: { label: string; href: string }[] } {
  const internal: { label: string; href: string }[] = [];
  const external: { label: string; href: string }[] = [];
  const visit = (item: SiteNavItem) => {
    if (item.href && item.href !== "#") {
      if (item.href.startsWith("http")) external.push({ label: item.label, href: item.href });
      else internal.push({ label: item.label, href: item.href });
    }
    item.children?.forEach(visit);
  };
  mainNavItems.forEach(visit);
  return { internal, external };
}

// ── Bagian statis ──────────────────────────────────────────────────────────

function staticSections(): string {
  const nav = collectNav();
  const org = siteConfig.organization;

  const parts: string[] = [];

  parts.push(`# BASIS PENGETAHUAN — SMA NEGERI 1 SAMARINDA (SMANSA)

Dokumen ini adalah SATU-SATUNYA sumber fakta untuk menjawab pertanyaan pengunjung.
Semua tautan berupa path relatif (mis. /sejarah) adalah halaman di website ini.`);

  parts.push(`## IDENTITAS & KONTAK
- Nama resmi: SMA Negeri 1 Samarinda (disingkat SMANSA)
- Berdiri: 14 September 1953 (lebih dari 70 tahun)
- Alamat: ${schoolAddress}
- Telepon: ${org.phone}
- Email: ${org.email}
- Jam layanan administrasi: ${contactInfo.hours}
- Website resmi: ${siteConfig.url}
- Pendaftaran siswa baru (SPMB/PPDB) & daftar ulang: ${ENROLLMENT_URL} (info: /daftar-ulang)`);

  parts.push(`## NAVIGASI HALAMAN WEBSITE
Gunakan daftar ini untuk mengarahkan pengunjung ke halaman yang tepat.
${nav.internal.map((p) => `- ${p.label}: ${p.href}`).join("\n")}

Aplikasi & layanan (tautan eksternal):
${nav.external.map((p) => `- ${p.label}: ${p.href}`).join("\n")}`);

  parts.push(`## PROFIL SEKOLAH
${profileParagraphs.join("\n\n")}`);

  parts.push(`## SEJARAH
${historyDescription.join("\n\n")}

Tonggak sejarah:
${historyMilestones.map((m) => `- ${m.year} — ${m.title}: ${m.description}`).join("\n")}

Kronologi Kepala Sekolah:
${historicalFigures.map((f) => `- ${f.name} (${f.role}, ${f.period})`).join("\n")}
Kepala Sekolah saat ini: Syawal Arifin, S.S., M.Pd. (Plt. Kepala Sekolah).`);

  parts.push(`## VISI & MISI
Visi: ${visionStatement}

Misi (8 dimensi profil lulusan):
${missionItems.map((m) => `${m.number}. ${m.title} — ${m.description}`).join("\n")}`);

  parts.push(`## STRUKTUR ORGANISASI & PIMPINAN (halaman: /struktur-organisasi)
${orgMembers.map((m) => `- ${m.role}: ${m.name} — ${m.nip}, ${m.rank}. ${m.description}`).join("\n")}

Guru Mata Pelajaran — 21 mata pelajaran yang diajarkan di SMANSA:
${mataPelajaran.map((mp) => mp.name).join(", ")}.`);

  parts.push(`## AKADEMIK
Ekstrakurikuler Akademik (halaman: /ekstrakurikuler):
${akademikClubs.map((c) => `- ${c.title}: ${c.description}`).join("\n")}

Kokurikuler (halaman: /kokurikuler): ${kokurikulerDescription.main}
- Program ${tkaProgram.title} — ${tkaProgram.target}. Mata pelajaran: ${tkaProgram.subjects.join(", ")}. Jadwal: ${tkaProgram.schedule.day}, ${tkaProgram.schedule.time}, di ${tkaProgram.schedule.location}.

Program Bilingual (halaman: /bilingual): ${bilingualDescription.join(" ")}
${bilingualPrograms.map((p) => `- ${p.title}: ${p.description}`).join("\n")}`);

  parts.push(`## EKSTRAKURIKULER NON-AKADEMIK (kategori umum)
${EKSKUL_NON_AKADEMIK.map((k) => `- ${k.kategori}: ${k.kegiatan.join(", ")}`).join("\n")}
Daftar ekstrakurikuler lengkap & terbaru ada di bagian "DATA TERKINI" di bawah dan halaman /ekstrakurikuler.`);

  parts.push(`## TATA TERTIB MURID (lengkap di /tata-tertib)
Dasar: SK No. ${tataTertibMeta.nomorSK}, berlaku sejak ${tataTertibMeta.tanggal}.

Seragam per hari:
${seragamPerHari
  .map((s) => `- ${s.hari}: (Putra) ${s.putra.join(" ")} | (Putri) ${s.putri.join(" ")}`)
  .join("\n")}

Ketentuan seragam umum:
${ketentUanSeragamUmum.map((i) => `- ${i.text}`).join("\n")}

${tataTertibSections
  .map((s) => `${s.title} (${s.pasal}):\n${formatItems(s.items).map((t) => `- ${t}`).join("\n")}`)
  .join("\n\n")}`);

  parts.push(`## SARANA & PRASARANA (halaman: /sarana-prasarana)
Ringkasan: ${facilitiesStats.map((s) => `${s.value} ${s.label}`).join(", ")}.
Fasilitas:
${facilities.map((f) => `- ${f.name} (${f.category}): ${f.shortDescription}`).join("\n")}

Denah / area kampus (halaman: /denah-sekolah) — ${schoolMapStats.map((s) => `${s.value} ${s.label}`).join(", ")}:
${schoolAreas.map((a) => `- ${a.name}: ${a.description} Fasilitas: ${a.features.join(", ")}.`).join("\n")}`);

  parts.push(`## KALENDER AKADEMIK 2026/2027 (halaman: /kalender-akademik)
${calendarEvents.map((e) => `- ${formatEventDate(e)}: ${e.title}`).join("\n")}`);

  parts.push(`## KEMITRAAN (halaman: /kemitraan)
Program kemitraan:
${partnershipPrograms.map((p) => `- ${p.program} (mitra: ${p.partner}) — ${p.benefit}`).join("\n")}
Cara menjadi mitra:
${partnershipSteps.map((s, i) => `${i + 1}. ${s.title}: ${s.description}`).join("\n")}`);

  parts.push(`## ALUMNI (halaman: /alumni)
Angka indikatif: ${alumniStats.map((s) => `${s.value}${s.suffix} ${s.label}`).join(", ")}.
Profil alumni ada di halaman /alumni.`);

  parts.push(`## DAFTAR ULANG / PENERIMAAN PESERTA DIDIK (halaman: /daftar-ulang)
Jadwal pengumpulan berkas: ${daftarUlangSchedule.tanggal}, pukul ${daftarUlangSchedule.waktu}.
Persyaratan berkas:
${daftarUlangRequirements.map((r, i) => `${i + 1}. ${r.title} — ${r.description}`).join("\n")}
Persyaratan tambahan:
${daftarUlangAdditional.map((a) => `- ${a.title}: ${a.description}`).join("\n")}
Peringatan penting: ${daftarUlangWarning}
Formulir daftar ulang & pendaftaran online (SPMB): ${ENROLLMENT_URL}`);

  parts.push(`## KEBIJAKAN PRIVASI & SYARAT KETENTUAN (halaman: /privacy-policy dan /terms-of-service)
Ringkasan poin Kebijakan Privasi:
${policySections.id.map((s) => `- ${s.title}: ${s.summary}`).join("\n")}

Ringkasan poin Syarat & Ketentuan:
${termsSections.id.map((s) => `- ${s.title}: ${s.summary}`).join("\n")}

Untuk teks lengkap dan dasar hukum, arahkan pengunjung ke halaman /privacy-policy atau /terms-of-service.`);

  return parts.join("\n\n");
}

// ── Bagian live (SIMS) ──────────────────────────────────────────────────────

async function beritaSection(): Promise<string> {
  try {
    const list = sortByPublishedDesc(await withTimeout(getBeritaList({ limit: 30 }), LIVE_TIMEOUT_MS));
    if (!list.length) return "### Berita terbaru\n(Belum ada berita.)";
    const lines = list
      .map(
        (b) =>
          `- "${b.title}" (${b.category?.name ?? "Umum"}, ${formatTanggal(b.publishedAt)})${b.excerpt ? ` — ${b.excerpt}` : ""} [baca: /posts/${b.slug}]`,
      )
      .join("\n");
    return `### Berita terbaru (halaman: /posts)\n${lines}`;
  } catch {
    return "### Berita terbaru\n(Data berita sedang tidak dapat diambil dari sistem sekolah. Arahkan pengunjung ke halaman /posts.)";
  }
}

async function prestasiSection(): Promise<string> {
  try {
    const list = await withTimeout(getAchievements(), LIVE_TIMEOUT_MS);
    if (!list.length) return "### Prestasi\n(Belum ada data prestasi.)";
    const lines = list
      .slice(0, 50)
      .map((a) => {
        const students = getStudentMembers(a.members).join(", ") || "-";
        return `- ${a.name} — ${formatRank(a.rank)}, ${formatType(a.type)}, tingkat ${formatLevel(a.level)}, ${formatDate(a.date)}, penyelenggara ${a.organizer}. Peserta: ${students}.`;
      })
      .join("\n");
    return `### Prestasi (halaman: /prestasi)\n${lines}`;
  } catch {
    return "### Prestasi\n(Data prestasi sedang tidak dapat diambil. Arahkan pengunjung ke halaman /prestasi.)";
  }
}

async function ekskulSection(): Promise<string> {
  try {
    const list = await withTimeout(getEkstrakurikulerList({ limit: 50 }), LIVE_TIMEOUT_MS);
    if (!list.length) return "### Daftar ekstrakurikuler\n(Belum ada data.)";
    const lines = list
      .map((e) => `- ${e.title}: ${e.shortDescription} [/ekstrakurikuler/${e.slug}]`)
      .join("\n");
    return `### Daftar ekstrakurikuler terkini (halaman: /ekstrakurikuler)\n${lines}`;
  } catch {
    return "### Daftar ekstrakurikuler\n(Data ekstrakurikuler sedang tidak dapat diambil. Arahkan pengunjung ke halaman /ekstrakurikuler.)";
  }
}

async function liveSections(): Promise<string> {
  const [berita, prestasi, ekskul] = await Promise.all([
    beritaSection(),
    prestasiSection(),
    ekskulSection(),
  ]);
  return `## DATA TERKINI (ditarik langsung dari sistem sekolah / SIMS)
${berita}

${prestasi}

${ekskul}`;
}

// ── API publik modul ─────────────────────────────────────────────────────────

let cache: { text: string; at: number } | null = null;

async function buildKnowledgeBase(): Promise<string> {
  const [live] = await Promise.all([liveSections()]);
  return `${staticSections()}\n\n${live}`;
}

/**
 * Rangkai Knowledge Base (statis + live SIMS) menjadi satu string.
 * Hasilnya di-memo selama TTL agar SIMS tidak dipanggil pada tiap pesan chat.
 */
export async function getKnowledgeBase(): Promise<string> {
  const now = Date.now();
  if (cache && now - cache.at < TTL_MS) return cache.text;
  const text = await buildKnowledgeBase();
  cache = { text, at: now };
  return text;
}
