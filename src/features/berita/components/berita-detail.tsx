"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarBlank,
  DownloadSimple,
  FileArrowDown,
  Images,
  Tag,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";
import { ShareButton } from "@/features/berita/components/share-button";
import { BeritaCard } from "@/features/berita/components/berita-card";
import { BeritaGallery } from "@/features/berita/components/berita-gallery";
import {
  formatTanggal,
  getBeritaLampiran,
} from "@/features/berita/utils/berita-helpers";
import type { BeritaDetail, BeritaListItem } from "@/features/berita/types/berita";

type BeritaDetailProps = {
  item: BeritaDetail;
  related: BeritaListItem[];
};

// Styling artikel HTML (contentHtml) tanpa plugin typography — pakai
// descendant variant Tailwind v4 pada tag yang mungkin muncul dari CMS.
const proseClass =
  "max-w-none text-base leading-8 text-neutral-700 " +
  "[&_p]:mb-5 [&_p:last-child]:mb-0 " +
  "[&_strong]:font-semibold [&_strong]:text-neutral-900 " +
  "[&_em]:italic " +
  "[&_a]:font-medium [&_a]:text-brand-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-brand-primary-hover " +
  "[&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-neutral-900 md:[&_h2]:text-2xl " +
  "[&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-neutral-900 " +
  "[&_ul]:mb-5 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6 " +
  "[&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-6 " +
  "[&_li]:leading-7 [&_li]:marker:text-brand-primary " +
  "[&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-brand-primary/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-neutral-600 " +
  "[&_img]:my-6 [&_img]:w-full [&_img]:rounded-lg [&_img]:border [&_img]:border-white/50 " +
  "[&_figure]:my-6 [&_figcaption]:mt-2 [&_figcaption]:text-center [&_figcaption]:text-xs [&_figcaption]:text-neutral-500 " +
  "[&_hr]:my-8 [&_hr]:border-neutral-200";

export function BeritaDetail({ item, related }: BeritaDetailProps) {
  const photos = (item.attachments ?? []).filter(
    (att) => att.type?.toUpperCase() === "PHOTO",
  );
  const lampiran = getBeritaLampiran(item.attachments);

  const coverRef = useScrollReveal();
  const bodyRef = useScrollReveal();
  const asideRef = useScrollReveal();
  const relatedRef = useScrollReveal();

  return (
    <article className="space-y-10">
      <Link
        href="/berita"
        className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 transition hover:text-brand-primary"
      >
        <ArrowLeft weight="bold" className="size-4" />
        Kembali ke Berita
      </Link>

      {/* Meta row (judul & excerpt sudah tampil di hero PageTemplate) */}
      <header className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Link
          href={`/berita?kategori=${item.category.slug}`}
          className="transition hover:opacity-80"
        >
          <Badge variant="primary" className="px-3 py-1">
            {item.category.name}
          </Badge>
        </Link>
        <span className="flex items-center gap-1.5 text-sm text-neutral-500">
          <CalendarBlank weight="duotone" className="size-4 text-brand-primary" />
          <time dateTime={item.publishedAt}>
            {formatTanggal(item.publishedAt)}
          </time>
        </span>
      </header>

      {/* Cover */}
      <div
        ref={coverRef}
        className="scroll-reveal relative aspect-[21/9] overflow-hidden rounded-lg border border-white/50 shadow-lg shadow-neutral-900/5"
      >
        <Image
          src={item.coverImageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 1280px) 100vw, 1200px"
          className="object-cover"
          priority
        />
      </div>

      {/* Body + sidebar */}
      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div ref={bodyRef} className="scroll-reveal min-w-0 space-y-10">
          {/* Isi artikel dari CMS (first-party, tepercaya) */}
          <div
            className={proseClass}
            dangerouslySetInnerHTML={{ __html: item.contentHtml }}
          />

          {/* Galeri foto */}
          {photos.length ? (
            <section className="space-y-4 border-t border-neutral-200/60 pt-8">
              <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight text-neutral-900">
                <Images weight="duotone" className="size-5 text-brand-primary" />
                Galeri Foto
              </h2>
              <BeritaGallery photos={photos} title={item.title} />
            </section>
          ) : null}
        </div>

        <aside ref={asideRef} className="scroll-reveal space-y-6 lg:sticky lg:top-28 lg:self-start">
          {/* Info ringkas */}
          <div className="rounded-lg border border-white/50 bg-white/50 p-6 backdrop-blur-xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
              Informasi
            </p>
            <dl className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <CalendarBlank
                  weight="duotone"
                  className="mt-0.5 size-5 shrink-0 text-brand-primary"
                />
                <div>
                  <dt className="text-neutral-500">Tanggal terbit</dt>
                  <dd className="font-semibold text-neutral-900">
                    {formatTanggal(item.publishedAt)}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Tag
                  weight="duotone"
                  className="mt-0.5 size-5 shrink-0 text-brand-primary"
                />
                <div>
                  <dt className="text-neutral-500">Kategori</dt>
                  <dd className="font-semibold text-neutral-900">
                    <Link
                      href={`/berita?kategori=${item.category.slug}`}
                      className="transition hover:text-brand-primary"
                    >
                      {item.category.name}
                    </Link>
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-6 border-t border-neutral-200/60 pt-6">
              <ShareButton title={item.title} path={`/berita/${item.slug}`} />
            </div>
          </div>

          {/* Lampiran (pdf/doc/docx) */}
          {lampiran.length ? (
            <div className="rounded-lg border border-white/50 bg-white/50 p-6 backdrop-blur-xl">
              <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                <DownloadSimple weight="duotone" className="size-4 text-brand-primary" />
                Lampiran
              </p>
              <ul className="space-y-2.5">
                {lampiran.map((att, i) => (
                  <li key={`${att.url}-${i}`}>
                    <a
                      href={att.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      download=""
                      className="group flex items-center gap-3 rounded-lg border border-neutral-200 bg-white px-3.5 py-3 transition hover:border-brand-primary/40 hover:bg-brand-primary/5"
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                        <FileArrowDown weight="duotone" size={20} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-neutral-900">
                          {att.label}
                        </span>
                        <span className="text-xs uppercase text-neutral-400">
                          {att.ext}
                        </span>
                      </span>
                      <DownloadSimple
                        weight="bold"
                        className="size-4 shrink-0 text-neutral-400 transition group-hover:text-brand-primary"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Tags */}
          {item.tags?.length ? (
            <div className="rounded-lg border border-white/50 bg-white/50 p-6 backdrop-blur-xl">
              <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                <Tag weight="duotone" className="size-4 text-brand-primary" />
                Tag
              </p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/berita?tag=${tag.slug}`}
                    className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-medium text-brand-primary transition hover:bg-brand-primary/20"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </aside>
      </div>

      {/* Related */}
      {related.length ? (
        <section ref={relatedRef} className="scroll-reveal space-y-6 border-t border-neutral-200/60 pt-10">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-xl font-bold tracking-tight text-neutral-900 md:text-2xl">
              Berita Lainnya
            </h2>
            <Link
              href="/berita"
              className="shrink-0 text-sm font-semibold text-brand-primary hover:underline"
            >
              Lihat semua
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((rel) => (
              <BeritaCard key={rel.slug} item={rel} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
