import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn, safeHref } from "@/lib/utils";
import type { ChatRole } from "@/features/chatbot/types/chat";

/** Avatar foto RANGSA untuk balasan asisten — identitas visual chatbot. */
export function BotAvatar({ className }: { className?: string }) {
  return (
    <span className={cn("relative block h-16 w-14 shrink-0", className)} aria-hidden="true">
      <Image
        src="/images/maskot/sarungsmd-2.png"
        alt="RANGSA"
        fill
        sizes="64px"
        className="object-contain object-bottom drop-shadow-sm"
      />
    </span>
  );
}

// Pola: markdown link [teks](url) | URL telanjang | path internal (/xxx) | **tebal**
const INLINE_PATTERN =
  /\[([^\]]+)\]\(([^)]+)\)|(\bhttps?:\/\/[^\s)]+)|(?<=^|\s)(\/[a-z0-9\-]+(?:\/[a-z0-9\-]+)*)|\*\*([^*]+)\*\*/g;

function linkNode(href: string, label: string, key: number): ReactNode {
  // Output LLM bisa berisi URL sembarang (mis. `[x](javascript:...)`); saring
  // skema berbahaya. Bila tidak aman, tampilkan sebagai teks biasa, bukan link.
  const safe = safeHref(href);
  const className = "font-medium text-brand-primary underline underline-offset-2 hover:text-brand-primary-hover break-words";
  if (!safe) {
    return <span key={key}>{label}</span>;
  }
  if (safe.startsWith("/")) {
    return (
      <Link key={key} href={safe} className={className}>
        {label}
      </Link>
    );
  }
  return (
    <a key={key} href={safe} target="_blank" rel="noopener noreferrer" className={className}>
      {label}
    </a>
  );
}

/** Ubah satu baris teks menjadi node dengan tautan & penekanan. */
function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  INLINE_PATTERN.lastIndex = 0;
  while ((match = INLINE_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const [, mdLabel, mdUrl, bareUrl, internalPath, bold] = match;
    if (mdUrl) {
      nodes.push(linkNode(mdUrl, mdLabel ?? mdUrl, key++));
    } else if (bareUrl) {
      nodes.push(linkNode(bareUrl, bareUrl, key++));
    } else if (internalPath) {
      nodes.push(linkNode(internalPath, internalPath, key++));
    } else if (bold) {
      nodes.push(<strong key={key++} className="font-semibold">{bold}</strong>);
    }
    lastIndex = INLINE_PATTERN.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

/** Render blok sederhana: paragraf + daftar bullet. */
function renderBlocks(content: string): ReactNode {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  let bullets: string[] = [];
  let key = 0;

  const flush = () => {
    if (bullets.length) {
      const items = bullets;
      blocks.push(
        <ul key={key++} className="list-disc space-y-1 pl-5">
          {items.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>,
      );
      bullets = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    const bullet = /^[-*•]\s+(.*)/.exec(trimmed);
    if (bullet) {
      bullets.push(bullet[1] ?? "");
      continue;
    }
    flush();
    if (trimmed) {
      blocks.push(
        <p key={key++} className="whitespace-pre-wrap break-words">
          {renderInline(trimmed)}
        </p>,
      );
    }
  }
  flush();
  return blocks;
}

interface ChatMessageProps {
  role: ChatRole;
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";
  return (
    <div className={cn("flex w-full items-end gap-2", isUser ? "justify-end" : "justify-start")}>
      {!isUser ? <BotAvatar /> : null}
      <div
        className={cn(
          "max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-br-md bg-gradient-to-br from-brand-primary to-primary-600 text-white shadow-md shadow-brand-primary/25"
            : "rounded-bl-md border border-neutral-200/70 bg-white text-neutral-800 shadow-sm",
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap break-words">{content}</p>
        ) : (
          <div className="space-y-2">{renderBlocks(content)}</div>
        )}
      </div>
    </div>
  );
}
