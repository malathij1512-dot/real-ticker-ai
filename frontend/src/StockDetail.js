import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function StockDetail() {
  const { ticker } = useParams();

  const [history, setHistory] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [disclaimer, setDisclaimer] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Load stock history
  useEffect(() => {
    fetch(`http://localhost:5000/api/stocks/${ticker}/history`)
      .then(res => res.json())
      .then(data => {
        console.log("History API:", data);
        setHistory(data);   // ✅ direct set
      })
      .catch(err => console.log(err));
  }, [ticker]);

  // 🔹 Analyze with AI
  const analyzeStock = () => {
    setLoading(true);

    fetch(`http://localhost:5000/api/stocks/${ticker}/analyze`, {
      method: "POST"
    })
      .then(res => res.json())
      .then(data => {
        console.log("AI Result:", data);

        setAnalysis(data.analysis);
        setDisclaimer(data.disclaimer);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  // 🔹 Loading state
  if (!history) return <p>Loading history...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{ticker} – 6 Months History</h2>

      {/* History Table */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Month</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {history.months.map((month, index) => (
            <tr key={index}>
              <td>{month}</td>
              <td>{history.history_price[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      {/* Analyze Button */}
      <button onClick={analyzeStock}>
        Analyze with AI
      </button>

      {/* Loading */}
      {loading && <p>Analyzing with AI...</p>}

      {/* AI Result */}
      {analysis && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px"
          }}
        >
          <h3>AI Analysis</h3>

          <pre>{analysis}</pre>

          {/* Disclaimer */}
          <p style={{ fontSize: "12px", color: "gray" }}>
            {disclaimer}
          </p>
        </div>
      )}
    </div>
  );
}

export default StockDetail;