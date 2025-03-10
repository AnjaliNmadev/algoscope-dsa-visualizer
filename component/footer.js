import React from "react";
import { Link } from "react-router";


const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-4 pb-2 mt-5 ">
      <div className="container-fluid ">
        <div className="row ">
          {/* Navigation Links */}
          <div className="col-sm p-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
            <li>< Link  to="/" className="text-light text-decoration-none">Home</ Link></li>
              <li>< Link to="/contact" className="text-light text-decoration-none">Contact Us</Link></li>
              <li>< Link to="/privacy" className="text-light text-decoration-none">Privacy Policy</Link></li>
              <li>< Link to="/about" className="text-light text-decoration-none">About us</Link></li>
            </ul>
          </div>

          {/* sorting Section */}
          <div className="col-sm p-4">
            <h5>  Sorting Algorithm</h5>
            <ul className="list-unstyled">
              <li><Link  to="/sort" className="text-light text-decoration-none">Bubble Sort</Link></li>
              <li><Link  to="/sort" className="text-light text-decoration-none">Selection Sort</Link></li>
              <li><Link  to="/sort" className="text-light text-decoration-none">Merge Sort</Link></li>
              <li><Link  to="/sort" className="text-light text-decoration-none">Insertion Sort</Link></li>
              <li><Link  to="/sort" className="text-light text-decoration-none">Quick Sort</Link></li>
            </ul>
          </div>

          {/*   Searching Section */}
          <div className="col-sm p-4">
            <h5>  Searching Algorithm</h5>
            <ul className="list-unstyled">
              <li><Link to="/LinearSearchVisualizer" className="text-light text-decoration-none">Linear Search</Link></li>
              <li><Link to="/binarysearchvis" className="text-light text-decoration-none">Binary Search</Link></li>
            </ul>
          </div>

          {/*   Dynamic Programming Section */}
          <div className="col-sm p-4">
            <h5>    Dynamic Programming</h5>
            <ul className="list-unstyled">
              <li><Link to="/Fibonaccisequence"  className="text-light text-decoration-none">Fibonacci Series</Link></li>
              <li><Link to="/KnapsackVisualizer"  className="text-light text-decoration-none">Knapsack Problem</Link></li>
              <li><Link to="/LCSVisualizer"  className="text-light text-decoration-none">Longest Common Subsequence (LCS)</Link></li>
              <li><Link to="/LISVisualizer"  className="text-light text-decoration-none">Longest Increasing Subsequence (LIS)</Link></li>
              
            </ul>
          </div>

           {/*  Graphs Algorithms Section */}
           <div className="col-sm p-4">
            <h5>   Graphs Algorithms</h5>
            <ul className="list-unstyled">
              <li><Link to="/BFSVisualizer"  className="text-light text-decoration-none">Breadth-First Search</Link></li>
              <li><Link to="/DFSVisualizer"  className="text-light text-decoration-none">Depth-First Search</Link></li>
              <li><Link to="/DijkstraVisualizer"  className="text-light text-decoration-none">Dijkstra’s Algorithm</Link></li>
              <li><Link to="/PrimsVisualizer "  className="text-light text-decoration-none">Prim’s Algorithm</Link></li>
              <li><Link to="/KruskalVisualizer"  className="text-light text-decoration-none">Kruskal’s Algorithm</Link></li>
              
            </ul>
          </div>

          
          {/*   Tree Algorithms Section */}
          <div className="col-sm p-4">
            <h5>  Tree Algorithms </h5>
            <ul className="list-unstyled">
              <li><Link to="/DFSBinaryTreeVisualizer"  className="text-light text-decoration-none">Depth-First Search (DFS) </Link></li>
              <li><Link to="/BSTBinaryTreeVisualizer"  className="text-light text-decoration-none">Binary Search Tree (BST) </Link></li>
              <li><Link to="/LCAVisualizer"  className="text-light text-decoration-none">Lowest Common Ancestor (LCA)</Link></li>
              <li><Link to="/AVLTreeVisualizer"  className="text-light text-decoration-none">AVL Tree</Link></li>
              
            </ul>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="text-center mt-3">
          <p className="mb-0">&copy; {new Date().getFullYear()} ALgoScope. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

  