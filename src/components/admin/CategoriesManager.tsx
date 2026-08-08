import { useEffect, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useLang, useT } from '../../i18n/LanguageContext'
import { supabase, TABLES } from '../../lib/supabase'
import { getSetting, setSetting } from '../../lib/settings'
import { CATEGORIES } from '../../i18n/translations'
import { ErrorAlert } from './bits'

interface CategoriesSetting {
  hidden: string[]
}

export function CategoriesManager() {
  const t = useT()
  const { lang, category } = useLang()
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [hidden, setHidden] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const [gallery, setting] = await Promise.all([
        supabase.from(TABLES.gallery).select('category'),
        getSetting<CategoriesSetting>('categories'),
      ])
      if (cancelled) return
      if (!gallery.error && gallery.data) {
        const c: Record<string, number> = {}
        for (const row of gallery.data as Array<{ category: string }>) {
          c[row.category] = (c[row.category] ?? 0) + 1
        }
        setCounts(c)
      }
      if (setting?.hidden) setHidden(setting.hidden)
      setLoading(false)
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const toggle = async (key: string) => {
    const next = hidden.includes(key) ? hidden.filter((k) => k !== key) : [...hidden, key]
    setHidden(next)
    const err = await setSetting('categories', { hidden: next })
    if (err) setError(err)
  }

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: lang === 'ar' ? 700 : 500, marginBottom: 8 }}>
        {t('admin.categoriesManager.heading')}
      </h2>
      <p style={{ color: 'var(--ink-2)', fontSize: 14, marginBottom: 24 }}>
        {t('admin.categoriesManager.hint')}
      </p>
      {error && <ErrorAlert message={error} />}
      {loading ? (
        <div style={{ color: 'var(--ink-3)', padding: '32px 0' }}>…</div>
      ) : (
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {CATEGORIES.map((c) => {
            const isHidden = hidden.includes(c.key)
            return (
              <li
                key={c.key}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 12,
                  background: 'var(--surface-2)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius)',
                  padding: '14px 18px',
                  opacity: isHidden ? 0.6 : 1,
                }}
              >
                <div>
                  <div style={{ fontWeight: lang === 'ar' ? 700 : 500, color: 'var(--ink)' }}>
                    {category(c.key)}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>
                    {t('admin.categoriesManager.count', { n: counts[c.key] ?? 0 })}
                  </div>
                </div>
                <button
                  type="button"
                  className={isHidden ? 'btn btn-secondary' : 'btn'}
                  style={{ padding: '8px 14px', fontSize: 13 }}
                  onClick={() => toggle(c.key)}
                >
                  {isHidden ? <EyeOff size={15} /> : <Eye size={15} />}
                  {isHidden ? t('admin.categoriesManager.hidden') : t('admin.categoriesManager.visible')}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
