"use client"

import { useState, useEffect } from "react"
import { useI18n } from "@/lib/i18n-context"
import { TimeDisplay } from "./time-display"
import { BatteryIndicator } from "./battery-indicator"
import { LocationLabel } from "./location-label"
import { ConnectivityIndicator } from "./connectivity-indicator"
import { LensVignette } from "./lens-vignette"
import { AIAssistantMode } from "./modes/ai-assistant-mode"
import { TranslationMode } from "./modes/translation-mode"
import { NavigationMode } from "./modes/navigation-mode"
import { CaptureMode } from "./modes/capture-mode"
import { DangerAlertMode } from "./modes/danger-alert-mode"
import { MusicMode } from "./modes/music-mode"

export type HudMode = "home" | "ai" | "translate" | "navigate" | "capture" | "danger" | "music"

const HUD_MODES: HudMode[] = ["home", "ai", "translate", "navigate", "capture", "danger", "music"]

interface HudOverlayProps {
  nightMode?: boolean
  initialMode?: HudMode
  batteryLevel?: number
}

export function HudOverlay({ nightMode = false, initialMode = "home", batteryLevel = 84 }: HudOverlayProps) {
  const { t } = useI18n()
  const [mode, setMode] = useState<HudMode>(initialMode)

  return (
    <main className="animate-hud-fade-in fixed inset-0 select-none opacity-0">
      <LensVignette scanlines={nightMode} />
      {nightMode && (
        <>
          {/* Night vision green tint */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[55]"
            style={{ background: "rgba(0, 40, 0, 0.18)", mixBlendMode: "screen" }}
          />
          {/* Subtle noise grain for NV realism */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[56] opacity-[0.06]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
            }}
          />
          {/* NV border glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[57]"
            style={{
              boxShadow: "inset 0 0 80px rgba(0, 180, 60, 0.06), inset 0 0 200px rgba(0, 100, 30, 0.04)",
            }}
          />
        </>
      )}

      {/* Danger mode gets its own full-screen treatment */}
      {mode === "danger" && <DangerAlertMode />}
      {mode === "capture" && <CaptureMode />}

      <div className="relative z-[60] flex h-full flex-col justify-between p-6 md:p-10 lg:p-12">
        {/* Top bar */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <TimeDisplay />
            <LocationLabel />
            {nightMode && (
              <span className="animate-breathing mt-1 self-start rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[9px] font-light tracking-[0.2em] text-emerald-400/70 uppercase">
                {t("hud.nvActive")}
              </span>
            )}
          </div>
          <div className="flex flex-col items-end gap-1">
            <BatteryIndicator level={batteryLevel} />
            <ConnectivityIndicator />
          </div>
        </div>

        {/* Center content area - mode dependent */}
        <div className="flex flex-1 items-center justify-center">
          {mode === "home" && <HomeMode />}
          {mode === "ai" && <AIAssistantMode />}
          {mode === "translate" && <TranslationMode />}
          {mode === "navigate" && <NavigationMode />}
          {mode === "music" && <MusicMode />}
        </div>

        {/* Bottom bar - mode selector */}
        <div className="flex flex-col items-center gap-3">
          <nav
            className="flex items-center gap-0.5 rounded-full border border-foreground/[0.06] bg-foreground/[0.03] p-1 backdrop-blur-md"
            aria-label="HUD mode selector"
          >
            {HUD_MODES.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`rounded-full px-3 py-1.5 text-[10px] font-light tracking-widest transition-all duration-300 ${
                  mode === m
                    ? "bg-foreground/10 text-foreground/70"
                    : "text-foreground/30 hover:text-foreground/50"
                }`}
              >
                {t(`hud.${m}`)}
              </button>
            ))}
          </nav>
          <span className="text-[8px] font-extralight tracking-[0.3em] text-foreground/15 uppercase">
            Machaview
          </span>
        </div>
      </div>
    </main>
  )
}

function HomeMode() {
  const { t } = useI18n()
  const statuses = [
    t("hud.statusListening"),
    t("hud.statusReady"),
    t("hud.statusCommand"),
    t("hud.statusStandby"),
    t("hud.statusAiActive"),
  ]
  const [statusIdx, setStatusIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIdx((i) => (i + 1) % statuses.length)
    }, 3000)
    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="animate-subtitle-fade flex flex-col items-center gap-3">
      <div className="rounded-xl border border-foreground/[0.06] bg-foreground/[0.04] px-6 py-2.5 backdrop-blur-sm md:px-8 md:py-3">
        <span className="animate-breathing text-[13px] font-extralight tracking-wider text-foreground/60 md:text-sm">
          {statuses[statusIdx]}
        </span>
      </div>
      <p className="max-w-xs text-center text-[10px] font-extralight leading-relaxed tracking-wider text-foreground/20">
        {t("hud.statusInstruction")}
      </p>
    </div>
  )
}
