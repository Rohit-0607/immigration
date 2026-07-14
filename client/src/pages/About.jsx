import { Users, Target, Shield, Award, ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | Future Point Immigration</title>
        <meta name="description" content="Learn about Future Point Immigration, a premier consultancy with 15+ years of experience helping clients achieve their global aspirations." />
        <meta property="og:title" content="About Us | Future Point Immigration" />
        <meta property="og:description" content="15+ years of experience in helping clients achieve their global aspirations." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero */}
      <section className="page-hero-dark py-24">
        <div className="glow-orb w-96 h-96 -top-20 -left-20" style={{ background: 'rgba(124,58,237,0.2)' }} />
        <div className="glow-orb w-72 h-72 bottom-0 right-0" style={{ background: 'rgba(6,182,212,0.15)' }} />
        <div className="container-custom relative z-10">
          <div className="pill-label-dark mb-6">
            <Sparkles className="w-4 h-4" /> About Us
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 max-w-3xl"
            style={{ fontFamily: 'Outfit, sans-serif' }}>
            About <span style={{ color: '#A78BFA' }}>Future Point</span>
          </h1>
          <p className="text-slate-300 text-xl leading-relaxed max-w-2xl">
            We are a premier immigration consultancy dedicated to turning your global aspirations into reality. With over 15 years of excellence, we navigate the complexities of international visa systems so you don't have to.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 rounded-3xl border border-violet-100 bg-violet-50/50 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ background: 'var(--gradient)' }} />
              <div className="icon-box mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Our Mission
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                To provide honest, transparent, and expert immigration guidance that empowers individuals and families to build successful futures across borders. We strive to simplify the immigration process and maximize our clients' chances of success.
              </p>
            </div>
            <div className="p-10 rounded-3xl border border-cyan-100 bg-cyan-50/30 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ background: 'linear-gradient(135deg,#06B6D4,#3B82F6)' }} />
              <div className="icon-box mb-6" style={{ background: '#1D4ED8' }}>
                <Users className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Our Vision
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                To be the world's most trusted immigration consultancy, recognized globally for ethical practices, client-first approach, and unparalleled success rate in connecting talent with global opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'var(--bg-dark)' }}>
        <div className="glow-orb w-96 h-96 top-0 right-0" style={{ background: 'rgba(59,130,246,0.12)' }} />
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="pill-label-dark mx-auto w-fit mb-4">
              <Award className="w-4 h-4" /> Our Values
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Core Values We <span style={{ color: '#A78BFA' }}>Live By</span>
            </h2>
            <p className="text-slate-400 text-lg">Our success is built on a foundation of uncompromised principles.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: 'Integrity', desc: 'We maintain absolute transparency. We only take cases we believe we can win, providing honest assessments from day one.', color: '#7C3AED' },
              { icon: Users, title: 'Client-Centric', desc: 'Your success is our success. Every strategy we develop is tailored uniquely to your profile and life goals.', color: '#3B82F6' },
              { icon: Award, title: 'Excellence', desc: 'We constantly study changing immigration laws to ensure our advice is accurate, compliant, and optimized for success.', color: '#06B6D4' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="glass-card p-8 rounded-2xl border border-white/[0.07] hover:border-violet-500/30 transition-all duration-300 text-center group">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${color}22`, border: `1.5px solid ${color}44` }}>
                  <Icon className="w-10 h-10" style={{ color }} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>{title}</h3>
                <p className="text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: '15+', label: 'Years Experience' },
              { num: '10K+', label: 'Happy Clients' },
              { num: '25+', label: 'Countries Served' },
              { num: '98%', label: 'Success Rate' },
            ].map(({ num, label }) => (
              <div key={label} className="text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-4xl font-black gradient-text mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>{num}</div>
                <div className="text-slate-500 text-sm font-medium uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white text-center">
        <div className="container-custom max-w-3xl">
          <div className="pill-label mx-auto w-fit mb-6"><Sparkles className="w-4 h-4" /> Free Consultation</div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Let's Build Your <span style={{ color: '#5B21B6' }}>Future Together</span>
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Our expert consultants are ready to evaluate your profile and guide you on the best immigration pathway.
          </p>
          <Link to="/contact" className="btn-primary py-4 px-10 text-lg">
            Speak to an Expert <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
