# ShineRide – Car & Bike Cleaning Website

A complete, production-ready single-page website for **ShineRide**, a doorstep car and bike cleaning service. Built with React 19, Vite, and Tailwind CSS.

---

## ⚡ Quick Start

```bash
# 1. Enter the project folder
cd my-app

# 2. Install dependencies (Tailwind CSS is a devDependency)
npm install

# 3. Set up your environment variable (see Google Sheets section below)
cp .env.example .env
# Edit .env and paste your Apps Script Web App URL

# 4. Run the development server
npm run dev
```

The site is now running at **http://localhost:5173**

---

## 🗂️ Project Structure

```
my-app/
├── src/
│   ├── components/        # Reusable UI pieces
│   │   ├── Navbar.jsx         – Sticky nav with mobile hamburger
│   │   ├── WhatsAppButton.jsx – Floating WhatsApp CTA
│   │   ├── SectionHeader.jsx  – Reusable section heading
│   │   ├── StarRating.jsx     – Star rating display
│   │   └── LoadingSpinner.jsx – Animated spinner for form submit
│   ├── sections/          # Page sections (one per scroll target)
│   │   ├── Hero.jsx
│   │   ├── Services.jsx
│   │   ├── Pricing.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── BookingForm.jsx
│   │   ├── Testimonials.jsx
│   │   ├── FAQ.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── index.js       # ← All site content lives here (easy to edit)
│   ├── utils/
│   │   └── validation.js  # Form validation helpers
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css          # Tailwind import + global styles
├── public/
│   └── favicon.svg        # Replace with your logo
├── .env.example
└── index.html             # SEO meta tags, Open Graph
```

---

## ✏️ Editing Content

All site content is centralized in **`src/data/index.js`**:

| Export | What it controls |
|--------|-----------------|
| `services` | Service cards (Car / Bike features) |
| `pricing` | Pricing packages and prices for Car and Bike |
| `steps` | "How It Works" steps |
| `testimonials` | Customer review cards |
| `faqs` | FAQ accordion questions and answers |
| `contact` | Phone, email, WhatsApp number, address, hours, social links |
| `timeSlots` | Available booking time windows |
| `packagesByVehicle` | Package options in the booking form dropdowns |

No other files need to be touched to update text content or prices.

---

## 🔗 Google Sheets Integration

Booking form submissions are sent to a **Google Apps Script Web App** which records them in a Google Sheet and emails the owner.

### Setup steps (5 minutes)

1. **Create a Google Sheet** at [sheets.google.com](https://sheets.google.com)
2. **Open Extensions → Apps Script** in the sheet
3. **Paste the code** from `google-apps-script/Code.gs` (in the project root)
4. **Update your email** on line 10: `var OWNER_EMAIL = 'you@gmail.com';`
5. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. **Copy the Web App URL** and paste it into `.env`:
   ```env
   VITE_BOOKING_API_URL=https://script.google.com/macros/s/YOUR_ID/exec
   ```

> Full step-by-step instructions with screenshots guidance: `google-apps-script/README.md`

---

## 🚀 Deploying to Netlify or Vercel

### Netlify

1. Push the `my-app/` folder contents to a GitHub repo
2. Connect the repo in [app.netlify.com](https://app.netlify.com)
3. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Add the environment variable:
   - **Site settings → Environment variables → Add**
   - Key: `VITE_BOOKING_API_URL`
   - Value: your Apps Script URL

### Vercel

1. Push to GitHub and import in [vercel.com](https://vercel.com)
2. Framework preset: **Vite**
3. Add the environment variable under **Settings → Environment Variables**:
   - Key: `VITE_BOOKING_API_URL`
   - Value: your Apps Script URL

> **Important:** Environment variables prefixed with `VITE_` are embedded at build time. If you change the URL, trigger a new deploy.

---

## 🏗️ Build & Lint

```bash
npm run build    # Production build → dist/
npm run lint     # ESLint check
npm run preview  # Preview the production build locally
```

---

## 🎨 Design Customization

- **Brand colors:** Edit `src/index.css` CSS variables or Tailwind classes directly
  - Primary blue: `blue-700` (`#1d4ed8`)
  - Accent amber: `amber-400` (`#f59e0b`)
- **Hero background:** Replace the gradient in `src/sections/Hero.jsx` with a real photo:
  ```jsx
  // Replace this:
  <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600" />
  // With this (put your photo in public/):
  <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center" />
  ```
- **Logo:** Add `public/favicon.svg` and optionally a logo image in `src/assets/`
- **WhatsApp number:** Update `contact.whatsapp` in `src/data/index.js`

---

## ♿ Accessibility & SEO

- Semantic HTML with one `<h1>` on the page (Hero section)
- All form inputs have associated `<label>` elements
- `aria-required`, `aria-invalid`, `aria-describedby` on form fields
- `aria-expanded` on accordion and mobile menu buttons
- `role="tablist"` / `role="tab"` on the Pricing toggle
- All interactive elements have visible `:focus-visible` outlines
- Open Graph and Twitter Card meta tags in `index.html`
- All decorative SVGs have `aria-hidden="true"`
