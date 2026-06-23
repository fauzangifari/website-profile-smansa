import type { Metadata } from "next";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { EkskulContent } from "@/features/ekskul/components/ekskul-content";

export const metadata: Metadata = {
  title: "Ekstrakurikuler — SMA Negeri 1 Samarinda",
  description:
    "Jelajahi seluruh program ekstrakurikuler akademik dan non-akademik SMAN 1 Samarinda. Temukan club sains, olahraga, seni budaya, teknologi, dan keagamaan yang tepat untukmu.",
};

export default function EkskulPage() {
  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        eyebrow="Ekstrakurikuler"
        title="Kembangkan Diri di SMANSA"
        description="Program pengembangan bakat akademik dan non-akademik untuk membentuk siswa yang unggul, berkarakter, dan siap berprestasi di berbagai bidang."
        variant="glass"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Ekstrakurikuler" },
        ]}
      >
        <EkskulContent />
      </PageTemplate>
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
