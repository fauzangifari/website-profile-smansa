import type { Metadata } from "next";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { NonAkademikContent } from "@/features/non-akademik/components/non-akademik-content";

export const metadata: Metadata = {
  title: "Non-Akademik - SMA Negeri 1 Samarinda",
  description:
    "Eksplorasi potensi, bakat, dan minat siswa SMAN 1 Samarinda melalui berbagai program ekstrakurikuler non-akademik.",
};

const breadcrumbs = [
  { label: "Beranda", href: "/" },
  { label: "Non-Akademik" },
];

export default function NonAkademikPage() {
  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        title="Program Non-Akademik"
        eyebrow="Bakat & Minat"
        description="Wadah pengembangan diri siswa SMANSA melalui berbagai unit kegiatan ekstrakurikuler yang inspiratif dan berprestasi."
        breadcrumbs={breadcrumbs}
        variant="glass"
      >
        <NonAkademikContent />
      </PageTemplate>
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
