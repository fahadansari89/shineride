import { useState } from 'react'
import SectionHeader from '../components/SectionHeader'
import { pricing, carWashOptions } from '../data'

function TickIcon({ light }) {
  return (
    <svg
      className={`w-3 h-3 flex-shrink-0 ${light ? 'text-white' : 'text-blue-700'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}

/* ── Bike pricing card ──────────────────────────────────────────────────── */
function BikeCard({ pkg }) {
  const hl = pkg.highlighted
  return (
    <div
      className={`relative rounded-3xl p-8 transition-all duration-300 ${
        hl
          ? 'bg-blue-700 text-white shadow-xl shadow-blue-200 scale-105'
          : 'bg-gray-50 text-gray-900 hover:shadow-lg border border-gray-200'
      }`}
    >
      {hl && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-amber-400 text-blue-900 text-xs font-bold px-4 py-1.5 rounded-full shadow">
            Most Popular
          </span>
        </div>
      )}
      <h3 className={`text-xl font-bold mb-1 ${hl ? 'text-white' : 'text-gray-900'}`}>
        {pkg.name}
      </h3>
      <p className={`text-sm mb-6 ${hl ? 'text-blue-200' : 'text-gray-500'}`}>{pkg.duration}</p>
      <div className="mb-8">
        <span className={`text-4xl font-extrabold ${hl ? 'text-white' : 'text-blue-700'}`}>
          {pkg.price}
        </span>
        <span className={`text-sm ml-1 ${hl ? 'text-blue-200' : 'text-gray-500'}`}>/ service</span>
      </div>
      <ul className="space-y-3 mb-8">
        {pkg.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span
              className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                hl ? 'bg-white/20' : 'bg-blue-100'
              }`}
            >
              <TickIcon light={hl} />
            </span>
            <span className={`text-sm ${hl ? 'text-blue-100' : 'text-gray-600'}`}>{f}</span>
          </li>
        ))}
      </ul>
      <a
        href="#booking"
        className={`block text-center px-6 py-3 rounded-full font-semibold transition-all active:scale-95 ${
          hl
            ? 'bg-amber-400 text-blue-900 hover:bg-amber-300'
            : 'bg-blue-700 text-white hover:bg-blue-800'
        }`}
      >
        Book {pkg.name}
      </a>
    </div>
  )
}

/* ── Car wash plan card (Smart Wash / Deep Clean) ──────────────────────── */
function CarCard({ plan }) {
  const hl = plan.highlighted
  return (
    <div
      className={`relative rounded-3xl p-7 flex flex-col h-full transition-all duration-300 ${
        hl
          ? 'bg-blue-700 text-white shadow-xl shadow-blue-200'
          : 'bg-gray-50 text-gray-900 hover:shadow-lg border border-gray-200'
      }`}
    >
      {hl && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-amber-400 text-blue-900 text-xs font-bold px-4 py-1.5 rounded-full shadow whitespace-nowrap">
            Best Value
          </span>
        </div>
      )}

      <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${hl ? 'text-blue-200' : 'text-gray-400'}`}>
        {plan.tagline}
      </p>
      <h3 className={`text-xl font-bold mb-1 ${hl ? 'text-white' : 'text-gray-900'}`}>
        {plan.name}
      </h3>
      <p className={`text-sm mb-5 ${hl ? 'text-blue-200' : 'text-gray-500'}`}>⏱ {plan.duration}</p>

      <div className="mb-6 flex items-baseline gap-2 flex-wrap">
        <span className={`text-4xl font-extrabold ${hl ? 'text-white' : 'text-blue-700'}`}>
          {plan.price}
        </span>
        {plan.originalPrice ? (
          <span className={`text-sm line-through ${hl ? 'text-blue-300' : 'text-gray-400'}`}>
            {plan.originalPrice}
          </span>
        ) : null}
        <span className={`text-sm ${hl ? 'text-blue-200' : 'text-gray-500'}`}>/ service</span>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {(plan.features || []).map((f, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span
              className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                hl ? 'bg-white/20' : 'bg-blue-100'
              }`}
            >
              <TickIcon light={hl} />
            </span>
            <span className={`text-sm ${hl ? 'text-blue-100' : 'text-gray-600'}`}>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href="#booking"
        className={`mt-auto block text-center px-6 py-3 rounded-full font-semibold transition-all active:scale-95 ${
          hl
            ? 'bg-amber-400 text-blue-900 hover:bg-amber-300'
            : 'bg-blue-700 text-white hover:bg-blue-800'
        }`}
      >
        Book {plan.name}
      </a>
    </div>
  )
}

/* ── Comparison card ───────────────────────────────────────────────────── */
function ComparisonCard() {
  const features = carWashOptions.features
  const smart = carWashOptions.plans[0]
  const deep = carWashOptions.plans[1]

  return (
    <div className="rounded-3xl border-2 border-blue-100 overflow-hidden bg-white hover:shadow-lg transition-shadow flex flex-col">
      {/* Header row */}
      <div className="grid grid-cols-3 text-xs font-bold bg-gray-900 text-white">
        <div className="px-3 py-3 text-gray-400">Feature</div>
        <div className="px-3 py-3 text-center border-l border-gray-700">{smart.name}</div>
        <div className="px-3 py-3 text-center border-l border-blue-500 bg-blue-700">{deep.name}</div>
      </div>

      {/* Feature rows */}
      {features.map((row, i) => (
        <div
          key={i}
          className={`grid grid-cols-3 items-center border-b border-gray-100 last:border-b-0 ${
            i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
          }`}
        >
          <div className="px-3 py-2.5 text-xs text-gray-700 font-medium">{row.name}</div>

          {/* Smart cell */}
          <div className="px-2 py-2.5 flex justify-center border-l border-gray-100">
            {row.smart === true ? (
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : row.smart === false ? (
              <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <span className="text-xs text-gray-500 text-center leading-tight">{row.smart}</span>
            )}
          </div>

          {/* Deep cell */}
          <div className="px-2 py-2.5 flex justify-center border-l border-blue-100 bg-blue-50">
            {row.deep === true ? (
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : row.deep === false ? (
              <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <span className="text-xs text-blue-700 font-semibold text-center leading-tight">{row.deep}</span>
            )}
          </div>
        </div>
      ))}

      {/* Footer */}
      <div className="px-4 py-3 bg-blue-50 border-t border-blue-100 text-center text-xs text-blue-700 font-semibold">
        Deep Clean saves 50%+ &nbsp;·&nbsp; ₹1,800 → ₹899
      </div>
    </div>
  )
}

/* ── Main section ──────────────────────────────────────────────────────── */
export default function Pricing() {
  const [activeTab, setActiveTab] = useState('car')

  return (
    <section id="pricing" className="py-20 bg-white" aria-labelledby="pricing-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Pricing"
          title="Simple, Transparent Pricing"
          subtitle="No hidden fees. Choose the package that fits your needs and budget."
        />

        {/* Tab toggle */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-gray-100 rounded-full p-1" role="tablist" aria-label="Vehicle type pricing">
            {[{ id: 'car', label: '🚗 Car' }, { id: 'bike', label: '🏍️ Bike' }].map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  activeTab === tab.id ? 'bg-blue-700 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Car tab: Smart Wash + Deep Clean + Comparison */}
        {activeTab === 'car' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-start pt-6">
            {carWashOptions.plans.map((plan) => (
              <CarCard key={plan.id} plan={plan} />
            ))}
            <ComparisonCard />
          </div>
        )}

        {/* Bike tab */}
        {activeTab === 'bike' && (
        <div className="flex justify-center">
            {pricing.bike.map((pkg) => (
              <div key={pkg.name} className="w-full max-w-sm">
                <BikeCard pkg={pkg} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
