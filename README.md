# Website Profile SMANSA

Website profile SMA Negeri 1 Samarinda dibangun dengan Next.js App Router,
React, TypeScript, dan Tailwind CSS.

## Development

```bash
npm run dev
npm run lint
npm run build
```

## Struktur Folder

```text
src/
  app/                  Route Next.js App Router
    (internal)/         Route referensi internal tanpa mengubah URL
  components/site/      Navbar, footer, dan shell UI lintas halaman
  components/providers/ Provider client global
  components/ui/        Primitive UI yang reusable lintas halaman
  config/               Konfigurasi global seperti metadata dan navigasi
  features/landing/     Komponen, data, dan type khusus halaman landing
  features/profile/     Komponen dan data khusus halaman profil
  lib/                  Utility umum
docs/                   PRD dan dokumen design system
public/                 Aset statis runtime
```

Alias TypeScript `@/*` mengarah ke `src/*`.
Project ini distandarkan memakai npm, jadi gunakan `package-lock.json` sebagai lockfile utama.

## Route Utama

- `/` menampilkan landing page website profile.
- `/profil` menampilkan profil sekolah.
- `/visi-misi` menampilkan visi dan misi sekolah.
- `/design-system` menampilkan referensi komponen dan token UI.
- `/template-page` menampilkan template halaman internal.
