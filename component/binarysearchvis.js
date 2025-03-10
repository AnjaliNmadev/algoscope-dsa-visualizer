import React, { useState, useEffect } from "react";

import Footer from "./footer";
import Header from "./Header";


const BinarySearchVisualizer = () => {
  const generateNewArray = () => {
    const newArr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100)).sort((a, b) => a - b);
    setArray(newArr);
    setLow(0);
    setHigh(newArr.length - 1);
    setMid(null);
    setFound(false);
    setAnimating(false);
  };

  const [array, setArray] = useState([1, 3, 5, 7, 9, 11, 13, 15]);
  const [target, setTarget] = useState(7);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(array.length - 1);
  const [mid, setMid] = useState(null);
  const [found, setFound] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (animating && !found) {
      const timer = setTimeout(() => {
        stepSearch();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [animating, low, high]);

  const stepSearch = () => {
    if (low <= high && !found) {
      let middle = Math.floor((low + high) / 2);
      setMid(middle);

      setTimeout(() => {
        if (array[middle] === target) {
          setFound(true);
          setAnimating(false);
        } else if (array[middle] < target) {
          setLow(middle + 1);
        } else {
          setHigh(middle - 1);
        }
      }, 500);
    } else {
      setAnimating(false);
    }
  };

  const startAnimation = () => {
    setAnimating(true);
  };

  const resetSearch = () => {
    setLow(0);
    setHigh(array.length - 1);
    setMid(null);
    setFound(false);
    setAnimating(false);
  };

  return (

    <>
  <Header/>

  <div className="mt-5">
    <div className="container text-center mt-6 py-5 bg-light rounded shadow ">
      <h2 className="mb-4 text-primary">Binary Search Visualizer</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control text-center  shadow-sm"
          value={array.join(", ")}
          readOnly
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          className="form-control text-center  shadow-sm"
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
        />
      </div>
      <div className="d-flex justify-content-center flex-wrap mb-3">
        {array.map((num, index) => (
          <div
            key={index}
            className={`p-3 m-1 border rounded text-center fw-bold shadow ${
              index === mid ? "bg-success" : "bg-white"
            } ${found && index === mid ? "bg-success text-white" : ""}`}
            style={{ width: "60px", fontSize: "1.2rem" }}
          >
            {num}
          </div>
        ))}
      </div>
      <div className="mt-3">
        <button className="btn btns m-2 shadow" onClick={generateNewArray} disabled={animating}>
          Generate New Array
        </button>
        <button className="btn btns m-2 shadow" onClick={startAnimation} disabled={found || animating}>
          Start Animation
        </button>
        <button className="btn btns m-2 shadow" onClick={resetSearch} disabled={animating}>
          Reset
        </button>
      </div>
    </div>
    </div>
    <Footer/>
    </>
  );
};

export default BinarySearchVisualizer;
