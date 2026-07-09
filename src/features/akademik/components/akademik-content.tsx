"use client";

import { 
  Target, 
  GraduationCap, 
  Users, 
  Lightning,
  Sparkle,
  BookOpen,
  ArrowRight,
  Globe,
  Flask,
  PresentationChart,
  Brain
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { VisualPlaceholder } from "@/features/landing/components/visual-placeholder";
import {
  akademikDescription,
  akademikPillar,
  akademikBenefits,
  akademikClubs,
} from "@/features/akademik/data/akademik-data";

const iconMap = {
  Target: Target,
  GraduationCap: GraduationCap,
  Users: Users,
};

const clubIconMap: Record<string, any> = {
  "ekonomi": PresentationChart,
  "kebumian": Globe,
  "kimia": Flask,
  "debat-indonesia": Brain,
};

export function AkademikContent() {
  return (
    <div className="flex flex-col gap-24 font-sans">
      {/* Intro Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] border border-brand-primary/10 bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/20 p-8 md:p-14 shadow-sm">
        <div className="absolute -right-20 -top-20 size-80 rounded-full bg-brand-primary/5 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 size-80 rounded-full bg-brand-secondary/5 blur-3xl" />
        
        <div className="relative flex flex-col items-center text-center">
          <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-brand-primary-soft text-brand-primary">
            <BookOpen size={36} weight="duotone" />
          </div>
          <Badge variant="primary" className="mb-6 px-5 py-1.5 text-xs font-bold uppercase tracking-[0.2em]">
            Holistic Education
          </Badge>
          <h2 className="max-w-4xl text-3xl font-extrabold leading-tight text-neutral-900 md:text-4xl lg:text-5xl">
            Melampaui Batas Kelas, <span className="text-brand-primary">Mengukir Prestasi Nyata.</span>
          </h2>
          <div className="mt-10 grid max-w-3xl gap-6 text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
            {akademikDescription.map((p, i) => (
              <p key={i} className={cn(i === 1 ? "font-semibold text-neutral-900" : "")}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy & Benefits */}
      <section className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <Badge variant="glass">{akademikPillar.title}</Badge>
            <h3 className="text-3xl font-extrabold text-neutral-900 md:text-4xl leading-tight">
              Pilar Utama <span className="text-brand-primary">Pengayaan</span> Intelektual
            </h3>
            <p className="text-neutral-600 font-medium leading-relaxed">
              {akademikPillar.description}
            </p>
          </div>

          <div className="space-y-4">
            {akademikBenefits.map((benefit, i) => {
              const IconComponent = iconMap[benefit.icon as keyof typeof iconMap] || Sparkle;
              return (
                <div key={i} className="flex items-start gap-4 p-4 rounded-lg transition-all hover:bg-white hover:shadow-xl hover:shadow-neutral-900/5 group border border-transparent hover:border-neutral-100">
                  <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary-soft text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                    <IconComponent size={20} weight="duotone" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-neutral-900 group-hover:text-brand-primary transition-colors">
                      {benefit.title}
                    </h4>
                    <p className="mt-1 text-sm text-neutral-500 font-medium leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-3">
          <Card variant="glass-soft" className="relative h-full overflow-hidden p-8 md:p-12 flex flex-col justify-center">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-10" 
              style={{ backgroundImage: "url('https://placehold.co/1200x800/f1f5f9/64748b.png?text=SMANSA+EXCELLENCE')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-transparent to-brand-secondary/5" />
            
            <div className="relative space-y-8">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-white shadow-xl shadow-brand-primary/10 text-brand-primary">
                <Lightning size={28} weight="fill" />
              </div>
              <blockquote className="text-xl md:text-2xl font-extrabold italic text-neutral-900 leading-relaxed">
                "{akademikPillar.cta}"
              </blockquote>
              <div className="flex items-center gap-4 pt-4">
                <div className="h-px flex-1 bg-gradient-to-r from-brand-primary to-transparent" />
                <Badge variant="primary" className="px-6 py-2">Join Smansa Excellence</Badge>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Clubs Grid */}
      <section className="space-y-16">
        <div className="flex flex-col items-center text-center space-y-4">
          <Badge variant="glass">Academic Clubs</Badge>
          <h3 className="text-3xl font-extrabold text-neutral-900 md:text-4xl lg:text-5xl">
            Klub <span className="text-brand-primary">Spesialisasi</span> Kami
          </h3>
          <p className="max-w-2xl text-neutral-500 font-medium">
            Wadah kolaborasi bagi para calon ilmuwan dan pemikir kritis masa depan untuk mengasah kemampuan di bidang yang diminati.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {akademikClubs.map((club) => {
            const Icon = clubIconMap[club.slug] || Sparkle;
            return (
              <Card 
                key={club.slug} 
                variant="glass" 
                className="group flex flex-col overflow-hidden p-0 h-full border-white/20 hover:border-brand-primary/30"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <VisualPlaceholder 
                    label={club.title}
                    variant="wide"
                    className="border-none rounded-none shadow-none"
                  />
                  
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Icon size={32} weight="duotone" />
                    </div>
                  </div>
                  
                  <div className="absolute left-4 top-4">
                    <Badge variant="glass" className="bg-white/80 backdrop-blur-md">
                      <Icon size={12} className="mr-1.5" />
                      Akademik
                    </Badge>
                  </div>
                </div>
                
                <div className="flex flex-grow flex-col p-6">
                  <h3 className="mb-2 text-xl font-bold text-neutral-900 group-hover:text-brand-primary transition-colors">
                    {club.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600">
                    {club.description}
                  </p>
                  
                  <div className="mt-auto pt-6">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-primary opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                      <span>Learn More</span>
                      <ArrowRight size={16} weight="bold" />
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Call to Action Footer Card */}
      <section className="pb-12">
        <Card variant="glass" className="relative overflow-hidden p-8 md:p-16 border-brand-primary/20 bg-brand-primary/[0.02]">
           <div className="absolute -right-24 -bottom-24 size-96 rounded-full bg-brand-primary/5 blur-3xl" />
           <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6 text-center lg:text-left">
                 <h3 className="text-3xl font-extrabold text-neutral-900 md:text-4xl">
                   Siap Menjadi <span className="text-brand-primary">Juara</span> Berikutnya?
                 </h3>
                 <p className="text-neutral-600 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                   Jangan lewatkan kesempatan untuk bergabung dengan komunitas elit pembelajar di SMAN 1 Samarinda. Pendaftaran ekskul dibuka setiap awal semester.
                 </p>
                 <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-100 shadow-sm">
                       <Sparkle size={16} className="text-brand-secondary" weight="fill" />
                       <span className="text-xs font-bold text-neutral-700">OSN Preparation</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-100 shadow-sm">
                       <Lightning size={16} className="text-amber-400" weight="fill" />
                       <span className="text-xs font-bold text-neutral-700">Intensive Bootcamp</span>
                    </div>
                 </div>
              </div>
              
              <div className="flex justify-center lg:justify-end">
                 <button className="group relative flex h-20 w-full max-w-xs items-center justify-center overflow-hidden rounded-2xl bg-brand-primary text-white shadow-2xl shadow-brand-primary/20 transition-all hover:scale-[1.02] active:scale-95">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full transition-transform duration-1000 group-hover:translate-x-full" />
                    <span className="relative flex items-center gap-3 text-lg font-extrabold">
                       Daftar Sekarang <ArrowRight size={24} weight="bold" />
                    </span>
                 </button>
              </div>
           </div>
        </Card>
      </section>
    </div>
  );
}
