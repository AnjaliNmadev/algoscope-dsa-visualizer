import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./footer";

const TreeNode = ({ node, isActive }) => {
    return (
        <>
            {node.left && (
                <line x1={node.x} y1={node.y} x2={node.left.x} y2={node.left.y} stroke="black" strokeWidth="2" />
            )}
            {node.right && (
                <line x1={node.x} y1={node.y} x2={node.right.x} y2={node.right.y} stroke="black" strokeWidth="2" />
            )}
            <circle cx={node.x} cy={node.y} r="20" fill={isActive ? "#ffc107" : "#007bff"} stroke="black" strokeWidth="2" />
            <text x={node.x} y={node.y} dy="6" textAnchor="middle" fill="white" fontSize="14px">{node.value}</text>
        </>
    );
};

const AVLTreeVisualizer = () => {
    const [tree, setTree] = useState(null);
    const [insertValue, setInsertValue] = useState("");
    const [deleteValue, setDeleteValue] = useState("");

    useEffect(() => {
        generateRandomTree();
    }, []);

    const generateRandomTree = () => {
        const values = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
        let avlRoot = null;
        values.forEach((value) => {
            avlRoot = insertAVL(avlRoot, value, 600, 50, 250);
        });
        setTree(avlRoot);
    };

    const getHeight = (node) => (node ? node.height : 0);
    const getBalanceFactor = (node) => getHeight(node.left) - getHeight(node.right);

    const rotateRight = (y) => {
        let x = y.left;
        let T2 = x.right;
        x.right = y;
        y.left = T2;
        y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
        x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
        return x;
    };

    const rotateLeft = (x) => {
        let y = x.right;
        let T2 = y.left;
        y.left = x;
        x.right = T2;
        x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
        y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
        return y;
    };

    const insertAVL = (node, value, x = 600, y = 50, offset = 250) => {
        if (!node) return { value, left: null, right: null, height: 1, x, y };

        if (value < node.value) {
            node.left = insertAVL(node.left, value, x - offset, y + 100, offset / 1.5);
        } else if (value > node.value) {
            node.right = insertAVL(node.right, value, x + offset, y + 100, offset / 1.5);
        } else {
            return node; // No duplicates
        }

        node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
        let balance = getBalanceFactor(node);

        if (balance > 1 && value < node.left.value) return rotateRight(node);
        if (balance < -1 && value > node.right.value) return rotateLeft(node);
        if (balance > 1 && value > node.left.value) {
            node.left = rotateLeft(node.left);
            return rotateRight(node);
        }
        if (balance < -1 && value < node.right.value) {
            node.right = rotateRight(node.right);
            return rotateLeft(node);
        }

        return node;
    };

    const findMinValueNode = (node) => {
        let current = node;
        while (current.left) {
            current = current.left;
        }
        return current;
    };

    const deleteAVL = (node, value) => {
        if (!node) return null;

        if (value < node.value) {
            node.left = deleteAVL(node.left, value);
        } else if (value > node.value) {
            node.right = deleteAVL(node.right, value);
        } else {
            if (!node.left || !node.right) {
                node = node.left ? node.left : node.right;
            } else {
                let temp = findMinValueNode(node.right);
                node.value = temp.value;
                node.right = deleteAVL(node.right, temp.value);
            }
        }

        if (!node) return null;

        node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
        let balance = getBalanceFactor(node);

        if (balance > 1 && getBalanceFactor(node.left) >= 0) return rotateRight(node);
        if (balance > 1 && getBalanceFactor(node.left) < 0) {
            node.left = rotateLeft(node.left);
            return rotateRight(node);
        }
        if (balance < -1 && getBalanceFactor(node.right) <= 0) return rotateLeft(node);
        if (balance < -1 && getBalanceFactor(node.right) > 0) {
            node.right = rotateRight(node.right);
            return rotateLeft(node);
        }

        return node;
    };

    const handleInsert = () => {
        if (!insertValue) return;
        setTree(insertAVL(tree, parseInt(insertValue)));
        setInsertValue("");
    };

    const handleDelete = () => {
        if (!deleteValue) return;
        setTree(deleteAVL(tree, parseInt(deleteValue)));
        setDeleteValue("");
    };

    return (
        <>
            <Header />
            <div className="container text-center mt-5 py-5">
                <h2 className="mb-4 mt-5 fw-bold">AVL Tree </h2>
                <div>
                    <input
                        type="number"
                        placeholder="Insert Value"
                        value={insertValue}
                        onChange={(e) => setInsertValue(e.target.value)} className="mt-3"
                    />
                    <button className="btn btn-success ms-2 mt-3" onClick={handleInsert}>Insert</button>
                </div>
                <div className="mt-3">
                    <input
                        type="number"
                        placeholder="Delete Value"
                        value={deleteValue}
                        onChange={(e) => setDeleteValue(e.target.value)}
                    />
                    <button className="btn btn-danger ms-2 " onClick={handleDelete}>Delete</button>
                </div>
                <div className="position-relative my-4" style={{ height: "600px", width: "80vw", border: "1px solid black", overflow: "auto" }}>
                    <svg className="position-absolute w-100 h-100 mt-5" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMin meet">
                        {tree && renderTree(tree)}
                    </svg>
                </div>
            </div>
            <Footer />
        </>
    );
};

const renderTree = (node) => {
    if (!node) return null;
    return (
        <>
            <TreeNode node={node} isActive={false} />
            {node.left && renderTree(node.left)}
            {node.right && renderTree(node.right)}
        </>
    );
};

export default AVLTreeVisualizer;
