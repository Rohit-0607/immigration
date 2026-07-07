import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

const helmetBlock = (
  <Helmet>
    <title>Points Calculator | Future Point Immigration</title>
    <meta name="description" content="Calculate your estimated CRS points for Canadian immigration with our free tool." />
  </Helmet>
)

const questions = [
  {
    id: 'spouse',
    title: "Do you have a spouse or common-law partner who will immigrate with you?",
    options: ["Yes", "No"]
  },
  {
    id: 'age',
    title: "How old are you?",
    options: ["18 to 29", "30 to 34", "35 to 39", "40 to 44", "45 or older"]
  },
  {
    id: 'education',
    title: "What is your highest level of education?",
    options: [
      "Master's or Professional Degree",
      "Bachelor's Degree",
      "Two or more certificates/diplomas",
      "One or two-year diploma/certificate",
      "High School"
    ]
  },
  {
    id: 'languageFirst',
    title: "What is your proficiency in your first official language? (e.g. IELTS/CELPIP)",
    options: [
      "Advanced (CLB 9+)",
      "High Intermediate (CLB 8)",
      "Intermediate (CLB 7)",
      "Below Intermediate or None"
    ]
  },
  {
    id: 'languageSecond',
    title: "Do you have test results for a second official language? (e.g. French)",
    options: ["Yes, intermediate or higher", "No"]
  },
  {
    id: 'cadExperience',
    title: "How many years of skilled work experience do you have IN Canada?",
    options: ["3 or more years", "2 years", "1 year", "None"]
  },
  {
    id: 'foreignExperience',
    title: "How many years of skilled foreign work experience do you have? (Outside Canada)",
    options: ["3 or more years", "1 to 2 years", "None"]
  }
]

export default function PointsCalculator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [_website, setWebsite] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [estimatedScore, setEstimatedScore] = useState(0)

  const handleSelect = (option) => {
    setAnswers(prev => ({ ...prev, [questions[currentStep].id]: option }))
  }

  const calculateScore = () => {
    // Highly simplified CRS estimation model
    let score = 0
    const hasSpouse = answers.spouse === "Yes"

    // Age
    if (answers.age === "18 to 29") score += hasSpouse ? 100 : 110
    else if (answers.age === "30 to 34") score += hasSpouse ? 80 : 90
    else if (answers.age === "35 to 39") score += hasSpouse ? 60 : 70
    else if (answers.age === "40 to 44") score += hasSpouse ? 30 : 40
    
    // Education
    if (answers.education === "Master's or Professional Degree") score += hasSpouse ? 126 : 135
    else if (answers.education === "Two or more certificates/diplomas") score += hasSpouse ? 119 : 128
    else if (answers.education === "Bachelor's Degree") score += hasSpouse ? 112 : 120
    else if (answers.education === "One or two-year diploma/certificate") score += hasSpouse ? 84 : 90
    else if (answers.education === "High School") score += hasSpouse ? 28 : 30

    // Language 1
    if (answers.languageFirst === "Advanced (CLB 9+)") score += hasSpouse ? 116 : 128
    else if (answers.languageFirst === "High Intermediate (CLB 8)") score += hasSpouse ? 88 : 92
    else if (answers.languageFirst === "Intermediate (CLB 7)") score += hasSpouse ? 64 : 68

    // Language 2
    if (answers.languageSecond === "Yes, intermediate or higher") score += hasSpouse ? 22 : 24

    // Canadian Experience
    if (answers.cadExperience === "3 or more years") score += hasSpouse ? 70 : 80
    else if (answers.cadExperience === "2 years") score += hasSpouse ? 46 : 53
    else if (answers.cadExperience === "1 year") score += hasSpouse ? 35 : 40

    // Skill Transferability (Foreign Experience + Language)
    // Simplified bump
    if (answers.foreignExperience === "3 or more years") score += 50
    else if (answers.foreignExperience === "1 to 2 years") score += 25

    return Math.min(score, 600) // Base CRS out of 600
  }

  const handleNext = async () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      setAnalyzing(true)
      const score = calculateScore()
      setEstimatedScore(score)
      
      try {
        const res = await fetch('/api/points-leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers, estimatedScore: score, _website })
        })
        if (!res.ok) {
          throw new Error('Failed to save lead')
        }
      } catch (error) {
        console.error("Failed to save lead:", error)
      } finally {
        setTimeout(() => {
          setAnalyzing(false)
          setShowResult(true)
        }, 1500)
      }
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
    setWebsite('')
    setShowResult(false)
    setEstimatedScore(0)
  }

  if (analyzing) {
    return (
      <>
      {helmetBlock}
      <div className="container-custom py-24 min-h-[60vh] flex flex-col items-center justify-center">
        <i className="lucide-loader animate-spin w-16 h-16 text-primary-600 mb-6 border-4 border-primary-100 border-t-primary-600 rounded-full" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Calculating Your Score...</h2>
        <p className="text-slate-600">Evaluating your human capital and skill transferability factors.</p>
      </div>
      </>
    )
  }

  if (showResult) {
    return (
      <>
      {helmetBlock}
      <div className="container-custom py-20 min-h-[60vh]">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-12 text-center">
          <div className="text-sm font-bold text-primary-600 tracking-widest uppercase mb-2">Your Estimated Score</div>
          <div className="text-7xl font-extrabold text-slate-900 mb-2">{estimatedScore}</div>
          <p className="text-slate-500 mb-8 text-sm max-w-lg mx-auto">
            * Estimate only, not official IRCC scoring. Based on simplified core human capital factors.
          </p>
          
          <div className="bg-slate-50 rounded-xl p-8 mb-8 text-left border border-slate-200">
            <h3 className="font-bold text-slate-900 text-xl mb-4">What does this score mean?</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Recent Express Entry draws have typically invited candidates with scores in the <strong>480 - 520</strong> range for general draws, though targeted draws for specific occupations (like healthcare or STEM) often see much lower cut-off scores.
            </p>
            <p className="text-slate-700 leading-relaxed">
              If your score is lower than expected, don't worry! You can improve it by increasing your language test scores, gaining more work experience, or securing a provincial nomination.
            </p>
          </div>

          <h3 className="font-bold text-slate-900 text-2xl mb-6">Want an official assessment?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary py-3.5 px-8">
              Get a free assessment from our consultants
            </Link>
            <button onClick={reset} className="btn-outline py-3.5 px-8">
              Recalculate Score
            </button>
          </div>
        </div>
      </div>
      </>
    )
  }

  const currentQ = questions[currentStep]
  const hasAnswered = !!answers[currentQ.id]

  return (
    <>
    {helmetBlock}
    <div className="bg-slate-50 py-20 min-h-[70vh]">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Points Calculator</h1>
            <p className="text-slate-600 text-lg">
              Estimate your Express Entry Comprehensive Ranking System (CRS) score.
            </p>
          </div>

          {/* Quiz Container */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
            {/* Honeypot field - visually hidden to catch bots */}
            <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
              <input type="text" name="_website" tabIndex="-1" value={_website} onChange={(e) => setWebsite(e.target.value)} autoComplete="off" />
            </div>

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
            </div>

            {/* Footer / Nav */}
            <div className="bg-slate-50 p-6 md:px-12 border-t border-slate-100 flex justify-between items-center">
              <button 
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 font-medium transition-colors ${
                  currentStep === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ArrowLeft className="w-5 h-5" /> Back
              </button>

              <button
                onClick={handleNext}
                disabled={!hasAnswered}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  hasAnswered 
                    ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {currentStep === questions.length - 1 ? 'Calculate Score' : 'Continue'}
                {currentStep !== questions.length - 1 && <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
