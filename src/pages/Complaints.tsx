import { useRef, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Paperclip, X } from 'lucide-react'
import { supabase, TABLES, BUCKETS } from '../lib/supabase'
import { useLang, useT } from '../i18n/LanguageContext'

const MAX_FILE_BYTES = 10 * 1024 * 1024 // 10 MB

interface FormState {
  name: string
  email: string
  phone: string
  type: 'complaint' | 'suggestion' | 'remark' | 'inquiry'
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
  const [file, setFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const t = useT()
  const { lang } = useLang()

  const onChange = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null
    setError(null)
    if (f && f.size > MAX_FILE_BYTES) {
      setError(t('complaints.form.errors.fileTooBig'))
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
      setError(t('complaints.form.errors.required'))
      return
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError(t('complaints.form.errors.email'))
      return
    }

    setSubmitting(true)

    let attachmentUrl: string | null = null
    if (file) {
      const ext = file.name.split('.').pop() || 'bin'
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
      const { error: uploadErr } = await supabase.storage.from(BUCKETS.complaints).upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      })
      if (!uploadErr) {
        const { data } = supabase.storage.from(BUCKETS.complaints).getPublicUrl(path)
        attachmentUrl = data.publicUrl
      }
      // If the bucket isn't provisioned yet, we simply skip the attachment
      // rather than blocking the whole submission.
    }

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      type: form.type,
      subject: form.orderRef.trim() || null,
      message: form.message.trim(),
      attachment_url: attachmentUrl,
    }

    let primary = await supabase.from(TABLES.complaints).insert(payload)
    if (primary.error && /relation .* does not exist|schema cache|column .* does not exist/i.test(primary.error.message)) {
      // Table/column not migrated yet — fall back to contact_submissions
      // so the form always works even before supabase-setup.sql is run.
      await supabase.from(TABLES.contact).insert({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        message: `[${payload.type}]${payload.subject ? ' #' + payload.subject : ''}\n\n${payload.message}${attachmentUrl ? '\n\n' + attachmentUrl : ''}`,
      })
    } else if (primary.error) {
      setSubmitting(false)
      setError(primary.error.message)
      return
    }

    setSubmitting(false)
    setDone(true)
    setForm(empty)
    clearFile()
  }

  const typeOptions: Array<{ value: FormState['type']; label: string }> = [
    { value: 'complaint', label: t('complaints.form.typeComplaint') },
    { value: 'suggestion', label: t('complaints.form.typeSuggestion') },
    { value: 'remark', label: t('complaints.form.typeRemark') },
    { value: 'inquiry', label: t('complaints.form.typeInquiry') },
  ]

  return (
    <section className="section">
      <div className="container-narrow">
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span className="eyebrow">{t('complaints.eyebrow')}</span>
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
            {t('complaints.title')}
          </h1>
          <p
            style={{
              color: 'var(--ink-2)',
              fontSize: 18,
              lineHeight: 1.95,
              maxWidth: 620,
              margin: '0 auto',
            }}
          >
            {t('complaints.body')}
          </p>
        </div>

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
            maxWidth: 680,
            margin: '0 auto',
          }}
          noValidate
        >
          {done ? (
            <div style={{ textAlign: 'center', padding: '32px 12px' }}>
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
                  marginBottom: 18,
                }}
              >
                <CheckCircle2 size={28} strokeWidth={1.5} />
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 26,
                  fontWeight: 700,
                  color: 'var(--ink)',
                  marginBottom: 12,
                }}
              >
                {t('complaints.form.success.title')}
              </div>
              <p style={{ color: 'var(--ink-2)', fontSize: 16, lineHeight: 1.95, maxWidth: 460, margin: '0 auto' }}>
                {t('complaints.form.success.body')}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 18,
                  fontWeight: 700,
                  color: 'var(--accent)',
                  marginTop: 20,
                }}
              >
                {t('complaints.form.tagline')}
              </p>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setDone(false)}
                style={{ marginTop: 20 }}
              >
                {t('complaints.form.sendAnother')}
              </button>
            </div>
          ) : (
            <>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  marginBottom: 24,
                }}
              >
                {t('complaints.formHeading')}
              </h2>

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
                  {typeOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <span className="hint">{t('complaints.form.typeHint')}</span>
              </div>

              <div className="field">
                <label htmlFor="c-name">{t('complaints.form.name')}</label>
                <input
                  id="c-name"
                  type="text"
                  value={form.name}
                  onChange={onChange('name')}
                  placeholder={t('complaints.form.namePh')}
                  autoComplete="name"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="complaints-row">
                <div className="field">
                  <label htmlFor="c-phone">{t('complaints.form.phone')}</label>
                  <input
                    id="c-phone"
                    type="tel"
                    value={form.phone}
                    onChange={onChange('phone')}
                    placeholder={t('complaints.form.phonePh')}
                    autoComplete="tel"
                    dir="ltr"
                  />
                </div>
                <div className="field">
                  <label htmlFor="c-email">{t('complaints.form.email')}</label>
                  <input
                    id="c-email"
                    type="email"
                    value={form.email}
                    onChange={onChange('email')}
                    placeholder={t('complaints.form.emailPh')}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="c-orderRef">{t('complaints.form.orderRef')}</label>
                <input
                  id="c-orderRef"
                  type="text"
                  value={form.orderRef}
                  onChange={onChange('orderRef')}
                  placeholder={t('complaints.form.orderRefPh')}
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

              <div className="field">
                <label htmlFor="c-attachment">{t('complaints.form.attachment')}</label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    flexWrap: 'wrap',
                  }}
                >
                  <label
                    htmlFor="c-attachment"
                    className="btn btn-secondary"
                    style={{ cursor: 'pointer', padding: '12px 18px', fontSize: 13 }}
                  >
                    <Paperclip size={15} /> {t('complaints.form.attachmentPh')}
                  </label>
                  <input
                    ref={fileInputRef}
                    id="c-attachment"
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
                <span className="hint">{t('complaints.form.attachmentHint')}</span>
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

              <div
                style={{
                  borderTop: '1px solid var(--line)',
                  paddingTop: 20,
                  marginTop: 8,
                  marginBottom: 20,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>
                  {t('complaints.form.afterHeading')}
                </div>
                <p style={{ color: 'var(--ink-2)', fontSize: 14, lineHeight: 1.9, margin: 0 }}>
                  {t('complaints.form.afterBody')}
                </p>
              </div>

              <button
                type="submit"
                className="btn"
                disabled={submitting}
                aria-disabled={submitting}
                style={{ width: '100%' }}
              >
                {submitting ? t('complaints.form.submitting') : t('complaints.form.submit')}
              </button>
            </>
          )}
        </motion.form>

        <style>{`
          @media (max-width: 560px) {
            .complaints-row { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  )
}
