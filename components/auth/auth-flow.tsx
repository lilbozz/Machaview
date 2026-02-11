"use client"

import { useState, useEffect, useMemo } from "react"
import { useI18n } from "@/lib/i18n-context"

type AuthScreen = "splash" | "getStarted" | "login" | "register"

interface AuthFlowProps {
  onAuthenticated: () => void
}

export function AuthFlow({ onAuthenticated }: AuthFlowProps) {
  const [screen, setScreen] = useState<AuthScreen>("splash")
  const [fadeIn, setFadeIn] = useState(false)
  const { t } = useI18n()

  useEffect(() => {
    setFadeIn(true)
    const timer = setTimeout(() => {
      setFadeIn(false)
      setTimeout(() => {
        setScreen("getStarted")
        setFadeIn(true)
      }, 400)
    }, 2200)
    return () => clearTimeout(timer)
  }, [])

  const navigateTo = (s: AuthScreen) => {
    setFadeIn(false)
    setTimeout(() => {
      setScreen(s)
      setFadeIn(true)
    }, 250)
  }

  return (
    <div className="flex h-dvh w-screen items-center justify-center overflow-hidden bg-background">
      {/* Subtle background orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-foreground/[0.02] blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-foreground/[0.02] blur-3xl" />
      </div>
      <div
        className="relative z-10 flex w-full max-w-sm flex-col items-center px-8 transition-all duration-500"
        style={{ opacity: fadeIn ? 1 : 0, transform: fadeIn ? "translateY(0)" : "translateY(8px)" }}
      >
        {screen === "splash" && <SplashScreen />}
        {screen === "getStarted" && (
          <GetStartedScreen t={t} onGetStarted={() => navigateTo("register")} onSignIn={() => navigateTo("login")} />
        )}
        {screen === "login" && (
          <LoginScreen t={t} onSubmit={onAuthenticated} onSwitch={() => navigateTo("register")} />
        )}
        {screen === "register" && (
          <RegisterScreen t={t} onSubmit={onAuthenticated} onSwitch={() => navigateTo("login")} />
        )}
      </div>
    </div>
  )
}

function SplashScreen() {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Logo mark */}
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl glass">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-foreground/60">
          <circle cx="12" cy="12" r="3" fill="currentColor" />
          <path d="M12 2v4m0 12v4m10-10h-4M6 12H2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      <h1 className="text-3xl font-extralight tracking-[0.25em] text-foreground/90">Machaview</h1>
      <p className="text-xs font-extralight tracking-[0.2em] text-foreground/30">by Paggy Industries</p>
    </div>
  )
}

function GetStartedScreen({
  t,
  onGetStarted,
  onSignIn,
}: {
  t: (key: string) => string
  onGetStarted: () => void
  onSignIn: () => void
}) {
  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl glass">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground/50">
            <circle cx="12" cy="12" r="3" fill="currentColor" />
            <path d="M12 2v4m0 12v4m10-10h-4M6 12H2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
        <h1 className="text-2xl font-extralight tracking-[0.2em] text-foreground/90">Machaview</h1>
        <p className="text-sm font-light tracking-wider text-foreground/40">{t("getStarted.tagline")}</p>
      </div>
      <div className="flex w-full flex-col gap-3">
        <button
          type="button"
          onClick={onGetStarted}
          className="w-full rounded-2xl bg-foreground py-3.5 text-sm font-light tracking-wider text-primary-foreground shadow-lg shadow-foreground/5 transition-all active:scale-[0.97]"
        >
          {t("getStarted.getStarted")}
        </button>
        <button
          type="button"
          onClick={onSignIn}
          className="w-full rounded-2xl glass py-3.5 text-sm font-light tracking-wider text-foreground/70 transition-all active:scale-[0.97]"
        >
          {t("getStarted.signIn")}
        </button>
      </div>
      <p className="text-[10px] font-extralight tracking-widest text-foreground/15">
        Machaview by Paggy Industries
      </p>
    </div>
  )
}

function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
}: {
  id: string
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
}) {
  const [focused, setFocused] = useState(false)
  const hasValue = value.length > 0
  const isFloating = focused || hasValue

  return (
    <div className="group relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer w-full rounded-xl border border-border bg-card/50 px-4 pb-2.5 pt-6 text-sm font-light text-foreground/90 backdrop-blur-sm transition-all placeholder:text-transparent focus:border-foreground/20 focus:outline-none focus:ring-1 focus:ring-ring"
        placeholder={label}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 transition-all duration-200 ${
          isFloating
            ? "top-2 text-[10px] tracking-widest text-foreground/40"
            : "top-1/2 -translate-y-1/2 text-sm text-foreground/25"
        }`}
      >
        {label}
      </label>
    </div>
  )
}

function PasswordStrength({ password }: { password: string }) {
  const { t } = useI18n()
  const strength = useMemo(() => {
    if (password.length === 0) return 0
    let score = 0
    if (password.length >= 6) score++
    if (password.length >= 10) score++
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++
    if (/\d/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    return Math.min(score, 3)
  }, [password])

  if (password.length === 0) return null

  const labels = [t("register.weak"), t("register.weak"), t("register.fair"), t("register.strong")]
  const colors = ["bg-destructive/60", "bg-destructive/60", "bg-amber-500/60", "bg-emerald-500/60"]

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-1">
        {[1, 2, 3].map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full transition-all duration-500 ${
              strength >= level ? colors[strength] : "bg-muted"
            }`}
          />
        ))}
      </div>
      <span className="text-[10px] font-light tracking-wider text-foreground/30">
        {t("register.strength")}: {labels[strength]}
      </span>
    </div>
  )
}

function LoginScreen({
  t,
  onSubmit,
  onSwitch,
}: {
  t: (key: string) => string
  onSubmit: () => void
  onSwitch: () => void
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = () => {
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields")
      setTimeout(() => setError(""), 2000)
      return
    }
    onSubmit()
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <h2 className="text-center text-xl font-extralight tracking-[0.15em] text-foreground/90">{t("login.title")}</h2>
      <div className="flex flex-col gap-4">
        <FloatingInput id="login-email" label={t("login.email")} type="email" value={email} onChange={setEmail} />
        <FloatingInput id="login-password" label={t("login.password")} type="password" value={password} onChange={setPassword} />
        {error && (
          <p className="animate-fade-in text-center text-xs font-light text-destructive/80">{error}</p>
        )}
        <button
          type="button"
          className="self-end text-[11px] font-light tracking-wider text-foreground/30 transition-colors hover:text-foreground/50"
        >
          {t("login.forgotPassword")}
        </button>
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full rounded-2xl bg-foreground py-3.5 text-sm font-light tracking-wider text-primary-foreground shadow-lg shadow-foreground/5 transition-all active:scale-[0.97]"
      >
        {t("login.submit")}
      </button>
      <p className="text-center text-xs font-light text-foreground/30">
        {t("login.noAccount")}{" "}
        <button type="button" onClick={onSwitch} className="text-foreground/60 underline underline-offset-4">
          {t("login.register")}
        </button>
      </p>
    </div>
  )
}

function RegisterScreen({
  t,
  onSubmit,
  onSwitch,
}: {
  t: (key: string) => string
  onSubmit: () => void
  onSwitch: () => void
}) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields")
      setTimeout(() => setError(""), 2000)
      return
    }
    if (password !== confirm) {
      setError("Passwords do not match")
      setTimeout(() => setError(""), 2000)
      return
    }
    onSubmit()
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <h2 className="text-center text-xl font-extralight tracking-[0.15em] text-foreground/90">
        {t("register.title")}
      </h2>
      <div className="flex flex-col gap-4">
        <FloatingInput id="reg-name" label={t("register.fullName")} value={name} onChange={setName} />
        <FloatingInput id="reg-email" label={t("register.email")} type="email" value={email} onChange={setEmail} />
        <FloatingInput id="reg-password" label={t("register.password")} type="password" value={password} onChange={setPassword} />
        <PasswordStrength password={password} />
        <FloatingInput id="reg-confirm" label={t("register.confirmPassword")} type="password" value={confirm} onChange={setConfirm} />
        {error && (
          <p className="animate-fade-in text-center text-xs font-light text-destructive/80">{error}</p>
        )}
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full rounded-2xl bg-foreground py-3.5 text-sm font-light tracking-wider text-primary-foreground shadow-lg shadow-foreground/5 transition-all active:scale-[0.97]"
      >
        {t("register.submit")}
      </button>
      <p className="text-center text-xs font-light text-foreground/30">
        {t("register.hasAccount")}{" "}
        <button type="button" onClick={onSwitch} className="text-foreground/60 underline underline-offset-4">
          {t("register.signIn")}
        </button>
      </p>
    </div>
  )
}
