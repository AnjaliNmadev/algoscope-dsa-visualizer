import React, { useState } from "react";
import Header from "./Header";
import Footer from "./footer";

const Fibonaccisequence = () => {
  const [fibMemoValues, setFibMemoValues] = useState([]);
  const [fibTabValues, setFibTabValues] = useState([]);
  const [highlightMemo, setHighlightMemo] = useState(null);
  const [highlightTab, setHighlightTab] = useState(null);
  const [progressMemo, setProgressMemo] = useState(0);
  const [progressTab, setProgressTab] = useState(0);
  const [method, setMethod] = useState(null);
  const [n, setN] = useState(10);

  const fibMemo = (n, memo = {}) => {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    return memo[n];
  };

  const fibTabulation = (n) => {
    let dp = Array(n + 1).fill(0);
    dp[1] = 1;
    for (let i = 2; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp;
  };

  const calculateFib = async () => {
    if (!method) return;
    let memoValues = [];
    let tabValues = fibTabulation(n);
    setProgressMemo(0);
    setProgressTab(0);

    for (let i = 0; i <= n; i++) {
      if (method === "memoization") {
        memoValues.push(fibMemo(i));
        setFibMemoValues([...memoValues]);
        setHighlightMemo(i);
        setProgressMemo(((i + 1) / (n + 1)) * 100);
      } else if (method === "tabulation") {
        setFibTabValues(tabValues.slice(0, i + 1));
        setHighlightTab(i);
        setProgressTab(((i + 1) / (n + 1)) * 100);
      }
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  };

  return (
    <>
      <Header />
      <div className="container text-center py-5 shadow p-4" style={{ background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)", minHeight: "100vh" }}>
        <h2 className="display-5 fw-bold text-dark mb-4">Fibonacci Sequence </h2>
        
        <input
          type="number"
          value={n}
          onChange={(e) => setN(Math.max(1, parseInt(e.target.value) || 1))}
          className="form-control w-25 mx-auto mb-3 text-center"
          placeholder="Enter number"
        />
        
        <div className="d-flex justify-content-center gap-3 mb-4">
          <button onClick={() => setMethod("memoization")} className={`btn ${method === "memoization" ? "btn-primary" : "btn-outline-primary"} px-4 py-2 fw-semibold shadow`}>
            Memoization
          </button>
          <button onClick={() => setMethod("tabulation")} className={`btn ${method === "tabulation" ? "btn-danger" : "btn-outline-danger"} px-4 py-2 fw-semibold shadow`}>
            Tabulation
          </button>
        </div>
        
        <button onClick={calculateFib} className="btn btn-success px-5 py-2 fw-semibold shadow mb-4">
          Start Visualization
        </button>
        
        {method === "memoization" && (
          <>
            <h3 className="text-primary">Memoization (Top-Down)</h3>
            <div className="progress mb-3" style={{ height: "10px", width: "50%", margin: "0 auto" }}>
              <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: `${progressMemo}%` }}></div>
            </div>
            <div className="d-flex justify-content-center flex-wrap mb-4">
              {fibMemoValues.map((val, idx) => (
                <div key={idx}>
                  <div className="p-3 m-1 border rounded text-center fw-bold shadow text-white" style={{ background: idx === highlightMemo ? "#28a745" : "#007bff", transform: idx === highlightMemo ? "scale(1.1)" : "scale(1)", transition: "all 0.2s ease-in-out" }}>
                    F({idx}) = {val}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {method === "tabulation" && (
          <>
            <h3 className="text-danger">Tabulation (Bottom-Up)</h3>
            <div className="progress mb-3" style={{ height: "10px", width: "50%", margin: "0 auto" }}>
              <div className="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" style={{ width: `${progressTab}%` }}></div>
            </div>
            <div className="d-flex justify-content-center flex-wrap mb-4">
              {fibTabValues.map((val, idx) => (
                <div key={idx}>
                  <div className="p-3 m-1 border rounded text-center fw-bold shadow text-white" style={{ background: idx === highlightTab ? "#dc3545" : "#17a2b8", transform: idx === highlightTab ? "scale(1.1)" : "scale(1)", transition: "all 0.2s ease-in-out" }}>
                    F({idx}) = {val}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Fibonaccisequence;