import React, { useState } from "react";
import Header from "./Header";
import Footer from "./footer";

const LinearSearchVisualizer = () => {
  const [array, setArray] = useState([45, 12, 78, 34, 23, 89, 67, 56, 90, 11]);
  const [target, setTarget] = useState("");
  const [currentIndex, setCurrentIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const [searching, setSearching] = useState(false);
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    if (!target) return;
    setCurrentIndex(null);
    setFoundIndex(null);
    setMessage("");
    setSearching(true);

    for (let i = 0; i < array.length; i++) {
      setCurrentIndex(i);
      await new Promise((resolve) => setTimeout(resolve, 400)); // Animation delay

      if (array[i] === parseInt(target)) {
        setFoundIndex(i);
        setMessage(`✅ Found at index ${i}`);
        setSearching(false);
        return;
      }
    }

    setMessage("❌ Not Found");
    setSearching(false);
  };

  const generateNewArray = () => {
    if (searching) return;
    const newArray = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 500) + 1
    );
    setArray(newArray);
    setCurrentIndex(null);
    setFoundIndex(null);
    setMessage("");
  };

  return (
    <>
      <Header />
      <div className="container text-center mt-6 py-5 bg-light rounded shadow">
        <h2 className="mb-4 text-primary">Linear Search Visualizer</h2>

        <div className="d-flex justify-content-center flex-wrap">
          <input
            type="number"
            placeholder="Enter number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="form-control w-20"
            disabled={searching}
          />
          <button
            onClick={handleSearch}
            className={`btn btns ${searching && "disabled"}`}
            disabled={searching}
          >
            {searching ? "Searching..." : "Search"}
          </button>
          <button
            onClick={generateNewArray}
            className="btn btns"
            disabled={searching}
          >
            Generate New Array
          </button>
        </div>

        <div className="d-flex justify-content-center flex-wrap mb-3 ">
          {array.map((num, index) => (
            <div
              key={index}
              className={`p-3 m-1 border rounded text-center fw-bold shadow  ${
                index === foundIndex
                  ? "bg-success text-white"  : index === currentIndex
                
                  ? "bg-warning text-dark": "bg-light text-dark"   }`}
                  
            
              style={{
                transition: "all 0.4s ease-in-out",
                transform: index === currentIndex ? "scale(1.1)" : "scale(1)",
                fontSize: "20px",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {num}
            </div>
          ))}
        </div>

        {message && <p className="mt-4 fw-bold">{message}</p>}
      </div>
      <Footer />
    </>
  );
};

export default LinearSearchVisualizer;
