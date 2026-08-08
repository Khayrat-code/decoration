import { Link } from 'react-router-dom'
import { useT } from '../i18n/LanguageContext'

/**
 * Minimal footer.
 *
 * Layout (both desktop and mobile, just compact differently):
 *  - Top row: wordmark · nav · socials (horizontal on desktop, hidden
 *    on small screens because the main navbar already carries all of
 *    this).
 *  - On small screens, the socials move into a thin second row right
 *    above the copyright line — so they ARE visible on phones, just
 *    in a tighter arrangement.
 *  - Bottom row: copyright · policies · admin (always visible).
 *
 * Total height on a phone: ~80px (one compact socials line + the
 * copyright line).
 * Total height on desktop: ~90px.
 */
export function Footer() {
  const year = new Date().getFullYear()
  const t = useT()

  const socialLinks: Array<{ href: string; label: string }> = [
    { href: 'https://www.tiktok.com/@toolcan.sa', label: t('footer.connect.tiktok') },
    { href: 'https://www.snapchat.com/add/toolcan.sa', label: t('footer.connect.snap') },
    { href: 'https://www.instagram.com/toolcan.sa', label: t('footer.connect.instagram') },
    { href: 'https://x.com/toolcan_', label: t('footer.connect.x') },
  ]

  return (
    <footer
      style={{
        background: 'var(--ink)',
        color: 'rgba(245, 241, 234, 0.7)',
        padding: '10px 0 12px',
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
            marginBottom: 8,
            paddingBottom: 8,
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
            {socialLinks.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noreferrer" style={footerLink}>
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile-only socials row (hidden on desktop) */}
        <div
          className="footer-socials-mobile"
          style={{
            display: 'none',
            justifyContent: 'center',
            gap: 14,
            flexWrap: 'wrap',
            paddingBottom: 8,
            marginBottom: 8,
            borderBottom: '1px solid rgba(245, 241, 234, 0.08)',
          }}
        >
          {socialLinks.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noreferrer" style={{ ...footerLink, fontSize: 11 }}>
              {s.label}
            </a>
          ))}
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
        /* Desktop: top row carries everything. Hide the mobile-only
           socials row, since the top row already has them. */
        @media (min-width: 721px) {
          .footer-socials-mobile { display: none !important; }
        }
        /* Mobile: hide the big top row (wordmark + nav + socials
           are all already in the navbar), and show the compact
           socials row instead. */
        @media (max-width: 720px) {
          .footer-top-row { display: none !important; }
          .footer-socials-mobile { display: flex !important; }
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
