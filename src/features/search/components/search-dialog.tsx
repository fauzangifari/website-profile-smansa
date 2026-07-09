"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, MagnifyingGlass, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { searchIndex } from "@/features/search/data/search-index";
import { filterSearch } from "@/features/search/utils/search-filter";
import { cn } from "@/lib/utils";

type SearchDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevOpen, setPrevOpen] = useState(open);

  const results = useMemo(() => filterSearch(query, searchIndex), [query]);

  // Reset query/highlight saat status buka berubah (pola render-phase, bukan effect).
  if (open !== prevOpen) {
    setPrevOpen(open);
    setQuery("");
    setActiveIndex(0);
  }

  // Fokus input saat dialog dibuka (efek DOM murni, tanpa setState).
  useEffect(() => {
    if (!open) return;
    const id = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  // Lock scroll body saat dialog terbuka.
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

  const goTo = (href: string) => {
    onClose();
    router.push(href);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      return;
    }
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = results[activeIndex];
      if (target) goTo(target.href);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="search-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-neutral-950/60 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog */}
          <div
            className="fixed inset-0 z-[201] flex items-start justify-center p-4 pt-[12vh] md:pt-[15vh]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-dialog-title"
            onKeyDown={handleKeyDown}
          >
            <motion.div
              key="search-panel"
              initial={{ opacity: 0, scale: 0.97, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -12 }}
              transition={{ type: "spring", stiffness: 360, damping: 30 }}
              className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/40 bg-white/95 shadow-2xl shadow-neutral-900/20 backdrop-blur-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 id="search-dialog-title" className="sr-only">
                Cari halaman dan konten
              </h2>

              {/* Search input */}
              <div className="flex items-center gap-3 border-b border-neutral-200 px-4">
                <MagnifyingGlass
                  size={20}
                  weight="bold"
                  className="shrink-0 text-neutral-400"
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActiveIndex(0);
                  }}
                  placeholder="Cari halaman, ekstrakurikuler, kegiatan…"
                  className="h-14 w-full bg-transparent text-base text-neutral-900 outline-none placeholder:text-neutral-400"
                  aria-label="Kata kunci pencarian"
                  autoComplete="off"
                  spellCheck={false}
                />
                <button
                  type="button"
                  onClick={onClose}
                  className="grid size-8 shrink-0 place-items-center rounded-md text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
                  aria-label="Tutup pencarian"
                >
                  <X size={18} weight="bold" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[52vh] overflow-y-auto p-2">
                {results.length === 0 ? (
                  <div className="px-4 py-10 text-center">
                    <p className="text-sm font-semibold text-neutral-700">
                      Tidak ada hasil untuk &ldquo;{query.trim()}&rdquo;
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">
                      Coba kata kunci lain seperti &ldquo;profil&rdquo;,
                      &ldquo;prestasi&rdquo;, atau &ldquo;alumni&rdquo;.
                    </p>
                  </div>
                ) : (
                  <SearchResults
                    results={results}
                    activeIndex={activeIndex}
                    onHover={setActiveIndex}
                    onSelect={goTo}
                  />
                )}
              </div>

              {/* Footer hint */}
              <div className="hidden items-center gap-4 border-t border-neutral-200 px-4 py-2.5 text-[11px] font-medium text-neutral-500 sm:flex">
                <KeyHint keys="↑↓" label="navigasi" />
                <KeyHint keys="↵" label="buka" />
                <KeyHint keys="esc" label="tutup" />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

type SearchResultsProps = {
  results: ReturnType<typeof filterSearch>;
  activeIndex: number;
  onHover: (index: number) => void;
  onSelect: (href: string) => void;
};

function SearchResults({
  results,
  activeIndex,
  onHover,
  onSelect,
}: SearchResultsProps) {
  const activeRef = useRef<HTMLButtonElement>(null);

  // Scroll item aktif ke dalam viewport saat berpindah lewat keyboard.
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  // Kelompokkan tampilan per group, tapi indeks tetap mengikuti urutan flat.
  let flatIndex = -1;
  const groups = results.reduce<Record<string, typeof results>>(
    (acc, entry) => {
      (acc[entry.group] ??= []).push(entry);
      return acc;
    },
    {},
  );

  return (
    <div className="grid gap-1">
      {Object.entries(groups).map(([group, entries]) => (
        <div key={group} className="mb-1">
          <p className="px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
            {group}
          </p>
          {entries.map((entry) => {
            flatIndex += 1;
            const index = flatIndex;
            const active = index === activeIndex;
            return (
              <button
                key={`${entry.href}-${entry.title}`}
                ref={active ? activeRef : undefined}
                type="button"
                onClick={() => onSelect(entry.href)}
                onMouseMove={() => onHover(index)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition",
                  active
                    ? "bg-brand-primary-soft text-brand-primary"
                    : "text-neutral-700 hover:bg-neutral-100",
                )}
              >
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-semibold">
                    {entry.title}
                  </span>
                  {entry.description ? (
                    <span className="truncate text-xs text-neutral-500">
                      {entry.description}
                    </span>
                  ) : null}
                </div>
                <ArrowRight
                  size={16}
                  weight="bold"
                  className={cn(
                    "ml-auto shrink-0 transition-opacity",
                    active ? "opacity-100" : "opacity-0",
                  )}
                />
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function KeyHint({ keys, label }: { keys: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <kbd className="rounded border border-neutral-300 bg-neutral-100 px-1.5 py-0.5 font-sans text-[10px] font-semibold text-neutral-600">
        {keys}
      </kbd>
      {label}
    </span>
  );
}
