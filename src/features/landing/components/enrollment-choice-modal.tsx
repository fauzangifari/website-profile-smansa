"use client";

import { useEffect } from "react";
import type { Icon } from "@phosphor-icons/react";
import {
  X,
  ArrowRight,
  ChalkboardTeacher,
  GraduationCap,
  UserPlus,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type EnrollmentOption = {
  label: string;
  description: string;
  href: string;
  icon: Icon;
};

const ENROLLMENT_OPTIONS: EnrollmentOption[] = [
  {
    label: "Peserta Didik",
    description: "Pendaftaran calon peserta didik baru (SPMB).",
    href: "https://sims.sman1samarinda.sch.id/enrollment",
    icon: UserPlus,
  },
  {
    label: "GTK",
    description: "Pendaftaran Guru dan Tenaga Kependidikan.",
    href: "https://sims.sman1samarinda.sch.id/enrollment/gtk",
    icon: ChalkboardTeacher,
  },
  {
    label: "Alumni",
    description: "Pendaftaran alumni SMA Negeri 1 Samarinda.",
    href: "https://sims.sman1samarinda.sch.id/enrollment/alumni",
    icon: GraduationCap,
  },
];

type EnrollmentChoiceModalProps = {
  open: boolean;
  onClose: () => void;
};

export function EnrollmentChoiceModal({
  open,
  onClose,
}: EnrollmentChoiceModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
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
            aria-labelledby="enrollment-modal-title"
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", stiffness: 340, damping: 30 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/40 bg-white/90 shadow-2xl shadow-neutral-900/20 backdrop-blur-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full border border-neutral-200/70 bg-white/80 text-neutral-600 shadow-sm backdrop-blur-sm transition hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                aria-label="Tutup pilihan pendaftaran"
              >
                <X size={18} weight="bold" />
              </button>

              <div className="flex flex-col gap-6 p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col gap-2 pr-8">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-primary">
                    Pendaftaran SPMB
                  </span>
                  <h2
                    id="enrollment-modal-title"
                    className="text-xl font-extrabold leading-tight text-neutral-900 md:text-2xl"
                  >
                    Daftar Sebagai
                  </h2>
                  <p className="text-sm leading-relaxed text-neutral-600">
                    Pilih jenis pendaftaran yang sesuai untuk melanjutkan.
                  </p>
                </div>

                {/* Options */}
                <div className="flex flex-col gap-3">
                  {ENROLLMENT_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <a
                        key={opt.label}
                        href={opt.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "group flex items-center gap-4 rounded-xl border border-neutral-200/80 bg-white/70 p-4 transition",
                          "hover:border-brand-primary/50 hover:bg-brand-primary-soft hover:shadow-md hover:shadow-brand-primary/10",
                          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
                        )}
                      >
                        <div className="grid size-12 shrink-0 place-items-center rounded-lg bg-brand-primary-soft text-brand-primary transition group-hover:bg-brand-primary group-hover:text-white">
                          <Icon size={26} weight="duotone" />
                        </div>
                        <div className="flex min-w-0 flex-col">
                          <span className="font-bold text-neutral-900">
                            {opt.label}
                          </span>
                          <span className="text-xs leading-snug text-neutral-500">
                            {opt.description}
                          </span>
                        </div>
                        <ArrowRight
                          size={18}
                          weight="bold"
                          className="ml-auto shrink-0 text-neutral-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand-primary"
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
