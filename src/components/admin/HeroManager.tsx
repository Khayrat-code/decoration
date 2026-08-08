import { useEffect, useState } from 'react'
import { useLang, useT } from '../../i18n/LanguageContext'
import { getSetting, setSetting } from '../../lib/settings'
import { DEFAULT_HERO, normalizeHero, type HeroSettings, type LocalizedText } from '../../lib/content'
import { ErrorAlert, SuccessNote } from './bits'

export function HeroManager() {
  const t = useT()
  const { lang } = useLang()
  const [settings, setSettings] = useState<HeroSettings>(DEFAULT_HERO)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    getSetting<Partial<HeroSettings>>('hero').then((raw) => setSettings(normalizeHero(raw)))
  }, [])

  const updateSlide = (i: number, field: keyof HeroSettings['slides'][number], lng: 'ar' | 'en', value: string) => {
    setSettings((s) => ({
      ...s,
      slides: s.slides.map((sl, idx) =>
        idx === i ? { ...sl, [field]: { ...sl[field], [lng]: value } } : sl,
      ),
    }))
  }

  const updateStat = (key: keyof HeroSettings['stats'], value: number) => {
    setSettings((s) => ({ ...s, stats: { ...s.stats, [key]: value } }))
  }

  const onSave = async () => {
    setSaving(true)
    setError(null)
    setSaved(false)
    const err = await setSetting('hero', settings)
    if (err) setError(err)
    else setSaved(true)
    setSaving(false)
  }

  return (
    <div>
      <ManagerHead
        heading={t('admin.heroManager.heading')}
        saving={saving}
        saved={saved}
        onSave={onSave}
        saveLabel={saving ? t('admin.saving') : t('admin.save')}
        savedLabel={t('admin.saved')}
      />
      {error && <ErrorAlert message={error} />}

      {settings.slides.map((slide, i) => (
        <div
          key={i}
          style={{
            background: 'var(--surface-2)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-lg)',
            padding: 24,
            marginBottom: 20,
          }}
        >
          <h3 style={{ fontSize: 17, fontWeight: lang === 'ar' ? 700 : 500, marginBottom: 16 }}>
            {t('admin.heroManager.slide', { n: i + 1 })}
          </h3>
          <div className="lang-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {(['ar', 'en'] as const).map((lng) => (
              <div key={lng}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--ink-3)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: 10,
                  }}
                >
                  {lng === 'ar' ? t('admin.langAr') : t('admin.langEn')}
                </div>
                <TextField
                  label={t('admin.heroManager.subtitle')}
                  value={slide.subtitle[lng]}
                  onChange={(v) => updateSlide(i, 'subtitle', lng, v)}
                />
                <TextField
                  label={t('admin.heroManager.title')}
                  value={slide.title[lng]}
                  onChange={(v) => updateSlide(i, 'title', lng, v)}
                />
                <TextField
                  label={t('admin.heroManager.highlight')}
                  value={slide.highlight[lng]}
                  onChange={(v) => updateSlide(i, 'highlight', lng, v)}
                />
                <TextArea
                  label={t('admin.heroManager.description')}
                  value={slide.description[lng]}
                  onChange={(v) => updateSlide(i, 'description', lng, v)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div
        style={{
          background: 'var(--surface-2)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius-lg)',
          padding: 24,
          marginBottom: 20,
        }}
      >
        <h3 style={{ fontSize: 17, fontWeight: lang === 'ar' ? 700 : 500, marginBottom: 16 }}>
          {t('admin.heroManager.statsHeading')}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="stats-cols">
          <NumberField
            label={t('admin.heroManager.years')}
            value={settings.stats.years}
            onChange={(v) => updateStat('years', v)}
          />
          <NumberField
            label={t('admin.heroManager.designers')}
            value={settings.stats.designers}
            onChange={(v) => updateStat('designers', v)}
          />
          <NumberField
            label={t('admin.heroManager.satisfaction')}
            value={settings.stats.satisfaction}
            onChange={(v) => updateStat('satisfaction', v)}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .lang-cols { grid-template-columns: 1fr !important; }
          .stats-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

export function ManagerHead({
  heading,
  saving,
  saved,
  onSave,
  saveLabel,
  savedLabel,
}: {
  heading: string
  saving: boolean
  saved: boolean
  onSave: () => void
  saveLabel: string
  savedLabel: string
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 20,
      }}
    >
      <h2 style={{ fontSize: 22, fontWeight: 700 }}>{heading}</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {saved && <SuccessNote text={savedLabel} />}
        <button type="button" className="btn" onClick={onSave} disabled={saving}>
          {saveLabel}
        </button>
      </div>
    </div>
  )
}

export function TextField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="field">
      <label>{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

export function TextArea({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="field">
      <label>{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} style={{ minHeight: 70 }} />
    </div>
  )
}

export function NumberField({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="field">
      <label>{label}</label>
      <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  )
}

export type { LocalizedText }
