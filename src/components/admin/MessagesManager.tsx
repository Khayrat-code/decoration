import { useEffect, useState } from 'react'
import { MailOpen, Mail } from 'lucide-react'
import { useLang, useT } from '../../i18n/LanguageContext'
import { supabase, TABLES } from '../../lib/supabase'
import { ErrorAlert, EmptyState } from './bits'

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  read: boolean
  created_at: string
}

export function MessagesManager({ onUnreadChange }: { onUnreadChange?: (n: number) => void }) {
  const t = useT()
  const { lang } = useLang()
  const [items, setItems] = useState<ContactSubmission[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const unread = items.filter((i) => !i.read).length
  const selected = items.find((i) => i.id === selectedId) ?? null

  useEffect(() => {
    onUnreadChange?.(unread)
  }, [unread, onUnreadChange])

  const load = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from(TABLES.contact)
      .select('*')
      .order('created_at', { ascending: false })
    if (error) setError(error.message)
    setItems((data as ContactSubmission[]) ?? [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const setRead = async (s: ContactSubmission, read: boolean) => {
    const { error: err } = await supabase.from(TABLES.contact).update({ read }).eq('id', s.id)
    if (err) {
      setError(err.message)
      return
    }
    setItems((arr) => arr.map((i) => (i.id === s.id ? { ...i, read } : i)))
  }

  const onSelect = (s: ContactSubmission) => {
    setSelectedId(s.id)
    if (!s.read) setRead(s, true)
  }

  const onDelete = async (s: ContactSubmission) => {
    if (!confirm(t('admin.messages.deleteConfirm', { name: s.name }))) return
    const { error: err } = await supabase.from(TABLES.contact).delete().eq('id', s.id)
    if (err) {
      setError(err.message)
      return
    }
    setItems((arr) => arr.filter((i) => i.id !== s.id))
    if (selectedId === s.id) setSelectedId(null)
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h2 style={{ fontSize: 22, fontWeight: lang === 'ar' ? 700 : 500 }}>
            {t('admin.messages.heading')}
          </h2>
          {unread > 0 && (
            <span
              style={{
                background: 'var(--accent-2)',
                color: '#fff',
                borderRadius: 999,
                padding: '4px 12px',
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {t('admin.newBadge', { n: unread })}
            </span>
          )}
        </div>
        <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>
          {t('admin.totalMessages', { n: items.length })}
        </span>
      </div>

      {error && <ErrorAlert message={error} />}

      {loading ? (
        <div style={{ color: 'var(--ink-3)', padding: '32px 0' }}>…</div>
      ) : items.length === 0 ? (
        <EmptyState title={t('admin.messages.emptyTitle')} body={t('admin.messages.emptyBody')} />
      ) : (
        <div
          className="msg-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 16, alignItems: 'start' }}
        >
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              maxHeight: 560,
              overflowY: 'auto',
            }}
          >
            {items.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => onSelect(s)}
                  style={{
                    width: '100%',
                    textAlign: 'start',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    background: selectedId === s.id ? 'var(--surface)' : 'var(--surface-2)',
                    border: '1px solid var(--line)',
                    borderInlineStart: `3px solid ${s.read ? 'var(--line-2)' : 'var(--accent-2)'}`,
                    borderRadius: 'var(--radius)',
                    padding: '14px 16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {!s.read && (
                      <span
                        aria-hidden="true"
                        style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--accent-2)', flexShrink: 0 }}
                      />
                    )}
                    <span style={{ fontWeight: lang === 'ar' ? 700 : 600, color: 'var(--ink)', fontSize: 15 }}>
                      {s.name}
                    </span>
                  </div>
                  <div dir="ltr" style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4, textAlign: lang === 'ar' ? 'right' : 'left' }}>
                    {s.email}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: 'var(--ink-2)',
                      marginTop: 6,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {s.message}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 6 }}>
                    {new Date(s.created_at).toLocaleString(lang === 'ar' ? 'ar-SA' : 'en-US')}
                  </div>
                </button>
              </li>
            ))}
          </ul>

          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-lg)',
              padding: 24,
              minHeight: 420,
            }}
          >
            {selected ? (
              <>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: lang === 'ar' ? 700 : 500, color: 'var(--ink)' }}>
                    {selected.name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>
                    {new Date(selected.created_at).toLocaleString(lang === 'ar' ? 'ar-SA' : 'en-US')}
                  </div>
                </div>
                <div style={{ fontSize: 14, color: 'var(--ink-2)', marginBottom: 4 }}>
                  <a href={`mailto:${selected.email}`} dir="ltr">{selected.email}</a>
                </div>
                {selected.phone && (
                  <div style={{ fontSize: 14, color: 'var(--ink-2)', marginBottom: 4 }} dir="ltr">
                    {selected.phone}
                  </div>
                )}
                <p
                  style={{
                    color: 'var(--ink-2)',
                    fontSize: 15,
                    lineHeight: lang === 'ar' ? 1.95 : 1.7,
                    whiteSpace: 'pre-wrap',
                    margin: '16px 0 20px',
                    paddingTop: 16,
                    borderTop: '1px solid var(--line)',
                  }}
                >
                  {selected.message}
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ padding: '8px 14px', fontSize: 13 }}
                    onClick={() => setRead(selected, !selected.read)}
                  >
                    {selected.read ? <Mail size={15} /> : <MailOpen size={15} />}
                    {selected.read ? t('admin.messages.markUnread') : t('admin.messages.markRead')}
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{ padding: '8px 14px', fontSize: 13 }}
                    onClick={() => onDelete(selected)}
                  >
                    {t('admin.messages.delete')}
                  </button>
                </div>
              </>
            ) : (
              <div
                style={{
                  height: '100%',
                  minHeight: 360,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                  color: 'var(--ink-3)',
                }}
              >
                <Mail size={40} strokeWidth={1.2} />
                <div style={{ fontSize: 14 }}>{t('admin.selectMessage')}</div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 880px) {
          .msg-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
