import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  tone = "light",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? (
        <Badge variant={tone === "dark" ? "glass" : "primary"}>{eyebrow}</Badge>
      ) : null}
      <div className="flex w-full flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div
          className={cn(
            "max-w-3xl",
            align === "center" ? "mx-auto" : null,
          )}
        >
          <h2
            className={cn(
              "text-3xl font-bold leading-tight md:text-4xl",
              tone === "dark" ? "text-white" : "text-neutral-900",
            )}
          >
            {title}
          </h2>
          {description ? (
            <p
              className={cn(
                "mt-3 text-base leading-7 md:text-lg",
                tone === "dark" ? "text-white/72" : "text-neutral-700",
              )}
            >
              {description}
            </p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  );
}
