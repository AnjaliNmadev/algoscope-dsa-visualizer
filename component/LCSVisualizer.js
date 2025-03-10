import React, { useState } from "react";
import Header from "./Header";
import Footer from "./footer";


const LCSVisualizer = () => {
  const [str1, setStr1] = useState("AGGTAB");
  const [str2, setStr2] = useState("GXTXAYB");
  const [lcsMatrix, setLcsMatrix] = useState([]);
  const [lcsResult, setLcsResult] = useState("");
  const [progress, setProgress] = useState(0);
  const [highlight, setHighlight] = useState(null);

  const calculateLCS = async () => {
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1)
      .fill(null)
      .map(() => Array(n + 1).fill(0));

    setProgress(0);
    setLcsMatrix([]);
    setLcsResult("");

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
        setLcsMatrix(dp.map(row => [...row]));
        setHighlight([i, j]);
        setProgress(((i * n + j) / (m * n)) * 100);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }

    let i = m, j = n;
    let lcsStr = "";
    while (i > 0 && j > 0) {
      if (str1[i - 1] === str2[j - 1]) {
        lcsStr = str1[i - 1] + lcsStr;
        i--;
        j--;
      } else if (dp[i - 1][j] > dp[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }
    setLcsResult(lcsStr);
  };

  return (
    <>
      <Header />
      <div className="container text-center py-5 shadow p-4" style={{ background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)", minHeight: "100vh" }}>
        <h2 className="display-5 fw-bold text-dark mb-4">Longest Common Subsequence</h2>
        
        <input
          type="text"
          value={str1}
          onChange={(e) => setStr1(e.target.value)}
          className="form-control w-50 mx-auto mb-3 text-center"
          placeholder="Enter first string"
        />
        
        <input
          type="text"
          value={str2}
          onChange={(e) => setStr2(e.target.value)}
          className="form-control w-50 mx-auto mb-3 text-center"
          placeholder="Enter second string"
        />

        <button onClick={calculateLCS} className="btn btn-success px-5 py-2 fw-semibold shadow mb-4">
          Start Visualization
        </button>

        <div className="progress mb-3" style={{ height: "10px", width: "50%", margin: "0 auto" }}>
          <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="d-flex justify-content-center flex-wrap mb-4">
          {lcsMatrix.map((row, i) => (
            <div key={i} className="d-flex">
              {row.map((val, j) => (
                <div key={j} className="p-2 m-1 border rounded text-center fw-bold shadow text-white"
                  style={{ background: highlight && highlight[0] === i && highlight[1] === j ? "#28a745" : "#007bff", transform: highlight && highlight[0] === i && highlight[1] === j ? "scale(1.1)" : "scale(1)", transition: "all 0.2s ease-in-out" }}>
                  {val}
                </div>
              ))}
            </div>
          ))}
        </div>

        {lcsResult && (
          <h3 className="text-success">LCS: {lcsResult}</h3>
        )}
      </div>
      <Footer />
    </>
  );
};

export default LCSVisualizer;
