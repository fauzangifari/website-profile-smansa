"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight scroll reveal using IntersectionObserver + CSS classes.
 * Replaces GSAP ScrollTrigger for simple fade-in/slide-up animations.
 *
 * Usage:
 *   const ref = useScrollReveal();
 *   <div ref={ref} className="scroll-reveal">...</div>
 *
 * For staggered children:
 *   const ref = useScrollReveal({ stagger: true });
 *   <div ref={ref} className="scroll-reveal-stagger">
 *     <div className="scroll-reveal" style={{ '--stagger-index': 0 }}>...</div>
 *     <div className="scroll-reveal" style={{ '--stagger-index': 1 }}>...</div>
 *   </div>
 */
export function useScrollReveal(options?: {
  /** If true, reveals children with stagger delay instead of the container */
  stagger?: boolean;
  /** IntersectionObserver threshold (default: 0.1) */
  threshold?: number;
  /** IntersectionObserver rootMargin (default: "0px 0px -10% 0px") */
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { stagger = false, threshold = 0.1, rootMargin = "0px 0px -10% 0px" } = options ?? {};

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      // Immediately reveal everything
      if (stagger) {
        Array.from(el.children).forEach((child) => child.classList.add("revealed"));
      } else {
        el.classList.add("revealed");
      }
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (stagger) {
            Array.from(el.children).forEach((child) => child.classList.add("revealed"));
          } else {
            el.classList.add("revealed");
          }
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return ref;
}
