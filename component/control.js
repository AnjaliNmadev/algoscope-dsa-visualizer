import React from "react";
import "./sorting.css"
function control({GenerateNewArray,handleSorting,userArray,setuserArray,sorting,animationSpeed, setAnimationSpeed}){

  
        return(
            <>
            <div className="buttons">

               <input type="text" placeholder="Enter Array b/w 20 to 300"  value={userArray} onChange={(e)=>{setuserArray(e.target.value)}}></input>
                <button onClick={GenerateNewArray} disabled={sorting}> Generate New Array</button>
                
                <select onClick={handleSorting}>
                   <option value="" >Select Sorting</option>
                   <option value="bubblesorting" onClick={handleSorting} disabled={sorting}>Bubble Sorting</option>
                   <option value="mergesorting">Merge Sorting</option>
                   <option value="insertionsorting">Insertion Sorting</option>
                   <option value="selectionsorting">Selection Sorting</option>
                   <option value="quicksorting">Quick Sorting</option>
                </select>
                {/* Speed Control Slider */}
                <div >
                   
                    <input  type="range"
                        min="50"
                        max="350"
                        step="50"
                        value={animationSpeed}
                        onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                        disabled={sorting} className="speed"   />
                </div>
                       
                  
            </div>
        
            
                
            </>
        )
    }
    export default control;