"use client"

import { useState, useEffect } from "react"
import { AuthFlow } from "@/components/auth/auth-flow"
import { AppShell } from "@/components/app/app-shell"

type AppState = "auth" | "app"

export default function Page() {
  const [mounted, setMounted] = useState(false)
  const [state, setState] = useState<AppState>("auth")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="flex h-dvh w-screen items-center justify-center bg-background" />
  }

  if (state === "auth") {
    return <AuthFlow onAuthenticated={() => setState("app")} />
  }

  return <AppShell onSignOut={() => setState("auth")} />
}
