"use client";

import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ProgramCard } from "@/features/landing/components/landing-cards";
import { programs } from "@/features/landing/data/landing-data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ProgramSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-header", {
        scrollTrigger: {
          trigger: ".reveal-header",
          start: "top 90%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
      });

      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          },
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "expo.out",
          onComplete: () => ScrollTrigger.refresh(),
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="program"
      ref={containerRef}
      className="relative overflow-hidden bg-white py-[var(--section-padding-y)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/10 to-transparent"
      />

      <Container>
        <div className="reveal-header">
          <SectionHeader
            eyebrow="Program Unggulan"
            title="Program SMANSA"
            description="Kami menyelenggarakan berbagai program pendidikan yang dirancang untuk membekali siswa dengan kompetensi global dan karakter yang kuat."
            align="center"
          />
        </div>

        <div
          ref={gridRef}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {programs.map((program) => (
            <div key={program.title}>
              <ProgramCard
                title={program.title}
                category={program.category}
                description={program.description}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
