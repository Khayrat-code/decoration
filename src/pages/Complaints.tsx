import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, ShieldCheck, Clock, HeartHandshake } from 'lucide-react'
import { supabase, TABLES } from '../lib/supabase'
import { useLang, useT } from '../i18n/LanguageContext'
import T from '../i18n/translations'

interface FormState {
  name: string
  email: string
  phone: string
  type: 'complaint' | 'suggestion' | 'appreciation'
  orderRef: string
  message: string
}

const empty: FormState = {
  name: '',
  email: '',
  phone: '',
  type: 'complaint',
  orderRef: '',
  message: '',
}

export function Complaints() {
  const [form, setForm] = useState<FormState>(empty)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const t = useT()
  const { lang } = useLang()

  const onChange = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError(t('complaints.form.errors.required'))
      return
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError(t('complaints.form.errors.email'))
      return
    }

    setSubmitting(true)
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      type: form.type,
      subject: form.orderRef.trim() || null,
      message: form.message.trim(),
    }

    // Try the dedicated complaints table first (set up in supabase-setup.sql,
    // section 4e). If the table is not yet present, fall back to the
    // contact_submissions table so the form always works.
    let primary = await supabase.from(TABLES.complaints).insert(payload)
    if (primary.error && /relation .* does not exist|schema cache/i.test(primary.error.message)) {
      await supabase.from(TABLES.contact).insert({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        message: `[${payload.type}] ${payload.subject ? '#' + payload.subject : ''}\n\n${payload.message}`,
      })
    }
    setSubmitting(false)

    if (primary.error && !/relation .* does not exist|schema cache/i.test(primary.error.message)) {
      setError(primary.error.message)
      return
    }
    setDone(true)
    setForm(empty)
  }

  return (
    <section className="section">
      <div className="container-narrow">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="eyebrow">{t('complaints.eyebrow')}</span>
          <h1
            style={{
              fontSize: 'var(--fs-h1)',
              fontWeight: lang === 'ar' ? 700 : 500,
              marginTop: 14,
              marginBottom: 18,
              lineHeight: lang === 'ar' ? 1.3 : 1.1,
              maxWidth: '20ch',
              margin: '14px auto 18px',
            }}
          >
            {t('complaints.title')}
          </h1>
          <p
            style={{
              color: 'var(--ink-2)',
              fontSize: 18,
              lineHeight: lang === 'ar' ? 1.95 : 1.7,
              maxWidth: 600,
              margin: '0 auto',
            }}
          >
            {t('complaints.body')}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
            gap: 48,
          }}
          className="complaints-grid"
        >
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-lg)',
              padding: 40,
            }}
            noValidate
          >
            {done ? (
              <div style={{ textAlign: 'center', padding: '40px 12px' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 56,
                    height: 56,
                    borderRadius: 999,
                    background: 'var(--accent)',
                    color: 'var(--bg)',
                    marginBottom: 16,
                  }}
                >
                  <CheckCircle2 size={28} strokeWidth={1.5} />
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 26,
                    fontWeight: lang === 'ar' ? 700 : 500,
                    color: 'var(--ink)',
                    marginBottom: 10,
                  }}
                >
                  {t('complaints.form.success.title')}
                </div>
                <p style={{ color: 'var(--ink-2)', fontSize: 16, lineHeight: lang === 'ar' ? 1.95 : 1.7 }}>
                  {t('complaints.form.success.body')}
                </p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setDone(false)}
                  style={{ marginTop: 24 }}
                >
                  {t('complaints.form.sendAnother')}
                </button>
              </div>
            ) : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="complaints-row">
                  <div className="field">
                    <label htmlFor="c-name">{t('complaints.form.name')}</label>
                    <input
                      id="c-name"
                      type="text"
                      value={form.name}
                      onChange={onChange('name')}
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="c-email">{t('complaints.form.email')}</label>
                    <input
                      id="c-email"
                      type="email"
                      value={form.email}
                      onChange={onChange('email')}
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="complaints-row">
                  <div className="field">
                    <label htmlFor="c-phone">
                      {t('complaints.form.phone')}{' '}
                      <span className="hint">({t('complaints.form.phoneOptional')})</span>
                    </label>
                    <input
                      id="c-phone"
                      type="tel"
                      value={form.phone}
                      onChange={onChange('phone')}
                      autoComplete="tel"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="c-type">{t('complaints.form.type')}</label>
                    <select
                      id="c-type"
                      value={form.type}
                      onChange={onChange('type')}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 16,
                        color: 'var(--ink)',
                        background: 'var(--surface)',
                        border: '1px solid var(--line-2)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '14px 16px',
                        width: '100%',
                      }}
                    >
                      <option value="complaint">{t('complaints.form.typeComplaint')}</option>
                      <option value="suggestion">{t('complaints.form.typeSuggestion')}</option>
                      <option value="appreciation">{t('complaints.form.typeAppreciation')}</option>
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="c-orderRef">{t('complaints.form.orderRef')}</label>
                  <input
                    id="c-orderRef"
                    type="text"
                    value={form.orderRef}
                    onChange={onChange('orderRef')}
                  />
                </div>
                <div className="field">
                  <label htmlFor="c-message">{t('complaints.form.message')}</label>
                  <textarea
                    id="c-message"
                    value={form.message}
                    onChange={onChange('message')}
                    placeholder={t('complaints.form.messagePh')}
                    required
                  />
                </div>

                {error && (
                  <div
                    role="alert"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--line-2)',
                      borderInlineStart: '3px solid var(--danger)',
                      color: 'var(--ink-2)',
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 14,
                      marginBottom: 16,
                    }}
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn"
                  disabled={submitting}
                  aria-disabled={submitting}
                >
                  {submitting ? t('complaints.form.submitting') : t('complaints.form.submit')}
                </button>
              </>
            )}
          </motion.form>

          <aside style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div
              style={{
                background: 'var(--bg-2)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-lg)',
                padding: 28,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 12,
                  color: 'var(--accent)',
                }}
              >
                <ShieldCheck size={18} strokeWidth={1.5} />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                  }}
                >
                  {t('complaints.promise.title')}
                </span>
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                }}
              >
                {T.complaints.promise.items.map((p, i) => {
                  const Icon = i === 0 ? ShieldCheck : i === 1 ? Clock : HeartHandshake
                  return (
                    <li
                      key={i}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr',
                        gap: 12,
                        alignItems: 'start',
                        color: 'var(--ink-2)',
                        fontSize: 15,
                        lineHeight: lang === 'ar' ? 1.95 : 1.7,
                      }}
                    >
                      <Icon size={16} strokeWidth={1.5} style={{ color: 'var(--accent-2)', flexShrink: 0, marginTop: 4 }} />
                      <span>{p[lang]}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </aside>
        </div>

        <style>{`
          @media (max-width: 760px) {
            .complaints-grid { grid-template-columns: 1fr !important; }
            .complaints-row { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  )
}
