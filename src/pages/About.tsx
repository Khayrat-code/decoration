import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useLang, useT } from '../i18n/LanguageContext'
import T from '../i18n/translations'

export function About() {
  const t = useT()
  const { lang } = useLang()

  const paragraphs: Array<{ key: string }> = [
    { key: 'about.body1' },
    { key: 'about.body2' },
    { key: 'about.body3' },
    { key: 'about.body4' },
    { key: 'about.body5' },
  ]

  return (
    <>
      <section
        className="pt-hero"
        style={{
          background: 'var(--bg)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow">{t('about.eyebrow')}</span>
            <h1
              style={{
                fontSize: 'var(--fs-h1)',
                fontWeight: 700,
                marginTop: 16,
                marginBottom: 56,
                lineHeight: 1.3,
                maxWidth: '14ch',
              }}
            >
              {t('about.title')}
            </h1>

            <div
              className="about-prose"
              style={{
                color: 'var(--ink-2)',
                fontSize: 19,
                lineHeight: 2.0,
                maxWidth: 720,
              }}
            >
              {paragraphs.map((p, i) => (
                <p
                  key={p.key}
                  style={{
                    marginBottom: i === paragraphs.length - 1 ? 0 : 28,
                    fontWeight: lang === 'ar' ? 400 : 400,
                  }}
                >
                  {t(p.key)}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ SIGNATURE BAND ============ */}
      <section
        className="pt-hero-tight"
        style={{
          background: 'var(--bg-2)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: 28,
              alignItems: 'start',
            }}
            className="about-signature"
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 999,
                background: 'var(--accent)',
                color: 'var(--bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Sparkles size={22} strokeWidth={1.5} />
            </div>
            <div>
              <span
                className="eyebrow"
                style={{ display: 'block', marginBottom: 10 }}
              >
                {t('about.signatureEyebrow')}
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(22px, 2.4vw, 30px)',
                  lineHeight: 1.55,
                  color: 'var(--ink)',
                  fontWeight: 700,
                  margin: 0,
                  maxWidth: 640,
                }}
              >
                {t('about.signature')}
              </p>
            </div>
          </motion.div>
        </div>
        <style>{`
          @media (max-width: 720px) {
            .about-signature { grid-template-columns: 1fr !important; gap: 18px !important; }
          }
        `}</style>
      </section>

      {/* ============ VALUES ============ */}
      <section className="section">
        <div className="container-narrow">
          <span className="eyebrow">{t('about.valuesEyebrow')}</span>
          <h2
            style={{
              fontSize: 'var(--fs-h2)',
              fontWeight: 700,
              marginTop: 14,
              marginBottom: 56,
              lineHeight: 1.3,
              maxWidth: '20ch',
            }}
          >
            {t('about.valuesEyebrow')}
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 48,
            }}
            className="about-values"
          >
            {T.about.values.map((v, i) => (
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
                    fontWeight: 700,
                    marginBottom: 12,
                    lineHeight: 1.4,
                  }}
                >
                  {v.title[lang]}
                </h3>
                <p
                  style={{
                    color: 'var(--ink-2)',
                    fontSize: 16,
                    lineHeight: 1.95,
                    margin: 0,
                  }}
                >
                  {v.body[lang]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 720px) {
            .about-values { grid-template-columns: 1fr !important; gap: 32px !important; }
          }
        `}</style>
      </section>

      <section
        className="pt-cta"
        style={{
          background: 'var(--bg-2)',
          borderTop: '1px solid var(--line)',
          textAlign: 'center',
        }}
      >
        <div className="container-narrow">
          <span className="eyebrow">{t('contact.eyebrow')}</span>
          <h2
            style={{
              fontSize: 'var(--fs-h2)',
              fontWeight: 700,
              marginTop: 16,
              marginBottom: 24,
              lineHeight: 1.35,
            }}
          >
            {t('contact.title')}
          </h2>
          <p
            style={{
              color: 'var(--ink-2)',
              fontSize: 17,
              lineHeight: 1.95,
              maxWidth: 560,
              margin: '0 auto 32px',
            }}
          >
            {t('contact.body')}
          </p>
          <Link to="/contact" className="btn">
            {t('contact.form.submit')} <ArrowRight size={16} className="icon-flip" />
          </Link>
        </div>
      </section>
    </>
  )
}
