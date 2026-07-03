import { Link } from 'react-router-dom'
import { CalendarCheck, Search } from 'lucide-react'

export default function MobileBottomBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40 flex divide-x divide-slate-100 border-t border-slate-200">
      <Link 
        to="/eligibility-checker" 
        className="flex-1 py-3 px-2 flex flex-col items-center justify-center text-primary-700 hover:bg-slate-50 transition-colors"
      >
        <Search className="w-5 h-5 mb-1" />
        <span className="text-[10px] font-semibold uppercase tracking-wider">Eligibility</span>
      </Link>
      <Link 
        to="/contact" 
        className="flex-1 py-3 px-2 flex flex-col items-center justify-center bg-gold text-primary-950 hover:bg-gold-dark transition-colors"
      >
        <CalendarCheck className="w-5 h-5 mb-1" />
        <span className="text-[10px] font-semibold uppercase tracking-wider">Book Consult</span>
      </Link>
    </div>
  )
}
