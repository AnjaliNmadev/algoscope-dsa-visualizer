import React from "react";
import ReactDom from "react-dom/client"
import Home from "./Home";
import Sort from "./component/sort";
import Contact from "./component/contact";
import Privacy from "./component/privacy";
import About from "./component/about";
import LinearSearchVisualizer from "./component/LinearSearchVisualizer";
import { BrowserRouter,Routes,Route } from "react-router";
import BinarySearchVisualizer from "./component/binarysearchvis";
import Fibonaccisequence from "./component/Fibonaccisequence";
import KnapsackVisualizer from "./component/KnapsackVisualize";
import LCSVisualizer from "./component/LCSVisualizer";
import LISVisualizer from "./component/LISVisualizer";
import BFSVisualizer from "./component/BFSVisualizer";
import DFSVisualizer from "./component/DFSVisualizer";
import DijkstraVisualizer from "./component/DijkstraVisualizer";
import PrimsVisualizer from "./component/PrimsVisualizer";
import KruskalVisualizer from "./component/KruskalVisualizer";
import DFSBinaryTreeVisualizer from "./component/DFSBinaryTreeVisualizer";
import BSTBinaryTreeVisualizer from "./component/BSTBinaryTreeVisualizer";
import LCAVisualizer from "./component/LCAVisualizer ";
import AVLTreeVisualizer from "./component/AVLTreeVisualizer";

function App(){

    
return(
    <>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={  <Home/>}></Route>
        <Route path="/sort" element={  <Sort/>}></Route>
        <Route path ="/LinearSearchVisualizer" element={<LinearSearchVisualizer/>}></Route>
        <Route path="/binarysearchvis" element={<BinarySearchVisualizer/>}></Route>
        <Route path ="/Fibonaccisequence" element={<Fibonaccisequence/>}></Route>
        <Route path ="/KnapsackVisualizer" element={<KnapsackVisualizer/>}></Route>
        <Route path ="/LISVisualizer" element={<LISVisualizer/>}></Route>
        <Route path ="/LCSVisualizer" element={<LCSVisualizer/>}></Route>
        <Route path ="/BFSVisualizer" element={<BFSVisualizer/>}></Route>
        <Route path ="/DFSVisualizer" element={<DFSVisualizer/>}></Route>
        <Route path ="/DijkstraVisualizer" element={<DijkstraVisualizer/>}></Route>
        <Route path ="/PrimsVisualizer" element={<PrimsVisualizer/>}></Route>
        <Route path ="/KruskalVisualizer" element={<KruskalVisualizer/>}></Route>
        <Route path ="/DFSBinaryTreeVisualizer" element={<DFSBinaryTreeVisualizer/>}></Route>
        <Route path ="/BSTBinaryTreeVisualizer" element={<BSTBinaryTreeVisualizer/>}></Route>
        <Route path ="/LCAVisualizer" element={<LCAVisualizer/>}></Route>
        <Route path ="/AVLTreeVisualizer" element={<AVLTreeVisualizer/>}></Route>
        <Route path="/contact" element={ <Contact/>}></Route>
        <Route path="/privacy" element={ <Privacy/>}></Route>
        <Route path="/about" element={ <About/>}></Route>
    </Routes>
    </BrowserRouter>

    
    </>
)



}

ReactDom.createRoot(document.getElementById("root")).render(<App/>);

