import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems, siteConfig } from "@/config/site";
import { HeroSection } from "@/features/landing/components/hero-section";
import { StatsSection } from "@/features/landing/components/stats-section";
import { ReasonsSection } from "@/features/landing/components/reasons-section";
import { getAchievements } from "@/features/prestasi/api/get-achievements";
import { getBeritaList } from "@/features/berita/api/get-berita";
import type { Achievement } from "@/features/prestasi/types/achievement";
import type { BeritaListItem } from "@/features/berita/types/berita";
import {
  JsonLd,
  organizationSchema,
  webSiteSchema,
} from "@/lib/seo/json-ld";

export const metadata: Metadata = {
  description:
    "Website resmi SMA Negeri 1 Samarinda (SMANSA) — pusat informasi profil sekolah, berita, prestasi siswa, ekstrakurikuler, fasilitas, alumni, dan SPMB.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.shortName}`,
    description:
      "Website resmi SMA Negeri 1 Samarinda — informasi profil, berita, prestasi, ekstrakurikuler, alumni, dan SPMB.",
    url: siteConfig.url,
    type: "website",
  },
};

// Lazy-load below-fold sections to reduce initial JS bundle
const AboutSection = dynamic(() =>
  import("@/features/landing/components/about-section").then((mod) => mod.AboutSection)
);
const LeadershipSection = dynamic(() =>
  import("@/features/landing/components/leadership-section").then((mod) => mod.LeadershipSection)
);
const NewsSection = dynamic(() =>
  import("@/features/landing/components/news-section").then((mod) => mod.NewsSection)
);
const AlumniSection = dynamic(() =>
  import("@/features/landing/components/alumni-section").then((mod) => mod.AlumniSection)
);
const ContactLocationSection = dynamic(() =>
  import("@/features/landing/components/contact-location-section").then((mod) => mod.ContactLocationSection)
);
const CtaSpmbSection = dynamic(() =>
  import("@/features/landing/components/cta-spmb-section").then((mod) => mod.CtaSpmbSection)
);
const FloatingAudioPlayer = dynamic(() =>
  import("@/features/landing/components/floating-audio-player").then((mod) => mod.FloatingAudioPlayer)
);

export default async function Home() {
  // Ambil data di server agar berita & prestasi terbaru ikut ter-render di HTML
  // (terlihat oleh crawler). Kegagalan API tidak boleh menggagalkan homepage.
  let achievements: Achievement[] = [];
  let berita: BeritaListItem[] = [];

  try {
    achievements = await getAchievements();
  } catch (err) {
    console.error("Homepage: gagal mengambil prestasi:", err);
  }

  try {
    berita = await getBeritaList({ limit: 12 });
  } catch (err) {
    console.error("Homepage: gagal mengambil berita:", err);
  }

  return (
    <main
      className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eff6ff_34%,#ffffff_100%)]"
    >
      <JsonLd data={organizationSchema()} />
      <JsonLd data={webSiteSchema()} />
      <AppNavbar items={mainNavItems} />
      <HeroSection />
      <StatsSection />
      <ReasonsSection />
      <AboutSection />
      <LeadershipSection />
      <NewsSection achievements={achievements} berita={berita} />
      <AlumniSection />
      <ContactLocationSection />
      <CtaSpmbSection />
      <SiteFooter />
      <FloatingAudioPlayer />
    </main>
  );
}
