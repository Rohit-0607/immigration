import { Link } from 'react-router-dom'
import { Globe, GraduationCap, Users, ShieldCheck, ChevronRight, Star, ArrowRight, Sparkles, CheckCircle2, Building2, Plane } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useEffect, useRef, useState } from 'react'
import ContactForm from '../components/ContactForm'

// ── Animated Counter ──────────────────────────────────────────
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        let start = 0
        const step = Math.ceil(target / (1800 / 16))
        const timer = setInterval(() => {
          start = Math.min(start + step, target)
          setCount(start)
          if (start >= target) clearInterval(timer)
        }, 16)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

// ── Service colours (solid, distinct) ─────────────────────────
const SOLID_PURPLE = '#5B21B6'
const SOLID_BLUE   = '#1D4ED8'
const SOLID_TEAL   = '#0F766E'
const SOLID_INDIGO = '#4338CA'
const SOLID_AMBER  = '#B45309'
const SOLID_GREEN  = '#15803D'

const services = [
  { title: 'Study Visa',          icon: GraduationCap, desc: 'Get admitted to top universities globally with end-to-end admission and visa support.',           link: '/services/study-visa',          color: SOLID_PURPLE, bg: '#F5F3FF' },
  { title: 'Permanent Residency', icon: ShieldCheck,   desc: 'Navigate Express Entry, PNP, and skilled migration pathways seamlessly with expert guidance.',   link: '/services/permanent-residency', color: SOLID_BLUE,   bg: '#EFF6FF' },
  { title: 'Work Visa',           icon: Users,         desc: 'Unlock global career opportunities with employer-sponsored and independent work visas.',           link: '/services/work-visa',           color: SOLID_TEAL,   bg: '#F0FDFA' },
  { title: 'Visitor Visa',        icon: Plane,         desc: 'Travel the world hassle-free with our expert visitor visa documentation support.',                link: '/services/visitor-visa',        color: SOLID_INDIGO, bg: '#EEF2FF' },
  { title: 'Spouse Visa',         icon: Building2,     desc: 'Reunite with your loved ones abroad through dependent and spouse visa pathways.',                 link: '/services/spouse-visa',         color: SOLID_AMBER,  bg: '#FFFBEB' },
  { title: 'IELTS/PTE Coaching',  icon: Globe,         desc: 'Score high with our expert trainers to meet language requirements for top destinations.',          link: '/services/ielts-pte',           color: SOLID_GREEN,  bg: '#F0FDF4' },
]

const reviews = [
  { name: 'Kavita Narang',   dest: 'Canada PR',             rating: 5, text: "Future Point's team is exceptional. They guided me through Express Entry with transparency and dedication." },
  { name: 'Himank Garg',     dest: 'UK Study Visa',         rating: 5, text: "From university selection to visa interview prep, they handled everything perfectly. Now pursuing my Masters in London!" },
  { name: 'Madhu Sachdeva',  dest: 'Australia Subclass 189',rating: 5, text: "Their knowledge of the points system is unmatched. They boosted my CRS score in ways I wouldn't have known." },
  { name: 'Priya Sharma',    dest: 'Canada Work Permit',    rating: 5, text: "Fast, professional, and incredibly knowledgeable. Got my work permit approved in record time!" },
  { name: 'Rahul Verma',     dest: 'Australia PR',          rating: 5, text: "Best decision to trust Future Point. Their expertise made the entire process stress-free and successful." },
]

const stats = [
  { target: 15,    suffix: '+', label: 'Years Experience' },
  { target: 10000, suffix: '+', label: 'Visas Approved'  },
  { target: 25,    suffix: '+', label: 'Countries Served' },
  { target: 98,    suffix: '%', label: 'Success Rate'     },
]

const WHY_FEATURES = [
  { icon: '🛡️', title: 'Integrity First',   desc: 'Transparent, honest advice from day one. No false promises.' },
  { icon: '🏆', title: '98% Success Rate',  desc: 'One of the highest visa approval rates in the industry.' },
  { icon: '⚡', title: 'Fast Processing',   desc: 'Streamlined processes to get your applications filed quickly.' },
  { icon: '🌍', title: 'Global Expertise',  desc: '25+ countries with deep knowledge of local immigration laws.' },
  { icon: '📞', title: '24/7 Support',      desc: 'Always available to answer your questions and concerns.' },
  { icon: '💰', title: 'No Hidden Fees',    desc: 'Clear, upfront pricing with no surprise charges.' },
]

export default function Home() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Future Point Immigration Consultants",
    "url": "https://futurepoint.com",
    "logo": "https://futurepoint.com/logo.png",
    "contactPoint": { "@type": "ContactPoint", "telephone": "+91-89509-87002", "contactType": "customer service" }
  }

  return (
    <>
      <Helmet>
        <title>Future Point Immigration | Your Global Journey Starts Here</title>
        <meta name="description" content="Expert guidance for Study Visas, Permanent Residency, and Work Permits to Canada, Australia, UK, USA, and beyond." />
        <meta property="og:title" content="Future Point Immigration Consultants" />
        <meta property="og:description" content="Expert guidance for Study Visas, Permanent Residency, and Work Permits." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
      </Helmet>

      {/* ══════════════════════════════════════════
          HERO  — solid dark slate bg
      ══════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden -mt-[100px] pt-[100px]"
        style={{ backgroundColor: '#0F172A' }}
      >
        {/* Subtle solid-colour orbs (no animation) */}
        <div className="glow-orb w-[500px] h-[500px] -top-32 -left-32"
          style={{ backgroundColor: '#5B21B6' }} />
        <div className="glow-orb w-[380px] h-[380px] bottom-0 right-0"
          style={{ backgroundColor: '#1D4ED8', opacity: 0.3 }} />

        <div className="container-custom relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left content */}
            <div className="max-w-2xl animate-fade-up">
              <div className="pill-label-dark mb-6">
                <Sparkles className="w-4 h-4" /> Trusted Since 2010
              </div>

              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.05]"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Your Global<br />
                Journey{' '}
                <span style={{ color: '#A78BFA' }}>Starts Here.</span>
              </h1>

              <p className="text-slate-300 text-lg md:text-xl mb-10 leading-relaxed max-w-lg">
                Expert guidance for Study Visas, Permanent Residency, and Work Permits to
                Canada, Australia, UK, USA, and beyond.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/book-consultation" className="btn-gradient py-4 text-base">
                  <Sparkles className="w-4 h-4" /> Book Free Consultation
                </Link>
                <Link to="/eligibility-checker" className="btn-glass py-4 text-base">
                  Check Your Eligibility <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {['No Hidden Fees', '15+ Years Experience', '98% Success Rate', 'RCIC Certified'].map(t => (
                  <span key={t} className="flex items-center gap-1.5 text-sm text-slate-400">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#A78BFA' }} /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — contact form on dark card */}
            <div className="hidden lg:block">
              <div
                className="rounded-2xl p-[1px] shadow-2xl"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
              >
                <div className="rounded-2xl overflow-hidden">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div
            className="mt-20 pt-10 border-t grid grid-cols-2 md:grid-cols-4 gap-8"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <div
                  className="text-4xl md:text-5xl font-black mb-1"
                  style={{ fontFamily: 'Outfit, sans-serif', color: '#A78BFA' }}
                >
                  <Counter target={s.target} suffix={s.suffix} />
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DESTINATIONS TICKER
      ══════════════════════════════════════════ */}
      <section
        className="py-5 overflow-hidden border-y"
        style={{ backgroundColor: '#1E1B4B', borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="marquee-track gap-10">
          {[...Array(2)].map((_, di) =>
            ['🇨🇦 Canada','🇦🇺 Australia','🇬🇧 United Kingdom','🇺🇸 United States','🇩🇪 Germany','🇳🇿 New Zealand','🇮🇪 Ireland','🇸🇬 Singapore','🇳🇱 Netherlands'].map((item, i) => (
              <span key={`${di}-${i}`} className="flex items-center gap-2 px-6 text-slate-400 text-sm font-semibold whitespace-nowrap">
                <span className="text-xl">{item.split(' ')[0]}</span>
                <span>{item.split(' ').slice(1).join(' ')}</span>
                <span className="w-1.5 h-1.5 rounded-full ml-4" style={{ backgroundColor: '#5B21B6' }} />
              </span>
            ))
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES  — white bg
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="pill-label mx-auto w-fit mb-4">
              <Globe className="w-4 h-4" /> Our Services
            </div>
            <h2
              className="text-4xl md:text-5xl font-black text-slate-900 mb-4"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Comprehensive Immigration{' '}
              <span style={{ color: '#5B21B6' }}>Solutions</span>
            </h2>
            <p className="text-slate-500 text-lg">
              From student visas to permanent residency — we cover every pathway to your global aspirations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, idx) => (
              <Link
                key={idx}
                to={svc.link}
                className="group rounded-2xl p-8 border border-slate-100 hover:shadow-2xl transition-all duration-300 flex flex-col"
                style={{ backgroundColor: svc.bg }}
              >
                {/* Icon box — solid brand colour */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: svc.color }}
                >
                  <svc.icon className="w-7 h-7 text-white" />
                </div>

                <h3
                  className="text-xl font-black text-slate-900 mb-3"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  {svc.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">{svc.desc}</p>

                <span
                  className="inline-flex items-center gap-1.5 text-sm font-bold transition-all duration-200"
                  style={{ color: svc.color }}
                >
                  Learn More{' '}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services" className="btn-primary py-3.5 px-8">
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY CHOOSE US  — deep indigo bg
      ══════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#1E1B4B' }}>
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left text */}
            <div>
              <div className="pill-label-dark mb-4">
                <Sparkles className="w-4 h-4" /> Why Choose Us
              </div>
              <h2
                className="text-4xl md:text-5xl font-black text-white mb-6"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Why People Choose{' '}
                <span style={{ color: '#A78BFA' }}>Future Point?</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                We bring each client the best service with a commitment to excellence and measurable results.
              </p>
              <Link to="/about" className="btn-gradient py-3.5 px-8">
                Learn About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right feature grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {WHY_FEATURES.map((f, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl border hover:border-purple-700 transition-all duration-200 cursor-default"
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.08)' }}
                >
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <h3 className="text-white font-black mb-2 text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {f.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS  — light grey bg
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="pill-label mx-auto w-fit mb-4">
              <Star className="w-4 h-4" /> Client Reviews
            </div>
            <h2
              className="text-4xl md:text-5xl font-black text-slate-900 mb-4"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Success <span style={{ color: '#5B21B6' }}>Stories</span>
            </h2>
            <p className="text-slate-500 text-lg">
              Don't just take our word for it — hear from clients who've started new lives abroad.
            </p>
          </div>

          {/* Auto-scroll testimonial cards */}
          <div className="overflow-hidden -mx-4 px-4">
            <div className="marquee-track gap-6">
              {[...reviews, ...reviews].map((r, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl w-80 flex-shrink-0 border border-slate-200 shadow-sm"
                >
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-5 italic">"{r.text}"</p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                      style={{ backgroundColor: '#5B21B6' }}
                    >
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <div
                        className="font-black text-slate-900 text-sm"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                      >
                        {r.name}
                      </div>
                      <div className="text-xs font-bold" style={{ color: '#5B21B6' }}>
                        {r.dest}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/success-stories" className="btn-outline py-3 px-8">
              Read All Reviews <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA  — deep purple solid bg
      ══════════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden" style={{ backgroundColor: '#5B21B6' }}>
        {/* Subtle dark texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }}
        />
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          <div className="pill-label-dark mx-auto w-fit mb-6">
            <Globe className="w-4 h-4" /> Start Today — It's Free
          </div>
          <h2
            className="text-4xl md:text-6xl font-black text-white mb-6"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Ready to Start Your<br />
            <span style={{ color: '#DDD6FE' }}>Immigration Journey?</span>
          </h2>
          <p className="text-purple-200 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Book a free consultation with our experts to evaluate your profile and discover
            the best pathway for your future.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/book-consultation"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 text-lg font-black text-purple-900 rounded-xl transition-all duration-200 hover:scale-105 shadow-xl"
              style={{ backgroundColor: 'white', fontFamily: 'Outfit, sans-serif' }}
            >
              <Sparkles className="w-5 h-5" /> Book Free Consultation
            </Link>
            <a
              href="tel:+917495041916"
              className="btn-glass py-4 px-10 text-lg"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
