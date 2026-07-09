"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, useRef } from "react";
import type { CSSProperties } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { leaders } from "@/features/landing/data/landing-data";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

const AUTOPLAY_DELAY = 2000;

export function LeadershipSection() {
  const [principal, ...officials] = leaders;
  const [reducedMotion, setReducedMotion] = useState(false);

  const petinggi = officials.slice(0, 8);

  const headerRef = useScrollReveal();
  const contentRef = useScrollReveal();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReducedMotion = () => setReducedMotion(mediaQuery.matches);

    updateReducedMotion();
    mediaQuery.addEventListener("change", updateReducedMotion);

    return () => mediaQuery.removeEventListener("change", updateReducedMotion);
  }, []);

  return (
    <section
      id="kepemimpinan"
      className="relative overflow-hidden bg-white py-[var(--section-padding-y)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-24 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full border border-brand-primary/10"
      />
      <div
        aria-hidden="true"
        className="absolute -right-28 bottom-14 h-72 w-72 rounded-full bg-brand-secondary/10 blur-3xl"
      />

      <Container>
        <div ref={headerRef} className="scroll-reveal">
          <SectionHeader
            eyebrow="Kepemimpinan"
            title="Kepala Sekolah dan Jajaran"
          />
        </div>

        <div ref={contentRef} className="scroll-reveal relative mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          <LeadershipStaticCard name={principal.name} role={principal.role} imageSrc={principal.imageSrc} />

          <div>
            <LeadershipCarousel3D
              items={petinggi}
              label="Carousel Wakil Kepala Sekolah"
              reducedMotion={reducedMotion}
            />
          </div>
        </div>
      </Container>
    </section >
  );
}

function LeadershipCarousel3D({
  items,
  label,
  reducedMotion,
}: {
  items: typeof leaders;
  label: string;
  reducedMotion: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = items.length;

  useEffect(() => {
    if (paused || reducedMotion || total <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, total]);

  const activeLeader = items[activeIndex];
  const carouselItems = useMemo(
    () =>
      items.map((leader, index) => ({
        leader,
        index,
        offset: getCircularOffset(index, activeIndex, total),
      })),
    [activeIndex, items, total],
  );

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + total) % total);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % total);
  };

  return (
    <div
      className="relative h-full min-h-[560px] sm:min-h-[600px] lg:min-h-[620px] overflow-hidden rounded-lg border border-white/50 bg-white/36 px-3 py-6 shadow-xl shadow-neutral-950/8 backdrop-blur-xl md:px-8"
      style={{ perspective: "1000px" }}
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
      />

      {carouselItems.map(({ leader, index, offset }) => (
        <LeadershipCarouselCard
          key={leader.name}
          name={leader.name}
          role={leader.role}
          imageSrc={leader.imageSrc}
          active={offset === 0}
          offset={offset}
          onSelect={() => setActiveIndex(index)}
        />
      ))}

      <div className="pointer-events-none absolute inset-x-4 bottom-3 z-40 flex items-center justify-between gap-4 md:inset-x-8">
        <button
          type="button"
          className="pointer-events-auto grid size-9 place-items-center rounded-full border border-white/70 bg-white/76 text-lg font-extrabold text-brand-primary shadow-md backdrop-blur-2xl transition hover:-translate-x-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          onClick={goToPrevious}
          aria-label="Tampilkan sebelumnya"
        >
          ‹
        </button>
        <div className="pointer-events-auto flex max-w-[62%] flex-wrap justify-center gap-1.5 rounded-full border border-white/64 bg-white/62 px-2.5 py-1.5 shadow-md backdrop-blur-2xl">
          {items.map((leader, index) => (
            <button
              key={leader.name}
              type="button"
              className={cn(
                "size-2 rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
                index === activeIndex
                  ? "w-5 bg-brand-primary"
                  : "bg-neutral-300 hover:bg-brand-primary/50",
              )}
              onClick={() => setActiveIndex(index)}
              aria-label={`Tampilkan ${leader.name}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
        <button
          type="button"
          className="pointer-events-auto grid size-9 place-items-center rounded-full border border-white/70 bg-white/76 text-lg font-extrabold text-brand-primary shadow-md backdrop-blur-2xl transition hover:translate-x-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          onClick={goToNext}
          aria-label="Tampilkan berikutnya"
        >
          ›
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        {activeLeader.name}, {activeLeader.role}
      </p>
    </div>
  );
}

function LeadershipStaticCard({
  name,
  role,
  imageSrc,
}: {
  name: string;
  role: string;
  imageSrc?: string;
}) {
  return (
    <article className="group relative isolate min-h-[560px] overflow-hidden rounded-lg border border-white/60 bg-white/50 shadow-xl shadow-neutral-950/12 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-neutral-950/14 sm:min-h-[600px] lg:min-h-[620px]">
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={name}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <LeadershipFallback name={name} large />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/64 via-neutral-950/8 to-white/10" />
      <div className="absolute inset-x-5 bottom-5">
        <div className="rounded-lg border border-white/54 bg-white/76 p-5 shadow-lg shadow-neutral-950/12 backdrop-blur-2xl md:p-6">
          <p className="truncate text-xs font-extrabold uppercase tracking-[0.14em] text-brand-primary">
            {role}
          </p>
          <h3
            className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-extrabold leading-tight text-neutral-900 md:text-3xl"
            title={name}
          >
            {name}
          </h3>
        </div>
      </div>
    </article>
  );
}

function LeadershipCarouselCard({
  name,
  role,
  imageSrc,
  active,
  offset,
  onSelect,
}: {
  name: string;
  role: string;
  imageSrc?: string;
  active: boolean;
  offset: number;
  onSelect: () => void;
}) {
  const hidden = Math.abs(offset) > 2;
  const style = getCardStyle(offset);

  return (
    <article
      className={cn(
        "absolute left-1/2 top-1/2 z-10 h-[420px] w-[min(70vw,280px)] overflow-hidden rounded-lg border border-white/60 bg-white shadow-lg transition-[transform,opacity] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform sm:h-[460px] sm:w-[320px] lg:h-[500px] lg:w-[340px]",
        active ? "z-30" : "z-20 cursor-pointer",
        hidden ? "pointer-events-none opacity-0" : null,
      )}
      style={style}
      aria-hidden={!active}
      onClick={active ? undefined : onSelect}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={name}
          fill
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 320px, 340px"
          className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
        />
      ) : (
        <LeadershipFallback name={name} />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-white/5" />
      <div className="absolute inset-x-3.5 bottom-3.5">
        <div className="rounded-lg border border-white/40 bg-white/90 p-3 shadow-md md:p-4">
          <p className="truncate text-[10px] font-extrabold uppercase tracking-[0.12em] text-brand-primary">
            {role}
          </p>
          <h3
            className={cn(
              "mt-1 overflow-hidden text-ellipsis whitespace-nowrap font-extrabold leading-tight text-neutral-900",
              active ? "text-lg md:text-xl" : "text-base",
            )}
            title={name}
          >
            {name}
          </h3>
        </div>
      </div>
    </article>
  );
}

function LeadershipFallback({
  name,
  large = false,
}: {
  name: string;
  large?: boolean;
}) {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(145deg,#f8fafc_0%,#dbeafe_52%,#ffffff_100%)]">
      <div
        aria-hidden="true"
        className="absolute inset-8 rounded-lg border border-white/40"
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/60 bg-white font-extrabold text-brand-primary shadow-md",
          large ? "size-32 text-5xl" : "size-28 text-4xl",
        )}
      >
        {name.charAt(0)}
      </div>
    </div>
  );
}

function getCircularOffset(index: number, activeIndex: number, total: number) {
  const rawOffset = index - activeIndex;
  const half = Math.floor(total / 2);

  if (rawOffset > half) {
    return rawOffset - total;
  }

  if (rawOffset < -half) {
    return rawOffset + total;
  }

  return rawOffset;
}

function getCardStyle(offset: number): CSSProperties {
  const absoluteOffset = Math.abs(offset);
  const direction = Math.sign(offset);
  const translateX = direction * (absoluteOffset === 1 ? 40 : absoluteOffset === 2 ? 66 : 88);
  const translateY = absoluteOffset === 0 ? 0 : absoluteOffset === 1 ? 12 : 24;
  const rotateY = direction * (absoluteOffset === 1 ? -18 : absoluteOffset === 2 ? -30 : -40);
  const scale = absoluteOffset === 0 ? 1 : absoluteOffset === 1 ? 0.84 : absoluteOffset === 2 ? 0.7 : 0.58;
  const opacity = absoluteOffset === 0 ? 1 : absoluteOffset === 1 ? 0.8 : absoluteOffset === 2 ? 0.5 : 0;

  return {
    opacity,
    transform: `translateX(calc(-50% + ${translateX}%)) translateY(calc(-50% + ${translateY}px)) rotateY(${rotateY}deg) scale(${scale})`,
  };
}
