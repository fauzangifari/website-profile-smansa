import type { Metadata } from "next";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { FacilitiesContent } from "@/features/facilities/components/facilities-content";

export const metadata: Metadata = {
  title: "Sarana & Prasarana",
  alternates: { canonical: "/sarana-prasarana" },
  description:
    "Temukan fasilitas lengkap dan modern SMA Negeri 1 Samarinda — laboratorium, perpustakaan, ruang multimedia, masjid, kafetaria, dan berbagai sarana penunjang pendidikan berkualitas.",
};

export default function SaranaPrasaranaPage() {
  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        eyebrow="Fasilitas Sekolah"
        title="Sarana & Prasarana SMA Negeri 1 Samarinda"
        description="Fasilitas modern dan lengkap yang mendukung proses belajar mengajar berkualitas serta pengembangan potensi siswa secara optimal."
        variant="glass"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Sarana & Prasarana" },
        ]}
      >
        <FacilitiesContent />
      </PageTemplate>
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
