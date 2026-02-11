"use client"

import React from "react"

import { useEffect, useState } from "react"

interface GlassPopupProps {
  open: boolean
  onClose: () => void
  title: string
  description: string
  icon?: React.ReactNode
  action?: { label: string; onClick: () => void }
  dismissLabel?: string
}

export function GlassPopup({ open, onClose, title, description, icon, action, dismissLabel = "Dismiss" }: GlassPopupProps) {
  const [visible, setVisible] = useState(false)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    if (open) {
      setVisible(true)
      setAnimating(true)
    } else if (visible) {
      setAnimating(false)
      const timer = setTimeout(() => setVisible(false), 250)
      return () => clearTimeout(timer)
    }
  }, [open, visible])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-background/60 backdrop-blur-sm transition-opacity duration-300 ${
          animating ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Modal */}
      <div
        className={`relative w-full max-w-xs rounded-3xl glass-strong p-6 shadow-2xl shadow-background/50 ${
          animating ? "animate-modal-in" : "animate-modal-out"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {icon && (
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/50">
              {icon}
            </div>
          </div>
        )}
        <h3 className="mb-2 text-center text-base font-light tracking-wider text-foreground/90">{title}</h3>
        <p className="mb-6 text-center text-xs font-light leading-relaxed text-foreground/40">{description}</p>
        <div className="flex flex-col gap-2">
          {action && (
            <button
              type="button"
              onClick={() => { action.onClick(); onClose(); }}
              className="w-full rounded-xl bg-foreground py-2.5 text-xs font-light tracking-wider text-primary-foreground transition-all active:scale-[0.97]"
            >
              {action.label}
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl py-2.5 text-xs font-light tracking-wider text-foreground/40 transition-colors hover:text-foreground/60"
          >
            {dismissLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
