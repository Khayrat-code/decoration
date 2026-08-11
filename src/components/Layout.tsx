import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { WhatsAppButton } from './WhatsAppButton'
import { useLang } from '../i18n/LanguageContext'

export function Layout() {
  const location = useLocation()
  const { lang } = useLang()

  // Scroll to the top of the new page on every route change — otherwise
  // the browser keeps whatever scroll position the previous page was
  // at, so e.g. clicking "Contact" from the middle of the homepage
  // lands on the contact form already scrolled halfway down.
  useEffect(() => {
    // `behavior: 'auto'` overrides the global `scroll-behavior: smooth`
    // (set in global.css for anchor links) so route changes jump
    // instantly instead of animating past the fade-in transition.
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <>
      <Navbar />
      <main key={location.pathname} className="page-fade">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton
        label={lang === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
      />
    </>
  )
}
