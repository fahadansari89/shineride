export default function SectionHeader({ eyebrow, title, subtitle, className = '' }) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      {eyebrow && (
        <span className="inline-block text-blue-700 font-semibold text-sm uppercase tracking-widest mb-2">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
      {subtitle && <p className="text-gray-500 max-w-2xl mx-auto text-lg">{subtitle}</p>}
    </div>
  )
}
