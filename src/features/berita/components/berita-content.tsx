"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  CalendarBlank,
  Funnel,
  Newspaper,
  PushPin,
  WarningCircle,
  X,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { SearchInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { BeritaCard } from "@/features/berita/components/berita-card";
import { BeritaTemplateOverlay } from "@/features/berita/components/berita-template-overlay";
import {
  formatTanggal,
  getBeritaCategories,
  sortByPublishedDesc,
} from "@/features/berita/utils/berita-helpers";
import type { BeritaListItem } from "@/features/berita/types/berita";

type BeritaContentProps = {
  data: BeritaListItem[];
  error?: string | null;
  initialCategory?: string;
  initialTag?: string;
};

gsap.registerPlugin(ScrollTrigger);

const ALL = "semua" as const;

export function BeritaContent({
  data,
  error,
  initialCategory,
  initialTag,
}: BeritaContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>(
    initialCategory || ALL,
  );
  const [activeTag, setActiveTag] = useState<string | null>(
    initialTag || null,
  );
  const [query, setQuery] = useState("");

  const sorted = useMemo(() => sortByPublishedDesc(data), [data]);
  const categories = useMemo(() => getBeritaCategories(data), [data]);

  // Nama tampilan untuk chip tag aktif — di-derive dari data (fallback ke slug).
  const activeTagName = useMemo(() => {
    if (!activeTag) return null;
    for (const item of data) {
      const found = item.tags.find((tag) => tag.slug === activeTag);
      if (found) return found.name;
    }
    return activeTag;
  }, [data, activeTag]);

  // Filter dari URL menyembunyikan featured spotlight agar tidak menampilkan
  // berita yang tak relevan dengan filter.
  const hasUrlFilter = Boolean(initialCategory || initialTag);

  const featured = useMemo(
    () => sorted.find((item) => item.pinned) ?? sorted[0],
    [sorted],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sorted.filter((item) => {
      const matchCategory =
        activeCategory === ALL || item.category?.slug === activeCategory;
      const matchTag =
        activeTag === null || item.tags.some((tag) => tag.slug === activeTag);
      const matchQuery =
        q.length === 0 ||
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.name.toLowerCase().includes(q));
      return matchCategory && matchTag && matchQuery;
    });
  }, [sorted, activeCategory, activeTag, query]);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.8 },
      });
      tl.from(".reveal-featured", { y: 30, opacity: 0 }).from(
        ".reveal-controls",
        { y: 20, opacity: 0 },
        "-=0.5",
      );
      gsap.from(".reveal-grid-item", {
        scrollTrigger: {
          trigger: ".reveal-grid",
          start: "top 95%",
          once: true,
        },
        y: 24,
        opacity: 0,
        stagger: 0.08,
        ease: "power3.out",
        duration: 0.6,
      });

      // Cover images (next/image fill) menggeser tinggi setelah load — hitung
      // ulang posisi trigger agar item grid tidak tersangkut opacity 0.
      ScrollTrigger.refresh();
    },
    {
      scope: containerRef,
      // Re-create reveal saat filter kategori/tag berubah; revertOnUpdate
      // menghapus opacity:0 inline pada node yang di-reuse (key slug sama).
      dependencies: [activeCategory, activeTag],
      revertOnUpdate: true,
    },
  );

  // Error dari server → tampilkan state gagal muat.
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-danger/40 bg-danger/5 px-6 py-16 text-center">
        <div className="rounded-2xl bg-danger/10 p-4 text-danger">
          <WarningCircle weight="duotone" size={32} />
        </div>
        <div className="space-y-1">
          <p className="text-lg font-bold text-neutral-900">
            Gagal memuat berita
          </p>
          <p className="max-w-md text-sm text-neutral-500">
            Terjadi kendala saat mengambil data berita. Silakan muat ulang
            halaman beberapa saat lagi.
          </p>
        </div>
        <Link href="/" className="text-sm font-semibold text-brand-primary hover:underline">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  const filters: { slug: string; name: string }[] = [
    { slug: ALL, name: "Semua" },
    ...categories.map((cat) => ({ slug: cat.slug, name: cat.name })),
  ];

  return (
    <div ref={containerRef} className="space-y-14">
      {/* Featured spotlight */}
      {featured && !hasUrlFilter ? (
        <section className="reveal-featured relative">
          <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-brand-primary/15 via-transparent to-brand-accent/10 blur-2xl opacity-60" />
          <GlassCard className="relative overflow-hidden border-white/40 p-0 shadow-2xl backdrop-blur-3xl">
            <div className="grid gap-0 lg:grid-cols-[1.1fr_1fr]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={featured.coverImageUrl}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <BeritaTemplateOverlay
                  categorySlug={featured.category.slug}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {featured.pinned ? (
                  <div className="absolute left-4 top-4 z-20 flex items-center gap-2">
                    <Badge
                      variant="glass"
                      className="flex items-center gap-1.5 px-3 py-1"
                    >
                      <PushPin weight="fill" className="size-3.5 text-brand-primary" />
                      Disematkan
                    </Badge>
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col justify-center gap-5 p-7 md:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="primary" className="px-3 py-1">
                    {featured.category.name}
                  </Badge>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-neutral-500">
                    <CalendarBlank
                      weight="duotone"
                      className="size-4 text-brand-primary"
                    />
                    <time dateTime={featured.publishedAt}>
                      {formatTanggal(featured.publishedAt)}
                    </time>
                  </span>
                </div>

                <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-neutral-900 md:text-3xl">
                  {featured.title}
                </h2>

                <p className="text-base leading-relaxed text-neutral-600">
                  {featured.excerpt}
                </p>

                <div>
                  <Link
                    href={`/berita/${featured.slug}`}
                    className="group inline-flex h-13 items-center justify-center gap-2 rounded-md bg-brand-primary px-6 text-base font-semibold text-white shadow-lg shadow-brand-primary/20 transition duration-200 ease-out hover:bg-brand-primary-hover focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/30"
                  >
                    Baca selengkapnya
                    <ArrowRight
                      weight="bold"
                      className="size-4 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </GlassCard>
        </section>
      ) : null}

      {/* Filter + search controls */}
      <section className="reveal-controls space-y-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
            <Funnel weight="duotone" className="size-5 text-brand-primary" />
            Filter Kategori
          </div>
          <div className="w-full md:max-w-xs">
            <SearchInput
              id="cari-berita"
              placeholder="Cari berita..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-white/60 bg-white/50 focus:bg-white"
            />
          </div>
        </div>

        {filters.length > 1 ? (
          <div className="flex flex-wrap gap-2.5">
            {filters.map((cat) => {
              const isActive = cat.slug === activeCategory;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setActiveCategory(cat.slug)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/30",
                    isActive
                      ? "border-brand-primary bg-brand-primary text-white shadow-lg shadow-brand-primary/20"
                      : "border-white/60 bg-white/50 text-neutral-700 backdrop-blur-xl hover:bg-white/80",
                  )}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        ) : null}

        {activeTag ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-neutral-500">
              Menyaring tag:
            </span>
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand-primary bg-brand-primary/10 px-3 py-1.5 text-sm font-semibold text-brand-primary transition hover:bg-brand-primary/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/30"
            >
              #{activeTagName}
              <X weight="bold" className="size-3.5" />
            </button>
          </div>
        ) : null}
      </section>

      {/* Grid */}
      <section>
        {filtered.length > 0 ? (
          <div className="reveal-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <BeritaCard
                key={item.slug}
                item={item}
                className="reveal-grid-item"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-neutral-300 bg-white/40 px-6 py-16 text-center backdrop-blur-xl">
            <div className="rounded-2xl bg-brand-primary/10 p-4 text-brand-primary">
              <Newspaper weight="duotone" size={32} />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-bold text-neutral-900">
                Belum ada berita
              </p>
              <p className="text-sm text-neutral-500">
                Coba ubah kata kunci atau pilih kategori lain.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setActiveCategory(ALL);
                setActiveTag(null);
                setQuery("");
              }}
            >
              Reset filter
            </Button>
          </div>
        )}
      </section>

      {sorted.length > 0 ? (
        <p className="text-center text-xs text-neutral-400">
          Menampilkan {filtered.length} dari {sorted.length} berita ·{" "}
          <Link href="/" className="underline hover:text-brand-primary">
            Kembali ke Beranda
          </Link>
        </p>
      ) : null}
    </div>
  );
}
