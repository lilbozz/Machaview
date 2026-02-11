"use client"

import { useEffect, useState } from "react"
import { useI18n } from "@/lib/i18n-context"

interface HomeTabProps {
  onViewHud?: () => void
  onViewNightHud?: () => void
}

export function HomeTab({ onViewHud, onViewNightHud }: HomeTabProps) {
  const { t } = useI18n()
  const [time, setTime] = useState("--:--")
  const [greeting, setGreeting] = useState("")
  const [mounted, setMounted] = useState(false)

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

  const quickActions = [
    { label: t("home.askAI"), icon: AiIcon },
    { label: t("home.capture"), icon: CaptureIcon },
    { label: t("home.navigate"), icon: NavIcon },
    { label: t("home.translate"), icon: TranslateIcon },
  ]

  return (
    <div className="flex flex-col gap-6 px-6 pb-6 pt-6">
      {/* Greeting */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-light tracking-widest text-muted-foreground uppercase">{t("home.greeting")}</span>
        <h1 className="text-2xl font-extralight tracking-wider text-foreground/90">{mounted ? greeting : ""}</h1>
        <span className="text-4xl font-extralight tracking-wider text-foreground/80">{mounted ? time : "--:--"}</span>
      </div>

      {/* Device Status Panel -- Premium */}
      <div className="rounded-3xl glass p-5">
        <h3 className="mb-4 text-[11px] font-light tracking-widest text-muted-foreground uppercase">
          {t("devicePanel.title")}
        </h3>
        <div className="flex flex-col gap-3">
          {/* Battery */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-emerald-400">
                  <rect x="2" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M22 10v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <rect x="5" y="9" width="8" height="6" rx="1" fill="currentColor" opacity="0.4" />
                </svg>
              </div>
              <span className="text-sm font-light text-foreground/70">{t("devicePanel.battery")}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[84%] rounded-full bg-emerald-500/50 transition-all" />
              </div>
              <span className="text-xs font-light text-foreground/50">84%</span>
            </div>
          </div>
          {/* Connectivity */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-blue-400">
                  <path d="M12 20h.01M8.53 16.11a6 6 0 016.95 0M5.64 12.5a10 10 0 0112.73 0M2 8.82a14 14 0 0120 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-sm font-light text-foreground/70">{t("devicePanel.bluetooth")}</span>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-light tracking-wider text-emerald-400">
              {t("devicePanel.connected")}
            </span>
          </div>
          {/* AI Cloud */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-foreground/5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-foreground/40">
                  <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-sm font-light text-foreground/70">{t("devicePanel.aiCloud")}</span>
            </div>
            <span className="text-xs font-light text-emerald-400">{t("devicePanel.active")}</span>
          </div>
          {/* Temperature */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-amber-400">
                  <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <span className="text-sm font-light text-foreground/70">{t("devicePanel.temperature")}</span>
            </div>
            <span className="text-xs font-light text-foreground/40">34.2 C</span>
          </div>
          {/* Sync */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-foreground/5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-foreground/40">
                  <path d="M23 4v6h-6M1 20v-6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-sm font-light text-foreground/70">{t("devicePanel.syncStatus")}</span>
            </div>
            <span className="text-xs font-light text-foreground/40">{t("devicePanel.synced")}</span>
          </div>
          {/* Firmware */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-foreground/5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-foreground/40">
                  <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-sm font-light text-foreground/70">{t("devicePanel.firmware")}</span>
            </div>
            <span className="text-xs font-light text-foreground/40">v2.4.1</span>
          </div>
        </div>
      </div>

      {/* HUD Actions */}
      <div className="flex gap-3">
        {onViewHud && (
          <button
            type="button"
            onClick={onViewHud}
            className="flex flex-1 items-center gap-3 rounded-2xl glass p-4 transition-all active:scale-[0.97]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground/5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-foreground/40">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-light text-foreground/70">{t("home.hudPreview")}</span>
              <span className="text-[10px] font-light text-foreground/30">{t("home.hudPreviewDesc")}</span>
            </div>
          </button>
        )}
        {onViewNightHud && (
          <button
            type="button"
            onClick={onViewNightHud}
            className="flex shrink-0 items-center justify-center rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-4 transition-all active:scale-[0.97]"
            aria-label={t("home.nightHud")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-emerald-400/60">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="mb-3 text-[11px] font-light tracking-widest text-muted-foreground uppercase">
          {t("home.quickActions")}
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              type="button"
              className="flex flex-col items-center gap-2 rounded-2xl glass p-4 transition-all active:scale-[0.97] hover:bg-card/80"
            >
              <action.icon />
              <span className="text-[10px] font-light tracking-wider text-foreground/50">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <p className="pt-4 text-center text-[10px] font-extralight tracking-widest text-foreground/15">
        Machaview by Paggy Industries
      </p>
    </div>
  )
}

function AiIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-foreground/50">
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <path d="M12 2v4m0 12v4m10-10h-4M6 12H2m15.07-7.07l-2.83 2.83M9.76 14.24l-2.83 2.83m0-10.14l2.83 2.83m4.48 4.48l2.83 2.83" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function CaptureIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-foreground/50">
      <rect x="2" y="6" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.2" />
      <path d="M15 2h-6l-1 4h8l-1-4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}

function NavIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-foreground/50">
      <path d="M3 11l19-9-9 19-2-8-8-2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}

function TranslateIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-foreground/50">
      <path d="M4 5h16M7 5V3m5 2c-1.5 4-4 7.5-7 9.5m3.5-3.5c1.5 1.5 3.5 3 6 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 17l2-5 2 5m-3.5-1.5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
