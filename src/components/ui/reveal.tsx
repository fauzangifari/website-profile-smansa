"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

type RevealProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/**
 * Client wrapper that reveals its content (fade + slide-up) when scrolled into
 * view — a thin bridge so Server Components can use `useScrollReveal` without
 * becoming client components themselves.
 *
 * For staggered lists use the hook directly with `{ stagger: true }`.
 */
export function Reveal({ children, className, style }: RevealProps) {
  const ref = useScrollReveal();

  return (
    <div ref={ref} className={cn("scroll-reveal", className)} style={style}>
      {children}
    </div>
  );
}
