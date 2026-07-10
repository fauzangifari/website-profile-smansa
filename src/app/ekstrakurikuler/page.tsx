import type { Metadata } from "next";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { EkskulContent } from "@/features/ekskul/components/ekskul-content";
import { getEkstrakurikulerList } from "@/features/ekskul/api/get-ekskul";
import type { ExtracurricularListItem } from "@/features/ekskul/types/ekskul-detail";

export const metadata: Metadata = {
  title: "Ekstrakurikuler — SMA Negeri 1 Samarinda",
  description:
    "Jelajahi seluruh program ekstrakurikuler SMAN 1 Samarinda. Temukan club sains, olahraga, seni budaya, teknologi, dan keagamaan yang tepat untukmu.",
};

export default async function EkskulPage() {
  let items: ExtracurricularListItem[] = [];
  let error: string | null = null;

  try {
    items = await getEkstrakurikulerList();
  } catch (err) {
    console.error("Gagal mengambil data ekstrakurikuler di server:", err);
    error =
      err instanceof Error ? err.message : "Gagal memuat data ekstrakurikuler.";
  }

  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        eyebrow="Ekstrakurikuler"
        title="Kembangkan Diri di SMANSA"
        description="Program pengembangan bakat akademik dan non-akademik untuk membentuk siswa yang unggul, berkarakter, dan siap berprestasi di berbagai bidang."
        variant="glass"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Ekstrakurikuler" },
        ]}
      >
        <EkskulContent items={items} error={error} />
      </PageTemplate>
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
