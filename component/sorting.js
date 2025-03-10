import React from "react";
import "./sorting.css"

function Sorting({array}){

    return(
        <>
        <div className="sorting-container">
            <div className="array-container ">
                {
                    array.map((value,index) =>
                        (
                         <div  keys ={index} className="array-bar" style={{height:`${value}px`}}>{value}</div>
                        ) 
                           )
                }
            </div>
           
        </div>
            
        </>
    )
}
export default Sorting;