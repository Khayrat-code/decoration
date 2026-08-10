import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Home } from './pages/Home'
import { Gallery } from './pages/Gallery'
import { About } from './pages/About'
import { HowWeWork } from './pages/HowWeWork'
import { Policies } from './pages/Policies'
import { Contact } from './pages/Contact'
import { Complaints } from './pages/Complaints'
import { AdminLogin } from './pages/AdminLogin'
import { AdminDashboard } from './pages/AdminDashboard'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-we-work" element={<HowWeWork />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
