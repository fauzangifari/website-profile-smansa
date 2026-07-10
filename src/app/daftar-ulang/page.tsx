import type { Metadata } from "next";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { DaftarUlangContent } from "@/features/daftar-ulang/components/daftar-ulang-content";

export const metadata: Metadata = {
  title: "Daftar Ulang",
  alternates: { canonical: "/daftar-ulang" },
  description:
    "Informasi dan persyaratan daftar ulang bagi calon peserta didik baru SMA Negeri 1 Samarinda Tahun Ajaran 2026/2027.",
};

export default function DaftarUlangPage() {
  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        eyebrow="PPDB"
        title="Persyaratan Daftar Ulang"
        description="Informasi lengkap mengenai jadwal, persyaratan dokumen, dan tata cara daftar ulang bagi calon peserta didik baru SMA Negeri 1 Samarinda."
        variant="glass"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "PPDB", href: "#" },
          { label: "Daftar Ulang" },
        ]}
      >
        <DaftarUlangContent />
      </PageTemplate>
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
