"use client";

import {
  MoonStars,
  Cross,
  Church,
  HandsPraying,
  FlagBanner,
  BookOpen,
  Translate,
  Chat,
  MathOperations,
  Scroll,
  SoccerBall,
  Palette,
  Wrench,
  Laptop,
  Atom,
  Flask,
  Dna,
  GlobeHemisphereWest,
  UsersThree,
  Coins,
  Compass,
  type Icon,
} from "@phosphor-icons/react";
import { mataPelajaran } from "@/features/struktur-organisasi/data/struktur-data";

// Resolve nama ikon (string di data plain) → komponen Phosphor (client-only).
const ICON_MAP: Record<string, Icon> = {
  MoonStars,
  Cross,
  Church,
  HandsPraying,
  FlagBanner,
  BookOpen,
  Translate,
  Chat,
  MathOperations,
  Scroll,
  SoccerBall,
  Palette,
  Wrench,
  Laptop,
  Atom,
  Flask,
  Dna,
  GlobeHemisphereWest,
  UsersThree,
  Coins,
  Compass,
};

export function MapelChips() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {mataPelajaran.map(({ name, iconName }) => {
        const Icon = ICON_MAP[iconName] ?? Compass;
        return (
          <div
            key={name}
            className="flex items-center gap-2 rounded-full border border-white/50 bg-white/50 px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/80"
          >
            <Icon
              weight="duotone"
              className="size-4 shrink-0 text-brand-primary"
            />
            {name}
          </div>
        );
      })}
    </div>
  );
}
