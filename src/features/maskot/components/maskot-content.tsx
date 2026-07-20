"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Bird,
  Crown,
  Plant,
  Heart,
  Feather,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";
import {
  closingTagline,
  maskotCostumes,
  maskotImage,
  maskotImageAlt,
  maskotName,
  maskotTagline,
  maskotTraits,
  originParagraphs,
  spiritParagraphs,
  totalCostumes,
  whyEnggangParagraphs,
} from "@/features/maskot/data/maskot-data";

const iconMap = {
  Bird,
  Crown,
  Plant,
  Heart,
} as const;

// Ratakan seluruh kostum jadi satu daftar untuk carousel; kategori jadi keterangan.
const costumeItems = maskotCostumes.flatMap((category) =>
  category.images.map((image) => ({
    src: image.src,
    alt: image.alt,
    category: category.label,
  })),
);

/** Motif ukiran sulur — mengenang lengkung jambul RANGSA. Dekoratif saja. */
function UkiranDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center justify-center gap-3 text-brand-accent", className)}
      aria-hidden="true"
    >
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-brand-accent/50 md:w-20" />
      <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
        <path
          d="M30 10C24 2 13 2 11 10c-1 5 6 6 6.5 1 .3-2.6-3.2-2.6-3.2 0"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.75"
        />
        <path
          d="M30 10c6-8 17-8 19 0 1 5-6 6-6.5 1-.3-2.6 3.2-2.6 3.2 0"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.75"
        />
        <circle cx="30" cy="10" r="2.2" fill="currentColor" opacity="0.85" />
      </svg>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-brand-accent/50 md:w-20" />
    </div>
  );
}

/** Carousel kostum: satu panggung besar, geser/tombol/dot untuk berganti. */
function CostumeCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const total = costumeItems.length;
  const active = costumeItems[index];

  const go = (direction: number) => setIndex((i) => (i + direction + total) % total);

  // Auto-slide tiap 2 detik; berhenti saat hover/fokus atau reduced-motion.
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % total), 2000);
    return () => window.clearInterval(id);
  }, [paused, index, total]);

  return (
    <div
      className="relative"
      role="group"
      aria-roledescription="carousel"
      aria-label="Galeri kostum RANGSA"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setPaused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(-1);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          go(1);
        }
      }}
    >
      {/* Panggung */}
      <div
        className="relative mx-auto max-w-2xl overflow-hidden rounded-[2rem] border border-brand-primary/10 bg-gradient-to-b from-blue-50/50 to-white p-6 shadow-sm md:p-10"
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0].clientX;
        }}
        onTouchEnd={(event) => {
          if (touchStartX.current === null) return;
          const delta = event.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
          touchStartX.current = null;
        }}
      >
        <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-brand-accent/10 blur-3xl" />

        <span className="pointer-events-none absolute left-5 top-5 z-10 rounded-full bg-white/85 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-primary shadow-sm backdrop-blur">
          {active.category}
        </span>

        {/* Tumpukan gambar — hanya yang aktif tampil (crossfade) */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm md:max-w-md">
          <div className="absolute bottom-4 left-1/2 h-4 w-2/3 -translate-x-1/2 rounded-[50%] bg-brand-primary/15 blur-md" />
          {costumeItems.map((item, i) => (
            <Image
              key={item.src}
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 90vw, 28rem"
              aria-hidden={i !== index}
              className={cn(
                "object-contain drop-shadow-2xl transition-opacity duration-500 motion-reduce:transition-none",
                i === index ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>

        {/* Tombol geser */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Kostum sebelumnya"
          className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-brand-primary/15 bg-white/85 text-brand-primary shadow-md backdrop-blur transition hover:bg-brand-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary md:size-12"
        >
          <CaretLeft size={22} weight="bold" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Kostum berikutnya"
          className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-brand-primary/15 bg-white/85 text-brand-primary shadow-md backdrop-blur transition hover:bg-brand-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary md:size-12"
        >
          <CaretRight size={22} weight="bold" />
        </button>
      </div>

      {/* Keterangan + penghitung */}
      <p className="mt-6 text-center text-sm font-semibold" aria-live="polite">
        <span className="text-brand-primary">{active.category}</span>
        <span className="text-neutral-400">
          {" "}
          — {index + 1} / {total}
        </span>
      </p>

      {/* Titik indikator */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {costumeItems.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Tampilkan kostum ${i + 1}: ${item.category}`}
            aria-current={i === index}
            className={cn(
              "h-2 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
              i === index ? "w-6 bg-brand-primary" : "w-2 bg-neutral-300 hover:bg-neutral-400",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function MaskotContent() {
  const introRef = useScrollReveal();
  const whyRef = useScrollReveal();
  const traitsRef = useScrollReveal();
  const galleryRef = useScrollReveal();
  const spiritRef = useScrollReveal();

  return (
    <div className="flex flex-col gap-16 font-sans md:gap-20">
      {/* Perkenalan — gambar maskot + Asal Nama */}
      <section
        ref={introRef}
        className="scroll-reveal relative overflow-hidden rounded-[2rem] border border-brand-primary/10 bg-gradient-to-br from-white via-blue-50/40 to-white p-8 shadow-sm md:p-12"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-24 size-72 rounded-full bg-brand-accent/10 blur-3xl" />

        <div className="relative grid items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* Panggung gambar maskot */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 m-auto size-64 rounded-full bg-gradient-to-br from-brand-primary/15 to-brand-accent/20 blur-2xl md:size-[24rem]" />
            <div className="absolute bottom-5 left-1/2 h-5 w-40 -translate-x-1/2 rounded-[50%] bg-brand-primary/25 blur-md md:w-56" />
            <Image
              src={maskotImage}
              alt={maskotImageAlt}
              width={520}
              height={520}
              priority
              className="relative w-64 max-w-full drop-shadow-2xl md:w-[26rem]"
            />
          </div>

          {/* Asal Nama */}
          <div className="flex flex-col items-start text-left">
            <Badge
              variant="primary"
              className="mb-5 px-4 py-1 text-sm font-bold uppercase tracking-widest"
            >
              Asal Nama
            </Badge>
            <h2 className="leading-none">
              <span className="block text-5xl font-black tracking-tight text-neutral-900 md:text-6xl">
                {maskotName}
              </span>
              <span className="mt-3 block text-lg font-semibold text-brand-primary md:text-2xl">
                {maskotTagline}
              </span>
            </h2>
            <div className="mt-6 grid gap-5 text-base leading-8 text-neutral-700 md:text-lg">
              {originParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mengapa Enggang? */}
      <section ref={whyRef} className="scroll-reveal">
        <div className="flex flex-col items-center text-center">
          <Badge variant="primary" className="mb-4">
            Filosofi
          </Badge>
          <h2 className="max-w-3xl text-2xl font-extrabold leading-tight text-neutral-900 md:text-3xl lg:text-4xl">
            Mengapa Enggang?
          </h2>
          <div className="mt-8 grid max-w-3xl gap-6 text-base leading-8 text-neutral-700 md:text-lg">
            {whyEnggangParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <UkiranDivider className="mt-10" />
        </div>
      </section>

      {/* Makna di Balik Setiap Sifat */}
      <section ref={traitsRef} className="scroll-reveal space-y-10">
        <div className="flex flex-col items-center text-center">
          <Badge variant="primary" className="mb-4">
            Empat Sifat
          </Badge>
          <h2 className="text-2xl font-extrabold leading-tight text-neutral-900 md:text-3xl lg:text-4xl">
            Makna di Balik Setiap Sifat
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-500 md:text-base">
            Empat karakter enggang yang menjadi cermin perjalanan dan nilai SMA Negeri 1 Samarinda.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {maskotTraits.map((trait) => {
            const IconComponent = iconMap[trait.icon as keyof typeof iconMap] || Feather;

            return (
              <Card
                key={trait.title}
                className="group relative overflow-hidden border-brand-primary/10 bg-white/70 p-7 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-brand-primary/30 hover:shadow-xl hover:shadow-brand-primary/5"
              >
                <div className="absolute -right-10 -top-10 size-24 rounded-full bg-brand-primary/5 transition-all group-hover:bg-brand-primary/10" />
                <div className="relative">
                  <div className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-primary-soft to-brand-primary-soft/40 text-brand-primary">
                    <IconComponent size={28} weight="duotone" />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-neutral-900 transition-colors group-hover:text-brand-primary md:text-xl">
                    {trait.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-600">{trait.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Galeri Kostum RANGSA — carousel */}
      <section ref={galleryRef} className="scroll-reveal space-y-10">
        <div className="flex flex-col items-center text-center">
          <Badge variant="primary" className="mb-4">
            Galeri Kostum
          </Badge>
          <h2 className="max-w-3xl text-2xl font-extrabold leading-tight text-neutral-900 md:text-3xl lg:text-4xl">
            Satu RANGSA, Segala Rupa SMANSA
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-500 md:text-base">
            Dari seragam upacara hingga busana adat, RANGSA hadir di setiap wajah keseharian siswa
            Smansa. Geser untuk melihat {totalCostumes} kostumnya.
          </p>
          <UkiranDivider className="mt-8" />
        </div>

        <CostumeCarousel />
      </section>

      {/* Semangat yang Dibawa RANGSA */}
      <section
        ref={spiritRef}
        className="scroll-reveal relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-primary to-brand-primary-active p-8 text-center shadow-xl shadow-brand-primary/20 md:p-14"
      >
        <div className="absolute -right-20 -top-20 size-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-brand-accent/20 blur-3xl" />

        <div className="relative flex flex-col items-center">
          <Badge
            variant="glass"
            className="mb-6 px-4 py-1 text-sm font-bold uppercase tracking-widest"
          >
            Semangat RANGSA
          </Badge>
          <div className="grid max-w-3xl gap-6 text-base leading-8 text-white/90 md:text-lg">
            {spiritParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <UkiranDivider className="mt-10 text-white/60" />

          <div className="mt-8 flex flex-col items-center gap-3">
            <p
              className={cn(
                "max-w-2xl text-xl font-extrabold leading-snug text-white md:text-3xl",
              )}
            >
              &ldquo;{closingTagline}&rdquo;
            </p>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
              {maskotName} — {maskotTagline}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
