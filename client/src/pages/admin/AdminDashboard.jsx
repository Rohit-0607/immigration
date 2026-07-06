import { useState, useEffect } from 'react'
import { Search, Filter, MessageSquare, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const [consultations, setConsultations] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedConsultation, setSelectedConsultation] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    fetchConsultations()
  }, [])

  const fetchConsultations = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const res = await fetch('/api/consultations', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.status === 401) {
        localStorage.removeItem('adminToken')
        navigate('/admin/login')
        return
      }
      const data = await res.json()
      const parsedData = data.map(item => ({
        ...item,
        createdAt: new Date(item.createdAt)
      }))
      setConsultations(parsedData)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (type, id, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken')
      const res = await fetch(`/api/consultations/${type}/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      })
      if (res.ok) {
        fetchConsultations()
      }
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  // Calculate stats
  const total = consultations.length
  const newCount = consultations.filter(c => c.status === 'New').length
  
  // Filter and search
  const filteredData = consultations.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.phone.includes(searchTerm)
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Contacted': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Converted': return 'bg-green-100 text-green-800 border-green-200'
      case 'Not Interested': return 'bg-slate-100 text-slate-800 border-slate-200'
      default: return 'bg-slate-100 text-slate-800 border-slate-200'
    }
  }

  if (loading) return <div>Loading dashboard...</div>

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Consultations Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 font-medium mb-1">Total Consultations</h3>
          <p className="text-3xl font-bold text-slate-900">{total}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 font-medium mb-1">New (Unread)</h3>
          <p className="text-3xl font-bold text-blue-600">{newCount}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 font-medium mb-1">Conversion Rate</h3>
          <p className="text-3xl font-bold text-green-600">
            {total ? Math.round((consultations.filter(c => c.status === 'Converted').length / total) * 100) : 0}%
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name or phone..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-slate-400" />
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Converted">Converted</option>
            <option value="Not Interested">Not Interested</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500">No consultations found.</td>
                </tr>
              ) : (
                filteredData.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {row.createdAt.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">{row.name}</td>
                    <td className="px-6 py-4">
                      <div>{row.phone}</div>
                      <div className="text-xs text-slate-400">{row.email}</div>
                    </td>
                    <td className="px-6 py-4">{row.service || row.serviceInterested || 'General Inquiry'}</td>
                    <td className="px-6 py-4">
                      <select 
                        value={row.status} 
                        onChange={(e) => handleStatusChange(row.type, row._id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusColor(row.status)} outline-none cursor-pointer appearance-none text-center`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Converted">Converted</option>
                        <option value="Not Interested">Not Interested</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setSelectedConsultation(row)}
                        className="text-primary-600 hover:text-primary-800 flex items-center gap-1"
                      >
                        <MessageSquare className="w-4 h-4" /> View Msg
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedConsultation && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl relative">
            <button 
              onClick={() => setSelectedConsultation(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold text-slate-900 mb-1">{selectedConsultation.name}</h3>
            <p className="text-slate-500 text-sm mb-6">{selectedConsultation.createdAt.toLocaleString()}</p>
            
            <div className="space-y-4">
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase">Contact Info</span>
                <p>{selectedConsultation.phone} | {selectedConsultation.email}</p>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase">Service Interested</span>
                <p>{selectedConsultation.service || selectedConsultation.serviceInterested || 'General Inquiry'}</p>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase">Message</span>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-wrap mt-1 text-slate-700">
                  {selectedConsultation.message || "No message provided."}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
