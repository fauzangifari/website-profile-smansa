import type { Metadata } from "next";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { MaskotContent } from "@/features/maskot/components/maskot-content";

export const metadata: Metadata = {
  title: "Maskot",
  alternates: { canonical: "/maskot" },
  description:
    "Mengenal RANGSA, maskot SMA Negeri 1 Samarinda — perpaduan burung enggang khas Borneo dan semangat SMANSA yang terbang tinggi, menjaga kehormatan, dan menumbuhkan kehidupan.",
};

export default function MaskotPage() {
  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        eyebrow="Maskot Sekolah"
        title="RANGSA — Sang Rangkong SMANSA"
        description="Filosofi di balik maskot SMA Negeri 1 Samarinda: enggang yang terbang tinggi, menjaga kehormatan, dan menumbuhkan kehidupan."
        variant="glass"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil", href: "/profil" },
          { label: "Maskot" },
        ]}
      >
        <MaskotContent />
      </PageTemplate>
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
