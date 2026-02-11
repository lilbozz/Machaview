"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n-context"

type MediaFilter = "photos" | "videos"

const demoPhotos = [
  { id: 1, gradient: "135deg, hsl(200 30% 12%) 0%, hsl(200 20% 18%) 100%", label: "Bangkok skyline" },
  { id: 2, gradient: "180deg, hsl(150 20% 10%) 0%, hsl(150 15% 16%) 100%", label: "Temple garden" },
  { id: 3, gradient: "120deg, hsl(30 25% 12%) 0%, hsl(30 20% 18%) 100%", label: "Street food" },
  { id: 4, gradient: "200deg, hsl(220 25% 10%) 0%, hsl(220 20% 16%) 100%", label: "Night market" },
  { id: 5, gradient: "160deg, hsl(170 20% 10%) 0%, hsl(170 15% 16%) 100%", label: "River view" },
  { id: 6, gradient: "90deg, hsl(260 15% 12%) 0%, hsl(260 10% 18%) 100%", label: "Sunset" },
]

const demoVideos = [
  { id: 1, gradient: "135deg, hsl(0 20% 12%) 0%, hsl(0 15% 18%) 100%", label: "Walk through Siam", duration: "0:42" },
  { id: 2, gradient: "180deg, hsl(40 25% 10%) 0%, hsl(40 20% 16%) 100%", label: "Boat ride", duration: "1:15" },
]

export function MediaTab() {
  const { t } = useI18n()
  const [filter, setFilter] = useState<MediaFilter>("photos")
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const items = filter === "photos" ? demoPhotos : demoVideos

  return (
    <div className="flex flex-col gap-6 px-6 pb-24 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extralight tracking-wider text-foreground/90">{t("media.title")}</h1>
        <span className="text-xs font-light text-foreground/30">
          {items.length} {filter === "photos" ? t("media.photos") : t("media.videos")}
        </span>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-0.5 self-start rounded-2xl glass p-1">
        {(["photos", "videos"] as MediaFilter[]).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => { setFilter(f); setSelectedId(null) }}
            className={`rounded-xl px-4 py-2 text-xs font-light tracking-wider transition-all duration-300 ${
              filter === f ? "bg-foreground text-primary-foreground shadow-sm" : "text-foreground/40 hover:text-foreground/60"
            }`}
          >
            {t(`media.${f}`)}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className={`grid gap-1.5 ${filter === "photos" ? "grid-cols-3" : "grid-cols-2"}`}>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
            className={`group relative overflow-hidden rounded-xl transition-all duration-300 active:scale-[0.97] ${
              filter === "photos" ? "aspect-square" : "aspect-video"
            } ${selectedId === item.id ? "ring-1 ring-foreground/20" : ""}`}
            style={{ backgroundImage: `linear-gradient(${item.gradient})` }}
            aria-label={item.label}
          >
            {/* Video play icon overlay */}
            {"duration" in item && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10 backdrop-blur-sm">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-foreground/50">
                    <polygon points="8,5 20,12 8,19" fill="currentColor" />
                  </svg>
                </div>
                <span className="absolute bottom-2 right-2 rounded-full bg-foreground/10 px-2 py-0.5 text-[9px] font-light text-foreground/40 backdrop-blur-sm">
                  {item.duration}
                </span>
              </div>
            )}
            {/* Hover label */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <span className="text-[10px] font-light text-foreground/60">{item.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Selected detail */}
      {selectedId !== null && (
        <div className="animate-slide-up rounded-2xl glass p-4 opacity-0">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-light text-foreground/60">
                {items.find((i) => i.id === selectedId)?.label}
              </span>
              <span className="text-[10px] font-light text-foreground/25">Captured via Machaview</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-full glass p-2 transition-all active:scale-[0.95]"
                aria-label="Share"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-foreground/40">
                  <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
              <button
                type="button"
                className="rounded-full glass p-2 transition-all active:scale-[0.95]"
                aria-label="Delete"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-foreground/40">
                  <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Capture CTA */}
      <button
        type="button"
        className="mt-2 flex items-center justify-center gap-2 self-center rounded-full glass px-5 py-2.5 text-xs font-light tracking-wider text-foreground/50 transition-all active:scale-[0.97]"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-foreground/40">
          <rect x="2" y="6" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.2" />
          <path d="M15 2h-6l-1 4h8l-1-4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
        {t("media.captureFirst")}
      </button>
    </div>
  )
}
