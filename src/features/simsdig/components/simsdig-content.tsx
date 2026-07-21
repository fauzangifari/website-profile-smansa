"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Monitor,
  AndroidLogo,
  AppleLogo,
  GooglePlayLogo,
  AppStoreLogo,
  ArrowsClockwise,
  UserCircle,
  Devices,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

const highlights = [
  {
    icon: ArrowsClockwise,
    label: "Data Real-time",
    desc: "Setiap perubahan tersinkron otomatis di seluruh perangkat.",
  },
  {
    icon: UserCircle,
    label: "Satu Akun Terpadu",
    desc: "Login sekali untuk web maupun aplikasi mobile.",
  },
  {
    icon: Devices,
    label: "Akses Lintas Perangkat",
    desc: "Gunakan dari komputer, Android, maupun iOS.",
  },
];

// TODO: ganti href "#" dengan URL final saat aplikasi Android dirilis.
const platforms = [
  {
    icon: Monitor,
    name: "Dashboard Web",
    description:
      "Kelola data dan pantau aktivitas sekolah langsung dari peramban, tanpa perlu instalasi.",
    cta: "Buka Dashboard",
    ctaIcon: ArrowUpRight,
    href: "https://sims.sman1samarinda.sch.id",
  },
  {
    icon: AndroidLogo,
    name: "Aplikasi Android",
    description:
      "Bawa SIMSDIG di genggaman melalui aplikasi Android yang ringan dan responsif.",
    cta: "Unduh di Play Store",
    ctaIcon: GooglePlayLogo,
    href: "#",
  },
  {
    icon: AppleLogo,
    name: "Aplikasi iOS",
    description:
      "Nikmati pengalaman terpadu yang sama di iPhone maupun iPad dengan aplikasi iOS.",
    cta: "Unduh di App Store",
    ctaIcon: AppStoreLogo,
    href: "https://apps.apple.com/us/app/simsdig/id6761016391",
  },
];

export function SimsdigContent() {
  const introRef = useScrollReveal();
  const highlightsRef = useScrollReveal({ stagger: true });
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal({ stagger: true });
  const ctaRef = useScrollReveal();

  return (
    <div className="font-sans space-y-16 md:space-y-24">
      {/* 1. Intro / overview */}
      <section ref={introRef} className="scroll-reveal">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col gap-5">
            <Badge variant="primary" className="w-fit">
              Satu Ekosistem Digital
            </Badge>
            <h2 className="text-2xl font-extrabold leading-tight text-neutral-900 md:text-3xl">
              Satu Ekosistem Sekolah, Tiga Platform Terintegrasi
            </h2>
            <p className="text-sm leading-7 text-neutral-600 md:text-base md:leading-8">
              SIMSDIG (Sistem Informasi Manajemen Sekolah Digital) adalah platform
              terpadu SMA Negeri 1 Samarinda untuk mengelola kegiatan sekolah secara
              digital. Diakses melalui dashboard web, aplikasi Android, dan iOS —
              ketiganya berbagi satu data yang saling terhubung, sehingga informasi
              selalu selaras di mana pun Anda membukanya.
            </p>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-white/60 shadow-lg shadow-neutral-900/10">
            <Image
              src="/images/hero/ilustrasi-teknologi.jpg"
              alt="Ilustrasi teknologi digital SIMSDIG"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Highlight integrasi */}
        <div
          ref={highlightsRef}
          className="scroll-reveal-stagger mt-10 grid gap-4 sm:grid-cols-3"
        >
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="scroll-reveal glass-soft flex items-start gap-3 rounded-lg p-4"
                style={{ "--stagger-index": index } as React.CSSProperties}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary-soft text-brand-primary">
                  <Icon size={20} weight="duotone" />
                </span>
                <div>
                  <p className="text-sm font-bold text-neutral-900">{item.label}</p>
                  <p className="mt-0.5 text-xs leading-5 text-neutral-600">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Showcase platform */}
      <section>
        <div ref={headerRef} className="scroll-reveal">
          <SectionHeader
            eyebrow="Multi-Platform"
            title="Pilih Platform Anda"
            description="Akses SIMSDIG dari perangkat mana pun — ketiga platform terhubung ke sistem yang sama."
            align="center"
            className="mb-12"
          />
        </div>

        <div
          ref={gridRef}
          className="scroll-reveal-stagger grid gap-6 md:grid-cols-3"
        >
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            const CtaIcon = platform.ctaIcon;
            const isExternal = platform.href.startsWith("http");

            return (
              <div
                key={platform.name}
                className="scroll-reveal group glass-soft relative flex flex-col items-center rounded-lg p-8 text-center transition-[background-color,box-shadow,transform] duration-500 hover:-translate-y-2 hover:bg-white/80 hover:shadow-xl hover:shadow-brand-primary/10"
                style={{ "--stagger-index": index } as React.CSSProperties}
              >
                <div className="relative mb-6 flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200/50 transition-transform duration-500 group-hover:scale-110 group-hover:ring-brand-primary/20">
                  <Icon
                    size={32}
                    weight="duotone"
                    className="text-brand-primary"
                  />
                </div>

                <h3 className="mb-3 text-lg font-bold text-neutral-900 md:text-xl">
                  {platform.name}
                </h3>

                <p className="mb-6 text-sm leading-relaxed text-neutral-600">
                  {platform.description}
                </p>

                <Link
                  href={platform.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="mt-auto inline-flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-primary/25 transition-colors hover:bg-brand-primary-hover"
                >
                  <CtaIcon size={18} weight="fill" />
                  {platform.cta}
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. CTA unduh */}
      <section ref={ctaRef} className="scroll-reveal">
        <Card
          variant="glass"
          className="flex flex-col items-center gap-6 px-6 py-10 text-center md:px-12 md:py-14"
        >
          <Badge variant="primary">Mulai Sekarang</Badge>

          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-extrabold leading-tight text-neutral-900 md:text-2xl">
              Mulai Gunakan SIMSDIG
            </h2>
            <p className="mx-auto max-w-xl text-sm leading-7 text-neutral-600 md:text-base md:leading-8">
              Buka dashboard web sekarang, atau unduh aplikasi mobile untuk
              mengakses SIMSDIG di mana saja.
            </p>
          </div>

          <div className="flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row">
            {platforms.map((platform, index) => {
              const CtaIcon = platform.ctaIcon;
              const isPrimary = index === 0;
              const isExternal = platform.href.startsWith("http");

              return (
                <Link
                  key={platform.name}
                  href={platform.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-colors",
                    isPrimary
                      ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/25 hover:bg-brand-primary-hover"
                      : "border border-neutral-300 bg-white text-neutral-900 hover:border-brand-primary/50 hover:bg-brand-primary-soft",
                  )}
                >
                  <CtaIcon size={18} weight="fill" />
                  {platform.cta}
                </Link>
              );
            })}
          </div>

          <p className="text-xs text-neutral-500">
            Aplikasi iOS sudah tersedia di App Store. Aplikasi Android segera hadir di
            Google Play.
          </p>
        </Card>
      </section>
    </div>
  );
}
