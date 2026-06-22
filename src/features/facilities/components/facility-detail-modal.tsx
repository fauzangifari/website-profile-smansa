"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  CheckCircle,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Facility } from "@/features/facilities/data/facilities-data";
import { FACILITY_ICON_MAP } from "@/features/facilities/components/facility-icon-map";

type FacilityDetailModalProps = {
  facility: Facility | null;
  onClose: () => void;
};

export function FacilityDetailModal({
  facility,
  onClose,
}: FacilityDetailModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset image index when facility changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [facility?.id]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setActiveImageIndex((i) => Math.max(0, i - 1));
      if (e.key === "ArrowRight" && facility)
        setActiveImageIndex((i) =>
          Math.min(facility.images.length - 1, i + 1),
        );
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [facility, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (facility) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [facility]);

  const showPrevImage = () =>
    setActiveImageIndex((i) => Math.max(0, i - 1));
  const showNextImage = () => {
    if (!facility) return;
    setActiveImageIndex((i) => Math.min(facility.images.length - 1, i + 1));
  };

  return (
    <AnimatePresence>
      {facility && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-neutral-950/65 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <div
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 md:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="facility-modal-title"
          >
            <motion.div
              key="modal"
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", stiffness: 340, damping: 30 }}
              className="relative w-full max-w-4xl max-h-[90svh] overflow-y-auto rounded-2xl border border-white/40 bg-white/90 shadow-2xl shadow-neutral-900/20 backdrop-blur-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full border border-neutral-200/70 bg-white/80 text-neutral-600 shadow-sm backdrop-blur-sm transition hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                aria-label="Tutup detail fasilitas"
              >
                <X size={18} weight="bold" />
              </button>

              <div className="grid md:grid-cols-[1fr_1.15fr]">
                {/* Left — Image Gallery */}
                <div className="flex flex-col gap-3 p-4 md:p-6 md:border-r md:border-neutral-200/70">
                  {/* Main Image */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={facility.images[activeImageIndex].src}
                          alt={facility.images[activeImageIndex].alt}
                          fill
                          sizes="(min-width: 768px) 42vw, 90vw"
                          className="object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Nav Arrows */}
                    <div className="absolute inset-x-3 top-1/2 flex -translate-y-1/2 items-center justify-between">
                      <button
                        type="button"
                        onClick={showPrevImage}
                        disabled={activeImageIndex === 0}
                        className="grid size-8 place-items-center rounded-full border border-white/45 bg-white/20 text-white shadow-sm backdrop-blur-md transition hover:bg-white hover:text-neutral-950 disabled:opacity-0"
                        aria-label="Foto sebelumnya"
                      >
                        <CaretLeft size={14} weight="bold" />
                      </button>
                      <button
                        type="button"
                        onClick={showNextImage}
                        disabled={activeImageIndex === facility.images.length - 1}
                        className="grid size-8 place-items-center rounded-full border border-white/45 bg-white/20 text-white shadow-sm backdrop-blur-md transition hover:bg-white hover:text-neutral-950 disabled:opacity-0"
                        aria-label="Foto berikutnya"
                      >
                        <CaretRight size={14} weight="bold" />
                      </button>
                    </div>
                  </div>

                  {/* Thumbnails */}
                  <div className="grid grid-cols-3 gap-2">
                    {facility.images.map((image, idx) => (
                      <button
                        key={image.src}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={cn(
                          "relative aspect-[4/3] overflow-hidden rounded-lg border-2 bg-neutral-100 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
                          idx === activeImageIndex
                            ? "border-brand-primary shadow-md shadow-brand-primary/20"
                            : "border-transparent hover:border-brand-primary/40",
                        )}
                        aria-label={`Lihat foto ${idx + 1}`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="120px"
                          className={cn(
                            "object-cover transition duration-300",
                            idx !== activeImageIndex && "opacity-70",
                          )}
                        />
                      </button>
                    ))}
                  </div>

                  {/* Image indicator dots */}
                  <div className="flex gap-1.5" aria-hidden="true">
                    {facility.images.map((_, idx) => (
                      <span
                        key={idx}
                        className={cn(
                          "h-1.5 flex-1 rounded-full transition-all duration-300",
                          idx === activeImageIndex
                            ? "bg-brand-primary"
                            : "bg-neutral-200",
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* Right — Content */}
                <div className="flex flex-col gap-5 p-4 md:p-6">
                  {/* Header */}
                  <div className="flex flex-col gap-3 pr-8">
                    {/* Icon + Category */}
                    <div className="flex items-center gap-3">
                      <FacilityIcon iconName={facility.icon} />
                      <Badge variant="primary" className="text-[11px]">
                        {facility.category}
                      </Badge>
                    </div>
                    <h2
                      id="facility-modal-title"
                      className="text-xl font-extrabold leading-tight text-neutral-900 md:text-2xl"
                    >
                      {facility.name}
                    </h2>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-neutral-200/80" />

                  {/* Description */}
                  <div className="space-y-3">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                      Tentang Fasilitas
                    </h3>
                    <p className="text-sm leading-7 text-neutral-700">
                      {facility.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-3">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                      Keunggulan
                    </h3>
                    <ul className="space-y-2.5">
                      {facility.highlights.map((point, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle
                            size={17}
                            weight="fill"
                            className="mt-0.5 shrink-0 text-brand-primary"
                          />
                          <span className="text-sm leading-6 text-neutral-700">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function FacilityIcon({ iconName }: { iconName: string }) {
  const IconComponent = FACILITY_ICON_MAP[iconName];
  if (!IconComponent) return null;
  return (
    <div className="flex size-10 items-center justify-center rounded-lg bg-brand-primary-soft text-brand-primary">
      <IconComponent size={22} weight="duotone" />
    </div>
  );
}
