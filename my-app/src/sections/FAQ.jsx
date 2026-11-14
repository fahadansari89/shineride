import { useState } from 'react'
import SectionHeader from '../components/SectionHeader'
import { faqs } from '../data'

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
        aria-expanded={isOpen}
        id={`faq-btn-${faq.id}`}
        aria-controls={`faq-panel-${faq.id}`}
      >
        <span className="font-semibold text-gray-900 text-sm sm:text-base">{faq.question}</span>
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        id={`faq-panel-${faq.id}`}
        role="region"
        aria-labelledby={`faq-btn-${faq.id}`}
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <p className="px-6 pb-5 text-gray-500 text-sm sm:text-base leading-relaxed">
          {faq.answer}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openId, setOpenId] = useState(null)

  return (
    <section id="faq" className="py-20 bg-white" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          subtitle="Have questions? We have answers."
        />

        <div className="space-y-3">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm mt-10">
          Still have questions?{' '}
          <a
            href="https://wa.me/919369945464"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 font-semibold hover:underline"
          >
            Chat with us on WhatsApp
          </a>
        </p>
      </div>
    </section>
  )
}
