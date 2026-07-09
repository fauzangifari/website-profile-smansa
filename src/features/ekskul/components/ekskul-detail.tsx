"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowSquareOut,
  CaretDown,
  CalendarBlank,
  Clock,
  MapPin,
  Phone,
  Envelope,
  InstagramLogo,
  TiktokLogo,
  YoutubeLogo,
  WhatsappLogo,
  Globe,
  Target,
  Compass,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Accordion } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";
import type { EkskulDetail as EkskulDetailType } from "@/features/ekskul/types/ekskul-detail";

type EkskulDetailProps = {
  item: EkskulDetailType;
};

const socialIconMap: Record<
  EkskulDetailType["socialMedia"][number]["platform"],
  React.ComponentType<{ size?: number; weight?: "regular" | "bold" | "fill" | "duotone" | "thin" | "light"; className?: string }>
> = {
  instagram: InstagramLogo,
  tiktok: TiktokLogo,
  youtube: YoutubeLogo,
  whatsapp: WhatsappLogo,
  website: Globe,
};

export function EkskulDetail({ item }: EkskulDetailProps) {
  const bodyRef = useScrollReveal({ stagger: true });
  const asideRef = useScrollReveal();
  const [showAllMembers, setShowAllMembers] = useState(false);

  const people = [
    {
      photo: item.structure.pembina.photo,
      name: item.structure.pembina.name,
      jabatan: "Pembina",
      tierClass: "bg-brand-primary text-white",
    },
    {
      photo: item.structure.ketua.photo,
      name: item.structure.ketua.name,
      jabatan: "Ketua",
      tierClass: "bg-brand-secondary text-white",
    },
    ...item.structure.anggota.map((member) => ({
      photo: member.photo,
      name: member.name,
      jabatan: member.role,
      tierClass: "bg-neutral-800 text-white",
    })),
  ];
  const MEMBER_LIMIT = 8;
  const visiblePeople = showAllMembers ? people : people.slice(0, MEMBER_LIMIT);

  return (
    <article className="space-y-10">
      <Link
        href="/ekstrakurikuler"
        className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 transition hover:text-brand-primary"
      >
        <ArrowLeft weight="bold" className="size-4" />
        Kembali ke Ekstrakurikuler
      </Link>

      {/* Cover */}
      <div className="relative aspect-[21/9] overflow-hidden rounded-lg border border-white/50 shadow-lg shadow-neutral-900/5">
        <Image
          src={item.coverImage}
          alt={item.title}
          fill
          sizes="(max-width: 1280px) 100vw, 1200px"
          className="object-cover"
          priority
        />
      </div>

      {/* Body + sidebar */}
      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div ref={bodyRef} className="scroll-reveal-stagger min-w-0 space-y-10">
          {/* Deskripsi */}
          <section className="scroll-reveal space-y-4" style={{ "--stagger-index": 0 } as React.CSSProperties}>
            {item.description.map((paragraph, i) => (
              <p key={i} className="text-base leading-8 text-neutral-700">
                {paragraph}
              </p>
            ))}
          </section>

          {/* Visi & Misi */}
          <section className="scroll-reveal grid gap-6 rounded-lg border border-white/50 bg-white/50 p-6 backdrop-blur-xl md:grid-cols-2" style={{ "--stagger-index": 1 } as React.CSSProperties}>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary-soft text-brand-primary">
                  <Target size={18} weight="duotone" />
                </div>
                <h2 className="text-lg font-bold text-neutral-900">Visi</h2>
              </div>
              <p className="text-sm leading-relaxed text-neutral-600">
                {item.vision}
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary-soft text-brand-primary">
                  <Compass size={18} weight="duotone" />
                </div>
                <h2 className="text-lg font-bold text-neutral-900">Misi</h2>
              </div>
              <ul className="space-y-2">
                {item.mission.map((point, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-neutral-600">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-primary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Program Kegiatan */}
          <section className="scroll-reveal space-y-6" style={{ "--stagger-index": 2 } as React.CSSProperties}>
            <h2 className="text-xl font-bold tracking-tight text-neutral-900 md:text-2xl">
              Program Kegiatan
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {item.programs.map((program, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-lg border border-neutral-200 bg-white"
                >
                  {program.image ? (
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 400px"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                  <div className="space-y-1.5 p-4">
                    <h3 className="font-bold text-neutral-900">
                      {program.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-neutral-500">
                      {program.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="scroll-reveal space-y-6" style={{ "--stagger-index": 3 } as React.CSSProperties}>
            <h2 className="text-xl font-bold tracking-tight text-neutral-900 md:text-2xl">
              Pertanyaan Umum
            </h2>
            <Accordion items={item.faq} />
          </section>

          {/* Struktur Organisasi */}
          <section className="scroll-reveal space-y-6" style={{ "--stagger-index": 4 } as React.CSSProperties}>
            <h2 className="text-xl font-bold tracking-tight text-neutral-900 md:text-2xl">
              Struktur Organisasi
            </h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {visiblePeople.map((person, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-lg border border-neutral-200 bg-white"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={person.photo}
                      alt={person.name}
                      fill
                      sizes="(max-width: 1024px) 50vw, 240px"
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-2 p-3.5">
                    <p className="truncate text-sm font-bold text-neutral-900">
                      {person.name}
                    </p>
                    <span
                      className={cn(
                        "inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
                        person.tierClass,
                      )}
                    >
                      {person.jabatan}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {people.length > MEMBER_LIMIT ? (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAllMembers((prev) => !prev)}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 transition hover:border-brand-primary hover:text-brand-primary"
                >
                  {showAllMembers
                    ? "Tampilkan lebih sedikit"
                    : `Lihat selengkapnya (${people.length - MEMBER_LIMIT} lainnya)`}
                  <CaretDown
                    weight="bold"
                    className={cn(
                      "size-4 transition-transform",
                      showAllMembers && "rotate-180",
                    )}
                  />
                </button>
              </div>
            ) : null}
          </section>
        </div>

        <aside ref={asideRef} className="scroll-reveal space-y-6 lg:sticky lg:top-28 lg:self-start">
          {/* Info Ekskul */}
          <div className="rounded-lg border border-white/50 bg-white/50 p-6 backdrop-blur-xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
              Info Ekskul
            </p>
            <div className="space-y-4">
              {item.schedule.map((sched, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <CalendarBlank
                    weight="duotone"
                    className="mt-0.5 size-5 shrink-0 text-brand-primary"
                  />
                  <div className="space-y-1">
                    <div className="flex flex-wrap gap-1.5">
                      {sched.days.map((day) => (
                        <Badge key={day} variant="primary" className="text-[10px]">
                          {day}
                        </Badge>
                      ))}
                    </div>
                    <p className="flex items-center gap-1.5 font-semibold text-neutral-900">
                      <Clock weight="duotone" className="size-4 text-neutral-400" />
                      {sched.time}
                    </p>
                    {sched.location ? (
                      <p className="flex items-center gap-1.5 text-neutral-500">
                        <MapPin weight="duotone" className="size-4 text-neutral-400" />
                        {sched.location}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Narahubung */}
          <div className="rounded-lg border border-white/50 bg-white/50 p-6 backdrop-blur-xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
              Narahubung
            </p>
            <dl className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Phone weight="duotone" className="mt-0.5 size-5 shrink-0 text-brand-primary" />
                <div>
                  <dt className="text-neutral-500">Telepon Pembina</dt>
                  <dd>
                    <a
                      href={`tel:${item.contact.phone}`}
                      className="font-semibold text-neutral-900 hover:text-brand-primary"
                    >
                      {item.contact.phone}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Envelope weight="duotone" className="mt-0.5 size-5 shrink-0 text-brand-primary" />
                <div className="min-w-0">
                  <dt className="text-neutral-500">Email Pembina</dt>
                  <dd>
                    <a
                      href={`mailto:${item.contact.email}`}
                      className="break-all font-semibold text-neutral-900 hover:text-brand-primary"
                    >
                      {item.contact.email}
                    </a>
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          {/* CTA Daftar */}
          {item.registrationLink ? (
            <a
              href={item.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand-primary px-6 font-extrabold text-white shadow-xl shadow-brand-primary/20 transition-all hover:scale-[1.02] active:scale-95"
            >
              Daftar Sekarang
              <ArrowSquareOut size={18} weight="bold" />
            </a>
          ) : null}

          {/* Media Sosial */}
          {item.socialMedia.length ? (
            <div className="flex items-center justify-center gap-3 rounded-lg border border-white/50 bg-white/50 p-4 backdrop-blur-xl">
              {item.socialMedia.map((social) => {
                const Icon = socialIconMap[social.platform];
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.handle}
                    className="flex size-10 items-center justify-center rounded-xl bg-brand-primary-soft text-brand-primary transition hover:bg-brand-primary hover:text-white"
                  >
                    <Icon size={20} weight="duotone" />
                  </a>
                );
              })}
            </div>
          ) : null}
        </aside>
      </div>
    </article>
  );
}
