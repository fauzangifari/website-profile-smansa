"use client";

import { useEffect, useRef } from "react";

interface SmoothScrollProps {
  children: React.ReactNode;
}

type LenisInstance = {
  resize: () => void;
  on: (event: "scroll", callback: () => void) => void;
  raf: (time: number) => void;
  scrollTo: (
    target: HTMLElement,
    options?: {
      offset?: number;
      duration?: number;
      easing?: (value: number) => number;
    },
  ) => void;
  destroy: () => void;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<LenisInstance | null>(null);

  useEffect(() => {
    let cleanupEnhancement: (() => void) | undefined;
    let cancelled = false;
    let idleCallbackId: number | undefined;
    let idleTimeoutId: ReturnType<typeof setTimeout> | undefined;

    const nativeScrollTo = (target: HTMLElement) => {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    };

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          const lenis = lenisRef.current;
          if (lenis) {
            lenis.scrollTo(targetElement as HTMLElement, {
              offset: -80,
              duration: 1.5,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          } else {
            nativeScrollTo(targetElement as HTMLElement);
          }
        }
      }
    };

    const handleScrollToTop = () => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(document.body, {
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    document.addEventListener("click", handleAnchorClick);
    window.addEventListener("backToTop", handleScrollToTop);

    const initializeSmoothScroll = async () => {
      const [{ default: Lenis }, gsapModule, scrollTriggerModule] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      if (cancelled) return;

      const gsap = gsapModule.default;
      const { ScrollTrigger } = scrollTriggerModule;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      lenisRef.current = lenis;

      const resizeObserver = new ResizeObserver(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      });
      resizeObserver.observe(document.body);

      lenis.on("scroll", ScrollTrigger.update);

      function update(time: number) {
        lenis.raf(time * 1000);
      }

      gsap.ticker.add(update);

      const timeout = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 1000);

      gsap.ticker.lagSmoothing(0);

      if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
          window.setTimeout(() => {
            lenis.scrollTo(target as HTMLElement, { offset: -80 });
          }, 250);
        }
      }

      cleanupEnhancement = () => {
        window.clearTimeout(timeout);
        resizeObserver.disconnect();
        gsap.ticker.remove(update);
        lenis.destroy();
        lenisRef.current = null;
      };
    };

    const scheduleSmoothScroll = () => {
      if ("requestIdleCallback" in window) {
        idleCallbackId = window.requestIdleCallback(() => {
          void initializeSmoothScroll();
        });
        return;
      }

      idleTimeoutId = globalThis.setTimeout(() => {
        void initializeSmoothScroll();
      }, 600);
    };

    if (document.readyState === "complete") {
      scheduleSmoothScroll();
    } else {
      window.addEventListener("load", scheduleSmoothScroll, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", scheduleSmoothScroll);
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("backToTop", handleScrollToTop);
      if (idleCallbackId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (idleTimeoutId !== undefined) {
        globalThis.clearTimeout(idleTimeoutId);
      }
      cleanupEnhancement?.();
    };
  }, []);

  return <>{children}</>;
}
