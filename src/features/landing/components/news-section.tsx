"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { newsSectionGroups } from "@/features/landing/data/landing-data";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

const toneClasses = {
  primary: {
    badge: "bg-brand-primary-soft text-brand-primary",
    card:
      "hover:border-brand-primary/30 hover:bg-brand-primary-soft/40 hover:shadow-[0_18px_50px_rgba(30,64,175,0.10)]",
    mark: "bg-brand-primary text-white",
    line: "bg-brand-primary",
  },
  warning: {
    badge: "bg-warning/15 text-warning",
    card:
      "hover:border-warning/30 hover:bg-warning/10 hover:shadow-[0_18px_50px_rgba(180,83,9,0.10)]",
    mark: "bg-warning text-white",
    line: "bg-warning",
  },
  success: {
    badge: "bg-success/10 text-success",
    card:
      "hover:border-success/30 hover:bg-success/10 hover:shadow-[0_18px_50px_rgba(15,118,110,0.10)]",
    mark: "bg-success text-white",
    line: "bg-success",
  },
} as const;

export function NewsSection() {
  const headerRef = useScrollReveal();
  const contentRef = useScrollReveal({ stagger: true });

  return (
    <section
      id="berita"
      className="relative overflow-hidden bg-white py-[var(--section-padding-y)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute -left-24 bottom-14 h-72 w-72 rounded-full bg-brand-accent/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute right-8 top-20 h-56 w-56 rounded-full border border-brand-primary/10"
      />

      <Container>
        <div ref={headerRef} className="scroll-reveal">
          <SectionHeader
            eyebrow="Berita SMANSA"
            title="Berita Terbaru"
            description="Informasi terbaru, pengumuman, kegiatan sekolah, dan agenda penting SMANSA disusun ringkas agar mudah dipindai."
          />
        </div>

        <div ref={contentRef} className="scroll-reveal-stagger mt-8 grid gap-4">
          {newsSectionGroups.map((group, index) => {
            const tone = toneClasses[group.tone];

            return (
              <div
                key={group.key}
                className="scroll-reveal grid gap-3 lg:grid-cols-[minmax(240px,0.72fr)_minmax(0,1.45fr)] lg:items-stretch lg:gap-6"
                style={{ "--stagger-index": index } as React.CSSProperties}
              >
                <a href={group.href} className="group block h-full">
                  <Card
                    className={cn(
                      "flex h-full flex-col justify-between gap-4 border-neutral-200/80 bg-white/88 p-4 hover:-translate-y-1 md:p-5",
                      tone.card,
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span
                          className={cn(
                            "inline-flex h-7 items-center rounded-sm px-2.5 text-xs font-semibold",
                            tone.badge,
                          )}
                        >
                          {group.eyebrow}
                        </span>
                        <h3 className="mt-3 text-xl font-extrabold tracking-tight text-neutral-950 md:text-2xl">
                          {group.label}
                        </h3>
                      </div>
                      <span
                        className={cn(
                          "grid size-10 shrink-0 place-items-center rounded-lg text-sm font-extrabold",
                          tone.mark,
                        )}
                      >
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-sm leading-6 text-neutral-700 lg:leading-5">
                      {group.description}
                    </p>
                    <div className="flex items-center justify-between border-t border-neutral-200 pt-3 text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
                      <span>{group.items.length} terbaru</span>
                      <span
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        -&gt;
                      </span>
                    </div>
                  </Card>
                </a>

                <Card className="h-full overflow-hidden p-0">
                  <div className="grid h-full gap-0 md:grid-cols-[160px_1fr]">
                    <div className="border-b border-neutral-200 bg-neutral-50 p-4 md:border-b-0 md:border-r md:p-5">
                      <Badge className={tone.badge}>{group.label}</Badge>
                      <h3 className="mt-3 text-base font-extrabold leading-snug text-neutral-950 md:text-lg">
                        3 informasi terakhir
                      </h3>
                      <span
                        aria-hidden="true"
                        className={cn("mt-4 block h-1 w-12 rounded-full", tone.line)}
                      />
                    </div>
                    <div className="divide-y divide-neutral-200">
                      {group.items.slice(0, 3).map((item) => (
                        <a
                          key={item.title}
                          href={item.href}
                          className="group grid grid-cols-[92px_1fr] gap-3 px-4 py-3.5 transition-colors hover:bg-neutral-50 sm:grid-cols-[116px_1fr] sm:gap-4 md:px-5"
                        >
                          <span className="relative min-h-24 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 shadow-sm sm:min-h-28">
                            <Image
                              src={item.imageSrc}
                              alt={item.title}
                              fill
                              sizes="(max-width: 640px) 92px, 116px"
                              className="object-cover transition duration-500 ease-out group-hover:scale-105"
                            />
                            <span className="absolute inset-0 bg-gradient-to-t from-neutral-950/20 via-transparent to-white/10" />
                          </span>
                          <span className="min-w-0 self-center">
                            <time className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-500">
                              {item.date}
                            </time>
                            <span className="block text-base font-bold leading-snug text-neutral-950 transition-colors group-hover:text-brand-primary">
                              {item.title}
                            </span>
                            <span className="mt-1.5 block text-sm leading-6 text-neutral-700 md:leading-5">
                              {item.excerpt}
                            </span>
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="mt-7 flex justify-center md:mt-10">
          <a
            href="#semua-berita"
            className="inline-flex h-12 items-center justify-center rounded-full bg-brand-primary px-8 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            Lihat Semua Informasi
          </a>
        </div>
      </Container>
    </section>
  );
}
