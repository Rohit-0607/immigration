import { useState, useEffect } from 'react'
import { Search, Info, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function EligibilityLeads() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedLead, setSelectedLead] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const res = await fetch('/api/leads', {
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
      setLeads(parsedData)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken')
      const res = await fetch(`/api/leads/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      })
      if (res.ok) {
        fetchLeads()
      }
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Contacted': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Qualified': return 'bg-green-100 text-green-800 border-green-200'
      case 'Unqualified': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-slate-100 text-slate-800 border-slate-200'
    }
  }

  if (loading) return <div>Loading leads...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900">Eligibility Checker Leads</h1>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100 font-bold text-slate-700">
          Total Leads: <span className="text-primary-600">{leads.length}</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Primary Goal</th>
                <th className="px-6 py-4">Target Country</th>
                <th className="px-6 py-4">Education</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500">No leads found.</td>
                </tr>
              ) : (
                leads.map((row) => (
                  <tr key={row._id || row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {row.createdAt.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {row.answers?.goal || 'N/A'}
                    </td>
                    <td className="px-6 py-4">{row.answers?.country || 'N/A'}</td>
                    <td className="px-6 py-4">{row.answers?.education || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <select 
                        value={row.status} 
                        onChange={(e) => handleStatusChange(row._id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusColor(row.status)} outline-none cursor-pointer appearance-none text-center`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Unqualified">Unqualified</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setSelectedLead(row)}
                        className="text-primary-600 hover:text-primary-800 flex items-center gap-1"
                      >
                        <Info className="w-4 h-4" /> Full Profile
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
      {selectedLead && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl relative">
            <button 
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold text-slate-900 mb-1">Lead Profile</h3>
            <p className="text-slate-500 text-sm mb-6">Submitted on {selectedLead.createdAt.toLocaleString()}</p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Goal</span>
                  <p className="text-sm font-medium">{selectedLead.answers?.goal}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Country</span>
                  <p className="text-sm font-medium">{selectedLead.answers?.country}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Education</span>
                  <p className="text-sm font-medium">{selectedLead.answers?.education}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Experience</span>
                  <p className="text-sm font-medium">{selectedLead.answers?.experience}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 col-span-2">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">English Proficiency</span>
                  <p className="text-sm font-medium">{selectedLead.answers?.english}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
