import { useEffect, useRef, useState } from 'react'
import SectionHeader from '../components/SectionHeader'
import StarRating from '../components/StarRating'
import { testimonials } from '../data'

/* ── Count-up hook ─────────────────────────────────────────────────── */
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // ease-out
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])

  return count
}

/* ── Single stat badge with count-up ───────────────────────────────── */
function StatBadge({ stat, animate }) {
  const count = useCountUp(stat.target, 1800, animate)

  const display = stat.suffix
    ? `${count}${stat.suffix}`
    : stat.prefix
    ? `${stat.prefix}${count}${stat.decimal ? stat.decimal : ''}`
    : `${count}+`

  return (
    <div className="text-center px-6">
      <div className="text-4xl font-extrabold text-blue-700 tabular-nums">{display}</div>
      <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
    </div>
  )
}

const stats = [
  { target: 500,  suffix: '+',  label: 'Happy Customers' },
  { target: 49,   prefix: '4.', decimal: '★', label: 'Average Rating' },
  { target: 1000, suffix: '+',  label: 'Vehicles Cleaned' },
]

/* ── Main section ───────────────────────────────────────────────────── */
export default function Testimonials() {
  const [animate, setAnimate] = useState(false)
  const statsRef = useRef(null)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="reviews" className="py-20 bg-gray-50" aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Reviews"
          title="What Our Customers Say"
          subtitle="Real reviews from verified ShineRide customers across India."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="text-blue-100 text-6xl font-serif leading-none mb-4" aria-hidden="true">&ldquo;</div>
              <blockquote className="text-gray-700 text-sm leading-relaxed mb-6">
                {testimonial.text}
              </blockquote>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  aria-hidden="true"
                >
                  {testimonial.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 text-sm truncate">{testimonial.name}</div>
                  <div className="text-xs text-gray-500">{testimonial.vehicle}</div>
                </div>
                <StarRating rating={testimonial.rating} />
              </div>
            </article>
          ))}
        </div>

        {/* Stats with count-up animation */}
        <div ref={statsRef} className="flex flex-wrap justify-center gap-10 mt-14">
          {stats.map((stat) => (
            <StatBadge key={stat.label} stat={stat} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  )
}
