"use client";

import Image from "next/image";
import { 
  NON_AKADEMIK_CATEGORIES, 
  NON_AKADEMIK_PHILOSOPHY 
} from "../data/non-akademik-data";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "@phosphor-icons/react";
import { VisualPlaceholder } from "@/features/landing/components/visual-placeholder";

export function NonAkademikContent() {
  return (
    <div className="flex flex-col gap-20">
      {/* Philosophy Section */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow="Filosofi SMANSA"
              title={NON_AKADEMIK_PHILOSOPHY.title}
              description={NON_AKADEMIK_PHILOSOPHY.description}
              className="mb-8"
            />
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {NON_AKADEMIK_PHILOSOPHY.goals.map((goal, index) => (
                <Card key={index} variant="glass-soft" className="flex flex-col gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary-soft text-brand-primary">
                    <goal.icon size={20} weight="bold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900">{goal.title}</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {goal.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="relative w-full lg:col-span-5">
            <VisualPlaceholder 
              label="Filosofi Non-Akademik SMANSA" 
              variant="hero"
              className="shadow-2xl"
            />
            
            {/* Decorative Glass Element */}
            <div className="absolute -bottom-6 -left-6 hidden md:block w-32 h-32 rounded-2xl glass-strong z-10 animate-pulse-subtle" />
            <div className="absolute -top-6 -right-6 hidden md:block w-24 h-24 rounded-full glass-soft z-10" />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {NON_AKADEMIK_CATEGORIES.map((category) => (
        <section key={category.id} className="flex flex-col gap-10">
          <SectionHeader
            eyebrow={category.title}
            title={`Ekstrakurikuler ${category.title}`}
            description={category.description}
            align="center"
          />
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {category.activities.map((activity) => (
              <Card 
                key={activity.id} 
                variant="glass" 
                className="group flex flex-col overflow-hidden p-0 h-full border-white/20 hover:border-brand-primary/30"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <VisualPlaceholder 
                    label={activity.name}
                    variant="wide"
                    className="border-none rounded-none shadow-none"
                  />
                  
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <activity.icon size={32} weight="duotone" />
                    </div>
                  </div>
                  
                  <div className="absolute left-4 top-4">
                    <Badge variant="glass" className="bg-white/80 backdrop-blur-md">
                      <activity.icon size={12} className="mr-1.5" />
                      {category.title}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex flex-grow flex-col p-6">
...
                  <h3 className="mb-2 text-xl font-bold text-neutral-900 group-hover:text-brand-primary transition-colors">
                    {activity.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600">
                    {activity.description}
                  </p>
                  
                  <div className="mt-auto pt-6">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-primary opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                      <span>Lihat Detail</span>
                      <ArrowRight size={16} weight="bold" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      ))}
      
      {/* Call to Action */}
      <Card variant="glass-strong" className="p-8 md:p-12 text-center flex flex-col items-center gap-6 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-brand-accent" />
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl" />
        
        <Badge variant="primary">Bergabunglah Sekarang</Badge>
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 max-w-2xl">
          Siap Menemukan Bakat Terbaikmu di SMANSA?
        </h2>
        <p className="text-neutral-600 max-w-xl">
          Setiap siswa memiliki panggungnya masing-masing. Jadilah bagian dari komunitas kreatif dan berprestasi kami.
        </p>
        <button className="px-8 py-3 bg-brand-primary text-white rounded-full font-bold shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/40 transition-all hover:scale-105">
          Lihat Jadwal Ekstrakurikuler
        </button>
      </Card>
    </div>
  );
}
