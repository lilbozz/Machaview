"use client"

import { useState, useEffect } from "react"

const subtitles = [
  { original: "สวัสดีครับ ยินดีต้อนรับ", translated: "Hello, welcome.", lang: "TH" },
  { original: "请问这个多少钱？", translated: "How much is this?", lang: "CN" },
  { original: "ขอบคุณมากครับ นัดพบกันพรุ่งนี้", translated: "Thank you very much. Let's meet tomorrow.", lang: "TH" },
]

export function TranslationMode() {
  const [current, setCurrent] = useState(0)
  const [activeLang, setActiveLang] = useState("TH")

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % subtitles.length
        setActiveLang(subtitles[next].lang)
        return next
      })
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const subtitle = subtitles[current]

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Language toggle */}
      <div className="flex items-center gap-1 rounded-full border border-foreground/[0.08] bg-foreground/[0.03] p-0.5">
        {["TH", "EN", "CN"].map((lang) => (
          <button
            key={lang}
            type="button"
            onClick={() => setActiveLang(lang)}
            className={`rounded-full px-3 py-1 text-[10px] font-light tracking-widest transition-all duration-300 ${
              activeLang === lang
                ? "bg-foreground/10 text-foreground/70"
                : "text-foreground/30"
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Live subtitle */}
      <div className="animate-subtitle-fade max-w-md text-center" key={current}>
        <p className="text-sm font-extralight leading-relaxed tracking-wider text-foreground/40">
          {subtitle.original}
        </p>
        <div className="mt-2 h-px w-12 mx-auto bg-foreground/[0.08]" />
        <p className="mt-2 text-[15px] font-light leading-relaxed tracking-wide text-foreground/75">
          {subtitle.translated}
        </p>
      </div>

      {/* Live indicator */}
      <div className="flex items-center gap-1.5">
        <div className="h-1 w-1 animate-rec-blink rounded-full bg-foreground/40" />
        <span className="text-[9px] font-light tracking-widest text-foreground/30 uppercase">
          Live translation
        </span>
      </div>
    </div>
  )
}
