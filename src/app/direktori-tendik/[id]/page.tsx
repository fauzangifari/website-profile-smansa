import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { getPersonById } from "@/features/direktori/api/get-direktori";
import { DirektoriDetail } from "@/features/direktori/components/direktori-detail";

type DirektoriTendikDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: DirektoriTendikDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const person = await getPersonById("tendik", id).catch(() => null);

  if (!person) {
    return {
      title: "Tenaga Kependidikan Tidak Ditemukan",
      description: "Data tenaga kependidikan yang Anda cari tidak ditemukan.",
    };
  }

  return {
    title: person.name,
    description: `${person.name} — Tenaga Kependidikan SMA Negeri 1 Samarinda.`,
    alternates: { canonical: `/direktori-tendik/${id}` },
  };
}

export default async function DirektoriTendikDetailPage({
  params,
}: DirektoriTendikDetailPageProps) {
  const { id } = await params;
  const person = await getPersonById("tendik", id);

  if (!person) {
    notFound();
  }

  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        variant="glass"
        eyebrow="Direktori Tenaga Kependidikan"
        title={person.name}
        description="Tenaga Kependidikan SMA Negeri 1 Samarinda"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Direktori Tendik", href: "/direktori-tendik" },
          { label: person.name },
        ]}
      >
        <DirektoriDetail
          person={person}
          basePath="/direktori-tendik"
          kategoriLabel="Tenaga Kependidikan"
        />
      </PageTemplate>
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
