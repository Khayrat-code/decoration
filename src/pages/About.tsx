import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLang, useT } from '../i18n/LanguageContext'
import T from '../i18n/translations'

export function About() {
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
            <span className="eyebrow">{t('about.eyebrow')}</span>
            <h1
              style={{
                fontSize: 'var(--fs-h1)',
                marginTop: 16,
                marginBottom: 40,
                lineHeight: 1.15,
              }}
            >
              {t('about.title')}
            </h1>

            <div
              style={{
                color: 'var(--ink-2)',
                fontSize: 18,
                lineHeight: 1.85,
                maxWidth: 680,
              }}
            >
              <p style={{ marginBottom: 24 }}>{t('about.body1')}</p>
              <p style={{ marginBottom: 24 }}>{t('about.body2')}</p>
              <p>{t('about.body3')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container-narrow">
          <span className="eyebrow">{t('about.valuesEyebrow')}</span>
          <h2
            style={{
              fontSize: 'var(--fs-h2)',
              marginTop: 14,
              marginBottom: 56,
              lineHeight: 1.2,
              maxWidth: '20ch',
            }}
          >
            {t('about.title')}
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
                    fontSize: 20,
                    marginBottom: 10,
                    fontWeight: 500,
                  }}
                >
                  {v.title[lang]}
                </h3>
                <p
                  style={{
                    color: 'var(--ink-2)',
                    fontSize: 15,
                    lineHeight: 1.7,
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
        style={{
          background: 'var(--bg-2)',
          padding: '120px 0',
          borderTop: '1px solid var(--line)',
          textAlign: 'center',
        }}
      >
        <div className="container-narrow">
          <span className="eyebrow">{t('contact.eyebrow')}</span>
          <h2
            style={{
              fontSize: 'var(--fs-h2)',
              marginTop: 16,
              marginBottom: 24,
            }}
          >
            {t('contact.title')}
          </h2>
          <p
            style={{
              color: 'var(--ink-2)',
              fontSize: 17,
              lineHeight: 1.7,
              maxWidth: 540,
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
