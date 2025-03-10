import React, { useState } from "react";
import Header from "./Header";
import Footer from "./footer";


const KnapsackVisualizer = () => {
  const [items, setItems] = useState([
    { weight: 2, value: 3 },
    { weight: 3, value: 4 },
    { weight: 4, value: 5 },
    { weight: 5, value: 6 },
  ]);
  const [capacity, setCapacity] = useState(5);
  const [selectedItems, setSelectedItems] = useState([]);
  const [highlight, setHighlight] = useState(null);
  const [newWeight, setNewWeight] = useState("");
  const [newValue, setNewValue] = useState("");

  const knapsackDP = async () => {
    const n = items.length;
    const dp = Array(n + 1)
      .fill(null)
      .map(() => Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
      for (let w = 1; w <= capacity; w++) {
        if (items[i - 1].weight <= w) {
          dp[i][w] = Math.max(
            items[i - 1].value + dp[i - 1][w - items[i - 1].weight],
            dp[i - 1][w]
          );
        } else {
          dp[i][w] = dp[i - 1][w];
        }
        setHighlight([i, w]);
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    }

    let w = capacity;
    let selected = [];
    for (let i = n; i > 0 && w > 0; i--) {
      if (dp[i][w] !== dp[i - 1][w]) {
        selected.push(items[i - 1]);
        w -= items[i - 1].weight;
      }
    }
    setSelectedItems(selected);
  };

  const addItem = () => {
    if (newWeight && newValue) {
      setItems([...items, { weight: parseInt(newWeight), value: parseInt(newValue) }]);
      setNewWeight("");
      setNewValue("");
    }
  };

  return (
    <>
    <Header/>
    <div className="container text-center mt-6 py-5  rounded bg-light" style={{ maxWidth: "800px" }}>
      <h2 className="mb-4 text-primary fw-bold">Knapsack Problem Visualizer</h2>
      <div className="mb-3 d-flex justify-content-center gap-2">
        <input
          type="number"
          placeholder="Weight"
          className="form-control w-25"
          value={newWeight}
          onChange={(e) => setNewWeight(e.target.value)}
        />
        <input
          type="number"
          placeholder="Value"
          className="form-control w-25"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <button className="btn btn-info" onClick={addItem}>Add Item</button>
      </div>
      <input
        type="number"
        placeholder="Capacity"
        className="form-control w-25 mx-auto mb-3"
        value={capacity}
        onChange={(e) => setCapacity(parseInt(e.target.value))}
      />
      <button className="btn btn-lg btn-success mb-3 shadow" onClick={knapsackDP}>
        Start Visualization
      </button>
      <h4 className="mt-4 text-success fw-bold">Selected Items:</h4>
      <ul className="list-group shadow">
        {selectedItems.map((item, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <span className="fw-bold">Weight: {item.weight}, Value: {item.value}</span>
            <span className="badge bg-primary rounded-pill">✔</span>
          </li>
        ))}
      </ul>
      <h4 className="mt-4 text-dark fw-bold">Knapsack Table:</h4>
      <div className="table-responsive">
        <table className="table table-bordered table-striped shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Item</th>
              <th>Weight</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className={highlight && highlight[0] === index + 1 ? "table-warning" : ""}>
                <td>{index + 1}</td>
                <td>{item.weight}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <Footer/>
    </>
  );
};

export default KnapsackVisualizer;