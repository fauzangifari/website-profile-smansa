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
  YoutubeLogo,
  WhatsappLogo,
  FacebookLogo,
  Target,
  Compass,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Accordion } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";
import type { ExtracurricularDetail } from "@/features/ekskul/types/ekskul-detail";
import {
  buildPeople,
  buildSocialMedia,
  dayOfWeekLabel,
  type EkskulSocialPlatform,
} from "@/features/ekskul/utils/ekskul-mappers";

type EkskulDetailProps = {
  item: ExtracurricularDetail;
};

// Styling konten HTML (contentHtml/visionHtml/missionHtml) tanpa plugin
// typography — pakai descendant variant Tailwind v4 (sama pola dengan berita).
const proseClass =
  "max-w-none text-base leading-8 text-neutral-700 " +
  "[&_p]:mb-5 [&_p:last-child]:mb-0 " +
  "[&_strong]:font-semibold [&_strong]:text-neutral-900 " +
  "[&_em]:italic " +
  "[&_a]:font-medium [&_a]:text-brand-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-brand-primary-hover " +
  "[&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-neutral-900 md:[&_h2]:text-2xl " +
  "[&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-neutral-900 " +
  "[&_ul]:mb-5 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6 " +
  "[&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-6 " +
  "[&_li]:leading-7 [&_li]:marker:text-brand-primary " +
  "[&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-brand-primary/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-neutral-600 " +
  "[&_img]:my-6 [&_img]:w-full [&_img]:rounded-lg [&_img]:border [&_img]:border-white/50 " +
  "[&_hr]:my-8 [&_hr]:border-neutral-200";

// Prose ringkas untuk kartu Visi & Misi (font lebih kecil).
const proseClassCompact =
  "text-sm leading-relaxed text-neutral-600 break-words [overflow-wrap:anywhere] " +
  "[&_p]:mb-3 [&_p:last-child]:mb-0 " +
  "[&_strong]:font-semibold [&_strong]:text-neutral-900 " +
  "[&_ul]:space-y-2 [&_ul]:pl-0 [&_ul]:list-none " +
  "[&_li]:relative [&_li]:pl-5 [&_li]:leading-relaxed " +
  "[&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-2.5 [&_li]:before:size-1.5 [&_li]:before:rounded-full [&_li]:before:bg-brand-primary";

const socialIconMap: Record<
  EkskulSocialPlatform,
  React.ComponentType<{
    size?: number;
    weight?: "regular" | "bold" | "fill" | "duotone" | "thin" | "light";
    className?: string;
  }>
> = {
  instagram: InstagramLogo,
  youtube: YoutubeLogo,
  whatsapp: WhatsappLogo,
  facebook: FacebookLogo,
};

export function EkskulDetail({ item }: EkskulDetailProps) {
  const bodyRef = useScrollReveal({ stagger: true });
  const asideRef = useScrollReveal();
  const [showAllMembers, setShowAllMembers] = useState(false);

  const people = buildPeople(item);
  const socialMedia = buildSocialMedia(item);
  const MEMBER_LIMIT = 8;
  const visiblePeople = showAllMembers ? people : people.slice(0, MEMBER_LIMIT);

  const hasVisiMisi = Boolean(item.visionHtml || item.missionHtml);

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
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-brand-primary-soft via-blue-50 to-indigo-50 text-brand-primary/40">
            <Compass size={56} weight="duotone" />
          </div>
        )}
      </div>

      {/* Body + sidebar */}
      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div ref={bodyRef} className="scroll-reveal-stagger min-w-0 space-y-10">
          {/* Deskripsi */}
          {item.contentHtml ? (
            <section
              className="scroll-reveal"
              style={{ "--stagger-index": 0 } as React.CSSProperties}
            >
              <div
                className={proseClass}
                dangerouslySetInnerHTML={{ __html: item.contentHtml }}
              />
            </section>
          ) : null}

          {/* Visi & Misi */}
          {hasVisiMisi ? (
            <section
              className="scroll-reveal space-y-6"
              style={{ "--stagger-index": 1 } as React.CSSProperties}
            >
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 md:text-2xl">
                Visi &amp; Misi
              </h2>
              <div className="grid gap-6 rounded-lg border border-white/50 bg-white/50 p-6 backdrop-blur-xl md:grid-cols-2">
                {item.visionHtml ? (
                  <div className="min-w-0 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary-soft text-brand-primary">
                        <Target size={18} weight="duotone" />
                      </div>
                      <h3 className="text-lg font-bold text-neutral-900">Visi</h3>
                    </div>
                    <div
                      className={proseClassCompact}
                      dangerouslySetInnerHTML={{ __html: item.visionHtml }}
                    />
                  </div>
                ) : null}
                {item.missionHtml ? (
                  <div className="min-w-0 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary-soft text-brand-primary">
                        <Compass size={18} weight="duotone" />
                      </div>
                      <h3 className="text-lg font-bold text-neutral-900">Misi</h3>
                    </div>
                    <div
                      className={proseClassCompact}
                      dangerouslySetInnerHTML={{ __html: item.missionHtml }}
                    />
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* Program Kegiatan */}
          {item.programs.length ? (
            <section
              className="scroll-reveal space-y-6"
              style={{ "--stagger-index": 2 } as React.CSSProperties}
            >
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 md:text-2xl">
                Program Kegiatan
              </h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {item.programs.map((program, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-lg border border-neutral-200 bg-white"
                  >
                    {program.imageUrl ? (
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={program.imageUrl}
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
          ) : null}

          {/* FAQ */}
          {item.faqs.length ? (
            <section
              className="scroll-reveal space-y-6"
              style={{ "--stagger-index": 3 } as React.CSSProperties}
            >
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 md:text-2xl">
                Pertanyaan Umum
              </h2>
              <Accordion items={item.faqs} />
            </section>
          ) : null}

          {/* Struktur Organisasi */}
          {people.length ? (
            <section
              className="scroll-reveal space-y-6"
              style={{ "--stagger-index": 4 } as React.CSSProperties}
            >
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
                      {person.photo ? (
                        <Image
                          src={person.photo}
                          alt={person.name}
                          fill
                          sizes="(max-width: 1024px) 50vw, 240px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center bg-gradient-to-br from-brand-primary-soft via-blue-50 to-indigo-50 text-2xl font-extrabold text-brand-primary/40">
                          {person.name.charAt(0).toUpperCase()}
                        </div>
                      )}
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
          ) : null}
        </div>

        <aside
          ref={asideRef}
          className="scroll-reveal space-y-6 lg:sticky lg:top-28 lg:self-start"
        >
          {/* Info Ekskul */}
          {item.schedules.length ? (
            <div className="rounded-lg border border-white/50 bg-white/50 p-6 backdrop-blur-xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                Info Ekskul
              </p>
              <div className="space-y-4">
                {item.schedules.map((sched, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <CalendarBlank
                      weight="duotone"
                      className="mt-0.5 size-5 shrink-0 text-brand-primary"
                    />
                    <div className="space-y-1">
                      <Badge variant="primary" className="text-[10px]">
                        {dayOfWeekLabel(sched.dayOfWeek)}
                      </Badge>
                      <p className="flex items-center gap-1.5 font-semibold text-neutral-900">
                        <Clock weight="duotone" className="size-4 text-neutral-400" />
                        {sched.startTime}
                        {sched.endTime ? ` – ${sched.endTime}` : ""}
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
          ) : null}

          {/* Narahubung */}
          {item.contactPhone || item.contactEmail ? (
            <div className="rounded-lg border border-white/50 bg-white/50 p-6 backdrop-blur-xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                Narahubung
              </p>
              <dl className="space-y-4 text-sm">
                {item.contactPhone ? (
                  <div className="flex items-start gap-3">
                    <Phone weight="duotone" className="mt-0.5 size-5 shrink-0 text-brand-primary" />
                    <div>
                      <dt className="text-neutral-500">Telepon</dt>
                      <dd>
                        <a
                          href={`tel:${item.contactPhone}`}
                          className="font-semibold text-neutral-900 hover:text-brand-primary"
                        >
                          {item.contactPhone}
                        </a>
                      </dd>
                    </div>
                  </div>
                ) : null}
                {item.contactEmail ? (
                  <div className="flex items-start gap-3">
                    <Envelope weight="duotone" className="mt-0.5 size-5 shrink-0 text-brand-primary" />
                    <div className="min-w-0">
                      <dt className="text-neutral-500">Email</dt>
                      <dd>
                        <a
                          href={`mailto:${item.contactEmail}`}
                          className="break-all font-semibold text-neutral-900 hover:text-brand-primary"
                        >
                          {item.contactEmail}
                        </a>
                      </dd>
                    </div>
                  </div>
                ) : null}
              </dl>
            </div>
          ) : null}

          {/* CTA Daftar */}
          {item.registrationUrl ? (
            <a
              href={item.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand-primary px-6 font-extrabold text-white shadow-xl shadow-brand-primary/20 transition-all hover:scale-[1.02] active:scale-95"
            >
              Daftar Sekarang
              <ArrowSquareOut size={18} weight="bold" />
            </a>
          ) : null}

          {/* Media Sosial */}
          {socialMedia.length ? (
            <div className="flex items-center justify-center gap-3 rounded-lg border border-white/50 bg-white/50 p-4 backdrop-blur-xl">
              {socialMedia.map((social) => {
                const Icon = socialIconMap[social.platform];
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.platform}
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
