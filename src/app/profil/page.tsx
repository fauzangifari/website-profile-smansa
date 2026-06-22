import type { Metadata } from "next";
import Link from "next/link";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { mainNavItems } from "@/config/site";
import { ProfileImageGallery } from "@/features/profile/components/profile-image-gallery";
import { ProfileVideoSection } from "@/features/profile/components/profile-video-section";
import {
  profileImages,
  profileParagraphs,
  profileStats,
  profileSummaryCards,
} from "@/features/profile/data/profile-data";

export const metadata: Metadata = {
  title: "Profil SMA Negeri 1 Samarinda",
  description:
    "Profil SMA Negeri 1 Samarinda sebagai sekolah yang berkomitmen menyediakan pendidikan berkualitas bagi semua siswa.",
};

export default function ProfilPage() {
  const currentYear = new Date().getFullYear();
  const yearsSince1953 = currentYear - 1953;

  const allStats = [
    ...profileStats,
    {
      value: `${yearsSince1953}+`,
      label: "Tahun",
      description: "Perjalanan sejarah and pengabdian pendidikan sejak 1953.",
    },
  ];

  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        eyebrow="Profil Sekolah"
        title="Profil SMA Negeri 1 Samarinda"
        description="SMA Negeri 1 Samarinda mendorong fokus kami pada pendidikan berkualitas untuk semua dan layanan kepada siswa kami yang membutuhkan."
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil" },
        ]}
      >
        <div className="grid gap-12">
          <section className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(22rem,1.1fr)] lg:items-start">
            <div className="min-w-0">
              <Badge variant="primary">Tentang SMANSA</Badge>
              <h2 className="mt-4 max-w-3xl text-2xl font-bold leading-tight text-neutral-900 md:text-3xl">
                Pendidikan berkualitas di jantung Kota Samarinda.
              </h2>
              <div className="mt-5 grid max-w-3xl gap-5 text-base leading-8 text-neutral-700">
                {profileParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <ProfileImageGallery images={profileImages} />
          </section>

          <section
            className="grid gap-4 md:grid-cols-3"
            aria-label="Statistik profil sekolah"
          >
            {allStats.map((item) => (
              <Card
                key={item.label}
                variant="glass-soft"
                className="relative overflow-hidden border-brand-primary/10 bg-brand-primary-soft/35 p-6"
              >
                <div className="absolute -right-10 -top-10 size-28 rounded-full bg-white/55" />
                <p className="relative text-4xl font-extrabold leading-none text-brand-primary md:text-5xl">
                  {item.value}
                </p>
                <h3 className="relative mt-3 text-sm font-bold uppercase tracking-[0.16em] text-neutral-900">
                  {item.label}
                </h3>
                <p className="relative mt-3 text-sm leading-6 text-neutral-700">
                  {item.description}
                </p>
              </Card>
            ))}
          </section>

          <section className="grid gap-5 lg:grid-cols-2">
            {profileSummaryCards.map((item) => (
              <Card
                key={item.label}
                className="flex h-full flex-col border-brand-primary/10 p-6 hover:-translate-y-1 hover:shadow-md"
              >
                <Badge variant="glass" className="w-fit">
                  {item.label}
                </Badge>
                <h2 className="mt-4 text-2xl font-extrabold leading-tight text-neutral-900">
                  {item.title}
                </h2>
                <p className="mt-4 flex-1 text-sm leading-7 text-neutral-700">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="mt-6 inline-flex h-11 w-fit items-center justify-center rounded-md bg-brand-primary px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                >
                  {item.cta}
                </Link>
              </Card>
            ))}
          </section>
        </div>
      </PageTemplate>
      <ProfileVideoSection youtubeVideoId="5rG4nK2tU9A" />
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
