"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { contactInfo } from "@/features/landing/data/landing-data";
import { MapPin, Phone, Envelope, Clock, ArrowUpRight, GlobeSimple } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

export function ContactLocationSection() {
  const headerRef = useScrollReveal();
  const cardsRef = useScrollReveal({ stagger: true });
  const mapRef = useScrollReveal();

  return (
    <section 
      id="kontak" 
      className="relative overflow-hidden bg-white py-32 lg:py-48"
    >
      {/* Decorative Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-[-5%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/5 rounded-full blur-[100px] opacity-40" 
        />
        <div 
          className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-brand-secondary/5 rounded-full blur-[100px] opacity-30" 
        />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 xl:gap-24 items-start">
          
          {/* Header & Info Column */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div ref={headerRef} className="scroll-reveal">
              <SectionHeader
                eyebrow="Hubungi Kami"
                title="Menjalin Koneksi, Membangun Sinergi"
                className="max-w-xl"
              />
            </div>

            <div ref={cardsRef} className="scroll-reveal-stagger grid gap-5">
              <ContactCard 
                icon={<MapPin size={24} weight="duotone" />}
                title="Alamat Kampus"
                content={contactInfo.address}
                href="https://maps.google.com"
                staggerIndex={0}
              />
              <ContactCard 
                icon={<Phone size={24} weight="duotone" />}
                title="Saluran Telepon"
                content={contactInfo.phone}
                href={`tel:${contactInfo.phone.replace(/\D/g,'')}`}
                staggerIndex={1}
              />
              <ContactCard 
                icon={<Envelope size={24} weight="duotone" />}
                title="Surel Resmi"
                content={contactInfo.email}
                href={`mailto:${contactInfo.email}`}
                staggerIndex={2}
              />
              <ContactCard 
                icon={<Clock size={24} weight="duotone" />}
                title="Layanan Publik"
                content={contactInfo.hours}
                staggerIndex={3}
              />
            </div>
          </div>

          {/* Map Column — Lazy loaded iframe */}
          <div ref={mapRef} className="scroll-reveal lg:col-span-7 relative group">
            {/* Outer Glow Ring */}
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 rounded-[2.5rem] blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative overflow-hidden rounded-[2.5rem] border border-neutral-200/60 bg-white p-4 shadow-xl transition-transform duration-500 group-hover:scale-[1.005]">
              <div className="absolute inset-0 z-10 pointer-events-none rounded-[2.3rem] border border-white/40 shadow-[inset_0_0_60px_rgba(255,255,255,0.2)]" />
              
              {/* Map UI Overlay */}
              <div className="absolute top-8 left-8 right-8 z-20 flex justify-between items-center pointer-events-none">
                <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/80 shadow-lg flex items-center gap-3">
                  <div className="size-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-800">SMANSA Map Live View</span>
                </div>
                <div className="size-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center border border-white/80 shadow-lg">
                  <GlobeSimple size={20} className="text-brand-primary animate-[spin_12s_linear_infinite]" />
                </div>
              </div>

              <div className="aspect-[16/10] lg:aspect-[4/4] w-full rounded-[2rem] overflow-hidden grayscale-[30%] contrast-[1.05] brightness-[0.98] group-hover:grayscale-0 transition-all duration-700 ease-out">
                <LazyMapIframe 
                  src={contactInfo.googleMapsEmbed}
                  title="Lokasi SMAN 1 Samarinda"
                />
              </div>

              {/* Action Overlay */}
              <div className="absolute bottom-8 left-8 right-8 z-20 flex justify-between items-end pointer-events-none">
                <div className="bg-white/95 backdrop-blur-sm p-5 rounded-2xl border border-white/80 shadow-xl max-w-[240px] transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-[transform,opacity] duration-500 delay-75">
                  <p className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em] mb-2">Campus Hub</p>
                  <p className="text-xs font-semibold text-neutral-700 leading-relaxed">
                    Jantung pendidikan Kota Samarinda, lokasi strategis dengan akses mudah.
                  </p>
                </div>
                
                <a 
                  href="https://maps.app.goo.gl/SBYvmw3tKYMniqxd8" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto bg-white/95 backdrop-blur-sm size-14 rounded-2xl flex items-center justify-center text-brand-primary border border-white/80 shadow-xl hover:bg-brand-primary hover:text-white hover:scale-105 active:scale-95 transition-[background-color,color,transform,box-shadow] duration-300 group/btn"
                >
                  <ArrowUpRight size={28} weight="bold" className="group-hover:rotate-45 transition-transform duration-300" />
                </a>
              </div>
            </div>

            {/* Corner Decorative Elements */}
            <div className="absolute -top-6 -right-6 size-24 border-t-2 border-r-2 border-brand-primary/10 rounded-tr-3xl pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 size-24 border-b-2 border-l-2 border-brand-secondary/10 rounded-bl-3xl pointer-events-none" />
          </div>

        </div>
      </Container>
    </section>
  );
}

/** Lazy-load Google Maps iframe only when visible in viewport */
function LazyMapIframe({ src, title }: { src: string; title: string }) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: "200px" }, // Start loading 200px before visible
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      {shouldLoad ? (
        <iframe
          src={src}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={title}
          className="w-full h-full"
        />
      ) : (
        <div className="w-full h-full bg-neutral-100 animate-pulse rounded-xl flex items-center justify-center">
          <MapPin size={48} className="text-neutral-300" />
        </div>
      )}
    </div>
  );
}

function ContactCard({ 
  icon, 
  title, 
  content, 
  href,
  staggerIndex,
}: { 
  icon: React.ReactNode; 
  title: string; 
  content: string; 
  href?: string;
  staggerIndex: number;
}) {
  const isLink = !!href;
  const Component = isLink ? 'a' : 'div';
  
  return (
    <Component 
      href={href}
      target={isLink && href?.startsWith('http') ? '_blank' : undefined}
      rel={isLink && href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={cn(
        "scroll-reveal group relative flex items-center gap-6 p-6 rounded-[1.5rem] border border-neutral-100 bg-white shadow-sm transition-[background-color,border-color,box-shadow,transform] duration-300",
        isLink ? "hover:border-brand-primary/10 hover:shadow-lg hover:shadow-brand-primary/5 hover:-translate-y-1" : ""
      )}
      style={{ "--stagger-index": staggerIndex } as React.CSSProperties}
    >
      <div className="size-14 shrink-0 flex items-center justify-center rounded-2xl bg-neutral-50 text-brand-primary shadow-inner border border-neutral-100 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="text-[9px] font-bold uppercase tracking-[0.25em] text-neutral-400 mb-1.5 transition-colors group-hover:text-brand-primary/60">
          {title}
        </h4>
        <p className="text-[0.95rem] font-bold text-neutral-800 leading-tight group-hover:text-neutral-900 transition-colors">
          {content}
        </p>
      </div>
      {isLink && (
        <div className="size-8 rounded-full bg-neutral-50 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brand-primary group-hover:bg-brand-primary/10">
          <ArrowUpRight size={16} weight="bold" />
        </div>
      )}

      {/* Hover Background Accent */}
      <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-brand-primary/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Component>
  );
}
