import { Link } from 'react-router-dom'
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  BadgeCheck,
  Landmark,
  Banknote,
} from 'lucide-react'
import { useLang, useT } from '../i18n/LanguageContext'
import { Logo } from './Logo'
import { BUSINESS } from '../lib/business'

const LIGHT = 'rgba(245, 241, 234, 0.72)'
const LIGHT_SOFT = 'rgba(245, 241, 234, 0.5)'
const GOLD = '#C7A87A'

export function Footer() {
  const year = new Date().getFullYear()
  const t = useT()
  const { lang } = useLang()

  const socialLinks: Array<{ href: string; label: string }> = [
    { href: 'https://www.tiktok.com/@toolcan.sa', label: t('footer.connect.tiktok') },
    { href: 'https://www.snapchat.com/add/toolcan.sa', label: t('footer.connect.snap') },
    { href: 'https://www.instagram.com/toolcan.sa', label: t('footer.connect.instagram') },
    { href: 'https://x.com/toolcan_', label: t('footer.connect.x') },
  ]

  const quickLinks: Array<{ to: string; label: string }> = [
    { to: '/', label: t('nav.home') },
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
    { to: '/policies', label: t('footer.legal.policies') },
    { to: '/contact', label: t('footer.complaints') },
  ]

  const payments: Array<{ key: string; label: string; icon?: 'bank' | 'cod' | 'mc' }> = [
    { key: 'mada', label: t('footer.payments.mada') },
    { key: 'visa', label: t('footer.payments.visa') },
    { key: 'mastercard', label: t('footer.payments.mastercard'), icon: 'mc' },
    { key: 'amex', label: t('footer.payments.amex') },
    { key: 'applePay', label: t('footer.payments.applePay') },
    { key: 'bank', label: t('footer.payments.bank'), icon: 'bank' },
    { key: 'cod', label: t('footer.payments.cod'), icon: 'cod' },
  ]

  return (
    <footer style={{ background: 'var(--ink)', color: LIGHT, marginTop: 'auto' }}>
      <div className="container" style={{ padding: '72px 32px 0' }}>
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.3fr 0.8fr 1.1fr 1.1fr',
            gap: 48,
            paddingBottom: 48,
          }}
        >
          <div>
            <Logo size="md" tone="light" />
            <p style={{ marginTop: 20, fontSize: 14, lineHeight: lang === 'ar' ? 1.95 : 1.7, maxWidth: 300 }}>
              {t('footer.blurb')}
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
              {socialLinks.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: LIGHT,
                    fontSize: 12,
                    textDecoration: 'none',
                    border: '1px solid rgba(245, 241, 234, 0.22)',
                    borderRadius: 999,
                    padding: '6px 14px',
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <FooterHeading>{t('footer.quickTitle')}</FooterHeading>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {quickLinks.map((l, i) => (
                <li key={i}>
                  <Link to={l.to} style={{ color: LIGHT, fontSize: 14, textDecoration: 'none', border: 'none' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>{t('footer.contactTitle')}</FooterHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 14 }}>
              <ContactRow icon={<MapPin size={16} />}>
                <span dir={lang === 'ar' ? 'rtl' : 'ltr'}>{BUSINESS.address[lang]}</span>
              </ContactRow>
              <ContactRow icon={<Phone size={16} />}>
                <a href={BUSINESS.phoneHref} dir="ltr" style={{ color: LIGHT, textDecoration: 'none', border: 'none' }}>
                  {BUSINESS.phoneDisplay}
                </a>
              </ContactRow>
              <ContactRow icon={<Mail size={16} />}>
                <a href={`mailto:${BUSINESS.email}`} dir="ltr" style={{ color: LIGHT, textDecoration: 'none', border: 'none' }}>
                  {BUSINESS.email}
                </a>
              </ContactRow>
              <ContactRow icon={<MessageCircle size={16} />}>
                <a href={BUSINESS.whatsappHref} target="_blank" rel="noreferrer" style={{ color: LIGHT, textDecoration: 'none', border: 'none' }}>
                  {t('footer.whatsapp')}
                </a>
              </ContactRow>
            </div>
          </div>

          <div>
            <FooterHeading>{t('footer.trustTitle')}</FooterHeading>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: 'rgba(245, 241, 234, 0.06)',
                border: '1px solid rgba(245, 241, 234, 0.14)',
                borderRadius: 'var(--radius)',
                padding: '12px 14px',
              }}
            >
              <BadgeCheck size={22} style={{ color: GOLD, flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: 'rgba(245, 241, 234, 0.85)' }}>{t('footer.certified')}</span>
            </div>
            <div style={{ marginTop: 14, fontSize: 13, color: LIGHT_SOFT }}>
              {t('footer.crLabel')}:{' '}
              <span dir="ltr" style={{ color: 'rgba(245, 241, 234, 0.85)' }}>{BUSINESS.cr}</span>
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
            padding: '20px 0',
            borderTop: '1px solid rgba(245, 241, 234, 0.1)',
          }}
        >
          <span style={{ fontSize: 12, color: LIGHT_SOFT, letterSpacing: lang === 'ar' ? 0 : '0.14em' }}>
            {t('footer.paymentsTitle')}
          </span>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {payments.map((p) => (
              <span
                key={p.key}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: '#FFFFFF',
                  color: '#1F1F1F',
                  borderRadius: 6,
                  padding: '6px 12px',
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                {p.icon === 'bank' && <Landmark size={13} />}
                {p.icon === 'cod' && <Banknote size={13} />}
                {p.icon === 'mc' && (
                  <span style={{ display: 'inline-flex' }} aria-hidden="true">
                    <span style={{ width: 10, height: 10, borderRadius: 999, background: '#EB001B', display: 'inline-block' }} />
                    <span style={{ width: 10, height: 10, borderRadius: 999, background: '#F79E1B', display: 'inline-block', marginInlineStart: -4 }} />
                  </span>
                )}
                {p.label}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
            padding: '16px 0 20px',
            borderTop: '1px solid rgba(245, 241, 234, 0.1)',
            color: LIGHT_SOFT,
            fontSize: 12,
          }}
        >
          <span>{t('footer.copyright', { year })}</span>
          <span style={{ display: 'flex', gap: 16 }}>
            <Link to="/policies" style={{ color: LIGHT_SOFT, fontSize: 12, textDecoration: 'none', border: 'none' }}>
              {t('footer.legal.policies')}
            </Link>
            <Link to="/admin/login" style={{ color: 'rgba(245, 241, 234, 0.4)', fontSize: 12, textDecoration: 'none', border: 'none' }}>
              {t('footer.connect.admin')}
            </Link>
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 620px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </footer>
  )
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  const { lang } = useLang()
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          color: '#F5F1EA',
          fontSize: 15,
          fontWeight: 600,
          marginBottom: 10,
        }}
      >
        {children}
      </div>
      <div style={{ width: 28, height: 2, background: GOLD, borderRadius: 999, marginInlineStart: lang === 'ar' ? 0 : undefined, marginInlineEnd: lang === 'en' ? 0 : undefined }} />
    </div>
  )
}

function ContactRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          borderRadius: 999,
          border: '1px solid rgba(245, 241, 234, 0.22)',
          color: GOLD,
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      {children}
    </div>
  )
}
