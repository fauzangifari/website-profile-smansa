import type { Metadata } from "next";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { VisionMissionContent } from "@/features/vision-mission/components/vision-mission-content";

export const metadata: Metadata = {
  title: "Visi & Misi SMA Negeri 1 Samarinda",
  description:
    "Visi dan misi SMA Negeri 1 Samarinda sebagai arah pengembangan karakter, pembelajaran, teknologi, lingkungan, dan kesiapan masa depan.",
};

export default function VisiMisiPage() {
  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        eyebrow="Visi & Misi"
        title="Visi & Misi SMA Negeri 1 Samarinda"
        description="Visi dan misi SMA Negeri 1 Samarinda dirancang sebagai fondasi sekolah unggul yang berkarakter, adaptif, berwawasan digital, demokratis, dan peduli lingkungan."
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Visi & Misi" },
        ]}
      >
        <VisionMissionContent />
      </PageTemplate>
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
