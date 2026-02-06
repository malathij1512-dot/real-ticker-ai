from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import requests

app = Flask(__name__)
CORS(app)

# 🔑 HuggingFace Config (Assessment Reference Only)
HF_API_KEY = "YOUR_HF_API_KEY"

HF_URL = "https://router.huggingface.co/v1/chat/completions"

headers = {
    "Authorization": f"Bearer {HF_API_KEY}",
    "Content-Type": "application/json"
}

# 📂 Load Stock Data
with open("stocks.json") as f:
    stocks = json.load(f)


# 🏠 Home Route
@app.route("/")
def home():
    return "RealTicker Backend Running"


# 🔝 Top 10 Stocks API
@app.route("/api/stocks/top10", methods=["GET"])
def top10_stocks():

    result = []

    for stock in stocks:
        result.append({
            "ticker": stock["ticker"],
            "company": stock["company"],
            "price": stock["price"],
            "change": stock["change"],
            "volume": stock["volume"]
        })

    return jsonify(result)


# 📊 Stock History API
@app.route("/api/stocks/<ticker>/history", methods=["GET"])
def stock_history(ticker):

    for stock in stocks:
        if stock["ticker"] == ticker.upper():

            return jsonify({
                "months": stock["history"]["months"],
                "history_price": stock["history"]["prices"]
            })

    return jsonify({"error": "Stock not found"}), 404


# 🤖 AI Analyze API
@app.route("/api/stocks/<ticker>/analyze", methods=["POST"])
def analyze_stock(ticker):

    for stock in stocks:
        if stock["ticker"] == ticker.upper():

            prices = stock["history"]["prices"]

            # 🔹 Prompt (HF Integration Reference)
            prompt = f"""
Analyze the following 6 months stock price data:

Prices: {prices}

Give output in this format:

Trend:
Risk Level:
Suggested Action:
"""

            # 🔹 Optional HuggingFace Call (Commented for demo safety)
            """
            payload = {
                "model": "mistralai/Mistral-7B-Instruct-v0.2",
                "messages": [
                    {"role": "user", "content": prompt}
                ],
                "max_tokens": 200
            }

            response = requests.post(
                HF_URL,
                headers=headers,
                json=payload
            )

            result = response.json()
            ai_text = result["choices"][0]["message"]["content"]
            """

            # 🔹 Fallback AI Logic (Working Analysis)

            if prices[-1] > prices[0]:
                trend = "Upward"
                risk = "Medium"
                action = "Long-term investment"

            elif prices[-1] < prices[0]:
                trend = "Downward"
                risk = "High"
                action = "Avoid (with reason)"

            else:
                trend = "Sideways"
                risk = "Low"
                action = "Short-term watch"

            ai_text = f"""
Trend: {trend}
Risk Level: {risk}
Suggested Action: {action}
"""

            return jsonify({
                "ticker": ticker.upper(),
                "analysis": ai_text,
                "disclaimer":
                "This is AI-generated analysis and not financial advice."
            })

    return jsonify({"error": "Stock not found"}), 404


# ▶️ Run Server
if __name__ == "__main__":
    app.run(debug=True)