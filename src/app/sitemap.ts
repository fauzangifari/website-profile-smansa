import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getBeritaList } from "@/features/berita/api/get-berita";
import { getEkstrakurikulerList } from "@/features/ekskul/api/get-ekskul";

const BASE = siteConfig.url;

// API SIMS menolak limit>50 (HTTP 400), jadi ambil seluruh data lewat paginasi
// bertahap: page 1..n dengan limit 50, berhenti saat satu halaman < 50 item.
// MAX_PAGES adalah pengaman anti-loop bila API tak pernah mengembalikan < 50.
const PAGE_SIZE = 50;
const MAX_PAGES = 20;

async function fetchAllPaginated<T>(
  fetchPage: (params: { page: number; limit: number }) => Promise<T[]>,
): Promise<T[]> {
  const all: T[] = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const batch = await fetchPage({ page, limit: PAGE_SIZE });
    all.push(...batch);
    if (batch.length < PAGE_SIZE) break;
  }
  return all;
}

// Rute statis publik + prioritas relatifnya.
const staticRoutes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/profil", changeFrequency: "monthly", priority: 0.8 },
  { path: "/sejarah", changeFrequency: "yearly", priority: 0.6 },
  { path: "/visi-misi", changeFrequency: "yearly", priority: 0.6 },
  { path: "/struktur-organisasi", changeFrequency: "yearly", priority: 0.6 },
  { path: "/denah-sekolah", changeFrequency: "yearly", priority: 0.5 },
  { path: "/sarana-prasarana", changeFrequency: "monthly", priority: 0.6 },
  { path: "/tata-tertib", changeFrequency: "yearly", priority: 0.5 },
  { path: "/kemitraan", changeFrequency: "monthly", priority: 0.5 },
  { path: "/ekstrakurikuler", changeFrequency: "weekly", priority: 0.8 },
  { path: "/prestasi", changeFrequency: "weekly", priority: 0.8 },
  { path: "/kalender-akademik", changeFrequency: "monthly", priority: 0.6 },
  { path: "/alumni", changeFrequency: "monthly", priority: 0.6 },
  { path: "/berita", changeFrequency: "daily", priority: 0.9 },
  { path: "/kokurikuler", changeFrequency: "monthly", priority: 0.6 },
  { path: "/bilingual", changeFrequency: "monthly", priority: 0.6 },
  { path: "/simsdig", changeFrequency: "monthly", priority: 0.5 },
  { path: "/daftar-ulang", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-of-service", changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Rute dinamis — kegagalan API tidak boleh menggagalkan build sitemap.
  let beritaEntries: MetadataRoute.Sitemap = [];
  try {
    const berita = await fetchAllPaginated(getBeritaList);
    beritaEntries = berita.map((post) => ({
      url: `${BASE}/berita/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch (err) {
    console.error("Sitemap: gagal mengambil daftar berita:", err);
  }

  let ekskulEntries: MetadataRoute.Sitemap = [];
  try {
    const ekskul = await fetchAllPaginated(getEkstrakurikulerList);
    ekskulEntries = ekskul.map((item) => ({
      url: `${BASE}/ekstrakurikuler/${item.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch (err) {
    console.error("Sitemap: gagal mengambil daftar ekstrakurikuler:", err);
  }

  return [...staticEntries, ...beritaEntries, ...ekskulEntries];
}
