"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  BookOpen,
  Trophy,
  ArrowRight,
  Sparkle,
  Globe,
  Flask,
  PresentationChart,
  Brain,
  Users,
  Heart,
  Cpu,
  Palette,
  Star,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";
import {
  akademikClubs,
  akademikBenefits,
} from "@/features/akademik/data/akademik-data";
import {
  NON_AKADEMIK_CATEGORIES,
} from "@/features/non-akademik/data/non-akademik-data";

// ── Icon maps ──────────────────────────────────────────────────────────────
const akademikIconMap: Record<string, React.ComponentType<{ size?: number; weight?: "regular" | "bold" | "fill" | "duotone" | "thin" | "light"; className?: string }>> = {
  ekonomi: PresentationChart,
  kebumian: Globe,
  kimia: Flask,
  "debat-indonesia": Brain,
};

const benefitIconMap: Record<string, React.ComponentType<{ size?: number; weight?: "regular" | "bold" | "fill" | "duotone" | "thin" | "light"; className?: string }>> = {
  Target: Star,
  GraduationCap: BookOpen,
  Users: Users,
};

// ── Stats ──────────────────────────────────────────────────────────────────
const totalAkademik = akademikClubs.length;
const totalNonAkademik = NON_AKADEMIK_CATEGORIES.reduce(
  (acc, cat) => acc + cat.activities.length,
  0
);
const totalKategoriNonAkademik = NON_AKADEMIK_CATEGORIES.length;

// ── Tab definition ─────────────────────────────────────────────────────────
type TabKey = "semua" | "akademik" | "non-akademik";

const TABS: { key: TabKey; label: string; icon: React.ComponentType<{ size?: number; weight?: "regular" | "bold" | "fill" | "duotone" | "thin" | "light" }> }[] = [
  { key: "semua", label: "Semua", icon: Sparkle },
  { key: "akademik", label: "Akademik", icon: BookOpen },
  { key: "non-akademik", label: "Non-Akademik", icon: Trophy },
];

export function EkskulContent() {
  const [activeTab, setActiveTab] = useState<TabKey>("semua");
  const heroRef = useScrollReveal();
  const akademikGridRef = useScrollReveal({ stagger: true });
  const nonAkademikRef = useScrollReveal({ stagger: true });
  const ctaRef = useScrollReveal();

  const handleTabChange = useCallback((key: TabKey) => {
    setActiveTab(key);
    // Smooth scroll to the relevant section
    if (key === "akademik") {
      document.getElementById("section-akademik")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (key === "non-akademik") {
      document.getElementById("section-non-akademik")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

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
            <Badge variant="primary" className="px-5 py-1.5 text-xs font-bold uppercase tracking-[0.2em]">
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
              SMAN 1 Samarinda menyediakan beragam program ekstrakurikuler akademik
              maupun non-akademik untuk membentuk siswa yang unggul, berkarakter,
              dan berprestasi.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <StatPill value={totalAkademik} label="Club Akademik" icon={BookOpen} color="brand-primary" />
            <StatPill value={totalNonAkademik} label="Ekskul Non-Akademik" icon={Trophy} color="brand-secondary" />
            <StatPill value={totalKategoriNonAkademik} label="Kategori" icon={Palette} color="brand-accent" />
          </div>
        </div>
      </section>

      {/* ── 2. Sticky Tab Filter ─────────────────────────────────────────── */}
      <div className="sticky top-[72px] z-20 flex justify-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white/90 px-2 py-2 shadow-md shadow-neutral-900/5 backdrop-blur-xl">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => handleTabChange(key)}
              className={cn(
                "relative flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200",
                activeTab === key
                  ? "bg-brand-primary text-white shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900"
              )}
            >
              <Icon size={15} weight={activeTab === key ? "fill" : "regular"} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── 3. Ekskul Akademik ───────────────────────────────────────────── */}
      <section
        id="section-akademik"
        className={cn(
          "flex flex-col gap-12 scroll-mt-40 transition-opacity duration-300",
          activeTab === "non-akademik" ? "opacity-40 pointer-events-none" : "opacity-100"
        )}
      >
        {/* Section header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Akademik"
            title="Club & Kompetisi Sains"
            description="Wadah pengembangan bakat intelektual melalui program pengayaan intensif untuk siswa berprestasi di bidang sains dan debat."
          />
          {/* Benefits strip */}
          <div className="hidden lg:flex items-center gap-6">
            {akademikBenefits.map((benefit, i) => {
              const Icon = benefitIconMap[benefit.icon] ?? Star;
              return (
                <div key={i} className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
                  <Icon size={14} weight="duotone" />
                  {benefit.title}
                </div>
              );
            })}
          </div>
        </div>

        {/* Clubs grid */}
        <div ref={akademikGridRef} className="scroll-reveal-stagger grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {akademikClubs.map((club, i) => {
            const Icon = akademikIconMap[club.slug] ?? Sparkle;
            return (
              <AkademikCard
                key={club.slug}
                club={club}
                Icon={Icon}
                className="scroll-reveal"
                style={{ "--stagger-index": i } as React.CSSProperties}
              />
            );
          })}
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────────────── */}
      <div className={cn(
        "flex items-center gap-6 transition-opacity duration-300",
        activeTab !== "semua" ? "opacity-0 pointer-events-none h-0 overflow-hidden my-0" : "opacity-100"
      )}>
        <div className="h-px flex-1 bg-neutral-200" />
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
          Non-Akademik
        </span>
        <div className="h-px flex-1 bg-neutral-200" />
      </div>

      {/* ── 4. Ekskul Non-Akademik ───────────────────────────────────────── */}
      <section
        id="section-non-akademik"
        className={cn(
          "flex flex-col gap-16 scroll-mt-40 transition-opacity duration-300",
          activeTab === "akademik" ? "opacity-40 pointer-events-none" : "opacity-100"
        )}
      >
        <SectionHeader
          eyebrow="Non-Akademik"
          title="Bakat, Minat & Karakter"
          description="Program pengembangan diri yang mencakup olahraga, seni budaya, teknologi, dan keagamaan — karena setiap siswa punya panggungnya sendiri."
        />

        {/* Per-category */}
        <div ref={nonAkademikRef} className="scroll-reveal-stagger flex flex-col gap-14">
          {NON_AKADEMIK_CATEGORIES.map((category, i) => (
            <div
              key={category.id}
              className="scroll-reveal flex flex-col gap-6"
              style={{ "--stagger-index": i } as React.CSSProperties}
            >
              {/* Category divider label */}
              <div className="flex items-center gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-primary-soft text-brand-primary">
                  <category.icon size={16} weight="duotone" />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-brand-primary">
                  {category.title}
                </span>
                <div className="h-px flex-1 bg-brand-primary/10" />
              </div>
              <p className="text-sm text-neutral-500 -mt-2 ml-11">{category.description}</p>

              {/* Activities grid */}
              <div className="ml-0 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {category.activities.map((activity) => (
                  <NonAkademikCard key={activity.id} activity={activity} categoryTitle={category.title} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. CTA Footer ───────────────────────────────────────────────── */}
      <section ref={ctaRef} className="scroll-reveal pb-8">
        <Card
          variant="glass"
          className="relative overflow-hidden border-brand-primary/15 bg-brand-primary/[0.02] p-8 md:p-14"
        >
          <div className="pointer-events-none absolute -bottom-20 -right-20 size-80 rounded-full bg-brand-primary/6 blur-3xl" />
          <div className="relative flex flex-col items-center gap-6 text-center">
            <Badge variant="primary" className="px-5 py-1.5 text-xs font-bold uppercase tracking-[0.15em]">
              Bergabung Sekarang
            </Badge>
            <h3 className="max-w-2xl text-2xl font-extrabold text-neutral-900 md:text-3xl">
              Siap Menemukan Bakat Terbaikmu di SMANSA?
            </h3>
            <p className="max-w-xl text-neutral-600 leading-relaxed">
              Setiap semester, pendaftaran ekskul dibuka untuk semua siswa.
              Temukan komunitas yang tepat dan kembangkan potensi dirimu bersama kami.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <div className="flex items-center gap-2 rounded-full border border-neutral-100 bg-white px-4 py-2 shadow-sm">
                <Sparkle size={14} className="text-brand-secondary" weight="fill" />
                <span className="text-xs font-bold text-neutral-700">OSN & KSN Preparation</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-neutral-100 bg-white px-4 py-2 shadow-sm">
                <Trophy size={14} className="text-amber-400" weight="fill" />
                <span className="text-xs font-bold text-neutral-700">Kompetisi Nasional</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-neutral-100 bg-white px-4 py-2 shadow-sm">
                <Heart size={14} className="text-rose-400" weight="fill" />
                <span className="text-xs font-bold text-neutral-700">Pengembangan Karakter</span>
              </div>
            </div>
            <button
              className="group relative mt-2 flex h-14 min-w-52 items-center justify-center overflow-hidden rounded-2xl bg-brand-primary px-8 text-white shadow-xl shadow-brand-primary/20 transition-all hover:scale-[1.03] active:scale-95"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/15 to-white/0 transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative flex items-center gap-2.5 font-extrabold">
                Lihat Jadwal Ekskul
                <ArrowRight size={20} weight="bold" />
              </span>
            </button>
          </div>
        </Card>
      </section>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────

const statPillColorMap: Record<string, string> = {
  "brand-primary": "bg-brand-primary-soft text-brand-primary",
  "brand-secondary": "bg-brand-secondary/10 text-brand-secondary",
  "brand-accent": "bg-brand-accent/10 text-brand-accent",
};

function StatPill({
  value,
  label,
  icon: Icon,
  color,
}: {
  value: number;
  label: string;
  icon: React.ComponentType<{ size?: number; weight?: "regular" | "bold" | "fill" | "duotone" | "thin" | "light" }>;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-neutral-100 bg-white px-5 py-3 shadow-sm">
      <div className={cn("flex size-9 items-center justify-center rounded-xl", statPillColorMap[color] ?? "bg-neutral-100 text-neutral-700")}>
        <Icon size={18} weight="duotone" />
      </div>
      <div>
        <p className="text-xl font-extrabold leading-none text-neutral-900">{value}</p>
        <p className="mt-0.5 text-xs font-semibold text-neutral-500">{label}</p>
      </div>
    </div>
  );
}

function AkademikCard({
  club,
  Icon,
  className,
  style,
}: {
  club: { title: string; description: string; slug: string };
  Icon: React.ComponentType<{ size?: number; weight?: "regular" | "bold" | "fill" | "duotone" | "thin" | "light" }>;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Link href={`/ekstrakurikuler/${club.slug}`} className={cn("block h-full", className)} style={style}>
      <Card
        variant="glass-soft"
        className="group flex h-full flex-col gap-5 border border-transparent p-6 transition-all duration-200 hover:border-brand-primary/20 hover:shadow-lg hover:shadow-brand-primary/8"
      >
        {/* Top row: icon + badge */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary-soft text-brand-primary transition-all duration-200 group-hover:bg-brand-primary group-hover:text-white">
            <Icon size={22} weight="duotone" />
          </div>
          <Badge variant="primary" className="shrink-0 text-[10px]">Akademik</Badge>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2">
          <h3 className="font-extrabold leading-snug text-neutral-900 transition-colors group-hover:text-brand-primary">
            {club.title}
          </h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-neutral-500">{club.description}</p>
        </div>

        {/* Hover CTA */}
        <div className="mt-auto flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-primary opacity-0 transition-all duration-200 group-hover:opacity-100">
          <span>Pelajari</span>
          <ArrowRight size={13} weight="bold" />
        </div>
      </Card>
    </Link>
  );
}

function NonAkademikCard({
  activity,
  categoryTitle,
}: {
  activity: {
    id: string;
    slug: string;
    name: string;
    description: string;
    icon: React.ComponentType<{ size?: number; weight?: "regular" | "bold" | "fill" | "duotone" | "thin" | "light" }>;
  };
  categoryTitle: string;
}) {
  const Icon = activity.icon;
  return (
    <Link href={`/ekstrakurikuler/${activity.slug}`} className="block h-full">
      <Card
        variant="glass-soft"
        className="group flex h-full flex-col gap-5 border border-transparent p-6 transition-all duration-200 hover:border-brand-secondary/20 hover:shadow-lg hover:shadow-brand-secondary/8"
      >
        {/* Top row: icon + badge */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-secondary/10 text-brand-secondary transition-all duration-200 group-hover:bg-brand-secondary group-hover:text-white">
            <Icon size={22} weight="duotone" />
          </div>
          <Badge variant="neutral" className="shrink-0 text-[10px]">
            {categoryTitle}
          </Badge>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2">
          <h3 className="font-extrabold leading-snug text-neutral-900 transition-colors group-hover:text-brand-secondary">
            {activity.name}
          </h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-neutral-500">{activity.description}</p>
        </div>

        {/* Hover CTA */}
        <div className="mt-auto flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-secondary opacity-0 transition-all duration-200 group-hover:opacity-100">
          <span>Pelajari</span>
          <ArrowRight size={13} weight="bold" />
        </div>
      </Card>
    </Link>
  );
}
