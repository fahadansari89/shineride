import { useState, useRef } from 'react'
import SectionHeader from '../components/SectionHeader'
import LoadingSpinner from '../components/LoadingSpinner'
import { timeSlots, packagesByVehicle } from '../data'
import { validateForm, hasErrors } from '../utils/validation'

const API_URL = import.meta.env.VITE_BOOKING_API_URL

const initialFormState = {
  name: '',
  phone: '',
  vehicleType: '',
  package: '',
  date: '',
  timeSlot: '',
  notes: '',
  honeypot: '',
}

const initialErrors = {
  name: '',
  phone: '',
  vehicleType: '',
  package: '',
  date: '',
  timeSlot: '',
}

function getTodayString() {
  return new Date().toISOString().split('T')[0]
}

function FieldWrapper({ id, label, error, required, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600 flex items-center gap-1" role="alert">
          <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}

function inputClass(error) {
  return `w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
    error
      ? 'border-red-400 bg-red-50 focus:ring-red-400'
      : 'border-gray-300 bg-white hover:border-gray-400'
  }`
}

export default function BookingForm() {
  const [form, setForm] = useState(initialFormState)
  const [errors, setErrors] = useState(initialErrors)
  const [submitStatus, setSubmitStatus] = useState('idle')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => {
      const updated = { ...prev, [name]: value }
      if (name === 'vehicleType') updated.package = ''
      return updated
    })
    if (name in initialErrors) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.honeypot) return
    if (isSubmitting) return

    const newErrors = validateForm(form)
    setErrors(newErrors)

    if (hasErrors(newErrors)) {
      const firstErrorKey = Object.keys(newErrors).find((k) => newErrors[k])
      if (firstErrorKey) {
        const el = formRef.current?.querySelector(`[name="${firstErrorKey}"]`)
        el?.focus()
      }
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('loading')

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      vehicleType: form.vehicleType,
      package: form.package,
      date: form.date,
      timeSlot: form.timeSlot,
      notes: form.notes.trim(),
      honeypot: form.honeypot,
    }

    try {
      const targetUrl = API_URL || ''
      if (!targetUrl) throw new Error('API URL not configured')

      // Apps Script requires no-cors with text/plain to avoid preflight
      await fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        mode: 'no-cors',
      })

      // no-cors always returns opaque response (can't read body) — treat as success
      setSubmitStatus('success')
      setForm(initialFormState)
      setErrors(initialErrors)
    } catch (err) {
      console.error('Booking error:', err)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <section id="booking" className="py-20 bg-gray-50" aria-labelledby="booking-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center"
            role="status"
            aria-live="polite"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 id="booking-heading" className="text-2xl font-bold text-gray-900 mb-3">Booking Received!</h2>
            <p className="text-gray-600 mb-8 text-lg">
              We will confirm your booking on WhatsApp shortly. Keep an eye on your messages!
            </p>
            <button
              onClick={() => setSubmitStatus('idle')}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Book Another Service
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="booking" className="py-20 bg-gray-50" aria-labelledby="booking-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Book a Service"
          title="Schedule Your Cleaning"
          subtitle="Fill in the details below and we will confirm your booking on WhatsApp."
        />

        {submitStatus === 'error' && (
          <div
            className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center mb-6"
            role="alert"
            aria-live="assertive"
          >
            <p className="text-red-700 font-semibold mb-1">Submission failed</p>
            <p className="text-gray-600 text-sm mb-4">
              Please try again or{' '}
              <a href="https://wa.me/919369945464" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-semibold hover:underline">
                contact us on WhatsApp
              </a>
              .
            </p>
            <button
              onClick={() => setSubmitStatus('idle')}
              className="px-6 py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              Try Again
            </button>
          </div>
        )}

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10 space-y-6"
          aria-label="Booking form"
        >
          {/* Honeypot – hidden from real users, traps bots */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website-url">Website</label>
            <input
              type="text"
              id="website-url"
              name="honeypot"
              value={form.honeypot}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FieldWrapper id="name" label="Full Name" error={errors.name} required>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                autoComplete="name"
                aria-required="true"
                aria-describedby={errors.name ? 'name-error' : undefined}
                aria-invalid={errors.name ? true : undefined}
                className={inputClass(errors.name)}
              />
            </FieldWrapper>

            <FieldWrapper id="phone" label="Phone Number" error={errors.phone} required>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                autoComplete="tel"
                inputMode="numeric"
                maxLength={10}
                aria-required="true"
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                aria-invalid={errors.phone ? true : undefined}
                className={inputClass(errors.phone)}
              />
            </FieldWrapper>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FieldWrapper id="vehicleType" label="Vehicle Type" error={errors.vehicleType} required>
              <select
                id="vehicleType"
                name="vehicleType"
                value={form.vehicleType}
                onChange={handleChange}
                aria-required="true"
                aria-describedby={errors.vehicleType ? 'vehicleType-error' : undefined}
                aria-invalid={errors.vehicleType ? true : undefined}
                className={inputClass(errors.vehicleType)}
              >
                <option value="">Select vehicle type</option>
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
              </select>
            </FieldWrapper>

            <FieldWrapper id="package" label="Service Package" error={errors.package} required>
              <select
                id="package"
                name="package"
                value={form.package}
                onChange={handleChange}
                disabled={!form.vehicleType}
                aria-required="true"
                aria-describedby={errors.package ? 'package-error' : undefined}
                aria-invalid={errors.package ? true : undefined}
                className={`${inputClass(errors.package)} disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400`}
              >
                <option value="">
                  {form.vehicleType ? 'Select a package' : 'Select vehicle type first'}
                </option>
                {form.vehicleType &&
                  packagesByVehicle[form.vehicleType].map((pkg) => (
                    <option key={pkg} value={pkg}>{pkg}</option>
                  ))}
              </select>
            </FieldWrapper>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FieldWrapper id="date" label="Preferred Date" error={errors.date} required>
              <input
                type="date"
                id="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                min={getTodayString()}
                aria-required="true"
                aria-describedby={errors.date ? 'date-error' : undefined}
                aria-invalid={errors.date ? true : undefined}
                className={inputClass(errors.date)}
              />
            </FieldWrapper>

            <FieldWrapper id="timeSlot" label="Preferred Time Slot" error={errors.timeSlot} required>
              <select
                id="timeSlot"
                name="timeSlot"
                value={form.timeSlot}
                onChange={handleChange}
                aria-required="true"
                aria-describedby={errors.timeSlot ? 'timeSlot-error' : undefined}
                aria-invalid={errors.timeSlot ? true : undefined}
                className={inputClass(errors.timeSlot)}
              >
                <option value="">Select a time slot</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </FieldWrapper>
          </div>

          <FieldWrapper id="notes" label="Additional Notes" error="" required={false}>
            <textarea
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={2}
              placeholder="Any specific requests or information about your vehicle..."
              className={`${inputClass('')} resize-none`}
            />
          </FieldWrapper>

          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-blue-700 text-white font-bold text-lg hover:bg-blue-800 active:scale-[0.98] transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="sm" />
                Submitting…
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Confirm Booking
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-400">
            By booking, you agree to our Terms of Service. We will confirm via WhatsApp.
          </p>
        </form>
      </div>
    </section>
  )
}
