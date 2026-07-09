"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, MagnifyingGlassPlus } from "@phosphor-icons/react";

const FRAME_SRC = "/images/template/prestasi.png";

interface AchievementLightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export function AchievementLightbox({
  src,
  alt,
  onClose,
}: AchievementLightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    // Prevent body scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Foto dokumentasi: ${alt}`}
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      {/* Panel */}
      <div className="relative z-10 flex w-full max-w-3xl flex-col rounded-lg overflow-hidden shadow-2xl">
        {/* Top bar */}
        <div className="flex items-center justify-between bg-neutral-900/95 px-4 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-white/80">
            <MagnifyingGlassPlus size={16} />
            <span className="text-sm font-medium truncate max-w-xs">{alt}</span>
          </div>
          <button
            id="lightbox-close-btn"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Tutup foto"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Image area — rasio 4:3 tetap agar frame presisi */}
        <div className="relative w-full bg-neutral-950" style={{ aspectRatio: "4/3" }}>
          {/* Foto asli — base layer */}
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />

          {/* Frame overlay — di atas foto */}
          <Image
            src={FRAME_SRC}
            alt=""
            fill
            aria-hidden="true"
            className="object-cover pointer-events-none"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
      </div>
    </div>
  );
}
