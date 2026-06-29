import type { Metadata } from "next";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { PrestasiContent } from "@/features/prestasi/components/prestasi-content";
import { getAchievements } from "@/features/prestasi/api/get-achievements";
import type { Achievement } from "@/features/prestasi/types/achievement";

export const metadata: Metadata = {
  title: "Prestasi Siswa — SMA Negeri 1 Samarinda",
  description:
    "Daftar lengkap prestasi siswa-siswi SMAN 1 Samarinda dari berbagai bidang dan jenjang kompetisi, mulai dari tingkat kabupaten/kota hingga internasional.",
};

export default async function PrestasiPage() {
  let initialData: Achievement[] = [];
  let initialError: string | null = null;
  let initialDataFetched = false;

  try {
    initialData = await getAchievements();
    initialDataFetched = true; // sukses fetch, meski result kosong
  } catch (err) {
    console.error("Gagal mengambil data prestasi di server:", err);
    initialError = err instanceof Error ? err.message : "Gagal memuat data prestasi.";
  }

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
        <PrestasiContent initialData={initialData} initialError={initialError} initialDataFetched={initialDataFetched} />
      </PageTemplate>
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
