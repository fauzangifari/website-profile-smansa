"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { alumniData } from "@/features/landing/data/landing-data";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

export function AlumniSection() {
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal({ stagger: true });
  const ctaRef = useScrollReveal();

  return (
    <section
      id="alumni"
      className="relative overflow-hidden bg-neutral-950 py-[var(--section-padding-y)]"
    >
      {/* ── Background decorations ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,122,255,0.15)_0%,transparent_65%)]" />
        <div className="absolute -bottom-20 -right-20 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(0,122,255,0.08)_0%,transparent_65%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <Container className="relative z-10">
        {/* ── Header ── */}
        <div ref={headerRef} className="scroll-reveal mb-10 lg:mb-14">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="h-px w-8 bg-brand-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">
              Jejaring Alumni
            </span>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
                Alumni{" "}
                <em className="not-italic text-brand-primary">Berprestasi</em>
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-7 text-white/50 md:text-base">
                Lulusan SMAN 1 Samarinda telah tersebar di berbagai sektor,
                mengabdi dan berprestasi membawa nama baik almamater.
              </p>
            </div>
          </div>
        </div>

        {/* ── Portrait Card Grid ── */}
        <div
          ref={gridRef}
          className="scroll-reveal-stagger grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5"
        >
          {alumniData.map((alumni, index) => (
            <article
              key={alumni.name}
              className="scroll-reveal group relative overflow-hidden rounded-2xl bg-neutral-800"
              style={{ "--stagger-index": index } as React.CSSProperties}
            >
              {/* Portrait ratio */}
              <div className="aspect-[3/4] relative">
                <Image
                  src={alumni.image}
                  alt={alumni.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                {/* Angkatan badge */}
                <div className="absolute left-3 top-3 rounded-full border border-white/14 bg-black/40 px-2.5 py-1 text-[10px] font-bold text-white/70 backdrop-blur-sm">
                  {alumni.angkatan}
                </div>

                {/* Info */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand-primary truncate">
                    {alumni.role}
                  </p>
                  <h3 className="mt-0.5 text-sm font-bold leading-tight text-white truncate">
                    {alumni.name}
                  </h3>
                  {alumni.institution && (
                    <p className="mt-0.5 text-[10px] text-white/40 truncate">
                      {alumni.institution}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── CTA ── */}
        <div ref={ctaRef} className="scroll-reveal mt-10 flex justify-center md:mt-12">
          <a
            href="#semua-alumni"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/14 bg-white/6 px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-brand-primary/50 hover:bg-brand-primary/10 hover:text-brand-primary"
          >
            <span>Lihat Semua Alumni</span>
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </Container>
    </section>
  );
}
