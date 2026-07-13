"use client";

import { type ComponentType, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Envelope,
  IdentificationCard,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { DirektoriPersonDetail } from "@/features/direktori/types/direktori";

type DirektoriDetailProps = {
  person: DirektoriPersonDetail;
  /** Basis URL daftar, mis. "/direktori-guru". */
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

type IconType = ComponentType<{
  size?: number;
  weight?: "regular" | "bold" | "fill" | "duotone" | "thin" | "light";
  className?: string;
}>;

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: IconType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon
        weight="duotone"
        className="mt-0.5 size-5 shrink-0 text-brand-primary"
      />
      <div className="min-w-0">
        <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
          {label}
        </dt>
        <dd className="mt-0.5 text-sm font-semibold text-neutral-900">
          {children}
        </dd>
      </div>
    </div>
  );
}

export function DirektoriDetail({
  person,
  basePath,
  kategoriLabel,
}: DirektoriDetailProps) {
  const [imgError, setImgError] = useState(false);
  const showPhoto = Boolean(person.photoUrl) && !imgError;

  return (
    <article className="space-y-8">
      <Link
        href={basePath}
        className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 transition hover:text-brand-primary"
      >
        <ArrowLeft weight="bold" className="size-4" />
        Kembali ke Direktori {kategoriLabel}
      </Link>

      <Card
        variant="glass-strong"
        className="grid gap-8 border-white/50 p-6 md:grid-cols-[280px_1fr] md:p-8"
      >
        {/* Foto */}
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-lg border border-white/60 shadow-lg shadow-neutral-900/5">
          {showPhoto ? (
            <Image
              src={person.photoUrl}
              alt={person.name}
              fill
              sizes="(max-width: 768px) 100vw, 280px"
              className="object-cover"
              priority
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-gradient-to-br from-brand-primary-soft via-blue-50 to-indigo-50 text-5xl font-extrabold text-brand-primary/40">
              {getInitials(person.name)}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <Badge variant="primary" className="w-fit">
            {kategoriLabel}
          </Badge>
          <h2 className="mt-4 text-2xl font-extrabold leading-tight text-neutral-900 md:text-3xl">
            {person.name}
          </h2>

          <dl className="mt-8 space-y-5 border-t border-neutral-200/70 pt-6">
            <InfoRow icon={IdentificationCard} label="NIP">
              {person.nip && person.nip !== "-" ? person.nip : "—"}
            </InfoRow>
            <InfoRow icon={Envelope} label="Email Sekolah">
              <a
                href={`mailto:${person.email}`}
                className="break-all text-brand-primary hover:text-brand-primary-hover hover:underline"
              >
                {person.email}
              </a>
            </InfoRow>
          </dl>
        </div>
      </Card>
    </article>
  );
}
