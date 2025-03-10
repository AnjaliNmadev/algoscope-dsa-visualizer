import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./footer";

const TreeNode = ({ node, isActive, isLCA }) => {
    return (
        <>
            {node.left && (
                <line x1={node.x} y1={node.y} x2={node.left.x} y2={node.left.y} stroke="black" strokeWidth="2" />
            )}
            {node.right && (
                <line x1={node.x} y1={node.y} x2={node.right.x} y2={node.right.y} stroke="black" strokeWidth="2" />
            )}
            <circle cx={node.x} cy={node.y} r="20" fill={isLCA ? "#ff5733" : isActive ? "#ffc107" : "#007bff"} stroke="black" strokeWidth="2" />
            <text x={node.x} y={node.y} dy="6" textAnchor="middle" fill="white" fontSize="14px">{node.value}</text>
        </>
    );
};

const LCAVisualizer = () => {
    const [tree, setTree] = useState(null);
    const [node1, setNode1] = useState("");
    const [node2, setNode2] = useState("");
    const [lcaNode, setLCANode] = useState(null);
    const [highlightedNodes, setHighlightedNodes] = useState([]);

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
        setLCANode(null);
        setHighlightedNodes([]);
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

    const findLCA = (node, n1, n2) => {
        if (!node) return null;
        if (node.value === n1 || node.value === n2) return node;

        const leftLCA = findLCA(node.left, n1, n2);
        const rightLCA = findLCA(node.right, n1, n2);

        if (leftLCA && rightLCA) return node;
        return leftLCA ? leftLCA : rightLCA;
    };

    const highlightPath = (node, target, path = []) => {
        if (!node) return false;
        path.push(node.value);
        if (node.value === target || highlightPath(node.left, target, path) || highlightPath(node.right, target, path)) {
            return true;
        }
        path.pop();
        return false;
    };

    const handleFindLCA = () => {
        const n1 = parseInt(node1);
        const n2 = parseInt(node2);
        if (isNaN(n1) || isNaN(n2)) return;

        const lca = findLCA(tree, n1, n2);
        if (lca) {
            setLCANode(lca.value);
            let path1 = [], path2 = [];
            highlightPath(tree, n1, path1);
            highlightPath(tree, n2, path2);
            setHighlightedNodes([...path1, ...path2]);
        }
    };

    return (
        <>
            <Header />
            <div className="container text-center mt-5 py-5">
                <h2 className="mb-4 mt-5">Lowest Common Ancestor (LCA) Visualizer</h2>
                <div>
                    <button className="btn btn-primary me-2 mt-5" onClick={generateRandomTree}>Generate Tree</button>
                </div>
                <div className="my-2">
                    <input type="number" placeholder="Node 1" value={node1} onChange={(e) => setNode1(e.target.value)} />
                    <input type="number" placeholder="Node 2" value={node2} onChange={(e) => setNode2(e.target.value)} className="ms-2" />
                    <button className="btn btn-success ms-2" onClick={handleFindLCA}>Find LCA</button>
                </div>
                <div className="position-relative mt-4" style={{ height: "600px", width: "80vw", border: "1px solid black", overflow: "auto" }}>
                    <svg className="position-absolute w-100 h-100 mt-5" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMin meet">
                        {tree && renderTree(tree, highlightedNodes, lcaNode)}
                    </svg>
                </div>
                {lcaNode !== null && <h5 className="mt-4">LCA: {lcaNode}</h5>}
            </div>
            <Footer />
        </>
    );
};

const renderTree = (node, highlightedNodes, lcaNode) => {
    if (!node) return null;
    return (
        <>
            <TreeNode node={node} isActive={highlightedNodes.includes(node.value)} isLCA={node.value === lcaNode} />
            {node.left && renderTree(node.left, highlightedNodes, lcaNode)}
            {node.right && renderTree(node.right, highlightedNodes, lcaNode)}
        </>
    );
};

export default LCAVisualizer;
