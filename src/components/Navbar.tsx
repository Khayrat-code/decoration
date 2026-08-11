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
        className="container nav-bar"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          height: '100%',
        }}
      >
        <NavLink
          to="/"
          style={{ borderBottom: 'none', display: 'inline-flex', alignItems: 'center', lineHeight: 0 }}
          aria-label="ToolCan Decoration home"
        >
          <Logo size="sm" />
        </NavLink>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {!isAdmin && (
            <button
              type="button"
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
              style={{
                fontFamily: 'inherit',
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: 0,
                textTransform: 'none',
                padding: '8px 14px',
                border: '1px solid var(--line-2)',
                background: 'rgba(255, 255, 255, 0.4)',
                color: 'var(--ink-2)',
                borderRadius: 999,
                cursor: 'pointer',
                minWidth: 44,
                height: 36,
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
              style={{
                  display: 'flex',
                  alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                border: '1px solid var(--line-2)',
                background: 'rgba(255, 255, 255, 0.4)',
                color: 'var(--ink)',
                borderRadius: 10,
                cursor: 'pointer',
              }}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
          {isAdmin && (
            <NavLink
              to="/"
              style={{
                fontSize: 13,
                letterSpacing: 0,
                textTransform: 'none',
                color: 'var(--ink-2)',
                borderBottom: 'none',
              }}
            >
              {t('nav.exitAdmin')}
            </NavLink>
          )}
        </div>
      </div>

      {!isAdmin && open && (
        <nav id="mobile-menu" className="nav-mobile" aria-label={t('nav.primaryNav')}>
          <ul>
            {linkKeys.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  style={({ isActive }) => ({
                    display: 'block',
                    color: isActive ? 'var(--ink)' : 'var(--ink-2)',
                    background: isActive ? 'rgba(61, 79, 61, 0.08)' : 'transparent',
                    fontSize: 15,
                    fontWeight: isActive ? 700 : 500,
                    textDecoration: 'none',
                    borderBottom: 'none',
                    padding: '14px 16px',
                    borderRadius: 10,
                  })}
                >
                  {t(l.key)}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                to="/complaints"
                style={{
                  display: 'block',
                  color: 'var(--ink-2)',
                  background: 'transparent',
                  fontSize: 15,
                  fontWeight: 500,
                  textDecoration: 'none',
                  borderBottom: 'none',
                  padding: '14px 16px',
                  borderRadius: 10,
                }}
              >
                {t('nav.complaints')}
              </NavLink>
            </li>
          </ul>
        </nav>
      )}

      <style>{`
        @media (max-width: 880px) {
          .nav-bar { padding: 10px 16px !important; gap: 8px; }
        }
        .nav-mobile {
          border-top: 1px solid var(--line);
          padding: 8px 16px 16px;
        }
        .nav-mobile ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
      `}</style>
    </header>
  )
}
