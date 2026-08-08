import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Home as HomeIcon,
  Layers,
  Image as ImageIcon,
  Folder,
  MessageSquare,
  Mail,
  FileText,
  BarChart3,
  ExternalLink,
  LogOut,
  type LucideIcon,
} from 'lucide-react'
import { supabase, TABLES, BUCKETS } from '../lib/supabase'
import type { GalleryItem } from '../components/GalleryGrid'
import { useLang, useT } from '../i18n/LanguageContext'
import T, { CATEGORIES } from '../i18n/translations'
import { Logo } from '../components/Logo'
import { HeroManager } from '../components/admin/HeroManager'
import { ServicesManager } from '../components/admin/ServicesManager'
import { CategoriesManager } from '../components/admin/CategoriesManager'
import { TestimonialsManager } from '../components/admin/TestimonialsManager'
import { InvoicesManager } from '../components/admin/InvoicesManager'
import { MessagesManager } from '../components/admin/MessagesManager'

type Tab =
  | 'hero'
  | 'services'
  | 'gallery'
  | 'categories'
  | 'testimonials'
  | 'messages'
  | 'invoices'
  | 'analytics'

const CATEGORY_OPTIONS = CATEGORIES.map((c) => c.key)

export function AdminDashboard() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('hero')
  const [unread, setUnread] = useState(0)
  const [signOutLabel, setSignOutLabel] = useState<string | null>(null)
  const t = useT()
  const { lang } = useLang()

  const handleSignOut = async () => {
    setSignOutLabel(t('admin.signingOut'))
    await supabase.auth.signOut()
    navigate('/admin/login', { replace: true })
  }

  const tabs: Array<{ key: Tab; label: string; icon: LucideIcon; badge?: number }> = [
    { key: 'hero', label: t('admin.tabHero'), icon: HomeIcon },
    { key: 'services', label: t('admin.tabServices'), icon: Layers },
    { key: 'gallery', label: t('admin.tabWorks'), icon: ImageIcon },
    { key: 'categories', label: t('admin.tabCategories'), icon: Folder },
    { key: 'testimonials', label: t('admin.tabTestimonials'), icon: MessageSquare },
    { key: 'messages', label: t('admin.tabMessages'), icon: Mail, badge: unread },
    { key: 'invoices', label: t('admin.tabInvoices'), icon: FileText },
    { key: 'analytics', label: t('analytics.title'), icon: BarChart3 },
  ]

  return (
    <div style={{ background: 'var(--bg)' }}>
      <header style={{ background: 'var(--ink)' }}>
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            padding: '14px 32px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <h1
              style={{
                fontSize: 20,
                fontWeight: lang === 'ar' ? 700 : 500,
                color: '#F5F1EA',
                margin: 0,
              }}
            >
              {t('admin.title')}
            </h1>
            <Logo size="sm" tone="light" />
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Link
              to="/"
              className="btn"
              style={{
                background: 'transparent',
                color: 'rgba(245, 241, 234, 0.85)',
                border: '1px solid rgba(245, 241, 234, 0.3)',
                padding: '10px 18px',
              }}
            >
              <ExternalLink size={15} /> {t('admin.preview')}
            </Link>
            <button
              type="button"
              className="btn"
              style={{
                background: 'rgba(176, 80, 80, 0.16)',
                color: '#E4A5A5',
                border: '1px solid rgba(176, 80, 80, 0.5)',
                padding: '10px 18px',
              }}
              onClick={handleSignOut}
            >
              <LogOut size={15} className="icon-flip" /> {signOutLabel ?? t('admin.signOut')}
            </button>
          </div>
        </div>
      </header>

      <div className="container" style={{ padding: '28px 32px 0' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }} role="tablist" aria-label={t('admin.title')}>
          {tabs.map(({ key, label, icon: Icon, badge }) => {
            const active = tab === key
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(key)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontFamily: 'inherit',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                  padding: '10px 18px',
                  borderRadius: 'var(--radius)',
                  border: active ? '1px solid var(--accent-2)' : '1px solid var(--line-2)',
                  background: active ? 'var(--accent-2)' : 'var(--surface)',
                  color: active ? '#FFFFFF' : 'var(--ink-2)',
                  transition: 'background-color 200ms, color 200ms, border-color 200ms',
                }}
              >
                <Icon size={16} strokeWidth={1.6} />
                {label}
                {typeof badge === 'number' && badge > 0 && (
                  <span
                    style={{
                      background: active ? '#FFFFFF' : 'var(--accent-2)',
                      color: active ? 'var(--accent-2)' : '#FFFFFF',
                      borderRadius: 999,
                      padding: '2px 9px',
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {badge}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <section style={{ padding: '32px 0 96px' }}>
        <div className="container">
          {tab === 'hero' && <HeroManager />}
          {tab === 'services' && <ServicesManager />}
          {tab === 'gallery' && <GalleryManager />}
          {tab === 'categories' && <CategoriesManager />}
          {tab === 'testimonials' && <TestimonialsManager />}
          {tab === 'messages' && <MessagesManager onUnreadChange={setUnread} />}
          {tab === 'invoices' && <InvoicesManager />}
          {tab === 'analytics' && <AnalyticsPanel />}
        </div>
      </section>
    </div>
  )
}

/* ----------------- Analytics panel ----------------- */

interface SessionRow {
  id: string
  session_id: string
  referrer: string | null
  user_agent: string | null
  language: string | null
  started_at: string
  last_seen_at: string
  page_count: number
}
interface EventRow {
  id: string
  session_id: string
  path: string
  duration_ms: number
  created_at: string
}

function AnalyticsPanel() {
  const t = useT()
  const { lang } = useLang()
  const [sessions, setSessions] = useState<SessionRow[]>([])
  const [events, setEvents] = useState<EventRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    const [s, e] = await Promise.all([
      supabase
        .from(TABLES.analyticsSessions)
        .select('*')
        .order('started_at', { ascending: false })
        .limit(500),
      supabase
        .from(TABLES.analyticsEvents)
        .select('*')
        .order('created_at', { ascending: false })
        .limit(2000),
    ])
    if (s.error) setError(s.error.message)
    if (e.error) setError(e.error.message)
    setSessions((s.data as SessionRow[]) ?? [])
    setEvents((e.data as EventRow[]) ?? [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const totalVisitors = new Set(sessions.map((s) => s.session_id)).size
  const totalEvents = events.length
  const durationsMs = events
    .map((e) => e.duration_ms)
    .filter((d) => d > 0)
  const avgDurationMs =
    durationsMs.length > 0
      ? Math.round(durationsMs.reduce((a, b) => a + b, 0) / durationsMs.length)
      : 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayVisitors = sessions.filter((s) => new Date(s.started_at) >= today).length

  const pathCounts = new Map<string, number>()
  events.forEach((e) => pathCounts.set(e.path, (pathCounts.get(e.path) ?? 0) + 1))
  const topPaths = Array.from(pathCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)

  const days: { label: string; count: number }[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    d.setDate(d.getDate() - i)
    const next = new Date(d)
    next.setDate(next.getDate() + 1)
    const count = sessions.filter((s) => {
      const t = new Date(s.started_at).getTime()
      return t >= d.getTime() && t < next.getTime()
    }).length
    days.push({
      label: d.toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', {
        weekday: 'short',
      }),
      count,
    })
  }
  const maxDay = Math.max(1, ...days.map((d) => d.count))

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: lang === 'ar' ? 700 : 500, marginBottom: 8 }}>
        {t('analytics.title')}
      </h2>
      <p style={{ color: 'var(--ink-2)', fontSize: 14, marginBottom: 24 }}>
        {t('analytics.subtitle')}
      </p>

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

      {loading ? (
        <div style={{ color: 'var(--ink-3)', padding: '32px 0' }}>…</div>
      ) : sessions.length === 0 && events.length === 0 ? (
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
          {t('analytics.empty')}
        </div>
      ) : (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 16,
              marginBottom: 32,
            }}
            className="kpi-grid"
          >
            <Kpi label={t('analytics.kpi.visitors')} value={totalVisitors} />
            <Kpi label={t('analytics.kpi.pageViews')} value={totalEvents} />
            <Kpi
              label={t('analytics.kpi.avgDuration')}
              value={formatDuration(avgDurationMs, lang, t)}
            />
            <Kpi label={t('analytics.kpi.todayVisitors')} value={todayVisitors} />
          </div>

          <Section label={t('analytics.dailyHeading')}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: 8,
                alignItems: 'end',
                height: 140,
                padding: '12px 0',
              }}
            >
              {days.map((d, i) => {
                const h = (d.count / maxDay) * 100
                return (
                  <div
                    key={i}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
                  >
                    <div style={{ fontSize: 12, color: 'var(--ink-2)' }}>{d.count}</div>
                    <div
                      style={{
                        width: '100%',
                        height: `${Math.max(h, 4)}%`,
                        background: 'var(--accent)',
                        borderRadius: 4,
                        minHeight: 4,
                      }}
                    />
                    <div
                      style={{
                        fontSize: 11,
                        color: 'var(--ink-3)',
                        letterSpacing: '0.08em',
                        textTransform: lang === 'ar' ? 'none' : 'uppercase',
                      }}
                    >
                      {d.label}
                    </div>
                  </div>
                )
              })}
            </div>
          </Section>

          <Section label={t('analytics.pagesHeading')}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: 14,
              }}
            >
              <thead>
                <tr>
                  <Th>{t('analytics.headers.path')}</Th>
                  <Th align={lang === 'ar' ? 'left' : 'right'}>{t('analytics.headers.pages')}</Th>
                </tr>
              </thead>
              <tbody>
                {topPaths.map(([path, count]) => (
                  <tr key={path}>
                    <Td>
                      <code
                        style={{
                          background: 'var(--bg-2)',
                          padding: '3px 8px',
                          borderRadius: 4,
                          fontSize: 12,
                          color: 'var(--ink)',
                        }}
                      >
                        {path}
                      </code>
                    </Td>
                    <Td align={lang === 'ar' ? 'left' : 'right'}>{count}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <Section label={t('analytics.recentsHeading')}>
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: 14,
                  minWidth: 720,
                }}
              >
                <thead>
                  <tr>
                    <Th>{t('analytics.headers.when')}</Th>
                    <Th>{t('analytics.headers.source')}</Th>
                    <Th>{t('analytics.headers.lang')}</Th>
                    <Th>{t('analytics.headers.device')}</Th>
                    <Th align={lang === 'ar' ? 'left' : 'right'}>{t('analytics.headers.pages')}</Th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.slice(0, 15).map((s) => {
                    const ref = (s.referrer || '').replace(/^https?:\/\//, '').split('/')[0] || '—'
                    return (
                      <tr key={s.id}>
                        <Td>{new Date(s.started_at).toLocaleString(lang === 'ar' ? 'ar-SA' : 'en-US')}</Td>
                        <Td>
                          <code
                            style={{
                              background: 'var(--bg-2)',
                              padding: '3px 8px',
                              borderRadius: 4,
                              fontSize: 12,
                            }}
                          >
                            {ref}
                          </code>
                        </Td>
                        <Td>{s.language || '—'}</Td>
                        <Td>{deviceLabel(s.user_agent || '')}</Td>
                        <Td align={lang === 'ar' ? 'left' : 'right'}>{s.page_count}</Td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Section>
        </>
      )}

      <style>{`
        @media (max-width: 720px) {
          .kpi-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  )
}

function Kpi({ label, value }: { label: string; value: number | string }) {
  return (
    <div
      style={{
        background: 'var(--surface-2)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius)',
        padding: 20,
      }}
    >
      <div
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 40,
          fontWeight: 400,
          color: 'var(--ink)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}
      >
        {value}
      </div>
      <div
        style={{
          marginTop: 8,
          fontSize: 12,
          color: 'var(--ink-3)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius)',
        padding: 20,
        marginBottom: 24,
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 500,
          color: 'var(--ink-3)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          marginBottom: 16,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  )
}

function Th({ children, align }: { children: React.ReactNode; align?: 'left' | 'right' }) {
  return (
    <th
      style={{
        textAlign: align ?? 'start',
        padding: '8px 12px',
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--ink-3)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      {children}
    </th>
  )
}
function Td({ children, align }: { children: React.ReactNode; align?: 'left' | 'right' }) {
  return (
    <td
      style={{
        textAlign: align,
        padding: '10px 12px',
        borderBottom: '1px solid var(--line)',
        color: 'var(--ink)',
      }}
    >
      {children}
    </td>
  )
}

function deviceLabel(ua: string): string {
  if (/iPhone/i.test(ua)) return 'iPhone'
  if (/iPad/i.test(ua)) return 'iPad'
  if (/Android/i.test(ua)) return 'Android'
  if (/Macintosh/i.test(ua)) return 'Mac'
  if (/Windows/i.test(ua)) return 'Windows'
  if (/Linux/i.test(ua)) return 'Linux'
  return '—'
}

function formatDuration(ms: number, lang: 'ar' | 'en', t: (k: string, v?: Record<string, string | number>) => string) {
  if (ms < 1000) return '—'
  const totalSec = Math.round(ms / 1000)
  if (totalSec < 60) return `${totalSec}s`
  const min = Math.floor(totalSec / 60)
  const sec = totalSec % 60
  if (lang === 'ar') {
    return sec > 0 ? `${min} ${t('analytics.duration.minutes')} ${sec}` : `${min} ${t('analytics.duration.minutes')}`
  }
  return sec > 0 ? `${min}m ${sec}s` : `${min}m`
}

/* ----------------- Gallery manager ----------------- */

function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<GalleryItem | null>(null)
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const t = useT()
  const { lang, category } = useLang()

  const load = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from(TABLES.gallery)
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
    if (error) setError(error.message)
    setItems((data as GalleryItem[]) ?? [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const onDelete = async (item: GalleryItem) => {
    if (!confirm(t('admin.gallery.deleteConfirm', { title: item.title }))) return
    setError(null)
    const { error: storageErr } = await supabase.storage
      .from(BUCKETS.gallery)
      .remove([item.storage_path])
    if (storageErr) {
      console.warn('storage remove warning:', storageErr.message)
    }
    const { error: dbErr } = await supabase.from(TABLES.gallery).delete().eq('id', item.id)
    if (dbErr) {
      setError(dbErr.message)
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
          marginBottom: 20,
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <h2
          style={{
            fontSize: 22,
            fontWeight: lang === 'ar' ? 700 : 500,
          }}
        >
          {t('admin.gallery.heading')}
        </h2>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setAdding(true)
            setEditing(null)
          }}
        >
          {t('admin.gallery.addBtn')}
        </button>
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

      {(adding || editing) && (
        <ImageForm
          item={editing}
          onClose={() => {
            setAdding(false)
            setEditing(null)
          }}
          onSaved={async () => {
            setAdding(false)
            setEditing(null)
            await load()
          }}
        />
      )}

      {loading ? (
        <div style={{ color: 'var(--ink-3)', padding: '32px 0' }}>…</div>
      ) : items.length === 0 ? (
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
            {t('admin.gallery.emptyTitle')}
          </div>
          <div style={{ fontSize: 14 }}>{t('admin.gallery.emptyBody')}</div>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 16,
          }}
        >
          {items.map((it) => (
            <div
              key={it.id}
              style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  aspectRatio: '1 / 1',
                  background: 'var(--bg-2)',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={it.image_url}
                  alt={it.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 15,
                    fontWeight: lang === 'ar' ? 700 : 400,
                    color: 'var(--ink)',
                  }}
                >
                  {it.title}
                </div>
                {it.category && (
                  <div
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.16em',
                      textTransform: lang === 'ar' ? 'none' : 'uppercase',
                      color: 'var(--ink-3)',
                    }}
                  >
                    {category(it.category)}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ padding: '6px 12px', fontSize: 13, flex: 1 }}
                    onClick={() => {
                      setEditing(it)
                      setAdding(false)
                    }}
                  >
                    {t('admin.gallery.editBtn')}
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{ padding: '6px 12px', fontSize: 13 }}
                    onClick={() => onDelete(it)}
                  >
                    {t('admin.gallery.deleteBtn')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ImageForm({
  item,
  onClose,
  onSaved,
}: {
  item: GalleryItem | null
  onClose: () => void
  onSaved: () => Promise<void> | void
}) {
  const isEdit = !!item
  const [title, setTitle] = useState(item?.title ?? '')
  const [description, setDescription] = useState(item?.description ?? '')
  const [category, setCategory] = useState(item?.category ?? 'Living')
  const [sortOrder, setSortOrder] = useState<number>(item?.sort_order ?? 0)
  const [file, setFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const t = useT()
  const { lang, category: trCat } = useLang()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!title.trim()) {
      setError(t('admin.gallery.form.titleRequired'))
      return
    }
    if (!isEdit && !file) {
      setError(t('admin.gallery.form.fileRequired'))
      return
    }

    setSubmitting(true)
    try {
      if (isEdit && item) {
        let imageUrl = item.image_url
        let storagePath = item.storage_path

        if (file) {
          const ext = file.name.split('.').pop() || 'jpg'
          const newPath = `images/${item.id}-${Date.now()}.${ext}`
          const { error: upErr } = await supabase.storage
            .from(BUCKETS.gallery)
            .upload(newPath, file, { upsert: true, contentType: file.type })
          if (upErr) throw upErr
          await supabase.storage.from(BUCKETS.gallery).remove([item.storage_path])
          const { data: pub } = supabase.storage.from(BUCKETS.gallery).getPublicUrl(newPath)
          imageUrl = pub.publicUrl
          storagePath = newPath
        }

        const { error: dbErr } = await supabase
          .from(TABLES.gallery)
          .update({
            title: title.trim(),
            description: description.trim() || null,
            category: category.trim() || 'General',
            sort_order: sortOrder,
            image_url: imageUrl,
            storage_path: storagePath,
            updated_at: new Date().toISOString(),
          })
          .eq('id', item.id)
        if (dbErr) throw dbErr
      } else {
        const ext = file!.name.split('.').pop() || 'jpg'
        const id = crypto.randomUUID()
        const path = `images/${id}.${ext}`

        const { error: upErr } = await supabase.storage
          .from(BUCKETS.gallery)
          .upload(path, file!, { contentType: file!.type })
        if (upErr) throw upErr

        const { data: pub } = supabase.storage.from(BUCKETS.gallery).getPublicUrl(path)
        const { error: dbErr } = await supabase.from(TABLES.gallery).insert({
          id,
          title: title.trim(),
          description: description.trim() || null,
          category: category.trim() || 'General',
          sort_order: sortOrder,
          image_url: pub.publicUrl,
          storage_path: path,
        })
        if (dbErr) throw dbErr
      }

      await onSaved()
    } catch (err: any) {
      setError(err?.message ?? String(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{
        background: 'var(--surface-2)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius-lg)',
        padding: 24,
        marginBottom: 24,
      }}
      noValidate
    >
      <h3 style={{ fontSize: 18, fontWeight: lang === 'ar' ? 700 : 500, marginBottom: 16 }}>
        {isEdit ? t('admin.gallery.form.editTitle') : t('admin.gallery.form.addTitle')}
      </h3>

      <div className="field">
        <label htmlFor="img-title">{t('admin.gallery.form.title')}</label>
        <input
          id="img-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="field">
          <label htmlFor="img-cat">{t('admin.gallery.form.category')}</label>
          <select id="img-cat" value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORY_OPTIONS.map((k) => (
              <option key={k} value={k}>
                {trCat(k)}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="img-order">{t('admin.gallery.form.sortOrder')}</label>
          <input
            id="img-order"
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="img-desc">{t('admin.gallery.form.description')}</label>
        <textarea
          id="img-desc"
          value={description ?? ''}
          onChange={(e) => setDescription(e.target.value)}
          style={{ minHeight: 80 }}
        />
      </div>

      <div className="field">
        <label htmlFor="img-file">
          {isEdit ? t('admin.gallery.form.fileReplace') : t('admin.gallery.form.file')}
        </label>
        <input
          id="img-file"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <span className="hint">{t('admin.gallery.form.fileHint')}</span>
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

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          type="submit"
          className="btn"
          disabled={submitting}
          aria-disabled={submitting}
        >
          {submitting
            ? t('admin.gallery.form.saving')
            : isEdit
            ? t('admin.gallery.form.save')
            : t('admin.gallery.form.add')}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onClose}
          disabled={submitting}
        >
          {t('admin.gallery.form.cancel')}
        </button>
      </div>
    </form>
  )
}
