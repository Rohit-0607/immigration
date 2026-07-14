import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, ChevronDown, Globe, Sparkles } from 'lucide-react'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  {
    name: 'Services', path: '/services',
    children: [
      { name: 'Study Visa', path: '/services/study-visa' },
      { name: 'Permanent Residency', path: '/services/permanent-residency' },
      { name: 'Work Visa', path: '/services/work-visa' },
      { name: 'Visitor Visa', path: '/services/visitor-visa' },
      { name: 'Spouse/Dependent Visa', path: '/services/spouse-visa' },
      { name: 'IELTS/PTE Coaching', path: '/services/ielts-pte' },
    ]
  },
  { name: 'Success Stories', path: '/success-stories' },
  { name: 'Blog', path: '/blog' },
  {
    name: 'Tools', path: '#',
    children: [
      { name: 'Points Calculator', path: '/points-calculator' },
      { name: 'Eligibility Checker', path: '/eligibility-checker' },
      { name: 'Document Checklist', path: '/document-checklist' },
    ]
  },
  { name: 'FAQ', path: '/faq' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [showBar, setShowBar] = useState(true)
  const { pathname } = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
      if (window.scrollY > 80) setShowBar(false)
      else setShowBar(true)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setIsOpen(false); setOpenDropdown(null) }, [pathname])

  return (
    <>
      {/* ── Announcement Bar ── */}
      <div
        className="fixed top-0 left-0 w-full z-50 transition-all duration-500 overflow-hidden"
        style={{ height: showBar ? '40px' : '0px', opacity: showBar ? 1 : 0 }}
      >
        <div className="h-full flex items-center justify-center gap-6 text-white text-sm font-medium px-4" style={{ backgroundColor: '#5B21B6' }}>
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" />
            <a href="tel:+917495041916" className="hover:underline">+91 74950 41916</a>
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" />
            <a href="tel:+918950987002" className="hover:underline">+91 89509 87002</a>
          </span>
          <span className="hidden md:flex items-center gap-1.5 text-yellow-200">
            <Sparkles className="w-3.5 h-3.5" />
            Free Consultation — Book Today!
          </span>
          <a
            href="https://wa.me/917495041916"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 px-3 py-0.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors text-xs font-semibold"
          >
            WhatsApp Us
          </a>
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <nav
        className="fixed left-0 w-full z-40 transition-all duration-300"
        style={{ top: showBar ? '40px' : '0px' }}
      >
        <div
          className={`transition-all duration-300 ${isScrolled ? 'shadow-lg py-3' : 'py-4'}`}
          style={{ backgroundColor: '#0F172A', borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.08)' : 'none' }}
        >
          <div className="container-custom">
            <div className="flex justify-between items-center">

              {/* Logo */}
              <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'var(--gradient)' }}
                >
                  FP
                </div>
                <div>
                  <span className="text-xl font-black text-white tracking-tight leading-none block"
                    style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Future <span className="gradient-text">Point</span>
                  </span>
                  <span className="text-[10px] text-slate-400 leading-none">Immigration Consultants</span>
                </div>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => link.children && setOpenDropdown(link.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        pathname === link.path
                          ? 'text-violet-400 bg-violet-500/10'
                          : 'text-slate-300 hover:text-white hover:bg-white/[0.07]'
                      }`}
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      {link.name}
                      {link.children && <ChevronDown className="w-3.5 h-3.5 opacity-70" />}
                    </Link>

                    {/* Dropdown */}
                    {link.children && openDropdown === link.name && (
                      <div className="absolute top-full left-0 mt-1 w-56 glass-card border border-white/10 shadow-2xl shadow-black/40 py-1.5 animate-slide-down">
                        {link.children.map(child => (
                          <Link
                            key={child.name}
                            to={child.path}
                            className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-violet-500/15 transition-colors"
                            style={{ fontFamily: 'Outfit, sans-serif' }}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA + Mobile toggle */}
              <div className="flex items-center gap-3">
                <Link
                  to="/book-consultation"
                  className="hidden md:flex btn-gradient py-2.5 px-5 text-sm"
                >
                  Book Free Consultation
                </Link>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center text-white transition-colors hover:bg-white/10"
                  aria-label="Toggle menu"
                >
                  {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="lg:hidden bg-[#0A0A25]/98 backdrop-blur-xl border-t border-white/[0.07] animate-slide-down max-h-[85vh] overflow-y-auto">
            <div className="container-custom py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    to={link.path}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      pathname === link.path
                        ? 'text-violet-400 bg-violet-500/10'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                    }`}
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {link.name}
                  </Link>
                  {link.children && (
                    <div className="ml-4 mt-0.5 space-y-0.5 border-l border-white/10 pl-3">
                      {link.children.map(child => (
                        <Link
                          key={child.name}
                          to={child.path}
                          className="block px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-violet-300 transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <Link to="/book-consultation" className="btn-gradient w-full justify-center py-3">
                  Book Free Consultation
                </Link>
                <a
                  href="https://wa.me/917495041916"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glass w-full justify-center py-3"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
