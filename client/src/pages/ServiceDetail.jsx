import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import ContactForm from '../components/ContactForm'

// Mock detailed data for individual services
const serviceDetails = {
  'study-visa': {
    title: 'Study Visa',
    tagline: 'Transform your future with world-class education.',
    description: 'A study visa is your gateway to international education and global career opportunities. We assist students in securing admissions to top-ranking universities and colleges across Canada, Australia, UK, USA, and Europe.',
    benefits: [
      'Access to globally recognized education systems',
      'Post-graduation work permit opportunities',
      'Pathway to Permanent Residency',
      'Part-time work rights during studies'
    ],
    process: [
      'Profile Evaluation & Course Selection',
      'University Application & Offer Letter',
      'Financial Documentation Prep',
      'Visa Application Filing',
      'Pre-departure Briefing'
    ]
  },
  'work-visa': {
    title: 'Work Visa',
    tagline: 'Accelerate your career on a global scale.',
    description: 'Whether you have an employer sponsor or are applying as an independent skilled worker, we navigate the complex work permit processes to ensure you can legally live and work in your dream destination.',
    benefits: [
      'Earn in strong global currencies',
      'Gain international work experience',
      'Bring your spouse and dependent children',
      'Eligible for healthcare and social benefits'
    ],
    process: [
      'Skill Assessment',
      'Employer Sponsorship/LMIA processing',
      'Document Compilation',
      'Visa Lodgement',
      'Approval & Relocation'
    ]
  },
  'permanent-residency': {
    title: 'Permanent Residency',
    tagline: 'Settle abroad permanently with your family.',
    description: 'We specialize in points-based immigration systems like Canada Express Entry, PNPs, and Australia SkillSelect. We calculate your points, advise on ways to improve them, and handle the entire application process.',
    benefits: [
      'Live, work, and study anywhere in the country',
      'Access to universal healthcare',
      'Free public education for children',
      'Pathway to Citizenship'
    ],
    process: [
      'Comprehensive Profile Assessment (CRS/Points)',
      'Language Test & Educational Credential Assessment',
      'Expression of Interest (EOI) Pool Entry',
      'Invitation to Apply (ITA)',
      'Final PR Application Submission'
    ]
  }
}

export default function ServiceDetail() {
  const { serviceId } = useParams()
  
  // In a real app, you'd fetch this detailed data from an API based on the slug
  const service = serviceDetails[serviceId] || serviceDetails['study-visa'] // Fallback for demo

  return (
    <div className="bg-white pb-20">
      {/* Hero */}
      <div className="bg-primary-950 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')] opacity-10 bg-cover bg-center"></div>
        <div className="container-custom relative z-10">
          <Link to="/services" className="inline-flex items-center text-primary-300 hover:text-white font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{service.title}</h1>
          <p className="text-xl text-primary-200 max-w-2xl">{service.tagline}</p>
        </div>
      </div>

      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Overview</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-12">
              {service.description}
            </p>

            <div className="bg-slate-50 rounded-2xl p-8 mb-12 border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Key Benefits</h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                    <span className="text-slate-700 font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-6">Our Process</h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              {service.process.map((step, idx) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary-100 text-primary-700 font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    {idx + 1}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                    <h4 className="font-bold text-slate-900">{step}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
