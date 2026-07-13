import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { getPersonById } from "@/features/direktori/api/get-direktori";
import { DirektoriDetail } from "@/features/direktori/components/direktori-detail";

type DirektoriGuruDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: DirektoriGuruDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const person = await getPersonById("guru", id).catch(() => null);

  if (!person) {
    return {
      title: "Guru Tidak Ditemukan",
      description: "Data guru yang Anda cari tidak ditemukan.",
    };
  }

  return {
    title: person.name,
    description: `${person.name} — Guru SMA Negeri 1 Samarinda.`,
    alternates: { canonical: `/direktori-guru/${id}` },
  };
}

export default async function DirektoriGuruDetailPage({
  params,
}: DirektoriGuruDetailPageProps) {
  const { id } = await params;
  const person = await getPersonById("guru", id);

  if (!person) {
    notFound();
  }

  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        variant="glass"
        eyebrow="Direktori Guru"
        title={person.name}
        description="Guru SMA Negeri 1 Samarinda"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Direktori Guru", href: "/direktori-guru" },
          { label: person.name },
        ]}
      >
        <DirektoriDetail
          person={person}
          basePath="/direktori-guru"
          kategoriLabel="Guru"
        />
      </PageTemplate>
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
