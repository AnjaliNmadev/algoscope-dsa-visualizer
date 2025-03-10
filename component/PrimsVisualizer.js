import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./footer";

const PrimsVisualizer = () => {
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
                let weight = Math.floor(Math.random() * 20) + 1;
                autoEdges.push({ from: autoNodes[i].id, to: autoNodes[j].id, weight });
            }
        }

        setNodes(autoNodes);
        setEdges(autoEdges);
        setMstEdges([]);
        setVisitedNodes([]);
    };

    const primsAlgorithm = () => {
        if (isRunning) return;
        setIsRunning(true);

        let visited = new Set();
        let mst = [];
        let edgeQueue = [];

        let startNode = nodes[0]?.id;
        if (!startNode) return;

        visited.add(startNode);
        setVisitedNodes([startNode]);

        edges.forEach((edge) => {
            if (edge.from === startNode || edge.to === startNode) {
                edgeQueue.push(edge);
            }
        });

        edgeQueue.sort((a, b) => a.weight - b.weight);

        const interval = setInterval(() => {
            if (visited.size === nodes.length || edgeQueue.length === 0) {
                clearInterval(interval);
                setIsRunning(false);
                return;
            }

            let nextEdge = edgeQueue.shift();
            let newNode = visited.has(nextEdge.from) ? nextEdge.to : nextEdge.from;

            if (!visited.has(newNode)) {
                visited.add(newNode);
                mst.push(nextEdge);
                setMstEdges([...mst]);
                setVisitedNodes([...visited]);

                edges.forEach((edge) => {
                    if ((edge.from === newNode || edge.to === newNode) && !visited.has(edge.from) && !visited.has(edge.to)) {
                        edgeQueue.push(edge);
                    }
                });
                
                edgeQueue.sort((a, b) => a.weight - b.weight);
            }
        }, 1000);
    };

    return (
        <>
            <Header />
            <div className="container mt-5 py-5">
                <h2 className="text-center mt-5 display-5 fw-bold text-dark mb-4">Prim's Algorithm</h2>
                <div className="text-center">
                    <button className="btn btn-primary me-2 mt-5" onClick={generateRandomGraph} disabled={isRunning}>
                        Generate Graph
                    </button>
                    <button className="btn btn-success mt-5" onClick={primsAlgorithm} disabled={isRunning || nodes.length === 0}>
                        Start Prim's Algorithm
                    </button>
                </div>

                <div className="text-center mt-5">
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
                        const fromNode = nodes.find((n) => n.id === edge.from);
                        const toNode = nodes.find((n) => n.id === edge.to);
                        if (!fromNode || !toNode) return null;
                        return (
                            <svg key={index} className="position-absolute" style={{ pointerEvents: "none", width: "100%", height: "100%" }}>
                                <line x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y} stroke={mstEdges.includes(edge) ? "green" : "black"} strokeWidth="2" />
                                <text x={(fromNode.x + toNode.x) / 2} y={(fromNode.y + toNode.y) / 2} fill="red" fontSize="16px" fontWeight="bold">
                                    {edge.weight}
                                </text>
                            </svg>
                        );
                    })}
                    {nodes.map((node) => (
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
                                position: "absolute",
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

export default PrimsVisualizer;
