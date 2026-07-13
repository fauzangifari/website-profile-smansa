import type { Metadata } from "next";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { getDirektoriList } from "@/features/direktori/api/get-direktori";
import { DirektoriContent } from "@/features/direktori/components/direktori-content";

export const metadata: Metadata = {
  title: "Direktori Guru",
  alternates: { canonical: "/direktori-guru" },
  description:
    "Direktori guru SMA Negeri 1 Samarinda. Telusuri daftar guru beserta informasi kontaknya.",
};

export default async function DirektoriGuruPage() {
  const people = await getDirektoriList("guru");

  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        variant="glass"
        eyebrow="Profil Sekolah"
        title="Direktori Guru"
        description="Telusuri daftar guru SMA Negeri 1 Samarinda. Klik salah satu kartu untuk melihat detail NIP dan email sekolah."
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Direktori Guru" },
        ]}
      >
        <DirektoriContent
          people={people}
          basePath="/direktori-guru"
          kategoriLabel="Guru"
        />
      </PageTemplate>
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
