"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  CalendarBlank,
  Flag,
  Sun,
  Moon,
  Star,
  Exam,
  FileText,
  Confetti,
  GraduationCap,
  FlagBanner,
  DownloadSimple,
  WarningCircle,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  calendarEvents,
  kalenderStats,
  kalenderLegends,
  type CalendarEvent,
} from "@/features/akademik/data/kalender-akademik-data";

// ── Icon Resolver ──────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Flag,
  Sun,
  Moon,
  Star,
  Exam,
  FileText,
  Confetti,
  GraduationCap,
  FlagBanner,
};

// ── Date Helpers ───────────────────────────────────────────────────────────────
const MONTHS = [
  { year: 2026, month: 6, label: "JULI", isGasal: true }, // JS months are 0-indexed
  { year: 2026, month: 7, label: "AGUSTUS", isGasal: true },
  { year: 2026, month: 8, label: "SEPTEMBER", isGasal: true },
  { year: 2026, month: 9, label: "OKTOBER", isGasal: true },
  { year: 2026, month: 10, label: "NOPEMBER", isGasal: true },
  { year: 2026, month: 11, label: "DESEMBER", isGasal: true },
  { year: 2027, month: 0, label: "JANUARI", isGasal: false },
  { year: 2027, month: 1, label: "PEBRUARI", isGasal: false },
  { year: 2027, month: 2, label: "MARET", isGasal: false },
  { year: 2027, month: 3, label: "APRIL", isGasal: false },
  { year: 2027, month: 4, label: "MEI", isGasal: false },
  { year: 2027, month: 5, label: "JUNI", isGasal: false },
  { year: 2027, month: 6, label: "JULI", isGasal: false },
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function formatDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

// ── Generate Matrix ────────────────────────────────────────────────────────────
type CellData = {
  dateKey: string;
  isWeekend: boolean;
  weekendLabel?: "S" | "M";
  event?: CalendarEvent;
  effectiveCounter?: number;
  isEmpty: boolean;
};

type RowData = {
  label: string;
  year: number;
  isGasal: boolean;
  cells: CellData[];
};

function useCalendarMatrix() {
  return useMemo(() => {
    const rows: RowData[] = [];
    let gasalCounter = 1;
    let genapCounter = 1;

    for (const m of MONTHS) {
      const daysCount = getDaysInMonth(m.year, m.month);
      const cells: CellData[] = [];

      for (let day = 1; day <= 31; day++) {
        if (day > daysCount) {
          cells.push({ dateKey: "", isWeekend: false, isEmpty: true });
          continue;
        }

        const date = new Date(m.year, m.month, day);
        const dateKey = formatDateKey(m.year, m.month, day);
        const dayOfWeek = date.getDay(); // 0 = Sun, 6 = Sat
        
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const weekendLabel = dayOfWeek === 0 ? "M" : dayOfWeek === 6 ? "S" : undefined;

        // Check for events
        const event = calendarEvents.find((evt) => {
          return dateKey >= evt.startDate && dateKey <= evt.endDate;
        });

        // Determine effective day
        let effectiveCounter = undefined;
        if (!isWeekend && (!event || event.type === "kegiatan" || event.type === "ujian")) {
          // It's a school day
          if (m.isGasal) {
            effectiveCounter = gasalCounter++;
          } else {
            effectiveCounter = genapCounter++;
          }
        }

        cells.push({
          dateKey,
          isWeekend,
          weekendLabel,
          event,
          effectiveCounter,
          isEmpty: false,
        });
      }

      rows.push({
        label: `${m.label} ${m.year}`,
        year: m.year,
        isGasal: m.isGasal,
        cells,
      });
    }

    return rows;
  }, []);
}

// ── Sub-component: Event List ──────────────────────────────────────────────────
function TimelineEvent({ event }: { event: CalendarEvent }) {
  const IconEl = ICON_MAP[event.icon] || CalendarBlank;
  
  // parse dates for display
  const startObj = new Date(event.startDate);
  const endObj = new Date(event.endDate);
  const isSameDay = event.startDate === event.endDate;
  
  const dateOptions: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
  const dateStr = isSameDay 
    ? startObj.toLocaleDateString("id-ID", dateOptions)
    : `${startObj.toLocaleDateString("id-ID", { day: "numeric", month: "short" })} - ${endObj.toLocaleDateString("id-ID", dateOptions)}`;

  return (
    <div className="group relative flex gap-4 pb-8 last:pb-0">
      {/* Line */}
      <div className="absolute left-6 top-8 bottom-0 w-px bg-neutral-200 group-last:hidden" />
      
      {/* Icon */}
      <div className={cn("relative z-10 flex shrink-0 size-12 items-center justify-center rounded-2xl shadow-sm border", event.colorClass)}>
        <IconEl size={20} weight="duotone" />
      </div>
      
      {/* Content */}
      <div className="flex flex-col pt-1.5">
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
          {dateStr}
        </span>
        <h4 className="text-base font-extrabold text-neutral-800 md:text-lg">
          {event.title}
        </h4>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export function KalenderAkademikContent() {
  const matrixRows = useCalendarMatrix();
  const [activeSemester, setActiveSemester] = useState<"gasal" | "genap">("gasal");

  const gasalEvents = calendarEvents.filter((e) => e.startDate < "2027-01-01");
  const genapEvents = calendarEvents.filter((e) => e.startDate >= "2027-01-01");
  const activeEvents = activeSemester === "gasal" ? gasalEvents : genapEvents;

  return (
    <div className="flex flex-col gap-12 md:gap-16">
      {/* ── Section 1: Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-[2rem] border border-brand-primary/10 bg-gradient-to-br from-white via-indigo-50/40 to-blue-50/20 p-8 shadow-sm md:p-12">
        <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-brand-primary/6 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 size-64 rounded-full bg-brand-accent/5 blur-3xl" />

        <div className="relative flex flex-col items-center text-center">
          <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-brand-primary-soft text-brand-primary shadow-sm">
            <CalendarBlank size={36} weight="duotone" />
          </div>

          <Badge variant="primary" className="mb-5 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.18em]">
            Tahun Ajaran 2026/2027
          </Badge>

          <h2 className="max-w-3xl text-2xl font-extrabold leading-tight text-neutral-900 md:text-3xl lg:text-4xl">
            Kalender Akademik <span className="text-brand-primary">SMANSA</span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-8 text-neutral-600 md:text-base">
            Informasi lengkap agenda pendidikan, jadwal ujian, hari efektif sekolah, 
            serta hari libur di lingkungan SMA Negeri 1 Samarinda.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="flex flex-col items-center gap-1 rounded-xl border border-brand-primary/15 bg-white/70 px-5 py-4 shadow-sm backdrop-blur-sm">
              <span className="text-3xl font-extrabold leading-none text-brand-primary">
                {kalenderStats.gasal.hariEfektif}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-500">
                Hari Efektif Gasal
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-xl border border-brand-primary/15 bg-white/70 px-5 py-4 shadow-sm backdrop-blur-sm">
              <span className="text-3xl font-extrabold leading-none text-brand-primary">
                {kalenderStats.genap.hariEfektif}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-500">
                Hari Efektif Genap
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-xl border border-brand-primary/15 bg-white/70 px-5 py-4 shadow-sm backdrop-blur-sm">
              <span className="text-3xl font-extrabold leading-none text-brand-secondary">
                {kalenderStats.total.pekanEfektif}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-500">
                Total Pekan
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-xl border border-brand-primary/15 bg-white/70 px-5 py-4 shadow-sm backdrop-blur-sm">
              <span className="text-3xl font-extrabold leading-none text-brand-secondary">
                {kalenderStats.total.hariEfektif}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-500">
                Total Hari
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Matriks Kalender (Manual Grid) ────────────────── */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Badge variant="glass" className="mb-4">Matriks Kalender</Badge>
            <h3 className="text-2xl font-extrabold text-neutral-900">Jadwal Efektif & Agenda</h3>
            <p className="mt-2 text-sm text-neutral-500 max-w-xl">
              Tabel matriks kalender akademik tahun 2026/2027. Arahkan kursor pada kotak berwarna untuk melihat detail agenda.
            </p>
          </div>
          <a 
            href="/documents/kalender-akademik-26-27.pdf" 
            download
            className="shrink-0 flex items-center justify-center h-11 gap-2.5 px-4 text-sm font-bold bg-brand-primary text-white rounded-md shadow-md shadow-brand-primary/20 hover:bg-brand-primary-hover active:bg-brand-primary-active transition duration-200"
          >
            <DownloadSimple size={18} weight="bold" />
            Download PDF Asli
          </a>
        </div>

        {/* The Matrix Table */}
        <div className="rounded-2xl border border-neutral-200/70 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <table className="w-full border-collapse text-[10px] sm:text-xs">
              <thead>
                <tr className="bg-neutral-50/80 border-b border-neutral-200">
                  <th className="sticky left-0 z-20 bg-neutral-50/90 backdrop-blur-md px-3 py-3 text-left font-bold text-neutral-600 border-r border-neutral-200 min-w-[120px]">
                    BULAN
                  </th>
                  {Array.from({ length: 31 }, (_, i) => (
                    <th key={i} className="px-1.5 py-3 font-bold text-neutral-500 min-w-[28px] text-center border-r border-neutral-100 last:border-r-0">
                      {i + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrixRows.map((row, rIdx) => (
                  <tr key={rIdx} className="border-b border-neutral-100 last:border-0 group">
                    <td className="sticky left-0 z-20 bg-white group-hover:bg-neutral-50/50 px-3 py-2 font-bold text-neutral-700 border-r border-neutral-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] whitespace-nowrap">
                      {row.label}
                    </td>
                    {row.cells.map((cell, cIdx) => {
                      if (cell.isEmpty) {
                        return <td key={cIdx} className="bg-neutral-50/50 border-r border-neutral-100 last:border-0" />;
                      }

                      // Cell rendering logic
                      let content: React.ReactNode = "";
                      let cellClass = "bg-white text-neutral-500";
                      let tooltip = "";

                      if (cell.event && cell.event.type === "libur") {
                        // Priority to holidays
                        cellClass = cell.event.colorClass;
                        tooltip = cell.event.title;
                      } else if (cell.isWeekend) {
                        cellClass = cell.weekendLabel === "M" ? "bg-green-500 text-white font-bold" : "bg-red-500 text-white font-bold";
                        content = cell.weekendLabel;
                        tooltip = cell.weekendLabel === "M" ? "Minggu" : "Sabtu";
                      } else if (cell.event) {
                        // Other events (ujian, kegiatan) overlay over regular days
                        cellClass = cell.event.colorClass;
                        tooltip = cell.event.title;
                        // Some events we still show the day counter if they are school days
                        if (cell.effectiveCounter) {
                          content = cell.effectiveCounter;
                        }
                      } else if (cell.effectiveCounter) {
                        // Regular school day
                        content = cell.effectiveCounter;
                        cellClass = "bg-neutral-50/30 text-neutral-600 font-medium hover:bg-brand-primary-soft hover:text-brand-primary transition-colors cursor-default";
                      }

                      return (
                        <td 
                          key={cIdx} 
                          className={cn(
                            "relative border-r border-neutral-100 last:border-0 text-center transition-all",
                            cellClass,
                            tooltip && "cursor-pointer hover:opacity-90 hover:shadow-inner"
                          )}
                          title={tooltip} // native tooltip for simplicity and accessibility
                        >
                          <div className="flex items-center justify-center h-7 w-7 mx-auto">
                            {content}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Legend */}
          <div className="border-t border-neutral-200 bg-neutral-50 p-5">
            <p className="text-xs font-bold text-neutral-600 mb-3 flex items-center gap-2">
              <WarningCircle size={16} weight="duotone" />
              Keterangan Warna / Legenda:
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <div className="flex items-center gap-2">
                <div className="size-4 rounded-sm bg-red-500" />
                <span className="text-[11px] font-medium text-neutral-600">Sabtu</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 rounded-sm bg-green-500" />
                <span className="text-[11px] font-medium text-neutral-600">Minggu</span>
              </div>
              {kalenderLegends.map((leg, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={cn("size-4 rounded-sm shadow-sm", leg.colorClass)} />
                  <span className="text-[11px] font-medium text-neutral-600">{leg.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Sorotan Agenda ──────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex flex-col items-center text-center">
          <Badge variant="glass" className="mb-4">Timeline Agenda</Badge>
          <h3 className="text-2xl font-extrabold text-neutral-900">Sorotan Agenda Penting</h3>
          <p className="mt-2 text-sm text-neutral-500 max-w-xl">
            Rincian kegiatan utama sekolah yang dijadwalkan pada tahun ajaran ini.
          </p>
        </div>

        <div className="max-w-3xl mx-auto w-full">
          {/* Semester Tabs */}
          <div className="flex rounded-xl bg-white p-1 border border-neutral-200/60 shadow-sm mb-8 relative z-10">
            <button
              type="button"
              onClick={() => setActiveSemester("gasal")}
              className={cn(
                "flex-1 rounded-lg py-2.5 text-sm font-bold transition-all",
                activeSemester === "gasal"
                  ? "bg-brand-primary text-white shadow-md"
                  : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
              )}
            >
              Semester Gasal
            </button>
            <button
              type="button"
              onClick={() => setActiveSemester("genap")}
              className={cn(
                "flex-1 rounded-lg py-2.5 text-sm font-bold transition-all",
                activeSemester === "genap"
                  ? "bg-brand-primary text-white shadow-md"
                  : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
              )}
            >
              Semester Genap
            </button>
          </div>

          {/* Timeline List */}
          <div className="bg-white/60 backdrop-blur-md border border-neutral-200/50 rounded-2xl p-6 md:p-8 shadow-sm">
            <motion.div
              key={activeSemester}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeEvents.map((evt) => (
                <TimelineEvent key={evt.id} event={evt} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
