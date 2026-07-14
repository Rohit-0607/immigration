import { Helmet } from 'react-helmet-async'
import Cal from '@calcom/embed-react'
import { Sparkles, Clock, CheckCircle2 } from 'lucide-react'

export default function BookConsultation() {
  return (
    <>
      <Helmet>
        <title>Book a Consultation | Future Point Immigration</title>
        <meta name="description" content="Book a free consultation with our immigration experts to discuss your visa and PR options." />
        <meta property="og:title" content="Book a Consultation | Future Point Immigration" />
      </Helmet>

      {/* Hero */}
      <section className="page-hero-dark py-20">
        <div className="glow-orb w-80 h-80 -top-20 -left-20" style={{ background: 'rgba(124,58,237,0.2)' }} />
        <div className="glow-orb w-64 h-64 bottom-0 right-10" style={{ background: 'rgba(6,182,212,0.15)' }} />
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          <div className="pill-label-dark mx-auto w-fit mb-6">
            <Sparkles className="w-4 h-4" /> Free Consultation
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Book Your <span className="gradient-text">Consultation</span>
          </h1>
          <p className="text-slate-300 text-xl mb-8">
            Select a time that works for you. Our experts are ready to help you navigate your immigration journey.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-300">
            {[
              { icon: Clock, text: '15-min free call' },
              { icon: CheckCircle2, text: 'No obligation' },
              { icon: CheckCircle2, text: 'Expert advice' },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-1.5">
                <Icon className="w-4 h-4 text-violet-400" /> {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Cal embed */}
      <div className="bg-slate-50 py-16">
        <div className="container-custom max-w-5xl">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
            style={{ minHeight: '650px' }}>
            <Cal
              calLink="rohit-rai-g7py8l/15min"
              style={{ width: '100%', height: '100%', minHeight: '650px' }}
              config={{ layout: 'month_view', theme: 'light' }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
