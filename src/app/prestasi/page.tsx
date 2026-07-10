import type { Metadata } from "next";
import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { PrestasiContent } from "@/features/prestasi/components/prestasi-content";
import { getAchievements } from "@/features/prestasi/api/get-achievements";
import type { Achievement } from "@/features/prestasi/types/achievement";

export const metadata: Metadata = {
  title: "Prestasi Siswa",
  alternates: { canonical: "/prestasi" },
  description:
    "Daftar lengkap prestasi siswa-siswi SMAN 1 Samarinda dari berbagai bidang dan jenjang kompetisi, mulai dari tingkat kabupaten/kota hingga internasional.",
};

// Loader async dibungkus <Suspense> agar skeleton hanya membungkus area data
// prestasi — shell (navbar + judul PageTemplate) tetap tampil instan.
async function PrestasiListLoader() {
  let data: Achievement[] = [];
  let error: string | null = null;

  try {
    data = await getAchievements();
  } catch (err) {
    console.error("Gagal mengambil data prestasi di server:", err);
    error = err instanceof Error ? err.message : "Gagal memuat data prestasi.";
  }

  return <PrestasiContent data={data} error={error} />;
}

export default function PrestasiPage() {
  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        eyebrow="Akademik"
        title="Prestasi Siswa SMANSA"
        description="Capaian terbaik siswa-siswi SMAN 1 Samarinda dalam berbagai kompetisi akademik maupun non-akademik di tingkat lokal hingga internasional."
        variant="glass"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Prestasi" },
        ]}
      >
        <Suspense fallback={<PrestasiListSkeleton />}>
          <PrestasiListLoader />
        </Suspense>
      </PageTemplate>
      <SiteFooter anchorBasePath="/" />
    </>
  );
}

function PrestasiListSkeleton() {
  return (
    <div className="flex flex-col gap-12 font-sans">
      {/* Hero banner skeleton */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-neutral-100 bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/20 p-8 md:p-14">
        <div className="flex flex-col items-center gap-5">
          <div className="size-16 animate-pulse rounded-2xl bg-neutral-200" />
          <div className="h-6 w-32 animate-pulse rounded-full bg-neutral-200" />
          <div className="h-10 w-3/4 animate-pulse rounded-xl bg-neutral-200" />
          <div className="h-5 w-1/2 animate-pulse rounded-xl bg-neutral-200" />
        </div>
      </div>

      {/* Filter skeleton */}
      <div className="rounded-lg border border-neutral-100 bg-white/80 p-5 shadow-sm">
        <div className="flex flex-col gap-4">
          <div className="h-11 animate-pulse rounded-xl bg-neutral-200" />
          <div className="flex gap-3">
            <div className="h-9 w-32 animate-pulse rounded-lg bg-neutral-200" />
            <div className="h-9 w-32 animate-pulse rounded-lg bg-neutral-200" />
            <div className="h-9 w-48 animate-pulse rounded-lg bg-neutral-200" />
          </div>
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} variant="glass-soft" className="flex flex-col gap-0 overflow-hidden p-0">
            <div className="w-full animate-pulse bg-neutral-200" style={{ aspectRatio: "4/3" }} />
            <div className="flex flex-col gap-3 p-4">
              <div className="h-4 w-3/4 animate-pulse rounded-md bg-neutral-200" />
              <div className="h-3.5 w-full animate-pulse rounded-md bg-neutral-200" />
              <div className="mt-1 flex flex-col gap-2 border-t border-neutral-100 pt-3">
                <div className="h-3 w-1/2 animate-pulse rounded-md bg-neutral-100" />
                <div className="h-3 w-2/3 animate-pulse rounded-md bg-neutral-100" />
                <div className="h-3 w-1/3 animate-pulse rounded-md bg-neutral-100" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
