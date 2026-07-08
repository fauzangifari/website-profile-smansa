"use client";

import { useState, useCallback } from "react";
import {
  Trophy,
  SmileyMeh,
  WarningCircle,
  SpinnerGap,
  ArrowClockwise,
  WifiSlash,
  MagnifyingGlass,
  X,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { AchievementCard } from "@/features/prestasi/components/achievement-card";
import { AchievementFiltersBar } from "@/features/prestasi/components/achievement-filters";
import { AchievementLightbox } from "@/features/prestasi/components/achievement-lightbox";
import { useAchievements } from "@/features/prestasi/hooks/use-achievements";
import type { AchievementFilters } from "@/features/prestasi/hooks/use-achievements";
import { formatLevel, getLevelColor, formatType, getTypeColor } from "@/features/prestasi/utils/achievement-helpers";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";
import type { Achievement } from "@/features/prestasi/types/achievement";

interface PrestasiContentProps {
  initialData?: Achievement[];
  initialError?: string | null;
  initialDataFetched?: boolean;
}

export function PrestasiContent({
  initialData = [],
  initialError = null,
  initialDataFetched = false,
}: PrestasiContentProps) {
  const {
    filteredData,
    isLoading,
    error,
    filters,
    updateFilter,
    resetFilters,
    isFiltered,
    filteredCount,
    totalCount,
    availableTypes,
    availableLevels,
  } = useAchievements(initialData, initialError, initialDataFetched);

  // Lightbox state
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const heroRef = useScrollReveal();
  const filterRef = useScrollReveal();
  const contentRef = useScrollReveal();

  const openLightbox = useCallback((src: string, alt: string) => {
    setLightbox({ src, alt });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-12 font-sans">
        {/* ── 1. Hero banner ─────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="scroll-reveal relative overflow-hidden rounded-[2.5rem] border border-brand-primary/10 bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/20 p-8 md:p-14 shadow-sm"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-brand-primary/5 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 size-80 rounded-full bg-brand-secondary/5 blur-3xl" />

          <div className="relative flex flex-col items-center text-center gap-5">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-brand-primary-soft text-brand-primary">
              <Trophy size={36} weight="duotone" />
            </div>
            <Badge variant="primary" className="px-5 py-1.5 text-xs font-bold uppercase tracking-[0.2em]">
              Prestasi Siswa
            </Badge>
            <h2 className="max-w-3xl text-3xl font-extrabold leading-tight text-neutral-900 md:text-4xl lg:text-5xl">
              Mengukir{" "}
              <span className="text-brand-primary">Kebanggaan</span>{" "}
              di Setiap Kompetisi
            </h2>
            <p className="max-w-2xl text-base leading-8 text-neutral-600 md:text-lg">
              Daftar lengkap capaian terbaik siswa-siswi SMAN 1 Samarinda dari berbagai bidang dan jenjang kompetisi.
            </p>

            {/* Stats pills — only when data exists */}
            {!isLoading && !error && totalCount > 0 && (
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <StatPill value={totalCount} label="Total Prestasi" />
                {availableLevels.includes("NASIONAL") || availableLevels.includes("INTERNASIONAL") ? (
                  <StatPill
                    value={filteredData.filter((a) => a.level === "NASIONAL" || a.level === "INTERNASIONAL").length || totalCount}
                    label="Tingkat Nasional & Internasional"
                  />
                ) : null}
              </div>
            )}
          </div>
        </section>

        {/* ── 2. Filter bar ───────────────────────────────────────────────── */}
        <section ref={filterRef} className="scroll-reveal">
          <SectionHeader
            eyebrow="Daftar Prestasi"
            title="Semua Capaian"
            description="Telusuri dan filter seluruh prestasi berdasarkan jenis, tingkat, dan tipe peserta."
            className="mb-8"
          />
          <div className="rounded-2xl border border-neutral-100 bg-white/80 p-5 shadow-sm backdrop-blur-sm">
            <AchievementFiltersBar
              filters={filters}
              onFilterChange={updateFilter}
              onReset={resetFilters}
              isFiltered={isFiltered}
              filteredCount={filteredCount}
              totalCount={totalCount}
              availableTypes={availableTypes}
              availableLevels={availableLevels}
            />
          </div>
        </section>

        {/* ── 3. Content area ─────────────────────────────────────────────── */}
        <section ref={contentRef} className="scroll-reveal">

          {/* ── Loading ──────────────────────────────────────────────────── */}
          {isLoading && <LoadingState />}

          {/* ── Error ────────────────────────────────────────────────────── */}
          {!isLoading && error && <ErrorState message={error} />}

          {/* ── Empty (no data at all) ────────────────────────────────────── */}
          {!isLoading && !error && totalCount === 0 && <EmptyState />}

          {/* ── Empty filtered (filter active, no results) ────────────────── */}
          {!isLoading && !error && totalCount > 0 && filteredData.length === 0 && (
            <FilteredEmptyState filters={filters} onReset={resetFilters} />
          )}

          {/* ── Achievement grid ─────────────────────────────────────────── */}
          {!isLoading && !error && filteredData.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredData.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  onPhotoClick={openLightbox}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Lightbox portal */}
      {lightbox && (
        <AchievementLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}

// ── Stat Pill ────────────────────────────────────────────────────────────────

function StatPill({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white bg-white/60 px-5 py-3 shadow-sm backdrop-blur-sm">
      <p className="text-2xl font-extrabold leading-none text-brand-primary">{value}</p>
      <p className="text-xs font-semibold text-neutral-600">{label}</p>
    </div>
  );
}

// ── Loading State ─────────────────────────────────────────────────────────────

function LoadingState() {
  return (
    <div className="space-y-6">
      {/* Subtle loading indicator */}
      <div className="flex items-center gap-2.5 text-neutral-400">
        <SpinnerGap size={16} className="animate-spin text-brand-primary" />
        <span className="text-sm font-medium">Memuat data prestasi…</span>
      </div>

      {/* Skeleton card grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} variant="glass-soft" className="flex flex-col gap-0 overflow-hidden p-0">
            {/* Thumbnail skeleton */}
            <div className="w-full animate-pulse bg-neutral-200" style={{ aspectRatio: "4/3" }} />
            {/* Body skeleton */}
            <div className="flex flex-col gap-3 p-4">
              <div className="h-4 w-3/4 animate-pulse rounded-md bg-neutral-200" />
              <div className="h-3.5 w-full animate-pulse rounded-md bg-neutral-200" />
              <div className="mt-1 flex flex-col gap-2 border-t border-neutral-100 pt-3">
                <div className="h-3 w-1/2 animate-pulse rounded-md bg-neutral-100" />
                <div className="h-3 w-2/3 animate-pulse rounded-md bg-neutral-100" />
                <div className="h-3 w-1/3 animate-pulse rounded-md bg-neutral-100" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── Error State ───────────────────────────────────────────────────────────────

function ErrorState({ message }: { message: string }) {
  return (
    <div className={cn(
      "flex flex-col items-center gap-6 rounded-3xl border border-red-100 py-20 px-8 text-center",
      "bg-gradient-to-b from-red-50/80 to-white"
    )}>
      {/* Icon */}
      <div className="relative flex size-20 items-center justify-center rounded-full bg-red-100">
        <WifiSlash size={36} className="text-red-400" weight="duotone" />
        <div className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-red-500 text-white shadow-sm">
          <WarningCircle size={14} weight="fill" />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 max-w-sm">
        <h3 className="text-lg font-extrabold text-neutral-900">Gagal Memuat Data</h3>
        <p className="text-sm text-neutral-500 leading-relaxed">
          Terjadi kesalahan saat mengambil data prestasi. Pastikan koneksi internet kamu stabil dan coba lagi.
        </p>
      </div>

      {/* Error detail */}
      <details className="w-full max-w-sm text-left group">
        <summary className="cursor-pointer text-xs font-semibold text-red-400 hover:text-red-600 transition-colors list-none flex items-center justify-center gap-1">
          <span>Lihat detail error</span>
          <span className="transition-transform group-open:rotate-180 text-[10px]">▼</span>
        </summary>
        <div className="mt-2 rounded-xl bg-red-50 border border-red-100 px-4 py-3">
          <code className="text-[11px] text-red-600 font-mono leading-relaxed break-all">
            {message}
          </code>
        </div>
      </details>

      {/* Retry button */}
      <button
        id="error-retry-btn"
        onClick={() => window.location.reload()}
        className={cn(
          "flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold",
          "bg-brand-primary text-white shadow-md shadow-brand-primary/25",
          "hover:bg-brand-primary/90 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-primary/30"
        )}
      >
        <ArrowClockwise size={16} weight="bold" />
        Coba Lagi
      </button>
    </div>
  );
}

// ── Empty State (no data at all) ──────────────────────────────────────────────

function EmptyState() {
  return (
    <div className={cn(
      "flex flex-col items-center gap-6 rounded-3xl border border-neutral-100 py-24 px-8 text-center",
      "bg-gradient-to-b from-neutral-50/60 to-white"
    )}>
      {/* Decorative icon */}
      <div className="relative">
        <div className="flex size-24 items-center justify-center rounded-3xl bg-neutral-100">
          <Trophy size={44} className="text-neutral-300" weight="duotone" />
        </div>
        {/* Floating dots */}
        <div className="absolute -right-2 -top-2 size-4 rounded-full bg-amber-200/70 animate-pulse" />
        <div className="absolute -left-3 bottom-0 size-3 rounded-full bg-blue-200/70 animate-pulse delay-300" />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 max-w-md">
        <h3 className="text-xl font-extrabold text-neutral-700">Belum Ada Data Prestasi</h3>
        <p className="text-sm text-neutral-400 leading-relaxed">
          Data prestasi siswa sedang disiapkan. Pantau terus halaman ini untuk update terbaru dari capaian terbaik siswa-siswi SMAN 1 Samarinda.
        </p>
      </div>
    </div>
  );
}

// ── Filtered Empty State ──────────────────────────────────────────────────────

function FilteredEmptyState({
  filters,
  onReset,
}: {
  filters: AchievementFilters;
  onReset: () => void;
}) {
  // Collect active filter labels for display
  const activeFilters: { label: string; colorClass?: string }[] = [];
  if (filters.search) {
    activeFilters.push({ label: `"${filters.search}"` });
  }
  if (filters.type) {
    activeFilters.push({ label: formatType(filters.type), colorClass: getTypeColor(filters.type) });
  }
  if (filters.level) {
    activeFilters.push({ label: formatLevel(filters.level), colorClass: getLevelColor(filters.level) });
  }
  if (filters.participantType) {
    activeFilters.push({ label: filters.participantType === "INDIVIDUAL" ? "Perorangan" : "Beregu" });
  }

  return (
    <div className={cn(
      "flex flex-col items-center gap-6 rounded-3xl border border-neutral-100 py-20 px-8 text-center",
      "bg-gradient-to-b from-neutral-50/60 to-white"
    )}>
      {/* Icon */}
      <div className="relative flex size-20 items-center justify-center rounded-full bg-neutral-100">
        <MagnifyingGlass size={36} className="text-neutral-300" weight="duotone" />
        <div className="absolute -right-1 -bottom-1 flex size-6 items-center justify-center rounded-full bg-neutral-200">
          <X size={11} weight="bold" className="text-neutral-500" />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 max-w-sm">
        <h3 className="text-lg font-extrabold text-neutral-700">Tidak Ada Hasil yang Cocok</h3>
        <p className="text-sm text-neutral-400 leading-relaxed">
          Tidak ada prestasi yang sesuai dengan filter yang kamu pilih.
        </p>
      </div>

      {/* Active filter pills */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1.5">
          <span className="text-xs text-neutral-400 font-medium self-center">Filter aktif:</span>
          {activeFilters.map((f, i) => (
            <span
              key={i}
              className={cn(
                "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                f.colorClass ?? "bg-neutral-100 text-neutral-600"
              )}
            >
              {f.label}
            </span>
          ))}
        </div>
      )}

      {/* Reset button */}
      <button
        id="filtered-empty-reset-btn"
        onClick={onReset}
        className={cn(
          "flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold",
          "bg-neutral-900 text-white shadow-md",
          "hover:bg-neutral-700 transition-all duration-200 hover:-translate-y-0.5"
        )}
      >
        <X size={14} weight="bold" />
        Reset Semua Filter
      </button>
    </div>
  );
}
