import type { Metadata } from "next";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { HistoryContent } from "@/features/history/components/history-content";

export const metadata: Metadata = {
  title: "Sejarah",
  alternates: { canonical: "/sejarah" },
  description:
    "Telusuri jejak sejarah SMA Negeri 1 Samarinda sejak berdiri pada tahun 1953 hingga menjadi sekolah unggulan di Kalimantan Timur.",
};

export default function SejarahPage() {
  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        eyebrow="Jejak Langkah"
        title="Sejarah SMA Negeri 1 Samarinda"
        description="Perjalanan panjang dedikasi dalam mencetak generasi unggul bangsa sejak tahun 1953."
        variant="glass"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil", href: "/profil" },
          { label: "Sejarah" },
        ]}
      >
        <HistoryContent />
      </PageTemplate>
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
