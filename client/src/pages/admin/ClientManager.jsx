import { useState, useEffect } from 'react'
import { Info, X, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ClientManager() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedClient, setSelectedClient] = useState(null)
  
  // New Client Form State
  const [showNewClientForm, setShowNewClientForm] = useState(false)
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newError, setNewError] = useState('')

  // Edit State
  const [editStatus, setEditStatus] = useState('')
  const [editUpdate, setEditUpdate] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      const res = await fetch('/api/admin/clients', {
        credentials: 'include'
      })
      if (res.status === 401) {
        navigate('/admin/login')
        return
      }
      const data = await res.json()
      setClients(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateClient = async (e) => {
    e.preventDefault()
    setNewError('')
    try {
      const res = await fetch('/api/admin/clients', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: newName, 
          email: newEmail, 
          password: newPassword,
          caseStatus: "Submitted",
          latestUpdate: "Welcome to the Future Point Client Portal!"
        })
      })
      const data = await res.json()
      if (res.ok) {
        setShowNewClientForm(false)
        setNewName('')
        setNewEmail('')
        setNewPassword('')
        fetchClients()
      } else {
        setNewError(data.error || 'Failed to create client')
      }
    } catch (error) {
      setNewError('Network error')
    }
  }

  const handleUpdateClient = async (e) => {
    e.preventDefault()
    if (!selectedClient) return

    try {
      const res = await fetch(`/api/admin/clients/${selectedClient._id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          caseStatus: editStatus,
          latestUpdate: editUpdate
        })
      })
      if (res.ok) {
        setSelectedClient(null)
        fetchClients()
      }
    } catch (error) {
      console.error("Error updating client:", error)
    }
  }

  const openEditModal = (client) => {
    setSelectedClient(client)
    setEditStatus(client.caseStatus)
    setEditUpdate(client.latestUpdate)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Submitted': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Documents Under Review': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Awaiting Decision': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Approved': return 'bg-green-100 text-green-800 border-green-200'
      case 'Additional Info Required': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-slate-100 text-slate-800 border-slate-200'
    }
  }

  if (loading) return <div>Loading clients...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900">Client Management</h1>
        <button 
          onClick={() => setShowNewClientForm(true)}
          className="btn-primary py-2 px-4 flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" /> New Client Account
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Client Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Case Status</th>
                <th className="px-6 py-4">Created Date</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clients.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">No active clients found.</td>
                </tr>
              ) : (
                clients.map((row) => (
                  <tr key={row._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {row.name}
                    </td>
                    <td className="px-6 py-4">{row.email}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusColor(row.caseStatus)}`}>
                        {row.caseStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(row.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => openEditModal(row)}
                        className="text-primary-600 hover:text-primary-800 flex items-center gap-1 font-medium"
                      >
                        Update Case
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Client Modal */}
      {showNewClientForm && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative">
            <button 
              onClick={() => setShowNewClientForm(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold text-slate-900 mb-6">Create New Client Account</h3>
            
            <form onSubmit={handleCreateClient} className="space-y-4">
              {newError && <div className="text-red-600 text-sm font-medium bg-red-50 p-2 rounded">{newError}</div>}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                <input required type="text" value={newName} onChange={e=>setNewName(e.target.value)} className="w-full border rounded-lg p-2 bg-slate-50 focus:bg-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
                <input required type="email" value={newEmail} onChange={e=>setNewEmail(e.target.value)} className="w-full border rounded-lg p-2 bg-slate-50 focus:bg-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Temporary Password</label>
                <input required type="text" value={newPassword} onChange={e=>setNewPassword(e.target.value)} className="w-full border rounded-lg p-2 bg-slate-50 focus:bg-white" />
                <p className="text-xs text-slate-500 mt-1">Provide this password securely to the client.</p>
              </div>
              
              <div className="mt-8 flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setShowNewClientForm(false)} className="btn-outline px-4 py-2 text-sm">Cancel</button>
                <button type="submit" className="btn-primary px-4 py-2 text-sm">Create Account</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Client Modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl relative">
            <button 
              onClick={() => setSelectedClient(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold text-slate-900 mb-1">Update Case for {selectedClient.name}</h3>
            <p className="text-slate-500 text-sm mb-6">{selectedClient.email}</p>
            
            <form onSubmit={handleUpdateClient} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Case Status</label>
                <select 
                  value={editStatus} 
                  onChange={e=>setEditStatus(e.target.value)} 
                  className="w-full border rounded-lg p-3 bg-slate-50 focus:bg-white font-medium"
                >
                  <option value="Submitted">Submitted</option>
                  <option value="Documents Under Review">Documents Under Review</option>
                  <option value="Additional Info Required">Additional Info Required</option>
                  <option value="Awaiting Decision">Awaiting Decision</option>
                  <option value="Approved">Approved</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Latest Update (Visible to Client)</label>
                <textarea 
                  value={editUpdate} 
                  onChange={e=>setEditUpdate(e.target.value)} 
                  className="w-full border rounded-lg p-3 bg-slate-50 focus:bg-white min-h-[100px]"
                  placeholder="E.g. We have received your transcripts and are currently reviewing them."
                />
              </div>
              
              <div className="mt-8 flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setSelectedClient(null)} className="btn-outline px-4 py-2 text-sm">Cancel</button>
                <button type="submit" className="btn-primary px-4 py-2 text-sm">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
