"use client"

import React, { useState, useEffect } from "react"
import { useI18n, localeLabels, type Locale } from "@/lib/i18n-context"
import { SustainabilityProvider, useSustainability } from "@/lib/sustainability-context"
import { HomeTab } from "./home-tab"
import { AITab } from "./ai-tab"
import { MediaTab } from "./media-tab"
import { SettingsTab } from "./settings-tab"
import { HudOverlay, type HudMode } from "@/components/hud/hud-overlay"
import { GlassPopup } from "./glass-popup"

type Tab = "home" | "ai" | "media" | "settings"

interface AppShellProps {
  onSignOut: () => void
}

export function AppShell({ onSignOut }: AppShellProps) {
  return (
    <SustainabilityProvider>
      <AppShellInner onSignOut={onSignOut} />
    </SustainabilityProvider>
  )
}

function AppShellInner({ onSignOut }: AppShellProps) {
  const [activeTab, setActiveTab] = useState<Tab>("home")
  const [fadeKey, setFadeKey] = useState(0)
  const [showHud, setShowHud] = useState(false)
  const [nightHud, setNightHud] = useState(false)
  const [hudInitialMode, setHudInitialMode] = useState<HudMode>("home")
  const [batteryLevel, setBatteryLevel] = useState(84)
  const { t, locale, setLocale } = useI18n()
  const { lowImpactMode } = useSustainability()

  // Popup state
  const [welcomePopup, setWelcomePopup] = useState(false)
  const [featurePopup, setFeaturePopup] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setWelcomePopup(true), 800)
    return () => clearTimeout(timer)
  }, [])

  // Single battery simulation shared across tabs
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel((prev) => Math.max(10, prev - (Math.random() > 0.7 ? 1 : 0)))
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const switchTab = (tab: Tab) => {
    if (tab === activeTab) return
    setActiveTab(tab)
    setFadeKey((k) => k + 1)
  }

  const openHud = (mode: HudMode = "home", night = false) => {
    setHudInitialMode(mode)
    setNightHud(night)
    setShowHud(true)
  }

  if (showHud) {
    return (
      <div className="dark relative h-dvh w-screen overflow-hidden bg-[hsl(0,0%,2%)]">
        <HudOverlay nightMode={nightHud} initialMode={hudInitialMode} batteryLevel={batteryLevel} />
        <button
          type="button"
          onClick={() => { setShowHud(false); setNightHud(false); setHudInitialMode("home") }}
          className="fixed left-6 top-6 z-[100] rounded-full glass px-4 py-2 text-[10px] font-light tracking-widest text-foreground/50 uppercase transition-all hover:text-foreground/70 active:scale-[0.97]"
        >
          Exit HUD
        </button>
      </div>
    )
  }

  const tabs: { id: Tab; label: string; icon: (active: boolean) => React.ReactNode }[] = [
    {
      id: "home",
      label: t("tabs.home"),
      icon: (active) => (
        /* Glasses icon */
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className={active ? "text-foreground" : "text-foreground/30"}>
          <path d="M3 10h4a4 4 0 014 4v1H3v-1a4 4 0 010-8V10z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M21 10h-4a4 4 0 00-4 4v1h8v-1a4 4 0 000-8V10z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M3 10.5V9a2 2 0 012-2h14a2 2 0 012 2v1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="7" cy="13" r="1.8" stroke="currentColor" strokeWidth="1.1" fill={active ? "currentColor" : "none"} fillOpacity="0.15" />
          <circle cx="17" cy="13" r="1.8" stroke="currentColor" strokeWidth="1.1" fill={active ? "currentColor" : "none"} fillOpacity="0.15" />
        </svg>
      ),
    },
    {
      id: "ai",
      label: t("tabs.ai"),
      icon: (active) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={active ? "text-foreground" : "text-foreground/30"}>
          <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity={active ? "0.9" : "1"} />
          <path d="M12 2v4m0 12v4m10-10h-4M6 12H2m15.07-7.07l-2.12 2.12M9.05 14.95l-2.12 2.12m0-10.14l2.12 2.12m4.95 4.95l2.12 2.12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "media",
      label: t("tabs.media"),
      icon: (active) => (
        /* Camera icon */
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={active ? "text-foreground" : "text-foreground/30"}>
          <rect x="2" y="6" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="12" cy="13" r="1.5" fill="currentColor" fillOpacity={active ? "0.8" : "0.5"} />
          <path d="M15 2h-6l-1 4h8l-1-4z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "settings",
      label: t("tabs.settings"),
      icon: (active) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={active ? "text-foreground" : "text-foreground/30"}>
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.3" fill={active ? "currentColor" : "none"} fillOpacity="0.12" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      ),
    },
  ]

  return (
    <div className="flex h-dvh w-screen flex-col overflow-hidden bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border/25 bg-background/95 px-5 pb-2.5 pt-3.5 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <span className="text-[12px] font-light tracking-[0.22em] text-foreground/60 uppercase">
            Machaview
          </span>
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-2 py-0.5">
            <span className="h-1 w-1 rounded-full bg-emerald-400/80 animate-breathing" />
            <span className="text-[9px] font-light tracking-wider text-emerald-400/70">BT Connected</span>
          </div>
        </div>
        <div className="flex items-center gap-px rounded-full border border-border/40 bg-muted/40 p-0.5">
          {(Object.keys(localeLabels) as Locale[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLocale(l)}
              className={`rounded-full px-2.5 py-1 text-[10px] font-light tracking-wider transition-all duration-200 ${
                locale === l
                  ? "bg-foreground text-primary-foreground shadow-sm"
                  : "text-foreground/35 hover:text-foreground/60"
              }`}
              aria-label={`Switch language to ${localeLabels[l]}`}
            >
              {localeLabels[l]}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <div key={fadeKey} className="flex-1 animate-hud-fade-in overflow-y-auto opacity-0">
        {activeTab === "home" && (
          <HomeTab
            batteryLevel={batteryLevel}
            onViewHud={() => openHud("home", false)}
            onViewNightHud={() => openHud("home", true)}
            onAskAI={() => switchTab("ai")}
            onCapture={() => openHud("capture")}
            onNavigate={() => openHud("navigate")}
            onTranslate={() => openHud("translate")}
          />
        )}
        {activeTab === "ai" && <AITab />}
        {activeTab === "media" && <MediaTab />}
        {activeTab === "settings" && <SettingsTab onSignOut={onSignOut} batteryLevel={batteryLevel} />}
      </div>

      {/* Bottom Tab Bar */}
      <nav
        className="flex items-center justify-around border-t border-border/40 bg-background/90 px-3 pb-7 pt-2 backdrop-blur-xl"
        aria-label="Main navigation"
      >
        {tabs.map((tab) => {
          const active = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => switchTab(tab.id)}
              className={`relative flex flex-col items-center gap-1 rounded-2xl px-5 py-2 transition-all duration-200 active:scale-[0.94] ${
                active ? "text-foreground" : "text-foreground/28 hover:text-foreground/50"
              }`}
              aria-current={active ? "page" : undefined}
            >
              {active && (
                <span className="absolute inset-0 rounded-2xl bg-foreground/[0.06]" />
              )}
              <span className="relative">{tab.icon(active)}</span>
              <span className={`relative text-[10px] tracking-wide transition-all duration-200 ${active ? "font-light text-foreground" : "font-light"}`}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </nav>

      {/* Popups */}
      <GlassPopup
        open={welcomePopup}
        onClose={() => { setWelcomePopup(false); setTimeout(() => setFeaturePopup(true), 500) }}
        title={t("popup.welcome")}
        description={t("popup.welcomeDesc")}
        dismissLabel={t("popup.dismiss")}
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground/50">
            <circle cx="12" cy="12" r="3" fill="currentColor" />
            <path d="M12 2v4m0 12v4m10-10h-4M6 12H2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        }
      />
      <GlassPopup
        open={featurePopup}
        onClose={() => setFeaturePopup(false)}
        title={t("popup.features")}
        description={t("popup.featuresDesc")}
        action={{ label: t("popup.explore"), onClick: () => switchTab("ai") }}
        dismissLabel={t("popup.dismiss")}
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground/50">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
        }
      />
    </div>
  )
}
