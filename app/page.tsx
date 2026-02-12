"use client"

import { useState, useEffect, useCallback } from "react"
import { AuthFlow } from "@/components/auth/auth-flow"
import { AppShell } from "@/components/app/app-shell"
import { IntroSplash } from "@/components/app/intro-splash"

const SESSION_KEY = "machaview-session"

type AppState = "auth" | "intro" | "app"

export default function Page() {
  const [mounted, setMounted] = useState(false)
  const [state, setState] = useState<AppState>("auth")

  // On mount, check for existing session in localStorage
  useEffect(() => {
    setMounted(true)
    try {
      const session = localStorage.getItem(SESSION_KEY)
      if (session === "active") {
        // User was logged in - show intro splash first
        setState("intro")
      }
    } catch {}
  }, [])

  const handleAuthenticated = useCallback(() => {
    // Save session to localStorage for persistence
    try {
      localStorage.setItem(SESSION_KEY, "active")
    } catch {}
    setState("intro")
  }, [])

  const handleIntroComplete = useCallback(() => {
    setState("app")
  }, [])

  const handleSignOut = useCallback(() => {
    try {
      localStorage.removeItem(SESSION_KEY)
    } catch {}
    setState("auth")
  }, [])

  if (!mounted) {
    return <div className="flex h-dvh w-screen items-center justify-center bg-background" />
  }

  if (state === "auth") {
    return <AuthFlow onAuthenticated={handleAuthenticated} />
  }

  if (state === "intro") {
    return <IntroSplash onComplete={handleIntroComplete} />
  }

  return <AppShell onSignOut={handleSignOut} />
}
