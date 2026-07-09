"use client";

import { useState } from "react";
import Image from "next/image";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BeritaAttachment } from "@/features/berita/types/berita";

type BeritaGalleryProps = {
  photos: BeritaAttachment[];
  title: string;
};

const SLIDE_SIZES = "(max-width: 1024px) 100vw, 640px";

export function BeritaGallery({ photos, title }: BeritaGalleryProps) {
  const [index, setIndex] = useState(0);

  if (photos.length === 0) return null;

  // Satu foto → tampilan tunggal tanpa kontrol carousel.
  if (photos.length === 1) {
    const photo = photos[0];
    return (
      <a
        href={photo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block aspect-[16/9] overflow-hidden rounded-lg border border-white/50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/30"
      >
        <Image
          src={photo.url}
          alt={`${title} — foto 1`}
          fill
          sizes={SLIDE_SIZES}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </a>
    );
  }

  const total = photos.length;
  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  return (
    <div
      className="space-y-4"
      role="group"
      aria-roledescription="carousel"
      aria-label={`Galeri foto ${title}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          goPrev();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          goNext();
        }
      }}
    >
      {/* Viewport */}
      <div className="relative overflow-hidden rounded-lg border border-white/50">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {photos.map((photo, i) => (
            <a
              key={`${photo.url}-${i}`}
              href={photo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[16/9] w-full min-w-full overflow-hidden focus-visible:outline-none"
              aria-hidden={i !== index}
              tabIndex={i === index ? 0 : -1}
            >
              <Image
                src={photo.url}
                alt={`${title} — foto ${i + 1}`}
                fill
                sizes={SLIDE_SIZES}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </a>
          ))}
        </div>

        {/* Nav arrows */}
        <Button
          type="button"
          variant="glass"
          size="icon"
          onClick={goPrev}
          aria-label="Foto sebelumnya"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full"
        >
          <CaretLeft weight="bold" className="size-5" />
        </Button>
        <Button
          type="button"
          variant="glass"
          size="icon"
          onClick={goNext}
          aria-label="Foto berikutnya"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full"
        >
          <CaretRight weight="bold" className="size-5" />
        </Button>

        {/* Counter */}
        <div className="absolute bottom-3 right-3 rounded-full bg-neutral-900/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {index + 1} / {total}
        </div>
      </div>

      {/* Dots */}
      <div className="flex flex-wrap justify-center gap-2">
        {photos.map((photo, i) => (
          <button
            key={`dot-${photo.url}-${i}`}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Ke foto ${i + 1}`}
            aria-current={i === index}
            className={cn(
              "h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40",
              i === index
                ? "w-5 bg-brand-primary"
                : "w-2 bg-neutral-300 hover:bg-neutral-400",
            )}
          />
        ))}
      </div>
    </div>
  );
}
