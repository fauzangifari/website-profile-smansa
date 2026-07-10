import type { Metadata } from "next";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { TataTertibContent } from "@/features/tata-tertib/components/tata-tertib-content";

export const metadata: Metadata = {
  title: "Tata Tertib",
  alternates: { canonical: "/tata-tertib" },
  description:
    "Tata Tertib Murid SMA Negeri 1 Samarinda Tahun Ajaran 2024/2025. Panduan lengkap mengenai peraturan seragam, kegiatan belajar mengajar, penampilan, larangan, barang razia, dan sanksi yang berlaku di lingkungan SMANSA.",
};

export default function TataTertibPage() {
  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        eyebrow="Tata Tertib"
        title="Tata Tertib Murid SMA Negeri 1 Samarinda"
        description="Panduan lengkap peraturan dan tata tertib yang berlaku bagi seluruh murid SMA Negeri 1 Samarinda dalam semua kegiatan di lingkungan sekolah."
        variant="glass"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Tentang", href: "#" },
          { label: "Tata Tertib" },
        ]}
      >
        <TataTertibContent />
      </PageTemplate>
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
