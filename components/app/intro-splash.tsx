"use client"

import { useState, useEffect } from "react"

interface IntroSplashProps {
  onComplete: () => void
}

export function IntroSplash({ onComplete }: IntroSplashProps) {
  const [phase, setPhase] = useState<"fade-in" | "visible" | "fade-out">("fade-in")

  useEffect(() => {
    // Phase 1: Fade in (already happening via CSS)
    const visibleTimer = setTimeout(() => {
      setPhase("visible")
    }, 100)

    // Phase 2: Start fade out after 2s visible
    const fadeOutTimer = setTimeout(() => {
      setPhase("fade-out")
    }, 2000)

    // Phase 3: Complete after fade out animation
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 2500)

    return () => {
      clearTimeout(visibleTimer)
      clearTimeout(fadeOutTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-background">
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, hsl(var(--foreground)) 0%, transparent 70%)",
          }}
        />
      </div>

      <div
        className="relative flex flex-col items-center gap-6 transition-all duration-700 ease-out"
        style={{
          opacity: phase === "fade-out" ? 0 : phase === "fade-in" ? 0 : 1,
          transform:
            phase === "fade-out"
              ? "scale(1.02) translateY(-4px)"
              : phase === "fade-in"
                ? "scale(0.97) translateY(8px)"
                : "scale(1) translateY(0)",
        }}
      >
        {/* Logo mark */}
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl glass-premium">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            className="text-foreground/60"
          >
            <circle cx="12" cy="12" r="3" fill="currentColor" />
            <path
              d="M12 2v4m0 12v4m10-10h-4M6 12H2"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Brand name */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-extralight tracking-[0.3em] text-foreground/90">
            Machaview
          </h1>
          <div className="h-px w-12 bg-foreground/10" />
          <p className="text-[10px] font-extralight tracking-[0.25em] text-foreground/25 uppercase">
            by Paggy Industries
          </p>
        </div>

        {/* Tagline */}
        <p
          className="mt-2 text-xs font-extralight tracking-[0.15em] text-foreground/20 transition-opacity delay-500 duration-1000"
          style={{ opacity: phase === "visible" ? 1 : 0 }}
        >
          See Smarter. Live Seamless.
        </p>
      </div>
    </div>
  )
}
