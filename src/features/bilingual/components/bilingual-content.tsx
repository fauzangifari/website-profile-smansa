"use client";

import { 
  ChatCircleText, 
  GlobeHemisphereWest, 
  Campfire, 
  Tree, 
  CheckCircle, 
  Calendar,
  Sparkle,
  Globe,
  Translate
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  bilingualBenefits,
  bilingualDescription,
  bilingualPrograms,
  bilingualTimeline,
} from "@/features/bilingual/data/bilingual-data";

const iconMap = {
  ChatCircleText: ChatCircleText,
  GlobeHemisphereWest: GlobeHemisphereWest,
  Campfire: Campfire,
  Tree: Tree,
};

export function BilingualContent() {
  return (
    <div className="flex flex-col gap-20 font-sans">
      {/* Intro Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] border border-brand-primary/10 bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/20 p-8 md:p-14 shadow-sm">
        <div className="absolute -right-20 -top-20 size-80 rounded-full bg-brand-primary/5 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 size-80 rounded-full bg-brand-secondary/5 blur-3xl" />
        
        <div className="relative flex flex-col items-center text-center">
          <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-brand-primary-soft text-brand-primary">
            <Translate size={36} weight="duotone" />
          </div>
          <Badge variant="primary" className="mb-6 px-5 py-1.5 text-xs font-bold uppercase tracking-[0.2em]">
            Global Competence
          </Badge>
          <h2 className="max-w-4xl text-3xl font-extrabold leading-tight text-neutral-900 md:text-4xl lg:text-5xl">
            Bridging Cultures, <span className="text-brand-primary">Mastering Languages.</span>
          </h2>
          <div className="mt-10 grid max-w-4xl gap-6 text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
            {bilingualDescription.map((p, i) => (
              <p key={i} className={cn(i === 0 ? "font-semibold text-neutral-900" : "")}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="space-y-12">
        <div className="flex flex-col items-center text-center">
          <Badge variant="glass" className="mb-4">Core Programs</Badge>
          <h3 className="text-3xl font-extrabold text-neutral-900 md:text-4xl">Pilar Program Bilingual</h3>
          <p className="mt-4 max-w-2xl text-neutral-500">
            Empat pilar utama yang dirancang untuk mengasah kemampuan bahasa dan wawasan global siswa secara komprehensif.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {bilingualPrograms.map((program) => {
            const IconComponent = iconMap[program.icon as keyof typeof iconMap] || Globe;
            return (
              <Card 
                key={program.title}
                variant="glass"
                className="group relative overflow-hidden p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-primary/5"
              >
                <div className="absolute -right-6 -top-6 size-24 rounded-full bg-brand-primary/5 transition-all group-hover:bg-brand-primary/10" />
                <div className="mb-6 flex size-14 items-center justify-center rounded-xl bg-brand-primary-soft text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors duration-500">
                  <IconComponent size={28} weight="duotone" />
                </div>
                <h4 className="text-xl font-extrabold text-neutral-900 group-hover:text-brand-primary transition-colors">
                  {program.title}
                </h4>
                <p className="mt-4 text-sm leading-7 text-neutral-600 font-medium">
                  {program.description}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Benefits & Partners */}
      <section className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-8">
          <div>
            <Badge variant="primary" className="mb-4">Advantages</Badge>
            <h3 className="text-3xl font-extrabold text-neutral-900 md:text-4xl">Mengapa Memilih Program Bilingual?</h3>
          </div>
          <div className="grid gap-4">
            {bilingualBenefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <div className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                  <CheckCircle size={16} weight="fill" />
                </div>
                <p className="text-base font-medium text-neutral-700 leading-relaxed">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Card variant="glass-soft" className="relative overflow-hidden p-8 lg:p-12">
           <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent" />
           <div className="relative space-y-8">
              <div className="flex items-center gap-3">
                 <Sparkle size={32} weight="duotone" className="text-brand-secondary" />
                 <h4 className="text-xl font-extrabold text-neutral-900">Kolaborasi Internasional</h4>
              </div>
              <p className="text-sm leading-7 text-neutral-600">
                Program kami didukung oleh institusi global terkemuka untuk memastikan kualitas kurikulum dan jangkauan koneksi internasional yang nyata.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                 <div className="flex flex-col gap-2 p-4 rounded-xl border border-white/60 bg-white/40 backdrop-blur-sm">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">Partner Jepang</span>
                    <span className="text-sm font-extrabold text-neutral-900">METI & Monbukagakusho</span>
                 </div>
                 <div className="flex flex-col gap-2 p-4 rounded-xl border border-white/60 bg-white/40 backdrop-blur-sm">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">Psychology Consultant</span>
                    <span className="text-sm font-extrabold text-neutral-900">PT. Mustika</span>
                 </div>
              </div>
              <div className="pt-6 border-t border-neutral-200/50">
                 <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Global Connection Established</p>
                 <div className="mt-3 flex -space-x-2">
                    {[1,2,3,4].map(i => (
                       <div key={i} className="size-8 rounded-full border-2 border-white bg-neutral-100 flex items-center justify-center overflow-hidden">
                          <Globe size={16} weight="duotone" className="text-brand-primary/40" />
                       </div>
                    ))}
                    <div className="size-8 rounded-full border-2 border-white bg-brand-primary text-[10px] font-bold text-white flex items-center justify-center">
                       +30
                    </div>
                 </div>
              </div>
           </div>
        </Card>
      </section>

      {/* Timeline Section */}
      <section className="space-y-16 pb-10">
        <div className="flex flex-col items-center text-center">
          <Badge variant="glass" className="mb-4">Roadmap 2025/2026</Badge>
          <h3 className="text-3xl font-extrabold text-neutral-900 md:text-4xl">Timeline Program Bilingual</h3>
          <p className="mt-4 max-w-2xl text-neutral-500">
            Rangkaian kegiatan terstruktur dari seleksi hingga implementasi kolaborasi global.
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl px-4">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-brand-primary/30 via-brand-primary/30 to-transparent md:left-1/2" />
          
          <div className="space-y-12">
            {bilingualTimeline.map((item, index) => {
              const isEven = index % 2 === 0;
              const isDone = item.status === "done";

              return (
                <div 
                  key={index}
                  className={cn(
                    "relative flex flex-col md:flex-row md:justify-between items-start md:items-center",
                    !isEven && "md:flex-row-reverse"
                  )}
                >
                  {/* Timeline Node */}
                  <div className={cn(
                    "absolute left-8 md:left-1/2 z-10 flex size-10 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white shadow-lg transition-transform hover:scale-110",
                    isDone ? "bg-brand-primary text-white" : "bg-white text-brand-primary border-brand-primary/20"
                  )}>
                    {isDone ? <CheckCircle size={20} weight="bold" /> : <Calendar size={20} weight="bold" />}
                  </div>

                  {/* Content Card */}
                  <div className={cn(
                    "ml-16 md:ml-0 w-full md:w-[42%]",
                    isEven ? "md:text-right" : "md:text-left"
                  )}>
                    <div className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/50 p-6 shadow-xl shadow-neutral-900/5 backdrop-blur-md transition-all hover:bg-white/80">
                      <div className={cn(
                        "flex items-center gap-2 mb-3",
                        isEven ? "md:flex-row-reverse" : "md:flex-row"
                      )}>
                        <Badge variant={isDone ? "primary" : "glass"} className="text-[10px]">
                          {item.date}
                        </Badge>
                      </div>
                      <h4 className="text-lg font-extrabold text-neutral-900 group-hover:text-brand-primary transition-colors">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-neutral-600 font-medium">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Empty space for md+ alignment */}
                  <div className="hidden md:block md:w-[42%]" />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
