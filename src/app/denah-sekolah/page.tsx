import type { Metadata } from "next";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { SchoolMapContent } from "@/features/school-map/components/school-map-content";

export const metadata: Metadata = {
  title: "Denah Sekolah",
  alternates: { canonical: "/denah-sekolah" },
  description:
    "Jelajahi denah dan peta sekolah SMA Negeri 1 Samarinda. Temukan lokasi gedung sekolah, cafetaria, perpustakaan, laboratorium, masjid, auditorium, dan seluruh fasilitas sekolah SMANSA.",
};

export default function DenahSekolahPage() {
  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        eyebrow="Denah Sekolah"
        title="Denah Sekolah SMA Negeri 1 Samarinda"
        description="Kenali tata letak dan lokasi setiap gedung serta fasilitas di lingkungan sekolah SMANSA untuk memudahkan navigasi dan orientasi."
        variant="glass"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Tentang", href: "#" },
          { label: "Denah Sekolah" },
        ]}
      >
        <SchoolMapContent />
      </PageTemplate>
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
