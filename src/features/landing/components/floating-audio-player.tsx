"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, SpeakerHigh, SpeakerSlash, MusicNotes } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export function FloatingAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Show player after a short delay for a smoother entrance
    const timer = setTimeout(() => setShowPlayer(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const audioSrc = "/audio/Mars SMA Negeri 1 Samarinda.mp3";

  return (
    <>
      <audio
        ref={audioRef}
        src={encodeURI(audioSrc)}
        loop
        preload="none"
      />
      
      <div
        className={cn(
          "fixed bottom-6 left-6 z-50 pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          showPlayer
            ? "opacity-100 translate-x-0 blur-none"
            : "opacity-0 -translate-x-10 blur-sm pointer-events-none"
        )}
      >
        <div className={cn(
          "glass flex items-center gap-3 p-2 pr-4 rounded-full min-w-[180px]",
          "transition-all duration-500 hover:bg-white/80"
        )}>
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className={cn(
              "flex items-center justify-center size-10 rounded-full",
              "bg-brand-primary text-white shadow-md transition-all duration-300",
              "hover:scale-105 active:scale-95",
              isPlaying ? "animate-pulse" : ""
            )}
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <Pause weight="fill" size={18} />
            ) : (
              <Play weight="fill" size={18} className="ml-0.5" />
            )}
          </button>

          {/* Info & Animation */}
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-[0.1em] font-bold text-neutral-500 leading-none">
                {isPlaying ? "Now Playing" : "Paused"}
              </span>
              {isPlaying && (
                <MusicNotes weight="fill" size={10} className="text-brand-primary animate-pulse" />
              )}
            </div>
            <span className="text-xs font-bold text-neutral-800 truncate leading-normal">
              Mars SMANSA
            </span>
          </div>

          {/* Mute Toggle */}
          <button
            onClick={toggleMute}
            className="text-neutral-400 hover:text-brand-primary transition-colors ml-1 p-1"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <SpeakerSlash weight="bold" size={18} />
            ) : (
              <SpeakerHigh weight="bold" size={18} />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
