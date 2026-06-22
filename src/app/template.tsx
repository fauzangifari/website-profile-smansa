"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Next.js Template component for page transitions.
 * Optimized Curtain Reveal — content renders immediately,
 * curtain is a non-blocking overlay that slides away.
 */
export default function Template({ children }: { children: ReactNode }) {
  const [curtainDone, setCurtainDone] = useState(false);

  useEffect(() => {
    // Remove curtain after animation completes
    const timer = setTimeout(() => setCurtainDone(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Curtain overlay — non-blocking, content is behind it */}
      {!curtainDone && (
        <div
          className="curtain-overlay fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
          aria-hidden="true"
        >
          <div className="curtain-content flex flex-col items-center gap-4">
            <Image
              src="/images/brand/logo.png"
              alt="Logo SMANSA"
              width={72}
              height={72}
              priority
              className="opacity-90"
            />
            <div className="h-1 w-12 overflow-hidden rounded-full bg-neutral-100">
              <div className="curtain-progress h-full w-full bg-brand-primary" />
            </div>
          </div>
        </div>
      )}

      {/* Content renders immediately — no opacity:0, no delay */}
      <div className="flex flex-1 flex-col">{children}</div>
    </>
  );
}
