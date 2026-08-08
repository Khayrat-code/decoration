import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Compass,
  Layers,
  Hammer,
  Sparkles,
  PenTool,
  Sofa,
  Armchair,
  Box,
  Star,
} from 'lucide-react'
import { useLang, useT } from '../i18n/LanguageContext'
import T from '../i18n/translations'
import { ShowcaseStrip } from '../components/ShowcaseStrip'
import { HeroSlider } from '../components/HeroSlider'
import { supabase, TABLES } from '../lib/supabase'
import { getSetting } from '../lib/settings'
import {
  DEFAULT_SERVICES,
  normalizeServices,
  type ServiceItem,
  type TestimonialRow,
} from '../lib/content'

const PROCESS_ICONS = [Compass, Layers, Hammer, Sparkles]
const SERVICE_ICONS = [PenTool, Sofa, Armchair, Box]

export function Home() {
  const t = useT()
  const { lang } = useLang()

  return (
    <>
      <HeroSlider />

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

      {/* ============ SHOWCASE STRIP ============ */}
      <ShowcaseStrip />

      {/* ============ SERVICES ============ */}
      <ServicesSection />

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

      {/* ============ TESTIMONIALS ============ */}
      <TestimonialsSection />

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

function ServicesSection() {
  const { lang } = useLang()
  const t = useT()
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES)

  useEffect(() => {
    let cancelled = false
    getSetting<ServiceItem[]>('services').then((raw) => {
      if (!cancelled) setServices(normalizeServices(raw))
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="section" style={{ background: 'var(--surface-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <SectionHead eyebrow={t('home.services.eyebrow')} title={t('home.services.title')} />
        <div
          className="services-grid"
          style={{
            marginTop: 56,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24,
          }}
        >
          {services.map((s, i) => {
            const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length]
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 28,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: 'var(--accent)',
                    color: 'var(--bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 18,
                  }}
                >
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <h3 style={{ fontSize: 19, fontWeight: lang === 'ar' ? 700 : 500, marginBottom: 8 }}>
                  {s.title[lang]}
                </h3>
                <p style={{ color: 'var(--ink-2)', fontSize: 14, lineHeight: lang === 'ar' ? 1.85 : 1.65, margin: 0 }}>
                  {s.description[lang]}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 980px) {
          .services-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function TestimonialsSection() {
  const { lang } = useLang()
  const t = useT()
  const [items, setItems] = useState<TestimonialRow[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const { data, error } = await supabase
        .from(TABLES.testimonials)
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6)
      if (cancelled) return
      if (!error && data) setItems(data as TestimonialRow[])
      setLoaded(true)
    })()
    return () => {
      cancelled = true
    }
  }, [])

  if (!loaded || items.length === 0) return null

  return (
    <section className="section-tight" style={{ borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <SectionHead eyebrow={t('home.testimonials.eyebrow')} title={t('home.testimonials.title')} />
        <div
          className="testimonials-grid"
          style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
        >
          {items.map((item, i) => (
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              style={{
                margin: 0,
                background: 'var(--surface-2)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-lg)',
                padding: 28,
              }}
            >
              <div style={{ display: 'flex', gap: 3, color: 'var(--accent-2)', marginBottom: 14 }}>
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    size={15}
                    fill={s < item.rating ? 'currentColor' : 'none'}
                    strokeWidth={1.4}
                  />
                ))}
              </div>
              <blockquote
                style={{
                  margin: 0,
                  color: 'var(--ink-2)',
                  fontSize: 15,
                  lineHeight: lang === 'ar' ? 1.9 : 1.7,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {item.body}
              </blockquote>
              <figcaption
                style={{
                  marginTop: 16,
                  fontFamily: 'var(--font-serif)',
                  fontSize: 16,
                  fontWeight: lang === 'ar' ? 700 : 500,
                  color: 'var(--ink)',
                }}
              >
                {item.name}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 980px) {
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
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
