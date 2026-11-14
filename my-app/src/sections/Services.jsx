import SectionHeader from '../components/SectionHeader'
import { services } from '../data'

function CarIcon() {
  return (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 17h8M5 17H4a2 2 0 01-2-2v-4l2.5-7h11l2.5 7H20v4a2 2 0 01-2 2h-1M7 17a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
  )
}

function BikeIcon() {
  return (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v.01M9 12H5.5a3.5 3.5 0 100 7h13a3.5 3.5 0 100-7H15L12 6l-3 6zM5.5 15.5a1 1 0 110-2 1 1 0 010 2zm13 0a1 1 0 110-2 1 1 0 010 2z" />
    </svg>
  )
}

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Services"
          title="Everything Your Vehicle Needs"
          subtitle="From a quick exterior wash to a complete detailing package — we have got you covered."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service) => (
            <article
              key={service.id}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 text-blue-700 mb-6 group-hover:bg-blue-700 group-hover:text-white transition-all duration-300">
                {service.id === 'car' ? <CarIcon /> : <BikeIcon />}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-500 mb-6">{service.description}</p>
              <ul className="space-y-3" aria-label={`${service.title} features`}>
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center" aria-hidden="true">
                      <svg className="w-3 h-3 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 mt-8 text-blue-700 font-semibold hover:text-blue-800 transition-colors group/link"
                aria-label={`See ${service.title} pricing`}
              >
                See Pricing
                <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
