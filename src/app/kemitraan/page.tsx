import type { Metadata } from "next";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { PartnershipContent } from "@/features/partnership/components/partnership-content";

export const metadata: Metadata = {
  title: "Kemitraan",
  alternates: { canonical: "/kemitraan" },
  description:
    "Eksplorasi kolaborasi strategis SMAN 1 Samarinda dengan berbagai mitra untuk meningkatkan kualitas pendidikan dan prestasi siswa.",
};

export default function KemitraanPage() {
  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        eyebrow="Kolaborasi Strategis"
        title="Partnership for Educational Excellence"
        description="Membangun ekosistem pendidikan yang inovatif melalui sinergi dengan institusi pendidikan, industri, dan pemerintah."
        variant="glass"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Kemitraan" },
        ]}
      >
        <PartnershipContent />
      </PageTemplate>
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
