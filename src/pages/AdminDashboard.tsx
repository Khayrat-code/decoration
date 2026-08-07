import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, TABLES, BUCKETS } from '../lib/supabase'
import type { GalleryItem } from '../components/GalleryGrid'
import { useLang, useT } from '../i18n/LanguageContext'
import T, { CATEGORIES } from '../i18n/translations'

type Tab = 'gallery' | 'submissions'

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  read: boolean
  created_at: string
}

const CATEGORY_OPTIONS = CATEGORIES.map((c) => c.key)

export function AdminDashboard() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('gallery')
  const [signOutLabel, setSignOutLabel] = useState<string | null>(null)
  const t = useT()
  const { lang } = useLang()

  const handleSignOut = async () => {
    setSignOutLabel(t('admin.signingOut'))
    await supabase.auth.signOut()
    navigate('/admin/login', { replace: true })
  }

  return (
    <section className="section">
      <div className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div>
            <span className="eyebrow">{t('admin.eyebrow')}</span>
            <h1
              style={{
                fontSize: 36,
                marginTop: 8,
                fontWeight: lang === 'ar' ? 700 : 400,
              }}
            >
              {t('admin.title')}
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              type="button"
              className={tab === 'gallery' ? 'btn' : 'btn btn-secondary'}
              onClick={() => setTab('gallery')}
            >
              {t('admin.tabGallery')}
            </button>
            <button
              type="button"
              className={tab === 'submissions' ? 'btn' : 'btn btn-secondary'}
              onClick={() => setTab('submissions')}
            >
              {t('admin.tabMessages')}
            </button>
            <button type="button" className="btn btn-ghost" onClick={handleSignOut}>
              {signOutLabel ?? t('admin.signOut')}
            </button>
          </div>
        </div>

        {tab === 'gallery' ? <GalleryManager /> : <SubmissionsManager />}
      </div>
    </section>
  )
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

/* ----------------- Submissions manager ----------------- */

function SubmissionsManager() {
  const [items, setItems] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const t = useT()
  const { lang } = useLang()

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

  const toggleRead = async (s: ContactSubmission) => {
    const { error } = await supabase
      .from(TABLES.contact)
      .update({ read: !s.read })
      .eq('id', s.id)
    if (error) {
      setError(error.message)
      return
    }
    setItems((arr) => arr.map((i) => (i.id === s.id ? { ...i, read: !s.read } : i)))
  }

  const onDelete = async (s: ContactSubmission) => {
    if (!confirm(t('admin.messages.deleteConfirm', { name: s.name }))) return
    const { error } = await supabase.from(TABLES.contact).delete().eq('id', s.id)
    if (error) {
      setError(error.message)
      return
    }
    setItems((arr) => arr.filter((i) => i.id !== s.id))
  }

  return (
    <div>
      <h2
        style={{
          fontSize: 22,
          fontWeight: lang === 'ar' ? 700 : 500,
          marginBottom: 20,
        }}
      >
        {t('admin.messages.heading')}
      </h2>

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
            {t('admin.messages.emptyTitle')}
          </div>
          <div style={{ fontSize: 14 }}>{t('admin.messages.emptyBody')}</div>
        </div>
      ) : (
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          {items.map((s) => (
            <li
              key={s.id}
              style={{
                background: s.read ? 'var(--surface-2)' : 'var(--surface)',
                border: '1px solid var(--line)',
                borderInlineStart: `3px solid ${s.read ? 'var(--line-2)' : 'var(--accent)'}`,
                borderRadius: 'var(--radius)',
                padding: 20,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 17,
                      fontWeight: lang === 'ar' ? 700 : 400,
                      color: 'var(--ink)',
                    }}
                  >
                    {s.name}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>
                    <a href={`mailto:${s.email}`} style={{ color: 'var(--ink-2)' }}>
                      {s.email}
                    </a>
                    {s.phone && <> · {s.phone}</>}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: 'var(--ink-3)',
                  }}
                >
                  {new Date(s.created_at).toLocaleString(lang === 'ar' ? 'ar-SA' : 'en-US')}
                </div>
              </div>
              <p
                style={{
                  color: 'var(--ink-2)',
                  fontSize: 14,
                  lineHeight: lang === 'ar' ? 1.95 : 1.6,
                  whiteSpace: 'pre-wrap',
                  margin: 0,
                }}
              >
                {s.message}
              </p>
              <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ padding: '6px 12px', fontSize: 13 }}
                  onClick={() => toggleRead(s)}
                >
                  {s.read ? t('admin.messages.markUnread') : t('admin.messages.markRead')}
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ padding: '6px 12px', fontSize: 13 }}
                  onClick={() => onDelete(s)}
                >
                  {t('admin.messages.delete')}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
