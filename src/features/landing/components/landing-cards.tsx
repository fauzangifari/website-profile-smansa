import { Badge } from "@/components/ui/badge";
import { Card, GlassCard } from "@/components/ui/card";
import { VisualPlaceholder } from "@/features/landing/components/visual-placeholder";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

export function StatCard({
  label,
  value,
  note,
  tone = "light",
}: {
  label: string;
  value: string | number | null;
  note: string;
  tone?: Tone;
}) {
  return (
    <GlassCard
      className={cn(
        "p-5 hover:-translate-y-1",
        tone === "dark" ? "border-white/10 bg-white/10" : null,
      )}
    >
      <p
        className={cn(
          "text-3xl font-extrabold",
          tone === "dark" ? "text-white" : "text-neutral-900",
        )}
      >
        {value ?? "--"}
      </p>
      <p
        className={cn(
          "mt-2 text-sm font-semibold",
          tone === "dark" ? "text-white/80" : "text-neutral-700",
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          "mt-1 text-xs leading-5",
          tone === "dark" ? "text-white/56" : "text-neutral-500",
        )}
      >
        {note}
      </p>
    </GlassCard>
  );
}

export function FeatureCard({
  title,
  description,
  index,
  tone = "light",
}: {
  title: string;
  description: string;
  index: number;
  tone?: Tone;
}) {
  return (
    <Card
      variant={tone === "dark" ? "glass-soft" : "default"}
      className={cn(
        "group h-full p-6 hover:-translate-y-1 hover:shadow-md",
        tone === "dark" ? "border-white/10 bg-white/10" : null,
      )}
    >
      <span className="grid size-10 place-items-center rounded-md bg-brand-primary-soft text-sm font-extrabold text-brand-primary">
        {index + 1}
      </span>
      <h3
        className={cn(
          "mt-5 text-lg font-bold",
          tone === "dark" ? "text-white" : "text-neutral-900",
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "mt-3 text-sm leading-6",
          tone === "dark" ? "text-white/68" : "text-neutral-700",
        )}
      >
        {description}
      </p>
    </Card>
  );
}

export function ProgramCard({
  title,
  category,
  description,
  tone = "light",
}: {
  title: string;
  category: string;
  description: string;
  tone?: Tone;
}) {
  return (
    <GlassCard
      className={cn(
        "h-full p-6 hover:-translate-y-1",
        tone === "dark" ? "border-white/10 bg-white/10" : null,
      )}
    >
      <Badge variant="glass">{category}</Badge>
      <h3
        className={cn(
          "mt-5 text-2xl font-bold",
          tone === "dark" ? "text-white" : "text-neutral-900",
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "mt-3 text-sm leading-6",
          tone === "dark" ? "text-white/68" : "text-neutral-700",
        )}
      >
        {description}
      </p>
    </GlassCard>
  );
}

export function AchievementCard({
  title,
  category,
  level,
  year,
  description,
  featured = false,
  tone = "light",
}: {
  title: string;
  category: string;
  level: string;
  year: string;
  description: string;
  featured?: boolean;
  tone?: Tone;
}) {
  return (
    <Card
      variant={tone === "dark" || featured ? "glass-strong" : "default"}
      className={cn(
        "h-full p-6 hover:-translate-y-1",
        featured ? "lg:col-span-2" : null,
        tone === "dark" ? "border-white/10 bg-white/10" : null,
      )}
    >
      <div className="flex flex-wrap gap-2">
        <Badge variant={featured ? "warning" : "primary"}>{category}</Badge>
        <Badge>{year}</Badge>
      </div>
      <h3
        className={cn(
          "mt-5 text-2xl font-bold",
          tone === "dark" ? "text-white" : "text-neutral-900",
        )}
      >
        {title}
      </h3>
      <p className="mt-2 text-sm font-semibold text-brand-primary">{level}</p>
      <p
        className={cn(
          "mt-3 text-sm leading-6",
          tone === "dark" ? "text-white/68" : "text-neutral-700",
        )}
      >
        {description}
      </p>
    </Card>
  );
}

export function FacilityCard({
  name,
  imageSrc,
  tone = "light",
}: {
  name: string;
  imageSrc?: string;
  tone?: Tone;
}) {
  return (
    <div className="group relative overflow-hidden rounded-lg transition duration-200 hover:-translate-y-1">
      <VisualPlaceholder label={name} src={imageSrc} tone={tone} />
      <div className="absolute inset-x-3 bottom-3 rounded-lg bg-white/72 p-3 backdrop-blur-xl">
        <h3 className="text-sm font-bold text-neutral-900">{name}</h3>
        <p className="mt-1 text-xs text-neutral-700">Sarana pendukung belajar</p>
      </div>
    </div>
  );
}

export function NewsCard({
  title,
  category,
  date,
  excerpt,
  imageSrc,
  tone = "light",
}: {
  title: string;
  category: string;
  date: string;
  excerpt: string;
  imageSrc?: string;
  tone?: Tone;
}) {
  return (
    <Card
      variant={tone === "dark" ? "glass-soft" : "default"}
      className={cn(
        "h-full overflow-hidden p-0 hover:-translate-y-1",
        tone === "dark" ? "border-white/10 bg-white/10" : null,
      )}
    >
      <VisualPlaceholder
        label={category}
        src={imageSrc}
        className="rounded-b-none border-0"
        tone={tone}
      />
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">{category}</Badge>
          <span
            className={cn(
              "text-xs font-medium",
              tone === "dark" ? "text-white/56" : "text-neutral-500",
            )}
          >
            {date}
          </span>
        </div>
        <h3
          className={cn(
            "mt-4 text-lg font-bold leading-snug",
            tone === "dark" ? "text-white" : "text-neutral-900",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "mt-3 text-sm leading-6",
            tone === "dark" ? "text-white/68" : "text-neutral-700",
          )}
        >
          {excerpt}
        </p>
      </div>
    </Card>
  );
}

export function ProfileCard({
  name,
  role,
  description,
  featured = false,
  imageSrc,
  tone = "light",
}: {
  name: string;
  role: string;
  description: string;
  featured?: boolean;
  imageSrc?: string;
  tone?: Tone;
}) {
  return (
    <GlassCard
      className={cn(
        "p-5 hover:-translate-y-1",
        featured ? "lg:col-span-2" : null,
        tone === "dark" ? "border-white/10 bg-white/10" : null,
      )}
    >
      <div className="grid gap-5 sm:grid-cols-[140px_1fr] sm:items-center">
        <VisualPlaceholder
          label={name}
          src={imageSrc}
          variant="portrait"
          tone={tone}
          className="max-w-44"
        />
        <div>
          <Badge variant={featured ? "primary" : "glass"}>{role}</Badge>
          <h3
            className={cn(
              "mt-4 text-2xl font-bold",
              tone === "dark" ? "text-white" : "text-neutral-900",
            )}
          >
            {name}
          </h3>
          <p
            className={cn(
              "mt-3 text-sm leading-6",
              tone === "dark" ? "text-white/68" : "text-neutral-700",
            )}
          >
            {description}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
