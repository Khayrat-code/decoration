import { Link } from 'react-router-dom'
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
} from 'lucide-react'
import { useLang, useT } from '../i18n/LanguageContext'
import { Logo } from './Logo'
import { BUSINESS } from '../lib/business'
import { TikTokIcon, SnapchatIcon, InstagramIcon, XIcon } from './SocialIcons'
import {
  PaymentBadge,
  TextBadge,
  BankIcon,
  CodIcon,
  CRIcon,
  MawthoogIcon,
} from './BrandIcons'

const LIGHT = 'rgba(245, 241, 234, 0.72)'
const LIGHT_SOFT = 'rgba(245, 241, 234, 0.5)'
const GOLD = '#C7A87A'

const SOCIAL_ICONS: Record<string, (p: { size?: number }) => React.ReactNode> = {
  tiktok: TikTokIcon,
  snap: SnapchatIcon,
  instagram: InstagramIcon,
  x: XIcon,
}

export function Footer() {
  const year = new Date().getFullYear()
  const t = useT()
  const { lang } = useLang()

  const socialLinks: Array<{ href: string; label: string; key: string }> = [
    { href: 'https://www.tiktok.com/@toolcan.sa', label: t('footer.connect.tiktok'), key: 'tiktok' },
    { href: 'https://www.snapchat.com/add/toolcan.sa', label: t('footer.connect.snap'), key: 'snap' },
    { href: 'https://www.instagram.com/toolcan.sa', label: t('footer.connect.instagram'), key: 'instagram' },
    { href: 'https://x.com/toolcan_', label: t('footer.connect.x'), key: 'x' },
  ]

  const quickLinks: Array<{ to: string; label: string }> = [
    { to: '/', label: t('nav.home') },
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/about', label: t('nav.about') },
    { to: '/how-we-work', label: t('nav.howWeWork') },
    { to: '/contact', label: t('nav.contact') },
    { to: '/policies', label: t('footer.legal.policies') },
    { to: '/complaints', label: t('footer.complaints') },
  ]

  type Pay = { key: string; label: string; src?: string; generic?: 'bank' | 'cod' }
  const payments: Pay[] = [
    { key: 'mada',       label: t('footer.payments.mada'),       src: '/payments/mada.svg' },
    { key: 'visa',       label: t('footer.payments.visa'),       src: '/payments/visa.svg' },
    { key: 'mastercard', label: t('footer.payments.mastercard'), src: '/payments/mastercard.svg' },
    { key: 'amex',       label: t('footer.payments.amex'),       src: '/payments/amex.svg' },
    { key: 'applePay',   label: t('footer.payments.applePay'),   src: '/payments/apple-pay.svg' },
    { key: 'tabby',      label: t('footer.payments.tabby'),      src: '/payments/tabby.svg' },
    { key: 'tamara',     label: t('footer.payments.tamara'),     src: '/payments/tamara.svg' },
    { key: 'bank',       label: t('footer.payments.bank'),       generic: 'bank' },
    { key: 'cod',        label: t('footer.payments.cod'),        generic: 'cod' },
  ]

  return (
    <footer className="dark-surface" style={{ background: 'var(--ink)', color: LIGHT, marginTop: 'auto' }}>
      <div className="container f-wrap">
        <div className="f-grid">
          <div className="f-brand">
            <Logo size="md" tone="light" />
            <p className="f-blurb">{t('footer.blurb')}</p>
            <div className="f-socials">
              {socialLinks.map((s) => {
                const Icon = SOCIAL_ICONS[s.key]
                return (
                  <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="f-soc" aria-label={s.label} title={s.label}>
                    <Icon size={16} />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="f-links">
            <FooterHeading>{t('footer.quickTitle')}</FooterHeading>
            <ul className="f-list">
              {quickLinks.map((l, i) => (
                <li key={i}>
                  <Link to={l.to} className="f-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="f-contact">
            <FooterHeading>{t('footer.contactTitle')}</FooterHeading>
            <div className="f-contact-rows">
              <ContactRow icon={<MapPin size={15} />}>
                <span dir={lang === 'ar' ? 'rtl' : 'ltr'}>{BUSINESS.address[lang]}</span>
              </ContactRow>
              <ContactRow icon={<Phone size={15} />}>
                <a href={BUSINESS.phoneHref} dir="ltr" className="f-link">
                  <span dir="ltr">{BUSINESS.phoneDisplay}</span>
                </a>
              </ContactRow>
              <ContactRow icon={<Mail size={15} />}>
                <a href={`mailto:${BUSINESS.email}`} dir="ltr" className="f-link">
                  {BUSINESS.email}
                </a>
              </ContactRow>
              <ContactRow icon={<MessageCircle size={15} />}>
                <a href={BUSINESS.whatsappHref} target="_blank" rel="noreferrer" className="f-link">
                  {t('footer.whatsapp')}
                </a>
              </ContactRow>
            </div>
          </div>

          <div className="f-trust">
            <FooterHeading>{t('footer.trustTitle')}</FooterHeading>
            <div className="f-trust-card">
              <MawthoogIcon size={36} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 13, color: 'rgba(245, 241, 234, 0.92)', fontWeight: 500 }}>
                  {t('footer.certified')}
                </span>
                <span style={{ fontSize: 11, color: 'rgba(245, 241, 234, 0.62)', letterSpacing: '0.04em' }}>
                  {t('footer.mawthoogSub')}
                </span>
              </div>
            </div>
            <div className="f-cr">
              <CRIcon size={36} />
              <span>
                {t('footer.crLabel')}: <span dir="ltr" style={{ color: 'rgba(245, 241, 234, 0.85)' }}>{BUSINESS.cr}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="f-pay">
          <span className="f-pay-label">{t('footer.paymentsTitle')}</span>
          <div className="f-pay-chips">
            {payments.map((p) =>
              p.generic ? (
                <TextBadge
                  key={p.key}
                  label={p.label}
                  icon={p.generic === 'bank' ? <BankIcon size={16} /> : <CodIcon size={16} />}
                />
              ) : (
                <PaymentBadge key={p.key} src={p.src!} label={p.label} />
              ),
            )}
          </div>
        </div>

        <div className="f-bottom">
          <span>{t('footer.copyright', { year })}</span>
          <div className="f-bottom-links">
            <Link to="/policies" className="f-link">{t('footer.legal.policies')}</Link>
            <span aria-hidden="true" style={{ opacity: 0.4 }}>·</span>
            <Link to="/complaints" className="f-link">{t('footer.complaints')}</Link>
          </div>
        </div>
      </div>

      <style>{`
        .f-wrap { padding: 64px 32px 0; }
        .f-grid {
          display: grid;
          grid-template-columns: 1.3fr 0.8fr 1.1fr 1.1fr;
          gap: 48px;
          padding-bottom: 44px;
        }
        .f-blurb {
          margin: 20px 0 0;
          font-size: 14px;
          line-height: ${lang === 'ar' ? 1.95 : 1.7};
          max-width: 300px;
        }
        .f-socials { display: flex; gap: 10px; margin-top: 20px; }
        .f-soc {
          width: 38px;
          height: 38px;
          border-radius: 999px;
          border: 1px solid rgba(245, 241, 234, 0.22);
          color: ${LIGHT};
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: color 200ms, border-color 200ms;
        }
        .f-soc:hover { color: ${GOLD}; border-color: ${GOLD}; }
        .f-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .f-link {
          color: ${LIGHT};
          font-size: 14px;
          text-decoration: none;
          border: none;
        }
        .f-link:hover { color: #F5F1EA; }
        .f-contact-rows { display: flex; flex-direction: column; gap: 14px; font-size: 14px; }
        .f-trust-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background: rgba(245, 241, 234, 0.06);
          border: 1px solid rgba(245, 241, 234, 0.14);
          border-radius: var(--radius);
          padding: 14px;
        }
        .f-trust-card svg { flex-shrink: 0; }
        .f-cr {
          margin-top: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          color: ${LIGHT_SOFT};
        }
        .f-pay {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          padding: 20px 0;
          border-top: 1px solid rgba(245, 241, 234, 0.1);
        }
        .f-pay-label { font-size: 12px; color: ${LIGHT_SOFT}; }
        .f-pay-chips { display: flex; gap: 10px; flex-wrap: wrap; }
        .f-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          padding: 16px 0 20px;
          border-top: 1px solid rgba(245, 241, 234, 0.1);
          color: ${LIGHT_SOFT};
          font-size: 12px;
        }
        .f-bottom-links { display: flex; gap: 12px; align-items: center; }

        @media (max-width: 980px) {
          .f-grid { grid-template-columns: 1fr 1fr; gap: 40px 32px; }
        }
        @media (max-width: 620px) {
          .f-wrap { padding: 48px 20px 0; }
          .f-grid { grid-template-columns: 1fr 1fr; gap: 28px 20px; }
          .f-brand, .f-trust { grid-column: 1 / -1; margin: 0; }
          .f-blurb { max-width: none; }
          .f-socials { margin-top: 16px; }
          .f-contact-rows { gap: 12px; font-size: 13px; }
          .f-pay { flex-direction: column; align-items: flex-start; gap: 12px; padding: 16px 0; }
          .f-bottom {
            flex-direction: column;
            justify-content: center;
            text-align: center;
            gap: 6px;
            padding: 14px 0 18px;
          }
        }
      `}</style>
    </footer>
  )
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ color: '#F5F1EA', fontSize: 15, fontWeight: 600, marginBottom: 10 }}>
        {children}
      </div>
      <div style={{ width: 28, height: 2, background: GOLD, borderRadius: 999 }} />
    </div>
  )
}

function ContactRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
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
      <span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>{children}</span>
    </div>
  )
}
