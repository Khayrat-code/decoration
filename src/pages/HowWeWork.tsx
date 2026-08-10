import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Compass, Layers, Hammer, Sparkles } from 'lucide-react'
import { useLang, useT } from '../i18n/LanguageContext'
import T from '../i18n/translations'

const PROCESS_ICONS = [Compass, Layers, Hammer, Sparkles]

const PROCESS_KEYS = [
  { key: 'Discover', duration: { ar: '١–٢ أسبوع', en: '1–2 weeks' } },
  { key: 'Design',   duration: { ar: '٢–٤ أسابيع', en: '2–4 weeks' } },
  { key: 'Source',   duration: { ar: '٢–٦ أسابيع', en: '2–6 weeks' } },
  { key: 'Install',  duration: { ar: '١–٣ أسابيع', en: '1–3 weeks' } },
] as const

export function HowWeWork() {
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
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow">{t('howWeWork.eyebrow')}</span>
            <h1
              style={{
                fontSize: 'var(--fs-h1)',
                fontWeight: lang === 'ar' ? 700 : 500,
                marginTop: 14,
                marginBottom: 24,
                lineHeight: lang === 'ar' ? 1.3 : 1.1,
                maxWidth: '20ch',
              }}
            >
              {t('howWeWork.title')}
            </h1>
            <p
              style={{
                color: 'var(--ink-2)',
                fontSize: 19,
                lineHeight: lang === 'ar' ? 2.0 : 1.85,
                maxWidth: 680,
              }}
            >
              {t('howWeWork.intro')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">{t('howWeWork.timelineEyebrow')}</span>
          <h2
            style={{
              fontSize: 'var(--fs-h2)',
              fontWeight: lang === 'ar' ? 700 : 500,
              marginTop: 14,
              marginBottom: 12,
              lineHeight: lang === 'ar' ? 1.3 : 1.2,
              maxWidth: '20ch',
            }}
          >
            {t('howWeWork.title')}
          </h2>
          <p
            style={{
              color: 'var(--ink-3)',
              fontSize: 14,
              marginBottom: 56,
              letterSpacing: '0.02em',
            }}
          >
            {t('howWeWork.timelineNote')}
          </p>

          <div
            className="howwe-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 24,
              position: 'relative',
            }}
          >
            {T.home.process.steps.map((step, i) => {
              const Icon = PROCESS_ICONS[i]
              const dur = PROCESS_KEYS[i].duration
              return (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 28,
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12,
                      marginBottom: 18,
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        background: 'var(--accent)',
                        color: 'var(--bg)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: 'var(--ink-3)',
                        letterSpacing: '0.18em',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontSize: 22,
                      fontWeight: lang === 'ar' ? 700 : 500,
                      marginBottom: 8,
                      lineHeight: lang === 'ar' ? 1.4 : 1.25,
                    }}
                  >
                    {step.title[lang]}
                  </h3>
                  <p
                    style={{
                      color: 'var(--ink-2)',
                      fontSize: 15,
                      lineHeight: lang === 'ar' ? 1.95 : 1.7,
                      margin: 0,
                      marginBottom: 18,
                    }}
                  >
                    {step.body[lang]}
                  </p>
                  <div
                    style={{
                      borderTop: '1px solid var(--line)',
                      paddingTop: 12,
                      fontSize: 12,
                      color: 'var(--accent-2)',
                      letterSpacing: lang === 'ar' ? 0 : '0.06em',
                      fontWeight: 500,
                    }}
                  >
                    {dur[lang]}
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
        <style>{`
          @media (max-width: 980px) {
            .howwe-grid { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 560px) {
            .howwe-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      <section
        style={{
          background: 'var(--surface-2)',
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
        }}
        className="section"
      >
        <div className="container">
          <span className="eyebrow">{t('howWeWork.principlesEyebrow')}</span>
          <h2
            style={{
              fontSize: 'var(--fs-h2)',
              fontWeight: lang === 'ar' ? 700 : 500,
              marginTop: 14,
              marginBottom: 56,
              lineHeight: lang === 'ar' ? 1.3 : 1.2,
              maxWidth: '20ch',
            }}
          >
            {t('howWeWork.principlesEyebrow')}
          </h2>

          <div
            className="howwe-principles"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 48,
            }}
          >
            {T.howWeWork.principles.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                style={{ borderTop: '1px solid var(--line)', paddingTop: 24 }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: 'var(--ink-3)',
                    marginBottom: 8,
                    letterSpacing: '0.18em',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: lang === 'ar' ? 700 : 500,
                    marginBottom: 12,
                    lineHeight: lang === 'ar' ? 1.4 : 1.25,
                  }}
                >
                  {p.title[lang]}
                </h3>
                <p
                  style={{
                    color: 'var(--ink-2)',
                    fontSize: 16,
                    lineHeight: lang === 'ar' ? 1.95 : 1.7,
                    margin: 0,
                  }}
                >
                  {p.body[lang]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 720px) {
            .howwe-principles { grid-template-columns: 1fr !important; gap: 32px !important; }
          }
        `}</style>
      </section>

      <section
        style={{
          background: 'var(--accent)',
          color: 'var(--bg)',
          padding: '120px 0',
        }}
      >
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: 'rgba(245, 241, 234, 0.7)',
              letterSpacing: lang === 'ar' ? 0 : '0.22em',
              textTransform: lang === 'ar' ? 'none' : 'uppercase',
            }}
          >
            {t('home.cta.eyebrow')}
          </span>
          <h2
            style={{
              color: 'var(--bg)',
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: lang === 'ar' ? 700 : 500,
              marginTop: 14,
              marginBottom: 18,
              lineHeight: lang === 'ar' ? 1.3 : 1.15,
              maxWidth: '20ch',
              margin: '14px auto 18px',
            }}
          >
            {t('home.cta.title')}
          </h2>
          <p
            style={{
              color: 'rgba(245, 241, 234, 0.78)',
              fontSize: 18,
              lineHeight: lang === 'ar' ? 1.95 : 1.7,
              maxWidth: 560,
              margin: '0 auto 32px',
            }}
          >
            {t('home.cta.body')}
          </p>
          <Link
            to="/contact"
            className="btn"
            style={{ background: 'var(--bg)', color: 'var(--accent)' }}
          >
            {t('howWeWork.discussCta')} <ArrowRight size={16} className="icon-flip" />
          </Link>
        </div>
      </section>
    </>
  )
}
