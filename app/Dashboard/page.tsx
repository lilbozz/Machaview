"use client"

import { useState, useEffect } from "react"
import { useWalkingDistance } from "@/hooks/use-walking-distance"
import { DistanceCard } from "@/components/app/distance-card"

export default function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const { currentPosition, error } = useWalkingDistance()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="flex min-h-screen items-center justify-center bg-background" />
  }

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl glass-premium">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-foreground/50">
            <circle cx="12" cy="12" r="3" fill="currentColor" />
            <path d="M12 2v4m0 12v4m10-10h-4M6 12H2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex flex-col gap-0.5">
          <h1 className="text-xl font-extralight tracking-wider text-foreground/90">Machaview Live GPS</h1>
          <span className="text-[10px] font-light tracking-widest text-foreground/30 uppercase">Dashboard</span>
        </div>
      </div>

      {/* Distance Card */}
      <div className="mb-6">
        <DistanceCard />
      </div>

      {/* GPS Details */}
      <div className="rounded-3xl glass-premium p-5">
        <h3 className="mb-4 text-[11px] font-light tracking-widest text-muted-foreground uppercase">
          GPS Coordinates
        </h3>

        {error && (
          <div className="rounded-xl bg-destructive/5 border border-destructive/10 p-3">
            <p className="text-xs font-light text-destructive/70">{error}</p>
          </div>
        )}

        {!currentPosition && !error && (
          <div className="flex items-center gap-2 py-2">
            <div className="h-2 w-2 animate-breathing rounded-full bg-foreground/30" />
            <p className="text-sm font-light text-foreground/40">Acquiring position...</p>
          </div>
        )}

        {currentPosition && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-2xl bg-muted/30 p-3.5">
              <span className="text-xs font-light tracking-wider text-foreground/40">Latitude</span>
              <span className="text-sm font-light tabular-nums text-foreground/70">
                {currentPosition.lat.toFixed(6)}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-muted/30 p-3.5">
              <span className="text-xs font-light tracking-wider text-foreground/40">Longitude</span>
              <span className="text-sm font-light tabular-nums text-foreground/70">
                {currentPosition.lng.toFixed(6)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="mt-8 text-center text-[10px] font-extralight tracking-widest text-foreground/15">
        Machaview by Paggy Industries
      </p>
    </div>
  )
}
