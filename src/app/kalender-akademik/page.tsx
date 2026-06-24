import type { Metadata } from "next";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { KalenderAkademikContent } from "@/features/akademik/components/kalender-akademik-content";

export const metadata: Metadata = {
  title: "Kalender Akademik — SMA Negeri 1 Samarinda",
  description:
    "Kalender Pendidikan dan Akademik SMA Negeri 1 Samarinda Tahun Ajaran 2026/2027. Jadwal efektif belajar, libur semester, asesmen, dan agenda sekolah lainnya.",
};

export default function KalenderAkademikPage() {
  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        eyebrow="Kalender Akademik"
        title="Jadwal Pendidikan & Agenda Tahunan SMANSA"
        description="Panduan lengkap agenda pendidikan, hari efektif sekolah, dan jadwal libur SMA Negeri 1 Samarinda untuk Tahun Ajaran 2026/2027."
        variant="glass"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Akademik", href: "#" },
          { label: "Kalender Akademik" },
        ]}
      >
        <KalenderAkademikContent />
      </PageTemplate>
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
