"use client"

import { useState, useEffect } from "react"

interface AIResponse {
  query: string
  response: string
  action?: string
}

const scenarios: AIResponse[] = [
  {
    query: '"What building is this?"',
    response: "Grand Palace, Bangkok. Built in 1782, the official residence of the Kings of Siam since 1782.",
    action: "Learn more",
  },
  {
    query: '"Summarize this document"',
    response: "Q3 revenue up 23% YoY. Key drivers: APAC expansion (+41%), new enterprise contracts. Margin improved to 34.2%.",
    action: "Save summary",
  },
  {
    query: '"Reply to John"',
    response: 'Draft: "Thanks John, I\'ll review the proposal this afternoon and get back to you by EOD."',
    action: "Send",
  },
]

export function AIAssistantMode() {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [phase, setPhase] = useState<"listening" | "processing" | "response">("listening")

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    timers.push(setTimeout(() => setPhase("processing"), 1500))
    timers.push(setTimeout(() => setPhase("response"), 2800))
    timers.push(
      setTimeout(() => {
        setPhase("listening")
        setCurrentScenario((prev) => (prev + 1) % scenarios.length)
      }, 8000)
    )

    return () => timers.forEach(clearTimeout)
  }, [currentScenario])

  const scenario = scenarios[currentScenario]

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Voice indicator */}
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-foreground/60" />
          {phase === "listening" && (
            <div className="absolute inset-0 h-2 w-2 animate-pulse-ring rounded-full bg-foreground/40" />
          )}
        </div>
        <span className="text-[11px] font-light tracking-widest text-foreground/40 uppercase">
          {phase === "listening" && "Listening"}
          {phase === "processing" && "Processing"}
          {phase === "response" && "Machaview AI"}
        </span>
      </div>

      {/* Query display */}
      {phase !== "listening" && (
        <div className="animate-subtitle-fade text-center">
          <span className="text-xs font-extralight tracking-wide text-foreground/35 italic">
            {scenario.query}
          </span>
        </div>
      )}

      {/* Response card */}
      {phase === "response" && (
        <div className="animate-slide-up max-w-sm">
          <div className="rounded-2xl border border-foreground/[0.08] bg-foreground/[0.05] px-5 py-4 backdrop-blur-md">
            <p className="text-[13px] font-light leading-relaxed tracking-wide text-foreground/70">
              {scenario.response}
            </p>
            {scenario.action && (
              <div className="mt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  className="text-[10px] font-light tracking-widest text-foreground/30 uppercase"
                >
                  Dismiss
                </button>
                <button
                  type="button"
                  className="rounded-full border border-foreground/15 bg-foreground/10 px-4 py-1.5 text-[10px] font-light tracking-widest text-foreground/70 uppercase"
                >
                  {scenario.action}
                </button>
              </div>
            )}
          </div>
          {/* Interaction indicators */}
          <div className="mt-2 flex items-center justify-center gap-4">
            <span className="flex items-center gap-1 text-[9px] font-light tracking-widest text-foreground/25 uppercase">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-foreground/25">
                <path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z" fill="currentColor" />
                <path d="M19 10v2a7 7 0 01-14 0v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M12 19v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Voice
            </span>
            <span className="flex items-center gap-1 text-[9px] font-light tracking-widest text-foreground/25 uppercase">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-foreground/25">
                <circle cx="12" cy="12" r="3" fill="currentColor" />
                <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              Blink
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
