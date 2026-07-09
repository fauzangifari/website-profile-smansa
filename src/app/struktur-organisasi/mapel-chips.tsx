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

const mapel: { name: string; icon: Icon }[] = [
  { name: "Pendidikan Agama Islam", icon: MoonStars },
  { name: "Pendidikan Agama Kristen", icon: Cross },
  { name: "Pendidikan Agama Katholik", icon: Church },
  { name: "Pendidikan Agama Hindu", icon: HandsPraying },
  { name: "Pendidikan Pancasila dan Kewarganegaraan", icon: FlagBanner },
  { name: "Bahasa Indonesia", icon: BookOpen },
  { name: "Bahasa Inggris", icon: Translate },
  { name: "Bahasa Jerman", icon: Chat },
  { name: "Matematika", icon: MathOperations },
  { name: "Sejarah", icon: Scroll },
  { name: "Pendidikan Jasmani, Olahraga, dan Kesehatan", icon: SoccerBall },
  { name: "Seni Budaya", icon: Palette },
  { name: "Prakarya dan Kewirausahaan", icon: Wrench },
  { name: "Informatika", icon: Laptop },
  { name: "Fisika", icon: Atom },
  { name: "Kimia", icon: Flask },
  { name: "Biologi", icon: Dna },
  { name: "Geografi", icon: GlobeHemisphereWest },
  { name: "Sosiologi", icon: UsersThree },
  { name: "Ekonomi", icon: Coins },
  { name: "Bimbingan Konseling", icon: Compass },
];

export function MapelChips() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {mapel.map(({ name, icon: Icon }) => (
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
      ))}
    </div>
  );
}
