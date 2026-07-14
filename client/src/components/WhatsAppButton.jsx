import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const message = 'Hello Future Point! I would like to inquire about your immigration services.'
  return (
    <a
      href={`https://wa.me/918950987002?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-24 right-5 z-50 md:bottom-8 md:right-8 flex items-center gap-2 px-4 py-3 rounded-full text-white font-semibold text-sm shadow-2xl hover:scale-105 transition-all duration-300 group"
      style={{ background: '#25D366', boxShadow: '0 8px 32px rgba(37,211,102,0.4)' }}
    >
      <MessageCircle className="w-5 h-5 flex-shrink-0" />
      <span className="hidden md:inline">WhatsApp Us</span>
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: '#25D366' }} />
    </a>
  )
}
