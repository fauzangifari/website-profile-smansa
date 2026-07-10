import type { Metadata } from "next";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { BilingualContent } from "@/features/bilingual/components/bilingual-content";

export const metadata: Metadata = {
  title: "Program Bilingual",
  alternates: { canonical: "/bilingual" },
  description:
    "Pelajari lebih lanjut tentang Program Bilingual di SMAN 1 Samarinda yang mengintegrasikan kecakapan multibahasa dan wawasan global.",
};

export default function BilingualPage() {
  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        eyebrow="Program Unggulan"
        title="Bilingual Program: International Excellence"
        description="Membentuk generasi unggul dengan kemampuan multibahasa dan kesiapan global melalui kurikulum yang terintegrasi dan kolaborasi internasional."
        variant="glass"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Akademik", href: "/#program" },
          { label: "Bilingual" },
        ]}
      >
        <BilingualContent />
      </PageTemplate>
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
