import React, { useState } from "react";
import Header from "./Header";
import Footer from "./footer";

const LISVisualizer = () => {
  const [sequence, setSequence] = useState("10, 22, 9, 33, 21, 50, 41, 60, 80");
  const [lisArray, setLisArray] = useState([]);
  const [progress, setProgress] = useState(0);
  const [highlight, setHighlight] = useState(null);
  const [lisResult, setLisResult] = useState([]);

  const parseSequence = () => sequence.split(",").map(num => parseInt(num.trim(), 10)).filter(num => !isNaN(num));

  const calculateLIS = async () => {
    const arr = parseSequence();
    const n = arr.length;
    const lis = Array(n).fill(1);
    const prevIndex = Array(n).fill(-1);

    setProgress(0);
    setLisArray([]);
    setLisResult([]);

    for (let i = 1; i < n; i++) {
      for (let j = 0; j < i; j++) {
        if (arr[i] > arr[j] && lis[i] < lis[j] + 1) {
          lis[i] = lis[j] + 1;
          prevIndex[i] = j;
        }
      }
      setLisArray([...lis]);
      setHighlight(i);
      setProgress(((i + 1) / n) * 100);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    let maxIndex = lis.indexOf(Math.max(...lis));
    let lisSequence = [];
    while (maxIndex !== -1) {
      lisSequence.unshift(arr[maxIndex]);
      maxIndex = prevIndex[maxIndex];
    }
    setLisResult(lisSequence);
  };

  return (
    <>
      <Header />
      <div className="container text-center py-5 shadow p-5" style={{ background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)", minHeight: "100vh" }}>
        <h2 className="display-5 fw-bold text-dark mb-4">Longest Increasing Subsequence</h2>
        
        <input
          type="text"
          value={sequence}
          onChange={(e) => setSequence(e.target.value)}
          className="form-control w-50 mx-auto mb-3 text-center"
          placeholder="Enter sequence (comma-separated)"
        />

        <button onClick={calculateLIS} className="btn btn-success px-5 py-2 fw-semibold shadow mb-4">
          Start Visualization
        </button>

        <div className="progress mb-3" style={{ height: "10px", width: "50%", margin: "0 auto" }}>
          <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="d-flex justify-content-center flex-wrap mb-4">
          {lisArray.map((val, idx) => (
            <div key={idx} className="p-2 m-1 border rounded text-center fw-bold shadow text-white"
              style={{ background: highlight === idx ? "#28a745" : "#007bff", transform: highlight === idx ? "scale(1.1)" : "scale(1)", transition: "all 0.2s ease-in-out" }}>
              {val}
            </div>
          ))}
        </div>

        {lisResult.length > 0 && (
          <h3 className="text-success">LIS: {lisResult.join(", ")}</h3>
        )}
      </div>
      <Footer />
    </>
  );
};

export default LISVisualizer;
