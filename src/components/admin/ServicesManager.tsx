import { useEffect, useState } from 'react'
import { useT } from '../../i18n/LanguageContext'
import { getSetting, setSetting } from '../../lib/settings'
import { DEFAULT_SERVICES, normalizeServices, type ServiceItem } from '../../lib/content'
import { ErrorAlert, SuccessNote } from './bits'
import { ManagerHead, TextArea, TextField } from './HeroManager'

export function ServicesManager() {
  const t = useT()
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    getSetting<ServiceItem[]>('services').then((raw) => setServices(normalizeServices(raw)))
  }, [])

  const update = (i: number, field: 'title' | 'description', lng: 'ar' | 'en', value: string) => {
    setServices((arr) =>
      arr.map((s, idx) => (idx === i ? { ...s, [field]: { ...s[field], [lng]: value } } : s)),
    )
  }

  const onSave = async () => {
    setSaving(true)
    setError(null)
    setSaved(false)
    const err = await setSetting('services', services)
    if (err) setError(err)
    else setSaved(true)
    setSaving(false)
  }

  return (
    <div>
      <ManagerHead
        heading={t('admin.servicesManager.heading')}
        saving={saving}
        saved={saved}
        onSave={onSave}
        saveLabel={saving ? t('admin.saving') : t('admin.save')}
        savedLabel={t('admin.saved')}
      />
      {error && <ErrorAlert message={error} />}

      {services.map((s, i) => (
        <div
          key={s.id}
          style={{
            background: 'var(--surface-2)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-lg)',
            padding: 24,
            marginBottom: 20,
          }}
        >
          <div className="svc-lang-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
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
                  label={t('admin.servicesManager.title')}
                  value={s.title[lng]}
                  onChange={(v) => update(i, 'title', lng, v)}
                />
                <TextArea
                  label={t('admin.servicesManager.description')}
                  value={s.description[lng]}
                  onChange={(v) => update(i, 'description', lng, v)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <style>{`
        @media (max-width: 880px) {
          .svc-lang-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
