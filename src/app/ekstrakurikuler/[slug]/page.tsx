import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { EkskulDetail } from "@/features/ekskul/components/ekskul-detail";
import { ekskulDetails } from "@/features/ekskul/data/ekskul-detail-data";
import { getEkskulBySlug } from "@/features/ekskul/utils/ekskul-helpers";

type EkskulDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return ekskulDetails.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: EkskulDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getEkskulBySlug(slug);

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
      images: [{ url: item.coverImage }],
      type: "article",
    },
  };
}

export default async function EkskulDetailPage({
  params,
}: EkskulDetailPageProps) {
  const { slug } = await params;
  const item = getEkskulBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        eyebrow={item.categoryLabel}
        title={item.title}
        description={item.shortDescription}
        variant="glass"
        backgroundImage={item.coverImage}
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
