"use client"

import { useState } from "react"
import Link from "next/link"

const metrics = [
  { label: "Pre-Seed Valuation", value: "$4.5M" },
  { label: "Raising", value: "$1.2M" },
  { label: "Pre-orders", value: "2,400+" },
  { label: "Waitlist", value: "18,000+" },
  { label: "TAM (Smart Glasses)", value: "$14.3B" },
  { label: "YoY Growth", value: "42%" },
]

const milestones = [
  { quarter: "Q1 2026", title: "Prototype Alpha", status: "done", desc: "Core optics + AI pipeline validated" },
  { quarter: "Q2 2026", title: "Dev Kit Launch", status: "done", desc: "50 dev kits shipped to partners" },
  { quarter: "Q3 2026", title: "Beta Program", status: "current", desc: "500-unit closed beta in Bangkok" },
  { quarter: "Q4 2026", title: "Pre-order Fulfillment", status: "upcoming", desc: "First 2,400 units ship to backers" },
  { quarter: "Q1 2027", title: "Retail Launch", status: "upcoming", desc: "SEA market launch via partner channels" },
  { quarter: "Q2 2027", title: "Series A", status: "upcoming", desc: "Scale to APAC & global expansion" },
]

const teamMembers = [
  { name: "Paggy Sornchai", role: "CEO & Founder", bg: "Former Lead Engineer at Meta Reality Labs" },
  { name: "Dr. Krit Tanaka", role: "CTO", bg: "PhD Optics, Stanford. Ex-Apple Vision Pro team" },
  { name: "Nara Lim", role: "VP Product", bg: "Former PM at Snap Spectacles" },
  { name: "James Chen", role: "VP Engineering", bg: "Ex-Google Glass, 12 years in AR/VR" },
]

const useCases = [
  { title: "Tourism & Travel", desc: "Real-time translation overlays for 200M+ annual SE Asian tourists", icon: GlobeIcon },
  { title: "Enterprise & Logistics", desc: "Hands-free SOPs, inventory scanning, safety compliance", icon: BuildingIcon },
  { title: "Healthcare", desc: "Patient data overlay, surgical assistance, remote consultation", icon: HeartIcon },
  { title: "Education", desc: "Interactive learning overlays, field trip augmentation", icon: BookIcon },
]

export default function InvestorPage() {
  const [contactOpen, setContactOpen] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  return (
    <div className="min-h-dvh bg-background">
      {/* Navigation */}
      <header className="fixed top-0 z-50 flex w-full items-center justify-between px-6 py-4 backdrop-blur-md md:px-12">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="h-2 w-2 rounded-full bg-foreground/30" />
          <span className="text-[11px] font-light tracking-[0.25em] text-foreground/50 uppercase">
            Machaview
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-[9px] font-light tracking-[0.2em] text-amber-400/80 uppercase">
            Confidential
          </span>
          <Link
            href="/"
            className="rounded-full border border-foreground/[0.08] px-4 py-1.5 text-[10px] font-light tracking-widest text-foreground/35 uppercase transition-all hover:text-foreground/60"
          >
            Home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-dvh flex-col items-center justify-center px-6">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 35%, hsl(0 0% 8%) 0%, hsl(0 0% 2%) 70%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col items-center gap-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <span className="text-[10px] font-light tracking-[0.3em] text-foreground/25 uppercase">
              Investor Deck - Pre-Seed Round
            </span>
            <div className="h-px w-16 bg-foreground/10" />
            <h1 className="text-balance text-4xl font-extralight tracking-wider text-foreground/85 md:text-6xl lg:text-7xl">
              The Future of
              <br />
              <span className="text-foreground/60">Augmented Vision</span>
            </h1>
            <p className="max-w-lg text-sm font-extralight leading-relaxed tracking-wide text-foreground/35 md:text-base">
              Machaview is building AI-powered smart glasses that bring real-time translation,
              contextual intelligence, and seamless HUD interaction to everyday life.
            </p>
            <div className="h-px w-16 bg-foreground/10" />
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="rounded-full border border-foreground/15 bg-foreground/[0.07] px-7 py-3 text-[11px] font-light tracking-widest text-foreground/60 uppercase backdrop-blur-sm transition-all hover:bg-foreground/10 hover:text-foreground/80"
            >
              Request Full Deck
            </button>
            <a
              href="#metrics"
              className="rounded-full border border-foreground/[0.08] px-7 py-3 text-[11px] font-light tracking-widest text-foreground/35 uppercase transition-all hover:text-foreground/60"
            >
              View Metrics
            </a>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section id="metrics" className="border-t border-foreground/[0.05] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-5xl">
          <SectionHeader tag="Traction" title="Key Metrics" />
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="group rounded-2xl border border-foreground/[0.05] bg-foreground/[0.02] p-6 transition-all duration-300 hover:border-foreground/[0.1] hover:bg-foreground/[0.04]"
              >
                <p className="text-2xl font-extralight tracking-wider text-foreground/70 md:text-3xl">
                  {m.value}
                </p>
                <p className="mt-2 text-[10px] font-light tracking-[0.15em] text-foreground/30 uppercase">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="px-6 py-24 md:px-12">
        <div className="mx-auto max-w-5xl">
          <SectionHeader tag="Thesis" title="Problem & Solution" />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-foreground/[0.05] bg-foreground/[0.02] p-8">
              <span className="text-[10px] font-light tracking-[0.2em] text-red-400/60 uppercase">Problem</span>
              <h3 className="mt-3 text-lg font-extralight tracking-wide text-foreground/65">
                Language barriers cost $3.2B annually in SE Asian tourism alone
              </h3>
              <p className="mt-3 text-xs font-extralight leading-relaxed text-foreground/30">
                Existing solutions require pulling out a phone, breaking natural interaction.
                Current smart glasses are bulky, expensive, and lack real-time AI capabilities
                needed for practical daily use.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.02] p-8">
              <span className="text-[10px] font-light tracking-[0.2em] text-emerald-400/60 uppercase">Solution</span>
              <h3 className="mt-3 text-lg font-extralight tracking-wide text-foreground/65">
                Lightweight AI glasses with real-time HUD translation
              </h3>
              <p className="mt-3 text-xs font-extralight leading-relaxed text-foreground/30">
                At 38g with 12-hour battery life, Machaview delivers instant translation,
                contextual AI, and hands-free navigation through a transparent MicroLED display
                that feels invisible to wear.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-6 py-24 md:px-12">
        <div className="mx-auto max-w-5xl">
          <SectionHeader tag="Markets" title="Target Verticals" />
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="group flex items-start gap-4 rounded-2xl border border-foreground/[0.05] bg-foreground/[0.02] p-6 transition-all duration-300 hover:border-foreground/[0.1]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground/[0.04]">
                  <uc.icon />
                </div>
                <div>
                  <h3 className="text-sm font-light tracking-wide text-foreground/60">{uc.title}</h3>
                  <p className="mt-1 text-[11px] font-extralight leading-relaxed text-foreground/30">{uc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="border-t border-foreground/[0.05] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-4xl">
          <SectionHeader tag="Execution" title="Product Roadmap" />
          <div className="mt-12 flex flex-col gap-4">
            {milestones.map((ms) => (
              <div
                key={ms.quarter}
                className={`flex items-start gap-5 rounded-2xl border p-5 transition-all ${
                  ms.status === "current"
                    ? "border-emerald-500/15 bg-emerald-500/[0.03]"
                    : ms.status === "done"
                      ? "border-foreground/[0.08] bg-foreground/[0.03]"
                      : "border-foreground/[0.04] bg-foreground/[0.01]"
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs font-light tracking-wider text-foreground/40">{ms.quarter}</span>
                  {ms.status === "done" && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-emerald-400/60">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {ms.status === "current" && (
                    <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400/50" />
                  )}
                  {ms.status === "upcoming" && (
                    <div className="h-2 w-2 rounded-full bg-foreground/10" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-light tracking-wide text-foreground/60">{ms.title}</h3>
                  <p className="mt-0.5 text-[11px] font-extralight text-foreground/30">{ms.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 py-24 md:px-12">
        <div className="mx-auto max-w-5xl">
          <SectionHeader tag="People" title="Leadership Team" />
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            {teamMembers.map((tm) => (
              <div
                key={tm.name}
                className="rounded-2xl border border-foreground/[0.05] bg-foreground/[0.02] p-6 transition-all duration-300 hover:border-foreground/[0.1]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/[0.06]">
                    <span className="text-xs font-light text-foreground/40">
                      {tm.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-light tracking-wide text-foreground/65">{tm.name}</h3>
                    <p className="text-[10px] font-light tracking-wider text-foreground/35">{tm.role}</p>
                  </div>
                </div>
                <p className="mt-3 text-[11px] font-extralight leading-relaxed text-foreground/30">{tm.bg}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-foreground/[0.05] px-6 py-24">
        <div className="flex flex-col items-center gap-6 text-center">
          <span className="text-[10px] font-light tracking-[0.3em] text-foreground/25 uppercase">
            Join the Round
          </span>
          <h2 className="text-balance text-2xl font-extralight tracking-wider text-foreground/65 md:text-3xl">
            Building the next computing platform
          </h2>
          <p className="max-w-md text-xs font-extralight leading-relaxed text-foreground/30">
            We are raising $1.2M to scale manufacturing, expand our AI pipeline,
            and launch across SE Asia in Q4 2026.
          </p>
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="rounded-full border border-foreground/15 bg-foreground/[0.07] px-8 py-3 text-[11px] font-light tracking-widest text-foreground/60 uppercase backdrop-blur-sm transition-all hover:bg-foreground/10 hover:text-foreground/80"
          >
            Get in Touch
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
          Confidential. For qualified investors only.
        </p>
      </footer>

      {/* Contact Modal */}
      {contactOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => { setContactOpen(false); setFormSubmitted(false) }}
            onKeyDown={(e) => e.key === "Escape" && setContactOpen(false)}
            role="button"
            tabIndex={0}
            aria-label="Close dialog"
          />
          <div className="animate-modal-in relative w-full max-w-md rounded-3xl border border-foreground/[0.08] bg-card p-8 opacity-0 shadow-2xl">
            {formSubmitted ? (
              <div className="flex flex-col items-center gap-4 py-4 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-emerald-400">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-lg font-extralight tracking-wider text-foreground/70">Request Received</h3>
                <p className="text-xs font-extralight leading-relaxed text-foreground/35">
                  {"Our team will reach out within 24 hours with the full investor deck and data room access."}
                </p>
                <button
                  type="button"
                  onClick={() => { setContactOpen(false); setFormSubmitted(false) }}
                  className="mt-2 rounded-full border border-foreground/[0.08] px-6 py-2.5 text-[11px] font-light tracking-widest text-foreground/50 uppercase transition-all hover:text-foreground/70"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true) }}
                className="flex flex-col gap-5"
              >
                <div>
                  <h3 className="text-lg font-extralight tracking-wider text-foreground/70">Request Investor Deck</h3>
                  <p className="mt-1 text-xs font-extralight text-foreground/30">
                    We will send the full deck, financials, and data room link.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Full name"
                    required
                    className="rounded-xl border border-foreground/[0.08] bg-foreground/[0.03] px-4 py-3 text-sm font-light text-foreground/70 placeholder:text-foreground/20 focus:border-foreground/20 focus:outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    required
                    className="rounded-xl border border-foreground/[0.08] bg-foreground/[0.03] px-4 py-3 text-sm font-light text-foreground/70 placeholder:text-foreground/20 focus:border-foreground/20 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Fund / Organization"
                    className="rounded-xl border border-foreground/[0.08] bg-foreground/[0.03] px-4 py-3 text-sm font-light text-foreground/70 placeholder:text-foreground/20 focus:border-foreground/20 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-xl bg-foreground/10 py-3 text-sm font-light tracking-wider text-foreground/60 transition-all hover:bg-foreground/15"
                >
                  Submit Request
                </button>
                <button
                  type="button"
                  onClick={() => setContactOpen(false)}
                  className="text-xs font-extralight text-foreground/25 transition-colors hover:text-foreground/40"
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function SectionHeader({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="text-center">
      <span className="text-[10px] font-light tracking-[0.3em] text-foreground/25 uppercase">{tag}</span>
      <h2 className="mt-3 text-balance text-2xl font-extralight tracking-wider text-foreground/70 md:text-3xl">
        {title}
      </h2>
    </div>
  )
}

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-foreground/35">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

function BuildingIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-foreground/35">
      <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M9 22V18h6v4M9 6h2M13 6h2M9 10h2M13 10h2M9 14h2M13 14h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-foreground/35">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}

function BookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-foreground/35">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
