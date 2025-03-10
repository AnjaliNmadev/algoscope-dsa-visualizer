import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./footer";

const KruskalVisualizer = () => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [mstEdges, setMstEdges] = useState([]);
    const [visitedNodes, setVisitedNodes] = useState([]);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        generateRandomGraph();
    }, []);

    const generateRandomGraph = () => {
        let nodeCount = Math.floor(Math.random() * 10) + 5;
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
                if (Math.random() > 0.5) {
                    let weight = Math.floor(Math.random() * 20) + 1;
                    autoEdges.push({ from: autoNodes[i].id, to: autoNodes[j].id, weight });
                }
            }
        }

        setNodes(autoNodes);
        setEdges(autoEdges);
        setMstEdges([]);
        setVisitedNodes([]);
    };

    const find = (parent, i) => {
        if (parent[i] === i) return i;
        return find(parent, parent[i]);
    };

    const union = (parent, rank, x, y) => {
        let rootX = find(parent, x);
        let rootY = find(parent, y);

        if (rootX !== rootY) {
            if (rank[rootX] < rank[rootY]) {
                parent[rootX] = rootY;
            } else if (rank[rootX] > rank[rootY]) {
                parent[rootY] = rootX;
            } else {
                parent[rootY] = rootX;
                rank[rootX]++;
            }
        }
    };

    const kruskal = () => {
        if (isRunning) return;
        setIsRunning(true);

        let sortedEdges = [...edges].sort((a, b) => a.weight - b.weight);
        let parent = {};
        let rank = {};
        nodes.forEach(node => {
            parent[node.id] = node.id;
            rank[node.id] = 0;
        });

        let mst = [];
        let visited = new Set();
        let edgeIndex = 0;

        const interval = setInterval(() => {
            if (mst.length === nodes.length - 1 || edgeIndex >= sortedEdges.length) {
                clearInterval(interval);
                setIsRunning(false);
                return;
            }

            let edge = sortedEdges[edgeIndex];
            let rootFrom = find(parent, edge.from);
            let rootTo = find(parent, edge.to);

            if (rootFrom !== rootTo) {
                mst.push(edge);
                visited.add(edge.from);
                visited.add(edge.to);
                union(parent, rank, rootFrom, rootTo);
            }

            edgeIndex++;
            setMstEdges([...mst]);
            setVisitedNodes([...visited]);
        }, 800);
    };

    return (
        <>
            <Header />
            <div className="container mt-5 py-5">
                <h2 className="text-center mt-5 display-5 fw-bold text-dark mb-4">Kruskal’s Algorithm</h2>
                <div className="text-center">
                    <button className="btn btn-primary me-2" onClick={generateRandomGraph} disabled={isRunning}>
                        Generate Graph
                    </button>
                    <button className="btn btn-success" onClick={kruskal} disabled={isRunning || nodes.length === 0}>
                        Start Kruskal
                    </button>
                </div>

                <div className="text-center mt-3">
                    <h5>
                        <strong>Visited Nodes: </strong>
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
                                    stroke={mstEdges.includes(edge) ? "green" : "black"}
                                    strokeWidth="2"
                                />
                                <text
                                    x={(fromNode.x + toNode.x) / 2}
                                    y={(fromNode.y + toNode.y) / 2}
                                    fill="red"
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
                                backgroundColor: visitedNodes.includes(node.id) ? "#28a745" : "#007bff",
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

export default KruskalVisualizer;
