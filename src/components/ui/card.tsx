import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "glass" | "glass-soft" | "glass-strong";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
};

const variantClasses: Record<CardVariant, string> = {
  default: "border border-neutral-200 bg-white shadow-sm",
  glass: "glass",
  "glass-soft": "glass-soft",
  "glass-strong": "glass-strong",
};

export function Card({
  className,
  variant = "default",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-5 transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function GlassCard(props: Omit<CardProps, "variant">) {
  return <Card variant="glass" {...props} />;
}
