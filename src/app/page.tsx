import dynamic from "next/dynamic";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { mainNavItems } from "@/config/site";
import { HeroSection } from "@/features/landing/components/hero-section";
import { StatsSection } from "@/features/landing/components/stats-section";
import { ReasonsSection } from "@/features/landing/components/reasons-section";

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

export default function Home() {
  return (
    <main
      className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eff6ff_34%,#ffffff_100%)]"
    >
      <AppNavbar items={mainNavItems} />
      <HeroSection />
      <StatsSection />
      <ReasonsSection />
      <AboutSection />
      <LeadershipSection />
      <NewsSection />
      <AlumniSection />
      <ContactLocationSection />
      <CtaSpmbSection />
      <SiteFooter />
      <FloatingAudioPlayer />
    </main>
  );
}
