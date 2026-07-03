"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ctaJoin } from "@/features/landing/data/landing-data";
import { ArrowRight, Sparkle, RocketLaunch } from "@phosphor-icons/react";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

export function CtaSpmbSection() {
  const contentRef = useScrollReveal({ stagger: true });

  return (
    <section 
      id="spmb" 
      className="py-32 lg:py-48 relative overflow-hidden bg-neutral-950"
    >
      {/* Futuristic Background Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-[-10%] bg-[radial-gradient(circle_at_20%_30%,#2563eb_0%,transparent_50%),radial-gradient(circle_at_80%_70%,#0f766e_0%,transparent_50%)] opacity-20 blur-[60px]" 
        />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'radial-gradient(white 1px, transparent 1px)', 
            backgroundSize: '32px 32px' 
          }} 
        />
      </div>

      <Container className="relative">
        <div ref={contentRef} className="scroll-reveal-stagger flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Animated Rocket Badge */}
          <div className="scroll-reveal mb-10 relative" style={{ "--stagger-index": 0 } as React.CSSProperties}>
            <div className="absolute inset-0 bg-brand-primary/10 blur-xl rounded-full" />
            <div className="relative size-24 bg-white/10 backdrop-blur-2xl rounded-[2rem] flex items-center justify-center text-white border border-white/20 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 group/icon">
              <RocketLaunch 
                size={48} 
                weight="duotone" 
                className="text-brand-primary drop-shadow-[0_0_10px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform duration-500" 
              />
            </div>
            
            {/* Floating Sparkles */}
            <Sparkle size={20} weight="fill" className="absolute -top-4 -right-4 text-brand-accent opacity-40 animate-pulse" />
            <Sparkle size={14} weight="fill" className="absolute top-12 -left-8 text-white opacity-20 animate-pulse" />
          </div>
          
          <h2 className="scroll-reveal text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-8 tracking-tight" style={{ "--stagger-index": 1 } as React.CSSProperties}>
            Tentukan <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-emerald-400">Masa Depanmu</span> <br className="hidden md:block" />di SMANSA
          </h2>
          
          <p className="scroll-reveal text-lg md:text-2xl text-white/60 mb-12 leading-relaxed max-w-2xl font-medium" style={{ "--stagger-index": 2 } as React.CSSProperties}>
            {ctaJoin.description}
          </p>

          <div className="scroll-reveal flex flex-col sm:flex-row items-center justify-center gap-6" style={{ "--stagger-index": 3 } as React.CSSProperties}>
            <Button 
              variant="secondary" 
              size="lg" 
              className="px-10 py-5 h-auto text-lg rounded-full group bg-white text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] border-none"
              iconRight={<ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />}
              onClick={() => window.location.href = ctaJoin.buttonHref}
            >
              Daftar Sekarang
            </Button>
            
            <a 
              href="/daftar-ulang" 
              className="group flex items-center gap-3 text-white/80 font-bold hover:text-white transition-colors py-4 px-6 rounded-full border border-white/10 hover:bg-white/5"
            >
              <span>Daftar Ulang</span>
              <div className="size-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-primary transition-colors duration-300">
                <ArrowRight size={16} />
              </div>
            </a>
          </div>
        </div>
      </Container>

      {/* Atmospheric Background Orbs */}
      <div 
        aria-hidden="true"
        className="absolute -top-48 -left-48 size-[400px] bg-brand-primary/5 rounded-full blur-[80px] pointer-events-none"
      />
      <div 
        aria-hidden="true"
        className="absolute -bottom-48 -right-48 size-[400px] bg-brand-secondary/5 rounded-full blur-[80px] pointer-events-none"
      />
    </section>
  );
}
