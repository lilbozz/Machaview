"use client"

import React, { useState, useEffect } from "react"
import { useI18n, localeLabels, type Locale } from "@/lib/i18n-context"
import { useTheme, type ThemeMode } from "@/lib/theme-context"
import { GlassPopup } from "./glass-popup"

interface SettingsTabProps {
  onSignOut: () => void
}

export function SettingsTab({ onSignOut }: SettingsTabProps) {
  const { t, locale, setLocale } = useI18n()
  const { mode, setMode } = useTheme()
  const [safety, setSafety] = useState(true)
  const [blinkConfirm, setBlinkConfirm] = useState(true)
  const [doubleTapZoom, setDoubleTapZoom] = useState(true)
  const [langPopup, setLangPopup] = useState(false)
  const [batteryLevel, setBatteryLevel] = useState(84)
  const [deviceTemp, setDeviceTemp] = useState("34.2")

  useEffect(() => {
    // Simulate slight battery/temp changes for realism
    const interval = setInterval(() => {
      setBatteryLevel((prev) => Math.max(10, prev - (Math.random() > 0.7 ? 1 : 0)))
      setDeviceTemp((30 + Math.random() * 6).toFixed(1))
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleLangChange = (l: Locale) => {
    setLocale(l)
    setLangPopup(true)
  }

  return (
    <div className="flex flex-col gap-6 px-6 pb-24 pt-6">
      <h1 className="text-xl font-extralight tracking-wider text-foreground/90">{t("settings.title")}</h1>

      {/* Device Status Panel */}
      <SettingSection label={t("settings.deviceBattery")}>
        <div className="rounded-3xl glass p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-emerald-400">
                  <rect x="2" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M22 10v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <rect x="5" y="9" width="8" height="6" rx="1" fill="currentColor" opacity="0.4" />
                </svg>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-light text-foreground/70">Machaview Pro</span>
                <span className="text-[10px] font-light text-foreground/30">{t("settings.firmwareVersion")}</span>
              </div>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-light tracking-wider text-emerald-400">
              {t("devicePanel.connected")}
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            {/* Battery bar */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-light text-foreground/40">{t("devicePanel.battery")}</span>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${batteryLevel}%`,
                      backgroundColor: batteryLevel > 30 ? "rgb(16 185 129 / 0.5)" : "rgb(239 68 68 / 0.5)",
                    }}
                  />
                </div>
                <span className="text-xs font-light text-foreground/50">{batteryLevel}%</span>
              </div>
            </div>
            {/* Temperature */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-light text-foreground/40">{t("devicePanel.temperature")}</span>
              <span className="text-xs font-light text-foreground/50">{deviceTemp} C</span>
            </div>
            {/* Firmware */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-light text-foreground/40">{t("devicePanel.firmware")}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-light text-foreground/50">v2.4.1</span>
                <span className="text-[9px] font-light text-emerald-400/60">{t("settings.firmwareStatus")}</span>
              </div>
            </div>
            {/* Sync */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-light text-foreground/40">{t("devicePanel.syncStatus")}</span>
              <span className="text-xs font-light text-emerald-400/60">{t("devicePanel.synced")}</span>
            </div>
          </div>
        </div>
      </SettingSection>

      {/* Language */}
      <SettingSection label={t("settings.language")}>
        <div className="flex items-center gap-0.5 rounded-2xl glass p-1">
          {(Object.keys(localeLabels) as Locale[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => handleLangChange(l)}
              className={`flex-1 rounded-xl px-3 py-2.5 text-xs font-light tracking-wider transition-all duration-300 ${
                locale === l ? "bg-foreground text-primary-foreground shadow-sm" : "text-foreground/40 hover:text-foreground/60"
              }`}
            >
              {localeLabels[l]}
            </button>
          ))}
        </div>
      </SettingSection>

      {/* Theme */}
      <SettingSection label={t("settings.theme")}>
        <div className="flex items-center gap-0.5 rounded-2xl glass p-1">
          {(["dark", "light", "auto"] as ThemeMode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`flex-1 rounded-xl px-3 py-2.5 text-xs font-light tracking-wider transition-all duration-300 ${
                mode === m ? "bg-foreground text-primary-foreground shadow-sm" : "text-foreground/40 hover:text-foreground/60"
              }`}
            >
              {t(`settings.${m}`)}
            </button>
          ))}
        </div>
      </SettingSection>

      {/* Safety */}
      <SettingSection label={t("settings.safety")}>
        <div className="flex items-center justify-between rounded-2xl glass p-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-light text-foreground/70">{t("settings.safety")}</span>
            <span className="text-[11px] font-light text-foreground/30">{t("settings.safetyDesc")}</span>
          </div>
          <ToggleSwitch checked={safety} onChange={setSafety} />
        </div>
      </SettingSection>

      {/* Gestures */}
      <SettingSection label={t("settings.gestures")}>
        <div className="flex flex-col rounded-2xl glass divide-y divide-foreground/[0.04]">
          <div className="flex items-center justify-between p-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-light text-foreground/70">{t("settings.gestures")}</span>
              <span className="text-[11px] font-light text-foreground/30">{t("settings.gesturesDesc")}</span>
            </div>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-xs font-light text-foreground/50">Blink to confirm</span>
            <ToggleSwitch checked={blinkConfirm} onChange={setBlinkConfirm} />
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-xs font-light text-foreground/50">Double-tap zoom</span>
            <ToggleSwitch checked={doubleTapZoom} onChange={setDoubleTapZoom} />
          </div>
        </div>
      </SettingSection>

      {/* About + Sign Out */}
      <div className="flex flex-col gap-3 pt-2">
        <div className="rounded-2xl glass p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-light text-foreground/70">{t("settings.about")}</span>
            <span className="text-xs font-light text-foreground/30">{t("settings.version")}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={onSignOut}
          className="w-full rounded-2xl border border-destructive/20 bg-destructive/5 py-3.5 text-sm font-light tracking-wider text-destructive transition-all active:scale-[0.97]"
        >
          {t("settings.signOut")}
        </button>
      </div>

      <p className="pt-2 text-center text-[10px] font-extralight tracking-widest text-foreground/15">
        Machaview by Paggy Industries
      </p>

      {/* Language changed popup */}
      <GlassPopup
        open={langPopup}
        onClose={() => setLangPopup(false)}
        title={t("popup.langChanged")}
        description={t("popup.langChangedDesc")}
        dismissLabel={t("popup.dismiss")}
        icon={
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-foreground/50">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.2" />
            <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        }
      />
    </div>
  )
}

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 ${
        checked ? "bg-emerald-500/50" : "bg-muted"
      }`}
      role="switch"
      aria-checked={checked}
    >
      <div
        className={`absolute top-0.5 h-6 w-6 rounded-full bg-foreground shadow-sm transition-transform duration-300 ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  )
}

function SettingSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] font-light tracking-widest text-muted-foreground uppercase">{label}</span>
      {children}
    </div>
  )
}
