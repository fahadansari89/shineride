import { steps } from '../data'

function StepIcon({ index }) {
  const icons = [
    <path key="cal" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    <path key="pin" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />,
    <path key="spark" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />,
    <path key="check" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
  ]
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      {icons[index]}
    </svg>
  )
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-blue-900" aria-labelledby="how-it-works-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-amber-400 font-semibold text-sm uppercase tracking-widest mb-2">
            How It Works
          </span>
          <h2 id="how-it-works-heading" className="text-3xl sm:text-4xl font-bold text-white mb-4">Simple as 1-2-3-4</h2>
          <p className="text-blue-200 max-w-2xl mx-auto text-lg">Getting your vehicle cleaned has never been easier.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          {steps.map((step, index) => (
            <div key={step.step} className="relative text-center">
              {index < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-10 left-[calc(50%+2rem)] right-[calc(-50%+2rem)] h-0.5 bg-blue-700"
                  aria-hidden="true"
                />
              )}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-800 border-2 border-blue-600 text-amber-400 mb-6 relative z-10">
                <StepIcon index={index} />
              </div>
              <div className="text-amber-400 font-bold text-xs tracking-widest uppercase mb-2" aria-hidden="true">
                Step {step.step}
              </div>
              <h3 className="text-white font-bold text-lg mb-3">{step.title}</h3>
              <p className="text-blue-200 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <a
            href="#booking"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-amber-400 text-blue-900 font-bold text-lg hover:bg-amber-300 active:scale-95 transition-all shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900"
          >
            Book Your Cleaning Now
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
