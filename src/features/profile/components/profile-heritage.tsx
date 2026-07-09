import type { CSSProperties } from "react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";

export type HeritageFigure = {
  value: string;
  label: string;
  description: string;
  /** Optional supporting range, e.g. "1953–2026". */
  range?: string;
};

type ProfileHeritageProps = {
  heading: string;
  figures: HeritageFigure[];
};

/**
 * The page signature: an editorial figures band anchored to the 1953 founding.
 * Oversized, tight numerals separated by hairline rules — deliberately not the
 * generic glass KPI tile. Server component; entrance handled by the shared
 * `Reveal` bridge with a small per-figure delay for a staggered read.
 */
export function ProfileHeritage({ heading, figures }: ProfileHeritageProps) {
  return (
    <section
      aria-label="Warisan SMA Negeri 1 Samarinda"
      className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm shadow-neutral-900/5 md:p-8"
    >
      <Reveal>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Badge variant="primary">Warisan SMANSA</Badge>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-accent">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-accent" />
            Sejak 1953
          </span>
        </div>
        <h2 className="mt-4 max-w-2xl text-2xl font-extrabold leading-tight text-neutral-900 md:text-3xl">
          {heading}
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-y-10 sm:grid-cols-3 sm:gap-y-0 sm:divide-x sm:divide-neutral-200">
        {figures.map((figure, index) => (
          <Reveal
            key={figure.label}
            className="h-full sm:px-8 sm:first:pl-0 sm:last:pr-0"
            style={{ transitionDelay: `${index * 90}ms` } as CSSProperties}
          >
            <p
              className={`text-6xl font-extrabold leading-none tracking-tight md:text-7xl ${
                index === 0 ? "text-primary-900" : "text-brand-primary"
              }`}
            >
              {figure.value}
            </p>
            {figure.range ? (
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400 tabular-nums">
                {figure.range}
              </p>
            ) : null}
            <h3 className="mt-4 text-sm font-bold uppercase tracking-[0.16em] text-neutral-900">
              {figure.label}
            </h3>
            <p className="mt-2 max-w-xs text-sm leading-6 text-neutral-600">
              {figure.description}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
