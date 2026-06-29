"use client";

import type { ReactNode } from "react";
import { MagnifyingGlass, X, ArrowsDownUp, FunnelSimple } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import {
  formatLevel,
  getLevelColor,
  formatType,
  getTypeColor,
} from "@/features/prestasi/utils/achievement-helpers";
import type { AchievementFilters, AchievementSort } from "@/features/prestasi/hooks/use-achievements";

interface AchievementFiltersProps {
  filters: AchievementFilters;
  onFilterChange: <K extends keyof AchievementFilters>(key: K, value: AchievementFilters[K]) => void;
  onReset: () => void;
  isFiltered: boolean;
  filteredCount: number;
  totalCount: number;
  availableTypes: string[];
  availableLevels: string[];
}

const PARTICIPANT_OPTIONS = [
  { value: "", label: "Semua" },
  { value: "INDIVIDUAL", label: "Perorangan" },
  { value: "GROUP", label: "Beregu" },
] as const;

const SORT_OPTIONS: { value: AchievementSort; label: string }[] = [
  { value: "newest", label: "Terbaru" },
  { value: "oldest", label: "Terlama" },
  { value: "rank", label: "Rank Terbaik" },
];

// ── Pill button ──────────────────────────────────────────────────────────────
function Pill({
  active,
  onClick,
  children,
  activeColorClass,
  id,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  activeColorClass?: string;
  id?: string;
}) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={cn(
        "h-7 rounded-full px-3 text-[11px] font-semibold transition-all duration-150 whitespace-nowrap border",
        active
          ? activeColorClass
            ? cn(activeColorClass, "border-transparent shadow-sm")
            : "bg-brand-primary text-white border-brand-primary shadow-sm"
          : "bg-transparent text-neutral-500 border-neutral-200 hover:border-brand-primary/40 hover:text-brand-primary"
      )}
    >
      {children}
    </button>
  );
}

// ── Filter row: label | divider | pills ──────────────────────────────────────
function FilterRow({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-0 min-h-[28px]">
      {/* Label */}
      <div className="flex items-center gap-1 w-[100px] shrink-0">
        {icon}
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest leading-none">
          {label}
        </span>
      </div>
      {/* Divider */}
      <div className="h-4 w-px bg-neutral-200 mr-3 shrink-0" />
      {/* Pills */}
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

// ── Active pill tag ──────────────────────────────────────────────────────────
function ActivePill({
  children,
  colorClass,
  onRemove,
  ariaLabel,
}: {
  children: ReactNode;
  colorClass?: string;
  onRemove: () => void;
  ariaLabel: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
        colorClass ?? "bg-neutral-100 text-neutral-600"
      )}
    >
      {children}
      <button
        onClick={onRemove}
        className="rounded-full opacity-50 hover:opacity-100 transition-opacity"
        aria-label={ariaLabel}
      >
        <X size={9} weight="bold" />
      </button>
    </span>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export function AchievementFiltersBar({
  filters,
  onFilterChange,
  onReset,
  isFiltered,
  filteredCount,
  totalCount,
  availableTypes,
  availableLevels,
}: AchievementFiltersProps) {
  return (
    <div className="flex flex-col gap-3">

      {/* ── Row 1: Search ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2.5">
        <div className="relative flex-1">
          <MagnifyingGlass
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
          />
          <input
            id="prestasi-search"
            type="search"
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            placeholder="Cari nama prestasi atau peserta…"
            className={cn(
              "h-9 w-full rounded-lg border border-neutral-200 bg-neutral-50 pl-9 pr-8 text-sm text-neutral-900",
              "placeholder:text-neutral-400 focus:border-brand-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition"
            )}
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange("search", "")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 flex size-4 items-center justify-center rounded-full bg-neutral-300 text-neutral-600 hover:bg-neutral-400 transition"
              aria-label="Hapus pencarian"
            >
              <X size={9} weight="bold" />
            </button>
          )}
        </div>

        {/* Result count badge */}
        <div className="shrink-0 flex items-center gap-1 rounded-lg bg-neutral-100 px-3 h-9 border border-neutral-200">
          <span className="text-sm font-extrabold text-brand-primary tabular-nums">
            {isFiltered ? filteredCount : totalCount}
          </span>
          {isFiltered && (
            <span className="text-xs text-neutral-400 font-medium">/ {totalCount}</span>
          )}
          <span className="text-xs text-neutral-400 font-medium">prestasi</span>
        </div>

        {/* Reset */}
        {isFiltered && (
          <button
            id="filter-reset-btn"
            onClick={onReset}
            className="shrink-0 flex items-center gap-1 rounded-lg px-2.5 h-9 text-xs font-semibold text-neutral-400 border border-neutral-200 hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all"
            aria-label="Reset semua filter"
          >
            <X size={11} weight="bold" />
            Reset
          </button>
        )}
      </div>

      {/* ── Divider ────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        <FunnelSimple size={12} className="text-neutral-300 shrink-0" />
        <div className="h-px flex-1 bg-neutral-100" />
      </div>

      {/* ── Filter rows ────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2.5">

        {availableTypes.length > 0 && (
          <FilterRow label="Jenis">
            <Pill id="filter-type-all" active={!filters.type} onClick={() => onFilterChange("type", "")}>
              Semua
            </Pill>
            {availableTypes.map((t) => (
              <Pill
                key={t}
                id={`filter-type-${t.toLowerCase()}`}
                active={filters.type === t}
                onClick={() => onFilterChange("type", t)}
                activeColorClass={getTypeColor(t)}
              >
                {formatType(t)}
              </Pill>
            ))}
          </FilterRow>
        )}

        {availableLevels.length > 0 && (
          <FilterRow label="Tingkat">
            <Pill id="filter-level-all" active={!filters.level} onClick={() => onFilterChange("level", "")}>
              Semua
            </Pill>
            {availableLevels.map((l) => (
              <Pill
                key={l}
                id={`filter-level-${l.toLowerCase()}`}
                active={filters.level === l}
                onClick={() => onFilterChange("level", l)}
                activeColorClass={getLevelColor(l)}
              >
                {formatLevel(l)}
              </Pill>
            ))}
          </FilterRow>
        )}

        <FilterRow label="Peserta">
          {PARTICIPANT_OPTIONS.map(({ value, label }) => (
            <Pill
              key={value || "all"}
              id={`filter-participant-${value || "all"}`}
              active={filters.participantType === value}
              onClick={() => onFilterChange("participantType", value)}
            >
              {label}
            </Pill>
          ))}
        </FilterRow>

        <FilterRow
          label="Urutkan"
          icon={<ArrowsDownUp size={10} className="text-neutral-400 shrink-0" />}
        >
          {SORT_OPTIONS.map(({ value, label }) => (
            <Pill
              key={value}
              id={`filter-sort-${value}`}
              active={filters.sort === value}
              onClick={() => onFilterChange("sort", value)}
            >
              {label}
            </Pill>
          ))}
        </FilterRow>
      </div>

      {/* ── Active filter pills ─────────────────────────────────────────────── */}
      {isFiltered && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-neutral-100">
          <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest mr-0.5">Aktif:</span>
          {filters.search && (
            <ActivePill onRemove={() => onFilterChange("search", "")} ariaLabel={`Hapus pencarian "${filters.search}"`}>
              &ldquo;{filters.search}&rdquo;
            </ActivePill>
          )}
          {filters.type && (
            <ActivePill
              colorClass={getTypeColor(filters.type)}
              onRemove={() => onFilterChange("type", "")}
              ariaLabel={`Hapus filter jenis ${formatType(filters.type)}`}
            >
              {formatType(filters.type)}
            </ActivePill>
          )}
          {filters.level && (
            <ActivePill
              colorClass={getLevelColor(filters.level)}
              onRemove={() => onFilterChange("level", "")}
              ariaLabel={`Hapus filter tingkat ${formatLevel(filters.level)}`}
            >
              {formatLevel(filters.level)}
            </ActivePill>
          )}
          {filters.participantType && (
            <ActivePill onRemove={() => onFilterChange("participantType", "")} ariaLabel="Hapus filter tipe peserta">
              {filters.participantType === "INDIVIDUAL" ? "Perorangan" : "Beregu"}
            </ActivePill>
          )}
        </div>
      )}
    </div>
  );
}
