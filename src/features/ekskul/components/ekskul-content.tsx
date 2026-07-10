"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Sparkle,
  Trophy,
  Heart,
  ArrowRight,
  Confetti,
  Warning,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";
import type { ExtracurricularListItem } from "@/features/ekskul/types/ekskul-detail";

type EkskulContentProps = {
  items: ExtracurricularListItem[];
  error?: string | null;
};

export function EkskulContent({ items, error }: EkskulContentProps) {
  const heroRef = useScrollReveal();
  const gridRef = useScrollReveal({ stagger: true });
  const ctaRef = useScrollReveal();

  return (
    <div className="flex flex-col gap-20 font-sans">
      {/* ── 1. Hero Stats Banner ─────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="scroll-reveal relative overflow-hidden rounded-lg border border-brand-primary/10 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 p-8 md:p-14"
      >
        {/* Background blobs */}
        <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand-primary/6 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 size-56 rounded-full bg-brand-secondary/6 blur-3xl" />

        <div className="relative flex flex-col items-center gap-8 text-center">
          {/* Icon + eyebrow */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-brand-primary-soft text-brand-primary">
              <Sparkle size={30} weight="duotone" />
            </div>
            <Badge
              variant="primary"
              className="px-5 py-1.5 text-xs font-bold uppercase tracking-[0.2em]"
            >
              Ekstrakurikuler SMANSA
            </Badge>
          </div>

          {/* Heading */}
          <div className="max-w-3xl space-y-4">
            <h2 className="text-3xl font-extrabold leading-tight text-neutral-900 md:text-4xl lg:text-5xl">
              Kembangkan Diri,{" "}
              <span className="text-brand-primary">Lampaui Batas.</span>
            </h2>
            <p className="text-base leading-8 text-neutral-600 md:text-lg">
              SMAN 1 Samarinda menyediakan beragam program ekstrakurikuler
              akademik maupun non-akademik untuk membentuk siswa yang unggul,
              berkarakter, dan berprestasi.
            </p>
          </div>

          {/* Stat */}
          {items.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <div className="flex items-center gap-3 rounded-lg border border-neutral-100 bg-white px-5 py-3 shadow-sm">
                <div className="flex size-9 items-center justify-center rounded-xl bg-brand-primary-soft text-brand-primary">
                  <Trophy size={18} weight="duotone" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-extrabold leading-none text-neutral-900">
                    {items.length}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-neutral-500">
                    Program Ekstrakurikuler
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* ── 2. Grid Ekskul ───────────────────────────────────────────────── */}
      <section className="flex flex-col gap-8">
        {error ? (
          <EkskulEmptyState
            icon={<Warning size={28} weight="duotone" />}
            title="Gagal memuat ekstrakurikuler"
            description={error}
          />
        ) : items.length === 0 ? (
          <EkskulEmptyState
            icon={<Confetti size={28} weight="duotone" />}
            title="Belum ada ekstrakurikuler"
            description="Data ekstrakurikuler belum tersedia. Silakan cek kembali nanti."
          />
        ) : (
          <div
            ref={gridRef}
            className="scroll-reveal-stagger grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((item, i) => (
              <EkskulCard
                key={item.id}
                item={item}
                className="scroll-reveal"
                style={{ "--stagger-index": i } as React.CSSProperties}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── 3. CTA Footer ────────────────────────────────────────────────── */}
      <section ref={ctaRef} className="scroll-reveal pb-8">
        <Card
          variant="glass"
          className="relative overflow-hidden border-brand-primary/15 bg-brand-primary/[0.02] p-8 md:p-14"
        >
          <div className="pointer-events-none absolute -bottom-20 -right-20 size-80 rounded-full bg-brand-primary/6 blur-3xl" />
          <div className="relative flex flex-col items-center gap-6 text-center">
            <Badge
              variant="primary"
              className="px-5 py-1.5 text-xs font-bold uppercase tracking-[0.15em]"
            >
              Bergabung Sekarang
            </Badge>
            <h3 className="max-w-2xl text-2xl font-extrabold text-neutral-900 md:text-3xl">
              Siap Menemukan Bakat Terbaikmu di SMANSA?
            </h3>
            <p className="max-w-xl leading-relaxed text-neutral-600">
              Setiap semester, pendaftaran ekskul dibuka untuk semua siswa.
              Temukan komunitas yang tepat dan kembangkan potensi dirimu bersama
              kami.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <div className="flex items-center gap-2 rounded-full border border-neutral-100 bg-white px-4 py-2 shadow-sm">
                <Sparkle size={14} className="text-brand-secondary" weight="fill" />
                <span className="text-xs font-bold text-neutral-700">
                  OSN &amp; KSN Preparation
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-neutral-100 bg-white px-4 py-2 shadow-sm">
                <Trophy size={14} className="text-amber-400" weight="fill" />
                <span className="text-xs font-bold text-neutral-700">
                  Kompetisi Nasional
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-neutral-100 bg-white px-4 py-2 shadow-sm">
                <Heart size={14} className="text-rose-400" weight="fill" />
                <span className="text-xs font-bold text-neutral-700">
                  Pengembangan Karakter
                </span>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────

function EkskulCard({
  item,
  className,
  style,
}: {
  item: ExtracurricularListItem;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Link
      href={`/ekstrakurikuler/${item.slug}`}
      className={cn("block h-full", className)}
      style={style}
    >
      <Card
        variant="glass-soft"
        className="group flex h-full flex-col overflow-hidden border border-transparent p-0 transition-all duration-200 hover:border-brand-primary/20 hover:shadow-lg hover:shadow-brand-primary/8"
      >
        {/* Cover */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-gradient-to-br from-brand-primary-soft via-blue-50 to-indigo-50 text-brand-primary/40">
              <Sparkle size={40} weight="duotone" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-2 p-6">
          <h3 className="font-extrabold leading-snug text-neutral-900 transition-colors group-hover:text-brand-primary">
            {item.title}
          </h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-neutral-500">
            {item.shortDescription}
          </p>
          <div className="mt-auto flex items-center gap-1.5 pt-3 text-[11px] font-bold uppercase tracking-wider text-brand-primary opacity-0 transition-all duration-200 group-hover:opacity-100">
            <span>Pelajari</span>
            <ArrowRight size={13} weight="bold" />
          </div>
        </div>
      </Card>
    </Link>
  );
}

function EkskulEmptyState({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-neutral-200 bg-white/40 px-6 py-16 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-brand-primary-soft text-brand-primary">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
      <p className="max-w-md text-sm text-neutral-500">{description}</p>
    </div>
  );
}
