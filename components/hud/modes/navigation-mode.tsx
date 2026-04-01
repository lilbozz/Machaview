"use client"

import { useState, useEffect } from "react"
import { useI18n } from "@/lib/i18n-context"

const STREETS = ["Sukhumvit Road", "Silom Avenue", "Ratchadamri Blvd", "Phahon Yothin Rd", "Asok Intersection"]

export function NavigationMode() {
  const { t } = useI18n()
  const [nav, setNav] = useState({ distance: 240, streetIdx: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      setNav((prev) => {
        if (prev.distance <= 10) {
          return { distance: 240, streetIdx: (prev.streetIdx + 1) % STREETS.length }
        }
        return { ...prev, distance: prev.distance - 3 }
      })
    }, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Direction arrow */}
      <div className="animate-nav-bounce">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          className="text-foreground/50"
          aria-label="Turn right ahead"
        >
          <path
            d="M12 19V5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M5 12l7-7 7 7"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Distance */}
      <div className="text-center">
        <span className="text-2xl font-extralight tracking-wider text-foreground/60">
          {nav.distance}
        </span>
        <span className="ml-1 text-xs font-extralight tracking-wider text-foreground/35">
          m
        </span>
      </div>

      {/* Street name */}
      <div className="animate-slide-up rounded-xl border border-foreground/[0.06] bg-foreground/[0.03] px-5 py-2.5 backdrop-blur-sm">
        <p className="text-[11px] font-light tracking-wider text-foreground/50">
          {STREETS[nav.streetIdx]}
        </p>
      </div>

      {/* ETA */}
      <div className="flex items-center gap-3 text-[10px] font-extralight tracking-widest text-foreground/30">
        <span>{t("hud.eta")} 12 {t("hud.min")}</span>
        <span className="h-0.5 w-0.5 rounded-full bg-foreground/20" />
        <span>2.4 km</span>
      </div>
    </div>
  )
}
