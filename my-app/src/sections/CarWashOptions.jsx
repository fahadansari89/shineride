import SectionHeader from '../components/SectionHeader'
import { carWashOptions } from '../data'

const CheckIcon = () => (
  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
)

const CrossIcon = () => (
  <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
)

function CellValue({ value, highlighted }) {
  if (value === true) return <CheckIcon />
  if (value === false) return <CrossIcon />
  // Text label
  return (
    <span className={`text-sm font-medium ${highlighted ? 'text-blue-700' : 'text-gray-600'}`}>
      {value}
    </span>
  )
}

export default function CarWashOptions() {
  const { plans, features } = carWashOptions
  const [smart, deep] = plans

  return (
    <section id="car-wash" className="py-20 bg-white" aria-labelledby="car-wash-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Car Washing"
          title="Choose Your Car Wash"
          subtitle="Two packages designed for every need — a quick refresh or a thorough deep clean."
        />

        {/* Plan cards */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-10">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-5 sm:p-7 border-2 transition-all ${
                plan.highlighted
                  ? 'border-blue-600 bg-blue-50 shadow-lg shadow-blue-100'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-amber-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-sm">
                    Best Value
                  </span>
                </div>
              )}

              <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${plan.highlighted ? 'text-blue-600' : 'text-gray-400'}`}>
                {plan.tagline}
              </p>
              <h3 className={`text-xl sm:text-2xl font-bold mb-3 ${plan.highlighted ? 'text-blue-900' : 'text-gray-900'}`}>
                {plan.name}
              </h3>

              <div className="flex items-baseline gap-2 flex-wrap mb-1">
                <span className={`text-3xl sm:text-4xl font-extrabold ${plan.highlighted ? 'text-blue-700' : 'text-gray-900'}`}>
                  {plan.price}
                </span>
                {plan.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">{plan.originalPrice}</span>
                )}
              </div>

              <p className={`text-sm mb-5 ${plan.highlighted ? 'text-blue-500' : 'text-gray-500'}`}>
                ⏱ {plan.duration}
              </p>

              <a
                href="#booking"
                className={`block text-center text-sm font-semibold px-5 py-2.5 rounded-full transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  plan.highlighted
                    ? 'bg-blue-700 text-white hover:bg-blue-800 focus-visible:ring-blue-500'
                    : 'bg-white text-blue-700 border border-blue-200 hover:border-blue-400 focus-visible:ring-blue-400'
                }`}
              >
                Book {plan.name}
              </a>
            </div>
          ))}
        </div>

        {/* Feature comparison table */}
        <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_140px_140px] bg-gray-900 text-white">
            <div className="px-5 py-3 text-sm font-semibold text-gray-300">Cleaning Feature</div>
            <div className="px-4 py-3 text-sm font-bold text-center border-l border-gray-700">{smart.name}</div>
            <div className="px-4 py-3 text-sm font-bold text-center border-l border-blue-500 bg-blue-700">{deep.name}</div>
          </div>

          {/* Rows */}
          {features.map((feature, i) => (
            <div
              key={feature.name}
              className={`grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_140px_140px] items-center ${
                i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              } border-b border-gray-100 last:border-b-0`}
            >
              <div className="px-5 py-3.5 text-sm text-gray-700 font-medium">{feature.name}</div>

              {/* Smart Wash cell */}
              <div className="px-4 py-3.5 flex items-center justify-center border-l border-gray-100">
                <CellValue value={feature.smart} highlighted={false} />
              </div>

              {/* Deep Clean cell */}
              <div className="px-4 py-3.5 flex items-center justify-center border-l border-blue-100 bg-blue-50/50">
                <CellValue value={feature.deep} highlighted={true} />
              </div>
            </div>
          ))}
        </div>

        {/* Savings callout */}
        {deep.originalPrice && (
          <p className="text-center text-sm text-gray-500 mt-5">
            🎉 Deep Clean saves you{' '}
            <span className="font-semibold text-blue-700">
              {deep.originalPrice} → {deep.price}
            </span>{' '}
            — over 50% off the regular price.
          </p>
        )}
      </div>
    </section>
  )
}

