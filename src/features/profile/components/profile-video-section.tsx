"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "@phosphor-icons/react";

type ProfileVideoSectionProps = {
  youtubeVideoId?: string;
  thumbnailUrl?: string;
  title?: string;
  subtitle?: string;
};

export function ProfileVideoSection({
  youtubeVideoId = "5rG4nK2tU9A",
  thumbnailUrl = "/images/hero/background-hero.jpg",
  title = "Video Profil SMA Negeri 1 Samarinda",
  subtitle = "Saksikan perjalanan, fasilitas, dan kehidupan akademik di SMANSA",
}: ProfileVideoSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when modal/video is playing
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* ── Main Section ── */}
      <section
        className="group relative w-full h-[320px] sm:h-[420px] md:h-[480px] lg:h-[560px] overflow-hidden bg-neutral-950 cursor-pointer"
        onClick={() => setIsOpen(true)}
        aria-label="Tonton Video Profil Sekolah"
      >
        {/* Background Image/Thumbnail */}
        <div className="absolute inset-0">
          <Image
            src={thumbnailUrl}
            alt="Thumbnail Video Profil SMA Negeri 1 Samarinda"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.04]"
          />
          {/* Layered overlays: dark vignette + pattern */}
          <div className="absolute inset-0 bg-neutral-950/45 transition-colors duration-500 group-hover:bg-neutral-950/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/20" />

          {/* Grid visual accents */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        {/* Content Container (Center aligned) */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center select-none">
          {/* Subtitle & Title above Play Button */}
          <div className="mb-6 max-w-2xl transform transition-transform duration-700 ease-out group-hover:translate-y-[-4px]">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] md:text-sm">
              Video Profile
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:text-3xl md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mt-3 text-sm text-neutral-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] max-w-lg mx-auto sm:text-base opacity-90">
              {subtitle}
            </p>
          </div>

          {/* Interactive Play Button */}
          <div className="relative flex items-center justify-center">
            {/* Pulsating outer glowing rings */}
            <div className="absolute size-20 rounded-full border border-white/20 bg-white/5 blur-sm scale-125 opacity-40 transition-transform duration-700 ease-out group-hover:scale-150 group-hover:opacity-20" />
            <div className="absolute size-20 rounded-full border border-brand-primary/30 bg-brand-primary/5 blur-[8px] scale-150 opacity-30 transition-transform duration-700 ease-out group-hover:scale-175 group-hover:opacity-15" />
            <div className="absolute size-20 rounded-full border border-white/10 interactive-ring pointer-events-none" />

            {/* Main Button */}
            <button
              id="btn-play-video-profile"
              type="button"
              className="relative z-10 flex size-20 items-center justify-center rounded-full border border-white/20 bg-white/12 text-white shadow-2xl backdrop-blur-md transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-brand-primary group-hover:border-brand-primary group-hover:text-white"
              aria-label="Putar video profil"
            >
              <Play size={32} weight="fill" className="ml-1.5 transition-transform duration-300 group-hover:scale-105" />
            </button>
          </div>
        </div>

        {/* Visual Line separator */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </section>

      {/* ── Lightbox YouTube Video Modal ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="video-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[250] bg-neutral-950/90 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Modal Wrapper */}
            <div className="fixed inset-0 z-[251] flex items-center justify-center p-4 sm:p-6 md:p-10">
              <motion.div
                key="video-modal"
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 15 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                className="relative w-full max-w-5xl aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.8)]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="absolute right-4 top-4 z-50 grid size-10 place-items-center rounded-full border border-white/10 bg-black/40 text-white/80 shadow-md backdrop-blur-md transition-all duration-200 hover:bg-black/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                  aria-label="Tutup video"
                >
                  <X size={20} weight="bold" />
                </button>

                {/* YouTube Video IFrame */}
                <div className="w-full h-full">
                  <iframe
                    src={`https://www.youtube.com/embed/MSMoXCRDlUI?si=5IQGYLb4l3S5sW8T?autoplay=1&rel=0&modestbranding=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
