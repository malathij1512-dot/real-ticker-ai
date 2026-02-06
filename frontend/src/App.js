import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StockTable from "./StockTable";
import StockDetail from "./StockDetail";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>RealTicker – Stock Dashboard</h1>

        <Routes>
          {/* Top 10 Stocks Page */}
          <Route path="/" element={<StockTable />} />

          {/* Stock Detail Page */}
          <Route path="/stock/:ticker" element={<StockDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
