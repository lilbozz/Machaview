"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

interface SustainabilityContextValue {
  aiQueryCount: number
  energyUsed: number        // mWh, estimated
  efficiencyScore: number   // 0–100
  lowImpactMode: boolean
  incrementAiQuery: () => void
  toggleLowImpactMode: () => void
}

const SustainabilityContext = createContext<SustainabilityContextValue>({
  aiQueryCount: 0,
  energyUsed: 4.2,
  efficiencyScore: 92,
  lowImpactMode: false,
  incrementAiQuery: () => {},
  toggleLowImpactMode: () => {},
})

// Base idle power draw per minute (mWh). Realistic estimate for AR glasses.
const BASE_RATE_PER_MIN = 1.8
// Extra energy per AI inference call
const QUERY_COST_MWH = 0.6
// Tick interval (ms) — one "minute" of simulated session time every 30s
const TICK_MS = 30_000

export function SustainabilityProvider({ children }: { children: ReactNode }) {
  const [aiQueryCount, setAiQueryCount] = useState(0)
  // Initialise slightly above zero — device was "on" before app opened
  const [energyUsed, setEnergyUsed] = useState(4.2)
  const [lowImpactMode, setLowImpactMode] = useState(false)

  // Idle energy tick — 1 "session minute" every TICK_MS
  useEffect(() => {
    const rate = BASE_RATE_PER_MIN * (lowImpactMode ? 0.7 : 1)
    const interval = setInterval(() => {
      setEnergyUsed((prev) => parseFloat((prev + rate).toFixed(2)))
    }, TICK_MS)
    return () => clearInterval(interval)
  }, [lowImpactMode])

  const efficiencyScore = Math.round(
    Math.min(100, Math.max(20, 92 - aiQueryCount * 1.5 + (lowImpactMode ? 12 : 0)))
  )

  const incrementAiQuery = useCallback(() => {
    setAiQueryCount((n) => n + 1)
    setEnergyUsed((prev) => parseFloat((prev + QUERY_COST_MWH).toFixed(2)))
  }, [])

  const toggleLowImpactMode = useCallback(() => {
    setLowImpactMode((v) => !v)
  }, [])

  return (
    <SustainabilityContext.Provider
      value={{ aiQueryCount, energyUsed, efficiencyScore, lowImpactMode, incrementAiQuery, toggleLowImpactMode }}
    >
      {children}
    </SustainabilityContext.Provider>
  )
}

export function useSustainability() {
  return useContext(SustainabilityContext)
}
