import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, UserCheck, LogOut, Calculator, FolderLock, FileText, PieChart } from 'lucide-react'

export default function AdminLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    } catch(err) {
      console.error('Logout error', err)
    }
    navigate('/admin/login')
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Analytics', path: '/admin/analytics', icon: PieChart },
    { name: 'Consultations', path: '/admin/consultations', icon: Users },
    { name: 'Eligibility Leads', path: '/admin/leads', icon: UserCheck },
    { name: 'Points Leads', path: '/admin/points-leads', icon: Calculator },
    { name: 'Checklist Leads', path: '/admin/checklist-leads', icon: FolderLock },
    { name: 'Client Management', path: '/admin/clients', icon: FolderLock },
    { name: 'Blog', path: '/admin/blog', icon: FileText },
  ]

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-primary-950 text-white flex flex-col">
        <div className="p-6 border-b border-primary-900">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded bg-gold flex items-center justify-center text-primary-950 font-bold">FP</div>
            <span className="text-xl font-bold tracking-tight">Admin Panel</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path || (item.path === '/admin/dashboard' && pathname === '/admin')
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive ? 'bg-primary-800 text-white font-medium' : 'text-primary-300 hover:bg-primary-900 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-primary-900">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-primary-300 hover:bg-red-900/50 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-50 p-8">
        <Outlet />
      </main>
    </div>
  )
}
