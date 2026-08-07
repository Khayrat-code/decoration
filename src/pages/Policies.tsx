import { motion } from 'framer-motion'
import { useT } from '../i18n/LanguageContext'

const SECTION_KEYS = ['privacy', 'cookies', 'analytics', 'images', 'contact'] as const

export function Policies() {
  const t = useT()
  const updated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <section style={{ padding: '120px 0 80px' }}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">{t('policies.eyebrow')}</span>
          <h1
            style={{
              fontSize: 'var(--fs-h1)',
              marginTop: 16,
              marginBottom: 24,
              lineHeight: 1.15,
            }}
          >
            {t('policies.title')}
          </h1>
          <p
            style={{
              color: 'var(--ink-2)',
              fontSize: 17,
              lineHeight: 1.75,
              maxWidth: 640,
              marginBottom: 12,
            }}
          >
            {t('policies.intro')}
          </p>
          <div
            style={{
              fontSize: 12,
              color: 'var(--ink-3)',
              letterSpacing: '0.06em',
              marginBottom: 64,
            }}
          >
            {t('policies.lastUpdated')}: {updated}
          </div>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {SECTION_KEYS.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              style={{ borderTop: '1px solid var(--line)', paddingTop: 28 }}
            >
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 500,
                  marginBottom: 12,
                }}
              >
                {t(`policies.${key}.title` as any)}
              </h2>
              <p
                style={{
                  color: 'var(--ink-2)',
                  fontSize: 16,
                  lineHeight: 1.85,
                  maxWidth: 680,
                  margin: 0,
                }}
              >
                {t(`policies.${key}.body` as any)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}