import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { EkskulDetail } from "@/features/ekskul/components/ekskul-detail";
import { getEkstrakurikulerBySlug } from "@/features/ekskul/api/get-ekskul";

type EkskulDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: EkskulDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getEkstrakurikulerBySlug(slug);

  if (!item) {
    return {
      title: "Ekstrakurikuler Tidak Ditemukan — SMA Negeri 1 Samarinda",
      description: "Ekstrakurikuler yang Anda cari tidak ditemukan.",
    };
  }

  return {
    title: `${item.title} — SMA Negeri 1 Samarinda`,
    description: item.shortDescription,
    openGraph: {
      title: item.title,
      description: item.shortDescription,
      images: item.imageUrl ? [{ url: item.imageUrl }] : undefined,
      type: "article",
    },
  };
}

export default async function EkskulDetailPage({
  params,
}: EkskulDetailPageProps) {
  const { slug } = await params;
  const item = await getEkstrakurikulerBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        eyebrow="Ekstrakurikuler"
        title={item.title}
        description={item.shortDescription}
        variant="glass"
        backgroundImage={item.imageUrl}
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Ekstrakurikuler", href: "/ekstrakurikuler" },
          { label: item.title },
        ]}
      >
        <EkskulDetail item={item} />
      </PageTemplate>
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
