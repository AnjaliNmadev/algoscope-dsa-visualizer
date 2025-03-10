import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./footer";

const DijkstraVisualizer = () => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [distances, setDistances] = useState({});
    const [visitedNodes, setVisitedNodes] = useState([]);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        generateRandomGraph();
    }, []);

    const generateRandomGraph = () => {
        let nodeCount = Math.floor(Math.random() * 10) + 5; // Generate between 5 to 15 nodes
        let autoNodes = [];
        let autoEdges = [];
        let spacingX = 120;
        let spacingY = 120;

        for (let i = 0; i < nodeCount; i++) {
            let randomId = Math.floor(Math.random() * 1000);
            let x = (i % 5) * spacingX + 100;
            let y = Math.floor(i / 4) * spacingY + 100;
            autoNodes.push({ id: randomId, x, y });
        }

        for (let i = 0; i < nodeCount; i++) {
            for (let j = i + 1; j < nodeCount; j++) {
                if (Math.random() > 0.5) { // Randomly connect nodes
                    let weight = Math.floor(Math.random() * 20) + 1;
                    autoEdges.push({ from: autoNodes[i].id, to: autoNodes[j].id, weight });
                }
            }
        }

        setNodes(autoNodes);
        setEdges(autoEdges);
        setDistances({});
        setVisitedNodes([]);
    };

    const dijkstra = (startId) => {
        if (isRunning) return;
        setIsRunning(true);

        let distances = {};
        let visited = new Set();
        let pq = [{ node: startId, dist: 0 }];
        let order = [];

        nodes.forEach(node => distances[node.id] = Infinity);
        distances[startId] = 0;

        const interval = setInterval(() => {
            if (pq.length === 0) {
                clearInterval(interval);
                setIsRunning(false);
                return;
            }

            pq.sort((a, b) => a.dist - b.dist); // Min-Heap Simulation
            let { node: current, dist } = pq.shift();

            if (!visited.has(current)) {
                visited.add(current);
                order.push(current);
                setVisitedNodes([...order]);

                edges
                    .filter(edge => edge.from === current || edge.to === current)
                    .forEach(edge => {
                        let neighbor = edge.from === current ? edge.to : edge.from;
                        let newDist = dist + edge.weight;

                        if (newDist < distances[neighbor]) {
                            distances[neighbor] = newDist;
                            pq.push({ node: neighbor, dist: newDist });
                        }
                    });

                setDistances({ ...distances });
            }
        }, 800);
    };

    return (
        <>
            <Header />
            <div className="container mt-5 py-5">
                <h2 className="text-center mt-5 display-5 fw-bold text-dark mb-4">Dijkstra’s Algorithm</h2>
                <div className="text-center">
                    <button className="btn btn-primary me-2" onClick={generateRandomGraph} disabled={isRunning}>
                        Generate Graph
                    </button>
                    <button className="btn btn-warning" onClick={() => dijkstra(nodes[0]?.id)} disabled={isRunning || nodes.length === 0}>
                        Start Dijkstra
                    </button>
                </div>

                {/* Shortest Path Display */}
                <div className="text-center mt-3">
                    <h5>
                        <strong>Visited Order: </strong>
                        {visitedNodes.length ? visitedNodes.join(" → ") : "None"}
                    </h5>
                </div>

                <div
        style={{
            position: "relative",
            minWidth: "900px", // Ensure inner content is large enough
            minHeight: "500px", // Prevent container from shrinking
        }}
    >
                    {edges.map((edge, index) => {
                        const fromNode = nodes.find(n => n.id === edge.from);
                        const toNode = nodes.find(n => n.id === edge.to);
                        if (!fromNode || !toNode) return null;
                        return (
                            <svg key={index} className="position-absolute" style={{ pointerEvents: "none", width: "100%", height: "100%" }}>
                                <line
                                    x1={fromNode.x}
                                    y1={fromNode.y}
                                    x2={toNode.x}
                                    y2={toNode.y}
                                    stroke="black"
                                    strokeWidth="2"
                                />
                               <text
                  x={(fromNode.x + toNode.x) / 2}
                  y={(fromNode.y + toNode.y) / 2}
                 fill="#e63946"
                 fontSize="14"
                 fontWeight="bold"
                dominantBaseline="middle"
                 textAnchor="middle"
                  >
              {edge.weight}
                   </text>
                            </svg>
                        );
                    })}
                    {nodes.map(node => (
                        <div
                            key={node.id}
                            className="position-absolute d-flex justify-content-center align-items-center rounded-circle"
                            style={{
                                width: "40px",
                                height: "40px",
                                backgroundColor: visitedNodes.includes(node.id) ? "#ffc107" : "#007bff",
                                color: "white",
                                left: node.x - 15,
                                top: node.y - 15,
                                cursor: "pointer",
                                fontSize: "0.8em",
                            }}
                        >
                            {node.id}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DijkstraVisualizer;
