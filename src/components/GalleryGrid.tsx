import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import Lightbox from 'yet-another-react-lightbox'
import { Captions, Thumbnails, Zoom, Fullscreen, Counter } from 'yet-another-react-lightbox/plugins'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import 'yet-another-react-lightbox/plugins/counter.css'
import { supabase, TABLES } from '../lib/supabase'
import { useLang, useT } from '../i18n/LanguageContext'

export interface GalleryItem {
  id: string
  title: string
  description: string | null
  image_url: string
  storage_path: string
  category: string
  sort_order: number
  created_at: string
}

interface GalleryGridProps {
  items?: GalleryItem[]
  showCategories?: boolean
  /** When true, only render the grid + filter (no internal lightbox). Use for featured sections. */
  compact?: boolean
}

export function GalleryGrid({ items: propItems, showCategories = true, compact = false }: GalleryGridProps) {
  const [items, setItems] = useState<GalleryItem[]>(propItems ?? [])
  const [loading, setLoading] = useState(!propItems)
  const [error, setError] = useState<string | null>(null)
  const [active, setActive] = useState<string>('All')
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const t = useT()
  const { lang, category } = useLang()

  useEffect(() => {
    if (propItems) return
    let cancelled = false
    ;(async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from(TABLES.gallery)
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })
      if (cancelled) return
      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }
      setItems((data as GalleryItem[]) ?? [])
      setLoading(false)
    })()
    return () => {
      cancelled = true
    }
  }, [propItems])

  const allLabel = t('gallery.allLabel')
  const categories = useMemo(
    () => [
      { value: '__all__', label: allLabel },
      ...Array.from(new Set(items.map((i) => i.category || 'General'))).map((c) => ({
        value: c,
        label: category(c),
      })),
    ],
    [items, allLabel, category],
  )
  const visible = useMemo(
    () => (active === '__all__' ? items : items.filter((i) => (i.category || 'General') === active)),
    [items, active],
  )
  const lightboxItem = lightboxIdx !== null ? visible[lightboxIdx] : null

  if (loading) {
    return (
      <div
        style={{
          padding: '120px 0',
          textAlign: 'center',
          color: 'var(--ink-3)',
          fontSize: 13,
          letterSpacing: lang === 'ar' ? 0 : '0.18em',
          textTransform: lang === 'ar' ? 'none' : 'uppercase',
        }}
      >
        {t('gallery.loading')}
      </div>
    )
  }

  if (error) {
    return (
      <div
        style={{
          padding: '48px 24px',
          margin: '32px auto',
          maxWidth: 560,
          background: 'var(--surface-2)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius)',
          color: 'var(--ink-2)',
          fontSize: 15,
          textAlign: 'center',
        }}
      >
        {t('gallery.errorPrefix')} {error}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div
        style={{
          padding: '120px 24px',
          textAlign: 'center',
          color: 'var(--ink-3)',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 28,
            fontWeight: lang === 'ar' ? 700 : 400,
            color: 'var(--ink-2)',
            marginBottom: 8,
          }}
        >
          {t('gallery.empty.title')}
        </div>
        <div style={{ fontSize: 15 }}>{t('gallery.empty.sub')}</div>
      </div>
    )
  }

  return (
    <div>
      {showCategories && categories.length > 2 && (
        <div
          role="tablist"
          aria-label="Gallery categories"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 56,
            justifyContent: 'center',
          }}
        >
          {categories.map((c) => {
            const isActive = c.value === active
            return (
              <button
                key={c.value}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(c.value)}
                style={{
                  fontFamily: 'inherit',
                  fontSize: lang === 'ar' ? 13 : 12,
                  fontWeight: 500,
                  letterSpacing: lang === 'ar' ? 0 : '0.18em',
                  textTransform: lang === 'ar' ? 'none' : 'uppercase',
                  padding: '10px 20px',
                  borderRadius: 999,
                  border: '1px solid',
                  borderColor: isActive ? 'var(--accent)' : 'var(--line-2)',
                  background: isActive ? 'var(--accent)' : 'transparent',
                  color: isActive ? 'var(--bg)' : 'var(--ink-2)',
                  cursor: 'pointer',
                  transition: 'all 220ms var(--ease-out-soft)',
                }}
              >
                {c.label}
              </button>
            )
          })}
        </div>
      )}

      <motion.div
        className="gallery-masonry"
        layout
        style={{ columnGap: 24 }}
      >
        {visible.map((item, idx) => (
          <GalleryCard
            key={item.id}
            item={item}
            index={idx}
            onClick={() => setLightboxIdx(idx)}
          />
        ))}
      </motion.div>

      {!compact && lightboxIdx !== null && (
        <Lightbox
          open
          index={lightboxIdx}
          close={() => setLightboxIdx(null)}
          slides={visible.map((it) => ({
            src: it.image_url,
            alt: it.title,
            title: it.title,
            description: it.description ?? it.category,
            width: 1920,
            height: 1080,
          }))}
          plugins={[Captions, Thumbnails, Zoom, Fullscreen, Counter]}
          captions={{ showToggle: true, descriptionTextAlign: 'center' }}
          thumbnails={{ position: 'bottom', border: 0, borderRadius: 4, gap: 8, width: 100, height: 60 }}
          zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true }}
          counter={{ container: { style: { top: 'unset', bottom: 0, right: 0, left: 'unset', padding: '12px 16px', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase' } } }}
          styles={{ container: { backgroundColor: 'rgba(20, 22, 20, 0.96)' } }}
        />
      )}

      <style>{`
        .gallery-masonry {
          column-count: 3;
          column-gap: 24px;
        }
        @media (max-width: 1024px) { .gallery-masonry { column-count: 2; } }
        @media (max-width: 600px)  { .gallery-masonry { column-count: 1; } }
      `}</style>
    </div>
  )
}

function GalleryCard({
  item,
  index,
  onClick,
}: {
  item: GalleryItem
  index: number
  onClick: () => void
}) {
  // Mixed aspect ratios give the grid an editorial feel rather than a uniform wall.
  const aspectChoices = ['4 / 5', '3 / 4', '1 / 1', '4 / 3', '3 / 2', '16 / 9']
  const aspect = aspectChoices[(index * 7 + (item.sort_order || 0)) % aspectChoices.length]
  const { lang, category } = useLang()

  return (
    <motion.button
      onClick={onClick}
      aria-label={`Open ${item.title}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 6) * 0.04, ease: [0.16, 1, 0.3, 1] }}
      style={{
        all: 'unset',
        cursor: 'pointer',
        display: 'block',
        width: '100%',
        marginBottom: 24,
        breakInside: 'avoid',
        background: 'var(--surface-2)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'relative',
          aspectRatio: aspect,
          background: 'var(--bg-2)',
          overflow: 'hidden',
        }}
      >
        <img
          src={item.image_url}
          alt={item.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(20,22,20,0) 60%, rgba(20,22,20,0.55) 100%)',
            opacity: 0,
            transition: 'opacity 260ms var(--ease-out-soft)',
          }}
          className="gallery-card-veil"
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 18,
            right: 18,
            bottom: 18,
            color: '#F5F1EA',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 12,
            opacity: 0,
            transition: 'opacity 260ms var(--ease-out-soft)',
          }}
          className="gallery-card-meta"
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: lang === 'ar' ? 17 : 18,
                fontWeight: lang === 'ar' ? 700 : 400,
                lineHeight: lang === 'ar' ? 1.4 : 1.2,
                marginBottom: 4,
              }}
            >
              {item.title}
            </div>
            {item.category && (
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: lang === 'ar' ? 0 : '0.22em',
                  textTransform: lang === 'ar' ? 'none' : 'uppercase',
                  color: 'rgba(245, 241, 234, 0.78)',
                }}
              >
                {category(item.category)}
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        button[aria-label^="Open "]:hover .gallery-card-veil,
        button[aria-label^="Open "]:focus-visible .gallery-card-veil { opacity: 1; }
        button[aria-label^="Open "]:hover .gallery-card-meta,
        button[aria-label^="Open "]:focus-visible .gallery-card-meta { opacity: 1; }
      `}</style>
    </motion.button>
  )
}
