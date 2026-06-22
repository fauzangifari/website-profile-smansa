"use client";

import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { reasonsData } from "@/features/landing/data/landing-data";
import {
  TrophyIcon,
  ChalkboardTeacherIcon,
  BuildingsIcon,
  ShieldCheckIcon,
  PaletteIcon,
  StudentIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

const iconMap: Record<string, React.ElementType> = {
  Trophy: TrophyIcon,
  ChalkboardTeacher: ChalkboardTeacherIcon,
  Buildings: BuildingsIcon,
  ShieldCheck: ShieldCheckIcon,
  Palette: PaletteIcon,
  Student: StudentIcon,
};

export function ReasonsSection() {
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal({ stagger: true });

  return (
    <section id="keunggulan" className="relative overflow-hidden bg-white py-[var(--section-padding-y)]">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/10 to-transparent"
      />

      <Container>
        <div ref={headerRef} className="scroll-reveal">
          <SectionHeader
            title="Alasan Memilih SMANSA"
            description="Komitmen kami untuk memberikan pengalaman pendidikan terbaik yang memadukan keunggulan akademik, pengembangan karakter, dan fasilitas modern."
            align="center"
            className="mb-12 lg:mb-16"
          />
        </div>

        <div ref={gridRef} className="scroll-reveal-stagger grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasonsData.map((reason, index) => {
            const Icon = iconMap[reason.iconName] || TrophyIcon;

            return (
              <div
                key={index}
                className="scroll-reveal group glass-soft relative flex flex-col items-center rounded-2xl p-8 text-center transition-[background-color,box-shadow,transform] duration-500 hover:-translate-y-2 hover:bg-white/80 hover:shadow-xl hover:shadow-brand-primary/10"
                style={{ "--stagger-index": index } as React.CSSProperties}
              >
                {/* Decorative background glow for the icon */}
                <div className="absolute top-8 size-16 rounded-full bg-brand-primary/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                
                <div className="relative mb-6 flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200/50 transition-transform duration-500 group-hover:scale-110 group-hover:ring-brand-primary/20">
                  <Icon
                    size={32}
                    weight="duotone"
                    className="text-brand-primary transition-colors duration-500 group-hover:text-brand-primary-hover"
                  />
                </div>

                <h3 className="mb-3 text-lg font-bold text-neutral-900 md:text-xl">
                  {reason.title}
                </h3>
                
                <p className="text-sm leading-relaxed text-neutral-600">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
