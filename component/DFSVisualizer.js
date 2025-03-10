import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./footer";

const DFSVisualizer = () => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [dfsOrder, setDfsOrder] = useState([]);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        generateRandomNodes();
    }, []);

    const generateRandomNodes = () => {
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

            if (i > 0) {
                let parentIndex = Math.floor(Math.random() * i);
                autoEdges.push({ from: autoNodes[parentIndex].id, to: randomId });
            }
        }

        setNodes(autoNodes);
        setEdges(autoEdges);
        setDfsOrder([]); // Reset DFS order
    };

    const dfs = (startId) => {
        if (isRunning) return;
        setIsRunning(true);
        let stack = [startId];
        let visited = new Set();
        let order = [];

        const interval = setInterval(() => {
            if (stack.length === 0) {
                clearInterval(interval);
                setIsRunning(false);
                return;
            }
            const current = stack.pop();
            if (!visited.has(current)) {
                visited.add(current);
                order.push(current);
                setDfsOrder([...order]);

                const neighbors = edges
                    .filter((edge) => edge.from === current || edge.to === current)
                    .map((edge) => (edge.from === current ? edge.to : edge.from))
                    .filter((neighbor) => !visited.has(neighbor));

                stack.push(...neighbors.reverse()); // Reverse for proper DFS order
            }
        }, 800);
    };

    return (
        <>
            <Header />

          
            <div className="border rounded bg-light position-relative mt-5 py-6 "   style={{
            marginTop:"200px"
        }}>
    
                <h2 className="text-center mt-5 display-5 fw-bold text-dark mb-4">Depth First Search</h2>
                <div className="text-center">
                    <button className="btn btn-primary me-2" onClick={generateRandomNodes} disabled={isRunning}>
                        Generate Nodes
                    </button>
                    <button className="btn btn-success" onClick={() => dfs(nodes[0]?.id)} disabled={isRunning || nodes.length === 0}>
                        Start DFS
                    </button>
                </div>

                {/* Traversal Order Display */}
                <div className="text-center mt-3">
                    <h5>
                        <strong>Traversal Order: </strong>
                        {dfsOrder.length ? dfsOrder.join(" → ") : "None"}
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
                                <line x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y} stroke="black" strokeWidth="2" />
                            </svg>
                        );
                    })}
                    {nodes.map((node) => (
                        <div
                            key={node.id}
                            className="position-absolute d-flex justify-content-center align-items-center rounded-circle"
                            style={{
                                width: "30px",
                                height: "30px",
                                backgroundColor: dfsOrder.includes(node.id) ? "#28a745" : "#007bff",
                                color: "white",
                                left: node.x - 15,
                                top: node.y - 15,
                                cursor: "pointer",
                                position: "absolute",
                                fontSize: "0.8em",
                                overflowX: "auto"
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

export default DFSVisualizer;
