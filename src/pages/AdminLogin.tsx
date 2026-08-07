import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useT } from '../i18n/LanguageContext'

export function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const t = useT()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setSubmitting(false)
    if (error) {
      setError(error.message)
      return
    }
    navigate('/admin', { replace: true })
  }

  return (
    <section className="section">
      <div className="container-narrow" style={{ maxWidth: 460 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <span className="eyebrow">{t('adminLogin.eyebrow')}</span>
          <h1
            style={{
              fontSize: 36,
              marginTop: 12,
              marginBottom: 8,
            }}
          >
            {t('adminLogin.title')}
          </h1>
          <p style={{ color: 'var(--ink-2)', fontSize: 14 }}>{t('adminLogin.subtitle')}</p>
        </div>

        <form
          onSubmit={onSubmit}
          style={{
            background: 'var(--surface-2)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-lg)',
            padding: 28,
          }}
          noValidate
        >
          <div className="field">
            <label htmlFor="email">{t('adminLogin.email')}</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="password">{t('adminLogin.password')}</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
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
                padding: '10px 12px',
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
            style={{ width: '100%' }}
          >
            {submitting ? t('adminLogin.submitting') : t('adminLogin.submit')}
          </button>
        </form>

        <p
          style={{
            textAlign: 'center',
            color: 'var(--ink-3)',
            fontSize: 12,
            marginTop: 24,
          }}
        >
          {t('adminLogin.needAccess')}{' '}
          <Link to="/contact">{t('adminLogin.needAccessCta')}</Link>
        </p>
      </div>
    </section>
  )
}
