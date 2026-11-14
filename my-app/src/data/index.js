// ─── CAR WASH OPTIONS ────────────────────────────────────────────────────────
export const carWashOptions = {
  plans: [
    {
      id: 'smart',
      name: 'Smart Wash',
      tagline: 'Regular cleaning',
      price: '₹559',
      originalPrice: null,
      duration: '2 hours',
      highlighted: false,
      features: [
        'Exterior foam wash',
        'Window cleaning',
        'Interior dusting',
        'Vacuum cleaning',
        'Dashboard cleaning',
        'Basic polishing',
        'Seat cleaning (Regular)',
        'Tire shine',
      ],
    },
    {
      id: 'deep',
      name: 'Deep Clean',
      tagline: 'Detailed cleaning',
      price: '₹899',
      originalPrice: '₹1,800',
      duration: '4 hours',
      highlighted: true,
      features: [
        'Exterior foam wash',
        'Window cleaning',
        'Interior deep cleaning',
        'Vacuum cleaning',
        'Dashboard cleaning',
        'Deep seat cleaning',
        'AC vents cleaning',
        'Door hinges cleaning',
        'High-pressure floor mats',
        'Touchpoint sanitization',
        'Wheel degreasing & detailing',
      ],
    },
  ],
  features: [
    { name: 'Exterior foam wash',      smart: true,           deep: true },
    { name: 'Window cleaning',         smart: true,           deep: true },
    { name: 'Interior dusting',        smart: true,           deep: true },
    { name: 'Vacuum cleaning',         smart: true,           deep: true },
    { name: 'Dashboard cleaning',      smart: true,           deep: true },
    { name: 'Basic polishing',         smart: true,           deep: true },
    { name: 'Seat cleaning',           smart: 'Regular',      deep: 'Deep cleaning' },
    { name: 'AC vents cleaning',       smart: false,          deep: true },
    { name: 'Door hinges cleaning',    smart: 'Basic',        deep: 'Detailed' },
    { name: 'Floor mats cleaning',     smart: false,          deep: 'High-pressure' },
    { name: 'Touchpoint sanitization', smart: false,          deep: true },
    { name: 'Wheel & rim detailing',   smart: 'Tire shine',   deep: 'Degreasing & detailing' },
  ],
}

// ─── SERVICES ───────────────────────────────────────────────────────────────
export const services = [
  {
    id: 'car',
    title: 'Car Cleaning',
    description: 'Complete car cleaning services from quick exterior wash to full detailing.',
    icon: 'car',
    features: [
      'Exterior Wash & Rinse',
      'Interior Vacuuming & Wiping',
      'Foam Wash & Scrub',
      'Dashboard & Console Polish',
      'Full Detailing & Wax Coat',
    ],
  },
  {
    id: 'bike',
    title: 'Bike Cleaning',
    description: 'Specialized bike cleaning to keep your ride sparkling and protected.',
    icon: 'bike',
    features: [
      'Exterior Wash & Dry',
      'Chain & Engine Degreasing',
      'Foam Wash & Polish',
      'Seat & Panel Wipe',
      'Full Detailing & Protective Coat',
    ],
  },
]

// ─── PRICING ─────────────────────────────────────────────────────────────────
export const pricing = {
  car: [
    {
      name: 'Smart Wash',
      price: '₹559',
      originalPrice: null,
      duration: '~2 hrs',
      features: [
        'Exterior foam wash',
        'Window cleaning',
        'Interior dusting',
        'Vacuum cleaning',
        'Dashboard cleaning',
        'Basic polishing',
        'Seat cleaning (Regular)',
        'Tire shine',
      ],
      highlighted: false,
    },
    {
      name: 'Deep Clean',
      price: '₹899',
      originalPrice: '₹1,800',
      duration: '~4 hrs',
      features: [
        'Exterior foam wash',
        'Window cleaning',
        'Interior deep cleaning',
        'Vacuum cleaning',
        'Dashboard cleaning',
        'Deep seat cleaning',
        'AC vents cleaning',
        'Door hinges cleaning',
        'High-pressure floor mats',
        'Touchpoint sanitization',
        'Wheel degreasing & detailing',
      ],
      highlighted: true,
    },
  ],
  bike: [
    {
      name: 'Bike Wash',
      price: '₹359',
      originalPrice: null,
      duration: '~60 min',
      features: [
        'Exterior foam wash',
        'Rim & tyre cleaning',
        'Chain lubrication',
        'Panel & seat wipe',
        'Dashboard cleaning',
        'Engine surface wipe',
      ],
      highlighted: true,
    },
  ],
}

// ─── HOW IT WORKS ────────────────────────────────────────────────────────────
export const steps = [
  { step: '01', title: 'Book Online', description: 'Fill in our quick booking form with your vehicle details, preferred package, and time slot.' },
  { step: '02', title: 'We Arrive', description: 'Our trained professional arrives at your doorstep at the scheduled time with all equipment.' },
  { step: '03', title: 'We Clean', description: 'We use eco-friendly products and proven techniques to make your vehicle shine like new.' },
  { step: '04', title: 'You Enjoy', description: 'Inspect your spotless vehicle and pay only after you are 100% satisfied with the service.' },
]

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
export const testimonials = [
  {
    id: 1,
    name: 'Rahul Sharma',
    rating: 5,
    text: 'Absolutely love the service! The team arrived on time and my car has never looked this clean. The foam wash was incredible. Highly recommended!',
    vehicle: 'Honda City',
  },
  {
    id: 2,
    name: 'Priya Nair',
    rating: 5,
    text: 'Booked the Premium bike package and I am blown away. They cleaned every nook and cranny. Will definitely book again every month.',
    vehicle: 'Royal Enfield Classic 350',
  },
  {
    id: 3,
    name: 'Arjun Mehta',
    rating: 4,
    text: 'Great value for money. The Standard car package is exactly what I needed. Quick, professional, and eco-friendly. The booking process was seamless.',
    vehicle: 'Maruti Swift',
  },
]

// ─── FAQs ────────────────────────────────────────────────────────────────────
export const faqs = [
  {
    id: 1,
    question: 'How does doorstep service work?',
    answer: "Our trained professionals arrive at your location with all the necessary equipment, water, and eco-friendly cleaning products. You do not need to provide anything – just a parking spot!",
  },
  {
    id: 2,
    question: 'What products do you use?',
    answer: 'We use only biodegradable, eco-friendly cleaning agents that are safe for your vehicle\'s paint, fabric, and surfaces, and safe for the environment.',
  },
  {
    id: 3,
    question: 'How long does the service take?',
    answer: 'Service time depends on the package. Basic takes ~30–45 minutes, Standard ~60–90 minutes, and Premium can take 2–3 hours for a thorough detailing.',
  },
  {
    id: 4,
    question: 'Can I reschedule or cancel my booking?',
    answer: 'Yes! You can reschedule or cancel up to 2 hours before your appointment by calling or WhatsApp-ing us. We will confirm the change promptly.',
  },
  {
    id: 5,
    question: 'Is payment collected after the service?',
    answer: 'Yes. We collect payment only after you have inspected and are satisfied with the service. We accept cash, UPI (GPay, PhonePe, Paytm), and all major cards.',
  },
]

// ─── CONTACT / SOCIAL ────────────────────────────────────────────────────────
export const contact = {
  phone: '+91 93699 45464',
  whatsapp: '919369945464',
  email: 'hello@shineride.in',
  address: '123, MG Road, Bengaluru, Karnataka – 560001',
  hours: 'Mon–Sun: 7:00 AM – 7:00 PM',
  social: {
    instagram: 'https://instagram.com/shineride',
    facebook: 'https://facebook.com/shineride',
    twitter: 'https://twitter.com/shineride',
  },
}

// ─── TIME SLOTS ──────────────────────────────────────────────────────────────
export const timeSlots = [
  '8:00 AM – 10:00 AM',
  '10:00 AM – 12:00 PM',
  '12:00 PM – 2:00 PM',
  '2:00 PM – 4:00 PM',
  '4:00 PM – 6:00 PM',
]

// ─── PACKAGES BY VEHICLE ─────────────────────────────────────────────────────
export const packagesByVehicle = {
  Car: ['Smart Wash – ₹559', 'Deep Clean – ₹899'],
  Bike: ['Bike Wash – ₹359'],
}
