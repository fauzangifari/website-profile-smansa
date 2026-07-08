"use client";

import Image from "next/image";
import { 
  HandsPraying, 
  Users, 
  Brain, 
  Palette, 
  Handshake, 
  User, 
  Heartbeat, 
  ChatCircleText,
  Books,
  Clock,
  MapPin,
  CheckCircle,
  Lightbulb,
  ArrowRight
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";
import {
  graduateDimensions,
  kokurikulerDescription,
  projects,
  tkaProgram,
} from "@/features/kokurikuler/data/kokurikuler-data";

const iconMap = {
  HandsPraying: HandsPraying,
  Users: Users,
  Brain: Brain,
  Palette: Palette,
  Handshake: Handshake,
  User: User,
  Heartbeat: Heartbeat,
  ChatCircleText: ChatCircleText,
};

export function KokurikulerContent() {
  const introRef = useScrollReveal();
  const tkaRef = useScrollReveal();
  const dimensionsRef = useScrollReveal();
  const projectsRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <div className="flex flex-col gap-24 font-sans">
      {/* Introduction */}
      <section
        ref={introRef}
        className="scroll-reveal relative overflow-hidden rounded-[2.5rem] border border-brand-primary/10 bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/20 p-8 md:p-16 shadow-sm"
      >
        <div className="absolute -right-20 -top-20 size-96 rounded-full bg-brand-primary/5 blur-3xl" />
        <div className="relative flex flex-col items-center text-center">
          <Badge variant="primary" className="mb-6 px-5 py-1.5 text-xs font-bold uppercase tracking-[0.2em]">
            Overview
          </Badge>
          <h2 className="max-w-4xl text-3xl font-extrabold leading-tight text-neutral-900 md:text-5xl lg:text-6xl">
            Beyond the <span className="text-brand-primary">Curriculum.</span>
          </h2>
          <div className="mt-10 grid max-w-3xl gap-6 text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
            <p className="font-semibold text-neutral-900">{kokurikulerDescription.main}</p>
            <p>{kokurikulerDescription.sub}</p>
          </div>
        </div>
      </section>

      {/* TKA Program Section */}
      <section ref={tkaRef} className="scroll-reveal grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-8">
          <div>
            <Badge variant="glass" className="mb-4">Academic Preparation</Badge>
            <h3 className="text-3xl font-extrabold text-neutral-900 md:text-4xl">{tkaProgram.title}</h3>
            <p className="mt-4 text-neutral-600 leading-relaxed">
              {tkaProgram.description} <Badge variant="primary" className="ml-2">{tkaProgram.target}</Badge>
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card variant="glass" className="p-6">
              <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-brand-primary-soft text-brand-primary">
                <Books size={24} weight="duotone" />
              </div>
              <h4 className="font-bold text-neutral-900">Mata Pelajaran</h4>
              <ul className="mt-3 space-y-2">
                {tkaProgram.subjects.map((s) => (
                  <li key={s} className="text-sm font-medium text-neutral-600 flex items-center gap-2">
                    <CheckCircle size={14} className="text-brand-primary" /> {s}
                  </li>
                ))}
              </ul>
            </Card>
            <Card variant="glass" className="p-6">
              <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-brand-secondary/10 text-brand-secondary">
                <Clock size={24} weight="duotone" />
              </div>
              <h4 className="font-bold text-neutral-900">Jadwal & Lokasi</h4>
              <div className="mt-3 space-y-2 text-sm font-medium text-neutral-600">
                <p className="flex items-center gap-2"><Clock size={14} /> {tkaProgram.schedule.day}</p>
                <p className="flex items-center gap-2"><Clock size={14} /> {tkaProgram.schedule.time}</p>
                <p className="flex items-center gap-2"><MapPin size={14} /> {tkaProgram.schedule.location}</p>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-widest text-neutral-400">Manfaat Program</p>
            <div className="grid gap-3">
              {tkaProgram.benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="size-2 rounded-full bg-brand-primary" />
                  <p className="text-sm font-medium text-neutral-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative aspect-square overflow-hidden rounded-[2rem] border-8 border-white shadow-2xl">
          <Image 
            src="https://placehold.co/1200x1200/dbeafe/1e40af.png?text=Persiapan+TKA" 
            alt="Study Session"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 rounded-xl border border-white/30 bg-white/20 p-6 backdrop-blur-xl">
             <p className="text-sm font-bold text-white">"Success is where preparation and opportunity meet."</p>
          </div>
        </div>
      </section>

      {/* Graduate Dimensions Grid */}
      <section ref={dimensionsRef} className="scroll-reveal space-y-12">
        <div className="flex flex-col items-center text-center">
          <Badge variant="primary" className="mb-4">SMANSA Profile</Badge>
          <h3 className="text-3xl font-extrabold text-neutral-900 md:text-4xl">8 Dimensi Profil Lulusan</h3>
          <p className="mt-4 max-w-2xl text-neutral-500">
            Setiap kegiatan kokurikuler dirancang untuk memperkuat dimensi karakter berikut pada diri siswa.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
          {graduateDimensions.map((dim) => {
            const Icon = iconMap[dim.icon as keyof typeof iconMap] || Lightbulb;
            return (
              <Card key={dim.label} variant="glass-soft" className="flex flex-col items-center p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/20 hover:bg-white">
                <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-brand-primary-soft text-brand-primary">
                  <Icon size={32} weight="duotone" />
                </div>
                <h4 className="text-sm font-bold text-neutral-900 leading-snug">{dim.label}</h4>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="scroll-reveal space-y-16">
        <div className="flex flex-col items-center text-center">
          <Badge variant="glass" className="mb-4">Creative Projects</Badge>
          <h3 className="text-3xl font-extrabold text-neutral-900 md:text-4xl">Eksplorasi Melalui Proyek</h3>
          <p className="mt-4 max-w-2xl text-neutral-500">
            Wadah kolaborasi kreatif di mana siswa belajar melalui praktik langsung dan pemecahan masalah.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <Card key={i} variant="glass" className="group flex flex-col overflow-hidden border-0 p-0 shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-64 w-full overflow-hidden">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute left-6 top-6">
                   <Badge variant="primary" className="shadow-lg backdrop-blur-md bg-brand-primary/90">{project.category}</Badge>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-8">
                <h4 className="text-2xl font-extrabold text-neutral-900 group-hover:text-brand-primary transition-colors">{project.title}</h4>
                <p className="mt-4 flex-1 text-sm leading-7 text-neutral-600 font-medium">
                  {project.description}
                </p>
                <div className="mt-8 flex items-center justify-between">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Collaborative Project</span>
                   <div className="flex size-10 items-center justify-center rounded-full bg-neutral-50 text-neutral-300 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
                      <ArrowRight size={20} weight="bold" />
                   </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer Call-to-action */}
      <section ref={ctaRef} className="scroll-reveal relative overflow-hidden rounded-[2.5rem] bg-brand-primary p-12 text-center text-white md:p-20 shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="relative z-10 flex flex-col items-center">
          <Badge variant="glass" className="mb-8 border-white/20 bg-white/10 text-white">Join the Community</Badge>
          <h3 className="max-w-3xl text-3xl font-black md:text-5xl">Follow Our Journey</h3>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            Lihat hasil karya dan keseruan kegiatan kokurikuler kami melalui akun media sosial resmi sekolah.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
             <div className="flex items-center gap-3 rounded-full bg-white/10 px-6 py-3 border border-white/20 backdrop-blur-md">
                <ChatCircleText size={20} weight="fill" />
                <span className="text-sm font-bold">@kokurikuler_smansa</span>
             </div>
             <div className="flex items-center gap-3 rounded-full bg-white/10 px-6 py-3 border border-white/20 backdrop-blur-md">
                <Users size={20} weight="fill" />
                <span className="text-sm font-bold">SMANSA Creative Community</span>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
