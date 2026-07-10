// Tipe data Ekstrakurikuler — mengikuti envelope API publik SIMS
// (sama bentuk dengan BeritaResponse / AchievementResponse).
// List:   GET /api/public/extracurriculars        → result: ExtracurricularListItem[]
// Detail: GET /api/public/extracurriculars/{slug} → result: ExtracurricularDetail

export interface ExtracurricularListItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  imageUrl: string;
}

export interface ExtracurricularAdvisor {
  name: string;
  photoUrl: string;
}

export interface ExtracurricularMember {
  name: string;
  role: string; // "HEAD" | "VICE" | "MEMBER" | ...
  roleLabel: string;
  photoUrl: string;
}

export interface ExtracurricularSchedule {
  dayOfWeek: number; // 0=Minggu ... 6=Sabtu (konvensi JS getDay)
  startTime: string;
  endTime: string;
  location: string;
}

export interface ExtracurricularProgram {
  title: string;
  description: string;
  imageUrl: string;
}

export interface ExtracurricularFaq {
  question: string;
  answer: string;
}

export interface ExtracurricularDetail {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  contentHtml: string;
  visionHtml: string;
  missionHtml: string;
  imageUrl: string;
  registrationUrl: string;
  contactPhone: string;
  contactEmail: string;
  instagramUrl: string;
  whatsappUrl: string;
  youtubeUrl: string;
  facebookUrl: string;
  advisor: ExtracurricularAdvisor | null;
  members: ExtracurricularMember[];
  schedules: ExtracurricularSchedule[];
  programs: ExtracurricularProgram[];
  faqs: ExtracurricularFaq[];
}

export interface ExtracurricularMeta {
  total?: number;
  page?: number;
  limit?: number;
}

export interface ExtracurricularListResponse {
  success: boolean;
  message: string;
  meta: ExtracurricularMeta;
  errors: unknown[];
  result: ExtracurricularListItem[];
}

export interface ExtracurricularDetailResponse {
  success: boolean;
  message: string;
  meta: ExtracurricularMeta;
  errors: unknown[];
  result: ExtracurricularDetail;
}
