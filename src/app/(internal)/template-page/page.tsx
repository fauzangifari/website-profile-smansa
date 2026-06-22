import type { Metadata } from "next";
import { PageTemplate } from "@/components/layout/page-template";
import { AppNavbar } from "@/components/site/app-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { mainNavItems } from "@/config/site";

export const metadata: Metadata = {
  title: "Template Halaman",
  description:
    "Template reusable halaman internal SMANSA dengan title, background foto, dan konten glassmorphism.",
};

const highlights = [
  {
    label: "Reusable",
    value: "1 komponen",
    description: "Dipakai ulang untuk profil, berita, program, fasilitas, dan halaman internal lain.",
  },
  {
    label: "Visual",
    value: "Foto + glass",
    description: "Background sekolah tetap kuat, sementara teks utama tetap mudah dibaca.",
  },
  {
    label: "Layout",
    value: "Responsif",
    description: "Hero, breadcrumb, dan konten menyesuaikan desktop, tablet, dan mobile.",
  },
];

export default function TemplatePage() {
  return (
    <>
      <AppNavbar items={mainNavItems} anchorBasePath="/" />
      <PageTemplate
        variant="glass"
        eyebrow="Template Page"
        title="Judul Halaman yang Konsisten untuk Semua Konten"
        description="Gunakan template ini sebagai fondasi halaman internal SMANSA. Setiap page cukup mengatur title, deskripsi, breadcrumb, background, lalu mengisi konten sesuai kebutuhan."
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Template Page" },
        ]}
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start">
          <article className="reveal-rise space-y-8">
            <Card variant="glass-strong" className="border-white/40 p-8 md:p-10">
              <Badge variant="glass" className="mb-6">
                Contoh Konten
              </Badge>
              <h2 className="text-2xl font-bold leading-tight text-neutral-900 md:text-4xl">
                Area isi fleksibel untuk artikel, informasi, atau halaman profil.
              </h2>
              <p className="mt-6 text-base leading-8 text-neutral-700 md:text-lg">
                Struktur template dibuat agar halaman berikutnya tidak perlu
                mengulang pola hero, breadcrumb, background, dan container.
                Konten di dalamnya bebas diisi dengan teks panjang, grid card,
                daftar informasi, gambar, atau komponen khusus lain.
              </p>
              
              <div className="mt-12 grid gap-6 sm:grid-cols-3">
                {highlights.map((item, idx) => (
                  <Card
                    key={item.label}
                    variant="glass-soft"
                    className="reveal-rise flex flex-col justify-between border-white/30 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
                    style={{ animationDelay: `${(idx + 1) * 150}ms` }}
                  >
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-brand-primary">
                        {item.label}
                      </p>
                      <p className="mt-4 text-3xl font-black text-neutral-900">
                        {item.value}
                      </p>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                      {item.description}
                    </p>
                  </Card>
                ))}
              </div>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
               <Card variant="glass" className="bg-white/40 p-8 border-white/20">
                  <h3 className="text-xl font-bold text-neutral-900">
                    Cara pakai singkat
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-neutral-700">
                    Import <code>PageTemplate</code>, isi prop <code>title</code>, <code>description</code>,
                    <code>breadcrumbs</code>, dan opsional <code>backgroundImage</code>. Gunakan <code>variant=&quot;glass&quot;</code> untuk tampilan ini.
                  </p>

               </Card>
               <div className="rounded-2xl border border-brand-primary/20 bg-brand-primary/10 p-8 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-brand-primary">
                    Tips Desain
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-neutral-700">
                    Gunakan `Card` dengan variant `glass-soft` atau `glass-strong` untuk menjaga keterbacaan di atas background yang kompleks.
                  </p>
               </div>
            </div>
          </article>

          <aside className="reveal-rise-delayed lg:sticky lg:top-28" style={{ animationDelay: "400ms" }}>
            <Card variant="glass-strong" className="bg-brand-primary-soft/30 border-brand-primary/20 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">
                Detail Teknis
              </p>
              <div className="mt-6 space-y-6 text-sm leading-relaxed text-neutral-700">
                <div className="flex gap-4">
                  <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-primary" />
                  <p>Background memakai foto sekolah dengan overlay blur dinamis.</p>
                </div>
                <div className="flex gap-4">
                  <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-primary" />
                  <p>Efek glass menggunakan backdrop-filter: blur(20px) untuk kedalaman maksimal.</p>
                </div>
                <div className="flex gap-4">
                   <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-primary" />
                   <p>Sistem grid responsif yang menyesuaikan ukuran layar secara halus.</p>
                </div>
              </div>
              
              <div className="mt-8 border-t border-brand-primary/10 pt-6">
                 <button className="w-full rounded-xl bg-brand-primary py-3 font-bold text-white shadow-lg shadow-brand-primary/25 transition-colors hover:bg-brand-primary-hover">
                    Pelajari Dokumentasi
                 </button>
              </div>
            </Card>
            
            <div className="mt-6 hidden lg:block">
               <div className="glass-soft relative overflow-hidden rounded-2xl border border-white/30 p-6 h-48">
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-accent/20 blur-2xl" />
                  <p className="relative z-10 text-sm font-medium italic text-neutral-600">
                    &quot;Kreativitas tanpa batas, harmoni dalam estetika digital SMANSA.&quot;
                  </p>
                  <p className="relative z-10 mt-4 text-xs font-bold text-neutral-400">
                    — Tim SIMSDIG
                  </p>
               </div>
            </div>
          </aside>
        </div>
      </PageTemplate>
      <SiteFooter anchorBasePath="/" />
    </>
  );
}
