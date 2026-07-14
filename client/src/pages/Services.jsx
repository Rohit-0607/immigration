import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Globe, ShieldCheck, Users, GraduationCap, Building, Heart, Stamp, Sparkles } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

const iconMap = {
  'fa-graduation-cap': GraduationCap,
  'fa-passport': ShieldCheck,
  'fa-briefcase': Users,
  'fa-plane': Globe,
  'fa-building': Building,
  'fa-heart': Heart,
  'fa-stamp': Stamp,
}

const colorMap = ['#7C3AED', '#3B82F6', '#06B6D4', '#8B5CF6', '#F59E0B', '#10B981', '#EC4899']

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/services')
      .then(r => r.ok ? r.json() : [])
      .then(data => setServices(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Helmet>
        <title>Immigration Services | Future Point</title>
        <meta name="description" content="Explore our comprehensive immigration services including Study Visas, PR, and Work Permits." />
      </Helmet>

      {/* Hero */}
      <section className="page-hero-dark py-24">
        <div className="glow-orb w-96 h-96 -top-20 -right-20" style={{ background: 'rgba(59,130,246,0.18)' }} />
        <div className="glow-orb w-64 h-64 bottom-0 left-10" style={{ background: 'rgba(124,58,237,0.15)' }} />
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          <div className="pill-label-dark mx-auto w-fit mb-6">
            <Sparkles className="w-4 h-4" /> What We Offer
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-slate-300 text-xl">
            Comprehensive immigration solutions tailored to your profile. We guide you through every step of your international journey.
          </p>
        </div>
      </section>

      <div className="bg-slate-50 min-h-screen pb-20">
        <div className="container-custom -mt-10 relative z-10">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="shimmer rounded-2xl h-60" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, idx) => {
                const slug = service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                const IconComponent = iconMap[service.icon] || Globe
                const color = colorMap[idx % colorMap.length]
                return (
                  <div key={service._id}
                    className="bg-white rounded-2xl p-8 border border-slate-100 hover:border-transparent hover:shadow-2xl transition-all duration-300 group flex flex-col relative overflow-hidden">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl"
                      style={{ background: `radial-gradient(circle at top left, ${color}, transparent 70%)` }} />
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 shadow-md"
                      style={{ background: `linear-gradient(135deg, ${color}22, ${color}44)`, border: `1px solid ${color}33` }}>
                      <IconComponent className="w-7 h-7" style={{ color }} />
                    </div>
                    <h2 className="text-xl font-black text-slate-900 mb-3 flex-shrink-0" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      {service.title}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">{service.description}</p>
                    <Link to={`/services/${slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 mt-auto"
                      style={{ color }}>
                      Explore Pathway <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                )
              })}
            </div>
          )}

          {/* Checklist CTA */}
          <div className="mt-16 rounded-3xl p-10 text-center relative overflow-hidden" style={{ background: 'var(--bg-dark)' }}>
            <div className="glow-orb w-72 h-72 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ background: 'rgba(124,58,237,0.2)' }} />
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="pill-label-dark mx-auto w-fit mb-4">
                <Globe className="w-4 h-4" /> Document Tool
              </div>
              <h2 className="text-3xl font-black text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Not sure what documents you need?
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                Use our interactive Document Checklist tool to see exactly what paperwork is required for your visa and destination.
              </p>
              <Link to="/document-checklist" className="btn-gradient py-4 px-8">
                Try the Checklist Tool <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
