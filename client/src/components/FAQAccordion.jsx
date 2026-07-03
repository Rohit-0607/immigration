import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div 
            key={index} 
            className={`border rounded-xl transition-all duration-200 overflow-hidden ${
              isOpen ? 'border-primary-200 bg-white shadow-md' : 'border-slate-200 bg-white/50 hover:bg-white'
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
            >
              <span className={`font-semibold pr-8 ${isOpen ? 'text-primary-700' : 'text-slate-800'}`}>
                {item.question}
              </span>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isOpen ? 'bg-primary-100 text-primary-700' : 'bg-slate-100 text-slate-500'
              }`}>
                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>
            <div 
              className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                {item.answer}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
