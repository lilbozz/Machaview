"use client"

import { useEffect, useState } from "react"

export function TimeDisplay() {
  const [time, setTime] = useState("--:--")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    function updateTime() {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, "0")
      const minutes = now.getMinutes().toString().padStart(2, "0")
      setTime(`${hours}:${minutes}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="text-sm font-extralight tracking-widest text-foreground/55 md:text-base">
      {mounted ? time : "--:--"}
    </span>
  )
}
