import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import SuccessStories from './pages/SuccessStories'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import EligibilityChecker from './pages/EligibilityChecker'
import PointsCalculator from './pages/PointsCalculator'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import PrivacyPolicy from './pages/PrivacyPolicy'
import NotFound from './pages/NotFound'

// Client Portal
import PortalLogin from './pages/portal/PortalLogin'
import PortalDashboard from './pages/portal/PortalDashboard'
import PortalProtectedRoute from './components/PortalProtectedRoute'

// Admin
import AdminLayout from './layouts/AdminLayout'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import EligibilityLeads from './pages/admin/EligibilityLeads'
import PointsLeads from './pages/admin/PointsLeads'
import ClientManager from './pages/admin/ClientManager'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:serviceId" element={<ServiceDetail />} />
        <Route path="success-stories" element={<SuccessStories />} />

        <Route path="eligibility-checker" element={<EligibilityChecker />} />
        <Route path="points-calculator" element={<PointsCalculator />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Client Portal Routes */}
      <Route path="/portal/login" element={<PortalLogin />} />
      <Route path="/portal" element={<PortalProtectedRoute />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<PortalDashboard />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="consultations" element={<AdminDashboard />} />
          <Route path="leads" element={<EligibilityLeads />} />
          <Route path="points-leads" element={<PointsLeads />} />
          <Route path="clients" element={<ClientManager />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
