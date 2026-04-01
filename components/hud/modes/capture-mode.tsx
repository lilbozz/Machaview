"use client"

import { useState, useEffect, useRef } from "react"
import { useI18n } from "@/lib/i18n-context"

type CameraState = "requesting" | "active" | "denied" | "unavailable"

export function CaptureMode() {
  const { t } = useI18n()
  const [seconds, setSeconds] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [cameraState, setCameraState] = useState<CameraState>("requesting")
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Request camera on mount
  useEffect(() => {
    let active = true

    async function startCamera() {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraState("unavailable")
        return
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
        })
        if (!active) {
          stream.getTracks().forEach((t) => t.stop())
          return
        }
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
        setCameraState("active")
      } catch {
        setCameraState("denied")
      }
    }

    startCamera()

    return () => {
      active = false
      streamRef.current?.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
  }, [])

  // Recording timer
  useEffect(() => {
    if (!isRecording) return
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(interval)
  }, [isRecording])

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60).toString().padStart(2, "0")
    const secs = (s % 60).toString().padStart(2, "0")
    return `${mins}:${secs}`
  }

  const toggleRecording = () => {
    if (!isRecording) setSeconds(0)
    setIsRecording((r) => !r)
  }

  return (
    <div className="relative h-full w-full">
      {/* Camera feed or fallback */}
      {cameraState === "active" && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {cameraState === "requesting" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="h-2 w-2 animate-breathing rounded-full bg-foreground/30" />
          <span className="text-[11px] font-extralight tracking-widest text-foreground/30 uppercase">
            {t("capture.requesting")}
          </span>
        </div>
      )}

      {(cameraState === "denied" || cameraState === "unavailable") && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          {/* Simulated camera — animated scan line */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div
              className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-foreground/60 to-transparent"
              style={{ animation: "scan 3s linear infinite", top: "0%" }}
            />
          </div>
          <div className="relative flex flex-col items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-foreground/20">
              <rect x="2" y="6" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.2" />
              <path d="M15 2h-6l-1 4h8l-1-4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              <path d="M2 2l20 20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span className="text-[10px] font-extralight tracking-widest text-foreground/25 uppercase">
              {cameraState === "denied" ? t("capture.denied") : t("capture.unavailable")}
            </span>
            <span className="text-[9px] font-extralight tracking-wider text-foreground/15">
              {cameraState === "denied" ? t("capture.allowCamera") : t("capture.simMode")}
            </span>
          </div>
        </div>
      )}

      {/* Framing grid overlay (always visible) */}
      <div className="absolute inset-12 pointer-events-none md:inset-20">
        <div className="absolute left-1/3 top-0 h-full w-px bg-foreground/[0.06]" />
        <div className="absolute left-2/3 top-0 h-full w-px bg-foreground/[0.06]" />
        <div className="absolute left-0 top-1/3 w-full h-px bg-foreground/[0.06]" />
        <div className="absolute left-0 top-2/3 w-full h-px bg-foreground/[0.06]" />
        <div className="absolute left-0 top-0 h-5 w-5 border-l border-t border-foreground/20" />
        <div className="absolute right-0 top-0 h-5 w-5 border-r border-t border-foreground/20" />
        <div className="absolute left-0 bottom-0 h-5 w-5 border-l border-b border-foreground/20" />
        <div className="absolute right-0 bottom-0 h-5 w-5 border-r border-b border-foreground/20" />
      </div>

      {/* Recording indicator */}
      {cameraState !== "requesting" && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 md:top-10">
          {isRecording && <div className="h-1.5 w-1.5 animate-rec-blink rounded-full bg-red-500/80" />}
          <span className="text-[11px] font-light tracking-widest text-foreground/50 uppercase">
            {isRecording ? t("capture.rec") : cameraState === "active" ? t("capture.ready") : t("capture.sim")}
          </span>
          {isRecording && (
            <span className="text-[11px] font-extralight tracking-wider text-foreground/40">
              {formatTime(seconds)}
            </span>
          )}
        </div>
      )}

      {/* Controls */}
      {cameraState !== "requesting" && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 md:bottom-10">
          <button
            type="button"
            onClick={toggleRecording}
            aria-pressed={isRecording}
            className={`flex items-center gap-2 rounded-full border px-5 py-2 backdrop-blur-sm transition-all active:scale-[0.97] ${
              isRecording
                ? "border-red-500/30 bg-red-500/10"
                : "border-foreground/[0.08] bg-foreground/[0.04]"
            }`}
          >
            <div className={`h-2 w-2 rounded-sm transition-colors ${isRecording ? "bg-red-500/80" : "bg-foreground/40"}`} />
            <span className="text-[10px] font-light tracking-widest text-foreground/50 uppercase">
              {isRecording ? t("capture.stop") : t("capture.record")}
            </span>
          </button>
        </div>
      )}

      <style>{`
        @keyframes scan {
          0% { top: -1px; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  )
}
