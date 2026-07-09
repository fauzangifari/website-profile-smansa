"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Flag,
  BookOpenText,
  Car,
  Scissors,
  IdentificationCard,
  UsersThree,
  ProhibitInset,
  MagnifyingGlass,
  Warning,
  ShieldCheck,
  TShirt,
  List,
  CaretDown,
  CheckCircle,
  XCircle,
  ArrowRight,
  Notepad,
  CalendarBlank,
  User,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  tataTertibSections,
  tataTertibStats,
  tataTertibMeta,
  tataTertibCategories,
  seragamPerHari,
  ketentUanSeragamUmum,
  type TataTertibSection,
  type TataTertibItem,
} from "@/features/tata-tertib/data/tata-tertib-data";

// ── Icon resolver ──────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Shield,
  Flag,
  BookOpenText,
  Car,
  Scissors,
  IdentificationCard,
  UsersThree,
  ProhibitInset,
  MagnifyingGlass,
  Warning,
  ShieldCheck,
  TShirt,
  List,
};

// ── Color maps ─────────────────────────────────────────────────────────────────
const colorBg: Record<string, string> = {
  blue: "bg-blue-50 border-blue-200/60",
  emerald: "bg-emerald-50 border-emerald-200/60",
  amber: "bg-amber-50 border-amber-200/60",
  violet: "bg-violet-50 border-violet-200/60",
  sky: "bg-sky-50 border-sky-200/60",
  teal: "bg-teal-50 border-teal-200/60",
  rose: "bg-rose-50 border-rose-200/60",
  orange: "bg-orange-50 border-orange-200/60",
  red: "bg-red-50 border-red-200/60",
  indigo: "bg-indigo-50 border-indigo-200/60",
};

const colorIcon: Record<string, string> = {
  blue: "bg-blue-100 text-blue-600",
  emerald: "bg-emerald-100 text-emerald-600",
  amber: "bg-amber-100 text-amber-600",
  violet: "bg-violet-100 text-violet-600",
  sky: "bg-sky-100 text-sky-600",
  teal: "bg-teal-100 text-teal-600",
  rose: "bg-rose-100 text-rose-600",
  orange: "bg-orange-100 text-orange-600",
  red: "bg-red-100 text-red-600",
  indigo: "bg-indigo-100 text-indigo-600",
};

const colorText: Record<string, string> = {
  blue: "text-blue-700",
  emerald: "text-emerald-700",
  amber: "text-amber-700",
  violet: "text-violet-700",
  sky: "text-sky-700",
  teal: "text-teal-700",
  rose: "text-rose-700",
  orange: "text-orange-700",
  red: "text-red-700",
  indigo: "text-indigo-700",
};

const colorBadge: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700 border-blue-200",
  emerald: "bg-emerald-100 text-emerald-700 border-emerald-200",
  amber: "bg-amber-100 text-amber-700 border-amber-200",
  violet: "bg-violet-100 text-violet-700 border-violet-200",
  sky: "bg-sky-100 text-sky-700 border-sky-200",
  teal: "bg-teal-100 text-teal-700 border-teal-200",
  rose: "bg-rose-100 text-rose-700 border-rose-200",
  orange: "bg-orange-100 text-orange-700 border-orange-200",
  red: "bg-red-100 text-red-700 border-red-200",
  indigo: "bg-indigo-100 text-indigo-700 border-indigo-200",
};

// ── Motion variants ────────────────────────────────────────────────────────────
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 280, damping: 28 },
  },
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const accordionVariants = {
  closed: { height: 0, opacity: 0 },
  open: {
    height: "auto",
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 30 },
  },
};

// ── Item bullet ────────────────────────────────────────────────────────────────
function ItemBullet({ colorClass, isLarangan }: { colorClass: string; isLarangan: boolean }) {
  if (isLarangan) {
    return <XCircle size={16} weight="fill" className="mt-0.5 shrink-0 text-rose-500" />;
  }
  return <CheckCircle size={16} weight="fill" className={cn("mt-0.5 shrink-0", colorText[colorClass])} />;
}

// ── Single item renderer ───────────────────────────────────────────────────────
function TertibItem({
  item,
  colorClass,
  isLarangan,
}: {
  item: TataTertibItem;
  colorClass: string;
  isLarangan: boolean;
}) {
  return (
    <li className="flex flex-col gap-1">
      <div className="flex items-start gap-2.5">
        <ItemBullet colorClass={colorClass} isLarangan={isLarangan} />
        <span className="text-sm leading-6 text-neutral-700">{item.text}</span>
      </div>
      {item.sub && item.sub.length > 0 && (
        <ul className="ml-6 mt-1 space-y-1 border-l-2 border-neutral-200 pl-4">
          {item.sub.map((sub, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <ArrowRight
                size={12}
                weight="bold"
                className={cn("mt-1 shrink-0", colorText[colorClass])}
              />
              <span className="text-xs leading-5 text-neutral-600">{sub}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

// ── Accordion card ─────────────────────────────────────────────────────────────
function SectionCard({ section }: { section: TataTertibSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const IconEl = ICON_MAP[section.icon] ?? Shield;
  const isLarangan = section.id === "larangan";

  return (
    <motion.div
      variants={cardVariants}
      id={`section-${section.id}`}
      className={cn(
        "overflow-hidden rounded-lg border transition-all duration-300",
        colorBg[section.colorClass],
        isOpen ? "shadow-md" : "shadow-sm hover:shadow-md",
      )}
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-white/40 md:p-6"
        aria-expanded={isOpen}
        aria-controls={`body-${section.id}`}
        id={`header-${section.id}`}
      >
        {/* Icon */}
        <div
          className={cn(
            "flex shrink-0 size-11 items-center justify-center rounded-xl",
            colorIcon[section.colorClass],
          )}
        >
          <IconEl size={22} weight="duotone" />
        </div>

        {/* Title + Pasal */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-0.5">
            <span
              className={cn(
                "text-[10px] font-bold uppercase tracking-[0.2em] border rounded-full px-2.5 py-0.5",
                colorBadge[section.colorClass],
              )}
            >
              {section.pasal}
            </span>
          </div>
          <h3 className="text-base font-extrabold leading-snug text-neutral-900 md:text-lg">
            {section.title}
          </h3>
          <p className="mt-0.5 text-xs text-neutral-500">
            {section.items.length} ketentuan
          </p>
        </div>

        {/* Caret */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="shrink-0"
        >
          <CaretDown
            size={20}
            weight="bold"
            className={cn(colorText[section.colorClass])}
          />
        </motion.div>
      </button>

      {/* Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            id={`body-${section.id}`}
            role="region"
            aria-labelledby={`header-${section.id}`}
            initial="closed"
            animate="open"
            exit="closed"
            variants={accordionVariants}
            className="overflow-hidden"
          >
            <div className="border-t border-white/60 bg-white/50 px-5 py-5 md:px-6">
              <ul className="space-y-3">
                {section.items.map((item, idx) => (
                  <TertibItem
                    key={idx}
                    item={item}
                    colorClass={section.colorClass}
                    isLarangan={isLarangan}
                  />
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Seragam Section ────────────────────────────────────────────────────────────
function SeragamSection() {
  const [activeHari, setActiveHari] = useState(0);
  const [activeGender, setActiveGender] = useState<"putra" | "putri">("putra");

  return (
    <motion.div
      variants={cardVariants}
      id="section-seragam"
      className="overflow-hidden rounded-lg border border-blue-200/60 bg-blue-50 shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center gap-4 p-5 md:p-6">
        <div className="flex shrink-0 size-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
          <TShirt size={22} weight="duotone" />
        </div>
        <div>
          <div className="mb-0.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] border rounded-full px-2.5 py-0.5 bg-blue-100 text-blue-700 border-blue-200">
              Pasal 5
            </span>
          </div>
          <h3 className="text-base font-extrabold text-neutral-900 md:text-lg">Pakaian Seragam</h3>
          <p className="mt-0.5 text-xs text-neutral-500">Ketentuan seragam per hari & umum</p>
        </div>
      </div>

      {/* Body */}
      <div className="border-t border-white/60 bg-white/50 px-5 py-5 md:px-6">
        {/* Tabs: Hari */}
        <div className="flex flex-wrap gap-2 mb-5">
          {seragamPerHari.map((s, i) => (
            <button
              key={s.hari}
              type="button"
              onClick={() => setActiveHari(i)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-bold transition-all",
                activeHari === i
                  ? "bg-brand-primary text-white shadow-md shadow-brand-primary/25"
                  : "bg-white border border-neutral-200 text-neutral-600 hover:border-brand-primary/40 hover:text-brand-primary",
              )}
            >
              {s.hari}
            </button>
          ))}
        </div>

        {/* Tabs: Gender */}
        <div className="flex gap-2 mb-5">
          {(["putra", "putri"] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setActiveGender(g)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold capitalize transition-all",
                activeGender === g
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white border border-neutral-200 text-neutral-600 hover:border-blue-300 hover:text-blue-600",
              )}
            >
              <User size={13} weight="duotone" />
              {g}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.ul
            key={`${activeHari}-${activeGender}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-3 mb-6"
          >
            {seragamPerHari[activeHari][activeGender].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle
                  size={16}
                  weight="fill"
                  className="mt-0.5 shrink-0 text-blue-600"
                />
                <span className="text-sm leading-6 text-neutral-700">{item}</span>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>

        {/* Ketentuan umum */}
        <div className="rounded-lg border border-blue-200/50 bg-blue-50/80 p-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-blue-700">
            Ketentuan Umum Seragam
          </p>
          <ul className="space-y-2">
            {ketentUanSeragamUmum.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle
                  size={14}
                  weight="fill"
                  className="mt-0.5 shrink-0 text-blue-500"
                />
                <span className="text-xs leading-5 text-neutral-600">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

// ── Category Tab Bar ───────────────────────────────────────────────────────────
function CategoryTabBar({
  activeCategory,
  onSelect,
}: {
  activeCategory: string;
  onSelect: (id: string) => void;
}) {
  const tabsRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={tabsRef}
      className="sticky top-20 z-30 flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
    >
      <div className="flex gap-2 rounded-2xl border border-neutral-200/70 bg-white/80 p-2 backdrop-blur-md shadow-sm">
        {tataTertibCategories.map((cat) => {
          const IconEl = ICON_MAP[cat.icon] ?? List;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelect(cat.id)}
              className={cn(
                "flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-bold transition-all",
                activeCategory === cat.id
                  ? "bg-brand-primary text-white shadow-md shadow-brand-primary/25"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-brand-primary",
              )}
            >
              <IconEl size={14} weight={activeCategory === cat.id ? "fill" : "regular"} />
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export function TataTertibContent() {
  const [activeCategory, setActiveCategory] = useState("semua");

  // Filtered sections based on category
  const filteredSections = (() => {
    if (activeCategory === "semua") return tataTertibSections;
    const cat = tataTertibCategories.find((c) => c.id === activeCategory);
    if (!cat) return tataTertibSections;
    return tataTertibSections.filter((s) => cat.sectionIds.includes(s.id));
  })();

  const showSeragam =
    activeCategory === "semua" || activeCategory === "seragam";

  // Scroll to section when clicking category
  const handleCategorySelect = (id: string) => {
    setActiveCategory(id);
    if (id !== "semua") {
      const cat = tataTertibCategories.find((c) => c.id === id);
      const firstId = cat?.sectionIds[0] ?? id;
      setTimeout(() => {
        const el = document.getElementById(`section-${firstId}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  return (
    <div className="flex flex-col gap-12 md:gap-16">

      {/* ── Section 1: Hero Card ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-[2rem] border border-brand-primary/10 bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/20 p-8 shadow-sm md:p-12">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-brand-primary/6 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 size-64 rounded-full bg-indigo-400/5 blur-3xl" />

        <div className="relative flex flex-col items-center text-center">
          {/* Icon */}
          <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-brand-primary-soft text-brand-primary shadow-sm">
            <Shield size={36} weight="duotone" />
          </div>

          <Badge
            variant="primary"
            className="mb-5 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.18em]"
          >
            Tata Tertib Resmi
          </Badge>

          <h2 className="max-w-3xl text-2xl font-extrabold leading-tight text-neutral-900 md:text-3xl lg:text-4xl">
            Peraturan & Tata Tertib{" "}
            <span className="text-brand-primary">Murid SMANSA</span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-8 text-neutral-600 md:text-base">
            Tata Tertib Murid SMA Negeri 1 Samarinda bertujuan menciptakan suasana kondusif,
            membentuk pribadi yang bersahaja, berakhlak mulia, dan saling menghormati
            di lingkungan sekolah.
          </p>

          {/* Stat chips */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {tataTertibStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 rounded-lg border border-brand-primary/15 bg-white/70 px-5 py-4 shadow-sm backdrop-blur-sm"
              >
                <span className="text-3xl font-extrabold leading-none text-brand-primary">
                  {stat.value}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* SK Info */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-500">
            <span className="flex items-center gap-1.5">
              <Notepad size={13} weight="duotone" className="text-brand-primary" />
              SK No. {tataTertibMeta.nomorSK}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarBlank size={13} weight="duotone" className="text-brand-primary" />
              Ditetapkan {tataTertibMeta.tanggal}
            </span>
          </div>
        </div>
      </section>

      {/* ── Section 2: Navigation tabs + Content ────────────────────────── */}
      <section className="space-y-6">
        {/* Sticky Tab Bar */}
        <CategoryTabBar
          activeCategory={activeCategory}
          onSelect={handleCategorySelect}
        />

        {/* ── Seragam (khusus, dengan mini-tabs hari/gender) */}
        <AnimatePresence mode="popLayout">
          {showSeragam && (
            <motion.div
              key="seragam"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <SeragamSection />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Main sections (accordion) */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-4"
          >
            {filteredSections.map((section) => (
              <SectionCard key={section.id} section={section} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── Section 3: Informasi SK ─────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-[2rem] border border-neutral-200/60 bg-gradient-to-br from-neutral-50 via-white to-blue-50/30 p-8 shadow-sm md:p-10">
        <div className="pointer-events-none absolute -right-16 -bottom-16 size-48 rounded-full bg-brand-primary/5 blur-3xl" />
        <div className="relative">
          <div className="mb-6 flex flex-col items-center text-center">
            <Badge variant="glass" className="mb-4">
              Referensi Resmi
            </Badge>
            <h3 className="text-xl font-extrabold text-neutral-900 md:text-2xl">
              Informasi Surat Keputusan
            </h3>
            <p className="mt-2 max-w-lg text-sm text-neutral-500">
              Tata tertib ini berlaku berdasarkan Surat Keputusan resmi Kepala SMA Negeri 1 Samarinda.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                label: "Nomor SK",
                value: tataTertibMeta.nomorSK,
                icon: Notepad,
              },
              {
                label: "Ditetapkan",
                value: `${tataTertibMeta.ditetapkanDi}, ${tataTertibMeta.tanggal}`,
                icon: CalendarBlank,
              },
              {
                label: "Kepala Sekolah",
                value: tataTertibMeta.kepalaSekolah,
                icon: User,
              },
            ].map((info) => (
              <div
                key={info.label}
                className="flex items-start gap-3 rounded-lg border border-neutral-200/70 bg-white/70 p-4 backdrop-blur-sm"
              >
                <div className="flex shrink-0 size-9 items-center justify-center rounded-lg bg-brand-primary-soft text-brand-primary">
                  <info.icon size={18} weight="duotone" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                    {info.label}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-neutral-800">
                    {info.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-neutral-400">
            NIP. {tataTertibMeta.nip} • Tata tertib ini dapat berubah sesuai kebutuhan.
          </p>
        </div>
      </section>
    </div>
  );
}
