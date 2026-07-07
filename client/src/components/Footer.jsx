import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-slate-300 pt-16 pb-8 border-t-4 border-gold">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded bg-gold flex items-center justify-center text-primary-950 font-bold text-lg">
                FP
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                Future Point
              </span>
            </div>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Your trusted partner in global immigration. We provide expert guidance for study, work, and permanent residency visas to top destinations worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-gold hover:text-primary-950 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-gold hover:text-primary-950 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-gold hover:text-primary-950 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-gold hover:text-primary-950 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-gold after:rounded-full">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-sm hover:text-gold transition-colors">Our Services</Link></li>
              <li><Link to="/success-stories" className="text-sm hover:text-gold transition-colors">Success Stories</Link></li>
              <li><Link to="/blog" className="text-sm hover:text-gold transition-colors">Latest News & Blog</Link></li>
              <li><Link to="/eligibility-checker" className="text-sm hover:text-gold transition-colors">Eligibility Checker</Link></li>
              <li><Link to="/faq" className="text-sm hover:text-gold transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-gold after:rounded-full">
              Our Services
            </h3>
            <ul className="space-y-3">
              <li><Link to="/services/study-visa" className="text-sm hover:text-gold transition-colors">Study Visa</Link></li>
              <li><Link to="/services/work-visa" className="text-sm hover:text-gold transition-colors">Work Visa</Link></li>
              <li><Link to="/services/permanent-residency" className="text-sm hover:text-gold transition-colors">Permanent Residency</Link></li>
              <li><Link to="/services/visitor-visa" className="text-sm hover:text-gold transition-colors">Visitor Visa</Link></li>
              <li><Link to="/services/spouse-visa" className="text-sm hover:text-gold transition-colors">Spouse/Dependent Visa</Link></li>
              <li><Link to="/services/ielts-pte" className="text-sm hover:text-gold transition-colors">IELTS/PTE Coaching</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-gold after:rounded-full">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">
                  Near Bus Stand, Kaithal
                  Kaithal-136027<br />
                  Haryana<br />
                  India
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0 mt-1" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+917495041916" className="text-sm hover:text-gold transition-colors">+91 74950 41916</a>
                  <a href="tel:+918950987002" className="text-sm hover:text-gold transition-colors">+91 89509 87002</a>
                  <a href="tel:+918222000285" className="text-sm hover:text-gold transition-colors">+91 82220 00285</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <a href="mailto:futurepointconsultantcy@gmail.com" className="text-sm hover:text-gold transition-colors">futurepointconsultantcy@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p className="mb-4 max-w-4xl mx-auto leading-relaxed">
            <strong>Disclaimer:</strong> Future Point Immigration Consultancy provides guidance and assistance with visa applications. We do not guarantee visa approvals. Visa issuance is strictly subject to the rules, regulations, and final decisions of the respective government authorities and embassies.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Future Point Consultancy. All rights reserved.</p>
            <div className="hidden md:block w-1 h-1 bg-slate-700 rounded-full"></div>
            <Link to="/privacy-policy" className="hover:text-gold transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
