"use client"

import React from "react"

import { useState } from "react"

type Tab = "home" | "assistant" | "gallery" | "settings"

export function CompanionApp() {
  const [activeTab, setActiveTab] = useState<Tab>("home")

  return (
    <div className="mx-auto h-[700px] w-[340px] overflow-hidden rounded-[2.5rem] border border-foreground/[0.08] bg-background shadow-2xl">
      {/* Phone status bar */}
      <div className="flex items-center justify-between px-6 pt-3 pb-1">
        <span className="text-[10px] font-light text-foreground/40">9:41</span>
        <div className="h-5 w-20 rounded-full bg-foreground/[0.08]" />
        <div className="flex items-center gap-1">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-foreground/40">
            <path d="M12 19.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill="currentColor" />
            <path d="M8.46 15.54a5 5 0 017.08 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M5.29 12.37a9 9 0 0113.42 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <svg width="14" height="10" viewBox="0 0 20 10" fill="none" className="text-foreground/40">
            <rect x="0.5" y="0.5" width="16" height="9" rx="2" stroke="currentColor" strokeWidth="1" />
            <rect x="2" y="2" width="10" height="6" rx="1" fill="currentColor" />
            <rect x="17.5" y="3" width="2" height="4" rx="0.5" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* App content area */}
      <div className="flex h-[calc(100%-7rem)] flex-col overflow-y-auto px-5 pt-4">
        {activeTab === "home" && <HomeTab />}
        {activeTab === "assistant" && <AssistantTab />}
        {activeTab === "gallery" && <GalleryTab />}
        {activeTab === "settings" && <SettingsTab />}
      </div>

      {/* Bottom tab bar */}
      <nav className="flex items-center justify-around border-t border-foreground/[0.05] bg-background px-2 pb-6 pt-2">
        {(
          [
            { id: "home" as Tab, label: "Home", icon: HomeIcon },
            { id: "assistant" as Tab, label: "AI", icon: AIIcon },
            { id: "gallery" as Tab, label: "Gallery", icon: GalleryIcon },
            { id: "settings" as Tab, label: "Settings", icon: SettingsIcon },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-0.5 transition-colors ${
              activeTab === tab.id ? "text-foreground/70" : "text-foreground/25"
            }`}
          >
            <tab.icon />
            <span className="text-[9px] font-light tracking-wider">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

function HomeTab() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-light tracking-wide text-foreground/80">Machaview</h2>
        <p className="text-[11px] font-extralight tracking-wider text-foreground/35">Connected</p>
      </div>

      {/* Device card */}
      <div className="rounded-2xl border border-foreground/[0.06] bg-foreground/[0.03] p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-light tracking-wider text-foreground/40 uppercase">Device</p>
            <p className="mt-0.5 text-sm font-light text-foreground/65">Machaview Pro</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500/50" />
            <span className="text-[10px] font-extralight text-foreground/35">Active</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <StatBlock label="Battery" value="84%" />
          <StatBlock label="Storage" value="12.4 GB" />
          <StatBlock label="Firmware" value="v2.1.4" />
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        <QuickAction icon="Translate" label="Translation" desc="TH / EN / CN" />
        <QuickAction icon="Nav" label="Navigation" desc="Active route" />
        <QuickAction icon="Shield" label="Safety" desc="Always on" />
        <QuickAction icon="Music" label="Music" desc="Midnight City" />
      </div>

      {/* Recent activity */}
      <div>
        <p className="text-[10px] font-light tracking-widest text-foreground/30 uppercase">Recent Activity</p>
        <div className="mt-2 flex flex-col gap-2">
          <ActivityItem time="2m ago" text="AI identified Grand Palace, Bangkok" />
          <ActivityItem time="8m ago" text="Translated restaurant menu (TH to EN)" />
          <ActivityItem time="15m ago" text='Captured photo - "Sunset view"' />
          <ActivityItem time="1h ago" text="Navigation completed - Siam Paragon" />
        </div>
      </div>
    </div>
  )
}

function AssistantTab() {
  const conversations = [
    { time: "2:14 PM", query: "What building is this?", response: "Grand Palace, Bangkok. Built in 1782." },
    { time: "2:08 PM", query: "Translate this menu", response: "Pad Thai - fried noodles, Tom Yum - spicy soup..." },
    { time: "1:45 PM", query: "Summarize the email", response: "Meeting rescheduled to Thursday 3 PM. Budget approved." },
    { time: "1:30 PM", query: "Reply to John", response: 'Sent: "I\'ll review it this afternoon."' },
  ]

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-light tracking-wide text-foreground/80">AI Assistant</h2>
        <p className="text-[11px] font-extralight tracking-wider text-foreground/35">Chat history</p>
      </div>
      <div className="flex flex-col gap-3">
        {conversations.map((c, i) => (
          <div key={i} className="rounded-2xl border border-foreground/[0.06] bg-foreground/[0.03] p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-light tracking-wider text-foreground/30">{c.time}</span>
            </div>
            <p className="mt-1.5 text-xs font-light text-foreground/55 italic">{`"${c.query}"`}</p>
            <p className="mt-1 text-[11px] font-extralight leading-relaxed text-foreground/45">{c.response}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function GalleryTab() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-light tracking-wide text-foreground/80">Media Gallery</h2>
        <p className="text-[11px] font-extralight tracking-wider text-foreground/35">24 items</p>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-lg bg-foreground/[0.04]"
            style={{
              backgroundImage: `linear-gradient(${135 + i * 20}deg, hsl(0 0% ${4 + i}%) 0%, hsl(0 0% ${8 + i}%) 100%)`,
            }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-light tracking-wider text-foreground/30">Photos: 18</span>
        <span className="text-[10px] font-light tracking-wider text-foreground/30">Videos: 6</span>
      </div>
    </div>
  )
}

function SettingsTab() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-lg font-light tracking-wide text-foreground/80">Settings</h2>
      </div>

      <SettingsSection title="Language">
        <SettingsRow label="Primary" value="English" />
        <SettingsRow label="Translation" value="TH, EN, CN" />
        <SettingsRow label="Auto-detect" toggle />
      </SettingsSection>

      <SettingsSection title="Safety">
        <SettingsRow label="Danger alerts" toggle defaultOn />
        <SettingsRow label="Speed warnings" toggle defaultOn />
        <SettingsRow label="Alert sensitivity" value="High" />
      </SettingsSection>

      <SettingsSection title="Device">
        <SettingsRow label="Battery" value="84%" />
        <SettingsRow label="Firmware" value="v2.1.4" />
        <SettingsRow label="Day / Night mode" value="Auto" />
      </SettingsSection>

      <SettingsSection title="Gestures">
        <SettingsRow label="Blink to confirm" toggle defaultOn />
        <SettingsRow label="Nod to dismiss" toggle />
        <SettingsRow label="Double tap zoom" toggle defaultOn />
      </SettingsSection>

      <SettingsSection title="Display">
        <SettingsRow label="HUD opacity" value="60%" />
        <SettingsRow label="Text size" value="Medium" />
        <SettingsRow label="Dark / Light" value="Dark" />
      </SettingsSection>
    </div>
  )
}

// Sub-components

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-[9px] font-light tracking-widest text-foreground/30 uppercase">{label}</p>
      <p className="mt-0.5 text-sm font-light text-foreground/60">{value}</p>
    </div>
  )
}

function QuickAction({ icon, label, desc }: { icon: string; label: string; desc: string }) {
  return (
    <div className="rounded-xl border border-foreground/[0.06] bg-foreground/[0.03] p-3">
      <p className="text-[9px] font-light tracking-widest text-foreground/25 uppercase">{icon}</p>
      <p className="mt-1 text-xs font-light text-foreground/55">{label}</p>
      <p className="text-[10px] font-extralight text-foreground/30">{desc}</p>
    </div>
  )
}

function ActivityItem({ time, text }: { time: string; text: string }) {
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-foreground/[0.04] bg-foreground/[0.02] p-2.5">
      <span className="mt-0.5 text-[9px] font-extralight tracking-wider text-foreground/25 whitespace-nowrap">{time}</span>
      <span className="text-[11px] font-extralight leading-relaxed text-foreground/40">{text}</span>
    </div>
  )
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-light tracking-widest text-foreground/30 uppercase">{title}</p>
      <div className="mt-2 rounded-2xl border border-foreground/[0.06] bg-foreground/[0.03] divide-y divide-foreground/[0.04]">
        {children}
      </div>
    </div>
  )
}

function SettingsRow({
  label,
  value,
  toggle,
  defaultOn,
}: {
  label: string
  value?: string
  toggle?: boolean
  defaultOn?: boolean
}) {
  const [isOn, setIsOn] = useState(defaultOn ?? false)

  return (
    <div className="flex items-center justify-between px-3.5 py-2.5">
      <span className="text-[12px] font-light text-foreground/50">{label}</span>
      {toggle ? (
        <button
          type="button"
          onClick={() => setIsOn(!isOn)}
          className={`h-5 w-9 rounded-full transition-colors ${
            isOn ? "bg-foreground/20" : "bg-foreground/[0.06]"
          }`}
        >
          <div
            className={`h-4 w-4 rounded-full bg-foreground/50 transition-transform ${
              isOn ? "translate-x-4" : "translate-x-0.5"
            }`}
          />
        </button>
      ) : (
        <span className="text-[11px] font-extralight text-foreground/30">{value}</span>
      )}
    </div>
  )
}

// Icons
function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path d="M9 22V12h6v10" />
    </svg>
  )
}

function AIIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4m0 12v4m10-10h-4M6 12H2m15.07-5.07l-2.83 2.83M9.76 14.24l-2.83 2.83m11.14 0l-2.83-2.83M9.76 9.76L6.93 6.93" />
    </svg>
  )
}

function GalleryIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  )
}
