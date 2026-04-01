"use client"

import { useEffect, useState } from "react"
import { useI18n } from "@/lib/i18n-context"

interface HomeTabProps {
  batteryLevel?: number
  onViewHud?: () => void
  onViewNightHud?: () => void
  onAskAI?: () => void
  onCapture?: () => void
  onNavigate?: () => void
  onTranslate?: () => void
}

export function HomeTab({
  batteryLevel = 84,
  onViewHud,
  onViewNightHud,
  onAskAI,
  onCapture,
  onNavigate,
  onTranslate,
}: HomeTabProps) {
  const { t } = useI18n()
  const [time, setTime] = useState("--:--")
  const [greeting, setGreeting] = useState("")
  const [mounted, setMounted] = useState(false)
  const [isConnected] = useState(true)

  useEffect(() => {
    setMounted(true)
    function update() {
      const now = new Date()
      const hours = now.getHours()
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
      if (hours < 12) setGreeting(t("home.morning"))
      else if (hours < 18) setGreeting(t("home.afternoon"))
      else setGreeting(t("home.evening"))
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [t])

  const isLowBattery = batteryLevel <= 20

  const features = [
    { label: t("home.askAI"), desc: t("home.askAIDesc"), icon: AiIcon, onClick: onAskAI, accent: "text-violet-400", bg: "bg-violet-500/10", live: true },
    { label: t("home.capture"), desc: t("home.captureDesc"), icon: CaptureIcon, onClick: onCapture, accent: "text-sky-400", bg: "bg-sky-500/10" },
    { label: t("home.navigate"), desc: t("home.navigateDesc"), icon: NavIcon, onClick: onNavigate, accent: "text-amber-400", bg: "bg-amber-500/10" },
    { label: t("home.translate"), desc: t("home.translateDesc"), icon: TranslateIcon, onClick: onTranslate, accent: "text-emerald-400", bg: "bg-emerald-500/10" },
  ]

  return (
    <div className="flex flex-col gap-5 px-5 pb-8 pt-5">

      {/* ── Greeting + Time ── */}
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] font-light tracking-[0.2em] text-foreground/40 uppercase">
            {t("home.greeting")} {mounted ? greeting : ""}
          </span>
          <span className="tabular text-[40px] font-thin leading-none tracking-tight text-foreground/90">
            {mounted ? time : "--:--"}
          </span>
        </div>
        {/* Battery pill */}
        <div className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${isLowBattery ? "border-red-500/30 bg-red-500/10" : "border-emerald-500/25 bg-emerald-500/8"}`}>
          <div className={`h-1.5 w-1.5 rounded-full ${isLowBattery ? "bg-red-400" : "bg-emerald-400 animate-breathing"}`} />
          <span className={`text-[11px] font-light tabular ${isLowBattery ? "text-red-400" : "text-emerald-400"}`}>
            {batteryLevel}%
          </span>
        </div>
      </div>

      {/* ── Device Hero Card ── */}
      <div className="relative overflow-hidden rounded-3xl glass-premium p-5">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-foreground/[0.02] blur-2xl" />
        </div>

        <div className="relative z-10">
          {/* Device header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Glasses icon */}
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/40 bg-muted/60">
                <GlassesIcon />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-light text-foreground/80">Machaview Pro</span>
                <div className="flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${isConnected ? "bg-emerald-400 animate-breathing" : "bg-foreground/20"}`} />
                  <span className={`text-[10px] font-light tracking-wide ${isConnected ? "text-emerald-400/80" : "text-foreground/30"}`}>
                    {isConnected ? t("devicePanel.connected") : "Not connected"}
                  </span>
                </div>
              </div>
            </div>
            {/* Signal bars */}
            <div className="flex items-end gap-[3px]">
              {[3, 5, 7, 9].map((h, i) => (
                <div
                  key={i}
                  className={`w-[3px] rounded-sm transition-colors ${i < 3 ? "bg-emerald-400/70" : "bg-foreground/12"}`}
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
          </div>

          {/* Device specs row */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="flex flex-col gap-0.5 rounded-xl border border-border/40 bg-muted/50 px-3 py-2.5">
              <span className="text-[9px] font-light tracking-widest text-foreground/40 uppercase">{t("devicePanel.battery")}</span>
              <span className={`text-sm font-light tabular ${isLowBattery ? "text-red-400" : "text-foreground/75"}`}>{batteryLevel}%</span>
            </div>
            <div className="flex flex-col gap-0.5 rounded-xl border border-border/40 bg-muted/50 px-3 py-2.5">
              <span className="text-[9px] font-light tracking-widest text-foreground/40 uppercase">BT 5.3</span>
              <span className="text-sm font-light text-emerald-400/90">Active</span>
            </div>
            <div className="flex flex-col gap-0.5 rounded-xl border border-border/40 bg-muted/50 px-3 py-2.5">
              <span className="text-[9px] font-light tracking-widest text-foreground/40 uppercase">{t("devicePanel.firmware")}</span>
              <span className="text-sm font-light text-foreground/55">v2.4.1</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── HUD Launch ── */}
      <div className="flex gap-2.5">
        {onViewHud && (
          <button
            type="button"
            onClick={onViewHud}
            className="relative flex flex-1 items-center gap-3.5 overflow-hidden rounded-2xl border border-border/50 bg-muted/60 px-4 py-4 transition-all active:scale-[0.97] hover:bg-muted/80"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/40 bg-muted/70">
              <HudIcon />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-light text-foreground/85">{t("home.hudPreview")}</span>
              <span className="text-[10px] font-light text-foreground/35">{t("home.hudPreviewDesc")}</span>
            </div>
          </button>
        )}
        {onViewNightHud && (
          <button
            type="button"
            onClick={onViewNightHud}
            className="flex shrink-0 flex-col items-center justify-center gap-1.5 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.07] px-4 py-4 transition-all active:scale-[0.97]"
            aria-label={t("home.nightHud")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-emerald-400/80">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
            <span className="text-[9px] font-light tracking-wider text-emerald-400/60">Night</span>
          </button>
        )}
      </div>

      {/* ── Core Features ── */}
      <div>
        <span className="mb-3 block text-[10px] font-light tracking-[0.2em] text-foreground/30 uppercase">
          {t("home.quickActions")}
        </span>
        <div className="grid grid-cols-2 gap-2.5">
          {features.map((feat) => (
            <button
              key={feat.label}
              type="button"
              onClick={feat.onClick}
              className="relative flex flex-col gap-3 rounded-2xl glass-premium p-4 text-left transition-all active:scale-[0.96]"
            >
              {feat.live && (
                <span className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-emerald-400/80 animate-breathing" />
              )}
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${feat.bg}`}>
                <feat.icon accent={feat.accent} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] font-light text-foreground/80">{feat.label}</span>
                <span className="text-[10px] font-light text-foreground/35 leading-relaxed">{feat.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── AI Cloud Status ── */}
      <div className="flex items-center justify-between rounded-2xl glass-premium px-4 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/40 bg-muted/60">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-foreground/50">
              <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-light text-foreground/55">{t("devicePanel.aiCloud")}</span>
            <span className="text-[10px] font-light text-foreground/30">Cloud AI processing</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80 animate-breathing" />
          <span className="text-[11px] font-light text-emerald-400/80">{t("devicePanel.active")}</span>
        </div>
      </div>

      {/* ── Footer ── */}
      <p className="pt-1 text-center text-[10px] font-extralight tracking-widest text-foreground/15">
        Machaview by Paggy Industries
      </p>
    </div>
  )
}

function GlassesIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-foreground/55">
      <path d="M3 9h4a4 4 0 014 4v1H3v-1a4 4 0 010-8V9z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M21 9h-4a4 4 0 00-4 4v1h8v-1a4 4 0 000-8V9z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M3 10V8a2 2 0 012-2h14a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="7" cy="12" r="2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="17" cy="12" r="2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

function HudIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-foreground/55">
      <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2 9h3M19 9h3M2 15h3M19 15h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function AiIcon({ accent }: { accent?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={accent ?? "text-foreground/50"}>
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.8" />
      <path d="M12 2v4m0 12v4m10-10h-4M6 12H2m15.07-7.07l-2.83 2.83M9.76 14.24l-2.83 2.83m0-10.14l2.83 2.83m4.48 4.48l2.83 2.83" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function CaptureIcon({ accent }: { accent?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={accent ?? "text-foreground/50"}>
      <rect x="2" y="6" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="13" r="1.5" fill="currentColor" opacity="0.6" />
      <path d="M15 2h-6l-1 4h8l-1-4z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  )
}

function NavIcon({ accent }: { accent?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={accent ?? "text-foreground/50"}>
      <path d="M3 11l19-9-9 19-2-8-8-2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
    </svg>
  )
}

function TranslateIcon({ accent }: { accent?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={accent ?? "text-foreground/50"}>
      <path d="M4 5h16M7 5V3m5 2c-1.5 4-4 7.5-7 9.5m3.5-3.5c1.5 1.5 3.5 3 6 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 17l2-5 2 5m-3.5-1.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
