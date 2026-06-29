"use client";

import Image from "next/image";
import { CalendarBlank, Buildings, Users, User, ArrowSquareOut } from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Achievement } from "@/features/prestasi/types/achievement";
import {
  formatLevel,
  getLevelColor,
  formatType,
  getTypeColor,
  formatRank,
  getRankMedal,
  formatDate,
  getStudentMembers,
} from "@/features/prestasi/utils/achievement-helpers";

const FRAME_SRC = "/images/template/prestasi.png";

interface AchievementCardProps {
  achievement: Achievement;
  onPhotoClick: (src: string, alt: string) => void;
}

export function AchievementCard({ achievement, onPhotoClick }: AchievementCardProps) {
  const {
    name,
    type,
    level,
    date,
    organizer,
    rank,
    participantType,
    photoUrl,
    members,
  } = achievement;

  const students = getStudentMembers(members);
  const isGroup = participantType === "GROUP";
  const medal = getRankMedal(rank);
  const rankLabel = formatRank(rank);

  return (
    <Card
      variant="glass-soft"
      className={cn(
        "group flex flex-col gap-0 overflow-hidden p-0 border border-transparent",
        "transition-all duration-500 ease-out",
        "hover:border-brand-primary/25 hover:shadow-2xl hover:shadow-brand-primary/10 hover:-translate-y-1"
      )}
    >
      {/* ── Thumbnail section ─────────────────────────────────────────────
          Frame PNG (RGBA) diletakkan di atas foto sebagai overlay (z-20).
          Foto terlihat melalui area transparan frame.
          Badge Level/Type dipindah ke card body — tidak di thumbnail.
      ─────────────────────────────────────────────────────────────────── */}
      {photoUrl ? (
        <button
          id={`photo-btn-${achievement.id}`}
          onClick={() => onPhotoClick(photoUrl, name)}
          className="relative block w-full overflow-hidden bg-slate-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/30"
          style={{ aspectRatio: "4/3" }}
          aria-label={`Lihat foto dokumentasi ${name}`}
        >
          {/* Foto asli — base layer */}
          <Image
            src={photoUrl}
            alt={`Foto dokumentasi ${name}`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />

          {/* Frame overlay — tampil di atas foto */}
          <Image
            src={FRAME_SRC}
            alt=""
            fill
            aria-hidden="true"
            className="object-cover pointer-events-none"
            style={{ zIndex: 20 }}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            priority={false}
          />

          {/* Hover overlay "Lihat Foto" — di atas frame */}
          <div
            className={cn(
              "absolute inset-0 z-30 flex items-center justify-center pointer-events-none",
              "opacity-0 transition-all duration-300",
              "group-hover:opacity-100"
            )}
          >
            <div
              className={cn(
                "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white",
                "bg-black/50 backdrop-blur-md border border-white/25 shadow-2xl",
                "translate-y-1.5 scale-95 transition-all duration-300",
                "group-hover:translate-y-0 group-hover:scale-100"
              )}
            >
              <ArrowSquareOut size={14} weight="bold" />
              Lihat Foto
            </div>
          </div>
        </button>
      ) : (
        /* ── No photo fallback — frame tampil di atas gradient ── */
        <div
          className="relative w-full overflow-hidden bg-gradient-to-br from-slate-50 via-neutral-100 to-slate-200"
          style={{ aspectRatio: "4/3" }}
        >
          {/* Dekoratif */}
          <div className="absolute size-32 rounded-full bg-neutral-200/60 blur-2xl -top-4 -left-4 pointer-events-none" />
          <div className="absolute size-24 rounded-full bg-neutral-300/40 blur-xl bottom-0 right-0 pointer-events-none" />

          {/* Rank medal — tampil di area transparan frame */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3" style={{ paddingBottom: "13%" }}>
            <span className="text-5xl leading-none drop-shadow-sm">{medal}</span>
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
              {rankLabel}
            </span>
          </div>

          {/* Frame overlay */}
          <Image
            src={FRAME_SRC}
            alt=""
            fill
            aria-hidden="true"
            className="object-cover pointer-events-none"
            style={{ zIndex: 20 }}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>
      )}

      {/* ── Card Body ─────────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-2.5 p-4">

        {/* Rank pill + Level & Type badges — dipindah dari thumbnail ke sini */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Rank */}
          <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-bold text-neutral-700">
            <span className="text-sm leading-none">{medal}</span>
            {rankLabel}
          </span>
          {/* Level */}
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold",
              getLevelColor(level)
            )}
          >
            {formatLevel(level)}
          </span>
          {/* Type */}
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold",
              getTypeColor(type)
            )}
          >
            {formatType(type)}
          </span>
        </div>

        {/* Achievement name */}
        <h3
          className={cn(
            "text-sm font-extrabold leading-snug text-neutral-900",
            "transition-colors duration-300 group-hover:text-brand-primary",
            "line-clamp-2"
          )}
        >
          {name}
        </h3>

        {/* Meta rows */}
        <div className="mt-auto flex flex-col gap-1.5 pt-2.5 border-t border-neutral-100/80">
          {/* Participants */}
          <div className="flex items-start gap-2">
            {isGroup ? (
              <Users size={13} className="mt-0.5 shrink-0 text-neutral-400" />
            ) : (
              <User size={13} className="mt-0.5 shrink-0 text-neutral-400" />
            )}
            <div className="flex-1 min-w-0">
              <p className={cn("text-xs font-semibold text-neutral-700", isGroup ? "leading-snug" : "truncate")}>
                {isGroup
                  ? students.length > 0
                    ? students.slice(0, 3).join(", ") +
                      (students.length > 3 ? ` +${students.length - 3} lainnya` : "")
                    : "Tim"
                  : (students[0] ?? "—")}
              </p>
              <p className="text-[10px] text-neutral-400 font-medium mt-0.5">
                {isGroup ? `Beregu · ${students.length} peserta` : "Perorangan"}
              </p>
            </div>
          </div>

          {/* Organizer */}
          <div className="flex items-center gap-2">
            <Buildings size={13} className="shrink-0 text-neutral-400" />
            <p className="text-xs text-neutral-500 font-medium truncate">{organizer}</p>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2">
            <CalendarBlank size={13} className="shrink-0 text-neutral-400" />
            <p className="text-xs text-neutral-500 font-medium">{formatDate(date)}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
