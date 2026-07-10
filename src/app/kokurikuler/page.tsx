import type { Metadata } from "next";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { KokurikulerContent } from "@/features/kokurikuler/components/kokurikuler-content";

export const metadata: Metadata = {
  title: "Kokurikuler",
  alternates: { canonical: "/kokurikuler" },
  description:
    "Eksplorasi program kokurikuler SMAN 1 Samarinda yang berfokus pada penguatan karakter, persiapan akademik, dan proyek kreatif siswa.",
};

export default function KokurikulerPage() {
  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        eyebrow="Program Sekolah"
        title="Kokurikuler: Penguatan Karakter & Akademik"
        description="Mendukung kurikulum inti melalui kegiatan terstruktur untuk membangun kemandirian, kreativitas, dan kesiapan masa depan siswa."
        variant="glass"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Akademik", href: "/#program" },
          { label: "Kokurikuler" },
        ]}
      >
        <KokurikulerContent />
      </PageTemplate>
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
