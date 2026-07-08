"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Buildings,
  Globe,
  GraduationCap,
  MapPinLine,
  SealCheck,
  Star,
  User,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";
import {
  historicalFigures,
  historyDescription,
  historyMilestones,
} from "@/features/history/data/history-data";

const iconMap = {
  Buildings: Buildings,
  Globe: Globe,
  GraduationCap: GraduationCap,
  MapPinLine: MapPinLine,
  SealCheck: SealCheck,
  Star: Star,
};

export function HistoryContent() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const introRef = useScrollReveal();
  const timelineRef = useScrollReveal();
  const leadersRef = useScrollReveal();

  // Auto-play logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;
        
        if (scrollLeft >= maxScroll - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 340, behavior: "smooth" });
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col gap-16 font-sans">
      {/* Intro Section */}
      <section
        ref={introRef}
        className="scroll-reveal relative overflow-hidden rounded-[2rem] border border-brand-primary/10 bg-gradient-to-br from-white via-blue-50/30 to-emerald-50/30 p-8 md:p-12 shadow-sm"
      >
        <div className="absolute -right-20 -top-20 size-64 rounded-full bg-brand-primary/5 blur-3xl" />
        <div className="relative flex flex-col items-center text-center">
          <Badge variant="primary" className="mb-6 px-4 py-1 text-sm font-bold uppercase tracking-widest">
            Sekilas Sejarah
          </Badge>
          <h2 className="max-w-3xl text-2xl font-extrabold leading-tight text-neutral-900 md:text-3xl lg:text-4xl">
            Menelusuri Jejak Pengabdian dan Kecemerlangan Pendidikan di Samarinda.
          </h2>
          <div className="mt-8 grid max-w-3xl gap-6 text-base leading-8 text-neutral-700 md:text-lg">
            {historyDescription.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Vertical Timeline */}
      <section ref={timelineRef} className="scroll-reveal relative px-4">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-brand-primary/10 via-brand-primary/30 to-transparent md:block hidden" />
        
        <div className="space-y-12 md:space-y-24">
          {historyMilestones.map((milestone, index) => {
            const IconComponent = iconMap[milestone.icon as keyof typeof iconMap] || Buildings;
            const isEven = index % 2 === 0;

            return (
              <div
                key={milestone.year}
                className={cn(
                  "relative flex flex-col items-center md:flex-row md:justify-between",
                  isEven ? "md:flex-row-reverse" : ""
                )}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 top-0 z-10 hidden size-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-brand-primary-soft shadow-md md:flex">
                  <IconComponent size={20} weight="duotone" className="text-brand-primary" />
                </div>

                {/* Content Card */}
                <div className={cn(
                  "w-full md:w-[45%]",
                  isEven ? "md:text-left" : "md:text-right"
                )}>
                  <Card className="group relative overflow-hidden border-brand-primary/10 bg-white/60 p-6 backdrop-blur-md transition-all duration-500 hover:border-brand-primary/30 hover:shadow-xl hover:shadow-brand-primary/5">
                    <div className="absolute -right-10 -top-10 size-24 rounded-full bg-brand-primary/5 transition-all group-hover:bg-brand-primary/10" />
                    
                    <div className={cn(
                      "flex items-center gap-3 md:hidden mb-4",
                      isEven ? "flex-row" : "flex-row-reverse"
                    )}>
                       <div className="grid size-10 place-items-center rounded-xl bg-brand-primary-soft text-brand-primary">
                        <IconComponent size={20} weight="duotone" />
                      </div>
                      <Badge variant="glass" className="font-bold">{milestone.year}</Badge>
                    </div>

                    <div className="hidden md:block">
                       <Badge variant="glass" className="mb-3 font-bold">{milestone.year}</Badge>
                    </div>
                    
                    <h3 className="text-xl font-extrabold text-neutral-900 group-hover:text-brand-primary transition-colors">
                      {milestone.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-neutral-600 font-medium">
                      {milestone.description}
                    </p>
                  </Card>
                </div>

                {/* Empty space for md+ */}
                <div className="hidden md:block md:w-[45%]" />
              </div>
            );
          })}
        </div>
      </section>

      {/* Leaders Carousel */}
      <section ref={leadersRef} className="scroll-reveal space-y-12">
        <div className="flex flex-col items-center text-center">
          <Badge variant="primary" className="mb-4">Kepemimpinan</Badge>
          <h3 className="text-2xl font-extrabold text-neutral-900 md:text-4xl">Kepala Sekolah Dari Masa ke Masa</h3>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-500">
            Dedikasi para pimpinan yang telah membawa SMA Negeri 1 Samarinda menjadi mercusuar pendidikan di Kalimantan Timur.
          </p>
        </div>
        
        <div 
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Floating Navigation Buttons - Integrated Design */}
          <div className="absolute -left-4 top-1/2 z-20 -translate-y-1/2 opacity-0 transition-all duration-300 group-hover:left-4 group-hover:opacity-100 hidden md:block">
            <Button
              variant="glass"
              size="icon"
              className="size-14 rounded-full border border-white/40 bg-white/20 text-neutral-900 shadow-2xl backdrop-blur-xl transition-all hover:bg-brand-primary hover:text-white hover:border-brand-primary hover:scale-110 active:scale-95"
              onClick={() => scroll("left")}
            >
              <CaretLeft size={24} weight="bold" />
            </Button>
          </div>

          <div className="absolute -right-4 top-1/2 z-20 -translate-y-1/2 opacity-0 transition-all duration-300 group-hover:right-4 group-hover:opacity-100 hidden md:block">
            <Button
              variant="glass"
              size="icon"
              className="size-14 rounded-full border border-white/40 bg-white/20 text-neutral-900 shadow-2xl backdrop-blur-xl transition-all hover:bg-brand-primary hover:text-white hover:border-brand-primary hover:scale-110 active:scale-95"
              onClick={() => scroll("right")}
            >
              <CaretRight size={24} weight="bold" />
            </Button>
          </div>

          {/* Mobile Navigation - Subtle Indicators */}
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-neutral-50/50 to-transparent pointer-events-none md:hidden" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-neutral-50/50 to-transparent pointer-events-none md:hidden" />

          {/* Scroll Container */}
          <div 
            ref={scrollRef}
            className="flex gap-8 overflow-x-hidden pb-12 pt-4 px-4 snap-x snap-mandatory"
          >
            {historicalFigures.map((figure, i) => (
              <div key={i} className="min-w-[300px] md:min-w-[340px] snap-center">
                <Card className="group/card relative flex h-full flex-col overflow-hidden border-0 bg-white shadow-2xl transition-all duration-700 hover:-translate-y-4">
                  {/* Photo Section with Overlay */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                    {figure.image ? (
                      <Image
                        src={figure.image}
                        alt={figure.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-200">
                        <User size={80} weight="duotone" className="text-neutral-300 opacity-50" />
                      </div>
                    )}
                    
                    {/* Elegant Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity group-hover/card:opacity-80" />
                    
                    {/* Period Badge on Image */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="inline-flex items-center rounded-lg bg-brand-primary/90 px-3 py-1.5 backdrop-blur-md shadow-lg">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white">{figure.period}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="relative flex flex-1 flex-col p-8 bg-white transition-colors duration-500 group-hover/card:bg-neutral-50">
                    {/* Accent Line */}
                    <div className="absolute top-0 left-8 right-8 h-1 w-12 -translate-y-1/2 bg-brand-primary rounded-full transition-all duration-500 group-hover/card:w-20" />
                    
                    <h4 className="text-xl font-extrabold text-neutral-900 tracking-tight group-hover/card:text-brand-primary transition-colors">
                      {figure.name}
                    </h4>
                    <p className="mt-2 text-xs font-bold text-neutral-400 uppercase tracking-[0.25em]">
                      {figure.role}
                    </p>
                    
                    <div className="mt-6 flex items-center justify-between">
                       <span className="text-[0.65rem] font-bold text-neutral-300 uppercase tracking-widest">SMANSA Legacy</span>
                       <div className="size-8 rounded-full border border-neutral-100 flex items-center justify-center text-neutral-300 group-hover/card:border-brand-primary/30 group-hover/card:text-brand-primary transition-all duration-500">
                          <span className="text-[10px] font-black italic">#{String(i + 1).padStart(2, '0')}</span>
                       </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Auto-play indicator & Mobile Navigation */}
        <div className="flex items-center justify-center gap-6">
          <Button
            variant="glass"
            size="icon"
            className="md:hidden size-10 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary hover:bg-brand-primary hover:text-white transition-all active:scale-95"
            onClick={() => scroll("left")}
            aria-label="Previous"
          >
            <CaretLeft size={20} weight="bold" />
          </Button>

          <div className="h-[2px] w-32 md:w-48 rounded-full bg-neutral-100 overflow-hidden relative">
            <div className="absolute inset-0 bg-brand-primary/20" />
            {!isPaused && <div className="h-full bg-brand-primary animate-progress-fast" />}
          </div>

          <Button
            variant="glass"
            size="icon"
            className="md:hidden size-10 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary hover:bg-brand-primary hover:text-white transition-all active:scale-95"
            onClick={() => scroll("right")}
            aria-label="Next"
          >
            <CaretRight size={20} weight="bold" />
          </Button>
        </div>
      </section>
    </div>
  );
}
