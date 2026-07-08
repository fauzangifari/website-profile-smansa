// Tipe data Berita — mengikuti envelope API publik SIMS
// (sama bentuk dengan AchievementResponse di fitur prestasi).
// List:   GET /api/public/posts        → result: BeritaListItem[]
// Detail: GET /api/public/posts/{slug} → result: BeritaDetail

export interface BeritaCategory {
  id: string;
  slug: string;
  name: string;
}

export interface BeritaTag {
  id: string;
  slug: string;
  name: string;
}

export interface BeritaAttachment {
  type: string; // "PHOTO" | ...
  url: string;
}

export interface BeritaListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImageUrl: string;
  pinned: boolean;
  publishedAt: string; // ISO, mis. "2026-07-07T01:06:50.886Z"
  category: BeritaCategory;
  tags: BeritaTag[];
}

export interface BeritaDetail extends BeritaListItem {
  contentHtml: string;
  attachments: BeritaAttachment[];
}

export interface BeritaMeta {
  total?: number;
  page?: number;
  limit?: number;
}

export interface BeritaListResponse {
  success: boolean;
  message: string;
  meta: BeritaMeta;
  errors: unknown[];
  result: BeritaListItem[];
}

export interface BeritaDetailResponse {
  success: boolean;
  message: string;
  meta: BeritaMeta;
  errors: unknown[];
  result: BeritaDetail;
}
