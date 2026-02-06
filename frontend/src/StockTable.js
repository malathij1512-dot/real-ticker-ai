import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function StockTable() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/stocks/top10")
      .then(res => res.json())
      .then(data => setStocks(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Top 10 Stocks</h2>

      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Company</th>
            <th>Price</th>
            <th>Change (%)</th>
            <th>Volume</th>
          </tr>
        </thead>

        <tbody>
          {stocks.map(stock => (
            <tr key={stock.ticker}>
              <td>
                <Link to={`/stock/${stock.ticker}`}>
                  {stock.ticker}
                </Link>
              </td>
              <td>{stock.company}</td>
              <td>{stock.price}</td>
              <td>
                {stock.change > 0 ? "+" : ""}
                {stock.change}%
              </td>
              <td>{stock.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockTable;
