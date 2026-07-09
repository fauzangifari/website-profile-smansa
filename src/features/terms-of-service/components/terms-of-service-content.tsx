"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import {
  Info,
  BookOpen,
  Stack,
  UserCircle,
  CheckCircle,
  UploadSimple,
  Copyright,
  Lock,
  Wrench,
  WarningCircle,
  Prohibit,
  Scales,
  Envelope,
  ListBullets,
  CalendarBlank,
  FileText,
  ArrowSquareOut,
  Translate,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";
import {
  termsMeta,
  termsSections,
  termsUi,
  type Locale,
  type TermsBlock,
  type TermsSection,
  type TermsUi,
} from "../data/terms-of-service-data";

// ── Icon resolver ────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Info,
  BookOpen,
  Stack,
  UserCircle,
  CheckCircle,
  UploadSimple,
  Copyright,
  Lock,
  Wrench,
  WarningCircle,
  Prohibit,
  Scales,
  Envelope,
};

// Label tautan Kebijakan Privasi per bahasa (untuk token {{privacy}}).
const PRIVACY_LABEL: Record<Locale, string> = {
  id: "Kebijakan Privasi",
  en: "Privacy Policy",
};

// ── Bullet ───────────────────────────────────────────────────────────────────
function Bullet() {
  return (
    <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-brand-primary/70" />
  );
}

// ── Email ter-obfuscate (anti-scraping) ──────────────────────────────────────
// Sebelum ter-mount (dan di HTML statis/SSR) hanya tampil "admin [at] domain"
// tanpa karakter "@" yang bisa di-scrape. Setelah mount di sisi klien, alamat
// dirangkai penuh menjadi tautan mailto yang berfungsi.
function ObfuscatedEmail() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // Sengaja set state setelah mount: server & first paint menampilkan bentuk
    // "[at]" (anti-scraping), lalu alamat asli baru dirangkai di sisi klien.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEmail(`${termsMeta.emailUser}@${termsMeta.emailDomain}`);
  }, []);

  if (!email) {
    return (
      <span className="font-semibold text-brand-primary" aria-label="school email address">
        {termsMeta.emailUser}
        <span aria-hidden="true"> [at] </span>
        {termsMeta.emailDomain}
      </span>
    );
  }

  return (
    <a
      href={`mailto:${email}`}
      className="font-semibold text-brand-primary underline-offset-2 hover:underline"
    >
      {email}
    </a>
  );
}

// Tautan internal ke halaman Kebijakan Privasi (untuk token {{privacy}}).
function PrivacyLink({ locale }: { locale: Locale }) {
  return (
    <Link
      href="/privacy-policy"
      className="font-semibold text-brand-primary underline-offset-2 hover:underline"
    >
      {PRIVACY_LABEL[locale]}
    </Link>
  );
}

// Ganti token {{email}} / {{privacy}} di dalam teks item dengan komponen terkait.
function renderItemText(text: string, locale: Locale) {
  if (!text.includes("{{")) return text;

  // Pisahkan berdasarkan token yang dikenali, lalu ganti tiap token.
  const parts = text.split(/(\{\{email\}\}|\{\{privacy\}\})/);
  return parts.map((part, i) => {
    if (part === "{{email}}") return <ObfuscatedEmail key={i} />;
    if (part === "{{privacy}}") return <PrivacyLink key={i} locale={locale} />;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

// ── Language toggle ──────────────────────────────────────────────────────────
function LanguageToggle({
  locale,
  onChange,
  label,
}: {
  locale: Locale;
  onChange: (locale: Locale) => void;
  label: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center gap-1 rounded-xl border border-neutral-200/70 bg-white/70 p-1 backdrop-blur-sm"
    >
      <Translate size={16} weight="duotone" className="ml-1 text-brand-primary" />
      {(["id", "en"] as const).map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => onChange(lng)}
          aria-pressed={locale === lng}
          className={cn(
            "rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors",
            locale === lng
              ? "bg-brand-primary text-white shadow-sm"
              : "text-neutral-500 hover:text-neutral-800",
          )}
        >
          {lng}
        </button>
      ))}
    </div>
  );
}

// ── Block renderer ───────────────────────────────────────────────────────────
function BlockRenderer({ block, locale }: { block: TermsBlock; locale: Locale }) {
  if (block.kind === "paragraph") {
    return (
      <p className="text-sm leading-7 text-neutral-700 md:text-[15px] md:leading-8">
        {block.text}
      </p>
    );
  }

  if (block.kind === "list") {
    return (
      <ul className="space-y-2.5">
        {block.items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <Bullet />
            <span className="text-sm leading-7 text-neutral-700">
              {renderItemText(item, locale)}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  // subsection
  return (
    <div className="rounded-lg border border-neutral-200/70 bg-neutral-50/70 p-4 md:p-5">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-brand-primary">
        {block.title}
      </p>
      <ul className="space-y-2.5">
        {block.items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <Bullet />
            <span className="text-sm leading-7 text-neutral-700">
              {renderItemText(item, locale)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Section card (with its own scroll-reveal) ────────────────────────────────
function SectionCard({
  section,
  ui,
  locale,
}: {
  section: TermsSection;
  ui: TermsUi;
  locale: Locale;
}) {
  const ref = useScrollReveal();
  const IconEl = ICON_MAP[section.icon] ?? Info;

  return (
    <div
      ref={ref}
      id={`section-${section.id}`}
      className="scroll-reveal scroll-mt-28"
    >
      <Card variant="glass" className="border-white/40 p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-primary-soft text-brand-primary">
            <IconEl size={24} weight="duotone" />
          </div>
          <div className="min-w-0 pt-1">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-primary/70">
              {ui.sectionLabel} {section.no}
            </span>
            <h2 className="mt-1 text-lg font-extrabold leading-snug text-neutral-900 md:text-xl">
              {section.title}
            </h2>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          {section.blocks.map((block, i) => (
            <BlockRenderer key={i} block={block} locale={locale} />
          ))}
        </div>

        {section.references && section.references.length > 0 && (
          <div className="mt-6 flex flex-col gap-2.5 border-t border-neutral-200/70 pt-5">
            <div className="flex items-center gap-1.5">
              <Scales size={14} weight="duotone" className="text-brand-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-500">
                {ui.legalBasisLabel}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {section.references.map((ref) => (
                <a
                  key={ref.url}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-brand-primary/20 bg-brand-primary-soft/60 px-3 py-1.5 text-xs font-semibold text-brand-primary transition-colors hover:border-brand-primary/40 hover:bg-brand-primary-soft"
                >
                  {ref.label}
                  <ArrowSquareOut size={13} weight="bold" className="shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

// ── Table of contents ────────────────────────────────────────────────────────
function TableOfContents({
  sections,
  label,
  activeId,
  onJump,
}: {
  sections: TermsSection[];
  label: string;
  activeId: string;
  onJump: (id: string) => void;
}) {
  return (
    <nav
      aria-label={label}
      className="rounded-lg border border-neutral-200/70 bg-white/70 p-4 backdrop-blur-md"
    >
      <div className="mb-3 flex items-center gap-2 px-1">
        <ListBullets size={16} weight="bold" className="text-brand-primary" />
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
          {label}
        </span>
      </div>
      <ol className="flex flex-col gap-0.5">
        {sections.map((section) => {
          const isActive = section.id === activeId;
          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => onJump(section.id)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] font-medium transition-colors",
                  isActive
                    ? "bg-brand-primary-soft text-brand-primary"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
                )}
              >
                <span
                  className={cn(
                    "grid size-5 shrink-0 place-items-center rounded-md text-[10px] font-bold",
                    isActive
                      ? "bg-brand-primary text-white"
                      : "bg-neutral-100 text-neutral-500",
                  )}
                >
                  {section.no}
                </span>
                <span className="min-w-0 leading-tight">{section.title}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export function TermsOfServiceContent({
  locale,
  onLocaleChange,
}: {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}) {
  const sections = termsSections[locale];
  const ui = termsUi[locale];
  const [activeId, setActiveId] = useState(() => sections[0]?.id ?? "");

  // Scroll-spy: highlight the section currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id.replace("section-", ""));
        }
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((section) => {
      const el = document.getElementById(`section-${section.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [locale, sections]);

  const handleJump = (id: string) => {
    const el = document.getElementById(`section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  };

  return (
    <div className="font-sans">
      {/* ── Hero ringkas + toggle bahasa ─────────────────────────────── */}
      <Card
        variant="glass-strong"
        className="mb-10 flex flex-col items-start gap-5 border-white/40 p-6 md:mb-12 md:flex-row md:items-center md:justify-between md:p-8"
      >
        <div className="flex items-start gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand-primary text-white shadow-lg shadow-brand-primary/25">
            <FileText size={28} weight="duotone" />
          </div>
          <div>
            <Badge variant="primary" className="mb-2">
              {ui.eyebrow}
            </Badge>
            <h2 className="text-xl font-extrabold leading-tight text-neutral-900 md:text-2xl">
              {ui.heroTitle}
            </h2>
            <p className="mt-1.5 max-w-xl text-sm leading-7 text-neutral-600">
              {ui.heroSubtitle}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <LanguageToggle
            locale={locale}
            onChange={onLocaleChange}
            label={ui.toggleLabel}
          />
          <div className="flex items-center gap-2 rounded-xl border border-neutral-200/70 bg-white/70 px-4 py-2.5 text-xs font-semibold text-neutral-600">
            <CalendarBlank
              size={16}
              weight="duotone"
              className="text-brand-primary"
            />
            {ui.lastUpdatedLabel} {ui.lastUpdated}
          </div>
        </div>
      </Card>

      {/* ── Layout: TOC (kiri) + Konten (kanan) ──────────────────────── */}
      <div className="grid gap-8 lg:grid-cols-[17rem_1fr] lg:items-start lg:gap-12">
        <aside className="lg:sticky lg:top-28">
          <TableOfContents
            sections={sections}
            label={ui.tocLabel}
            activeId={activeId}
            onJump={handleJump}
          />
        </aside>

        <div className="flex flex-col gap-6 md:gap-8">
          {sections.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              ui={ui}
              locale={locale}
            />
          ))}

          {/* ── Disclaimer ────────────────────────────────────────────── */}
          <div className="flex items-start gap-3 rounded-lg border border-amber-200/70 bg-amber-50/70 p-5">
            <WarningCircle
              size={20}
              weight="duotone"
              className="mt-0.5 shrink-0 text-amber-600"
            />
            <p className="text-xs leading-6 text-amber-800">{ui.disclaimer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
