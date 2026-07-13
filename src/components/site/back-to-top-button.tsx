"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.dispatchEvent(new Event("backToTop"));
  };

  return (
    <div
      className={cn(
        "fixed bottom-24 right-6 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none",
      )}
    >
      <button
        onClick={handleClick}
        className={cn(
          "flex items-center justify-center size-10 rounded-full",
          "bg-brand-primary text-white shadow-md transition-all duration-300",
          "hover:scale-105 active:scale-95",
        )}
        aria-label="Kembali ke atas"
      >
        <ArrowUp weight="bold" size={20} />
      </button>
    </div>
  );
}
