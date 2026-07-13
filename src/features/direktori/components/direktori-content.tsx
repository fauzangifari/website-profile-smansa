"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MagnifyingGlass,
  UsersThree,
} from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";
import { SearchInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { DirektoriPerson } from "@/features/direktori/types/direktori";

/** Jumlah kartu per "batch" — ditampilkan awal & tiap klik "Muat lebih banyak". */
const PAGE_SIZE = 24;

type DirektoriContentProps = {
  people: DirektoriPerson[];
  /** Basis URL detail, mis. "/direktori-guru". */
  basePath: string;
  /** Label kategori untuk teks UI, mis. "Guru" / "Tenaga Kependidikan". */
  kategoriLabel: string;
};

/** Ambil inisial dari nama (buang gelar setelah koma) untuk fallback foto. */
function getInitials(name: string): string {
  const clean = name.split(",")[0].trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return (clean[0] ?? "?").toUpperCase();
}

export function DirektoriContent({
  people,
  basePath,
  kategoriLabel,
}: DirektoriContentProps) {
  const [query, setQuery] = useState("");
  // Lazy load: hanya render `visibleCount` kartu; sisanya lewat "Muat lebih banyak".
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q === "") return people;
    return people.filter((person) => person.name.toLowerCase().includes(q));
  }, [query, people]);

  const visible = filtered.slice(0, visibleCount);
  const remaining = filtered.length - visible.length;

  return (
    <div className="flex flex-col gap-8 font-sans">
      {/* Kontrol: hitungan + pencarian */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex items-center gap-3 rounded-lg border border-neutral-100 bg-white px-5 py-3 shadow-sm">
          <div className="flex size-9 items-center justify-center rounded-xl bg-brand-primary-soft text-brand-primary">
            <UsersThree size={18} weight="duotone" />
          </div>
          <div className="text-left">
            <p className="text-xl font-extrabold leading-none text-neutral-900">
              {people.length}
            </p>
            <p className="mt-0.5 text-xs font-semibold text-neutral-500">
              {kategoriLabel}
            </p>
          </div>
        </div>

        <div className="relative w-full sm:max-w-md">
          <MagnifyingGlass
            size={18}
            weight="bold"
            className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-neutral-400"
          />
          <SearchInput
            aria-label={`Cari ${kategoriLabel}`}
            placeholder="Cari nama..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              // Kembali ke batch pertama tiap kali pencarian berubah.
              setVisibleCount(PAGE_SIZE);
            }}
            className="pl-11"
          />
        </div>
      </div>

      {/* Grid / empty state */}
      {filtered.length > 0 ? (
        <>
          <div className="scroll-reveal-stagger grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {visible.map((person, index) => (
              <PersonCard
                key={person.id}
                person={person}
                href={`${basePath}/${person.id}`}
                // Stagger di-reset per batch (index % PAGE_SIZE) & dibatasi ≤ 8 agar
                // kartu tak menunggu berdetik-detik (index * 100ms).
                staggerIndex={Math.min(index % PAGE_SIZE, 8)}
              />
            ))}
          </div>

          {remaining > 0 ? (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-6 py-3 text-sm font-bold text-brand-primary shadow-sm transition hover:border-brand-primary/30 hover:bg-brand-primary-soft"
              >
                Muat lebih banyak
                <span className="font-semibold text-neutral-500">
                  ({remaining} lagi)
                </span>
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-white/50 px-6 py-16 text-center">
          <div className="mb-3 flex size-14 items-center justify-center rounded-full bg-neutral-100">
            <MagnifyingGlass
              size={26}
              weight="duotone"
              className="text-neutral-400"
            />
          </div>
          <p className="text-base font-semibold text-neutral-700">
            Data tidak ditemukan
          </p>
          <p className="mt-1 max-w-sm text-sm text-neutral-500">
            Coba ubah kata kunci pencarian Anda.
          </p>
        </div>
      )}
    </div>
  );
}

function PersonCard({
  person,
  href,
  staggerIndex,
}: {
  person: DirektoriPerson;
  href: string;
  staggerIndex: number;
}) {
  const [imgError, setImgError] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const showPhoto = Boolean(person.photoUrl) && !imgError;

  // Reveal per-kartu saat mount → kartu awal maupun hasil "Muat lebih banyak"
  // sama-sama fade-in dan tak pernah tersangkut opacity:0 (tak bergantung pada
  // IntersectionObserver container yang hanya reveal sekali).
  useEffect(() => {
    const raf = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <Link
      href={href}
      className={cn("scroll-reveal block h-full", revealed && "revealed")}
      style={{ "--stagger-index": staggerIndex } as React.CSSProperties}
    >
      <Card
        variant="glass-soft"
        className="group flex h-full flex-col overflow-hidden border border-transparent p-0 transition-all duration-200 hover:-translate-y-1 hover:border-brand-primary/20 hover:shadow-lg hover:shadow-brand-primary/8"
      >
        {/* Foto */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
          {showPhoto ? (
            <Image
              src={person.photoUrl}
              alt={person.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-gradient-to-br from-brand-primary-soft via-blue-50 to-indigo-50 text-3xl font-extrabold text-brand-primary/40">
              {getInitials(person.name)}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="line-clamp-2 text-sm font-bold leading-snug text-neutral-900 transition-colors group-hover:text-brand-primary">
            {person.name}
          </h3>
          <div className="mt-auto flex items-center gap-1.5 pt-2 text-[11px] font-bold uppercase tracking-wider text-brand-primary opacity-0 transition-all duration-200 group-hover:opacity-100">
            <span>Lihat detail</span>
            <ArrowRight size={13} weight="bold" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
