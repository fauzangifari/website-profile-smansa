"use client";

import {
  BookOpenText,
  Compass,
  GlobeHemisphereEast,
  Leaf,
  Lightning,
  ShieldCheck,
  Sparkle,
  TreeStructure,
  UsersThree,
  ArrowRight,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  missionItems,
  visionMissionFocusAreas,
  visionMissionSourceUrl,
  visionStatement,
} from "@/features/vision-mission/data/vision-mission-data";

const missionIcons = [
  ShieldCheck,
  BookOpenText,
  Lightning,
  UsersThree,
  TreeStructure,
  GlobeHemisphereEast,
  Leaf,
  Compass,
] as const;

const missionColors = [
  "text-blue-600 bg-blue-50 border-blue-100",
  "text-indigo-600 bg-indigo-50 border-indigo-100",
  "text-amber-600 bg-amber-50 border-amber-100",
  "text-emerald-600 bg-emerald-50 border-emerald-100",
  "text-rose-600 bg-rose-50 border-rose-100",
  "text-cyan-600 bg-cyan-50 border-cyan-100",
  "text-green-600 bg-green-50 border-green-100",
  "text-orange-600 bg-orange-50 border-orange-100",
] as const;

export function VisionMissionContent() {
  return (
    <div className="flex flex-col gap-8 font-sans">
      {/* Visi Section - Full Width Hero Bento */}
      <section className="group relative overflow-hidden rounded-[2rem] border border-brand-primary/10 bg-gradient-to-br from-white via-blue-50/30 to-emerald-50/30 p-8 md:p-12 lg:p-16 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-brand-primary/5">
        <div className="absolute -right-20 -top-20 size-64 rounded-full bg-brand-primary/5 blur-3xl transition-all duration-700 group-hover:bg-brand-primary/10" />
        <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-emerald-500/5 blur-3xl transition-all duration-700 group-hover:bg-emerald-500/10" />
        
        <div className="relative flex flex-col items-center text-center">
          <Badge variant="primary" className="mb-6 px-4 py-1 text-sm font-bold uppercase tracking-widest">
            Visi Sekolah
          </Badge>
          <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.15] text-neutral-900 md:text-3xl lg:text-5xl tracking-tight">
            {visionStatement}
          </h2>
          <div className="mt-8 flex items-center gap-3 text-brand-primary">
            <div className="h-px w-8 bg-brand-primary/30" />
            <Sparkle size={32} weight="duotone" className="animate-pulse" />
            <div className="h-px w-8 bg-brand-primary/30" />
          </div>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-600 font-medium">
            Komitmen kami untuk mencetak generasi unggul yang tidak hanya cerdas secara intelektual, 
            tetapi juga berkarakter kuat dan peduli pada keberlanjutan masa depan.
          </p>
        </div>
      </section>

      {/* Bento Grid Misi */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">

        {/* Misi 1 - Feature Card */}
        <MisiCard index={0} />

        {/* Misi 2 */}
        <MisiCard index={1} />

        {/* Misi 3 */}
        <MisiCard index={2} />

        {/* Misi 4 */}
        <MisiCard index={3} />

        {/* Misi 5 */}
        <MisiCard index={4} />

        {/* Misi 6 */}
        <MisiCard index={5} />

        {/* Misi 7 */}
        <MisiCard index={6} />

        {/* Misi 7 */}
        <MisiCard index={7} />

      </div>
    </div>
  );
}

function MisiCard({ 
  index, 
  className,
  isFeatured = false
}: { 
  index: number; 
  className?: string;
  isFeatured?: boolean;
}) {
  const item = missionItems[index];
  const Icon = missionIcons[index];
  const colorClass = missionColors[index];

  return (
    <Card className={cn(
      "group relative flex flex-col justify-between overflow-hidden border-neutral-200/60 bg-white/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-brand-primary/30 hover:shadow-lg hover:shadow-brand-primary/5",
      isFeatured && "md:p-8",
      className
    )}>
      <div>
        <div className="flex items-start justify-between">
          <div className={cn("grid size-12 place-items-center rounded-2xl border transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3", colorClass)}>
            <Icon size={24} weight="duotone" />
          </div>
          <span className="text-4xl font-extrabold text-neutral-100 transition-colors group-hover:text-brand-primary/5">
            {item.number}
          </span>
        </div>
        
        <h4 className={cn(
          "mt-6 font-extrabold text-neutral-900 group-hover:text-brand-primary transition-colors",
          isFeatured ? "text-2xl" : "text-xl leading-tight"
        )}>
          {item.title}
        </h4>
        <p className="mt-2 text-xs font-bold uppercase tracking-widest text-brand-primary/60">
          {item.theme}
        </p>
      </div>

      <p className={cn(
        "mt-6 text-neutral-600 leading-relaxed font-medium",
        isFeatured ? "text-base" : "text-sm"
      )}>
        {item.description}
      </p>

      {/* Decorative gradient corner */}
      <div className="absolute -bottom-10 -right-10 size-20 rounded-full bg-brand-primary/5 blur-2xl transition-opacity opacity-0 group-hover:opacity-100" />
    </Card>
  );
}
