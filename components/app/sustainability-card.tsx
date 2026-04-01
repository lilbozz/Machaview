"use client"

import { useSustainability } from "@/lib/sustainability-context"
import { useI18n } from "@/lib/i18n-context"

function scoreLabel(score: number, t: (k: string) => string): string {
  if (score >= 85) return t("sustainability.scoreExcellent")
  if (score >= 70) return t("sustainability.scoreGood")
  if (score >= 50) return t("sustainability.scoreFair")
  return t("sustainability.scoreLow")
}

function scoreColor(score: number): string {
  if (score >= 85) return "text-emerald-400"
  if (score >= 70) return "text-emerald-400/70"
  if (score >= 50) return "text-amber-400/80"
  return "text-red-400/80"
}

function barColor(score: number): string {
  if (score >= 85) return "bg-emerald-500/50"
  if (score >= 70) return "bg-emerald-500/35"
  if (score >= 50) return "bg-amber-500/50"
  return "bg-red-500/50"
}

export function SustainabilityCard() {
  const { t } = useI18n()
  const { aiQueryCount, energyUsed, efficiencyScore, lowImpactMode, toggleLowImpactMode } =
    useSustainability()

  const label = scoreLabel(efficiencyScore, t)
  const scoreTextColor = scoreColor(efficiencyScore)
  const barFillColor = barColor(efficiencyScore)

  return (
    <div className="relative overflow-hidden rounded-3xl glass-glow p-5">
      {/* Subtle shimmer — same treatment as distance card */}
      <div className="pointer-events-none absolute inset-0 shimmer-bg animate-shimmer opacity-40" />

      <div className="relative z-10">
        {/* ── Header ── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-emerald-400">
                <path
                  d="M2 12C2 6.477 6.477 2 12 2c4.5 0 8.33 2.9 9.6 7H18l4 4-4 4v-3H12c-2.76 0-5-2.24-5-5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-light tracking-widest text-foreground/50 uppercase">
                {t("sustainability.title")}
              </span>
              <span className={`text-[10px] font-light ${lowImpactMode ? "text-emerald-400/60" : "text-foreground/25"}`}>
                {lowImpactMode ? t("sustainability.ecoActive") : t("sustainability.sessionLabel")}
              </span>
            </div>
          </div>

          {/* Score badge */}
          <div className="flex flex-col items-end gap-0.5">
            <span className={`tabular text-3xl font-extralight leading-none ${scoreTextColor}`}>
              {efficiencyScore}
            </span>
            <span className={`text-[10px] font-light tracking-wider ${scoreTextColor} opacity-70`}>
              {label}
            </span>
          </div>
        </div>

        {/* ── Score bar ── */}
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-muted/50">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${barFillColor}`}
            style={{ width: `${efficiencyScore}%` }}
          />
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-[9px] font-light text-foreground/15">0</span>
          <span className="text-[9px] font-light text-foreground/15">100</span>
        </div>

        {/* ── Stats row ── */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {/* Energy used */}
          <div className="flex flex-col gap-1 rounded-2xl border border-foreground/[0.06] bg-foreground/[0.03] px-3 py-2.5">
            <div className="flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="text-amber-400/60">
                <path d="M13 2L4.09 12.26c-.34.42-.52.95-.5 1.49.02.54.24 1.06.61 1.45.37.39.87.62 1.4.67.53.05 1.06-.1 1.48-.42L13 11.5V22l8.91-10.26c.34-.42.52-.95.5-1.49a2.27 2.27 0 00-.61-1.45 2.27 2.27 0 00-1.4-.67 2.27 2.27 0 00-1.48.42L13 12.5V2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
              </svg>
              <span className="text-[9px] font-light tracking-wider text-foreground/30 uppercase">
                {t("sustainability.energy")}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="tabular text-base font-extralight text-foreground/70">{energyUsed.toFixed(1)}</span>
              <span className="text-[10px] font-light text-foreground/30">{t("sustainability.mwh")}</span>
            </div>
          </div>

          {/* AI queries */}
          <div className="flex flex-col gap-1 rounded-2xl border border-foreground/[0.06] bg-foreground/[0.03] px-3 py-2.5">
            <div className="flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="text-foreground/35">
                <circle cx="12" cy="12" r="3" fill="currentColor" />
                <path d="M12 2v4m0 12v4m10-10h-4M6 12H2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <span className="text-[9px] font-light tracking-wider text-foreground/30 uppercase">
                {t("sustainability.aiQueries")}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="tabular text-base font-extralight text-foreground/70">{aiQueryCount}</span>
              <span className="text-[10px] font-light text-foreground/30">{t("sustainability.thisSession")}</span>
            </div>
          </div>
        </div>

        {/* ── Low-Impact Toggle ── */}
        <div className="mt-3 flex items-center justify-between rounded-2xl border border-foreground/[0.06] bg-foreground/[0.03] px-3.5 py-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] font-light text-foreground/70">{t("sustainability.lowImpact")}</span>
            <span className="text-[10px] font-light text-foreground/30">{t("sustainability.lowImpactDesc")}</span>
          </div>
          <button
            type="button"
            onClick={toggleLowImpactMode}
            className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 ${
              lowImpactMode ? "bg-emerald-500/50" : "bg-muted"
            }`}
            role="switch"
            aria-checked={lowImpactMode}
            aria-label={t("sustainability.lowImpact")}
          >
            <div
              className={`absolute top-0.5 h-6 w-6 rounded-full bg-foreground shadow-sm transition-transform duration-300 ${
                lowImpactMode ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
