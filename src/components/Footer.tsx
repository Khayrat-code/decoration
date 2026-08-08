import { Link } from 'react-router-dom'
import { useT } from '../i18n/LanguageContext'

/**
 * Compact footer — single row, minimal vertical space.
 * ~4× smaller than the previous version (was ~500px tall, now ~120px).
 */
export function Footer() {
  const year = new Date().getFullYear()
  const t = useT()

  return (
    <footer
      style={{
        background: 'var(--ink)',
        color: 'rgba(245, 241, 234, 0.7)',
        padding: '32px 0',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 24,
          }}
          className="footer-row"
        >
          {/* Brand mark */}
          <Link
            to="/"
            style={{
              borderBottom: 'none',
              color: 'rgba(245, 241, 234, 0.92)',
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 17,
              fontWeight: 500,
              letterSpacing: '-0.01em',
            }}
            aria-label="ToolCan Decoration home"
          >
            ToolCan Decoration
          </Link>

          {/* Nav links */}
          <nav aria-label={t('nav.primaryNav')}>
            <ul
              style={{
                display: 'flex',
                gap: 24,
                listStyle: 'none',
                margin: 0,
                padding: 0,
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <li><Link to="/" style={footerLink}>{t('nav.home')}</Link></li>
              <li><Link to="/gallery" style={footerLink}>{t('nav.gallery')}</Link></li>
              <li><Link to="/about" style={footerLink}>{t('nav.about')}</Link></li>
              <li><Link to="/contact" style={footerLink}>{t('nav.contact')}</Link></li>
            </ul>
          </nav>

          {/* Socials + policies + admin (compact) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              flexWrap: 'wrap',
            }}
          >
            <a href="https://www.tiktok.com/@toolcan.sa" target="_blank" rel="noreferrer" style={footerLink}>
              {t('footer.connect.tiktok')}
            </a>
            <a href="https://www.snapchat.com/add/toolcan.sa" target="_blank" rel="noreferrer" style={footerLink}>
              {t('footer.connect.snap')}
            </a>
            <a href="https://www.instagram.com/toolcan.sa" target="_blank" rel="noreferrer" style={footerLink}>
              {t('footer.connect.instagram')}
            </a>
            <a href="https://x.com/toolcan_" target="_blank" rel="noreferrer" style={footerLink}>
              {t('footer.connect.x')}
            </a>
          </div>
        </div>

        <div
          style={{
            marginTop: 20,
            paddingTop: 16,
            borderTop: '1px solid rgba(245, 241, 234, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            color: 'rgba(245, 241, 234, 0.45)',
            fontSize: 12,
            letterSpacing: '0.04em',
          }}
        >
          <span>© {year} ToolCan · Part of the ToolCan group of studios</span>
          <span style={{ display: 'flex', gap: 16 }}>
            <Link to="/policies" style={{ ...footerLink, color: 'rgba(245, 241, 234, 0.45)' }}>
              {t('footer.legal.policies')}
            </Link>
            <Link to="/admin/login" style={{ ...footerLink, color: 'rgba(245, 241, 234, 0.35)' }}>
              {t('footer.connect.admin')}
            </Link>
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .footer-row { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
        }
      `}</style>
    </footer>
  )
}

const footerLink: React.CSSProperties = {
  color: 'rgba(245, 241, 234, 0.7)',
  fontSize: 13,
  borderBottom: 'none',
  textDecoration: 'none',
}
