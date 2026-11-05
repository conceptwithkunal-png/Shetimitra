# SHETI MITRA (शेती मित्र)
### *Your Farming Partner – तुमचा शेतीचा साथीदार*

SHETI MITRA is an Indian agriculture technology platform engineered specifically for farmers, agricultural buyers/traders, agri-scientists, equipment owners, and market administrators in Maharashtra and across India.

---

## 🌟 Key Functional Modules & Features

1. **Farmer Dashboard (शेतकरी मुख्य फलक)**
   - Personalized greeting, real-time weather ticker, localized date in `Asia/Kolkata`.
   - 10 core service action cards with live badges and indicators.
   - Farm expense summary, agricultural reminders, and advisory notices.

2. **Mandi Price Module (APMC थेट बाजारभाव)**
   - Daily verified market rates from **Agmarknet** & **MSAMB** (Maharashtra State Agricultural Marketing Board).
   - Major crops: Soybean (सोयाबीन), Onion (कांदा), Cotton (कापूस), Tomato (टोमॅटो), Turmeric (हळद), Gram/Chana (हरभरा), Wheat (गहू), Maize (मका), Pomegranate (डाळिंब), Jowar (ज्वारी).
   - APMCs: Lasalgaon, Pune, Latur, Akola, Solapur, Nanded, Jalgaon, Ahmednagar, Kolhapur, etc.
   - 7-Day interactive price trend visualizer and 3-market comparison matrix.
   - One-click WhatsApp sharing formatted for farmer community groups.

3. **AI Crop Doctor (एआय पीक डॉक्टर)**
   - Powered by **Google Gemini Vision AI** (`gemini-3.8-flash`).
   - Camera or file upload of affected plant parts (Leaf, Stem, Fruit, Root, Flower).
   - Pathology report: Suspected disease, confidence score, observed symptoms, probable causes, bio-organic treatments, and chemical spraying guidelines.
   - Statutory agronomic safety warnings and direct Krishi Vigyan Kendra (KVK) referral button.

4. **Agricultural Weather & Agro-Met Advisory (हवामान अंदाज)**
   - Localized weather for Maharashtra districts (Pune, Nashik, Latur, Nagpur, etc.).
   - 7-day forecast, rain probabilities, humidity, and wind speed.
   - Specific suitability indexes for spraying, sowing, and harvesting.

5. **Direct Farmer Marketplace (थेट खरेदी-विक्री बाजारपेठ)**
   - Zero-middlemen trading platform connecting farmers directly to buyers and food processors.
   - Farmer listing creator: Crop, variety, quantity, price per quintal, district, village, photos, organic certification tag.
   - Buyer checkout with automatic 2% platform commission deduction and net farmer payout calculation.
   - 8-stage order lifecycle tracking: Pending, Confirmed, Processing, Shipped, Delivered, Cancelled, Disputed, Refunded.
   - Escrow payment protection simulation.

6. **Government Schemes & Subsidies (शासकीय कृषी योजना)**
   - Detailed guides for PM-KISAN, PMFBY (₹1 crop insurance in Maharashtra), Kisan Credit Card (KCC), Chief Minister Micro Irrigation (MahaDBT Drip/Sprinkler Subsidy), and Nanaji Deshmukh Sanjivani Prakalp (PoCRA).
   - Document checklists (7/12, 8-A, Aadhaar, Bank Passbook) and direct links to official portals.

7. **Farm Equipment & Machinery Rental (कृषी अवजारे भाडे)**
   - Rent tractors (Mahindra 575 DI), rotavators, drone sprayers, harvesters, and seed drills from nearby farm owners.
   - Hourly and daily rate options, operator inclusion toggle, and booking calendar.

8. **Farming Expense & Profit Calculator (खर्च व नफा हिशोब वही)**
   - Granular seasonal ledger (Kharif, Rabi, Summer).
   - Cost centers: Seeds, Fertilizer, Pesticides, Labour, Irrigation, Tractor/Machinery, Transport, Miscellaneous.
   - Output metrics: Gross Revenue, Net Profit/Loss, Profit per Acre, and Cost of Production per Quintal with visual cost distribution charts.

9. **Soil Health Card & Nutrient Management (मृदा आरोग्य)**
   - Record laboratory test parameters: pH, Available Nitrogen (N), Phosphorus (P), Potassium (K), Organic Carbon (OC), and Electrical Conductivity (EC).
   - Automated health classification (Ideal, Needs Care, Alkaline, Acidic) with targeted fertilizer and soil amendment recommendations.

10. **Certified Expert Consultation (कृषी विद्यापीठ तज्ज्ञ)**
    - Directory of certified scientists and agronomists from MPKV Rahuri, PDKV Akola, and VNMKV Parbhani.
    - Free digital consultation request workflow with crop photo submission and written advisory responses.

11. **Multilingual Voice AI Assistant (आवाज सहाय्यक)**
    - Real-time speech-to-text (Web Speech API) and text-to-speech audio playback.
    - Supports Marathi (मराठी - Default), Hindi (हिंदी), and English.
    - Agricultural reasoning answering queries on current Mandi prices, weather alerts, and crop protection.

12. **Master Admin Dashboard (प्रशासक फलक)**
    - System telemetry: GMV, commission revenues, active listings, order statuses.
    - User and KYC verification pipeline (Farmer, Buyer, Expert approval).
    - Dynamic marketplace commission percentage configuration.
    - Security audit logging and CSV order ledger export.

---

## 🔒 Security & Role-Based Access Control (RBAC)

- **4 Core Roles**:
  - `FARMER`: Manages crop listings, orders, farm expenses, soil tests, equipment bookings, and expert consults.
  - `BUYER`: Browses listings, creates orders, tracks shipments, and makes escrow payments.
  - `EXPERT`: Answers assigned farmer queries and provides scientific crop prescriptions.
  - `ADMIN`: Platform moderation, commission configuration, audit log review, and user approvals.
- **Firebase Firestore Security Rules**:
  - Attribute-Based Access Control (ABAC) with default-deny rules (`firestore.rules`).
  - Owner-only write checks and Admin permission gates.
  - Verification of document IDs and strictly bounded string sizes.
- **Server-Side Secrets Protection**:
  - All Gemini API calls run server-side via Express proxy (`/api/*`).
  - API keys are never exposed in browser bundles.

---

## 📱 Android & PWA Compatibility

SHETI MITRA is built with mobile-first responsive design, PWA Web App Manifest, and standard Capacitor readiness:

### Android Packaging with Capacitor:
```bash
# 1. Install Capacitor CLI & Android package
npm install @capacitor/core @capacitor/cli @capacitor/android

# 2. Initialize Capacitor project
npx cap init "Sheti Mitra" "in.shetimitra.app" --web-dir dist

# 3. Build production web bundle
npm run build

# 4. Add Android native platform
npx cap add android

# 5. Open in Android Studio to build APK / AAB
npx cap open android
```

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Canvas Confetti.
- **Backend**: Node.js, Express, tsx.
- **Database & Auth**: Google Cloud Firestore & Firebase Authentication (`firebase-blueprint.json`, `firestore.rules`).
- **AI**: Google Gemini API (`@google/genai` TypeScript SDK with model `gemini-3.8-flash`).

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start full-stack development server (Express backend + Vite client)
npm run dev
# Server will run at http://0.0.0.0:3000
```
