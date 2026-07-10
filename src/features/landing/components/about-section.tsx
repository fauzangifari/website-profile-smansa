"use client";

import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import {
  missionItems,
  visionStatement,
} from "@/features/vision-mission/data/vision-mission-data";
import { Quotes, CheckCircle, ArrowRight } from "@phosphor-icons/react";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

export function AboutSection() {
  const visionRef = useScrollReveal();
  const missionHeaderRef = useScrollReveal();
  const missionGridRef = useScrollReveal({ stagger: true });

  return (
    <section
      id="tentang"
      className="relative flex flex-col items-center overflow-hidden bg-white py-[var(--section-padding-y)]"
    >
      <div id="visi-misi" className="absolute top-0 -translate-y-24" />
      {/* Decorative Orbs */}
      <div className="absolute -left-24 top-24 size-96 rounded-full bg-brand-primary/5 blur-3xl" />
      <div className="absolute -right-24 bottom-24 size-96 rounded-full bg-brand-secondary/5 blur-3xl" />
      
      <Container className="relative z-10">
        {/* VISION SECTION */}
        <div ref={visionRef} className="scroll-reveal flex flex-col items-center text-center">
          <Badge variant="glass" className="mb-6">Visi Sekolah</Badge>
          <div className="relative max-w-4xl px-4 md:px-0">
            <Quotes size={64} weight="fill" className="absolute -left-4 -top-8 rotate-180 text-brand-primary/10 md:-left-12" />
            <h2 className="text-3xl font-extrabold leading-tight text-neutral-900 sm:text-4xl md:text-5xl lg:leading-[1.15]">
              {visionStatement}
            </h2>
            <Quotes size={64} weight="fill" className="absolute -right-4 -bottom-8 text-brand-secondary/10 md:-right-12" />
          </div>
        </div>

        {/* MISSION SECTION */}
        <div className="mt-24 lg:mt-32">
          <div ref={missionHeaderRef} className="scroll-reveal mb-12 flex flex-col items-center text-center">
            <Badge variant="glass" className="mb-4">Misi Sekolah</Badge>
            <h3 className="text-3xl font-bold text-neutral-900">Komitmen & Langkah Nyata</h3>
            <p className="mt-4 max-w-2xl text-lg text-neutral-600">
              8 poin misi strategis SMANSA dalam mewujudkan ekosistem pendidikan yang unggul dan berkelanjutan.
            </p>
          </div>

          <div 
            ref={missionGridRef}
            className="scroll-reveal-stagger grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {missionItems.map((mission, index) => (
              <GlassCard
                key={index}
                className="scroll-reveal group relative flex flex-col p-6 transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-xl hover:shadow-brand-primary/5"
                style={{ "--stagger-index": index } as React.CSSProperties}
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                  <span className="text-sm font-extrabold">{index + 1}</span>
                </div>
                <h4 className="text-base font-bold leading-snug text-neutral-900 transition-colors">
                  {mission.title}
                </h4>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand-primary/80">
                  {mission.theme}
                </p>
                <div className="absolute bottom-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <CheckCircle size={20} weight="fill" className="text-brand-primary/20" />
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href="/visi-misi"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-primary px-8 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              Lihat Visi &amp; Misi Lengkap
              <ArrowRight size={18} weight="bold" className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </Container>

      {/* Background Accent */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />
    </section>
  );
}
