import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function Layout() {
  const location = useLocation()
  return (
    <>
      <Navbar />
      <main key={location.pathname} className="page-fade">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
