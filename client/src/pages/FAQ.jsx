import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { ChevronDown, Sparkles, ArrowRight } from 'lucide-react'

const faqs = [
  {
    category: 'General',
    items: [
      { question: 'Do you guarantee visa approval?', answer: 'No immigration consultant can legally guarantee visa approval. Visa issuance is entirely at the discretion of the respective embassy or immigration authority. We guarantee that your application will be prepared with the highest level of professionalism, accuracy, and adherence to current laws to maximize your chances of success.' },
      { question: 'How much do your services cost?', answer: 'Our professional fees vary depending on the type of visa, the complexity of the case, and the destination country. We provide a clear, written fee structure during your initial consultation so there are no hidden costs.' },
      { question: 'Do you handle visa refusals or appeals?', answer: 'Yes, we have a specialized team that handles visa refusals. We will review the refusal letter, assess the reasons, and advise you on the best course of action—whether that is reapplying with stronger evidence or filing a formal appeal.' }
    ]
  },
  {
    category: 'Study Visa',
    items: [
      { question: 'Do I need to take an English test to study abroad?', answer: 'In most cases, yes. Countries like Canada, Australia, UK, and the USA require proof of English proficiency through exams like IELTS, PTE, or TOEFL. Some universities may offer waivers if your previous education was entirely in English, but the embassy usually still requires it.' },
      { question: 'Can I work while studying?', answer: 'Most popular study destinations allow international students to work part-time (usually up to 20 hours per week during semesters and full-time during breaks). We provide specific guidelines for your destination country during your pre-departure briefing.' }
    ]
  },
  {
    category: 'Permanent Residency',
    items: [
      { question: 'What is the Express Entry system in Canada?', answer: 'Express Entry is an online system used by the Canadian government to manage applications for permanent residence from skilled workers. It is based on a Comprehensive Ranking System (CRS) that awards points for age, education, work experience, and language proficiency.' },
      { question: 'How long does the PR process take?', answer: 'Processing times vary significantly by country and immigration pathway. For example, Canada Express Entry can take 6 months from the time you receive an Invitation to Apply (ITA), while other pathways or countries can take 12-24 months.' }
    ]
  }
]

function AccordionItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open ? 'border-violet-200 shadow-md shadow-violet-50' : 'border-slate-200 bg-white'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
        aria-expanded={open}
      >
        <span className="font-bold text-slate-900 text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          style={{ color: 'var(--clr-purple)' }}
        />
      </button>
      {open && (
        <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4 text-sm animate-fade-up">
          {answer}
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('General')

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.flatMap(g => g.items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    })))
  }

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | Future Point Immigration</title>
        <meta name="description" content="Find answers to common questions about immigration, study visas, permanent residency, and our consulting services." />
        <meta property="og:title" content="Immigration FAQs — Future Point" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="page-hero-dark py-24">
        <div className="glow-orb w-80 h-80 -top-20 -right-20" style={{ background: 'rgba(59,130,246,0.18)' }} />
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          <div className="pill-label-dark mx-auto w-fit mb-6">
            <Sparkles className="w-4 h-4" /> FAQs
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-slate-300 text-xl">
            Find answers to the most common questions about immigration, visas, and our services.
          </p>
        </div>
      </section>

      <div className="bg-slate-50 py-16 min-h-screen">
        <div className="container-custom max-w-4xl">
          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {faqs.map(g => (
              <button
                key={g.category}
                onClick={() => setActiveCategory(g.category)}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                  activeCategory === g.category
                    ? 'text-white shadow-lg'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
                style={activeCategory === g.category ? { background: 'var(--gradient)' } : {}}
              >
                {g.category}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div className="space-y-3 mb-16">
            {faqs.map(g => (
              <div key={g.category} className={activeCategory === g.category ? 'block space-y-3' : 'hidden'}>
                {g.items.map(item => (
                  <AccordionItem key={item.question} question={item.question} answer={item.answer} />
                ))}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="rounded-3xl p-10 text-center relative overflow-hidden" style={{ background: 'var(--bg-dark)' }}>
            <div className="glow-orb w-64 h-64 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ background: 'rgba(124,58,237,0.2)' }} />
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Still have questions?
              </h3>
              <p className="text-slate-400 mb-8">Can't find the answer you're looking for? Chat with our friendly team.</p>
              <a href="/contact" className="btn-gradient py-3.5 px-8">
                Get in Touch <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
