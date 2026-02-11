"use client"

import React, { useState, useEffect } from "react"
import { useI18n, localeLabels, type Locale } from "@/lib/i18n-context"
import { HomeTab } from "./home-tab"
import { AITab } from "./ai-tab"
import { MediaTab } from "./media-tab"
import { SettingsTab } from "./settings-tab"
import { HudOverlay } from "@/components/hud/hud-overlay"
import { GlassPopup } from "./glass-popup"

type Tab = "home" | "ai" | "media" | "settings"

interface AppShellProps {
  onSignOut: () => void
}

export function AppShell({ onSignOut }: AppShellProps) {
  const [activeTab, setActiveTab] = useState<Tab>("home")
  const [fadeKey, setFadeKey] = useState(0)
  const [showHud, setShowHud] = useState(false)
  const [nightHud, setNightHud] = useState(false)
  const { t, locale, setLocale } = useI18n()

  // Popup state
  const [welcomePopup, setWelcomePopup] = useState(false)
  const [featurePopup, setFeaturePopup] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setWelcomePopup(true), 800)
    return () => clearTimeout(timer)
  }, [])

  const switchTab = (tab: Tab) => {
    if (tab === activeTab) return
    setActiveTab(tab)
    setFadeKey((k) => k + 1)
  }

  if (showHud) {
    return (
      <div className="relative h-dvh w-screen overflow-hidden bg-[hsl(0,0%,2%)]">
        <HudOverlay nightMode={nightHud} />
        <button
          type="button"
          onClick={() => { setShowHud(false); setNightHud(false) }}
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
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={active ? "text-foreground" : "text-foreground/30"}>
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "ai",
      label: t("tabs.ai"),
      icon: (active) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={active ? "text-foreground" : "text-foreground/30"}>
          <circle cx="12" cy="12" r="3" fill="currentColor" />
          <path d="M12 2v4m0 12v4m10-10h-4M6 12H2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "media",
      label: t("tabs.media"),
      icon: (active) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={active ? "text-foreground" : "text-foreground/30"}>
          <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
          <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "settings",
      label: t("tabs.settings"),
      icon: (active) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={active ? "text-foreground" : "text-foreground/30"}>
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.3" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      ),
    },
  ]

  return (
    <div className="flex h-dvh w-screen flex-col overflow-hidden bg-background">
      {/* Header with language switcher */}
      <header className="flex items-center justify-between border-b border-border/30 bg-background/80 px-4 pb-2 pt-3 backdrop-blur-lg">
        <span className="text-[11px] font-extralight tracking-[0.2em] text-foreground/40 uppercase">
          Machaview
        </span>
        <div className="flex items-center gap-0.5 rounded-full border border-border/40 p-0.5">
          {(Object.keys(localeLabels) as Locale[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLocale(l)}
              className={`rounded-full px-2.5 py-1 text-[10px] font-light tracking-wider transition-all ${
                locale === l
                  ? "bg-foreground text-primary-foreground"
                  : "text-foreground/35 hover:text-foreground/55"
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
            onViewHud={() => { setNightHud(false); setShowHud(true) }}
            onViewNightHud={() => { setNightHud(true); setShowHud(true) }}
          />
        )}
        {activeTab === "ai" && <AITab />}
        {activeTab === "media" && <MediaTab />}
        {activeTab === "settings" && <SettingsTab onSignOut={onSignOut} />}
      </div>

      {/* Bottom Tab Bar */}
      <nav
        className="flex items-center justify-around border-t border-border/50 bg-background/80 px-2 pb-6 pt-2 backdrop-blur-lg"
        aria-label="Main navigation"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => switchTab(tab.id)}
            className={`flex flex-col items-center gap-1 px-4 py-1.5 transition-all active:scale-[0.97] ${
              activeTab === tab.id ? "text-foreground" : "text-foreground/30"
            }`}
            aria-current={activeTab === tab.id ? "page" : undefined}
          >
            {tab.icon(activeTab === tab.id)}
            <span className="text-[10px] font-light tracking-wider">{tab.label}</span>
          </button>
        ))}
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
