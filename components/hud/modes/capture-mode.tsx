"use client"

import { useState, useEffect } from "react"

export function CaptureMode() {
  const [seconds, setSeconds] = useState(0)
  const [isRecording, setIsRecording] = useState(true)

  useEffect(() => {
    if (!isRecording) return
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [isRecording])

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60).toString().padStart(2, "0")
    const secs = (s % 60).toString().padStart(2, "0")
    return `${mins}:${secs}`
  }

  return (
    <div className="relative h-full w-full">
      {/* Subtle framing grid */}
      <div className="absolute inset-12 md:inset-20 pointer-events-none">
        {/* Rule of thirds - vertical */}
        <div className="absolute left-1/3 top-0 h-full w-px bg-foreground/[0.04]" />
        <div className="absolute left-2/3 top-0 h-full w-px bg-foreground/[0.04]" />
        {/* Rule of thirds - horizontal */}
        <div className="absolute left-0 top-1/3 w-full h-px bg-foreground/[0.04]" />
        <div className="absolute left-0 top-2/3 w-full h-px bg-foreground/[0.04]" />
        {/* Corner brackets */}
        <div className="absolute left-0 top-0 h-4 w-4 border-l border-t border-foreground/[0.12]" />
        <div className="absolute right-0 top-0 h-4 w-4 border-r border-t border-foreground/[0.12]" />
        <div className="absolute left-0 bottom-0 h-4 w-4 border-l border-b border-foreground/[0.12]" />
        <div className="absolute right-0 bottom-0 h-4 w-4 border-r border-b border-foreground/[0.12]" />
      </div>

      {/* Recording indicator - top center */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 md:top-10">
        <div className="h-1.5 w-1.5 animate-rec-blink rounded-full bg-red-500/80" />
        <span className="text-[11px] font-light tracking-widest text-foreground/50 uppercase">
          Rec
        </span>
        <span className="text-[11px] font-extralight tracking-wider text-foreground/40">
          {formatTime(seconds)}
        </span>
      </div>

      {/* Toggle */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 md:bottom-10">
        <button
          type="button"
          onClick={() => setIsRecording(!isRecording)}
          className="flex items-center gap-2 rounded-full border border-foreground/[0.08] bg-foreground/[0.04] px-5 py-2 backdrop-blur-sm"
        >
          <div className={`h-2 w-2 rounded-sm ${isRecording ? 'bg-red-500/60' : 'bg-foreground/40'}`} />
          <span className="text-[10px] font-light tracking-widest text-foreground/50 uppercase">
            {isRecording ? "Stop" : "Start"}
          </span>
        </button>
      </div>
    </div>
  )
}
