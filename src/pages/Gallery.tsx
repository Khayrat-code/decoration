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
        style={{
          background: 'var(--bg)',
          padding: '120px 0 80px',
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
                fontWeight: lang === 'ar' ? 700 : 400,
                marginTop: 16,
                marginBottom: 24,
                maxWidth: lang === 'ar' ? '20ch' : '14ch',
                lineHeight: lang === 'ar' ? 1.3 : 1.1,
              }}
            >
              {t('gallery.titleFallback')}
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
