import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, ArrowRight, Globe } from 'lucide-react'

const PURPLE = '#5B21B6'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ backgroundColor: '#0F172A', borderTop: '1px solid rgba(255,255,255,0.07)' }}>

      {/* ── CTA Band — solid purple ── */}
      <div className="py-16 relative overflow-hidden" style={{ backgroundColor: PURPLE }}>
        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px,transparent 1px), linear-gradient(90deg,rgba(0,0,0,1) 1px,transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
        <div className="container-custom relative z-10 text-center">
          <div className="pill-label-dark mx-auto w-fit mb-4">
            <Globe className="w-4 h-4" /> Start Your Journey
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4"
            style={{ fontFamily: 'Outfit, sans-serif' }}>
            Ready to Build Your Global Future?
          </h2>
          <p className="text-purple-200 text-lg mb-8 max-w-xl mx-auto">
            Book a free consultation with our experts and discover the best immigration pathway for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/book-consultation"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 font-black text-purple-900 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
              style={{ backgroundColor: 'white', fontFamily: 'Outfit, sans-serif' }}
            >
              Book Free Consultation
            </Link>
            <a href="https://wa.me/917495041916" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 font-black text-white rounded-xl border-2 border-white/40 hover:bg-white/10 transition-all duration-200"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              WhatsApp Us <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg"
                style={{ backgroundColor: PURPLE }}>FP</div>
              <span className="text-xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Future <span style={{ color: '#A78BFA' }}>Point</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Your trusted partner in global immigration. Expert guidance for study, work, and permanent residency visas worldwide.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Twitter, href: '#', label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 transition-all duration-200 hover:text-white hover:scale-110"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = PURPLE}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-black text-base mb-5 flex items-center gap-2"
              style={{ fontFamily: 'Outfit, sans-serif' }}>
              <span className="w-5 h-0.5 rounded-full inline-block" style={{ backgroundColor: PURPLE }} />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Our Services', path: '/services' },
                { label: 'Success Stories', path: '/success-stories' },
                { label: 'Blog & News', path: '/blog' },
                { label: 'Eligibility Checker', path: '/eligibility-checker' },
                { label: 'FAQs', path: '/faq' },
                { label: 'Contact Us', path: '/contact' },
              ].map(({ label, path }) => (
                <li key={label}>
                  <Link to={path}
                    className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-200" style={{ color: '#A78BFA' }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-black text-base mb-5 flex items-center gap-2"
              style={{ fontFamily: 'Outfit, sans-serif' }}>
              <span className="w-5 h-0.5 rounded-full inline-block" style={{ backgroundColor: PURPLE }} />
              Our Services
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Study Visa', path: '/services/study-visa' },
                { label: 'Work Visa', path: '/services/work-visa' },
                { label: 'Permanent Residency', path: '/services/permanent-residency' },
                { label: 'Visitor Visa', path: '/services/visitor-visa' },
                { label: 'Spouse/Dependent Visa', path: '/services/spouse-visa' },
                { label: 'IELTS/PTE Coaching', path: '/services/ielts-pte' },
              ].map(({ label, path }) => (
                <li key={label}>
                  <Link to={path}
                    className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-200" style={{ color: '#A78BFA' }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-black text-base mb-5 flex items-center gap-2"
              style={{ fontFamily: 'Outfit, sans-serif' }}>
              <span className="w-5 h-0.5 rounded-full inline-block" style={{ backgroundColor: PURPLE }} />
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mt-0.5 flex-shrink-0"
                  style={{ backgroundColor: PURPLE }}>
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-slate-400 leading-relaxed">
                  Near Bus Stand, Kaithal<br />Kaithal-136027, Haryana, India
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mt-0.5 flex-shrink-0"
                  style={{ backgroundColor: PURPLE }}>
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col gap-1">
                  {['+91 74950 41916', '+91 89509 87002', '+91 82220 00285'].map(n => (
                    <a key={n} href={`tel:${n.replace(/\s/g, '')}`}
                      className="text-sm text-slate-400 hover:text-white transition-colors">{n}</a>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: PURPLE }}>
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <a href="mailto:futurepointconsultantcy@gmail.com"
                  className="text-sm text-slate-400 hover:text-white transition-colors break-all">
                  futurepointconsultantcy@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t space-y-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <p className="text-xs text-slate-500 max-w-4xl mx-auto text-center leading-relaxed">
            <span className="text-slate-400 font-semibold">Disclaimer:</span> Future Point Immigration Consultancy provides guidance and assistance with visa applications. We do not guarantee visa approvals. Visa issuance is strictly subject to the rules, regulations, and final decisions of the respective government authorities and embassies.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-xs text-slate-500">
            <p>&copy; {year} Future Point Consultancy. All rights reserved.</p>
            <div className="hidden md:block w-1 h-1 rounded-full bg-slate-700" />
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
