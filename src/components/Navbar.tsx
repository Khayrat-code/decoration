import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Logo } from './Logo'
import { useLang, useT } from '../i18n/LanguageContext'

const linkKeys = [
  { to: '/',             key: 'nav.home' },
  { to: '/gallery',      key: 'nav.gallery' },
  { to: '/about',        key: 'nav.about' },
  { to: '/how-we-work',  key: 'nav.howWeWork' },
  { to: '/contact',      key: 'nav.contact' },
] as const

export function Navbar() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const t = useT()
  const { lang, setLang } = useLang()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 'var(--navbar-h)',
        background: scrolled || open
          ? 'rgba(245, 241, 234, 0.94)'
          : 'rgba(245, 241, 234, 0.78)',
        backdropFilter: 'saturate(140%) blur(14px)',
        WebkitBackdropFilter: 'saturate(140%) blur(14px)',
        borderBottom: '1px solid var(--line)',
        transition: 'background-color 240ms ease, backdrop-filter 240ms ease',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
          padding: '0 32px',
        }}
      >
        {/* Logo */}
        <NavLink
          to="/"
          style={{ borderBottom: 'none', display: 'inline-flex', alignItems: 'center', lineHeight: 0 }}
          aria-label="ToolCan Decoration home"
        >
          <Logo size="sm" />
        </NavLink>

        {/* Desktop nav — centered, clean, no uppercase */}
        {!isAdmin && (
          <nav className="nav-desktop" aria-label={t('nav.primaryNav')}>
            {linkKeys.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className="nav-link"
                style={({ isActive }) => ({
                  color: isActive ? 'var(--ink)' : 'var(--ink-2)',
                  borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                })}
              >
                {t(l.key)}
              </NavLink>
            ))}
          </nav>
        )}

        {/* Right side: lang toggle + burger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {!isAdmin && (
            <button
              type="button"
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
              style={{
                fontFamily: 'inherit',
                fontSize: 12,
                fontWeight: 500,
                padding: '6px 12px',
                border: '1px solid var(--line-2)',
                background: 'transparent',
                color: 'var(--ink-2)',
                borderRadius: 999,
                cursor: 'pointer',
                minWidth: 40,
                height: 32,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 200ms var(--ease-out-soft)',
              }}
            >
              {lang === 'ar' ? 'EN' : 'AR'}
            </button>
          )}
          {!isAdmin && (
            <button
              type="button"
              className="nav-burger"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
          {isAdmin && (
            <NavLink
              to="/"
              style={{
                fontSize: 13,
                color: 'var(--ink-2)',
                borderBottom: 'none',
              }}
            >
              {t('nav.exitAdmin')}
            </NavLink>
          )}
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {!isAdmin && open && (
        <nav id="mobile-menu" className="nav-mobile" aria-label={t('nav.primaryNav')}>
          <ul>
            {linkKeys.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className="nav-mobile-link"
                  style={({ isActive }) => ({
                    color: isActive ? 'var(--ink)' : 'var(--ink-2)',
                    background: isActive ? 'rgba(61, 79, 61, 0.06)' : 'transparent',
                    fontWeight: isActive ? 700 : 500,
                  })}
                >
                  {t(l.key)}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/complaints" className="nav-mobile-link" style={{ color: 'var(--ink-2)', fontWeight: 500, background: 'transparent' }}>
                {t('nav.complaints')}
              </NavLink>
            </li>
          </ul>
        </nav>
      )}

      <style>{`
        /* Desktop nav — minimal, elegant, no list bullshit */
        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 40px;
        }
        .nav-link {
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          border-bottom: 2px solid transparent !important;
          padding: 24px 0 22px;
          transition: color 180ms var(--ease-out-soft), border-color 180ms var(--ease-out-soft);
        }
        .nav-link:hover {
          color: var(--ink) !important;
        }

        /* Burger: hidden on desktop, visible on mobile */
        .nav-burger {
          display: none;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: 1px solid var(--line-2);
          background: transparent;
          color: var(--ink);
          border-radius: 10px;
          cursor: pointer;
          flex-shrink: 0;
        }

        @media (max-width: 880px) {
          .nav-desktop { display: none; }
          .nav-burger { display: flex; }
        }

        /* Mobile menu */
        .nav-mobile {
          border-top: 1px solid var(--line);
          padding: 8px 16px 16px;
          background: rgba(245, 241, 234, 0.98);
        }
        .nav-mobile ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .nav-mobile-link {
          display: block;
          font-size: 15px;
          text-decoration: none;
          border-bottom: none !important;
          padding: 14px 16px;
          border-radius: 10px;
          transition: background-color 120ms var(--ease-out-soft);
        }
        .nav-mobile-link:hover {
          background: rgba(61, 79, 61, 0.05);
        }
      `}</style>
    </header>
  )
}
