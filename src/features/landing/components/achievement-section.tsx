"use client";

import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { AchievementCard } from "@/features/landing/components/landing-cards";
import { achievements } from "@/features/landing/data/landing-data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AchievementSection() {
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
      id="prestasi"
      ref={containerRef}
      className="relative overflow-hidden bg-[#f8fafc] py-[var(--section-padding-y)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/10 to-transparent"
      />

      <Container>
        <div className="reveal-header">
          <SectionHeader
            eyebrow="Prestasi SMANSA"
            title="Prestasi & Kompetisi"
            description="SMA Negeri 1 Samarinda bangga atas pencapaian para siswa di berbagai bidang, baik akademik maupun non-akademik di tingkat nasional."
          />
        </div>

        <div
          ref={gridRef}
          className="mt-12 grid gap-6 lg:grid-cols-2"
        >
          {achievements.map((achievement, index) => (
            <div key={achievement.title} className={achievement.category === "Featured" ? "lg:col-span-2" : ""}>
              <AchievementCard
                title={achievement.title}
                category={achievement.category}
                level={achievement.level}
                year={achievement.year}
                description={achievement.description}
                featured={achievement.category === "Featured"}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
