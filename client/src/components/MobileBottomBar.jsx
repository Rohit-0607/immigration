import { Link } from 'react-router-dom'
import { CalendarCheck, Search, Phone } from 'lucide-react'

export default function MobileBottomBar() {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 w-full z-40 flex border-t"
      style={{ background: 'var(--bg-dark)', borderColor: 'rgba(255,255,255,0.08)' }}
    >
      <Link
        to="/eligibility-checker"
        className="flex-1 py-3 px-2 flex flex-col items-center justify-center text-slate-400 hover:text-violet-400 transition-colors"
      >
        <Search className="w-5 h-5 mb-1" />
        <span className="text-[10px] font-bold uppercase tracking-wider">Eligibility</span>
      </Link>

      <Link
        to="/book-consultation"
        className="flex-1 py-2 px-2 flex flex-col items-center justify-center text-white rounded-none"
        style={{ background: 'var(--gradient)' }}
      >
        <CalendarCheck className="w-5 h-5 mb-1" />
        <span className="text-[10px] font-bold uppercase tracking-wider">Book Free</span>
      </Link>

      <a
        href="tel:+917495041916"
        className="flex-1 py-3 px-2 flex flex-col items-center justify-center text-slate-400 hover:text-violet-400 transition-colors"
      >
        <Phone className="w-5 h-5 mb-1" />
        <span className="text-[10px] font-bold uppercase tracking-wider">Call Us</span>
      </a>
    </div>
  )
}
