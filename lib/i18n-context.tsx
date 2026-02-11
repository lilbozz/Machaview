"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import en from "./locales/en.json"
import th from "./locales/th.json"
import zh from "./locales/zh.json"

export type Locale = "en" | "th" | "zh"

const locales: Record<Locale, typeof en> = { en, th, zh }
const validLocales: Locale[] = ["en", "th", "zh"]

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  th: "\u0e44\u0e17\u0e22",
  zh: "\u4e2d\u6587",
}

interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextValue>({
  locale: "en",
  setLocale: () => {},
  t: (key: string) => key,
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")

  useEffect(() => {
    try {
      const stored = localStorage.getItem("machaview-locale") as Locale | null
      if (stored && validLocales.includes(stored)) {
        setLocaleState(stored)
      }
    } catch {}
  }, [])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    try {
      localStorage.setItem("machaview-locale", l)
    } catch {}
  }, [])

  const t = useCallback(
    (key: string): string => {
      const keys = key.split(".")
      let value: unknown = locales[locale]
      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = (value as Record<string, unknown>)[k]
        } else {
          return key
        }
      }
      return typeof value === "string" ? value : key
    },
    [locale],
  )

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  return useContext(I18nContext)
}
