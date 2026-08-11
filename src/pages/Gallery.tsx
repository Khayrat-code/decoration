import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { GalleryGrid } from '../components/GalleryGrid'
import { useLang, useT } from '../i18n/LanguageContext'

export function Gallery() {
  const t = useT()
  const { lang } = useLang()

  return (
    <>
      <section
        className="pt-hero"
        style={{
          background: 'var(--bg)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: 720 }}
          >
            <span className="eyebrow">{t('gallery.eyebrow')}</span>
            <h1
              style={{
                fontSize: 'var(--fs-h1)',
                fontWeight: 700,
                marginTop: 16,
                marginBottom: 24,
                maxWidth: '20ch',
                lineHeight: 1.3,
              }}
            >
              {t('gallery.titleFallback')}
            </h1>
            <p
              style={{
                color: 'var(--ink-2)',
                fontSize: 19,
                lineHeight: 1.95,
                maxWidth: 620,
              }}
            >
              {t('gallery.body')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <GalleryGrid />
        </div>
      </section>

      <section
        className="pt-cta"
        style={{
          background: 'var(--bg-2)',
          borderTop: '1px solid var(--line)',
        }}
      >
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <span className="eyebrow">{t('gallery.bottomTitle')}</span>
          <h2
            style={{
              fontSize: 'var(--fs-h2)',
              fontWeight: 700,
              marginTop: 16,
              marginBottom: 24,
              lineHeight: 1.3,
            }}
          >
            {t('contact.title')}
          </h2>
          <p
            style={{
              color: 'var(--ink-2)',
              fontSize: 17,
              lineHeight: 1.95,
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
