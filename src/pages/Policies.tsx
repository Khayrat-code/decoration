import { motion } from 'framer-motion'
import { useLang, useT } from '../i18n/LanguageContext'
import T from '../i18n/translations'
import { BUSINESS } from '../lib/business'

const SECTION_KEYS = ['cookies', 'analytics', 'images', 'terms', 'delivery', 'contact'] as const

export function Policies() {
  const t = useT()
  const { lang } = useLang()
  const updated = new Date().toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <section className="pt-hero">
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
              fontWeight: 700,
              marginTop: 16,
              marginBottom: 24,
              lineHeight: 1.3,
              maxWidth: '20ch',
            }}
          >
            {t('policies.title')}
          </h1>
          <p
            style={{
              color: 'var(--ink-2)',
              fontSize: 17,
              lineHeight: 1.9,
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
          <PrivacySection index={0} />
          {SECTION_KEYS.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i + 1) * 0.04, ease: [0.16, 1, 0.3, 1] }}
              style={{ borderTop: '1px solid var(--line)', paddingTop: 28 }}
            >
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                {t(`policies.${key}.title` as any)}
              </h2>
              <p
                style={{
                  color: 'var(--ink-2)',
                  fontSize: 16,
                  lineHeight: 1.95,
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

function PrivacySection({ index }: { index: number }) {
  const t = useT()
  const { lang } = useLang()
  const p = T.policies.privacy

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      style={{ borderTop: '1px solid var(--line)', paddingTop: 28 }}
    >
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
        {t('policies.privacy.title')}
      </h2>
      <p
        style={{
          color: 'var(--ink-2)',
          fontSize: 16,
          lineHeight: 1.95,
          maxWidth: 680,
          margin: 0,
          marginBottom: 28,
        }}
      >
        {t('policies.privacy.intro')}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 680 }}>
        <PrivacyBlock title={t('policies.privacy.whatTitle')}>
          <p style={privacyBodyStyle(lang)}>{t('policies.privacy.whatBody')}</p>
        </PrivacyBlock>

        <PrivacyBlock title={t('policies.privacy.whyTitle')}>
          <p style={{ ...privacyBodyStyle(lang), marginBottom: 10 }}>{t('policies.privacy.whyIntro')}</p>
          <ul style={{ margin: 0, paddingInlineStart: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {p.whyItems.map((item, i) => (
              <li key={i} style={privacyBodyStyle(lang)}>
                {item[lang]}
              </li>
            ))}
          </ul>
        </PrivacyBlock>

        <PrivacyBlock title={t('policies.privacy.protectTitle')}>
          <p style={privacyBodyStyle(lang)}>{t('policies.privacy.protectBody')}</p>
        </PrivacyBlock>

        <PrivacyBlock title={t('policies.privacy.rightsTitle')}>
          <p style={privacyBodyStyle(lang)}>{t('policies.privacy.rightsBody')}</p>
        </PrivacyBlock>

        <PrivacyBlock title={t('policies.privacy.contactTitle')}>
          <p style={{ ...privacyBodyStyle(lang), marginBottom: 10 }}>{t('policies.privacy.contactBody')}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 15, color: 'var(--ink-2)' }}>
            <span>
              {t('policies.privacy.emailLabel')}:{' '}
              <a href={`mailto:${BUSINESS.email}`} style={{ color: 'var(--accent)' }}>
                {BUSINESS.email}
              </a>
            </span>
            <span dir="ltr" style={{ textAlign: lang === 'ar' ? 'end' : 'start' }}>
              {t('policies.privacy.phoneLabel')}:{' '}
              <a href={BUSINESS.phoneHref} style={{ color: 'var(--accent)' }}>
                {BUSINESS.phoneDisplay}
              </a>
            </span>
          </div>
        </PrivacyBlock>
      </div>
    </motion.div>
  )
}

function privacyBodyStyle(lang: 'ar' | 'en'): React.CSSProperties {
  return {
    color: 'var(--ink-2)',
    fontSize: 15,
    lineHeight: 1.95,
    margin: 0,
  }
}

function PrivacyBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', marginBottom: 8 }}>{title}</h3>
      {children}
    </div>
  )
}
