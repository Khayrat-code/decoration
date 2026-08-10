import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { supabase, TABLES } from '../lib/supabase'
import { useLang, useT } from '../i18n/LanguageContext'

interface FormState {
  name: string
  email: string
  phone: string
  projectType: string
  spaceSize: string
  message: string
}

const empty: FormState = {
  name: '',
  email: '',
  phone: '',
  projectType: '',
  spaceSize: '',
  message: '',
}

export function Contact() {
  const [form, setForm] = useState<FormState>(empty)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const t = useT()
  const { lang } = useLang()

  const onChange = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError(t('contact.form.errors.required'))
      return
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError(t('contact.form.errors.email'))
      return
    }

    setSubmitting(true)
    const message = [
      `[${form.projectType || '—'}]`,
      form.spaceSize ? `${form.spaceSize} m²` : '',
      '',
      form.message.trim(),
    ]
      .filter(Boolean)
      .join('\n')

    const { error: dbError } = await supabase.from(TABLES.contact).insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      message,
    })
    setSubmitting(false)

    if (dbError) {
      setError(dbError.message)
      return
    }
    setDone(true)
    setForm(empty)
  }

  return (
    <section className="section">
      <div className="container-narrow">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="eyebrow">{t('contact.eyebrow')}</span>
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
            {t('contact.title')}
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
            {t('contact.body')}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
            gap: 48,
          }}
          className="contact-grid"
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
                    fontFamily: 'var(--font-serif)',
                    fontSize: 26,
                    fontWeight: lang === 'ar' ? 700 : 500,
                    color: 'var(--ink)',
                    marginBottom: 10,
                  }}
                >
                  {t('contact.form.success.title')}
                </div>
                <p style={{ color: 'var(--ink-2)', fontSize: 16, lineHeight: lang === 'ar' ? 1.95 : 1.7 }}>
                  {t('contact.form.success.body')}
                </p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setDone(false)}
                  style={{ marginTop: 24 }}
                >
                  {t('contact.form.sendAnother')}
                </button>
              </div>
            ) : (
              <>
                <div className="field">
                  <label htmlFor="name">{t('contact.form.name')}</label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={onChange('name')}
                    autoComplete="name"
                    required
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="contact-row">
                  <div className="field">
                    <label htmlFor="email">{t('contact.form.email')}</label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={onChange('email')}
                      autoComplete="email"
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="phone">
                      {t('contact.form.phone')}{' '}
                      <span className="hint">({t('contact.form.phoneOptional')})</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={onChange('phone')}
                      autoComplete="tel"
                    />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="contact-row">
                  <div className="field">
                    <label htmlFor="projectType">{t('contact.form.projectType')}</label>
                    <input
                      id="projectType"
                      type="text"
                      value={form.projectType}
                      onChange={onChange('projectType')}
                      placeholder={t('contact.form.projectTypePh')}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="spaceSize">{t('contact.form.spaceSize')}</label>
                    <input
                      id="spaceSize"
                      type="text"
                      inputMode="numeric"
                      value={form.spaceSize}
                      onChange={onChange('spaceSize')}
                      placeholder={t('contact.form.spaceSizePh')}
                    />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="message">{t('contact.form.message')}</label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={onChange('message')}
                    placeholder={t('contact.form.messagePh')}
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
                  {submitting ? t('contact.form.submitting') : t('contact.form.submit')}
                </button>
              </>
            )}
          </motion.form>

          <aside style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            <Detail
              label={t('contact.aside.studio.label')}
              value={t('contact.aside.studio.title')}
              detail={t('contact.aside.studio.detail')}
            />
            <Detail
              label={t('contact.aside.reach.label')}
              value={t('contact.aside.reach.title')}
              detail={t('contact.aside.reach.detail')}
            />
            <Detail
              label={t('contact.aside.areas.label')}
              value={t('contact.aside.areas.title')}
              detail={t('contact.aside.areas.detail')}
            />
          </aside>
        </div>

        <style>{`
          @media (max-width: 760px) {
            .contact-grid { grid-template-columns: 1fr !important; }
            .contact-row { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  )
}

function Detail({ label, value, detail }: { label: string; value: string; detail: string }) {
  const { lang } = useLang()
  return (
    <div>
      <div
        style={{
          fontSize: lang === 'ar' ? 13 : 12,
          fontWeight: 500,
          color: 'var(--accent)',
          marginBottom: 8,
          letterSpacing: lang === 'ar' ? 0 : '0.12em',
          textTransform: lang === 'ar' ? 'none' : 'uppercase',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 22,
          fontWeight: lang === 'ar' ? 700 : 500,
          color: 'var(--ink)',
          marginBottom: 6,
          lineHeight: lang === 'ar' ? 1.4 : 1.25,
        }}
      >
        {value}
      </div>
      <div style={{ color: 'var(--ink-2)', fontSize: 15, lineHeight: lang === 'ar' ? 1.95 : 1.7 }}>
        {detail}
      </div>
    </div>
  )
}
