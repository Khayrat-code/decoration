import { motion } from 'framer-motion'

interface Cover {
  src: string
  /** Bilingual alt text — falls back to the first entry if a language is missing. */
  alt: { ar: string; en: string }
}

/**
 * "واجهة" grid — a no-title, centered mosaic of one cover image
 * per room category, in the exact order the studio wants.
 *
 * The 6 covers are hand-picked (from `C:\Users\khayrat\Downloads\arr`)
 * and uploaded to Supabase storage under `covers/`. We hardcode the
 * URLs here so the section always renders in the exact order
 *
 *   1 living · 2 bedroom · 3 office · 4 kitchen · 5 kids · 6 dining
 *
 * — no DB query, no risk of the order drifting if someone re-uploads
 * gallery rows.
 *
 * - 1 column on phones
 * - 2 columns on small tablets (>= 640px)
 * - 3 columns on desktop (>= 960px)
 *
 * The grid is wrapped in a max-width container with margin: 0 auto,
 * so the whole mosaic is genuinely centered in both LTR and RTL with
 * no direction-dependent padding math. No horizontal scroll, no
 * scroll-snap drama.
 *
 * Subtle Framer-Motion reveal on first appearance (not mouse-driven).
 */
const COVERS: Cover[] = [
  {
    src: 'https://fpmjlkqiljfwbnnljptr.supabase.co/storage/v1/object/public/gallery/covers/1-living.jpg',
    alt: { ar: 'صالة معيشة', en: 'Living room' },
  },
  {
    src: 'https://fpmjlkqiljfwbnnljptr.supabase.co/storage/v1/object/public/gallery/covers/2-bedroom.jpg',
    alt: { ar: 'غرفة نوم', en: 'Bedroom' },
  },
  {
    src: 'https://fpmjlkqiljfwbnnljptr.supabase.co/storage/v1/object/public/gallery/covers/3-office.jpg',
    alt: { ar: 'مكتب', en: 'Office' },
  },
  {
    src: 'https://fpmjlkqiljfwbnnljptr.supabase.co/storage/v1/object/public/gallery/covers/4-kitchen.jpg',
    alt: { ar: 'مطبخ', en: 'Kitchen' },
  },
  {
    src: 'https://fpmjlkqiljfwbnnljptr.supabase.co/storage/v1/object/public/gallery/covers/5-kids.jpg',
    alt: { ar: 'غرفة أطفال', en: 'Kids room' },
  },
  {
    src: 'https://fpmjlkqiljfwbnnljptr.supabase.co/storage/v1/object/public/gallery/covers/6-dining.jpg',
    alt: { ar: 'صالة طعام', en: 'Dining room' },
  },
]

export function ShowcaseStrip() {
  return (
    <section
      aria-label="Project covers"
      style={{
        padding: '32px 0 56px',
        background: 'var(--bg)',
      }}
    >
      <div className="showcase-grid">
        {COVERS.map((cover, i) => (
          <motion.figure
            key={cover.src}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="showcase-card"
          >
            <img
              src={cover.src}
              alt={cover.alt.en}
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
