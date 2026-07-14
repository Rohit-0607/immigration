import { useState, useEffect } from 'react'
import { Star, Sparkles, ArrowRight } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import ContactForm from '../components/ContactForm'

export default function SuccessStories() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/testimonials')
      .then(r => r.ok ? r.json() : [])
      .then(setTestimonials)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Helmet>
        <title>Success Stories | Future Point Immigration</title>
        <meta name="description" content="Read success stories and testimonials from our clients who achieved their immigration dreams with Future Point." />
        <meta property="og:title" content="Success Stories | Future Point Immigration" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero */}
      <section className="page-hero-dark py-24">
        <div className="glow-orb w-96 h-96 -top-20 -right-20" style={{ background: 'rgba(124,58,237,0.18)' }} />
        <div className="glow-orb w-72 h-72 bottom-0 left-0" style={{ background: 'rgba(6,182,212,0.12)' }} />
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          <div className="pill-label-dark mx-auto w-fit mb-6">
            <Star className="w-4 h-4" /> Client Reviews
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Success <span className="gradient-text">Stories</span>
          </h1>
          <p className="text-slate-300 text-xl">
            Real stories from individuals and families who achieved their global dreams with Future Point.
          </p>
        </div>
      </section>

      <div className="bg-slate-50 min-h-screen pb-20">
        <div className="container-custom py-16">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="shimmer rounded-2xl h-64" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {testimonials.map((t, idx) => (
                <div key={t._id}
                  className="bg-white rounded-2xl p-8 border border-slate-100 hover:border-violet-200 hover:shadow-xl transition-all duration-300 flex flex-col group">
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 italic leading-relaxed flex-grow mb-6 text-sm">"{t.text}"</p>
                  <div className="flex items-center gap-3 mt-auto pt-5 border-t border-slate-100">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0"
                      style={{ background: 'var(--gradient)' }}>
                      {t.initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>{t.name}</h4>
                      <span className="text-xs font-semibold" style={{ color: 'var(--clr-purple)' }}>{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden grid md:grid-cols-2 shadow-2xl">
            <div className="gradient-bg text-white p-10 md:p-12 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.3) 0%, transparent 60%)' }} />
              <div className="relative z-10">
                <Sparkles className="w-8 h-8 mb-4 opacity-80" />
                <h2 className="text-3xl font-black mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Want to be our next success story?
                </h2>
                <p className="text-white/80 mb-8 leading-relaxed">
                  Take the first step towards your international journey. Book a free consultation and let our experts map out your success.
                </p>
                <div className="flex -space-x-3 mb-3">
                  {['K', 'H', 'M', 'P'].map((l, i) => (
                    <div key={i} className="w-11 h-11 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white font-bold text-sm">
                      {l}
                    </div>
                  ))}
                  <div className="w-11 h-11 rounded-full bg-white/10 border-2 border-white/40 flex items-center justify-center text-white text-xs font-bold">
                    +10k
                  </div>
                </div>
                <span className="text-sm text-white/70 font-medium">Join thousands of successful applicants</span>
              </div>
            </div>
            <div className="bg-white p-8 md:p-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
