"use client";

import { useCallback, useMemo, useState } from "react";
import type { Achievement } from "@/features/prestasi/types/achievement";

export type AchievementSort = "newest" | "oldest" | "rank";

export interface AchievementFilters {
  search: string;
  type: string;           // "" = semua
  level: string;          // "" = semua
  participantType: string; // "" | "INDIVIDUAL" | "GROUP"
  sort: AchievementSort;
}

const INITIAL_FILTERS: AchievementFilters = {
  search: "",
  type: "",
  level: "",
  participantType: "",
  sort: "newest",
};

export function useAchievements(data: Achievement[] = []) {
  const [filters, setFilters] = useState<AchievementFilters>(INITIAL_FILTERS);

  // ── Derived filter options (unique values from data) ──────────────────────
  const availableTypes = useMemo(
    () => Array.from(new Set(data.map((a) => a.type))).sort(),
    [data]
  );

  const availableLevels = useMemo(
    () => Array.from(new Set(data.map((a) => a.level))),
    [data]
  );

  // ── Filtered + sorted data ────────────────────────────────────────────────
  const filteredData = useMemo(() => {
    const q = filters.search.toLowerCase();

    const filtered = data.filter((a) => {
      // Search: match name or any member name
      if (q) {
        const nameMatch = a.name.toLowerCase().includes(q);
        const memberMatch = a.members.some((m) =>
          m.name.toLowerCase().includes(q)
        );
        if (!nameMatch && !memberMatch) return false;
      }
      // Type filter
      if (filters.type && a.type !== filters.type) return false;
      // Level filter
      if (filters.level && a.level !== filters.level) return false;
      // ParticipantType filter
      if (filters.participantType && a.participantType !== filters.participantType)
        return false;
      return true;
    });

    // ── Sort ────────────────────────────────────────────────────────────────
    return [...filtered].sort((a, b) => {
      switch (filters.sort) {
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "rank":
          // rank 1 = terbaik, jadi ascending
          return a.rank - b.rank;
        case "newest":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  }, [data, filters]);

  const updateFilter = useCallback(
    <K extends keyof AchievementFilters>(key: K, value: AchievementFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  // Sort tidak dihitung sebagai "filter aktif" — hanya search/type/level/participant
  const isFiltered =
    filters.search !== "" ||
    filters.type !== "" ||
    filters.level !== "" ||
    filters.participantType !== "";

  return {
    data,
    filteredData,
    filters,
    updateFilter,
    resetFilters,
    isFiltered,
    availableTypes,
    availableLevels,
    totalCount: data.length,
    filteredCount: filteredData.length,
  };
}
