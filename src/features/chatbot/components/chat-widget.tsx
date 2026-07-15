"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Icon } from "@phosphor-icons/react";
import {
  BookOpen,
  Buildings,
  CalendarBlank,
  ClipboardText,
  Clock,
  MapPin,
  PaperPlaneRight,
  Sparkle,
  X,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { BotAvatar, ChatMessage } from "@/features/chatbot/components/chat-message";
import { ChatbotMark } from "@/features/chatbot/components/chatbot-mark";
import { suggestedQuestions } from "@/features/chatbot/data/suggested-questions";
import type { ChatMessage as ChatMessageType } from "@/features/chatbot/types/chat";
import { cn } from "@/lib/utils";

// Ikon per pertanyaan cepat (kata kunci → ikon), agar chip lebih hidup.
function questionIcon(question: string): Icon {
  const q = question.toLowerCase();
  if (q.includes("berdiri") || q.includes("sejarah")) return Buildings;
  if (q.includes("jam") || q.includes("masuk")) return Clock;
  if (q.includes("ekstrakurikuler") || q.includes("ekskul")) return BookOpen;
  if (q.includes("daftar") || q.includes("spmb")) return ClipboardText;
  if (q.includes("alamat") || q.includes("kontak")) return MapPin;
  if (q.includes("kalender") || q.includes("jadwal")) return CalendarBlank;
  return Sparkle;
}

export function ChatWidget() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Tutup dengan Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Auto-scroll ke bawah saat ada pesan/aliran baru.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  // Fokus input saat dibuka.
  useEffect(() => {
    if (open) {
      const id = window.requestAnimationFrame(() => textareaRef.current?.focus());
      return () => window.cancelAnimationFrame(id);
    }
  }, [open]);

  // Batalkan stream saat komponen dilepas.
  useEffect(() => () => abortRef.current?.abort(), []);

  const sendMessage = useCallback(
    async (raw: string) => {
      const content = raw.trim();
      if (!content || isStreaming) return;

      setError(null);
      setInput("");
      if (textareaRef.current) textareaRef.current.style.height = "auto";

      const history: ChatMessageType[] = [...messages, { role: "user", content }];
      // Tambah gelembung asisten kosong sebagai placeholder aliran.
      setMessages([...history, { role: "assistant", content: "" }]);
      setIsStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          let message = "Maaf, terjadi kendala. Coba lagi sebentar lagi ya.";
          try {
            const data = await res.json();
            if (data?.error) message = data.error;
          } catch {
            /* biarkan pesan default */
          }
          setMessages((prev) => prev.slice(0, -1)); // buang placeholder kosong
          setError(message);
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = { role: "assistant", content: acc };
            return next;
          });
        }
        acc += decoder.decode();

        if (!acc.trim()) {
          setMessages((prev) => prev.slice(0, -1));
          setError("Maaf, aku belum bisa menjawab itu. Coba tanyakan hal lain seputar SMANSA ya.");
        } else {
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = { role: "assistant", content: acc };
            return next;
          });
        }
      } catch (err) {
        if ((err as Error)?.name !== "AbortError") {
          setMessages((prev) =>
            prev.length && prev[prev.length - 1]!.content === "" ? prev.slice(0, -1) : prev,
          );
          setError("Maaf, koneksi bermasalah. Coba lagi ya.");
        }
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, isStreaming],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage(input);
    }
  };

  const autoGrow = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  const panelTransition = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 360, damping: 30 };

  return (
    <>
      {/* FAB */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="chat-fab"
            type="button"
            onClick={() => setOpen(true)}
            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.6 }}
            transition={panelTransition}
            className={cn(
              "group fixed bottom-6 right-6 z-[200] flex items-center justify-center",
              "size-12 rounded-full",
              "shadow-xl shadow-brand-primary/40",
              "transition-transform hover:scale-110 active:scale-95",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
            )}
            aria-label="Buka Asisten SMANSA"
          >
            <ChatbotMark className="size-full transition-transform group-hover:rotate-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={reduceMotion ? undefined : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 24, scale: 0.98 }}
            transition={panelTransition}
            className={cn(
              "fixed z-[201] flex flex-col overflow-hidden bg-white shadow-xl shadow-neutral-900/25",
              "inset-x-3 bottom-3 top-16 rounded-3xl border border-neutral-200/80",
              "sm:inset-auto sm:bottom-6 sm:right-6 sm:top-auto sm:h-[600px] sm:max-h-[calc(100dvh-3rem)] sm:w-[400px]",
            )}
            role="dialog"
            aria-label="Asisten SMANSA"
            // Cegah Lenis (smooth-scroll global) membajak wheel di atas panel,
            // agar scroll native pada daftar pesan berfungsi normal.
            data-lenis-prevent
          >
            {/* Header */}
            <header className="relative flex items-center gap-3 overflow-hidden bg-gradient-to-r from-brand-primary to-primary-600 px-4 py-3.5 text-white">
              {/* Kilau halus di latar header */}
              <span
                className="pointer-events-none absolute -right-8 -top-10 size-32 rounded-full bg-white/10 blur-2xl"
                aria-hidden="true"
              />
              <span className="block size-10 shrink-0 overflow-hidden rounded-full ring-1 ring-white/40">
                <ChatbotMark className="size-full" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-tight">Asisten SMANSA</p>
                <span className="mt-0.5 flex items-center gap-1.5 text-xs text-white/80">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full rounded-full bg-success/70 motion-safe:animate-ping" />
                    <span className="relative inline-flex size-2 rounded-full bg-success" />
                  </span>
                  Online • siap membantu
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-8 shrink-0 place-items-center rounded-full text-white/85 transition hover:bg-white/20 hover:text-white"
                aria-label="Tutup"
              >
                <X size={18} weight="bold" />
              </button>
            </header>

            {/* Pesan */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3.5 overflow-y-auto overscroll-contain bg-gradient-to-b from-neutral-50 to-white px-4 py-4"
              role="log"
              aria-live="polite"
              aria-label="Percakapan"
            >
              {messages.length === 0 ? (
                <EmptyState onPick={(q) => void sendMessage(q)} disabled={isStreaming} />
              ) : (
                messages.map((message, i) =>
                  message.role === "assistant" && message.content === "" ? (
                    <TypingBubble key={i} />
                  ) : (
                    <ChatMessage key={i} role={message.role} content={message.content} />
                  ),
                )
              )}

              {error ? (
                <p className="rounded-xl border border-danger/15 bg-danger/10 px-3.5 py-2.5 text-sm text-danger">
                  {error}
                </p>
              ) : null}
            </div>

            {/* Komposer */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-neutral-200/80 bg-white/90 px-3 py-3 backdrop-blur"
            >
              <div
                className={cn(
                  "flex items-end gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-1.5 transition",
                  "focus-within:border-brand-primary focus-within:bg-white focus-within:ring-4 focus-within:ring-brand-primary/15",
                )}
              >
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={autoGrow}
                  onKeyDown={handleTextareaKeyDown}
                  rows={1}
                  placeholder="Tulis pertanyaanmu…"
                  disabled={isStreaming}
                  className={cn(
                    "max-h-[120px] min-h-[40px] flex-1 resize-none border-none bg-transparent px-2.5 py-2 text-sm text-neutral-900",
                    "placeholder:text-neutral-400 focus:outline-none focus:ring-0",
                    "disabled:cursor-not-allowed disabled:opacity-60",
                  )}
                  aria-label="Tulis pertanyaan"
                />
                <button
                  type="submit"
                  disabled={isStreaming || !input.trim()}
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-xl text-white transition",
                    "bg-gradient-to-br from-brand-primary to-primary-600 shadow-md shadow-brand-primary/30",
                    "hover:shadow-lg hover:shadow-brand-primary/40 active:scale-95",
                    "disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
                  )}
                  aria-label="Kirim"
                >
                  <PaperPlaneRight size={18} weight="fill" />
                </button>
              </div>
              <p className="mt-2 px-1 text-[11px] leading-tight text-neutral-400">
                Jawaban dibuat AI dan bisa keliru. Untuk hal penting, konfirmasi ke sekolah.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function EmptyState({
  onPick,
  disabled,
}: {
  onPick: (question: string) => void;
  disabled: boolean;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <div className="flex min-h-full flex-col justify-end gap-4">
      {/* Sapaan bergaya balasan bot */}
      <div className="flex items-end gap-2">
        <BotAvatar />
        <div className="max-w-[82%] rounded-2xl rounded-bl-md border border-neutral-200/70 bg-white px-3.5 py-3 text-sm leading-relaxed text-neutral-700 shadow-sm">
          Halo! 👋 Aku <strong className="font-semibold text-neutral-900">Asisten SMANSA</strong>.
          Aku bisa bantu jawab soal profil, sejarah, ekstrakurikuler, tata tertib, kalender, kontak,
          dan info lain seputar SMA Negeri 1 Samarinda. Mau tanya apa?
        </div>
      </div>

      <div className="pl-9">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-neutral-400">
          Pertanyaan populer
        </p>
        <div className="flex flex-col gap-2">
          {suggestedQuestions.map((question, i) => {
            const Ic = questionIcon(question);
            return (
              <motion.button
                key={question}
                type="button"
                onClick={() => onPick(question)}
                disabled={disabled}
                initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduceMotion ? { duration: 0 } : { delay: 0.05 * i, duration: 0.3 }}
                className={cn(
                  "group flex items-center gap-2.5 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-left text-xs font-medium text-neutral-700 shadow-sm transition",
                  "hover:-translate-y-0.5 hover:border-brand-primary/40 hover:text-brand-primary hover:shadow-md",
                  "disabled:pointer-events-none disabled:opacity-50",
                )}
              >
                <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-brand-primary-soft/50 text-brand-primary transition group-hover:bg-brand-primary group-hover:text-white">
                  <Ic size={14} weight="bold" />
                </span>
                {question}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex items-end gap-2">
      <BotAvatar />
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-neutral-200/70 bg-white px-4 py-3 shadow-sm">
        <Dot delay="0ms" />
        <Dot delay="150ms" />
        <Dot delay="300ms" />
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="size-2 animate-bounce rounded-full bg-brand-primary/60"
      style={{ animationDelay: delay }}
    />
  );
}
