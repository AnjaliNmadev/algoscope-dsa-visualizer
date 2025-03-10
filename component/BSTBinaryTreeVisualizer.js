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
                    strokeWidth="2" 
                />
            )}
            <circle cx={node.x} cy={node.y} r="20" fill={isActive ? "#ffc107" : "#007bff"} stroke="black" strokeWidth="2" />
            <text x={node.x} y={node.y} dy="6" textAnchor="middle" fill="white" fontSize="14px">{node.value}</text>
        </>
    );
};

const BSTBinaryTreeVisualizer = () => {
    const [tree, setTree] = useState(null);
    const [activeNode, setActiveNode] = useState(null);
    const [traversalOrder, setTraversalOrder] = useState([]);
    const [speed, setSpeed] = useState(1000);
    const [deleteValue, setDeleteValue] = useState("");

    useEffect(() => {
        generateRandomTree();
    }, []);

    const generateRandomTree = () => {
        const values = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100));
        let bstRoot = null;
        values.forEach((value) => {
            bstRoot = insertIntoBST(bstRoot, value, 600, 50, 250);
        });
        setTree(bstRoot);
        setTraversalOrder([]);
        setActiveNode(null);
    };

    const insertIntoBST = (node, value, x, y, offset) => {
        if (!node) {
            return { value, x, y, left: null, right: null };
        }
        if (value < node.value) {
            node.left = insertIntoBST(node.left, value, x - offset, y + 100, offset / 1.5);
        } else {
            node.right = insertIntoBST(node.right, value, x + offset, y + 100, offset / 1.5);
        }
        return node;
    };

    const deleteFromBST = (node, value) => {
        if (!node) return null;
        if (value < node.value) {
            node.left = deleteFromBST(node.left, value);
        } else if (value > node.value) {
            node.right = deleteFromBST(node.right, value);
        } else {
            if (!node.left) return node.right;
            if (!node.right) return node.left;
            let minNode = findMin(node.right);
            node.value = minNode.value;
            node.right = deleteFromBST(node.right, minNode.value);
        }
        return node;
    };

    const findMin = (node) => {
        while (node.left) node = node.left;
        return node;
    };

    const handleDelete = () => {
        setTree(deleteFromBST(tree, parseInt(deleteValue)));
        setDeleteValue("");
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
            <div className="container text-center mt-5 py-5">
                <h2 className="mb-4 mt-5 fw-bold">Binary Search Tree</h2>
                <div>
                    <button className="btn btn-primary me-2 mt-5" onClick={generateRandomTree}>Generate Tree</button>
                    <button className="btn btn-success me-2 mt-5" onClick={() => traverseDFS("preorder")}>
                        Preorder
                    </button>
                    <button className="btn btn-warning me-2 mt-5" onClick={() => traverseDFS("inorder")}>
                        Inorder
                    </button>
                    <button className="btn btn-danger mt-5" onClick={() => traverseDFS("postorder")}>
                        Postorder
                    </button>
                </div>
                <div className="mt-3">
                    <label>Speed: </label>
                    <input type="range" min="200" max="2000" step="100" value={speed} 
                        onChange={(e) => setSpeed(Number(e.target.value))} className="form-control"/>
                </div>
                <div className="mt-3">
                    <input type="number" placeholder="Delete Value" value={deleteValue} 
                        onChange={(e) => setDeleteValue(e.target.value)} />
                    <button className="btn btns ms-2" onClick={handleDelete}>Delete</button>
                </div>
                <div className="position-relative my-3" style={{ height: "600px", width: "80vw", border: "1px solid black", overflow: "auto" }}>
                    <svg className="position-absolute w-100 h-100 mt-5" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMin meet">
                        {tree && renderTree(tree, activeNode)}
                    </svg>
                </div>
                <h5 className="mt-5">Traversal Order: {traversalOrder.join(" → ")}</h5>
            </div>
            <Footer />
        </>
    );
};

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

export default BSTBinaryTreeVisualizer;
