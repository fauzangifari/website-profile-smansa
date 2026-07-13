import type { Metadata } from "next";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { getDirektoriList } from "@/features/direktori/api/get-direktori";
import { DirektoriContent } from "@/features/direktori/components/direktori-content";

export const metadata: Metadata = {
  title: "Direktori Tenaga Kependidikan",
  alternates: { canonical: "/direktori-tendik" },
  description:
    "Direktori tenaga kependidikan (tendik) SMA Negeri 1 Samarinda. Telusuri daftar tendik beserta informasi kontaknya.",
};

export default async function DirektoriTendikPage() {
  const people = await getDirektoriList("tendik");

  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        variant="glass"
        eyebrow="Profil Sekolah"
        title="Direktori Tenaga Kependidikan"
        description="Telusuri daftar tenaga kependidikan SMA Negeri 1 Samarinda. Klik salah satu kartu untuk melihat detail NIP dan email sekolah."
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Direktori Tendik" },
        ]}
      >
        <DirektoriContent
          people={people}
          basePath="/direktori-tendik"
          kategoriLabel="Tenaga Kependidikan"
        />
      </PageTemplate>
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
