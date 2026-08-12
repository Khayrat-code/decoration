import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLang, useT } from '../i18n/LanguageContext'
import T, { CATEGORIES } from '../i18n/translations'
import { getSetting } from '../lib/settings'
import { DEFAULT_HERO, normalizeHero, type HeroSettings } from '../lib/content'

type Lang = 'ar' | 'en'

type HeroImage = { url: string; category: string }

const HERO_IMAGES: HeroImage[] = [
  { url: '/hero/office.jpeg',      category: 'Office'  },
  { url: '/hero/living_room.jpeg',  category: 'Living'  },
  { url: '/hero/sleeping.jpeg',     category: 'Bedroom' },
]

const EASE = [0.16, 1, 0.3, 1] as const

// Map an image's category to one of the existing 3 hero slides.
function slideIndexForCategory(category: string | undefined): number {
  if (category === 'Living')  return 1
  if (category === 'Bedroom') return 2
  return 0
}

function categoryLabel(category: string | undefined, lang: Lang): string {
  if (!category) return ''
  const found = CATEGORIES.find((c) => c.key === category)
  if (!found) return category
  return lang === 'ar' ? found.ar : found.en
}

export function HeroSlider() {
  const t = useT()
  const { lang } = useLang()
  const [settings, setSettings] = useState<HeroSettings>(DEFAULT_HERO)
  const [images] = useState<HeroImage[]>(HERO_IMAGES)
  const [index, setIndex] = useState(0)

  const slides = settings.slides
  const count = images.length

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count])
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const hero = await getSetting<Partial<HeroSettings>>('hero')
      if (cancelled) return
      setSettings(normalizeHero(hero))
    })()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const id = window.setInterval(next, 6500)
    return () => window.clearInterval(id)
  }, [next, index])

  // Pick the slide from the existing 3 by the current image's category.
  const current = images[index] ?? images[0]
  const slide = slides[slideIndexForCategory(current.category)]
  const bg = current.url
  const subtitle = categoryLabel(current.category, lang)

  const stats: Array<{ value: string; label: string }> = [
    { value: settings.stats.years.toString(), label: t('home.hero.stats.years') },
    { value: settings.stats.designers.toString(), label: t('home.hero.stats.designers') },
    { value: `${settings.stats.satisfaction}%`, label: t('home.hero.stats.satisfaction') },
  ]

  return (
    <section
      className="hero-laptop"
      style={{
        position: 'relative',
        minHeight: 'min(92vh, 860px)',
        width: '100%',
        background: 'var(--ink)',
        overflow: 'hidden',
      }}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={bg}
          src={bg}
          alt=""
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: EASE }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'saturate(0.92)',
          }}
        />
      </AnimatePresence>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(20,22,20,0.55) 0%, rgba(20,22,20,0.25) 40%, rgba(20,22,20,0.78) 100%)',
        }}
      />

      <div
        className="container"
        style={{
          position: 'relative',
          padding: 'calc(var(--navbar-h) + 28px) 32px 48px',
          color: '#F5F1EA',
          minHeight: 'min(92vh, 860px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <div style={{ maxWidth: 880 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: 0,
                  textTransform: 'none',
                  color: '#C7A87A',
                  display: 'inline-block',
                  marginBottom: 20,
                }}
              >
                {subtitle}
              </span>
              <h1
                className="hero-title"
                style={{
                  fontFamily: 'var(--font-serif)',
                  color: '#F5F1EA',
                  fontSize: 'clamp(40px, 6.5vw, 92px)',
                  fontWeight: 700,
                  lineHeight: 1.3,
                  letterSpacing: 0,
                  margin: 0,
                  maxWidth: '20ch',
                }}
              >
                {slide.title[lang]}{' '}
                <em
                  style={{
                    color: '#C7A87A',
                    fontStyle: 'normal',
                    fontWeight: 700,
                  }}
                >
                  {slide.highlight[lang]}
                </em>
              </h1>
              <p
                className="hero-desc"
                style={{
                  marginTop: 22,
                  fontSize: 18,
                  color: 'rgba(245, 241, 234, 0.86)',
                  maxWidth: 560,
                  lineHeight: 1.85,
                }}
              >
                {slide.description[lang]}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* 3 inline service tags — gold dot + label.
              Pattern borrowed from zarva.sa; labels are pulled verbatim
              from the existing services items so no new copy is added. */}
          <div
            className="hero-tags"
            style={{
              display: 'flex',
              gap: 22,
              flexWrap: 'wrap',
              alignItems: 'center',
              marginTop: 24,
            }}
          >
            {T.home.hero.tags.map((tag, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 9,
                  color: 'rgba(245, 241, 234, 0.88)',
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: 0,
                  textTransform: 'none',
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    background: '#C7A87A',
                    flexShrink: 0,
                  }}
                />
                {tag[lang]}
              </span>
            ))}
          </div>

          <div className="hero-ctas" style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            <Link
              to="/gallery"
              className="btn"
              style={{
                background: 'transparent',
                color: '#F5F1EA',
                border: '1px solid rgba(245, 241, 234, 0.55)',
              }}
            >
              {t('home.hero.cta1')} <ArrowRight size={16} className="icon-flip" />
            </Link>
            <Link
              to="/contact"
              className="btn btn-light"
            >
              {t('home.hero.cta2')}
            </Link>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            marginTop: 32,
          }}
        >
          <div style={{ display: 'flex', gap: 8 }} role="tablist" aria-label="Hero slides">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                aria-selected={i === index}
                role="tab"
                onClick={() => setIndex(i)}
                style={{
                  width: i === index ? 44 : 22,
                  height: 3,
                  borderRadius: 999,
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  background: i === index ? '#C7A87A' : 'rgba(245, 241, 234, 0.35)',
                  transition: 'width 300ms, background-color 300ms',
                }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              style={arrowBtn}
            >
              <ChevronLeft size={18} className="icon-flip" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              style={arrowBtn}
            >
              <ChevronRight size={18} className="icon-flip" />
            </button>
          </div>
        </div>

        <div
          className="hero-stats"
          style={{
            display: 'grid',
            gap: 16,
            marginTop: 28,
            paddingTop: 22,
            borderTop: '1px solid rgba(245, 241, 234, 0.18)',
          }}
        >
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
              <div
                className="hero-stat-value"
                style={{
                  fontFamily: 'var(--font-serif)',
                  lineHeight: 1,
                  color: '#F5F1EA',
                   fontWeight: 700,
                }}
              >
                {s.value}
              </div>
              <div
                className="hero-stat-label"
                style={{
                  marginTop: 6,
                  color: 'rgba(245, 241, 234, 0.66)',
                  letterSpacing: 0,
                  textTransform: 'none',
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hero-stats { grid-template-columns: repeat(2, 1fr); }
        .hero-stat-value { font-size: 22px; }
        .hero-stat-label { font-size: 11px; }

        @media (min-width: 480px) {
          .hero-stats { grid-template-columns: repeat(3, 1fr); }
          .hero-stat-value { font-size: 30px; }
          .hero-stat-label { font-size: 12px; }
        }

        @media (max-width: 720px) {
          .hero-stats { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (min-width: 1024px) and (max-height: 820px) {
          .hero-title { font-size: clamp(36px, 5vw, 64px) !important; line-height: 1.05 !important; }
          .hero-desc { font-size: 16px !important; margin-top: 16px !important; }
          .hero-tags { margin-top: 18px !important; }
          .hero-ctas { margin-top: 22px !important; }
          .hero-stats { margin-top: 22px !important; padding-top: 18px !important; }
        }
        @media (min-width: 1024px) and (max-height: 720px) {
          .hero-title { font-size: clamp(32px, 4.5vw, 56px) !important; }
        }
      `}</style>
    </section>
  )
}

const arrowBtn: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  borderRadius: 999,
  border: '1px solid rgba(245, 241, 234, 0.4)',
  background: 'transparent',
  color: '#F5F1EA',
  cursor: 'pointer',
}
