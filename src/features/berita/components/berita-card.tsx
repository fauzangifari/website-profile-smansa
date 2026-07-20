"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarBlank } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BeritaTemplateOverlay } from "@/features/berita/components/berita-template-overlay";
import { formatTanggal } from "@/features/berita/utils/berita-helpers";
import type { BeritaListItem } from "@/features/berita/types/berita";

type BeritaCardProps = {
  item: BeritaListItem;
  className?: string;
};

export function BeritaCard({ item, className }: BeritaCardProps) {
  return (
    <Link
      href={`/posts/${item.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-lg border border-white/50 bg-white/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/70 hover:bg-white/60 hover:shadow-xl hover:shadow-neutral-900/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/30",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.coverImageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <BeritaTemplateOverlay
          categorySlug={item.category.slug}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute left-3 top-3 z-20">
          <Badge variant="glass" className="px-3 py-1">
            {item.category.name}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
          <CalendarBlank weight="duotone" className="size-4 text-brand-primary" />
          <time dateTime={item.publishedAt}>
            {formatTanggal(item.publishedAt)}
          </time>
        </div>

        <h3 className="line-clamp-2 min-h-[2lh] text-lg font-bold leading-snug text-neutral-900 transition-colors group-hover:text-brand-primary">
          {item.title}
        </h3>

        <p className="line-clamp-2 min-h-[2lh] text-sm leading-relaxed text-neutral-600">
          {item.excerpt}
        </p>

        <div className="mt-auto flex items-center gap-1.5 pt-2 text-sm font-semibold text-brand-primary">
          Baca selengkapnya
          <ArrowRight
            weight="bold"
            className="size-4 transition-transform group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
}
