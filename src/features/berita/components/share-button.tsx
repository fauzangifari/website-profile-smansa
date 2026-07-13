"use client";

import { useState } from "react";
import { Check, Copy, ShareNetwork, WhatsappLogo } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type ShareButtonProps = {
  title: string;
  /** Path relatif, mis. "/posts/slug". URL absolut disusun saat runtime. */
  path: string;
};

export function ShareButton({ title, path }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const getUrl = () =>
    typeof window !== "undefined" ? `${window.location.origin}${path}` : path;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard tidak tersedia — abaikan dengan tenang.
    }
  };

  const handleWhatsapp = () => {
    const text = encodeURIComponent(`${title}\n${getUrl()}`);
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const baseBtn =
    "inline-flex items-center justify-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/30";

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
        <ShareNetwork weight="duotone" className="size-4 text-brand-primary" />
        Bagikan
      </div>
      <div className="flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            baseBtn,
            copied
              ? "border-success/40 bg-success/10 text-success"
              : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50",
          )}
        >
          {copied ? (
            <>
              <Check weight="bold" className="size-4" />
              Tersalin
            </>
          ) : (
            <>
              <Copy weight="duotone" className="size-4" />
              Salin tautan
            </>
          )}
        </button>
        <button
          type="button"
          onClick={handleWhatsapp}
          className={cn(
            baseBtn,
            "border-[#25D366]/30 bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20",
          )}
        >
          <WhatsappLogo weight="fill" className="size-4" />
          WhatsApp
        </button>
      </div>
    </div>
  );
}
