import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { BeritaDetail } from "@/features/berita/components/berita-detail";
import { getBeritaBySlug, getBeritaList } from "@/features/berita/api/get-berita";
import { getRelatedBerita } from "@/features/berita/utils/berita-helpers";
import type { BeritaListItem } from "@/features/berita/types/berita";

type BeritaDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: BeritaDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getBeritaBySlug(slug).catch(() => null);

  if (!item) {
    return {
      title: "Berita Tidak Ditemukan — SMA Negeri 1 Samarinda",
      description: "Berita yang Anda cari tidak ditemukan.",
    };
  }

  return {
    title: `${item.title} — SMA Negeri 1 Samarinda`,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      images: [{ url: item.coverImageUrl }],
      type: "article",
      publishedTime: item.publishedAt,
    },
  };
}

export default async function BeritaDetailPage({
  params,
}: BeritaDetailPageProps) {
  const { slug } = await params;

  const item = await getBeritaBySlug(slug);

  if (!item) {
    notFound();
  }

  // Berita terkait — gagal fetch tidak boleh menggagalkan halaman.
  let list: BeritaListItem[] = [];
  try {
    list = await getBeritaList({ limit: 6 });
  } catch (err) {
    console.error("Gagal mengambil berita terkait:", err);
  }
  const related = getRelatedBerita(list, slug, 3);

  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        eyebrow={item.category.name}
        title={item.title}
        description={item.excerpt}
        variant="glass"
        backgroundImage={item.coverImageUrl}
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Berita", href: "/berita" },
          { label: item.title },
        ]}
      >
        <BeritaDetail item={item} related={related} />
      </PageTemplate>
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
