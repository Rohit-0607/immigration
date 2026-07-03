import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react'

const questions = [
  {
    id: 'goal',
    title: "What is your primary immigration goal?",
    options: [
      "Study Abroad",
      "Work Overseas",
      "Permanent Residency (PR)",
      "Visit/Tourist",
      "Family/Spouse Sponsorship",
      "Business/Investment"
    ]
  },
  {
    id: 'country',
    title: "Which country are you most interested in?",
    options: [
      "Canada",
      "Australia",
      "United Kingdom",
      "United States",
      "New Zealand",
      "Europe (Germany, etc.)",
      "Undecided"
    ]
  },
  {
    id: 'education',
    title: "What is your highest level of education?",
    options: [
      "High School / Secondary",
      "Diploma / Trade Certificate",
      "Bachelor's Degree",
      "Master's Degree",
      "Ph.D. / Doctorate"
    ]
  },
  {
    id: 'experience',
    title: "How many years of skilled work experience do you have?",
    options: [
      "None / Less than 1 year",
      "1 - 2 Years",
      "3 - 5 Years",
      "More than 5 Years"
    ]
  },
  {
    id: 'english',
    title: "Have you taken an English proficiency test? (IELTS, PTE, etc.)",
    options: [
      "Yes, and I scored high (CLB 9+)",
      "Yes, average score (CLB 7-8)",
      "Yes, but low score",
      "No, but I am fluent",
      "No, I need coaching"
    ]
  }
]

export default function EligibilityChecker() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)

  const handleSelect = (option) => {
    setAnswers(prev => ({ ...prev, [questions[currentStep].id]: option }))
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      // Simulate analyzing
      setAnalyzing(true)
      setTimeout(() => {
        setAnalyzing(false)
        setShowResult(true)
      }, 2000)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const reset = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowResult(false)
  }

  // Very basic mock logic for result text based on PR and education
  const getResult = () => {
    const goal = answers.goal
    const edu = answers.education
    
    if (goal === 'Permanent Residency (PR)' && (edu === "Master's Degree" || edu === "Bachelor's Degree")) {
      return {
        title: "Strong Profile for PR",
        desc: "Based on your education and experience, you have a strong foundational profile for points-based systems like Canada's Express Entry or Australia's SkillSelect.",
        match: 92
      }
    } else if (goal === 'Study Abroad') {
      return {
        title: "Excellent Study Prospects",
        desc: "You are well-positioned to apply for student visas. Your next step is securing admission to a designated learning institution.",
        match: 85
      }
    }
    
    return {
      title: "Promising Profile",
      desc: "There are multiple pathways available for your profile. A detailed evaluation by our consultants will identify the exact program for you.",
      match: 78
    }
  }

  if (analyzing) {
    return (
      <div className="container-custom py-24 min-h-[60vh] flex flex-col items-center justify-center">
        <i className="lucide-loader animate-spin w-16 h-16 text-primary-600 mb-6 border-4 border-primary-100 border-t-primary-600 rounded-full" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Analyzing Your Profile...</h2>
        <p className="text-slate-600">Cross-referencing your answers with global immigration policies.</p>
      </div>
    )
  }

  if (showResult) {
    const result = getResult()
    return (
      <div className="container-custom py-20 min-h-[60vh]">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-12 text-center">
          <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <div className="text-sm font-bold text-primary-600 tracking-widest uppercase mb-2">Estimated Match Score</div>
          <div className="text-6xl font-extrabold text-slate-900 mb-6">{result.match}%</div>
          
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{result.title}</h2>
          <p className="text-slate-600 text-lg mb-8 leading-relaxed">
            {result.desc}
          </p>
          
          <div className="bg-primary-50 rounded-xl p-6 mb-8 text-left border border-primary-100">
            <h3 className="font-bold text-slate-900 mb-2">Your Next Steps:</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-primary-600 shrink-0" /> Book a free consultation with our experts.</li>
              <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-primary-600 shrink-0" /> Bring your resume and educational documents.</li>
              <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-primary-600 shrink-0" /> Discuss tailored pathways and timelines.</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary py-3.5 px-8">
              Book Free Consultation
            </Link>
            <button onClick={reset} className="btn-outline py-3.5 px-8">
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentQ = questions[currentStep]
  const hasAnswered = !!answers[currentQ.id]

  return (
    <div className="bg-slate-50 py-20 min-h-[70vh]">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Eligibility Checker</h1>
            <p className="text-slate-600 text-lg">
              Answer 5 quick questions to instantly discover your immigration possibilities.
            </p>
          </div>

          {/* Quiz Container */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
            {/* Progress Bar */}
            <div className="bg-slate-100 h-2 w-full">
              <div 
                className="bg-primary-600 h-full transition-all duration-500 ease-out"
                style={{ width: `${((currentStep) / questions.length) * 100}%` }}
              ></div>
            </div>

            <div className="p-8 md:p-12">
              <div className="text-sm font-semibold text-primary-600 mb-4 uppercase tracking-wider">
                Question {currentStep + 1} of {questions.length}
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-8 leading-snug">
                {currentQ.title}
              </h2>

              <div className="space-y-3">
                {currentQ.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(option)}
                    className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-200 ${
                      answers[currentQ.id] === option 
                        ? 'border-primary-600 bg-primary-50 text-primary-900 font-medium shadow-sm' 
                        : 'border-slate-200 text-slate-700 hover:border-primary-300 hover:bg-slate-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-10 pt-8 border-t border-slate-100">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium disabled:opacity-50 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" /> Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!hasAnswered}
                  className="btn-primary py-3 px-8 gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentStep === questions.length - 1 ? 'Analyze Profile' : 'Next Question'} 
                  {currentStep !== questions.length - 1 && <ArrowRight className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
