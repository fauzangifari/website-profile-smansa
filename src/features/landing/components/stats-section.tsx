"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { statsData } from "@/features/landing/data/landing-data";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

export function StatsSection() {
  const currentYear = new Date().getFullYear();
  const yearsSince1953 = currentYear - 1953;

  const allStats = [
    {
      value: yearsSince1953,
      suffix: "+",
      label: "Tahun Pengabdian",
      description: "Mencetak generasi bangsa sejak 1953",
    },
    ...statsData,
  ];

  const sectionRef = useScrollReveal({ stagger: true });

  return (
    <section className="relative overflow-hidden bg-white py-[var(--section-padding-y)]">
      <Container>
        <div
          ref={sectionRef}
          className="scroll-reveal-stagger grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200/50"
        >
          {allStats.map((stat, index) => (
            <div
              key={index}
              className="scroll-reveal flex flex-col items-center text-center pt-8 lg:pt-0 first:pt-0"
              style={{ "--stagger-index": index } as React.CSSProperties}
            >
              <div className="flex items-baseline gap-1 text-3xl md:text-4xl font-extrabold text-brand-primary mb-2">
                <AnimatedCounter target={stat.value} />
                <span className="text-brand-secondary">{stat.suffix}</span>
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-1">
                {stat.label}
              </p>
              <p className="text-[10px] text-neutral-400 font-medium max-w-[120px]">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** Lightweight counter animation using requestAnimationFrame instead of GSAP */
function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.unobserve(el);

          const duration = 2000;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out expo
            const eased = 1 - Math.pow(2, -10 * progress);
            setCount(Math.round(eased * target));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}</span>;
}
