import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./footer";

const TreeNode = ({ node, isActive }) => {
    return (
        <>
            {node.left && (
                <line 
                    x1={node.x} 
                    y1={node.y} 
                    x2={node.left.x} 
                    y2={node.left.y} 
                    stroke="black" 
                    strokeWidth="2" 
                />
            )}
            {node.right && (
                <line 
                    x1={node.x} 
                    y1={node.y} 
                    x2={node.right.x} 
                    y2={node.right.y} 
                    stroke="black" 
                    strokeWidth="3" 
                />
            )}
            <circle cx={node.x} cy={node.y} r="20" fill={isActive ? "#ffc107" : "#007bff"} stroke="black" strokeWidth="2" />
            <text x={node.x} y={node.y} dy="6" textAnchor="middle" fill="white" fontSize="14px">{node.value}</text>
        </>
    );
};

const DFSBinaryTreeVisualizer = () => {
    const [tree, setTree] = useState(null);
    const [activeNode, setActiveNode] = useState(null);
    const [traversalOrder, setTraversalOrder] = useState([]);
    const [speed, setSpeed] = useState(1000);

    useEffect(() => {
        generateRandomTree();
    }, []);

    generateRandomTree = () => {
        const values = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100));
        const newTree = buildBinaryTree(values, 600, 50, 250); // Adjusted X offset
        setTree(newTree);
        setTraversalOrder([]);
        setActiveNode(null);
    };
    
    const buildBinaryTree = (values, x, y, offset) => {
        if (values.length === 0) return null;
        const mid = Math.floor(values.length / 2);
        return {
            value: values[mid],
            x: Math.max(50, Math.min(1200, x)), // Prevents nodes from going too far left/right
            y: Math.max(50, y), // Ensures nodes stay within bounds
            left: buildBinaryTree(values.slice(0, mid), x - offset, y + 100, offset / 1.5),
            right: buildBinaryTree(values.slice(mid + 1), x + offset, y + 100, offset / 1.5),
        };
    };
    
    const traverseDFS = (type) => {
        let order = [];

        const dfs = (node) => {
            if (!node) return;
            if (type === "preorder") order.push(node);
            dfs(node.left);
            if (type === "inorder") order.push(node);
            dfs(node.right);
            if (type === "postorder") order.push(node);
        };

        dfs(tree);
        animateTraversal(order);
    };

    const animateTraversal = (order) => {
        setTraversalOrder(order.map(node => node.value));
        let index = 0;
        const interval = setInterval(() => {
            if (index >= order.length) {
                clearInterval(interval);
                return;
            }
            setActiveNode(order[index].value);
            index++;
        }, speed);
    };

    return (
        <>
            <Header />
            <div className="container text-center mt-6 py-6">
                <h2 className="mb-4 mt-5 fw-bold">Depth-First Search (DFS) Binary Tree</h2>
                <div>
                    <button className="btn btn-primary me-2   mt-5" onClick={generateRandomTree}>Generate Tree</button>
                    <button className="btn btn-success me-2  mt-5" onClick={() => traverseDFS("preorder")}>
                        Preorder
                    </button>
                    <button className="btn btn-warning me-2 mt-5" onClick={() => traverseDFS("inorder")}>
                        Inorder
                    </button>
                    <button className="btn btn-danger mt-5" onClick={() => traverseDFS("postorder")}>
                        Postorder
                    </button>
                </div>
                <div className="my-3">
                    <label>Speed: </label>
                    <input type="range" min="200" max="2000" step="100" value={speed} 
                        onChange={(e) => setSpeed(e.target.value)} />
                </div>
                <div className="position-relative mt-4" style={{ height: "600px", width: "80vw", border: "1px solid black", overflow: "auto"  }}>

                <svg className="position-absolute w-100 h-100 mt-5"   viewBox="0 0 1200 500" preserveAspectRatio="xMidYMin meet">

                        {tree && renderTree(tree, activeNode)}
                    </svg>
                </div>
                <h5 className="mt-5">Traversal Order: {traversalOrder.join(" → ")}</h5>
            </div>
            <Footer />
        </>
    );
};

// Render tree with nodes and edges together
const renderTree = (node, activeNode) => {
    if (!node) return null;
    return (
        <>
            <TreeNode node={node} isActive={node.value === activeNode} />
            {node.left && renderTree(node.left, activeNode)}
            {node.right && renderTree(node.right, activeNode)}
        </>
    );
};

export default DFSBinaryTreeVisualizer;
