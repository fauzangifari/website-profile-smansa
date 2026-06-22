"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Buildings } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  facilities,
  facilitiesIntro,
  facilitiesStats,
  facilityCategories,
  type Facility,
  type FacilityCategory,
} from "@/features/facilities/data/facilities-data";
import { FACILITY_ICON_MAP } from "@/features/facilities/components/facility-icon-map";
import { FacilityDetailModal } from "@/features/facilities/components/facility-detail-modal";
import { cn } from "@/lib/utils";

const categoryColorMap: Record<string, string> = {
  Laboratorium: "bg-brand-primary-soft/50 text-brand-primary",
  Akademik: "bg-orange-100 text-orange-700",
  Teknologi: "bg-purple-100 text-purple-700",
  Penunjang: "bg-emerald-100 text-emerald-700",
  Ibadah: "bg-amber-100 text-amber-700",
};

const cardAccentMap: Record<string, string> = {
  Laboratorium: "from-brand-primary-soft/40 to-blue-50/30",
  Akademik: "from-orange-50/60 to-amber-50/20",
  Teknologi: "from-purple-50/60 to-indigo-50/20",
  Penunjang: "from-emerald-50/60 to-teal-50/20",
  Ibadah: "from-amber-50/60 to-yellow-50/20",
};

const iconBgMap: Record<string, string> = {
  Laboratorium: "bg-brand-primary-soft text-brand-primary group-hover:bg-brand-primary group-hover:text-white",
  Akademik: "bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white",
  Teknologi: "bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
  Penunjang: "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
  Ibadah: "bg-amber-100 text-amber-600 group-hover:bg-amber-500 group-hover:text-white",
};

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 280, damping: 28 },
  },
};

export function FacilitiesContent() {
  const [activeCategory, setActiveCategory] = useState<FacilityCategory>("Semua");
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  const filteredFacilities =
    activeCategory === "Semua"
      ? facilities
      : facilities.filter((f) => f.category === activeCategory);

  return (
    <>
      <FacilityDetailModal
        facility={selectedFacility}
        onClose={() => setSelectedFacility(null)}
      />

      <div className="flex flex-col gap-16 md:gap-20">
        {/* ── Section 1: Hero Intro ── */}
        <section className="relative overflow-hidden rounded-[2rem] border border-brand-primary/10 bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/20 p-8 shadow-sm md:p-12 lg:p-14">
          {/* Background blobs */}
          <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-brand-primary/6 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 size-64 rounded-full bg-brand-secondary/5 blur-3xl" />

          <div className="relative flex flex-col items-center text-center">
            {/* Icon */}
            <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-brand-primary-soft text-brand-primary shadow-sm">
              <Buildings size={36} weight="duotone" />
            </div>

            <Badge
              variant="primary"
              className="mb-5 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.18em]"
            >
              Sarana &amp; Prasarana
            </Badge>

            <h2 className="max-w-3xl text-2xl font-extrabold leading-tight text-neutral-900 md:text-3xl lg:text-4xl">
              Fasilitas Lengkap untuk{" "}
              <span className="text-brand-primary">Pendidikan Berkualitas</span>
            </h2>

            <div className="mt-6 grid max-w-3xl gap-4 text-sm leading-8 text-neutral-700 md:text-base md:leading-9">
              <p className="font-medium text-neutral-800">{facilitiesIntro.main}</p>
              <p>{facilitiesIntro.sub}</p>
            </div>

            {/* Stats row */}
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              {facilitiesStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-1 rounded-xl border border-brand-primary/15 bg-white/70 px-6 py-4 shadow-sm backdrop-blur-sm"
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

        {/* ── Section 2: Filter + Grid ── */}
        <section className="space-y-10">
          {/* Section header */}
          <div className="flex flex-col items-center text-center">
            <Badge variant="glass" className="mb-4">
              Daftar Fasilitas
            </Badge>
            <h3 className="text-2xl font-extrabold text-neutral-900 md:text-3xl">
              Jelajahi Fasilitas SMANSA
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-neutral-500 md:text-base">
              Klik salah satu fasilitas untuk melihat detail lengkap, foto, dan keunggulannya.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div
            className="flex flex-wrap justify-center gap-2"
            role="tablist"
            aria-label="Filter kategori fasilitas"
          >
            {facilityCategories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
                  activeCategory === cat
                    ? "bg-brand-primary text-white shadow-md shadow-brand-primary/25"
                    : "border border-neutral-200 bg-white text-neutral-600 hover:border-brand-primary/40 hover:bg-brand-primary-soft/40 hover:text-brand-primary",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Facilities Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredFacilities.map((facility) => {
                const IconComponent = FACILITY_ICON_MAP[facility.icon];
                const accentGradient = cardAccentMap[facility.category] ?? "";
                const iconBg = iconBgMap[facility.category] ?? "";
                const categoryColor = categoryColorMap[facility.category] ?? "";

                return (
                  <motion.div key={facility.id} variants={cardVariants}>
                    <Card
                      variant="glass"
                      className={cn(
                        "group relative flex h-full cursor-pointer flex-col overflow-hidden border-white/60 p-6 hover:-translate-y-1.5 hover:border-brand-primary/20 hover:shadow-xl hover:shadow-neutral-900/10",
                      )}
                      onClick={() => setSelectedFacility(facility)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedFacility(facility);
                        }
                      }}
                      aria-label={`Lihat detail ${facility.name}`}
                    >
                      {/* Card gradient accent background */}
                      <div
                        className={cn(
                          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60 transition-opacity duration-500 group-hover:opacity-100",
                          accentGradient,
                        )}
                      />
                      {/* Decorative blob */}
                      <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-white/40 blur-2xl transition-all duration-500 group-hover:scale-125" />

                      <div className="relative flex flex-col gap-4">
                        {/* Icon + Category */}
                        <div className="flex items-start justify-between">
                          <div
                            className={cn(
                              "flex size-13 items-center justify-center rounded-xl shadow-sm transition-all duration-500",
                              iconBg,
                            )}
                          >
                            {IconComponent && (
                              <IconComponent size={28} weight="duotone" />
                            )}
                          </div>
                          <span
                            className={cn(
                              "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest",
                              categoryColor,
                            )}
                          >
                            {facility.category}
                          </span>
                        </div>

                        {/* Name */}
                        <h4 className="text-base font-extrabold leading-tight text-neutral-900 transition-colors duration-300 group-hover:text-brand-primary">
                          {facility.name}
                        </h4>

                        {/* Short Description */}
                        <p className="flex-1 text-xs leading-6 text-neutral-600">
                          {facility.shortDescription}
                        </p>

                        {/* CTA hint */}
                        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-brand-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <span>Lihat Detail</span>
                          <span aria-hidden="true">→</span>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </>
  );
}
