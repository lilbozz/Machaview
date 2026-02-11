"use client"

import { useEffect, useState } from "react"

export function BatteryIndicator() {
  const [level, setLevel] = useState(84)

  useEffect(() => {
    // Simulate slow battery drain
    const interval = setInterval(() => {
      setLevel((prev) => (prev > 5 ? prev - 1 : 84))
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const barWidth = Math.max(0, Math.min(100, level))

  return (
    <div className="flex items-center gap-2">
      <div className="relative h-[10px] w-[20px] md:h-[11px] md:w-[22px]">
        {/* Battery body */}
        <div className="absolute inset-0 rounded-[2px] border border-foreground/40" />
        {/* Battery fill */}
        <div
          className="absolute left-[2px] top-[2px] bottom-[2px] rounded-[1px] bg-foreground/50 transition-all duration-1000"
          style={{ width: `calc(${barWidth}% - 4px)` }}
        />
        {/* Battery tip */}
        <div className="absolute right-[-3px] top-[3px] h-[4px] w-[2px] rounded-r-[1px] bg-foreground/40 md:top-[3px] md:h-[5px]" />
      </div>
      <span className="text-foreground/60 text-[11px] font-extralight tracking-wide md:text-xs">
        {level}%
      </span>
    </div>
  )
}
