"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SearchInput } from "@/components/ui/input";
import { alumniList, alumniStats } from "@/features/alumni/data/alumni-data";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";
import {
  ArrowRight,
  Briefcase,
  CaretDown,
  GraduationCap,
  MagnifyingGlass,
  Sparkle,
  UsersThree,
} from "@phosphor-icons/react";

const ENROLLMENT_URL = "https://sims.sman1samarinda.sch.id/enrollment/alumni";

// Placeholder — ganti dengan foto alumni/kegiatan alumni SMANSA yang sebenarnya.
const CTA_IMAGE =
  "https://placehold.co/800x1000/dbeafe/1e40af.png?text=Alumni+SMANSA";

const ctaBenefits = [
  {
    icon: GraduationCap,
    title: "Terkoneksi dengan Alumni Unggul",
    description:
      "Bangun relasi dengan ribuan alumni SMANSA yang berkiprah dan berprestasi di berbagai bidang dan penjuru.",
  },
  {
    icon: Briefcase,
    title: "Info Lowongan Kerja Alumni",
    description:
      "Akses lowongan pekerjaan dan peluang karier yang dibagikan khusus untuk sesama alumni SMANSA.",
  },
];

export function AlumniContent() {
  return (
    <div className="flex flex-col gap-14 md:gap-20">
      <CtaJoinSection />
      <StatsSection />
      <DirectorySection />
    </div>
  );
}

/* ── Section 1: CTA ajak alumni bergabung ── */
function CtaJoinSection() {
  const ref = useScrollReveal({ stagger: true });

  return (
    <section aria-labelledby="alumni-cta-heading">
      <Card
        variant="glass"
        className="relative overflow-hidden rounded-lg border-white/60 p-8 md:p-12"
      >
        {/* Background decorations */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(0,122,255,0.18)_0%,transparent_65%)]" />
          <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(15,118,110,0.14)_0%,transparent_65%)]" />
        </div>

        <div
          ref={ref}
          className="scroll-reveal-stagger relative z-10 grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12"
        >
          {/* Gambar kiri */}
          <div className="scroll-reveal" style={cssIndex(0)}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/60 shadow-lg shadow-neutral-900/10 lg:aspect-[4/5]">
              <Image
                src={CTA_IMAGE}
                alt="Jejaring alumni SMA Negeri 1 Samarinda"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/25 via-transparent to-transparent" />
            </div>
          </div>

          {/* Konten kanan */}
          <div className="scroll-reveal" style={cssIndex(1)}>
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary-soft/60 px-3.5 py-1.5">
                <UsersThree
                  size={16}
                  weight="duotone"
                  className="text-brand-primary"
                />
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-primary">
                  Ikatan Alumni SMANSA
                </span>
              </div>
              <h2
                id="alumni-cta-heading"
                className="text-2xl font-extrabold leading-tight text-neutral-900 md:text-3xl lg:text-4xl"
              >
                Sudah Jadi Alumni?{" "}
                <span className="text-brand-primary">Bergabunglah</span> Bersama
                Kami
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-neutral-600 md:text-base">
                Perkuat jejaring alumni SMA Negeri 1 Samarinda. Satu langkah
                untuk terhubung kembali dengan almamater dan membuka peluang baru
                bersama sesama lulusan.
              </p>
            </div>

            {/* Keunggulan bergabung */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {ctaBenefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex items-start gap-4 rounded-lg border border-white/60 bg-white/55 p-5 backdrop-blur-sm"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary-soft/70 text-brand-primary">
                    <benefit.icon size={24} weight="duotone" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 md:text-base">
                      {benefit.title}
                    </h3>
                    <p className="mt-1 text-xs leading-6 text-neutral-600 md:text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Aksi */}
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
              <a
                href={ENROLLMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button
                  size="lg"
                  className="rounded-full px-7"
                  iconRight={<ArrowRight size={20} weight="bold" />}
                >
                  Daftarkan Diri sebagai Alumni
                </Button>
              </a>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500">
                <Sparkle size={14} weight="fill" className="text-brand-accent" />
                Gratis &amp; hanya butuh beberapa menit
              </span>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}

/* ── Section 2: Statistik alumni ── */
function StatsSection() {
  const ref = useScrollReveal({ stagger: true });

  return (
    <section aria-labelledby="alumni-stats-heading">
      <h2 id="alumni-stats-heading" className="sr-only">
        Statistik Alumni
      </h2>
      <div
        ref={ref}
        className="scroll-reveal-stagger grid grid-cols-2 gap-6 divide-neutral-200/60 lg:grid-cols-4 lg:divide-x"
      >
        {alumniStats.map((stat, index) => (
          <div
            key={stat.label}
            className="scroll-reveal flex flex-col items-center text-center lg:px-4"
            style={cssIndex(index)}
          >
            <div className="mb-2 flex items-baseline gap-1 text-3xl font-extrabold text-brand-primary md:text-4xl">
              <AnimatedCounter target={stat.value} />
              <span className="text-brand-secondary">{stat.suffix}</span>
            </div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
              {stat.label}
            </p>
            <p className="max-w-[160px] text-[11px] font-medium text-neutral-400">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Section 3: Direktori alumni (search + filter angkatan) ── */
function DirectorySection() {
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal({ stagger: true });

  const [query, setQuery] = useState("");
  const [angkatan, setAngkatan] = useState("Semua");

  const angkatanOptions = useMemo(() => {
    const unique = Array.from(new Set(alumniList.map((a) => a.angkatan))).sort(
      (a, b) => Number(b) - Number(a),
    );
    return ["Semua", ...unique];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return alumniList.filter((alumni) => {
      const matchAngkatan =
        angkatan === "Semua" || alumni.angkatan === angkatan;
      const matchQuery =
        q === "" ||
        alumni.name.toLowerCase().includes(q) ||
        alumni.university.toLowerCase().includes(q) ||
        alumni.occupation.toLowerCase().includes(q);
      return matchAngkatan && matchQuery;
    });
  }, [query, angkatan]);

  return (
    <section id="direktori" aria-labelledby="alumni-directory-heading">
      {/* Header */}
      <div ref={headerRef} className="scroll-reveal mb-8">
        <div className="mb-3 flex items-center gap-2.5">
          <span className="h-px w-8 bg-brand-primary" />
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">
            Direktori Alumni
          </span>
        </div>
        <h2
          id="alumni-directory-heading"
          className="text-2xl font-bold leading-tight text-neutral-900 md:text-3xl"
        >
          Jejak Langkah Para Lulusan
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-neutral-600 md:text-base">
          Telusuri alumni SMA Negeri 1 Samarinda berdasarkan nama, universitas,
          pekerjaan, atau angkatan.
        </p>
      </div>

      {/* Controls */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-md">
          <MagnifyingGlass
            size={18}
            weight="bold"
            className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-neutral-400"
          />
          <SearchInput
            aria-label="Cari alumni"
            placeholder="Cari nama, universitas, atau pekerjaan..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-11"
          />
        </div>

        <div className="relative w-full sm:w-56">
          <select
            aria-label="Filter angkatan"
            value={angkatan}
            onChange={(e) => setAngkatan(e.target.value)}
            className="h-11 w-full appearance-none rounded-md border border-neutral-300 bg-white pl-4 pr-10 text-sm font-medium text-neutral-900 shadow-sm transition focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/15"
          >
            {angkatanOptions.map((option) => (
              <option key={option} value={option}>
                {option === "Semua" ? "Semua Angkatan" : `Angkatan ${option}`}
              </option>
            ))}
          </select>
          <CaretDown
            size={16}
            weight="bold"
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
          />
        </div>
      </div>

      {/* Grid / empty state */}
      {filtered.length > 0 ? (
        <div
          ref={gridRef}
          className="scroll-reveal-stagger grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5"
        >
          {filtered.map((alumni, index) => (
            <article
              key={alumni.name}
              className="scroll-reveal group relative overflow-hidden rounded-lg bg-neutral-800"
              style={cssIndex(index)}
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={alumni.image}
                  alt={alumni.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                {/* Angkatan badge */}
                <div className="absolute left-3 top-3 rounded-full border border-white/14 bg-black/40 px-2.5 py-1 text-[10px] font-bold text-white/70 backdrop-blur-sm">
                  {alumni.angkatan}
                </div>

                {/* Info */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="truncate text-[10px] font-bold uppercase tracking-[0.12em] text-brand-primary">
                    {alumni.occupation}
                  </p>
                  <h3 className="mt-0.5 truncate text-sm font-bold leading-tight text-white">
                    {alumni.name}
                  </h3>
                  <p className="mt-0.5 truncate text-[10px] text-white/50">
                    {alumni.university}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-white/50 px-6 py-16 text-center">
          <div className="mb-3 flex size-14 items-center justify-center rounded-full bg-neutral-100">
            <MagnifyingGlass size={26} weight="duotone" className="text-neutral-400" />
          </div>
          <p className="text-base font-semibold text-neutral-700">
            Alumni tidak ditemukan
          </p>
          <p className="mt-1 max-w-sm text-sm text-neutral-500">
            Coba ubah kata kunci pencarian atau pilih angkatan yang berbeda.
          </p>
        </div>
      )}
    </section>
  );
}

/** Counter animation via requestAnimationFrame (pola dari stats-section landing) */
function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.unobserve(el);

          const duration = 2000;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(2, -10 * progress);
            setCount(Math.round(eased * target));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString("id-ID")}</span>;
}

function cssIndex(index: number) {
  return { "--stagger-index": index } as React.CSSProperties;
}
