import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import FAQAccordion from '../components/FAQAccordion'

const faqs = [
  {
    category: 'General',
    items: [
      {
        question: 'Do you guarantee visa approval?',
        answer: 'No immigration consultant can legally guarantee visa approval. Visa issuance is entirely at the discretion of the respective embassy or immigration authority. We guarantee that your application will be prepared with the highest level of professionalism, accuracy, and adherence to current laws to maximize your chances of success.'
      },
      {
        question: 'How much do your services cost?',
        answer: 'Our professional fees vary depending on the type of visa, the complexity of the case, and the destination country. We provide a clear, written fee structure during your initial consultation so there are no hidden costs.'
      },
      {
        question: 'Do you handle visa refusals or appeals?',
        answer: 'Yes, we have a specialized team that handles visa refusals. We will review the refusal letter, assess the reasons, and advise you on the best course of action—whether that is reapplying with stronger evidence or filing a formal appeal.'
      }
    ]
  },
  {
    category: 'Study Visa',
    items: [
      {
        question: 'Do I need to take an English test to study abroad?',
        answer: 'In most cases, yes. Countries like Canada, Australia, UK, and the USA require proof of English proficiency through exams like IELTS, PTE, or TOEFL. Some universities may offer waivers if your previous education was entirely in English, but the embassy usually still requires it.'
      },
      {
        question: 'Can I work while studying?',
        answer: 'Most popular study destinations allow international students to work part-time (usually up to 20 hours per week during semesters and full-time during breaks). We provide specific guidelines for your destination country during your pre-departure briefing.'
      }
    ]
  },
  {
    category: 'Permanent Residency',
    items: [
      {
        question: 'What is the Express Entry system in Canada?',
        answer: 'Express Entry is an online system used by the Canadian government to manage applications for permanent residence from skilled workers. It is based on a Comprehensive Ranking System (CRS) that awards points for age, education, work experience, and language proficiency.'
      },
      {
        question: 'How long does the PR process take?',
        answer: 'Processing times vary significantly by country and immigration pathway. For example, Canada Express Entry can take 6 months from the time you receive an Invitation to Apply (ITA), while other pathways or countries can take 12-24 months.'
      }
    ]
  }
]

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('General')

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.flatMap(group => group.items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    })))
  }

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | Future Point Immigration</title>
        <meta name="description" content="Find answers to common questions about immigration, study visas, permanent residency, and our consulting services." />
        <meta property="og:title" content="Immigration FAQs - Future Point" />
        <meta property="og:description" content="Find answers to common questions about immigration, study visas, permanent residency, and our consulting services." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://futurepoint.com/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div className="bg-slate-50 py-16 md:py-24 min-h-screen">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h1>
          <p className="text-lg text-slate-600">
            Find answers to the most common questions about immigration, visas, and our services.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {faqs.map(group => (
            <button
              key={group.category}
              onClick={() => setActiveCategory(group.category)}
              className={`px-6 py-2.5 rounded-full font-medium transition-colors ${
                activeCategory === group.category 
                  ? 'bg-primary-700 text-white shadow-md' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {group.category}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="mb-20">
          {faqs.map(group => (
            <div 
              key={group.category} 
              className={activeCategory === group.category ? 'block' : 'hidden'}
            >
              <FAQAccordion items={group.items} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto bg-primary-950 text-white rounded-3xl p-10 text-center">
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-primary-200 mb-8">
            Can't find the answer you're looking for? Please chat to our friendly team.
          </p>
          <a href="/contact" className="btn-accent py-3 px-8">Get in touch</a>
        </div>
      </div>
    </div>
    </>
  )
}
