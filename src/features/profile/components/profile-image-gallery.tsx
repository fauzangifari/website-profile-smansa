"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

type ProfileImage = {
  src: string;
  alt: string;
  label: string;
  description: string;
};

type ProfileImageGalleryProps = {
  images: ProfileImage[];
};

export function ProfileImageGallery({ images }: ProfileImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];
  const galleryRef = useScrollReveal();

  const showPreviousImage = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? images.length - 1 : currentIndex - 1,
    );
  };

  const showNextImage = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === images.length - 1 ? 0 : currentIndex + 1,
    );
  };

  return (
    <section ref={galleryRef} className="scroll-reveal mt-2 lg:mt-0" aria-label="Galeri profil sekolah">
      <div className="rounded-lg border border-neutral-200 bg-white p-3 shadow-sm shadow-neutral-900/5 md:p-4">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_9.5rem]">
          <div
            role="button"
            tabIndex={0}
            onClick={showNextImage}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                showNextImage();
              }
            }}
            className="group relative aspect-[4/5.5] min-h-[26rem] overflow-hidden rounded-lg bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            aria-label="Ganti foto utama"
          >
            <Image
              key={activeImage.src}
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              sizes="(min-width: 1024px) 34rem, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.035]"
              priority={activeIndex === 0}
            />
            <div className="absolute right-4 top-4 flex gap-2">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showPreviousImage();
                }}
                className="grid size-9 place-items-center rounded-full border border-white/45 bg-white/18 text-lg font-bold text-white shadow-sm backdrop-blur-md transition hover:bg-white hover:text-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label="Tampilkan foto sebelumnya"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showNextImage();
                }}
                className="grid size-9 place-items-center rounded-full border border-white/45 bg-white/18 text-lg font-bold text-white shadow-sm backdrop-blur-md transition hover:bg-white hover:text-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label="Tampilkan foto berikutnya"
              >
                ›
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 md:grid-cols-1">
            {images.map((image, imageIndex) => {
              const isActive = imageIndex === activeIndex;

              return (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setActiveIndex(imageIndex)}
                  className={cn(
                    "group relative aspect-[4/5] overflow-hidden rounded-lg border bg-neutral-100 shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
                    isActive
                      ? "border-brand-primary shadow-md shadow-brand-primary/20"
                      : "border-neutral-200 hover:-translate-y-0.5 hover:border-brand-primary/45 hover:shadow-md",
                  )}
                  aria-label={`Tampilkan ${image.label}`}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 10rem, 45vw"
                    className={cn(
                      "object-cover transition duration-500 group-hover:scale-105",
                      !isActive && "opacity-75",
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-3 flex gap-1.5" aria-hidden="true">
          {images.map((image, index) => (
            <span
              key={`${image.src}-bar`}
              className={cn(
                "h-1.5 flex-1 rounded-full transition",
                index === activeIndex ? "bg-brand-primary" : "bg-neutral-200",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
