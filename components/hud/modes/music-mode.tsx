"use client"

import { useState, useEffect } from "react"

export function MusicMode() {
  const [progress, setProgress] = useState(34)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5))
    }, 500)
    return () => clearInterval(interval)
  }, [isPlaying])

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Bone conduction indicator */}
      <div className="flex items-center gap-1.5">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-foreground/30" aria-hidden="true">
          <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        <span className="text-[9px] font-light tracking-widest text-foreground/25 uppercase">
          Bone conduction
        </span>
      </div>

      {/* Track info */}
      <div className="animate-slide-up rounded-2xl border border-foreground/[0.06] bg-foreground/[0.04] px-6 py-4 backdrop-blur-sm">
        <div className="text-center">
          <p className="text-[13px] font-light tracking-wide text-foreground/65">
            Midnight City
          </p>
          <p className="mt-0.5 text-[11px] font-extralight tracking-wider text-foreground/35">
            M83
          </p>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-px w-48 bg-foreground/[0.08]">
          <div
            className="h-full bg-foreground/30 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controls */}
        <div className="mt-3 flex items-center justify-center gap-6">
          <button type="button" aria-label="Previous track">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-foreground/35">
              <path d="M19 20L9 12l10-8v16z" fill="currentColor" />
              <path d="M5 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-foreground/50">
                <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" />
                <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-foreground/50">
                <path d="M5 3l14 9-14 9V3z" fill="currentColor" />
              </svg>
            )}
          </button>
          <button type="button" aria-label="Next track">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-foreground/35">
              <path d="M5 4l10 8-10 8V4z" fill="currentColor" />
              <path d="M19 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
