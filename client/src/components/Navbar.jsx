import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Success Stories', path: '/success-stories' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/90 backdrop-blur-md py-4'}`}>
      <div className="container-custom">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-primary-700 flex items-center justify-center text-white font-bold text-xl group-hover:bg-gold transition-colors">
              FP
            </div>
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              Future <span className="text-primary-700 group-hover:text-gold transition-colors">Point</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                    pathname === link.path ? 'text-primary-700' : 'text-slate-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <a href="tel:+1234567890" className="hidden lg:flex items-center gap-2 text-slate-600 hover:text-primary-600 font-medium text-sm">
                <Phone className="w-4 h-4" />
                +1 (234) 567-890
              </a>
              <Link to="/contact" className="btn-primary py-2 px-5 text-sm">
                Book Consultation
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/contact" className="btn-primary py-1.5 px-4 text-xs">
              Book
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-primary-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-slate-100 py-4 px-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`block text-base font-medium ${
                pathname === link.path ? 'text-primary-700' : 'text-slate-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a href="tel:+1234567890" className="flex items-center gap-2 text-slate-600 font-medium py-2">
            <Phone className="w-5 h-5" />
            +1 (234) 567-890
          </a>
          <Link to="/eligibility-checker" className="btn-outline w-full py-2">
            Check Eligibility
          </Link>
        </div>
      )}
    </nav>
  )
}
