import { useEffect, useState, type FormEvent } from 'react'
import { useLang, useT } from '../../i18n/LanguageContext'
import { supabase, TABLES } from '../../lib/supabase'
import type { TestimonialRow } from '../../lib/content'
import { ErrorAlert, EmptyState } from './bits'

export function TestimonialsManager() {
  const t = useT()
  const { lang } = useLang()
  const [items, setItems] = useState<TestimonialRow[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [body, setBody] = useState('')
  const [rating, setRating] = useState(5)
  const [submitting, setSubmitting] = useState(false)

  const load = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from(TABLES.testimonials)
      .select('*')
      .order('created_at', { ascending: false })
    if (error) setError(error.message)
    setItems((data as TestimonialRow[]) ?? [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !body.trim()) return
    setSubmitting(true)
    setError(null)
    const { error: err } = await supabase.from(TABLES.testimonials).insert({
      name: name.trim(),
      body: body.trim(),
      rating: Math.min(5, Math.max(1, rating)),
    })
    if (err) {
      setError(err.message)
    } else {
      setName('')
      setBody('')
      setRating(5)
      setAdding(false)
      await load()
    }
    setSubmitting(false)
  }

  const onDelete = async (item: TestimonialRow) => {
    if (!confirm(t('admin.testimonialsManager.deleteConfirm', { name: item.name }))) return
    const { error: err } = await supabase.from(TABLES.testimonials).delete().eq('id', item.id)
    if (err) {
      setError(err.message)
      return
    }
    setItems((arr) => arr.filter((i) => i.id !== item.id))
  }

  return (
    <div>
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
        <h2 style={{ fontSize: 22, fontWeight: lang === 'ar' ? 700 : 500 }}>
          {t('admin.testimonialsManager.heading')}
        </h2>
        <button type="button" className="btn" onClick={() => setAdding((v) => !v)}>
          {t('admin.testimonialsManager.addBtn')}
        </button>
      </div>

      {error && <ErrorAlert message={error} />}

      {adding && (
        <form
          onSubmit={onSubmit}
          style={{
            background: 'var(--surface-2)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-lg)',
            padding: 24,
            marginBottom: 24,
          }}
        >
          <div className="field">
            <label htmlFor="tst-name">{t('admin.testimonialsManager.name')}</label>
            <input id="tst-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="tst-body">{t('admin.testimonialsManager.body')}</label>
            <textarea id="tst-body" value={body} onChange={(e) => setBody(e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="tst-rating">{t('admin.testimonialsManager.rating')}</label>
            <select id="tst-rating" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="submit" className="btn" disabled={submitting}>
              {submitting ? t('admin.saving') : t('admin.save')}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setAdding(false)}>
              {t('admin.gallery.form.cancel')}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div style={{ color: 'var(--ink-3)', padding: '32px 0' }}>…</div>
      ) : items.length === 0 ? (
        <EmptyState
          title={t('admin.testimonialsManager.emptyTitle')}
          body={t('admin.testimonialsManager.emptyBody')}
        />
      ) : (
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map((item) => (
            <li
              key={item.id}
              style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius)',
                padding: 20,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <div style={{ fontFamily: 'var(--font-serif)', fontWeight: lang === 'ar' ? 700 : 500, color: 'var(--ink)' }}>
                  {item.name}
                </div>
                <div style={{ color: 'var(--accent-2)', fontSize: 13 }}>
                  {'★'.repeat(Math.min(5, Math.max(0, item.rating)))}
                </div>
              </div>
              <p style={{ color: 'var(--ink-2)', fontSize: 14, lineHeight: lang === 'ar' ? 1.9 : 1.6, whiteSpace: 'pre-wrap', margin: 0 }}>
                {item.body}
              </p>
              <div style={{ marginTop: 14 }}>
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ padding: '6px 12px', fontSize: 13 }}
                  onClick={() => onDelete(item)}
                >
                  {t('admin.gallery.deleteBtn')}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
