"use client";

import { 
  GraduationCap, 
  Buildings, 
  Bank, 
  UsersThree, 
  Flask, 
  Books, 
  Monitor, 
  Desktop, 
  WifiHigh, 
  Heartbeat, 
  MapTrifold,
  Handshake,
  CheckCircle,
  ArrowRight,
  Info
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  partnershipBenefits,
  partnershipDescription,
  partnershipPrograms,
  partnershipSteps,
  partnershipTypes,
} from "@/features/partnership/data/partnership-data";

const iconMap = {
  GraduationCap: GraduationCap,
  Buildings: Buildings,
  Bank: Bank,
  UsersThree: UsersThree,
  Flask: Flask,
  Books: Books,
  Monitor: Monitor,
  Desktop: Desktop,
  WifiHigh: WifiHigh,
  Heartbeat: Heartbeat,
  MapTrifold: MapTrifold,
};

export function PartnershipContent() {
  return (
    <div className="flex flex-col gap-20 font-sans">
      {/* Intro Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] border border-brand-primary/10 bg-gradient-to-br from-white via-emerald-50/20 to-teal-50/20 p-8 md:p-14 shadow-sm">
        <div className="absolute -right-20 -top-20 size-80 rounded-full bg-brand-primary/5 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 size-80 rounded-full bg-brand-secondary/5 blur-3xl" />
        
        <div className="relative flex flex-col items-center text-center">
          <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-brand-primary-soft text-brand-primary">
            <Handshake size={36} weight="duotone" />
          </div>
          <Badge variant="primary" className="mb-6 px-5 py-1.5 text-xs font-bold uppercase tracking-[0.2em]">
            Strategic Collaboration
          </Badge>
          <h2 className="max-w-4xl text-3xl font-extrabold leading-tight text-neutral-900 md:text-4xl lg:text-5xl">
            Sinergi Membangun <span className="text-brand-primary">Generasi Unggul.</span>
          </h2>
          <div className="mt-10 grid max-w-4xl gap-6 text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
            <p className="font-semibold text-neutral-900">
              {partnershipDescription.main}
            </p>
            <p>
              {partnershipDescription.sub}
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Types Grid */}
      <section className="space-y-12">
        <div className="flex flex-col items-center text-center">
          <Badge variant="glass" className="mb-4">Partner Categories</Badge>
          <h3 className="text-3xl font-extrabold text-neutral-900 md:text-4xl">Jenis-Jenis Kemitraan</h3>
          <p className="mt-4 max-w-2xl text-neutral-500">
            Kolaborasi kami mencakup berbagai sektor untuk memastikan ekosistem pendidikan yang holistik.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {partnershipTypes.map((type) => {
            const IconComponent = iconMap[type.icon as keyof typeof iconMap] || Info;
            return (
              <Card 
                key={type.title}
                variant="glass"
                className="group relative overflow-hidden p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-primary/5"
              >
                <div className="absolute -right-6 -top-6 size-24 rounded-full bg-brand-primary/5 transition-all group-hover:bg-brand-primary/10" />
                <div className="mb-6 flex size-14 items-center justify-center rounded-xl bg-brand-primary-soft text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors duration-500">
                  <IconComponent size={28} weight="duotone" />
                </div>
                <h4 className="text-lg font-extrabold text-neutral-900 group-hover:text-brand-primary transition-colors leading-tight">
                  {type.title}
                </h4>
                <p className="mt-4 text-xs leading-6 text-neutral-600 font-medium">
                  {type.description}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Partnership Programs Section */}
      <section className="space-y-12">
        <div className="flex flex-col items-center text-center">
          <Badge variant="glass" className="mb-4">Featured Collaborations</Badge>
          <h3 className="text-3xl font-extrabold text-neutral-900 md:text-4xl">Program Kerja Sama</h3>
          <p className="mt-4 max-w-2xl text-neutral-500">
            Daftar program kolaborasi yang telah dan sedang berjalan dengan mitra strategis SMANSA.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {partnershipPrograms.map((item, i) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Info;
            return (
              <Card key={i} variant="glass-soft" className="flex flex-col p-6 group hover:border-brand-primary/30 transition-all duration-300">
                <div className="flex items-center gap-4 mb-5">
                   <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-white/60 text-brand-primary shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
                      <IconComponent size={24} weight="duotone" />
                   </div>
                   <div className="min-w-0">
                      <h4 className="text-base font-bold text-neutral-900 truncate">{item.program}</h4>
                      <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest truncate">{item.partner}</p>
                   </div>
                </div>
                <p className="text-sm leading-6 text-neutral-600 flex-1">
                   {item.benefit}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Benefits for Stakeholders */}
      <section className="space-y-12">
        <div className="flex flex-col items-center text-center">
          <Badge variant="primary" className="mb-4">Advantages</Badge>
          <h3 className="text-3xl font-extrabold text-neutral-900 md:text-4xl">Keuntungan Kolaborasi</h3>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {partnershipBenefits.map((benefit, i) => (
            <Card key={i} variant="glass" className="p-8 relative overflow-hidden border-brand-primary/5">
              <div className="absolute top-0 right-0 p-2 opacity-5">
                <CheckCircle size={80} weight="fill" />
              </div>
              <h4 className="text-xl font-extrabold text-brand-primary mb-6 flex items-center gap-2">
                <SparkleIcon className="size-5" />
                {benefit.target}
              </h4>
              <ul className="space-y-4">
                {benefit.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <ArrowRight size={14} weight="bold" className="mt-1 text-brand-primary shrink-0" />
                    <span className="text-sm font-medium text-neutral-700 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* How to Partner - Steps */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-neutral-900 p-8 md:p-14 text-white shadow-2xl">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-brand-primary/10 blur-[100px] pointer-events-none" />
        <div className="relative grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-center">
          <div className="space-y-6">
            <Badge variant="primary" className="bg-white/10 text-white border-white/20">Partnership Flow</Badge>
            <h3 className="text-3xl font-extrabold md:text-4xl">Menjadi Mitra Kami</h3>
            <p className="text-neutral-400 leading-relaxed max-w-md">
              Kami menyambut baik setiap inisiatif kolaborasi yang sejalan dengan visi digital dan pendidikan unggul SMANSA.
            </p>
            <div className="flex flex-col gap-4 pt-4">
               <div className="flex items-center gap-3 text-sm font-bold">
                  <CheckCircle size={20} className="text-brand-primary" weight="fill" />
                  Sesuai Visi Pendidikan Digital
               </div>
               <div className="flex items-center gap-3 text-sm font-bold">
                  <CheckCircle size={20} className="text-brand-primary" weight="fill" />
                  Dampak Positif Jangka Panjang
               </div>
            </div>
          </div>

          <div className="grid gap-6">
            {partnershipSteps.map((step, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-white/20 bg-white/5 font-black text-white group-hover:border-brand-primary group-hover:bg-brand-primary transition-all duration-500">
                  {i + 1}
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-extrabold group-hover:text-brand-primary transition-colors">{step.title}</h4>
                  <p className="text-sm text-neutral-400 leading-6">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707" />
    </svg>
  );
}
