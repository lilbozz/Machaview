"use client"

import { useState, useEffect } from "react"

type Section = "landing" | "hud" | "app"

interface LandingHeroProps {
  onNavigate: (section: Section) => void
}

const features = [
  { title: "Real-time Translation", desc: "TH / EN / CN live subtitle overlay" },
  { title: "AI Vision", desc: "Context-aware object and scene recognition" },
  { title: "Navigation", desc: "Transparent directional HUD overlay" },
  { title: "Danger Detection", desc: "AI-powered safety alerts in real time" },
  { title: "Capture", desc: "Hands-free photo and video recording" },
  { title: "Bone Conduction Audio", desc: "Private audio through temple transducers" },
]

export function LandingHero({ onNavigate }: LandingHeroProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="h-dvh overflow-y-auto">
      {/* Fixed nav */}
      <header
        className={`fixed top-0 z-50 flex w-full items-center justify-between px-6 py-4 transition-all duration-500 md:px-12 ${
          scrolled ? "bg-background/80 backdrop-blur-md" : ""
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-foreground/30" />
          <span className="text-[11px] font-light tracking-[0.25em] text-foreground/50 uppercase">
            Machaview
          </span>
        </div>
        <span className="text-[10px] font-extralight tracking-widest text-foreground/25 uppercase">
          by Paggy Industries
        </span>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-dvh flex-col items-center justify-center px-6">
        {/* Subtle radial backdrop */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, hsl(0 0% 8%) 0%, hsl(0 0% 2%) 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col items-center gap-8 text-center">
          {/* Product name */}
          <div className="flex flex-col items-center gap-3">
            <div className="h-px w-12 bg-foreground/10" />
            <h1 className="text-balance text-5xl font-extralight tracking-wider text-foreground/85 md:text-7xl lg:text-8xl">
              Machaview
            </h1>
            <p className="text-sm font-extralight tracking-[0.3em] text-foreground/35 uppercase md:text-base">
              See Smarter. Live Seamless.
            </p>
            <div className="h-px w-12 bg-foreground/10" />
          </div>

          {/* Description */}
          <p className="max-w-md text-sm font-extralight leading-relaxed tracking-wide text-foreground/30 md:text-base">
            AI-powered smart glasses with real-time translation, context-aware intelligence,
            and a seamless HUD interface designed for how you actually live.
          </p>

          {/* CTA buttons */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate("hud")}
              className="rounded-full border border-foreground/15 bg-foreground/[0.07] px-6 py-2.5 text-[11px] font-light tracking-widest text-foreground/60 uppercase backdrop-blur-sm transition-all hover:bg-foreground/10 hover:text-foreground/80"
            >
              Experience HUD
            </button>
            <button
              type="button"
              onClick={() => onNavigate("app")}
              className="rounded-full border border-foreground/[0.08] px-6 py-2.5 text-[11px] font-light tracking-widest text-foreground/35 uppercase transition-all hover:text-foreground/60"
            >
              Companion App
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 flex flex-col items-center gap-2">
          <div className="h-8 w-px bg-foreground/[0.08]" />
          <span className="text-[8px] font-extralight tracking-[0.3em] text-foreground/15 uppercase">
            Scroll
          </span>
        </div>
      </section>

      {/* Features grid */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <p className="text-[10px] font-light tracking-[0.3em] text-foreground/25 uppercase">
              Capabilities
            </p>
            <h2 className="mt-3 text-balance text-3xl font-extralight tracking-wider text-foreground/70 md:text-4xl">
              Intelligence, everywhere you look
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-foreground/[0.05] bg-foreground/[0.02] p-6 transition-all duration-300 hover:border-foreground/[0.1] hover:bg-foreground/[0.04]"
              >
                <div className="mb-4 h-px w-6 bg-foreground/10 transition-all duration-300 group-hover:w-10 group-hover:bg-foreground/20" />
                <h3 className="text-sm font-light tracking-wide text-foreground/60">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-[12px] font-extralight leading-relaxed text-foreground/30">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scenarios */}
      <section className="px-6 py-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <p className="text-[10px] font-light tracking-[0.3em] text-foreground/25 uppercase">
              Real-world scenarios
            </p>
            <h2 className="mt-3 text-balance text-3xl font-extralight tracking-wider text-foreground/70 md:text-4xl">
              AI that sees what you see
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            <ScenarioCard
              num="01"
              title="Look at a building"
              desc="AI identifies the Grand Palace, provides historical context, ratings, and opening hours."
            />
            <ScenarioCard
              num="02"
              title="Glance at a menu"
              desc="Real-time translation from Thai to English appears as a floating subtitle overlay."
            />
            <ScenarioCard
              num="03"
              title="Read a document"
              desc="AI summarizes key points: revenue up 23%, APAC expansion driving growth."
            />
            <ScenarioCard
              num="04"
              title='Say "Reply to John"'
              desc='A message draft appears in your field of view. Blink to confirm, voice to edit.'
            />
          </div>
        </div>
      </section>

      {/* Specs strip */}
      <section className="border-t border-foreground/[0.05] px-6 py-20 md:px-12">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-12">
          {[
            { label: "Weight", value: "38g" },
            { label: "Battery", value: "12h" },
            { label: "Display", value: "MicroLED" },
            { label: "Audio", value: "Bone Conduction" },
            { label: "Design", value: "Foldable" },
          ].map((spec) => (
            <div key={spec.label} className="text-center">
              <p className="text-lg font-extralight tracking-wider text-foreground/55">{spec.value}</p>
              <p className="mt-0.5 text-[9px] font-light tracking-[0.2em] text-foreground/20 uppercase">{spec.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="flex flex-col items-center gap-6 px-6 py-24">
        <h2 className="text-balance text-center text-2xl font-extralight tracking-wider text-foreground/60 md:text-3xl">
          Ready to see the future?
        </h2>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onNavigate("hud")}
            className="rounded-full border border-foreground/15 bg-foreground/[0.07] px-6 py-2.5 text-[11px] font-light tracking-widest text-foreground/60 uppercase backdrop-blur-sm transition-all hover:bg-foreground/10 hover:text-foreground/80"
          >
            Try the HUD
          </button>
          <button
            type="button"
            onClick={() => onNavigate("app")}
            className="rounded-full border border-foreground/[0.08] px-6 py-2.5 text-[11px] font-light tracking-widest text-foreground/35 uppercase transition-all hover:text-foreground/60"
          >
            View App
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col items-center gap-2 border-t border-foreground/[0.04] px-6 py-10">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
          <span className="text-[10px] font-light tracking-[0.2em] text-foreground/25 uppercase">
            Machaview by Paggy Industries
          </span>
        </div>
        <p className="text-[9px] font-extralight tracking-wider text-foreground/15">
          See Smarter. Live Seamless.
        </p>
      </footer>
    </div>
  )
}

function ScenarioCard({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="group flex items-start gap-5 rounded-2xl border border-foreground/[0.05] bg-foreground/[0.02] p-6 transition-all duration-300 hover:border-foreground/[0.1] hover:bg-foreground/[0.04]">
      <span className="text-2xl font-extralight tracking-wider text-foreground/15">{num}</span>
      <div>
        <h3 className="text-sm font-light tracking-wide text-foreground/60">{title}</h3>
        <p className="mt-1.5 text-[12px] font-extralight leading-relaxed text-foreground/30">{desc}</p>
      </div>
    </div>
  )
}
