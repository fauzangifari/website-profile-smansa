"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, MagnifyingGlassPlus } from "@phosphor-icons/react";

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
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Panel */}
      <div className="relative z-10 flex max-h-[90vh] max-w-4xl w-full flex-col rounded-2xl overflow-hidden shadow-2xl">
        {/* Top bar */}
        <div className="flex items-center justify-between bg-neutral-900/90 px-4 py-3 backdrop-blur-sm">
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

        {/* Image */}
        <div className="relative flex-1 bg-neutral-950 flex items-center justify-center min-h-[300px]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            sizes="(max-width: 896px) 100vw, 896px"
            priority
          />
        </div>
      </div>
    </div>
  );
}
