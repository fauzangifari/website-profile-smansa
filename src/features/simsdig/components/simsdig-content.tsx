"use client";

import Link from "next/link";
import { Wrench, ArrowRight } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

export function SimsdigContent() {
  const ref = useScrollReveal();

  return (
    <div ref={ref} className="scroll-reveal flex justify-center font-sans">
      <Card
        variant="glass"
        className="flex w-full max-w-2xl flex-col items-center gap-6 px-6 py-12 text-center md:px-10 md:py-16"
      >
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-primary-soft text-brand-primary">
          <Wrench size={32} weight="duotone" />
        </span>

        <Badge variant="primary">Dalam Pengembangan</Badge>

        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-extrabold leading-tight text-neutral-900 md:text-2xl">
            Segera Hadir
          </h2>
          <p className="mx-auto max-w-lg text-sm leading-7 text-neutral-600 md:text-base md:leading-8">
            SIMSDIG (Sistem Informasi Manajemen Sekolah Digital) sedang kami
            siapkan untuk mendukung pengelolaan sekolah yang lebih terintegrasi
            dan digital. Nantikan kehadirannya dalam waktu dekat.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-primary/25 transition-colors hover:bg-brand-primary-hover"
        >
          Kembali ke Beranda
          <ArrowRight size={16} weight="bold" />
        </Link>
      </Card>
    </div>
  );
}
