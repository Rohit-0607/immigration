import { useState, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function PortalProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [clientData, setClientData] = useState(null)

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await fetch('/api/client/me', {
          credentials: 'include' // Important: send httpOnly cookies
        })
        if (res.ok) {
          const data = await res.json()
          setClientData(data)
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      } catch (err) {
        console.error('Auth verification failed', err)
        setIsAuthenticated(false)
      }
    }
    
    verifyAuth()
  }, [])

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return isAuthenticated ? <Outlet context={clientData} /> : <Navigate to="/portal/login" replace />
}
