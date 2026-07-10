import type { Metadata } from "next";
import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { BeritaContent } from "@/features/berita/components/berita-content";
import { getBeritaList } from "@/features/berita/api/get-berita";
import type { BeritaListItem } from "@/features/berita/types/berita";

export const metadata: Metadata = {
  title: "Berita",
  alternates: { canonical: "/berita" },
  description:
    "Kabar terbaru, liputan kegiatan, dan publikasi resmi SMA Negeri 1 Samarinda untuk siswa, orang tua, dan masyarakat.",
};

// Loader async dibungkus <Suspense> agar skeleton hanya berlaku untuk daftar
// berita ini — TIDAK melebar ke route /berita/[slug] (yang butuh status 404
// benar saat notFound()). Route /berita/loading.tsx sengaja tidak dipakai.
async function BeritaListLoader({
  initialCategory,
  initialTag,
}: {
  initialCategory?: string;
  initialTag?: string;
}) {
  let data: BeritaListItem[] = [];
  let error: string | null = null;

  try {
    data = await getBeritaList({ limit: 24 });
  } catch (err) {
    console.error("Gagal mengambil data berita di server:", err);
    error = err instanceof Error ? err.message : "Gagal memuat data berita.";
  }

  return (
    <BeritaContent
      data={data}
      error={error}
      initialCategory={initialCategory}
      initialTag={initialTag}
    />
  );
}

export default async function BeritaPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string; tag?: string }>;
}) {
  const { kategori, tag } = await searchParams;

  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        eyebrow="Kegiatan"
        title="Berita SMANSA"
        description="Kabar terbaru, liputan kegiatan, dan publikasi resmi SMA Negeri 1 Samarinda. Gunakan filter kategori atau pencarian untuk menemukan berita yang Anda cari."
        variant="glass"
        breadcrumbs={[{ label: "Beranda", href: "/" }, { label: "Berita" }]}
      >
        <Suspense fallback={<BeritaListSkeleton />}>
          <BeritaListLoader initialCategory={kategori} initialTag={tag} />
        </Suspense>
      </PageTemplate>
      <SiteFooter anchorBasePath="/" />
    </>
  );
}

function BeritaListSkeleton() {
  return (
    <div className="flex flex-col gap-12">
      {/* Featured skeleton */}
      <div className="grid gap-0 overflow-hidden rounded-lg border border-neutral-100 bg-white/80 shadow-sm lg:grid-cols-[1.1fr_1fr]">
        <div className="h-64 w-full animate-pulse bg-neutral-200 lg:h-full" />
        <div className="flex flex-col justify-center gap-4 p-8 md:p-10">
          <div className="h-6 w-28 animate-pulse rounded-full bg-neutral-200" />
          <div className="h-8 w-3/4 animate-pulse rounded-xl bg-neutral-200" />
          <div className="h-4 w-full animate-pulse rounded-lg bg-neutral-200" />
          <div className="h-4 w-2/3 animate-pulse rounded-lg bg-neutral-200" />
          <div className="h-11 w-40 animate-pulse rounded-md bg-neutral-200" />
        </div>
      </div>

      {/* Filter skeleton */}
      <div className="flex gap-3">
        <div className="h-9 w-24 animate-pulse rounded-full bg-neutral-200" />
        <div className="h-9 w-28 animate-pulse rounded-full bg-neutral-200" />
        <div className="h-9 w-24 animate-pulse rounded-full bg-neutral-200" />
      </div>

      {/* Grid skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card
            key={i}
            variant="glass-soft"
            className="flex flex-col gap-0 overflow-hidden p-0"
          >
            <div className="aspect-[16/9] w-full animate-pulse bg-neutral-200" />
            <div className="flex flex-col gap-3 p-5">
              <div className="h-3 w-1/3 animate-pulse rounded-lg bg-neutral-200" />
              <div className="h-5 w-3/4 animate-pulse rounded-lg bg-neutral-200" />
              <div className="h-4 w-full animate-pulse rounded-lg bg-neutral-200" />
              <div className="h-4 w-2/3 animate-pulse rounded-lg bg-neutral-200" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
