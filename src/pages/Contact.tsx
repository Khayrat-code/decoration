import { useRef, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Paperclip, X } from 'lucide-react'
import { supabase, TABLES, BUCKETS } from '../lib/supabase'
import { useLang, useT } from '../i18n/LanguageContext'

const MAX_FILE_BYTES = 10 * 1024 * 1024 // 10 MB

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
  const [file, setFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const t = useT()
  const { lang } = useLang()

  const onChange = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null
    setError(null)
    if (f && f.size > MAX_FILE_BYTES) {
      setError(t('contact.form.errors.fileTooBig'))
      if (fileInputRef.current) fileInputRef.current.value = ''
      setFile(null)
      return
    }
    setFile(f)
  }

  const clearFile = () => {
    setFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
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

    let attachmentUrl: string | null = null
    if (file) {
      const ext = file.name.split('.').pop() || 'bin'
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
      const { error: uploadErr } = await supabase.storage.from(BUCKETS.contact).upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      })
      if (!uploadErr) {
        const { data } = supabase.storage.from(BUCKETS.contact).getPublicUrl(path)
        attachmentUrl = data.publicUrl
      }
      // If the bucket isn't provisioned yet, we simply skip the attachment
      // rather than blocking the whole submission.
    }

    const message = [
      `[${form.projectType || '—'}]`,
      form.spaceSize ? `${form.spaceSize} m²` : '',
      '',
      form.message.trim(),
    ]
      .filter(Boolean)
      .join('\n')

    const payload: Record<string, unknown> = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      message,
      attachment_url: attachmentUrl,
    }

    let dbError = (await supabase.from(TABLES.contact).insert(payload)).error
    if (dbError && /column .* does not exist/i.test(dbError.message)) {
      // attachment_url not migrated yet — retry without it so the form
      // still works before supabase-setup.sql has been re-run.
      delete payload.attachment_url
      dbError = (await supabase.from(TABLES.contact).insert(payload)).error
    }
    setSubmitting(false)

    if (dbError) {
      setError(dbError.message)
      return
    }
    setDone(true)
    setForm(empty)
    clearFile()
  }

  return (
    <section className="section">
      <div className="container-narrow">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="eyebrow">{t('contact.eyebrow')}</span>
          <h1
            style={{
              fontSize: 'var(--fs-h1)',
              fontWeight: 700,
              marginTop: 14,
              marginBottom: 18,
              lineHeight: 1.3,
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
              lineHeight: 1.95,
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
            className="form-card"
            style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-lg)',
            }}
            noValidate
          >
            {done ? (
              <div style={{ textAlign: 'center', padding: '40px 12px' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 26,
                    fontWeight: 700,
                    color: 'var(--ink)',
                    marginBottom: 10,
                  }}
                >
                  {t('contact.form.success.title')}
                </div>
                <p style={{ color: 'var(--ink-2)', fontSize: 16, lineHeight: 1.95 }}>
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

                <div className="field">
                  <label htmlFor="attachment">{t('contact.form.attachment')}</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    <label
                      htmlFor="attachment"
                      className="btn btn-secondary"
                      style={{ cursor: 'pointer', padding: '12px 18px', fontSize: 13 }}
                    >
                      <Paperclip size={15} /> {t('contact.form.attachmentPh')}
                    </label>
                    <input
                      ref={fileInputRef}
                      id="attachment"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={onFileChange}
                      style={{ display: 'none' }}
                    />
                    {file && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 8,
                          fontSize: 13,
                          color: 'var(--ink-2)',
                          background: 'var(--surface)',
                          border: '1px solid var(--line-2)',
                          borderRadius: 999,
                          padding: '6px 10px',
                        }}
                      >
                        {file.name}
                        <button
                          type="button"
                          onClick={clearFile}
                          aria-label="Remove file"
                          style={{
                            display: 'inline-flex',
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            color: 'var(--ink-3)',
                            padding: 0,
                          }}
                        >
                          <X size={13} />
                        </button>
                      </span>
                    )}
                  </div>
                  <span className="hint">{t('contact.form.attachmentHint')}</span>
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
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--accent)',
          marginBottom: 8,
          letterSpacing: 0,
          textTransform: 'none',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 22,
          fontWeight: 700,
          color: 'var(--ink)',
          marginBottom: 6,
          lineHeight: 1.4,
        }}
      >
        {value}
      </div>
      <div style={{ color: 'var(--ink-2)', fontSize: 15, lineHeight: 1.95 }}>
        {detail}
      </div>
    </div>
  )
}
