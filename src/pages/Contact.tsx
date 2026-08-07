import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { supabase, TABLES } from '../lib/supabase'
import { useLang, useT } from '../i18n/LanguageContext'

interface FormState {
  name: string
  email: string
  phone: string
  message: string
}

const empty: FormState = { name: '', email: '', phone: '', message: '' }

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
    const { error: dbError } = await supabase.from(TABLES.contact).insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      message: form.message.trim(),
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
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="eyebrow">{t('contact.eyebrow')}</span>
          <h1
            style={{
              fontSize: 'var(--fs-h1)',
              fontWeight: lang === 'ar' ? 700 : 400,
              marginTop: 12,
              marginBottom: 16,
              lineHeight: lang === 'ar' ? 1.3 : 1.1,
            }}
          >
            {t('contact.title')}
          </h1>
          <p
            style={{
              color: 'var(--ink-2)',
              fontSize: 17,
              lineHeight: lang === 'ar' ? 1.95 : 1.6,
              maxWidth: 560,
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
              padding: 32,
            }}
            noValidate
          >
            {done ? (
              <div style={{ textAlign: 'center', padding: '40px 12px' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 24,
                    fontWeight: lang === 'ar' ? 700 : 400,
                    color: 'var(--ink)',
                    marginBottom: 8,
                  }}
                >
                  {t('contact.form.success.title')}
                </div>
                <p style={{ color: 'var(--ink-2)', fontSize: 15, lineHeight: lang === 'ar' ? 1.95 : 1.6 }}>
                  {t('contact.form.success.body')}
                </p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setDone(false)}
                  style={{ marginTop: 20 }}
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
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
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

          <aside style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <Detail
              label={t('contact.aside.studio.label')}
              value={t('contact.aside.studio.title')}
              detail={t('contact.aside.studio.detail')}
            />
            <Detail
              label={t('contact.aside.email.label')}
              value={t('contact.aside.email.title')}
              detail={t('contact.aside.email.detail')}
            />
            <Detail
              label={t('contact.aside.hours.label')}
              value={t('contact.aside.hours.title')}
              detail={t('contact.aside.hours.detail')}
            />
          </aside>
        </div>

        <style>{`
          @media (max-width: 760px) {
            .contact-grid { grid-template-columns: 1fr !important; }
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
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 20,
          fontWeight: lang === 'ar' ? 700 : 400,
          color: 'var(--ink)',
          marginBottom: 4,
          lineHeight: lang === 'ar' ? 1.4 : 1.2,
        }}
      >
        {value}
      </div>
      <div style={{ color: 'var(--ink-2)', fontSize: 14, lineHeight: lang === 'ar' ? 1.85 : 1.6 }}>
        {detail}
      </div>
    </div>
  )
}
