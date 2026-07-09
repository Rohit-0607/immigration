import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Globe, ShieldCheck, Users, GraduationCap, Building, Heart, Stamp } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

// Hardcoded fallback or use API - the prompt asked for React router multi-page structure.
// I will fetch from API for realism, as I've built the backend.
export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  // Map string icon names to Lucide components for fallback if DB holds FontAwesome classes
  const iconMap = {
    'fa-graduation-cap': GraduationCap,
    'fa-passport': ShieldCheck,
    'fa-briefcase': Users,
    'fa-plane': Globe,
    'fa-building': Building,
    'fa-heart': Heart,
    'fa-stamp': Stamp,
  }

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services')
        if (res.ok) {
          const data = await res.json()
          setServices(data)
        }
      } catch (err) {
        console.error('Error fetching services:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  return (
    <>
    <Helmet>
      <title>Immigration Services | Future Point</title>
      <meta name="description" content="Explore our comprehensive immigration services including Study Visas, PR, and Work Permits." />
    </Helmet>
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-primary-950 text-white py-16 md:py-24">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-primary-200">
            Comprehensive immigration solutions tailored to your profile. We guide you through every step of your international journey.
          </p>
        </div>
      </div>

      <div className="container-custom -mt-10 relative z-10">
        {loading ? (
          <div className="flex justify-center items-center h-64 bg-white rounded-2xl shadow-sm border border-slate-100">
            <i className="lucide-loader animate-spin w-12 h-12 text-primary-600 border-4 border-primary-100 border-t-primary-600 rounded-full" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              // Extract slug from title for routing (e.g., "Study Visa" -> "study-visa")
              const slug = service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
              const IconComponent = iconMap[service.icon] || Globe

              return (
                <div key={service._id} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100 flex flex-col h-full">
                  <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h2>
                  <p className="text-slate-600 mb-8 flex-grow">{service.description}</p>
                  
                  <Link 
                    to={`/services/${slug}`} 
                    className="inline-flex items-center text-primary-700 font-semibold hover:text-primary-800 mt-auto group-hover:underline"
                  >
                    Explore Pathway <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2" />
                  </Link>
                </div>
              )
            })}
          </div>
        )}

        {/* Document Checklist CTA */}
        <div className="mt-16 bg-primary-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-xl border border-primary-800">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Not sure what documents you need?</h2>
            <p className="text-primary-200 text-lg mb-8">
              Use our interactive Document Checklist tool to see exactly what paperwork is required for your specific visa and destination country.
            </p>
            <Link 
              to="/document-checklist" 
              className="inline-block bg-gold hover:bg-yellow-500 text-primary-950 font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Try the Checklist Tool
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
