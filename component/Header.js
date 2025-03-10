import React from "react";
import logo from "./logo.png";

import { Link } from "react-router";



function Header()
{
return(
    <>
    <nav class="navbar navbar-expand-md fixed-top navbar-dark bg-dark ">
  <div class="container-fluid">
    <Link class="navbar-brand" to="/"><img src={logo} alt="logo" width="80px"/> ALgoScope</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link class="nav-link active"  to="/" >Home</Link>
        </li>
  
          <li class="nav-item dropdown">
          <Link class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" >
          Sorting
          </Link>
          <ul class="dropdown-menu">
            <li><Link class="dropdown-item"   to="/sort">Bubble Sort</Link></li>
            <li><Link class="dropdown-item"   to="/sort">Selection Sort</Link></li>
            <li><Link class="dropdown-item"   to="/sort"> Merge Sort</Link></li>
            <li><Link class="dropdown-item"   to="/sort" >Insertion Sort</Link></li>
            <li><Link class="dropdown-item"   to="/sort" >Quick Sort</Link></li>
            
          </ul>
        </li>
        
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" >
          Searching
          </a>
          <ul class="dropdown-menu">
            <li><Link class="dropdown-item" to="/LinearSearchVisualizer">Linear Search</Link></li>
            <li><Link class="dropdown-item" to="/binarysearchvis">Binary Search</Link></li>
            
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" >
          Dynamic Programming
          </a>
          <ul class="dropdown-menu">
            <li><Link class="dropdown-item" to="/Fibonaccisequence">Fibonacci Series</Link></li>
            <li><Link class="dropdown-item" to="/KnapsackVisualizer" >Knapsack Problem</Link></li>
            <li><Link class="dropdown-item" to="/LCSVisualizer">LCS</Link></li>
            <li><Link class="dropdown-item" to="/LISVisualizer" >LIC</Link></li>
            
          </ul>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" >
          Graphs 
          </a>
          <ul class="dropdown-menu">
            <li><Link class="dropdown-item" to="/BFSVisualizer">Breadth-First Search</Link></li>
            <li><Link class="dropdown-item" to="/DFSVisualizer" >Depth-First Search</Link></li>
            <li><Link class="dropdown-item" to="/DijkstraVisualizer" >Dijkstra’s Algorithm</Link></li>
            <li><Link class="dropdown-item" to="/PrimsVisualizer" >Prim’s Algorithm</Link></li>
            <li><Link class="dropdown-item" to="/KruskalVisualizer">Kruskal’s Algorithm</Link></li>
          </ul>
        </li>
        
      </ul>
    </div>
  </div>
</nav>
    </>
)
}
export default Header;