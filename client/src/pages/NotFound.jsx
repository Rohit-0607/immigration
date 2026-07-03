import { Link } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="bg-slate-50 min-h-[80vh] flex items-center justify-center py-20">
      <div className="container-custom text-center max-w-lg">
        <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <AlertCircle className="w-12 h-12" />
        </div>
        <h1 className="text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">404</h1>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Page Not Found</h2>
        <p className="text-slate-600 mb-8 text-lg">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="btn-primary py-3 px-8 text-lg">
          Return to Homepage
        </Link>
      </div>
    </div>
  )
}
