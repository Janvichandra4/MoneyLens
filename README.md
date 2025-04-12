# MoneyLens – Financial Document Intelligence Platform


> “Your finances, visualized and demystified.”
> MoneyLens is an AI-powered financial document intelligence platform that simplifies the way individuals interact with their financial data — turning complex documents into insights, budgets, visual summaries, and peace of mind.

---

## Features at a Glance

### Smart Financial Document Hub  
- Drag-and-drop document uploads (invoices, receipts, tax returns, bank statements)  
- Animated upload progress bar with previews  
- Automatic categorization and OCR processing  

### Emergency Financial Blackbox  
- Military-grade encryption for sensitive info  
- Geo-triggered and biometric emergency access  
- Trusted contact access & offline download modes  
- Organized storage for IDs, insurance, property, estate docs, etc.  

### AI Financial Coach – “Talk to Your FinTwin”  
- Intelligent assistant with chat + voice interface  
- Answers queries like:  
  _“How much did I spend on groceries last month?”_  
  _“Can I afford to upgrade my car?”_  
- Generates budgets, trends, and insights based on uploaded documents  

### Bill Splitting – “Scan. Split. Chill.”  
- Upload a receipt, and the AI scans and splits  
- Assign items to friends with drag-and-drop  
- Tip/tax auto-distribution, payment integration, and beautiful UX  

### Visual Financial Dashboard  
- Scroll-triggered data visualizations  
- Animated charts: spending, savings, category breakdown  
- Quick actions, monthly comparisons, and exportable reports  

### Automated Budgeting  
- AI-generated budgets based on real spending  
- Visual sliders, budget progress bars, and threshold alerts  
- Toggle between weekly/monthly views  

### Financial Horoscope (Fun Gamified Insights)  
- Personality-based financial tips  
- Celestial animations, karma score, daily nudges  

---

## Built With

- Frontend: React, TypeScript, Tailwind CSS  
- Backend: Supabase (Auth + DB), Serverless Functions  
- AI & Automation: OCR engines, GPT integrations (for coach)  
- Animations: Framer Motion, Lottie  
- Responsive: Mobile-first design with full cross-device support  

---

## Project Structure

```bash
/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Core route views
│   ├── utils/              # Helper functions (AI, OCR, etc.)
│   ├── api/                # Supabase and serverless interactions
│   └── styles/             # Theme & animations
├── supabase/               # Supabase SQL + Auth configs
└── README.md
```

---

## Use Case Scenarios

- Preparing for a loan or tax audit? 🧾  
- Lost your wallet during travel? Activate Emergency Mode. 🌍  
- Want to understand your money habits better? Just ask the AI Coach. 🧠  
- Splitting bills with friends after a trip? Let the AI handle the math. 🧮  

---

## Security First

- AES-256 encryption  
- Zero-knowledge architecture (even admins can't view your data)  
- Full audit logging & activity tracking  
- Geo-redundant data backup  
- End-to-end biometric emergency protocols

---

## Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/janvichandra4/moneylens.git
cd moneylens

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env
# Fill in Supabase keys, API tokens, etc.

# 4. Run the dev server
npm run dev
```

---

## 👨‍💻 Team

Built with ❤️ by  
Janvi Chandra – UI/UX Designer, Full-Stack Developer, and AI Enthusiast
Anoushka Garg - Data Scientist, AI Enthusiast, Software Developer
