// ── Level display mappings ──────────────────────────────────────────────────

const LEVEL_LABEL: Record<string, string> = {
  KABUPATEN_KOTA: "Kabupaten/Kota",
  PROVINSI: "Provinsi",
  NASIONAL: "Nasional",
  INTERNASIONAL: "Internasional",
};

const LEVEL_ORDER: Record<string, number> = {
  KABUPATEN_KOTA: 1,
  PROVINSI: 2,
  NASIONAL: 3,
  INTERNASIONAL: 4,
};

/** "KABUPATEN_KOTA" → "Kabupaten/Kota" */
export function formatLevel(level: string): string {
  return LEVEL_LABEL[level] ?? level.replace(/_/g, " ");
}

/** Tailwind color classes per level for badge styling */
export function getLevelColor(level: string): string {
  switch (level) {
    case "KABUPATEN_KOTA":
      return "bg-sky-100 text-sky-700";
    case "PROVINSI":
      return "bg-indigo-100 text-indigo-700";
    case "NASIONAL":
      return "bg-amber-100 text-amber-700";
    case "INTERNASIONAL":
      return "bg-emerald-100 text-emerald-700";
    default:
      return "bg-neutral-100 text-neutral-700";
  }
}

/** Sort order value for a level (lower = lower tier) */
export function getLevelOrder(level: string): number {
  return LEVEL_ORDER[level] ?? 0;
}

// ── Type display ────────────────────────────────────────────────────────────

/** "SAINS" → "Sains", "OLAHRAGA" → "Olahraga" */
export function formatType(type: string): string {
  const lower = type.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

/** Tailwind color classes per type */
export function getTypeColor(type: string): string {
  switch (type.toUpperCase()) {
    case "SAINS":
      return "bg-brand-primary-soft text-brand-primary";
    case "OLAHRAGA":
      return "bg-orange-100 text-orange-700";
    case "SENI":
      return "bg-pink-100 text-pink-700";
    case "TEKNOLOGI":
      return "bg-violet-100 text-violet-700";
    case "BAHASA":
      return "bg-teal-100 text-teal-700";
    default:
      return "bg-neutral-100 text-neutral-700";
  }
}

// ── Rank display ────────────────────────────────────────────────────────────

/** rank 1 → "Juara 1", rank 10 → "Peringkat 10" */
export function formatRank(rank: number): string {
  if (rank <= 3) return `Juara ${rank}`;
  return `Peringkat ${rank}`;
}

/** Get medal emoji for rank */
export function getRankMedal(rank: number): string {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return "🏅";
}

// ── Date display ────────────────────────────────────────────────────────────

/** ISO date string → "31 Mei 2026" */
export function formatDate(date: string): string {
  try {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  } catch {
    return date;
  }
}

// ── Participant display ─────────────────────────────────────────────────────

/** Get student members only (excluding teachers) */
export function getStudentMembers(members: { name: string; role: string }[]): string[] {
  return members
    .filter((m) => m.role === "STUDENT" || m.role === "UNKNOWN")
    .map((m) => m.name);
}

/** Get a short display label for participants */
export function getParticipantLabel(
  members: { name: string; role: string }[],
  participantType: string
): string {
  const students = getStudentMembers(members);
  if (students.length === 0) return "—";
  if (participantType === "INDIVIDUAL") return students[0];
  if (students.length === 1) return students[0];
  return `${students[0]} +${students.length - 1} lainnya`;
}
