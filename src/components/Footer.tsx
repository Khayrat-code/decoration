import { Link } from 'react-router-dom'
import { useT } from '../i18n/LanguageContext'

/**
 * Minimal footer.
 *
 * - Desktop: one row with wordmark · nav links · socials, then a thin
 *   copyright + admin strip.
 * - Mobile: the wordmark/nav/socials row is hidden (all of it is already
 *   in the main navbar and the hero CTAs), so the footer collapses to a
 *   single ~40px line with the essentials: copyright · policies · admin.
 *
 * Total height on a phone: ~56px including padding.
 */
export function Footer() {
  const year = new Date().getFullYear()
  const t = useT()

  return (
    <footer
      style={{
        background: 'var(--ink)',
        color: 'rgba(245, 241, 234, 0.7)',
        padding: '14px 0',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        {/* Top row: wordmark + nav + socials — desktop only */}
        <div
          className="footer-top-row"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: 12,
            paddingBottom: 12,
            borderBottom: '1px solid rgba(245, 241, 234, 0.08)',
          }}
        >
          <Link
            to="/"
            style={{
              borderBottom: 'none',
              color: 'rgba(245, 241, 234, 0.92)',
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: '-0.01em',
            }}
            aria-label="ToolCan Decoration home"
          >
            ToolCan Decoration
          </Link>

          <nav aria-label={t('nav.primaryNav')}>
            <ul
              style={{
                display: 'flex',
                gap: 18,
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

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
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

        {/* Bottom row: copyright + policies + admin — always visible, always one line */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
            color: 'rgba(245, 241, 234, 0.5)',
            fontSize: 11,
            letterSpacing: '0.04em',
          }}
        >
          <span>© {year} ToolCan</span>
          <span style={{ display: 'flex', gap: 14 }}>
            <Link to="/policies" style={{ ...footerLink, color: 'rgba(245, 241, 234, 0.5)', fontSize: 11 }}>
              {t('footer.legal.policies')}
            </Link>
            <Link to="/admin/login" style={{ ...footerLink, color: 'rgba(245, 241, 234, 0.4)', fontSize: 11 }}>
              {t('footer.connect.admin')}
            </Link>
          </span>
        </div>
      </div>

      <style>{`
        /* Hide the top row on small screens — the main navbar already
           shows wordmark + nav + socials, so the footer only needs the
           essentials line. */
        @media (max-width: 720px) {
          .footer-top-row { display: none !important; }
        }
      `}</style>
    </footer>
  )
}

const footerLink: React.CSSProperties = {
  color: 'rgba(245, 241, 234, 0.7)',
  fontSize: 12,
  borderBottom: 'none',
  textDecoration: 'none',
}
