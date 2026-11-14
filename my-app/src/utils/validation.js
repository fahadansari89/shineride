export function validateName(value) {
  if (!value.trim()) return 'Full name is required.'
  if (value.trim().length < 2) return 'Name must be at least 2 characters.'
  return ''
}

export function validatePhone(value) {
  if (!value.trim()) return 'Phone number is required.'
  if (!/^[6-9]\d{9}$/.test(value.trim())) return 'Enter a valid 10-digit Indian mobile number.'
  return ''
}

export function validateVehicleType(value) {
  if (!value) return 'Please select a vehicle type.'
  return ''
}

export function validatePackage(value) {
  if (!value) return 'Please select a service package.'
  return ''
}

export function validateDate(value) {
  if (!value) return 'Please select a preferred date.'
  const selected = new Date(value)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (selected < today) return 'Date cannot be in the past.'
  return ''
}

export function validateTimeSlot(value) {
  if (!value) return 'Please select a time slot.'
  return ''
}

export function validateAddress(value, serviceLocation) {
  if (serviceLocation === 'Doorstep' && !value.trim()) {
    return 'Address is required for doorstep service.'
  }
  return ''
}

export function validateForm(fields) {
  return {
    name: validateName(fields.name),
    phone: validatePhone(fields.phone),
    vehicleType: validateVehicleType(fields.vehicleType),
    package: validatePackage(fields.package),
    date: validateDate(fields.date),
    timeSlot: validateTimeSlot(fields.timeSlot),
  }
}

export function hasErrors(errors) {
  return Object.values(errors).some(Boolean)
}
