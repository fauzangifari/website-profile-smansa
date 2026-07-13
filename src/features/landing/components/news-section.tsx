"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { newsSectionGroups, placeholderImages } from "@/features/landing/data/landing-data";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";
import type { Achievement } from "@/features/prestasi/types/achievement";
import type { BeritaListItem } from "@/features/berita/types/berita";
import { formatTanggal } from "@/features/berita/utils/berita-helpers";

const toneClasses = {
  primary: {
    badge: "bg-brand-primary-soft text-brand-primary",
    card:
      "hover:border-brand-primary/30 hover:bg-brand-primary-soft/40 hover:shadow-[0_18px_50px_rgba(30,64,175,0.10)]",
    mark: "bg-brand-primary text-white",
    line: "bg-brand-primary",
  },
  warning: {
    badge: "bg-warning/15 text-warning",
    card:
      "hover:border-warning/30 hover:bg-warning/10 hover:shadow-[0_18px_50px_rgba(180,83,9,0.10)]",
    mark: "bg-warning text-white",
    line: "bg-warning",
  },
  success: {
    badge: "bg-success/10 text-success",
    card:
      "hover:border-success/30 hover:bg-success/10 hover:shadow-[0_18px_50px_rgba(15,118,110,0.10)]",
    mark: "bg-success text-white",
    line: "bg-success",
  },
} as const;

// Post SIMS dibagi berdasarkan kategori: yang berkategori "pengumuman" masuk
// grup Pengumuman, sisanya masuk grup Berita. Keduanya menuju /posts/[slug].
const isPengumuman = (post: BeritaListItem) =>
  post.category?.slug?.toLowerCase() === "pengumuman";

function mapBeritaItem(post: BeritaListItem) {
  return {
    title: post.title,
    date: formatTanggal(post.publishedAt),
    imageSrc: post.coverImageUrl,
    excerpt: post.excerpt,
    href: `/posts/${post.slug}`,
  };
}

type NewsSectionProps = {
  achievements: Achievement[];
  berita: BeritaListItem[];
};

export function NewsSection({
  achievements = [],
  berita = [],
}: NewsSectionProps) {
  const headerRef = useScrollReveal();
  const contentRef = useScrollReveal({ stagger: true });

  const beritaItems = berita.filter((post) => !isPengumuman(post));
  const pengumumanItems = berita.filter(isPengumuman);

  return (
    <section
      id="berita"
      className="relative overflow-hidden bg-white py-[var(--section-padding-y)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute -left-24 bottom-14 h-72 w-72 rounded-full bg-brand-accent/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute right-8 top-20 h-56 w-56 rounded-full border border-brand-primary/10"
      />

      <Container>
        <div ref={headerRef} className="scroll-reveal">
          <SectionHeader
            eyebrow="Berita SMANSA"
            title="Berita Terbaru"
            description="Informasi terbaru, pengumuman, kegiatan sekolah, dan agenda penting SMANSA disusun ringkas agar mudah dipindai."
          />
        </div>

        <div ref={contentRef} className="scroll-reveal-stagger mt-8 grid gap-4">
          {newsSectionGroups.map((group, index) => {
            const tone = toneClasses[group.tone];

            let renderItems: any[] = group.items.slice(0, 3);
            let isGroupEmpty = false;

            if (group.key === "prestasi") {
              const mappedAchievements = achievements.slice(0, 3).map((ach) => ({
                title: ach.name,
                date: new Date(ach.date).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }),
                imageSrc: ach.photoUrl || placeholderImages.achievement,
                excerpt: `Tingkat: ${ach.level} • Penyelenggara: ${ach.organizer}`,
                href: `#prestasi`,
              }));

              isGroupEmpty = mappedAchievements.length === 0;

              if (!isGroupEmpty) {
                renderItems = [
                  ...mappedAchievements,
                  ...Array(3 - mappedAchievements.length).fill(null),
                ];
              }
            }

            if (group.key === "berita") {
              const mappedBerita = beritaItems.slice(0, 3).map(mapBeritaItem);

              isGroupEmpty = mappedBerita.length === 0;

              if (!isGroupEmpty) {
                renderItems = [
                  ...mappedBerita,
                  ...Array(3 - mappedBerita.length).fill(null),
                ];
              }
            }

            if (group.key === "pengumuman") {
              const mappedPengumuman = pengumumanItems
                .slice(0, 3)
                .map(mapBeritaItem);

              isGroupEmpty = mappedPengumuman.length === 0;

              if (!isGroupEmpty) {
                renderItems = [
                  ...mappedPengumuman,
                  ...Array(3 - mappedPengumuman.length).fill(null),
                ];
              }
            }

            const totalItemsCount =
              group.key === "prestasi"
                ? achievements.length
                : group.key === "berita"
                  ? beritaItems.length
                  : pengumumanItems.length;

            return (
              <div
                key={group.key}
                className="scroll-reveal grid gap-3 lg:grid-cols-[minmax(240px,0.72fr)_minmax(0,1.45fr)] lg:items-stretch lg:gap-6"
                style={{ "--stagger-index": index } as React.CSSProperties}
              >
                <a href={group.href} className="group block h-full">
                  <Card
                    className={cn(
                      "flex h-full flex-col justify-between gap-4 border-neutral-200/80 bg-white/88 p-4 hover:-translate-y-1 md:p-5",
                      tone.card,
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span
                          className={cn(
                            "inline-flex h-7 items-center rounded-sm px-2.5 text-xs font-semibold",
                            tone.badge,
                          )}
                        >
                          {group.eyebrow}
                        </span>
                        <h3 className="mt-3 text-xl font-extrabold tracking-tight text-neutral-950 md:text-2xl">
                          {group.label}
                        </h3>
                      </div>
                      <span
                        className={cn(
                          "grid size-10 shrink-0 place-items-center rounded-lg text-sm font-extrabold",
                          tone.mark,
                        )}
                      >
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-sm leading-6 text-neutral-700 lg:leading-5">
                      {group.description}
                    </p>
                    <div className="flex items-center justify-between border-t border-neutral-200 pt-3 text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
                      <span>{totalItemsCount} terbaru</span>
                      <span
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        -&gt;
                      </span>
                    </div>
                  </Card>
                </a>

                <Card className="h-full overflow-hidden p-0">
                  <div className="grid h-full gap-0 md:grid-cols-[160px_1fr]">
                    <div className="border-b border-neutral-200 bg-neutral-50 p-4 md:border-b-0 md:border-r md:p-5">
                      <Badge className={tone.badge}>{group.label}</Badge>
                      <h3 className="mt-3 text-base font-extrabold leading-snug text-neutral-950 md:text-lg">
                        3 informasi terakhir
                      </h3>
                      <span
                        aria-hidden="true"
                        className={cn("mt-4 block h-1 w-12 rounded-full", tone.line)}
                      />
                    </div>
                    <div className="divide-y divide-neutral-200">
                      {isGroupEmpty ? (
                        <div className="flex h-full min-h-[300px] items-center justify-center p-6 text-center text-sm font-medium text-neutral-500">
                          {group.key === "berita"
                            ? "Belum ada berita saat ini."
                            : group.key === "pengumuman"
                              ? "Belum ada pengumuman saat ini."
                              : "Belum ada data prestasi saat ini."}
                        </div>
                      ) : (
                        renderItems.map((item, idx) => {
                          if (item === "skeleton") {
                            return (
                              <div
                                key={`skeleton-${idx}`}
                                className="grid animate-pulse grid-cols-[120px_1fr] gap-3 px-4 py-3.5 sm:grid-cols-[140px_1fr] sm:gap-4 md:px-5"
                              >
                                <div className="aspect-[4/3] rounded-lg bg-neutral-200" />
                                <div className="flex flex-col justify-center space-y-3">
                                  <div className="h-3 w-20 rounded bg-neutral-200" />
                                  <div className="h-4 w-full rounded bg-neutral-200" />
                                  <div className="h-3 w-3/4 rounded bg-neutral-200" />
                                </div>
                              </div>
                            );
                          }

                          if (item === null) {
                            return (
                              <div
                                key={`blank-${idx}`}
                                className="invisible grid grid-cols-[120px_1fr] gap-3 px-4 py-3.5 sm:grid-cols-[140px_1fr] sm:gap-4 md:px-5"
                              >
                                <div className="aspect-[4/3]" />
                              </div>
                            );
                          }

                          return (
                            <a
                              key={item.title + idx}
                              href={item.href}
                              className="group grid grid-cols-[120px_1fr] gap-3 px-4 py-3.5 transition-colors hover:bg-neutral-50 sm:grid-cols-[140px_1fr] sm:gap-4 md:px-5"
                            >
                              <span className="relative aspect-[4/3] overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 shadow-sm">
                                <Image
                                  src={item.imageSrc}
                                  alt={item.title}
                                  fill
                                  sizes="(max-width: 640px) 120px, 140px"
                                  className="object-cover transition duration-500 ease-out group-hover:scale-105"
                                />
                                {group.key === "prestasi" && (
                                  <Image
                                    src="/images/template/prestasi.png"
                                    alt=""
                                    fill
                                    className="object-cover pointer-events-none z-10"
                                    sizes="(max-width: 640px) 120px, 140px"
                                  />
                                )}
                                {group.key === "berita" && (
                                  <Image
                                    src="/images/template/berita.png"
                                    alt=""
                                    fill
                                    className="object-cover pointer-events-none z-10"
                                    sizes="(max-width: 640px) 120px, 140px"
                                  />
                                )}
                                {group.key === "pengumuman" && (
                                  <Image
                                    src="/images/template/pengumuman.png"
                                    alt=""
                                    fill
                                    className="object-cover pointer-events-none z-10"
                                    sizes="(max-width: 640px) 120px, 140px"
                                  />
                                )}
                                <span className="absolute inset-0 bg-gradient-to-t from-neutral-950/20 via-transparent to-white/10 z-20" />
                              </span>
                              <span className="min-w-0 self-center">
                                <time className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-500">
                                  {item.date}
                                </time>
                                <span className="block text-base font-bold leading-snug text-neutral-950 transition-colors group-hover:text-brand-primary">
                                  {item.title}
                                </span>
                                <span className="mt-1.5 block text-sm leading-6 text-neutral-700 md:leading-5">
                                  {item.excerpt}
                                </span>
                              </span>
                            </a>
                          );
                        })
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="mt-7 flex justify-center md:mt-10">
          <a
            href="/posts"
            className="inline-flex h-12 items-center justify-center rounded-full bg-brand-primary px-8 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            Lihat Semua Informasi
          </a>
        </div>
      </Container>
    </section>
  );
}
