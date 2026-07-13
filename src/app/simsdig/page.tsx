import type { Metadata } from "next";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { SimsdigContent } from "@/features/simsdig/components/simsdig-content";

export const metadata: Metadata = {
  title: "SIMSDIG — Sistem Informasi Manajemen Sekolah Digital",
  alternates: { canonical: "/simsdig" },
  description:
    "SIMSDIG (Sistem Informasi Manajemen Sekolah Digital) SMA Negeri 1 Samarinda — satu ekosistem terintegrasi melalui dashboard web, aplikasi Android, dan iOS.",
};

export default function SimsdigPage() {
  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        eyebrow="Aplikasi Kami"
        title="SIMSDIG"
        description="Sistem Informasi Manajemen Sekolah Digital SMA Negeri 1 Samarinda — satu platform terpadu yang terintegrasi lewat dashboard web, aplikasi Android, dan iOS."
        variant="glass"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Aplikasi Kami", href: "#" },
          { label: "SIMSDIG" },
        ]}
      >
        <SimsdigContent />
      </PageTemplate>
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
