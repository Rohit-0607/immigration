import { useOutletContext, useNavigate } from 'react-router-dom'
import { LogOut, CheckCircle2, FileText, Clock, AlertCircle, FileDigit } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

const STATUS_STEPS = [
  "Submitted", 
  "Documents Under Review", 
  "Awaiting Decision", 
  "Approved"
]

export default function PortalDashboard() {
  const clientData = useOutletContext()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await fetch('/api/client/logout', { method: 'POST', credentials: 'include' })
      navigate('/portal/login')
    } catch(err) {
      console.error('Logout error', err)
    }
  }

  // Determine active step index
  let activeStepIndex = STATUS_STEPS.indexOf(clientData.caseStatus)
  const isAdditionalInfo = clientData.caseStatus === "Additional Info Required"
  
  if (isAdditionalInfo) {
    // If they need info, their progress is stuck at "Documents Under Review" visually
    activeStepIndex = 1 
  }

  return (
    <>
    <Helmet>
      <title>My Case Dashboard | Future Point Immigration</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Nav */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-700 flex items-center justify-center text-white font-bold text-lg">FP</div>
            <span className="font-bold text-slate-900 text-lg">Client Portal</span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Welcome Banner */}
        <div className="bg-primary-900 rounded-2xl p-8 md:p-12 text-white shadow-lg mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
            <FileDigit className="w-64 h-64" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {clientData.name.split(' ')[0]}!</h1>
          <p className="text-primary-200 text-lg">Track your application progress and updates below.</p>
        </div>

        {/* Status Stepper */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-primary-600" />
            Current Case Status
          </h2>
          
          {isAdditionalInfo && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8 flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-800 text-lg">Additional Information Required</h3>
                <p className="text-amber-700 mt-1">Your consultant needs more information or documents from you to proceed. Please check the latest update below and contact us.</p>
              </div>
            </div>
          )}

          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0 hidden md:block"></div>
            
            <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-0">
              {STATUS_STEPS.map((step, idx) => {
                const isCompleted = idx <= activeStepIndex
                const isCurrent = idx === activeStepIndex && !isAdditionalInfo
                
                return (
                  <div key={step} className="flex flex-row md:flex-col items-center gap-4 md:gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 transition-colors duration-300 ${
                      isCompleted 
                        ? 'bg-primary-600 border-white shadow-md text-white' 
                        : 'bg-slate-100 border-white text-slate-400'
                    } ${isCurrent ? 'ring-4 ring-primary-100' : ''}`}>
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <span>{idx + 1}</span>}
                    </div>
                    <div className="text-left md:text-center">
                      <span className={`block text-sm md:text-base font-bold ${
                        isCompleted ? 'text-slate-900' : 'text-slate-400'
                      }`}>
                        {step}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Latest Update Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 h-full">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6 text-primary-600" />
              Latest Update
            </h2>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 min-h-[150px]">
              {clientData.latestUpdate ? (
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{clientData.latestUpdate}</p>
              ) : (
                <p className="text-slate-400 italic">No updates have been posted yet. Your case is being processed.</p>
              )}
            </div>
          </div>

          {/* Documents Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 h-full">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary-600" />
              Documents on File
            </h2>
            
            {(!clientData.documents || clientData.documents.length === 0) ? (
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 text-center min-h-[150px] flex items-center justify-center">
                <p className="text-slate-400 italic">No documents are currently linked to your case.</p>
              </div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {clientData.documents.map((doc, idx) => (
                  <li key={idx} className="py-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{doc.filename}</p>
                      <p className="text-xs text-slate-500">Added on {new Date(doc.uploadDate).toLocaleDateString()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
    </>
  )
}
