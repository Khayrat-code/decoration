// src/i18n/LanguageContext.tsx
//
// Default language is Arabic ('ar'). Persists the choice in localStorage.
// Mirrors the lang/dir/data-lang attributes onto <html> so the rest of
// the app (CSS, fonts) can react to it without prop-drilling.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import T, { categoryName as _categoryName, type Lang } from './translations'

type Ctx = {
  lang: Lang
  setLang: (l: Lang) => void
  /** Replace ${var} placeholders inside a translated string. */
  fmt: (s: string, vars?: Record<string, string | number>) => string
  /** Convenience: localized category name. */
  category: (key: string) => string
  /** Document direction. */
  dir: 'rtl' | 'ltr'
}

const LangCtx = createContext<Ctx | null>(null)
const STORAGE_KEY = 'toolcan-lang'

function isLang(x: unknown): x is Lang {
  return x === 'ar' || x === 'en'
}

function interpolate(s: string, vars?: Record<string, string | number>): string {
  if (!vars) return s
  return s.replace(/\$\{(\w+)\}/g, (_, k) =>
    Object.prototype.hasOwnProperty.call(vars, k) ? String(vars[k]) : `\${${k}}`,
  )
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ar')

  // Load any previously-saved choice.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (isLang(saved)) setLangState(saved)
    } catch {
      // ignore (private mode, etc.)
    }
  }, [])

  // Mirror onto <html>.
  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = lang === 'ar' ? 'rtl' : 'ltr'
    root.dataset.lang = lang
  }, [lang])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      // ignore
    }
  }, [])

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      dir: lang === 'ar' ? 'rtl' : 'ltr',
      fmt: interpolate,
      category: (key: string) => _categoryName(key, lang),
    }),
    [lang, setLang],
  )

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>
}

export function useLang(): Ctx {
  const ctx = useContext(LangCtx)
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>')
  return ctx
}

/**
 * useT() — pass a dot-path and get back the localized string. Supports
 * {var} interpolation via the second argument.
 *
 *   const t = useT()
 *   <h1>{t('home.hero.title1')}</h1>
 *   <span>{t('gallery.titleWithCount', { n: 12 })}</span>
 */
export function useT() {
  const { lang, fmt } = useLang()
  return useCallback(
    (path: string, vars?: Record<string, string | number>): string => {
      const parts = path.split('.')
      let cur: unknown = T
      for (const p of parts) {
        if (cur && typeof cur === 'object' && p in (cur as Record<string, unknown>)) {
          cur = (cur as Record<string, unknown>)[p]
        } else {
          return path
        }
      }
      // Each leaf is { ar, en }
      if (cur && typeof cur === 'object' && (cur as { ar?: unknown }).ar && (cur as { en?: unknown }).en) {
        const s = (cur as Record<Lang, string>)[lang]
        return fmt(s, vars)
      }
      // Arrays of { title, body }
      if (Array.isArray(cur) && cur.length && typeof cur[0] === 'object') {
        // Not directly renderable — return the index in the path instead.
        return path
      }
      return path
    },
    [lang, fmt],
  )
}

/** Hook variant that returns the raw translations table (for arrays, etc.). */
export function useTTable() {
  return T
}
