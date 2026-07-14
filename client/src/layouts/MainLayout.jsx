import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import MobileBottomBar from '../components/MobileBottomBar'

export default function MainLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow pt-[100px] pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileBottomBar />
    </div>
  )
}

