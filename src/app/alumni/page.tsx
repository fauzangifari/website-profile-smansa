import type { Metadata } from "next";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { AlumniContent } from "@/features/alumni/components/alumni-content";

export const metadata: Metadata = {
  title: "Alumni",
  alternates: { canonical: "/alumni" },
  description:
    "Jejaring alumni SMA Negeri 1 Samarinda. Bergabung dengan ikatan alumni, lihat statistik, dan telusuri direktori lulusan berdasarkan universitas, pekerjaan, dan angkatan.",
};

export default function AlumniPage() {
  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        eyebrow="Alumni"
        title="Jejaring Alumni SMANSA"
        description="Ribuan lulusan SMA Negeri 1 Samarinda telah tersebar dan berprestasi di berbagai bidang. Terhubung kembali, temukan inspirasi, dan jadilah bagian dari keluarga besar alumni."
        variant="glass"
        breadcrumbs={[{ label: "Beranda", href: "/" }, { label: "Alumni" }]}
      >
        <AlumniContent />
      </PageTemplate>
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
