import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  ClockCounterClockwiseIcon,
  CompassIcon,
  GraduationCapIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { mainNavItems } from "@/config/site";
import { ProfileHeritage } from "@/features/profile/components/profile-heritage";
import { ProfileImageGallery } from "@/features/profile/components/profile-image-gallery";
import { ProfileVideoSection } from "@/features/profile/components/profile-video-section";
import type { ProfileSummaryCard } from "@/features/profile/data/profile-data";
import {
  profileImages,
  profileParagraphs,
  profileStats,
  profileSummaryCards,
} from "@/features/profile/data/profile-data";

export const metadata: Metadata = {
  title: "Profil",
  alternates: { canonical: "/profil" },
  description:
    "Profil SMA Negeri 1 Samarinda sebagai sekolah yang berkomitmen menyediakan pendidikan berkualitas bagi semua siswa.",
};

const summaryIcons: Record<
  ProfileSummaryCard["iconName"],
  typeof ArrowRightIcon
> = {
  sejarah: ClockCounterClockwiseIcon,
  "visi-misi": CompassIcon,
  struktur: UsersThreeIcon,
  alumni: GraduationCapIcon,
};

export default function ProfilPage() {
  const currentYear = new Date().getFullYear();
  const yearsSince1953 = currentYear - 1953;

  const heritageFigures = [
    {
      value: `${yearsSince1953}+`,
      label: "Tahun",
      range: `1953–${currentYear}`,
      description: "Perjalanan pendidikan tanpa henti sejak berdiri pada 1953.",
    },
    ...profileStats,
  ];

  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        contentSurface="bare"
        eyebrow="Profil Sekolah · Sejak 1953"
        title="Profil SMA Negeri 1 Samarinda"
        description="SMA Negeri 1 Samarinda mendorong fokus kami pada pendidikan berkualitas untuk semua dan layanan kepada siswa kami yang membutuhkan."
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil" },
        ]}
      >
        <div className="grid gap-16">
          <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,1.1fr)] lg:items-start">
            <div className="min-w-0 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm shadow-neutral-900/5 md:p-8">
              <Badge variant="primary">Tentang SMANSA</Badge>
              <h2 className="mt-4 max-w-3xl text-2xl font-bold leading-tight text-neutral-900 md:text-3xl">
                Pendidikan berkualitas di jantung Kota Samarinda.
              </h2>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Samarinda · Kalimantan Timur · Sejak 1953
              </p>
              <div className="mt-6 grid max-w-3xl gap-5 text-base leading-8 text-neutral-700">
                {profileParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <ProfileImageGallery images={profileImages} />
          </section>

          <ProfileHeritage
            heading="Lebih dari tujuh dekade menempa generasi Samarinda."
            figures={heritageFigures}
          />

          <section aria-label="Jelajahi profil sekolah lebih lanjut">
            <Reveal>
              <h2 className="mt-4 max-w-2xl text-2xl font-extrabold leading-tight text-neutral-900 md:text-3xl">
                Kenali SMA Negeri 1 Samarinda lebih dekat.
              </h2>
            </Reveal>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {profileSummaryCards.map((item, index) => {
                const Icon = summaryIcons[item.iconName];

                return (
                  <Reveal
                    key={item.href}
                    className="h-full"
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    <Link
                      href={item.href}
                      className="group flex h-full flex-col rounded-lg border border-neutral-200 bg-white p-6 shadow-sm shadow-neutral-900/5 transition duration-200 hover:-translate-y-1 hover:border-brand-primary/30 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                    >
                      <div className="flex items-center justify-between">
                        <span className="grid size-11 place-items-center rounded-lg bg-brand-primary-soft/50 text-brand-primary transition-colors duration-200 group-hover:bg-brand-primary group-hover:text-white">
                          <Icon size={22} weight="duotone" />
                        </span>
                        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                          {item.label}
                        </span>
                      </div>
                      <h3 className="mt-5 text-lg font-extrabold leading-snug text-neutral-900">
                        {item.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-6 text-neutral-600">
                        {item.description}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary">
                        {item.cta}
                        <ArrowRightIcon
                          size={16}
                          weight="bold"
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </section>
        </div>
      </PageTemplate>
      <ProfileVideoSection youtubeVideoId="MSMoXCRDlUI" />
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
