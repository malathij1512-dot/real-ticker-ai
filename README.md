Real Ticker – AI Powered Stock Insights

 Project Overview:

Real Ticker is an AI-powered stock analysis dashboard that displays the Top 10 stocks with 6-month historical data and generates AI-based trend insights, risk levels, and investment suggestions.

---
Tech Stack:

- Frontend: React.js
- Backend: Flask (Python)
- LLM: Hugging Face – FLAN-T5
- Data Source: Mock JSON (stocks.json)

---

 Setup Steps:

1️⃣ Clone Project

git clone <your-repo-link>
cd Real Ticker

---

2️⃣ Backend Setup:

cd backend
pip install -r requirements.txt
python app.py

Backend runs on:
http://127.0.0.1:5000

---

3️⃣ Frontend Setup:

cd frontend
npm install
npm start

Frontend runs on:
http://localhost:3000

---

 Architecture Diagram:

            ┌──────────────┐
            │   React UI   │
            │  (Frontend)  │
            └──────┬───────┘
                   │ API Calls
                   ▼
            ┌──────────────┐
            │   Flask API  │
            │  (Backend)   │
            └──────┬───────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
┌──────────────┐     ┌────────────────┐
│ stocks.json  │     │ Hugging Face    │
│ Mock Data    │     │ FLAN-T5 LLM    │
└──────────────┘     └────────────────┘
        │                     │
        └──────────┬──────────┘
                   ▼
            AI Trend Analysis
     (Upward / Downward / Sideways,
       Risk & Suggestions)

---

LLM Used:

Model: FLAN-T5 (Hugging Face)

Usage

The LLM is used to:

- Analyze 6-month stock price history
- Identify trend direction:
   - Upward
   - Downward
   - Sideways
- Predict risk level:
   - Low
   - Medium
   - High
- Generate investment suggestions:
   - Buy / Hold / Avoid / Monitor

---

API Endpoints:

GET "/api/stocks/top10"
→ Fetch Top 10 stocks

GET "/api/stocks/{ticker}/history"
→ Fetch 6-month history

POST "/api/stocks/{ticker}/analyze"
→ AI trend analysis

---

 Disclaimer:

This is AI-generated analysis and not financial advice.
Developed for technical assessment/demo purposes only.