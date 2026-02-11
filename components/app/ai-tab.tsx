"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useI18n } from "@/lib/i18n-context"

interface Message {
  role: "user" | "ai"
  text: string
}

const knowledgeBase: Record<string, string> = {
  machaview:
    "Machaview is the next-generation AI smart glasses platform by Paggy Industries. It features a 1080p transparent AR HUD, 12-hour battery life, bone conduction audio, real-time translation in 40+ languages, voice commands, AR navigation, danger alerts, and a companion app. It is designed to seamlessly augment your daily life with invisible intelligence.",
  battery:
    "Machaview features a 12-hour battery life powered by a custom high-density lithium-polymer cell. Fast charging via USB-C gets you 4 hours of use from just 20 minutes of charging.",
  display:
    "The display is a 1080p transparent AR HUD that overlays digital information directly onto your field of view. It uses advanced waveguide optics for clear, bright visuals even in direct sunlight.",
  audio:
    "Machaview uses bone conduction audio technology, delivering clear sound directly through your cheekbones without blocking ambient noise. This ensures you stay aware of your surroundings at all times.",
  translation:
    "Real-time translation supports 40+ languages with subtitle overlay on the HUD. Simply look at text or listen to speech, and Machaview translates instantly with minimal latency.",
  navigation:
    "AR Navigation overlays directional arrows and waypoints directly onto your real-world view. Turn-by-turn guidance, points of interest, and distance indicators are all displayed on the HUD.",
  danger:
    "The safety alert system uses AI-powered computer vision to detect potential hazards including approaching vehicles, obstacles, and unsafe conditions, delivering instant visual and audio warnings.",
  night:
    "Night vision mode uses advanced image processing to enhance visibility in low-light conditions. A subtle green overlay provides improved contrast and clarity without eye strain.",
  bluetooth:
    "Machaview connects via Bluetooth 5.3 for low-latency, energy-efficient pairing with your smartphone. It supports seamless handoff between devices and maintains stable connections up to 30 meters.",
  subscription:
    "The Machaview Cloud AI subscription is $199/year and includes unlimited AI cloud processing, over-the-air firmware updates, priority customer support, and access to the full AR app marketplace.",
  company:
    "Paggy Industries is a 2026 vision technology startup focused on building the most seamless augmented reality ecosystem. Founded with the mission to bring intelligent eyewear to 1 billion people by 2030.",
  zoom:
    "Machaview supports digital zoom from 1x to 5x, controlled by voice command or temple gestures. The zoom is smooth and stabilized, perfect for reading distant signs or observing details.",
  voice:
    "Voice commands let you control every aspect of Machaview hands-free. Supported commands include navigation, translation, photo/video capture, AI queries, and accessibility features.",
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
  return `I'd be happy to help! Machaview is a cutting-edge AI smart glasses platform. You can ask me about the display, battery, audio, translation, navigation, safety features, night vision, zoom, voice commands, capture, companion app, subscription model, or about Paggy Industries.`
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-foreground/30 animate-typing-dot"
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
    }, 12)
    return () => clearInterval(interval)
  }, [text])

  return <>{displayed}</>
}

export function AITab() {
  const { t } = useI18n()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const [latestAiIndex, setLatestAiIndex] = useState(-1)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, isThinking])

  const handleSend = useCallback(() => {
    if (!input.trim() || isThinking) return
    const userMsg: Message = { role: "user", text: input.trim() }
    const response = findResponse(input.trim())
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsThinking(true)

    setTimeout(() => {
      const aiMsg: Message = { role: "ai", text: response }
      setMessages((prev) => {
        setLatestAiIndex(prev.length)
        return [...prev, aiMsg]
      })
      setIsThinking(false)
    }, 1200 + Math.random() * 800)
  }, [input, isThinking])

  return (
    <div className="flex h-full flex-col pt-4">
      {/* Header */}
      <div className="flex items-center justify-center px-6 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="h-2 w-2 animate-breathing rounded-full bg-emerald-400/60" />
          <span className="text-sm font-light tracking-wider text-foreground/70">{t("ai.title")}</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6">
        {messages.length === 0 && !isThinking && (
          <div className="flex h-full flex-col items-center justify-center gap-4 pb-20">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl glass">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground/30">
                <circle cx="12" cy="12" r="3" fill="currentColor" />
                <path d="M12 2v4m0 12v4m10-10h-4M6 12H2m15.07-7.07l-2.83 2.83M9.76 14.24l-2.83 2.83m0-10.14l2.83 2.83m4.48 4.48l2.83 2.83" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <p className="max-w-[220px] text-center text-xs font-light leading-relaxed text-foreground/30">
              {t("ai.placeholder")}
            </p>
            {/* Suggestion chips */}
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {["What is Machaview?", "Battery life?", "Night vision?"].map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => { setInput(q); }}
                  className="rounded-full glass px-3 py-1.5 text-[10px] font-light tracking-wider text-foreground/40 transition-all hover:text-foreground/60 active:scale-[0.97]"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 pb-4">
          {messages.map((msg, i) => (
            <div
              key={`msg-${i}-${msg.role}`}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-slide-up`}
              style={{ animationDelay: "0.05s" }}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-foreground text-primary-foreground"
                    : "glass"
                }`}
              >
                <p className="text-sm font-light leading-relaxed text-foreground/80">
                  {msg.role === "ai" && i === latestAiIndex ? <TypedText text={msg.text} /> : msg.text}
                </p>
              </div>
            </div>
          ))}
          {isThinking && (
            <div className="flex justify-start animate-slide-up">
              <div className="rounded-2xl glass px-4 py-3.5">
                <TypingDots />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border/50 bg-background/80 p-4 backdrop-blur-lg">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={t("ai.placeholder")}
            className="flex-1 rounded-xl border border-border bg-card/50 px-4 py-3 text-sm font-light text-foreground/90 backdrop-blur-sm placeholder:text-foreground/20 focus:border-foreground/20 focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || isThinking}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-foreground text-primary-foreground shadow-lg shadow-foreground/5 transition-all disabled:opacity-30 active:scale-[0.97]"
            aria-label="Send message"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M22 2L15 22l-4-9-9-4L22 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
