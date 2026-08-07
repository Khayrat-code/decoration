import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight, Compass, Layers, Hammer, Sparkles } from 'lucide-react'
import { supabase, TABLES } from '../lib/supabase'
import { GalleryGrid, type GalleryItem } from '../components/GalleryGrid'
import { useLang, useT } from '../i18n/LanguageContext'
import T, { CATEGORIES } from '../i18n/translations'

// The very first uploaded Living-room image is the hero. Hardcoded so
// the page paints instantly without waiting on a fetch.
const HERO_IMAGE =
  'https://fpmjlkqiljfwbnnljptr.supabase.co/storage/v1/object/public/gallery/projects/living/Image-19-1786134733164.jpg'

const PROCESS_ICONS = [Compass, Layers, Hammer, Sparkles]

interface CategoryCount {
  key: string
  count: number
}

export function Home() {
  const [featured, setFeatured] = useState<GalleryItem[]>([])
  const [counts, setCounts] = useState<CategoryCount[]>([])
  const [total, setTotal] = useState(0)
  const t = useT()
  const { lang, category } = useLang()

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const [{ data: feat }, { data: all }] = await Promise.all([
        supabase
          .from(TABLES.gallery)
          .select('*')
          .order('sort_order', { ascending: true })
          .limit(6),
        supabase.from(TABLES.gallery).select('category'),
      ])
      if (cancelled) return
      setFeatured((feat as GalleryItem[]) ?? [])

      const map: Record<string, number> = {}
      ;(all ?? []).forEach((r: { category: string }) => {
        map[r.category] = (map[r.category] || 0) + 1
      })
      // Order by the canonical category order, not by count.
      const ordered = CATEGORIES.map((c) => ({ key: c.key, count: map[c.key] || 0 })).filter(
        (c) => c.count > 0,
      )
      setCounts(ordered)
      setTotal((all ?? []).length)
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
            cta={{ to: '/gallery', label: t('home.selected.cta') }}
          />
          <div style={{ marginTop: 64 }}>
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

      {/* ============ STATS — live per-category counter ============ */}
      <section
        style={{
          background: 'var(--bg-2)',
          padding: '96px 0',
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 56,
              flexWrap: 'wrap',
              gap: 24,
            }}
          >
            <div>
              <span className="eyebrow">{t('home.stats.eyebrow')}</span>
              <h2
                style={{
                  fontSize: 'var(--fs-h2)',
                  fontWeight: lang === 'ar' ? 700 : 400,
                  marginTop: 14,
                  maxWidth: '20ch',
                }}
              >
                {t('home.stats.title')}
              </h2>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 56,
                fontWeight: 400,
                color: 'var(--ink)',
                lineHeight: 1,
                letterSpacing: lang === 'ar' ? 0 : '-0.02em',
                display: 'flex',
                alignItems: 'baseline',
                gap: 12,
              }}
            >
              <span>{String(total).padStart(2, '0')}</span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: lang === 'ar' ? 0 : '0.18em',
                  textTransform: lang === 'ar' ? 'none' : 'uppercase',
                  color: 'var(--ink-3)',
                }}
              >
                {t('home.stats.total')}
              </span>
            </div>
          </div>

          <p
            style={{
              color: 'var(--ink-2)',
              fontSize: 15,
              maxWidth: 560,
              marginBottom: 40,
            }}
          >
            {t('home.stats.subtitle')}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: 0,
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              background: 'var(--surface)',
            }}
          >
            {counts.map((c, i) => (
              <motion.div
                key={c.key}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  padding: '32px 24px',
                  borderInlineStart: i === 0 ? 'none' : '1px solid var(--line)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 56,
                    fontWeight: 400,
                    color: 'var(--ink)',
                    lineHeight: 1,
                    letterSpacing: lang === 'ar' ? 0 : '-0.02em',
                  }}
                >
                  {String(c.count).padStart(2, '0')}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: 'var(--ink-2)',
                    fontWeight: 500,
                  }}
                >
                  {category(c.key)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow={t('home.process.eyebrow')}
            title={t('home.process.title')}
            subtitle={t('home.process.subtitle')}
          />
          <div
            style={{
              marginTop: 80,
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 40,
              position: 'relative',
            }}
            className="process-grid"
          >
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 24,
                insetInlineStart: '8%',
                insetInlineEnd: '8%',
                height: 1,
                background: 'var(--line-2)',
                zIndex: 0,
              }}
            />
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

      {/* ============ CATEGORY SHOWCASE ============ */}
      <section
        className="section"
        style={{ background: 'var(--bg-2)' }}
      >
        <div className="container">
          <SectionHead
            eyebrow={t('home.categories.eyebrow')}
            title={t('home.categories.title')}
            cta={{ to: '/gallery', label: t('home.categories.cta') }}
          />
          <div
            style={{
              marginTop: 64,
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 16,
            }}
            className="cat-grid"
          >
            {CATEGORIES.map((c, i) => (
              <motion.div
                key={c.key}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={`/gallery?cat=${c.key}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 12,
                    padding: '40px 12px',
                    background: 'var(--surface)',
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--radius)',
                    color: 'var(--ink)',
                    borderBottom: '1px solid var(--line)',
                    transition: 'border-color 220ms ease, color 220ms ease',
                  }}
                  className="cat-tile"
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: lang === 'ar' ? 20 : 22,
                      fontWeight: lang === 'ar' ? 700 : 500,
                    }}
                  >
                    {lang === 'ar' ? c.ar : c.en}
                  </span>
                  <ArrowUpRight size={16} color="var(--ink-3)" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 1024px) { .cat-grid { grid-template-columns: repeat(4, 1fr) !important; } }
          @media (max-width: 640px)  { .cat-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          .cat-tile:hover { border-color: var(--accent) !important; color: var(--accent) !important; }
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative' }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'var(--bg)',
                border: '1px solid var(--line-2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent)',
                marginBottom: 20,
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Icon size={20} strokeWidth={1.4} />
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: lang === 'ar' ? 0 : '0.22em',
                textTransform: lang === 'ar' ? 'none' : 'uppercase',
                color: 'var(--ink-3)',
                marginBottom: 8,
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>
            <h3
              style={{
                fontSize: 22,
                fontWeight: lang === 'ar' ? 700 : 500,
                marginBottom: 12,
              }}
            >
              {s.title[lang]}
            </h3>
            <p style={{ color: 'var(--ink-2)', fontSize: 15, lineHeight: lang === 'ar' ? 1.95 : 1.65 }}>
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
  subtitle,
  cta,
}: {
  eyebrow: string
  title: string
  subtitle?: string
  cta?: { to: string; label: string }
}) {
  const { lang } = useLang()
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: cta ? '1fr auto' : '1fr',
        alignItems: 'flex-end',
        gap: 24,
      }}
    >
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
        {subtitle && (
          <p
            style={{
              marginTop: 16,
              color: 'var(--ink-2)',
              fontSize: 17,
              maxWidth: 560,
              lineHeight: lang === 'ar' ? 1.95 : 1.6,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {cta && (
        <Link
          to={cta.to}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 13,
            color: 'var(--ink)',
            borderBottom: '1px solid var(--ink-2)',
            paddingBottom: 4,
          }}
        >
          {cta.label} <ArrowUpRight size={14} className="icon-flip" />
        </Link>
      )}
    </div>
  )
}
