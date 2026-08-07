import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Logo } from './Logo'
import { useLang, useT } from '../i18n/LanguageContext'

const linkKeys = [
  { to: '/',         key: 'nav.home' },
  { to: '/gallery',  key: 'nav.gallery' },
  { to: '/contact',  key: 'nav.contact' },
] as const

export function Navbar() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')
  const [scrolled, setScrolled] = useState(false)
  const t = useT()
  const { lang, setLang } = useLang()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(245, 241, 234, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'saturate(140%) blur(10px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'saturate(140%) blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
        transition: 'background-color 240ms ease, border-color 240ms ease, backdrop-filter 240ms ease',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '22px 32px',
          gap: 24,
        }}
      >
        <NavLink
          to="/"
          style={{ borderBottom: 'none' }}
          aria-label="ToolCan Decoration home"
        >
          <Logo size="md" />
        </NavLink>

        {!isAdmin && (
          <nav aria-label={t('nav.primaryNav')}>
            <ul
              style={{
                display: 'flex',
                gap: 36,
                listStyle: 'none',
                margin: 0,
                padding: 0,
                alignItems: 'center',
              }}
            >
              {linkKeys.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    style={({ isActive }) => ({
                      color: isActive ? 'var(--ink)' : 'var(--ink-2)',
                      fontSize: 13,
                      fontWeight: 500,
                      letterSpacing: lang === 'ar' ? 0 : '0.18em',
                      textTransform: lang === 'ar' ? 'none' : 'uppercase',
                      borderBottom: 'none',
                      padding: '6px 0',
                      position: 'relative',
                    })}
                  >
                    {({ isActive }) => (
                      <>
                        {t(l.key)}
                        {isActive && (
                          <span
                            aria-hidden="true"
                            style={{
                              position: 'absolute',
                              insetInlineStart: 0,
                              insetInlineEnd: 0,
                              bottom: -2,
                              height: 1,
                              background: 'var(--accent)',
                            }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}

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
                letterSpacing: lang === 'ar' ? 0 : '0.18em',
                textTransform: lang === 'ar' ? 'none' : 'uppercase',
                padding: '8px 14px',
                border: '1px solid var(--line-2)',
                background: 'transparent',
                color: 'var(--ink-2)',
                borderRadius: 999,
                cursor: 'pointer',
                minWidth: 44,
                transition: 'all 200ms var(--ease-out-soft)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.color = 'var(--ink)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--line-2)'
                e.currentTarget.style.color = 'var(--ink-2)'
              }}
            >
              {lang === 'ar' ? 'EN' : 'AR'}
            </button>
          )}
          {isAdmin && (
            <NavLink
              to="/"
              style={{
                fontSize: 13,
                letterSpacing: lang === 'ar' ? 0 : '0.18em',
                textTransform: lang === 'ar' ? 'none' : 'uppercase',
                color: 'var(--ink-2)',
                borderBottom: 'none',
              }}
            >
              {t('nav.exitAdmin')}
            </NavLink>
          )}
        </div>
      </div>
    </header>
  )
}
