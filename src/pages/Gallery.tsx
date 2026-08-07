import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { GalleryGrid, type GalleryItem } from '../components/GalleryGrid'
import { supabase, TABLES } from '../lib/supabase'
import { useLang, useT } from '../i18n/LanguageContext'

export function Gallery() {
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [total, setTotal] = useState(0)
  const t = useT()
  const { lang, category } = useLang()

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const { data } = await supabase
        .from(TABLES.gallery)
        .select('category', { count: 'exact' })
      if (cancelled || !data) return
      const map: Record<string, number> = {}
      data.forEach((r: { category: string }) => {
        map[r.category] = (map[r.category] || 0) + 1
      })
      setCounts(map)
      setTotal(data.length)
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <section
        style={{
          background: 'var(--bg)',
          padding: '120px 0 64px',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: 920 }}
          >
            <span className="eyebrow">{t('gallery.eyebrow')}</span>
            <h1
              style={{
                fontSize: 'var(--fs-h1)',
                fontWeight: lang === 'ar' ? 700 : 400,
                marginTop: 16,
                marginBottom: 24,
                maxWidth: lang === 'ar' ? '20ch' : '16ch',
                lineHeight: lang === 'ar' ? 1.3 : 1.1,
              }}
            >
              {total > 0
                ? t('gallery.titleWithCount', { n: total })
                : t('gallery.titleFallback')}
            </h1>
            <p
              style={{
                color: 'var(--ink-2)',
                fontSize: 19,
                lineHeight: lang === 'ar' ? 1.95 : 1.6,
                maxWidth: 620,
              }}
            >
              {t('gallery.body')}
            </p>
          </motion.div>

          {Object.keys(counts).length > 0 && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '64px 0 0',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px 24px',
                borderTop: '1px solid var(--line)',
                paddingTop: 24,
              }}
            >
              {Object.entries(counts).map(([cat, n]) => (
                <li
                  key={cat}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'baseline',
                    gap: 8,
                  }}
                >
                  <span style={{ color: 'var(--ink)', fontFamily: 'var(--font-serif)', fontSize: 16 }}>
                    {category(cat)}
                  </span>
                  <span style={{ color: 'var(--ink-3)', fontSize: 13, letterSpacing: '0.06em' }}>
                    {String(n).padStart(2, '0')}
                  </span>
                </li>
              ))}
            </motion.ul>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <GalleryGrid />
        </div>
      </section>

      <section
        style={{
          background: 'var(--bg-2)',
          padding: '120px 0',
          borderTop: '1px solid var(--line)',
        }}
      >
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <span className="eyebrow">{t('gallery.bottomTitle')}</span>
          <h2
            style={{
              fontSize: 'var(--fs-h2)',
              fontWeight: lang === 'ar' ? 700 : 400,
              marginTop: 16,
              marginBottom: 24,
              lineHeight: lang === 'ar' ? 1.3 : 1.1,
            }}
          >
            {t('contact.title')}
          </h2>
          <p
            style={{
              color: 'var(--ink-2)',
              fontSize: 17,
              lineHeight: lang === 'ar' ? 1.95 : 1.6,
              maxWidth: 540,
              margin: '0 auto 32px',
            }}
          >
            {t('gallery.bottomBody')}
          </p>
          <Link to="/contact" className="btn">
            {t('gallery.bottomCta')} <ArrowRight size={16} className="icon-flip" />
          </Link>
        </div>
      </section>
    </>
  )
}
