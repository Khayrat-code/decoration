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
 * "واجهة" grid — a no-title, centered mosaic of one cover image
 * per room category.
 *
 * Each room category in the user's library has a "واجهة" (cover)
 * image. This component finds them automatically (by storage_path
 * = "img-…" which is what the uploader produces for files whose
 * original name sanitises to empty — i.e. the Arabic واجهة /
 * الواجهة files), then renders them as a responsive centered
 * grid:
 *   - 1 column on phones
 *   - 2 columns on small tablets
 *   - 3 columns on desktop
 *
 * No horizontal scroll, no scroll-snap. Every card is visible
 * and the whole grid is horizontally centered in the page via
 * `max-width + margin: 0 auto`, so the section is genuinely
 * "in the middle" in both LTR and RTL without any direction-
 * dependent padding math.
 *
 * Subtle Framer-Motion reveal on first appearance (not mouse-
 * driven).
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
      <div className="showcase-grid">
        {covers.map((cover, i) => (
          <motion.figure
            key={cover.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="showcase-card"
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
        .showcase-grid {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        .showcase-card {
          margin: 0;
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          aspect-ratio: 4 / 3;
          background: var(--bg-2);
          box-shadow: 0 14px 40px -22px rgba(20, 22, 20, 0.32);
        }

        @media (min-width: 640px) {
          .showcase-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 18px;
            padding: 0 32px;
          }
        }
        @media (min-width: 960px) {
          .showcase-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            padding: 0 40px;
          }
        }
      `}</style>
    </section>
  )
}
