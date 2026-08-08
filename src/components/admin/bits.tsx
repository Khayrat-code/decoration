import { useLang } from '../../i18n/LanguageContext'

export function ErrorAlert({ message }: { message: string }) {
  return (
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
      {message}
    </div>
  )
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  const { lang } = useLang()
  return (
    <div
      style={{
        background: 'var(--surface-2)',
        border: '1px dashed var(--line-2)',
        borderRadius: 'var(--radius)',
        padding: 48,
        textAlign: 'center',
        color: 'var(--ink-2)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 20,
          fontWeight: lang === 'ar' ? 700 : 400,
          color: 'var(--ink)',
          marginBottom: 6,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 14 }}>{body}</div>
    </div>
  )
}

export function SuccessNote({ text }: { text: string }) {
  return (
    <span style={{ fontSize: 13, color: 'var(--success)' }} role="status">
      {text}
    </span>
  )
}
