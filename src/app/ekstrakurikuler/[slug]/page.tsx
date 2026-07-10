import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { EkskulDetail } from "@/features/ekskul/components/ekskul-detail";
import { getEkstrakurikulerBySlug } from "@/features/ekskul/api/get-ekskul";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/json-ld";

type EkskulDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: EkskulDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getEkstrakurikulerBySlug(slug).catch(() => null);

  if (!item) {
    return {
      title: "Ekstrakurikuler Tidak Ditemukan",
      description: "Ekstrakurikuler yang Anda cari tidak ditemukan.",
    };
  }

  return {
    title: item.title,
    description: item.shortDescription,
    alternates: { canonical: `/ekstrakurikuler/${slug}` },
    openGraph: {
      title: item.title,
      description: item.shortDescription,
      url: `/ekstrakurikuler/${slug}`,
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

  const breadcrumbs = [
    { label: "Beranda", href: "/" },
    { label: "Ekstrakurikuler", href: "/ekstrakurikuler" },
    { label: item.title },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        eyebrow="Ekstrakurikuler"
        title={item.title}
        description={item.shortDescription}
        variant="glass"
        backgroundImage={item.imageUrl}
        breadcrumbs={breadcrumbs}
      >
        <EkskulDetail item={item} />
      </PageTemplate>
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
