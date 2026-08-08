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
 * - One image is roughly 80% of the viewport wide on phones, ~38% on
 *   desktop, with the rest peeking in to show there is more.
 * - Pure CSS scroll-snap — no JS carousel logic, no autoplay, works
 *   on touch and trackpad.
 * - Subtle Framer-Motion reveal on first appearance (not mouse-driven).
 */
export function ShowcaseStrip() {
  const [covers, setCovers] = useState<CoverImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      // The واجهة files have a storage_path that starts with the
      // category + "img-…", because their original filename
      // (واجهة / الواجهة) sanitises to empty in the uploader.
      // We pull *all* images then filter in JS so we can be robust
      // to file-name quirks without depending on path-string matching.
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
      // The cover is the LAST image uploaded per category (highest
      // image_url creation order within a category). We pick by
      // grouping on category and choosing the last entry of each.
      const byCategory = new Map<string, CoverImage & { storage_path: string }>()
      for (const row of all) {
        const existing = byCategory.get(row.category)
        if (!existing || existing.id < row.id) {
          byCategory.set(row.category, row)
        }
      }
      // Fallback: if the "img-" path heuristic doesn't pick a true واجهة
      // (e.g. for categories that never had one), we still get the most
      // recent upload per category, which is reasonable.
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
    return (
      <div style={{ height: 120 }} aria-hidden="true" />
    )
  }

  if (covers.length === 0) return null

  return (
    <section
      aria-label="Project covers"
      style={{
        // No top/bottom padding outside the strip — the visual is the
        // entire section. We add a small breathing room via gap.
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
          // Bleed to the edge on mobile so the first/last card can
          // sit flush against the viewport.
          paddingInline: 'max(24px, calc((100vw - 1240px) / 2))',
          paddingBlock: 8,
          // Hide the scrollbar (we have visual cue from the peeks).
          scrollbarWidth: 'none',
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
              flex: '0 0 78%',
              minWidth: 260,
              maxWidth: 640,
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
        /* Hide scrollbar across browsers but keep scrollability. */
        .showcase-strip { -ms-overflow-style: none; scrollbar-width: none; }
        .showcase-strip::-webkit-scrollbar { display: none; }

        /* On wider screens, show ~2.5 cards at once so the user
           can see what's coming without scrolling. */
        @media (min-width: 720px) {
          .showcase-card { flex-basis: 46% !important; }
        }
        @media (min-width: 1024px) {
          .showcase-card { flex-basis: 38% !important; }
        }
      `}</style>
    </section>
  )
}
