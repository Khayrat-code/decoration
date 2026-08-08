import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase, TABLES } from '../lib/supabase'

interface CoverImage {
  id: string
  image_url: string
  category: string
  title: string
}

/**
 * "واجهة" strip — a no-title, full-bleed horizontal showcase.
 *
 * Each room category in the user's library has a "واجهة" (cover) image.
 * This component finds them automatically (by storage_path = "img-…"
 * which is what the uploader produces for files whose original name
 * sanitises to empty — i.e. the Arabic واجهة / الواجهة files), then
 * lays them out as a large, swipeable, snap-scrolling strip.
 *
 * - No title, no heading. The visuals carry the section.
 * - One image is roughly 78% of the viewport wide on phones, ~38% on
 *   desktop, with the rest peeking in to show there is more.
 * - Pure CSS scroll-snap — no JS carousel logic, no autoplay, works
 *   on touch and trackpad.
 * - Subtle Framer-Motion reveal on first appearance (not mouse-driven).
 *
 * Centering: --card-w is defined in the <style> block below and is the
 * single source of truth for the card's main-axis size. The inline
 * padding uses calc((100vw - var(--card-w)) / 2) so the padding always
 * equals the leftover space on each side — first and last cards can
 * therefore scroll all the way to the center, in both LTR and RTL.
 */
export function ShowcaseStrip() {
  const [covers, setCovers] = useState<CoverImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const { data, error } = await supabase
        .from(TABLES.gallery)
        .select('id, title, category, image_url, storage_path')
        .order('category')
      if (cancelled) return
      if (error) {
        setLoading(false)
        return
      }
      const all = (data ?? []) as Array<CoverImage & { storage_path: string }>
      const byCategory = new Map<string, CoverImage & { storage_path: string }>()
      for (const row of all) {
        const existing = byCategory.get(row.category)
        if (!existing || existing.id < row.id) {
          byCategory.set(row.category, row)
        }
      }
      setCovers(
        Array.from(byCategory.values())
          .sort((a, b) => a.category.localeCompare(b.category)),
      )
      setLoading(false)
    })()
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return <div style={{ height: 120 }} aria-hidden="true" />
  }

  if (covers.length === 0) return null

  return (
    <section
      aria-label="Project covers"
      style={{
        padding: '32px 0 56px',
        background: 'var(--bg)',
      }}
    >
      <div
        className="showcase-strip"
        style={{
          display: 'flex',
          gap: 20,
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollSnapType: 'x mandatory',
          paddingInline:
            'max(20px, calc((100vw - var(--card-w, 78vw)) / 2))',
          scrollPaddingInline:
            'max(20px, calc((100vw - var(--card-w, 78vw)) / 2))',
          paddingBlock: 8,
        }}
      >
        {covers.map((cover, i) => (
          <motion.figure
            key={cover.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="showcase-card"
            style={{
              margin: 0,
              scrollSnapAlign: 'center',
              position: 'relative',
              borderRadius: 14,
              overflow: 'hidden',
              aspectRatio: '4 / 3',
              background: 'var(--bg-2)',
              boxShadow: '0 14px 40px -22px rgba(20, 22, 20, 0.32)',
            }}
          >
            <img
              src={cover.image_url}
              alt={cover.title}
              loading={i === 0 ? 'eager' : 'lazy'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </motion.figure>
        ))}
      </div>

      <style>{`
        .showcase-strip {
          -ms-overflow-style: none;
          scrollbar-width: none;
          --card-w: 78vw;
        }
        .showcase-strip::-webkit-scrollbar { display: none; }

        .showcase-card {
          flex: 0 0 var(--card-w);
          min-width: 260px;
        }

        @media (min-width: 720px) {
          .showcase-strip { --card-w: 46vw; }
        }
        @media (min-width: 1024px) {
          .showcase-strip { --card-w: 38vw; }
        }
      `}</style>
    </section>
  )
}
