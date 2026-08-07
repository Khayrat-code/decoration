import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Logo } from './Logo'
import { useT } from '../i18n/LanguageContext'

export function Footer() {
  const year = new Date().getFullYear()
  const t = useT()

  return (
    <footer
      style={{
        background: 'var(--ink)',
        color: '#DAD3BF',
        padding: '120px 0 40px',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) repeat(3, minmax(0, 1fr))',
            gap: 64,
            alignItems: 'start',
          }}
          className="footer-grid"
        >
          <div>
            <div style={{ filter: 'invert(0.92) hue-rotate(180deg)' }}>
              <Logo size="md" />
            </div>
            <p
              style={{
                marginTop: 28,
                color: 'rgba(245, 241, 234, 0.66)',
                fontSize: 16,
                maxWidth: 360,
                lineHeight: 1.7,
              }}
            >
              {t('footer.blurb')}
            </p>
          </div>

          <FooterCol title={t('footer.columns.explore')}>
            <FooterLink to="/">{t('nav.home')}</FooterLink>
            <FooterLink to="/gallery">{t('nav.gallery')}</FooterLink>
            <FooterLink to="/contact">{t('nav.contact')}</FooterLink>
          </FooterCol>

          <FooterCol title={t('footer.columns.studio')}>
            <span style={footerText}>{t('footer.studio.appointment')}</span>
            <span style={footerText}>{t('footer.studio.hours')}</span>
            <a href="mailto:khayratum@gmail.com" style={footerLinkText}>
              {t('footer.studio.email')}
            </a>
          </FooterCol>

          <FooterCol title={t('footer.columns.connect')}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" style={footerLinkText}>
              {t('footer.connect.instagram')} <ArrowUpRight size={14} />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" style={footerLinkText}>
              {t('footer.connect.pinterest')} <ArrowUpRight size={14} />
            </a>
            <Link to="/admin/login" style={{ ...footerLinkText, opacity: 0.5 }}>
              {t('footer.connect.admin')}
            </Link>
          </FooterCol>
        </div>

        <hr
          style={{
            border: 0,
            borderTop: '1px solid rgba(245, 241, 234, 0.12)',
            margin: '80px 0 28px',
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: 'rgba(245, 241, 234, 0.5)',
            fontSize: 12,
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <span>{t('footer.copyright', { year })}</span>
          <span>{t('footer.group')}</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#F5F1EA',
          marginBottom: 18,
        }}
      >
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{children}</div>
    </div>
  )
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      style={{
        color: 'rgba(245, 241, 234, 0.7)',
        fontSize: 15,
        borderBottom: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        transition: 'color 200ms ease',
      }}
    >
      {children}
    </Link>
  )
}

const footerText: React.CSSProperties = {
  color: 'rgba(245, 241, 234, 0.7)',
  fontSize: 15,
}

const footerLinkText: React.CSSProperties = {
  ...footerText,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
}
