export interface EkskulSchedule {
  days: string[];
  time: string;
  location?: string;
}

export interface EkskulSocialMedia {
  platform: "instagram" | "tiktok" | "youtube" | "whatsapp" | "website";
  handle: string;
  url: string;
}

export interface EkskulOrganizationMember {
  name: string;
  role: string;
  photo: string;
}

export interface EkskulOrganizationStructure {
  pembina: { name: string; role?: string; photo: string };
  ketua: { name: string; kelas?: string; photo: string };
  anggota: EkskulOrganizationMember[];
}

export interface EkskulProgram {
  title: string;
  description: string;
  image?: string;
}

export interface EkskulFaq {
  question: string;
  answer: string;
}

export interface EkskulDetail {
  slug: string;
  title: string;
  category: "akademik" | "non-akademik";
  categoryLabel: string;
  shortDescription: string;
  description: string[];
  coverImage: string;
  schedule: EkskulSchedule[];
  socialMedia: EkskulSocialMedia[];
  vision: string;
  mission: string[];
  structure: EkskulOrganizationStructure;
  registrationLink?: string;
  contact: { phone: string; email: string };
  programs: EkskulProgram[];
  faq: EkskulFaq[];
}
