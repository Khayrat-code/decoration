import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Compass, Layers, Hammer, Sparkles } from 'lucide-react'
import { supabase, TABLES } from '../lib/supabase'
import { GalleryGrid, type GalleryItem } from '../components/GalleryGrid'
import { useLang, useT } from '../i18n/LanguageContext'
import T, { CATEGORIES } from '../i18n/translations'

// The very first uploaded Living-room image is the hero. Hardcoded so
// the page paints instantly without waiting on a fetch.
const HERO_IMAGE =
  'https://fpmjlkqiljfwbnnljptr.supabase.co/storage/v1/object/public/gallery/projects/living/Image-19-1786134733164.jpg'

const PROCESS_ICONS = [Compass, Layers, Hammer, Sparkles]

export function Home() {
  const [featured, setFeatured] = useState<GalleryItem[]>([])
  const t = useT()
  const { lang } = useLang()

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const { data } = await supabase
        .from(TABLES.gallery)
        .select('*')
        .order('sort_order', { ascending: true })
        .limit(6)
      if (cancelled) return
      setFeatured((data as GalleryItem[]) ?? [])
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      {/* ============ HERO ============ */}
      <section
        style={{
          position: 'relative',
          height: 'min(92vh, 820px)',
          minHeight: 600,
          width: '100%',
          overflow: 'hidden',
          background: 'var(--ink)',
        }}
      >
        <motion.img
          src={HERO_IMAGE}
          alt={lang === 'ar' ? 'غرفة من تصميم تولكان للديكور' : 'A ToolCan Decoration interior'}
          initial={{ scale: 1.04, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'saturate(0.92)',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(20,22,20,0.5) 0%, rgba(20,22,20,0.15) 35%, rgba(20,22,20,0.6) 100%)',
          }}
        />
        <div
          className="container"
          style={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '0 32px 96px',
            color: '#F5F1EA',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: 880 }}
          >
            <span
              style={{
                fontSize: lang === 'ar' ? 13 : 12,
                fontWeight: 500,
                letterSpacing: lang === 'ar' ? 0 : '0.32em',
                textTransform: lang === 'ar' ? 'none' : 'uppercase',
                color: 'rgba(245, 241, 234, 0.78)',
                display: 'inline-block',
                marginBottom: 24,
              }}
            >
              {t('home.hero.eyebrow')}
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                color: '#F5F1EA',
                fontSize: 'var(--fs-display)',
                fontWeight: lang === 'ar' ? 700 : 400,
                lineHeight: lang === 'ar' ? 1.25 : 0.98,
                letterSpacing: lang === 'ar' ? 0 : '-0.025em',
                margin: 0,
                maxWidth: '18ch',
              }}
            >
              {t('home.hero.title1')}{' '}
              <em
                style={{
                  color: '#C7A87A',
                  fontStyle: lang === 'ar' ? 'normal' : 'italic',
                  fontWeight: lang === 'ar' ? 700 : 400,
                }}
              >
                {t('home.hero.titleEm')}
              </em>{' '}
              {t('home.hero.title2')}
            </h1>
            <p
              style={{
                marginTop: 28,
                fontSize: 18,
                color: 'rgba(245, 241, 234, 0.84)',
                maxWidth: 540,
                lineHeight: lang === 'ar' ? 1.85 : 1.6,
              }}
            >
              {t('home.hero.body')}
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
              <Link to="/gallery" className="btn btn-light">
                {t('home.hero.cta1')} <ArrowRight size={16} className="icon-flip" />
              </Link>
              <Link
                to="/contact"
                className="btn"
                style={{
                  background: 'transparent',
                  color: '#F5F1EA',
                  border: '1px solid rgba(245, 241, 234, 0.55)',
                }}
              >
                {t('home.hero.cta2')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ INTRO STRIP ============ */}
      <section className="section-tight" style={{ borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.6fr',
              gap: 80,
              alignItems: 'start',
            }}
            className="intro-grid"
          >
            <div>
              <span className="eyebrow">{t('home.intro.eyebrow')}</span>
              <h2
                style={{
                  marginTop: 16,
                  fontSize: 'var(--fs-h2)',
                  fontWeight: lang === 'ar' ? 700 : 400,
                  maxWidth: lang === 'ar' ? '16ch' : '12ch',
                }}
              >
                {t('home.intro.title1')}{' '}
                <em
                  style={{
                    color: 'var(--accent)',
                    fontStyle: lang === 'ar' ? 'normal' : 'italic',
                    fontWeight: lang === 'ar' ? 700 : 400,
                  }}
                >
                  {t('home.intro.titleEm')}
                </em>
                {lang === 'ar' ? '.' : ''}
              </h2>
            </div>
            <div style={{ color: 'var(--ink-2)', fontSize: 17, lineHeight: lang === 'ar' ? 1.95 : 1.75 }}>
              <p style={{ marginBottom: 20 }}>{t('home.intro.body1')}</p>
              <p>{t('home.intro.body2')}</p>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 880px) {
            .intro-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          }
        `}</style>
      </section>

      {/* ============ FEATURED PROJECTS ============ */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow={t('home.selected.eyebrow')}
            title={t('home.selected.title')}
          />
          <div style={{ marginTop: 56 }}>
            {featured.length > 0 ? (
              <GalleryGrid items={featured.slice(0, 6)} showCategories={false} compact />
            ) : (
              <div style={{ color: 'var(--ink-3)', fontSize: 14, textAlign: 'center', padding: '40px 0' }}>
                {t('home.selected.loading')}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============ TYPES OF SPACES (compact, above "How we work") ============ */}
      <section
        className="section-tight"
        style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)',
              gap: 64,
              alignItems: 'start',
            }}
            className="types-grid"
          >
            <div>
              <span className="eyebrow">{t('home.categories.eyebrow')}</span>
              <h2
                style={{
                  marginTop: 14,
                  fontSize: 'var(--fs-h2)',
                  fontWeight: lang === 'ar' ? 700 : 400,
                  maxWidth: '14ch',
                  lineHeight: 1.2,
                }}
              >
                {t('home.categories.title')}
              </h2>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px 32px',
                paddingTop: 8,
              }}
              className="types-list"
            >
              {CATEGORIES.map((c, i) => (
                <motion.div
                  key={c.key}
                  initial={{ opacity: 0, x: lang === 'ar' ? 8 : -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 14,
                    padding: '14px 0',
                    borderTop: '1px solid var(--line)',
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: 'var(--ink-3)',
                      letterSpacing: '0.18em',
                      minWidth: 22,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: lang === 'ar' ? 18 : 19,
                      fontWeight: lang === 'ar' ? 700 : 400,
                      color: 'var(--ink)',
                    }}
                  >
                    {lang === 'ar' ? c.ar : c.en}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 880px) {
            .types-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
            .types-list { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 520px) {
            .types-list { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ============ HOW WE WORK (compact) ============ */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow={t('home.process.eyebrow')}
            title={t('home.process.title')}
          />
          <div
            style={{
              marginTop: 56,
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 32,
            }}
            className="process-grid"
          >
            <ProcessSteps />
          </div>
        </div>
        <style>{`
          @media (max-width: 880px) {
            .process-grid { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 520px) {
            .process-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ============ BIG CTA ============ */}
      <section
        style={{
          background: 'var(--accent)',
          color: 'var(--bg)',
          padding: '160px 0',
        }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 80, alignItems: 'end' }}
            className="cta-grid"
          >
            <div>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'rgba(245, 241, 234, 0.7)',
                }}
              >
                {t('home.cta.eyebrow')}
              </span>
              <h2
                style={{
                  color: 'var(--bg)',
                  fontSize: 'clamp(40px, 5.5vw, 76px)',
                  fontWeight: lang === 'ar' ? 700 : 400,
                  marginTop: 16,
                  lineHeight: lang === 'ar' ? 1.3 : 1.05,
                  maxWidth: lang === 'ar' ? '16ch' : '14ch',
                }}
              >
                {t('home.cta.title')}
              </h2>
              <p
                style={{
                  color: 'rgba(245, 241, 234, 0.78)',
                  fontSize: 17,
                  lineHeight: lang === 'ar' ? 1.95 : 1.65,
                  maxWidth: 520,
                  marginTop: 24,
                }}
              >
                {t('home.cta.body')}
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link to="/contact" className="btn" style={{ background: 'var(--bg)', color: 'var(--accent)' }}>
                {t('home.cta.button')} <ArrowRight size={16} className="icon-flip" />
              </Link>
            </div>
          </motion.div>
        </div>
        <style>{`
          @media (max-width: 880px) {
            .cta-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
            .cta-grid a { align-self: flex-start !important; }
          }
        `}</style>
      </section>
    </>
  )
}

function ProcessSteps() {
  const { lang } = useLang()
  const steps = T.home.process.steps
  return (
    <>
      {steps.map((s, i) => {
        const Icon = PROCESS_ICONS[i]
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 14,
                color: 'var(--accent)',
              }}
            >
              <Icon size={18} strokeWidth={1.4} />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: '0.22em',
                  color: 'var(--ink-3)',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <h3
              style={{
                fontSize: 19,
                fontWeight: lang === 'ar' ? 700 : 500,
                marginBottom: 8,
              }}
            >
              {s.title[lang]}
            </h3>
            <p
              style={{
                color: 'var(--ink-2)',
                fontSize: 14,
                lineHeight: lang === 'ar' ? 1.85 : 1.65,
                margin: 0,
              }}
            >
              {s.body[lang]}
            </p>
          </motion.div>
        )
      })}
    </>
  )
}

function SectionHead({
  eyebrow,
  title,
}: {
  eyebrow: string
  title: string
}) {
  const { lang } = useLang()
  return (
    <div>
      <span className="eyebrow">{eyebrow}</span>
      <h2
        style={{
          fontSize: 'var(--fs-h2)',
          fontWeight: lang === 'ar' ? 700 : 400,
          marginTop: 14,
          maxWidth: '20ch',
        }}
      >
        {title}
      </h2>
    </div>
  )
}