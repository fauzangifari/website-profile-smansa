"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ChalkboardTeacherIcon,
  GraduationCapIcon,
  MedalIcon,
  MegaphoneSimpleIcon,
  ShieldCheckIcon,
  StudentIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr";
import { heroNodes } from "@/features/landing/data/landing-data";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const [activeHref, setActiveHref] = useState<string>("");

  useEffect(() => {
    const sectionHrefs = heroNodes.map((node) => node.href);
    const sections = sectionHrefs
      .map((href) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => Boolean(section));

    const syncHash = () => {
      if (sectionHrefs.includes(window.location.hash)) {
        setActiveHref(window.location.hash);
      }
    };

    syncHash();

    // Lacak rasio visibilitas tiap section agar bisa memilih yang paling
    // dominan sekaligus MENGOSONGKAN status aktif saat tak ada yang terlihat
    // (mis. saat kembali ke hero). Tanpa ini badge "Aktif" menempel permanen.
    const visibleRatios = new Map<string, number>();

    const syncActiveFromView = () => {
      let bestId = "";
      let bestRatio = 0;
      visibleRatios.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      });
      setActiveHref(bestId ? `#${bestId}` : "");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleRatios.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleRatios.delete(entry.target.id);
          }
        });
        syncActiveFromView();
      },
      {
        rootMargin: "-30% 0px -45% 0px",
        threshold: [0, 0.15, 0.35, 0.55],
      }
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("hashchange", syncHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncHash);
    };
  }, []);

  return (
    <section
      id="beranda"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-neutral-50 px-0 pb-16 pt-24 sm:pb-20 sm:pt-28 md:pt-32 md:pb-24 lg:min-h-[100svh] lg:h-auto lg:py-20"
    >
      {/* Background Image with Controlled Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/background-hero.jpg"
          alt="SMA Negeri 1 Samarinda"
          fill
          priority
          quality={70}
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center animate-in fade-in duration-1000"
        />
        {/* Multilayered Overlay for Depth & Contrast */}
        <div className="absolute inset-0 bg-white/35 backdrop-blur-[10px]" />
      </div>

      <div className="relative z-10 mx-auto grid h-full w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:gap-12 sm:px-6 md:gap-14 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-8">
        {/* Left Side: Information */}
        <div className="flex w-full flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-700 lg:items-start lg:text-left">
          <HeroTitle />
        </div>

        {/* Right Side: Interactive Mindmap */}
        <div className="relative flex w-full items-center justify-center animate-in fade-in zoom-in-95 duration-700 delay-150 fill-mode-both lg:min-h-[550px]">
          <HeroConstellation activeHref={activeHref} />
        </div>
      </div>
    </section>
  );
}

function HeroTitle() {
  return (
    <div className="hero-title relative z-20 w-full max-w-2xl">
      {/* Dynamic Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/50 px-4 py-1.5 backdrop-blur-xl shadow-sm sm:mb-8">
        <div className="flex size-6 items-center justify-center rounded-full bg-brand-primary text-white shadow-sm">
          <ShieldCheckIcon size={14} weight="bold" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-800">
          Terakreditasi A (Unggul)
        </span>
      </div>

      <h1 className="text-balance text-[clamp(2.25rem,7vw,4.5rem)] font-extrabold leading-[1.05] tracking-tighter text-neutral-900">
        SMA NEGERI 1 <br />
        <span className="text-brand-primary drop-shadow-sm">
          SAMARINDA
        </span>
      </h1>

      <p className="mt-6 max-w-lg text-base font-medium leading-relaxed text-neutral-700 sm:mt-8 sm:text-lg lg:text-xl">
        Unggul dalam prestasi, karakter, dan kolaborasi untuk membangun masa depan generasi bangsa.
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 lg:justify-start">
        <a
          href="#tentang"
          className="group flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-brand-primary/20 transition-all hover:bg-brand-primary-hover hover:shadow-brand-primary-active hover:-translate-y-0.5 active:translate-y-0 sm:w-auto"
        >
          Jelajahi Profil
          <ArrowRight size={20} weight="bold" className="transition-transform group-hover:translate-x-1" />
        </a>
        <a
          href="#spmb"
          className="flex w-full items-center justify-center gap-2 rounded-full border border-white/80 bg-white/60 px-8 py-4 text-base font-bold text-neutral-800 backdrop-blur-xl transition-all hover:bg-white/90 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 sm:w-auto"
        >
          Informasi SPMB
        </a>
      </div>
    </div>
  );
}

function HeroConstellation({ activeHref }: { activeHref: string }) {
  // Balanced radial positions to prevent overlaps
  const desktopPositions = [
    { class: "left-[0%] top-[10%]", cx: 15, cy: 15 },
    { class: "right-[0%] top-[10%]", cx: 85, cy: 15 },
    { class: "left-[-8%] top-[50%] -translate-y-1/2", cx: 10, cy: 50 },
    { class: "right-[-8%] top-[50%] -translate-y-1/2", cx: 90, cy: 50 },
    { class: "left-[0%] bottom-[10%]", cx: 15, cy: 85 },
    { class: "right-[0%] bottom-[10%]", cx: 85, cy: 85 },
  ];

  return (
    <div className="flex w-full flex-col items-center justify-center lg:h-full">
      <div className="relative mx-auto flex w-full max-w-lg items-center justify-center py-6 sm:py-8 md:py-10 lg:h-[min(70svh,500px)] lg:max-w-3xl lg:py-0">
        {/* Connecting Lines for Desktop */}
        <svg
          className="absolute inset-0 h-full w-full pointer-events-none hidden lg:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-brand-primary)" stopOpacity="0.05" />
              <stop offset="50%" stopColor="var(--color-brand-primary)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--color-brand-secondary)" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Persistent Outer Ring Connections (Node to Node) */}
          <path
            className="opacity-15 animate-in fade-in duration-1000 delay-300 fill-mode-both"
            d={`M ${desktopPositions[0].cx} ${desktopPositions[0].cy} 
               L ${desktopPositions[1].cx} ${desktopPositions[1].cy} 
               L ${desktopPositions[3].cx} ${desktopPositions[3].cy} 
               L ${desktopPositions[5].cx} ${desktopPositions[5].cy} 
               L ${desktopPositions[4].cx} ${desktopPositions[4].cy} 
               L ${desktopPositions[2].cx} ${desktopPositions[2].cy} Z`}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="0.15"
            strokeDasharray="2, 4"
          />

          {/* Radial Connections (Center to Nodes) */}
          {desktopPositions.map((pos, index) => (
            <path
              key={index}
              className="hero-line opacity-40 animate-in fade-in fill-mode-both"
              style={{ animationDuration: '1000ms', animationDelay: `${300 + index * 50}ms` }}
              d={`M 50 50 L ${pos.cx} ${pos.cy}`}
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="0.25"
            />
          ))}
        </svg>

        {/* Central Logo Container */}
        <div className="relative z-30 lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
          <div className="relative">
            {/* Static Rings for elegant look */}
            <div className="absolute inset-[-30%] rounded-full border border-brand-primary/10" />
            <div className="absolute inset-[-60%] rounded-full border border-brand-secondary/5" />

            <a
              href="#tentang"
              className="group relative flex size-28 items-center justify-center rounded-full bg-white/90 shadow-2xl shadow-brand-primary/10 backdrop-blur-3xl ring-1 ring-white transition-all duration-300 hover:scale-105 sm:size-36 md:size-40 lg:size-48"
            >
              <div className="absolute inset-2 rounded-full border border-brand-primary/10" />
              <div className="absolute inset-0 rounded-full bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Image
                src="/images/brand/logo.png"
                alt="Logo SMAN 1 Samarinda"
                width={88}
                height={100}
                priority
                className="h-14 w-auto object-contain drop-shadow-md sm:h-20 lg:h-28"
              />
            </a>
          </div>
        </div>

        {/* Nodes (Desktop Only) */}
        <div className="absolute inset-0 z-40 hidden lg:block">
          {heroNodes.map((node, index) => (
            <div
              key={node.label}
              className={cn(
                "absolute w-max animate-in fade-in zoom-in-95 fill-mode-both",
                desktopPositions[index].class
              )}
              style={{ animationDuration: '700ms', animationDelay: `${300 + index * 100}ms` }}
            >
              <NodeItem node={node} isActive={node.href === activeHref} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Grid Layout */}
      <div className="z-40 mx-auto mt-6 grid w-full max-w-md grid-cols-2 gap-3 px-2 sm:mt-8 sm:max-w-xl sm:grid-cols-3 sm:gap-4 md:max-w-2xl md:gap-5 lg:hidden">
        {heroNodes.map((node) => (
          <NodeItem key={node.label} node={node} isActive={node.href === activeHref} />
        ))}
      </div>
    </div>
  );
}

function NodeItem({
  node,
  isActive,
}: {
  node: { label: string; href: string; tone: string; description?: string };
  isActive: boolean;
}) {
  return (
    <a
      href={node.href}
      className={cn(
        "group relative flex w-full flex-col items-start overflow-hidden rounded-lg border border-white/90 bg-white/40 p-3 shadow-xl shadow-black/5 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white/60 hover:shadow-2xl md:p-3.5 lg:w-[13.5rem] lg:p-4",
        isActive && "border-brand-primary/40 bg-white/70 ring-2 ring-brand-primary/10",
        getNodeToneClasses(node.tone),
        isActive && getActiveNodeToneClasses(node.tone)
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/90 shadow-sm ring-1 ring-black/5 transition-all duration-300 group-hover:scale-110 lg:size-10",
            isActive && "ring-2 ring-brand-primary/10"
          )}
        >
          <NodeIcon label={node.label} tone={node.tone} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-tight text-neutral-800 lg:text-[0.95rem]">
            {node.label}
          </span>
          {isActive && (
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-brand-primary">
              Aktif
            </span>
          )}
        </div>
      </div>

      {/* Description Tooltip-like effect */}
      <div className="mt-2 hidden overflow-hidden transition-all duration-300 group-hover:block lg:block lg:max-h-0 lg:opacity-0 lg:group-hover:max-h-16 lg:group-hover:opacity-100">
        <p className="mt-2 text-[11px] font-medium leading-relaxed text-neutral-600 lg:text-[12px]">
          {node.description}
        </p>
      </div>
    </a>
  );
}

function NodeIcon({ label, tone }: { label: string; tone: string }) {
  const colorClass = getNodeIconColor(tone);
  const iconProps = {
    size: 24,
    weight: "duotone" as const,
    className: cn("size-5 drop-shadow-sm transition-colors sm:size-6", colorClass),
  };

  switch (label) {
    case "Tentang":
      return <StudentIcon {...iconProps} />;
    case "Keunggulan":
      return <MedalIcon {...iconProps} />;
    case "Pimpinan":
      return <ChalkboardTeacherIcon {...iconProps} />;
    case "Berita":
      return <MegaphoneSimpleIcon {...iconProps} />;
    case "Alumni":
      return <UsersThreeIcon {...iconProps} />;
    case "SPMB":
      return <MegaphoneSimpleIcon {...iconProps} />;
    default:
      return <GraduationCapIcon {...iconProps} />;
  }
}

function getNodeIconColor(tone: string) {
  switch (tone) {
    case "amber": return "text-amber-500 group-hover:text-amber-600";
    case "teal": return "text-teal-500 group-hover:text-teal-600";
    case "sky": return "text-sky-500 group-hover:text-sky-600";
    case "green": return "text-emerald-500 group-hover:text-emerald-600";
    case "blue": default: return "text-brand-primary group-hover:text-brand-primary-hover";
  }
}

function getNodeToneClasses(tone: string) {
  switch (tone) {
    case "amber":
      return "hover:border-amber-400/50 hover:bg-amber-400/5 hover:shadow-amber-500/10";
    case "teal":
      return "hover:border-teal-400/50 hover:bg-teal-400/5 hover:shadow-teal-500/10";
    case "sky":
      return "hover:border-sky-400/50 hover:bg-sky-400/5 hover:shadow-sky-500/10";
    case "green":
      return "hover:border-emerald-400/50 hover:bg-emerald-400/5 hover:shadow-emerald-500/10";
    case "blue":
    default:
      return "hover:border-brand-primary/40 hover:bg-brand-primary/5 hover:shadow-brand-primary/10";
  }
}

function getActiveNodeToneClasses(tone: string) {
  switch (tone) {
    case "amber":
      return "border-amber-400/60 bg-amber-400/10 shadow-amber-500/20 ring-2 ring-amber-400/20";
    case "teal":
      return "border-teal-400/60 bg-teal-400/10 shadow-teal-500/20 ring-2 ring-teal-400/20";
    case "sky":
      return "border-sky-400/60 bg-sky-400/10 shadow-sky-500/20 ring-2 ring-sky-400/20";
    case "green":
      return "border-emerald-400/60 bg-emerald-400/10 shadow-emerald-500/20 ring-2 ring-emerald-400/20";
    case "blue":
    default:
      return "border-brand-primary/60 bg-brand-primary/10 shadow-brand-primary/20 ring-2 ring-brand-primary/20";
  }
}
