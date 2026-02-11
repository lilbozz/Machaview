"use client"

import { useState, useEffect, useRef } from "react"
import { useWalkingDistance } from "@/hooks/use-walking-distance"

export function DistanceCard() {
  const [mounted, setMounted] = useState(false)
  const { displayDistance, isTracking, error, currentPosition, resetDistance } =
    useWalkingDistance()
  const [showPulse, setShowPulse] = useState(false)
  const prevDistRef = useRef(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Trigger pulse when distance increases
  useEffect(() => {
    if (displayDistance > prevDistRef.current + 0.001) {
      setShowPulse(true)
      const timer = setTimeout(() => setShowPulse(false), 600)
      prevDistRef.current = displayDistance
      return () => clearTimeout(timer)
    }
  }, [displayDistance])

  if (!mounted) return null

  const formattedDistance = displayDistance.toFixed(2)
  const [whole, decimal] = formattedDistance.split(".")

  return (
    <div className="relative overflow-hidden rounded-3xl glass-glow p-5">
      {/* Shimmer overlay */}
      <div className="pointer-events-none absolute inset-0 shimmer-bg animate-shimmer opacity-60" />

      {/* Glow ring behind distance */}
      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-700 ${
          isTracking ? "animate-glow-ring opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(circle, hsl(160 60% 45% / 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="text-emerald-400"
              >
                <path
                  d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="10"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-light tracking-widest text-foreground/50 uppercase">
                Walking Distance
              </span>
              <div className="flex items-center gap-1.5">
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                    isTracking ? "bg-emerald-400 shadow-sm shadow-emerald-400/50" : "bg-foreground/20"
                  }`}
                />
                <span className="text-[10px] font-light text-foreground/30">
                  {isTracking ? "Live tracking" : error || "Waiting..."}
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={resetDistance}
            className="rounded-xl border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-[10px] font-light tracking-wider text-foreground/40 transition-all hover:border-foreground/20 hover:text-foreground/60 active:scale-[0.95]"
            aria-label="Reset distance"
          >
            Reset
          </button>
        </div>

        {/* Distance display */}
        <div className="mt-5 flex items-baseline justify-center gap-1">
          <span
            className={`text-5xl font-extralight tracking-tight text-foreground/90 tabular-nums transition-transform duration-300 ${
              showPulse ? "animate-counter-tick" : ""
            }`}
          >
            {whole}
          </span>
          <span className="text-3xl font-extralight text-foreground/40 tabular-nums">
            .{decimal}
          </span>
          <span className="ml-1 text-sm font-light tracking-wider text-foreground/30">
            km
          </span>
        </div>

        {/* Coordinates */}
        {currentPosition && (
          <div className="mt-4 flex items-center justify-center gap-4">
            <span className="text-[10px] font-light tabular-nums text-foreground/20">
              {currentPosition.lat.toFixed(5)}
            </span>
            <span className="h-3 w-px bg-foreground/10" />
            <span className="text-[10px] font-light tabular-nums text-foreground/20">
              {currentPosition.lng.toFixed(5)}
            </span>
          </div>
        )}

        {/* Progress bar visual */}
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-muted/50">
          <div
            className="h-full rounded-full bg-emerald-500/30 transition-all duration-1000"
            style={{
              width: `${Math.min((displayDistance / 10) * 100, 100)}%`,
            }}
          />
        </div>
        <div className="mt-1.5 flex items-center justify-between">
          <span className="text-[9px] font-light text-foreground/15">0 km</span>
          <span className="text-[9px] font-light text-foreground/15">
            10 km goal
          </span>
        </div>
      </div>
    </div>
  )
}
