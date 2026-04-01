"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useI18n } from "@/lib/i18n-context"
import { useSustainability } from "@/lib/sustainability-context"

interface Message {
  id: number
  role: "user" | "ai"
  text: string
}

const knowledgeBase: Record<string, string> = {
  machaview:
    "Machaview is the next-generation AI smart glasses platform by Paggy Industries. It features a 1080p transparent AR HUD, 12-hour battery life, bone conduction audio, real-time translation in 40+ languages, voice commands, AR navigation, danger alerts, and a companion app.",
  battery:
    "Machaview features a 12-hour battery life powered by a custom high-density lithium-polymer cell. Fast charging via USB-C gives you 4 hours of use from just 20 minutes of charging.",
  display:
    "The display is a 1080p transparent AR HUD that overlays digital information directly onto your field of view. It uses advanced waveguide optics for clear, bright visuals even in direct sunlight.",
  audio:
    "Machaview uses bone conduction audio technology, delivering clear sound directly through your cheekbones without blocking ambient noise — keeping you fully aware of your surroundings.",
  translation:
    "Real-time translation supports 40+ languages with subtitle overlay on the HUD. Simply look at text or listen to speech, and Machaview translates instantly with minimal latency.",
  navigation:
    "AR Navigation overlays directional arrows and waypoints directly onto your real-world view. Turn-by-turn guidance, points of interest, and distance indicators are all displayed on the HUD.",
  danger:
    "The safety alert system uses AI-powered computer vision to detect potential hazards including approaching vehicles, obstacles, and unsafe conditions, delivering instant visual and audio warnings.",
  night:
    "Night vision mode uses advanced image processing to enhance visibility in low-light conditions. A subtle green overlay provides improved contrast and clarity without eye strain.",
  bluetooth:
    "Machaview connects via Bluetooth 5.3 for low-latency, energy-efficient pairing with your smartphone. Stable connections up to 30 meters.",
  subscription:
    "The Machaview Cloud AI subscription is $199/year and includes unlimited AI cloud processing, over-the-air firmware updates, priority customer support, and access to the full AR app marketplace.",
  company:
    "Paggy Industries is a 2026 vision technology startup focused on building the most seamless augmented reality ecosystem. Founded with the mission to bring intelligent eyewear to 1 billion people by 2030.",
  zoom:
    "Machaview supports digital zoom from 1x to 5x, controlled by voice command or temple gestures. The zoom is smooth and stabilized.",
  voice:
    "Voice commands let you control every aspect of Machaview hands-free: navigation, translation, photo/video capture, AI queries, and accessibility features.",
  capture:
    "Capture photos and 4K video directly from your glasses with a simple voice command or temple tap. Media syncs automatically to the companion app via cloud.",
  companion:
    "The Machaview Companion App provides full device management, media gallery, AI chat history, firmware updates, gesture customization, and detailed device diagnostics.",
}

function findResponse(input: string): string {
  const lower = input.toLowerCase()
  if (lower.includes("what is machaview") || lower.includes("tell me about") || lower.includes("about machaview"))
    return knowledgeBase.machaview
  if (lower.includes("battery") || lower.includes("charge")) return knowledgeBase.battery
  if (lower.includes("display") || lower.includes("screen") || lower.includes("hud")) return knowledgeBase.display
  if (lower.includes("audio") || lower.includes("sound") || lower.includes("speaker")) return knowledgeBase.audio
  if (lower.includes("translat")) return knowledgeBase.translation
  if (lower.includes("navigat") || lower.includes("direction") || lower.includes("map")) return knowledgeBase.navigation
  if (lower.includes("danger") || lower.includes("safety") || lower.includes("alert")) return knowledgeBase.danger
  if (lower.includes("night") || lower.includes("dark") || lower.includes("vision")) return knowledgeBase.night
  if (lower.includes("bluetooth") || lower.includes("connect")) return knowledgeBase.bluetooth
  if (lower.includes("subscription") || lower.includes("price") || lower.includes("cost")) return knowledgeBase.subscription
  if (lower.includes("company") || lower.includes("paggy") || lower.includes("who made")) return knowledgeBase.company
  if (lower.includes("zoom")) return knowledgeBase.zoom
  if (lower.includes("voice") || lower.includes("command")) return knowledgeBase.voice
  if (lower.includes("capture") || lower.includes("photo") || lower.includes("video") || lower.includes("camera"))
    return knowledgeBase.capture
  if (lower.includes("companion") || lower.includes("app")) return knowledgeBase.companion
  return "I can help with any question about Machaview. Try asking about the display, battery, audio, translation, navigation, safety features, night vision, zoom, voice commands, capture, companion app, or subscription."
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-[5px] w-[5px] rounded-full bg-foreground/25 animate-typing-dot"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  )
}

function TypedText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("")

  useEffect(() => {
    if (!text) return
    let i = 0
    setDisplayed("")
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(interval)
    }, 14)
    return () => clearInterval(interval)
  }, [text])

  return <>{displayed}</>
}

export function AITab() {
  const { t } = useI18n()
  const { incrementAiQuery, lowImpactMode } = useSustainability()
  const SUGGESTIONS = [t("ai.suggestion1"), t("ai.suggestion2"), t("ai.suggestion3"), t("ai.suggestion4")]
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const [latestAiIndex, setLatestAiIndex] = useState(-1)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, isThinking])

  // Autofocus input on mount
  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 300)
    return () => clearTimeout(timer)
  }, [])

  const sendMessage = useCallback((text: string) => {
    if (!text.trim() || isThinking) return
    const userMsg: Message = { id: Date.now(), role: "user", text: text.trim() }
    const response = findResponse(text.trim())
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsThinking(true)
    incrementAiQuery()

    setTimeout(() => {
      const aiMsg: Message = { id: Date.now() + 1, role: "ai", text: response }
      setMessages((prev) => {
        setLatestAiIndex(prev.length)
        return [...prev, aiMsg]
      })
      setIsThinking(false)
      setTimeout(() => inputRef.current?.focus(), 50)
    }, 700 + Math.random() * 500)
  }, [isThinking, incrementAiQuery])

  const handleSend = useCallback(() => sendMessage(input), [input, sendMessage])

  const isEmpty = messages.length === 0 && !isThinking

  return (
    <div className="flex h-full flex-col">

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 pb-3 pt-5">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 animate-breathing rounded-full bg-emerald-400/70" />
          <span className="text-sm font-light tracking-wider text-foreground/70">{t("ai.title")}</span>
        </div>
        {messages.length > 0 && (
          <button
            type="button"
            onClick={() => { setMessages([]); setLatestAiIndex(-1) }}
            className="text-[10px] font-light tracking-wider text-foreground/40 transition-colors hover:text-foreground/70"
          >
            {t("ai.clear")}
          </button>
        )}
      </div>

      {/* ── Messages ── */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5">

        {/* Empty state */}
        {isEmpty && (
          <div className="flex h-full flex-col items-center justify-center gap-5 pb-16">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl glass">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-foreground/28">
                <circle cx="12" cy="12" r="3" fill="currentColor" />
                <path d="M12 2v4m0 12v4m10-10h-4M6 12H2m15.07-7.07l-2.83 2.83M9.76 14.24l-2.83 2.83m0-10.14l2.83 2.83m4.48 4.48l2.83 2.83" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-sm font-light text-foreground/40">{t("ai.title")}</p>
              <p className="max-w-[200px] text-center text-[11px] font-light leading-relaxed text-foreground/22">
                {t("ai.placeholder")}
              </p>
            </div>
            {/* Suggestion chips */}
            <div className="flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => sendMessage(q)}
                  className="rounded-full border border-border/60 bg-card/40 px-3.5 py-1.5 text-[11px] font-light tracking-wide text-foreground/40 transition-all hover:border-border hover:text-foreground/70 active:scale-[0.97]"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message list */}
        <div className="flex flex-col gap-2.5 pb-4 pt-1">
          {messages.map((msg, i) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-slide-up`}
              style={{ animationDelay: "0.03s" }}
            >
              <div
                className={`max-w-[82%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "rounded-br-sm bg-foreground text-primary-foreground"
                    : "rounded-bl-sm glass text-foreground/80"
                }`}
              >
                <p className="text-[13px] font-light leading-relaxed">
                  {msg.role === "ai" && i === latestAiIndex && !lowImpactMode
                    ? <TypedText text={msg.text} />
                    : msg.text}
                </p>
              </div>
            </div>
          ))}
          {isThinking && (
            <div className="flex justify-start animate-slide-up">
              <div className="rounded-2xl rounded-bl-sm glass px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] font-light text-foreground/35">{t("ai.thinking")}</span>
                  <TypingDots />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Input ── */}
      <div className="border-t border-border/30 bg-background/90 px-4 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={messages.length > 0 ? "Ask a follow-up..." : t("ai.placeholder")}
            className="flex-1 rounded-xl border border-border/60 bg-card/40 px-4 py-2.5 text-[13px] font-light text-foreground/90 backdrop-blur-sm placeholder:text-foreground/22 focus:border-foreground/25 focus:outline-none focus:ring-0 transition-colors"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || isThinking}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground text-primary-foreground shadow-sm transition-all disabled:opacity-25 active:scale-[0.95]"
            aria-label="Send message"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M22 2L15 22l-4-9-9-4L22 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  )
}
