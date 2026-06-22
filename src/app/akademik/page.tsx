import type { Metadata } from "next";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { AkademikContent } from "@/features/akademik/components/akademik-content";

export const metadata: Metadata = {
  title: "Akademik & Ekskul Sains SMA Negeri 1 Samarinda",
  description:
    "Jelajahi berbagai program akademik dan klub sains di SMAN 1 Samarinda yang dirancang untuk mengasah potensi intelektual dan prestasi siswa.",
};

export default function AkademikPage() {
  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        eyebrow="Ekstrakurikuler"
        title="Akademik Smansa: Intelektualitas & Prestasi"
        description="Pusat pengembangan bakat akademik melalui program pengayaan intensif dan bimbingan spesialis untuk mencetak generasi juara di kancah nasional maupun internasional."
        variant="glass"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Akademik" },
        ]}
      >
        <AkademikContent />
      </PageTemplate>
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
