
import sortingimg from "./image/sortingimg.webp";
import Linear from "./image/linear.webp"
import binary from "./image/binary.webp"

import LCSVisualizer from "./image/LCSVisualizer.webp";
import LISVisualizer from "./image/LISVisualizer.webp";
import KnapsackVisualizer from "./image/KnapsackVisualizer.webp";
import Fibonaccisequence from "./image/Fibonaccisequence.webp";

import KruskalVisualizer from "./image/KruskalVisualizer.webp";
import PrimsVisualizer from "./image/PrimsVisualizer.webp";
import DijkstraVisualizer from "./image/DijkstraVisualizer.webp";
import BFSVisualizer from "./image/BFSVisualizer.webp";
import DFSVisualizer from "./image/DFSVisualizer.webp";
import DFS from "./image/DFS.webp";
import bst from "./image/bst.webp";
import lca from "./image/lca.webp";
import avl from "./image/avl.webp";

import { Link } from "react-router";


function Card()
{
    return(
        <>
        
        <div className="container ">
        {/*box 1 */}
       <div className="card ">
      <img className="card-img-top" src={sortingimg} alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title text-center">Sorting Algorithm</h5>
        <Link to="/sort" className="btn btns">Click to view</Link>
      </div>
    </div>
      {/*box 2*/}
    <div className="card ">
      <img className="card-img-top" src={Linear} alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title text-center">Linear Search Algorithm</h5>
        <Link to="/LinearSearchVisualizer" className="btn btns ">Click to view</Link>
      </div>
    </div>

     {/*box 3*/}
     <div className="card ">
      <img className="card-img-top" src={binary} alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title text-center">Binary Search Algorithm</h5>
        <Link to="/binarysearchvis" className="btn btns">Click to view</Link>
      </div>
    </div>
     
    {/*box 4*/}
    <div className="card ">
      <img className="card-img-top" src={Fibonaccisequence} alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title text-center">Fibonacci Sequence </h5>
        <Link to="/Fibonaccisequence" className="btn btns">Click to view</Link>
      </div>
    </div>

    {/*box 5*/}
    <div className="card ">
      <img className="card-img-top" src={KnapsackVisualizer} alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title text-center">Knapsack Problem</h5>
        <Link to="/KnapsackVisualizer" className="btn btns">Click to view</Link>
      </div>
    </div>

    {/*box 6*/}
    <div className="card ">
      <img className="card-img-top" src={LCSVisualizer} alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title text-center">Longest Common Subsequence</h5>
        <Link to="/LCSVisualizer" className="btn btns">Click to view</Link>
      </div>
    </div>
    {/*box 7*/}
    <div className="card ">
      <img className="card-img-top" src={LISVisualizer} alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title text-center">Longest Increasing Subsequence</h5>
        <Link to="/LISVisualizer"  className="btn btns">Click to view</Link>
      </div>
    </div>
    {/*box 8*/}
    <div className="card ">
      <img className="card-img-top" src={BFSVisualizer } alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title text-center">Breadth-First Search</h5>
        <Link to="/BFSVisualizer" className="btn btns">Click to view</Link>
      </div>
    </div>
    {/*box 9*/}
    <div className="card ">
      <img className="card-img-top" src={DFSVisualizer } alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title text-center">Depth First Search</h5>
        <Link to="/DFSVisualizer" className="btn btns">Click to view</Link>
      </div>
    </div>
    {/*box 10*/}
    <div className="card ">
      <img className="card-img-top" src={KruskalVisualizer} alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title text-center">Kruskal’s Algorithm</h5>
        <Link to="/KruskalVisualizer" className="btn btns">Click to view</Link>
      </div>
    </div>

    {/*box 11*/}
    <div className="card ">
      <img className="card-img-top" src={PrimsVisualizer} alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title text-center">Prim's Algorithm</h5>
        <Link to="/PrimsVisualizer"  className="btn btns">Click to view</Link>
      </div>
    </div>
     {/*box 12*/}
     <div className="card ">
      <img className="card-img-top" src={DijkstraVisualizer} alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title text-center">Dijkstra’s Algorithm</h5>
        <Link to="/DijkstraVisualizer" className="btn btns">Click to view</Link>
      </div>
    </div>


    {/*box 13*/}
    <div className="card ">
      <img className="card-img-top" src={DFS} alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title text-center">Depth-First Search (DFS) Binary Tree</h5>
        <Link to="/DFSBinaryTreeVisualizer" className="btn btns">Click to view</Link>
      </div>
    </div>
    
    {/*box 14*/}
    <div className="card ">
      <img className="card-img-top" src={bst} alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title text-center">Binary Search Tree</h5>
        <Link to="/BSTBinaryTreeVisualizer" className="btn btns">Click to view</Link>
      </div>
    </div>
    
    {/*box 15*/}
    <div className="card ">
      <img className="card-img-top" src={lca} alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title text-center">Lowest Common Ancestor (LCA)</h5>
        <Link to="/LCAVisualizer" className="btn btns">Click to view</Link>
      </div>
    </div>
    
    {/*box 16*/}
    <div className="card ">
      <img className="card-img-top" src={avl} alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title text-center">AVL tree</h5>
        <Link to="/AVLTreeVisualizer" className="btn btns">Click to view</Link>
      </div>
    </div>
    </div>
    


    </>
    )
   
}

export default Card;