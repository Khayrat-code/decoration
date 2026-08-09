import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { WhatsAppButton } from './WhatsAppButton'
import { useLang } from '../i18n/LanguageContext'

export function Layout() {
  const location = useLocation()
  const { lang } = useLang()
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
