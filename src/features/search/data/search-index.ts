import { mainNavItems, type SiteNavItem } from "@/config/site";
import { NON_AKADEMIK_CATEGORIES } from "@/features/non-akademik/data/non-akademik-data";

export type SearchEntry = {
  title: string;
  description?: string;
  href: string;
  group: string;
  keywords?: string[];
};

// Halaman internal yang tidak ada di navbar tapi tetap perlu bisa dicari.
const EXTRA_PAGES: SearchEntry[] = [
  { title: "Beranda", href: "/", group: "Halaman" },
  { title: "Daftar Ulang", href: "/daftar-ulang", group: "Halaman" },
  { title: "Kebijakan Privasi", href: "/privacy-policy", group: "Halaman" },
  { title: "Syarat & Ketentuan", href: "/terms-of-service", group: "Halaman" },
];

const isInternalRoute = (href: string) =>
  href.startsWith("/") && href !== "/#" && !href.startsWith("/#");

// Ratakan mainNavItems → hanya halaman internal (buang parent dropdown "#"
// dan tautan eksternal seperti Moodle/E-Rapor).
function pagesFromNav(): SearchEntry[] {
  const pages: SearchEntry[] = [];
  const visit = (item: SiteNavItem) => {
    if (item.href && isInternalRoute(item.href)) {
      pages.push({ title: item.label, href: item.href, group: "Halaman" });
    }
    item.children?.forEach(visit);
  };
  mainNavItems.forEach(visit);
  return pages;
}

// Buang duplikat href (mis. "Beranda" bisa muncul dari nav & EXTRA_PAGES).
function dedupeByHref(entries: SearchEntry[]): SearchEntry[] {
  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.href)) return false;
    seen.add(entry.href);
    return true;
  });
}

const pageEntries: SearchEntry[] = dedupeByHref([
  ...pagesFromNav(),
  ...EXTRA_PAGES,
]);

// Aktivitas non-akademik mengarah ke halaman daftar ekstrakurikuler; nama
// aktivitas disimpan sebagai keyword agar "basket", "rohis", dll. ketemu.
const kegiatanEntries: SearchEntry[] = NON_AKADEMIK_CATEGORIES.flatMap(
  (category) =>
    category.activities.map((activity) => ({
      title: activity.name,
      description: activity.description,
      href: "/ekstrakurikuler",
      group: "Kegiatan",
      keywords: [activity.slug, category.title],
    })),
);

export const searchIndex: SearchEntry[] = [
  ...pageEntries,
  ...kegiatanEntries,
];
