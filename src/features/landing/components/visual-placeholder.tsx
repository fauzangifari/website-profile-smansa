import Image from "next/image";
import { cn } from "@/lib/utils";

type VisualPlaceholderProps = {
  label: string;
  src?: string;
  className?: string;
  variant?: "hero" | "portrait" | "wide";
  tone?: "light" | "dark";
  showCaption?: boolean;
};

export function VisualPlaceholder({
  label,
  src,
  className,
  variant = "wide",
  tone = "light",
  showCaption = true,
}: VisualPlaceholderProps) {
  return (
    <div
      className={cn(
        "group/visual relative flex overflow-hidden rounded-lg border shadow-md",
        tone === "dark"
          ? "border-white/10 bg-white/10"
          : "border-white/50 bg-white/50",
        variant === "hero" ? "aspect-[4/3]" : null,
        variant === "portrait" ? "aspect-[4/5]" : null,
        variant === "wide" ? "aspect-[4/3]" : null,
        className,
      )}
      role="img"
      aria-label={label}
    >
      {src ? (
        <Image
          src={src}
          alt={label}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition duration-500 ease-out group-hover/visual:scale-[1.04]"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.22),transparent_34%),linear-gradient(135deg,rgba(15,118,110,0.18),rgba(255,255,255,0.72)_45%,rgba(245,158,11,0.18))]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/45 via-transparent to-white/10" />
    </div>
  );
}
