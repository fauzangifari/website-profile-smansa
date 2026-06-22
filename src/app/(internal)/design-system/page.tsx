"use client";

import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, GlassCard } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SearchInput } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { 
  Sparkle, 
  Palette, 
  Stack, 
  Gear, 
  CursorClick, 
  Cube, 
  ArrowsOut, 
  MagnifyingGlass, 
  CaretRight,
  Cards,
  PaintBrush,
  Code
} from "@phosphor-icons/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function DesignSystemPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Entrance animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
    
    tl.from(".reveal-hero > *", {
      y: 40,
      opacity: 0,
      stagger: 0.15,
    })
    .from(".reveal-card", {
      scale: 0.95,
      opacity: 0,
      y: 30,
      stagger: 0.1,
    }, "-=0.6")
    .from(".reveal-bento", {
      opacity: 0,
      y: 40,
      stagger: 0.2,
    }, "-=0.8");

    // Floating blobs animation
    if (blobsRef.current) {
      const blobs = blobsRef.current.children;
      Array.from(blobs).forEach((blob, i) => {
        gsap.to(blob, {
          x: "random(-100, 100)",
          y: "random(-100, 100)",
          duration: "random(10, 20)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.5,
        });
      });
    }
  }, { scope: containerRef });

  return (
    <main 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-neutral-50 selection:bg-brand-primary/20"
    >
      {/* Dynamic Background Blobs */}
      <div ref={blobsRef} className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-5%] size-[500px] rounded-full bg-brand-primary/10 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] size-[600px] rounded-full bg-blue-400/10 blur-[140px]" />
        <div className="absolute top-[40%] left-[20%] size-[400px] rounded-full bg-indigo-400/5 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] size-[500px] rounded-full bg-brand-primary/15 blur-[120px]" />
      </div>

      <section className="relative z-10 py-24 lg:py-32">
        <Container className="grid gap-16 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="reveal-hero flex flex-col items-start gap-8">
            <Badge variant="glass" className="px-4 py-1.5 flex items-center gap-2">
              <Sparkle weight="fill" className="size-4 text-brand-primary" />
              Design System V1.0
            </Badge>
            <div className="space-y-6">
              <h1 className="text-6xl font-extrabold tracking-tight text-neutral-900 md:text-7xl lg:text-8xl">
                The <span className="text-brand-primary">Glass</span> Foundation.
              </h1>
              <p className="max-w-xl text-xl leading-relaxed text-neutral-600">
                A refined collection of tokens, components, and interactive patterns 
                crafted for SMA Negeri 1 Samarinda&apos;s digital identity.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="h-14 px-8 text-base gap-2 group">
                Explore Components
                <CaretRight weight="bold" className="size-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="glass" className="h-14 px-8 text-base gap-2">
                <Palette className="size-5" />
                Visual Tokens
              </Button>
            </div>
          </div>

          <div className="reveal-card relative">
            {/* Decorative background for the hero card */}
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-brand-primary/20 via-transparent to-blue-400/20 blur-2xl opacity-50" />
            
            <GlassCard className="relative p-8 border-white/40 shadow-2xl backdrop-blur-3xl group transition-all duration-500 hover:-translate-y-2 hover:shadow-brand-primary/10">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-brand-primary/10 text-brand-primary">
                    <Stack weight="duotone" size={32} />
                  </div>
                  <Badge variant="glass" className="font-mono">v1.0.4-alpha</Badge>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-neutral-900 tracking-tight">
                    SIMSDIG Token First
                  </h2>
                  <p className="text-neutral-600 leading-relaxed">
                    Our design system is built on tokens that ensure consistency 
                    across all platforms. From fluid typography to glass surfaces.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card variant="glass-soft" className="p-5 flex flex-col gap-2 hover:bg-white/40 transition-colors">
                    <Cube weight="duotone" className="size-6 text-brand-primary" />
                    <div>
                      <p className="text-2xl font-extrabold text-neutral-900">12</p>
                      <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Grid Columns</p>
                    </div>
                  </Card>
                  <Card variant="glass-soft" className="p-5 flex flex-col gap-2 hover:bg-white/40 transition-colors">
                    <ArrowsOut weight="duotone" className="size-6 text-brand-primary" />
                    <div>
                      <p className="text-2xl font-extrabold text-neutral-900">44px</p>
                      <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Min Target</p>
                    </div>
                  </Card>
                </div>
              </div>
            </GlassCard>
          </div>
        </Container>
      </section>

      <section className="relative z-10 pb-32">
        <Container className="space-y-16">
          <div className="reveal-bento">
            <SectionHeader
              eyebrow={
                <div className="flex items-center gap-2">
                  <Code weight="bold" className="size-4" />
                  <span>Architecture</span>
                </div>
              }
              title="Primitive Components"
              description="A solid foundation for building complex interfaces with consistent glassmorphism effects and modern interaction patterns."
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Buttons Showcase */}
            <Card className="reveal-bento group p-8 space-y-8 border-white/50 bg-white/40 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-neutral-200/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600">
                  <CursorClick weight="duotone" size={24} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900">Actions</h3>
              </div>
              
              <div className="grid gap-4">
                <div className="flex flex-wrap gap-3">
                  <Button className="shadow-lg shadow-brand-primary/20">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="glass" className="border-white/50">Glass Action</Button>
                  <Button variant="outline">Outline</Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger" size="sm">Danger</Button>
                  <Button isLoading size="sm">Loading</Button>
                </div>
              </div>
            </Card>

            {/* Badges & Identity */}
            <Card className="reveal-bento group p-8 space-y-8 border-white/50 bg-white/40 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-neutral-200/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-600">
                  <Cards weight="duotone" size={24} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900">Identities</h3>
              </div>
              
              <div className="flex flex-wrap gap-3 items-center">
                <Badge variant="primary" className="px-3 py-1">Primary</Badge>
                <Badge className="px-3 py-1">Neutral</Badge>
                <Badge variant="success" className="px-3 py-1 flex gap-1 items-center">
                  <div className="size-1.5 rounded-full bg-current" />
                  Success
                </Badge>
                <Badge variant="warning" className="px-3 py-1">Warning</Badge>
                <Badge variant="info" className="px-3 py-1">Info</Badge>
                <Badge variant="glass" className="px-3 py-1 border-white/40">Glass</Badge>
              </div>

              <div className="pt-4 border-t border-neutral-200/50 flex flex-col gap-2">
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">Interactive State</p>
                <div className="flex gap-2">
                  <div className="size-10 rounded-lg bg-brand-primary transition-transform hover:scale-110 cursor-pointer shadow-lg shadow-brand-primary/20" />
                  <div className="size-10 rounded-lg bg-blue-400 transition-transform hover:scale-110 cursor-pointer shadow-lg shadow-blue-400/20" />
                  <div className="size-10 rounded-lg bg-neutral-900 transition-transform hover:scale-110 cursor-pointer shadow-lg shadow-neutral-900/20" />
                </div>
              </div>
            </Card>

            {/* Form Inputs */}
            <Card className="reveal-bento group p-8 space-y-8 border-white/50 bg-white/40 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-neutral-200/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-100 text-purple-600">
                  <MagnifyingGlass weight="duotone" size={24} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900">Discovery</h3>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-500 ml-1">Standard Search</label>
                  <SearchInput
                    id="search-smansa"
                    placeholder="Cari berita, guru, prestasi..."
                    className="bg-white/50 border-white/60 focus:bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-500 ml-1">Error State</label>
                  <SearchInput
                    id="search-error"
                    placeholder="Contoh error state"
                    error="Kata kunci minimal 3 karakter."
                    className="bg-white/50 border-white/60 focus:bg-white"
                  />
                </div>
              </div>
            </Card>

            {/* Configuration / Tools (Extra Bento Item) */}
            <Card className="reveal-bento md:col-span-2 lg:col-span-3 group p-8 border-white/50 bg-white/40 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-neutral-200/50 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] rotate-12 group-hover:rotate-6 transition-transform duration-700">
                <Gear size={240} weight="fill" />
              </div>
              
              <div className="relative z-10 grid md:grid-cols-[1fr_2fr] gap-12 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-neutral-900 text-white">
                      <PaintBrush weight="duotone" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900">Customization</h3>
                  </div>
                  <p className="text-neutral-600">
                    Fine-tune components using our built-in utility classes and CSS variables. 
                    Built on top of Tailwind CSS for maximum flexibility.
                  </p>
                  <Button variant="outline" className="w-fit">View Documentation</Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square rounded-2xl border border-white/60 bg-white/20 backdrop-blur-md flex items-center justify-center group/item transition-all hover:bg-white/40 hover:scale-105">
                      <div className={`size-8 rounded-full shadow-inner ${
                        i === 1 ? 'bg-brand-primary' : 
                        i === 2 ? 'bg-blue-400' : 
                        i === 3 ? 'bg-amber-400' : 'bg-neutral-800'
                      }`} />
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>
    </main>
  );
}
