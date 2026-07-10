import type { ExtracurricularDetail } from "@/features/ekskul/types/ekskul-detail";

// Konvensi JS getDay(): 0 = Minggu ... 6 = Sabtu.
// Sesuaikan bila backend memulai dari Senin (1 = Senin).
const DAY_LABELS = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

export function dayOfWeekLabel(n: number): string {
  return DAY_LABELS[n] ?? `Hari ${n}`;
}

export type EkskulSocialPlatform =
  | "instagram"
  | "whatsapp"
  | "youtube"
  | "facebook";

export type EkskulSocialLink = {
  platform: EkskulSocialPlatform;
  url: string;
};

export function buildSocialMedia(
  detail: ExtracurricularDetail
): EkskulSocialLink[] {
  const links: EkskulSocialLink[] = [
    { platform: "instagram", url: detail.instagramUrl },
    { platform: "whatsapp", url: detail.whatsappUrl },
    { platform: "youtube", url: detail.youtubeUrl },
    { platform: "facebook", url: detail.facebookUrl },
  ];
  return links.filter((link) => Boolean(link.url));
}

export type EkskulPerson = {
  photo: string;
  name: string;
  jabatan: string;
  tierClass: string;
};

export function buildPeople(detail: ExtracurricularDetail): EkskulPerson[] {
  const people: EkskulPerson[] = [];

  if (detail.advisor) {
    people.push({
      photo: detail.advisor.photoUrl,
      name: detail.advisor.name,
      jabatan: "Pembina",
      tierClass: "bg-brand-primary text-white",
    });
  }

  for (const member of detail.members) {
    people.push({
      photo: member.photoUrl,
      name: member.name,
      jabatan: member.roleLabel,
      tierClass:
        member.role?.toUpperCase() === "HEAD"
          ? "bg-brand-secondary text-white"
          : "bg-neutral-800 text-white",
    });
  }

  return people;
}
