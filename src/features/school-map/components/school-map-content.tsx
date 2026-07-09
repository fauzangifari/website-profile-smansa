"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Buildings,
  ForkKnife,
  Books,
  UsersThree,
  Flask,
  MicrophoneStage,
  MagnifyingGlassPlus,
  CheckCircle,
  ArrowSquareOut,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  schoolAreas,
  schoolMapStats,
  schoolAddress,
  googleMapsEmbedUrl,
  type SchoolArea,
} from "@/features/school-map/data/school-map-data";

/* ── Icon resolver ─────────────────────────────────────────────────── */
const ICON_MAP: Record<string, React.ElementType> = {
  Buildings,
  ForkKnife,
  Books,
  UsersThree,
  Flask,
  MicrophoneStage,
};

/* ── Area accent color map (border glow on hover) ──────────────────── */
const areaGlowMap: Record<string, string> = {
  "gedung-sekolah": "hover:border-blue-300/50 hover:shadow-blue-100/60",
  "gedung-cafetaria": "hover:border-orange-300/50 hover:shadow-orange-100/60",
  "gedung-perpustakaan": "hover:border-emerald-300/50 hover:shadow-emerald-100/60",
  "gedung-osis": "hover:border-violet-300/50 hover:shadow-violet-100/60",
  "masjid-ainul-yaqin": "hover:border-amber-300/50 hover:shadow-amber-100/60",
  "gedung-laboratorium": "hover:border-cyan-300/50 hover:shadow-cyan-100/60",
  "gedung-auditorium": "hover:border-rose-300/50 hover:shadow-rose-100/60",
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 26 },
  },
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

export function SchoolMapContent() {
  const [activeArea, setActiveArea] = useState<SchoolArea | null>(null);
  const [mapZoomed, setMapZoomed] = useState(false);

  return (
    <div className="flex flex-col gap-14 md:gap-20">

      {/* ── Section 1: Hero Intro ─────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-[2rem] border border-brand-primary/10 bg-gradient-to-br from-white via-blue-50/40 to-cyan-50/20 p-8 shadow-sm md:p-12">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-brand-primary/6 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 size-64 rounded-full bg-brand-secondary/5 blur-3xl" />

        <div className="relative flex flex-col items-center text-center">
          {/* Icon */}
          <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-brand-primary-soft text-brand-primary shadow-sm">
            <MapPin size={36} weight="duotone" />
          </div>

          <Badge
            variant="primary"
            className="mb-5 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.18em]"
          >
            Denah &amp; Lokasi Kampus
          </Badge>

          <h2 className="max-w-3xl text-2xl font-extrabold leading-tight text-neutral-900 md:text-3xl lg:text-4xl">
            Temukan Lokasi di{" "}
            <span className="text-brand-primary">Lingkungan SMANSA</span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-8 text-neutral-600 md:text-base">
            Jelajahi kampus SMA Negeri 1 Samarinda melalui denah interaktif.
            Kenali setiap gedung, fasilitas, dan area yang mendukung kehidupan
            akademik dan non-akademik siswa.
          </p>

          <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-500">
            <MapPin size={14} weight="duotone" className="text-brand-primary" />
            <span>{schoolAddress}</span>
          </div>

          {/* Stat chips */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {schoolMapStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 rounded-lg border border-brand-primary/15 bg-white/70 px-5 py-4 shadow-sm backdrop-blur-sm"
              >
                <span className="text-3xl font-extrabold leading-none text-brand-primary">
                  {stat.value}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: Map Image + Google Maps ───────────────────── */}
      <section className="space-y-6">
        <div className="flex flex-col items-center text-center">
          <Badge variant="glass" className="mb-4">
            Denah Kampus
          </Badge>
          <h3 className="text-2xl font-extrabold text-neutral-900 md:text-3xl">
            Peta &amp; Denah SMANSA
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-7 text-neutral-500 md:text-base">
            Denah ilustrasi kampus dan peta lokasi SMAN 1 Samarinda untuk
            memudahkan navigasi.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols">
          {/* Denah Isometrik */}
          <div className="group relative overflow-hidden rounded-lg border border-white/40 bg-white/60 shadow-xl shadow-neutral-900/8 backdrop-blur-sm">
            {/* Zoom button */}
            <button
              type="button"
              onClick={() => setMapZoomed(true)}
              className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-white/60 bg-white/80 px-3.5 py-2 text-xs font-bold text-neutral-700 shadow-md backdrop-blur-md transition hover:bg-white hover:text-brand-primary"
              aria-label="Perbesar denah"
            >
              <MagnifyingGlassPlus size={15} weight="bold" />
              <span>Perbesar</span>
            </button>

            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <Image
                src="/images/denah-sekolah/denah-sekolah.jpg"
                alt="Denah Kampus SMA Negeri 1 Samarinda"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                priority
              />
              {/* Subtle gradient bottom */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/30 to-transparent" />
            </div>

            {/* Caption bar */}
            <div className="border-t border-white/40 bg-white/50 px-5 py-3 backdrop-blur-sm">
              <p className="text-xs font-semibold text-neutral-600">
                Ilustrasi Isometrik Kampus SMANSA — Klik "Perbesar" untuk melihat detail
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Zoom Modal ───────────────────────────────────────────── */}
      <AnimatePresence>
        {mapZoomed && (
          <>
            <motion.div
              key="map-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[200] bg-neutral-950/80 backdrop-blur-md"
              onClick={() => setMapZoomed(false)}
              aria-hidden="true"
            />
            <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 md:p-8">
              <motion.div
                key="map-modal"
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 16 }}
                transition={{ type: "spring", stiffness: 340, damping: 28 }}
                className="relative w-full max-w-6xl overflow-hidden rounded-lg border border-white/20 bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setMapZoomed(false)}
                  className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full border border-neutral-200 bg-white/90 text-neutral-700 shadow-md backdrop-blur-sm transition hover:bg-neutral-100 hover:text-neutral-900"
                  aria-label="Tutup denah"
                >
                  <span className="text-xl font-bold leading-none">×</span>
                </button>

                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src="/images/denah-sekolah/denah-sekolah.jpg"
                    alt="Denah Kampus SMA Negeri 1 Samarinda — tampilan penuh"
                    fill
                    sizes="(max-width: 1280px) 100vw, 90vw"
                    className="object-contain"
                    priority
                  />
                </div>

                <div className="border-t border-neutral-100 bg-white px-6 py-4">
                  <p className="text-sm font-semibold text-neutral-700">
                    Denah Kampus SMA Negeri 1 Samarinda
                  </p>
                  <p className="mt-0.5 text-xs text-neutral-400">{schoolAddress}</p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
