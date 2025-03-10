import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./footer";
import Sorting from "./sorting";
import Control from "./control";
import BubbleSort from "./sortingAlgo/bubblesort";
import MergeSort from "./sortingAlgo/mergesort";
import SelectionSort from "./sortingAlgo/selectionsort";
import InsertionSort from "./sortingAlgo/insertionsort";
import QuickSort from "./sortingAlgo/quicksort";

export default function Sort() {
  const [array, setArray] = useState([70, 95, 90, 67, 89, 65, 87, 67, 60, 98]);
  const [userArray, setuserArray] = useState("");
  const [sorting, setSorting] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(150); // Default speed

  useEffect(() => {
    const userinput = userArray.split(",");
    const filterInput = userinput
      .filter((item) => !isNaN(item) && Number.isInteger(parseFloat(item)))
      .map(Number) // Convert to numbers directly
      .filter((num) => num >= 20 && num <= 300); // Keep only numbers between 20 and 300
    const finalArray = filterInput.slice(0, 10); // Take the first 10 valid numbers
    setArray([...finalArray]);
  }, [userArray]);

  const GenerateNewArray = () => {
    if (sorting) return; // Prevent generating new array during sorting
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 300) + 20);
    setArray([]);
    setTimeout(() => {
      setArray(newArray);
    }, 100);
  };

  const handleSorting = (e) => {
    if (sorting) return; // Prevent multiple sorts
    setSorting(true); // Disable all sorting buttons
    let sortingmethod = e.target.value;

    switch (sortingmethod) {
      case "bubblesorting":
        BubbleAnimation(BubbleSort([...array]), () => setSorting(false));
        break;

      case "mergesorting":
        MergeAnimation(MergeSort([...array]), () => setSorting(false));
        break;

      case "selectionsorting":
        BubbleAnimation(SelectionSort([...array]), () => setSorting(false));
        break;

      case "insertionsorting":
        InsertionAnimation(InsertionSort([...array]), () => setSorting(false));
        break;

      case "quicksorting":
        BubbleAnimation(QuickSort([...array]), () => setSorting(false));
        break;

      default:
        setSorting(false);
        break;
    }
  };

  function BubbleAnimation(animation, callback) {
    const bars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animation.length; i++) {
      let [index1, index2, swap] = animation[i];
      let bar1 = bars[index1];
      let bar2 = bars[index2];

      setTimeout(() => {
        bar1.style.backgroundColor = swap ? "red" : "yellow";
        bar2.style.backgroundColor = swap ? "red" : "yellow";

        if (swap) {
          const tempHeight = bar1.style.height;
          bar1.style.height = bar2.style.height;
          bar2.style.height = tempHeight;

          let tempContent = bar1.innerHTML;
          bar1.innerHTML = bar2.innerHTML;
          bar2.innerHTML = tempContent;
        }

        setTimeout(() => {
          bar1.style.backgroundColor = "rgb(39, 212, 255)";
          bar2.style.backgroundColor = "rgb(39, 212, 255)";
        }, animationSpeed / 2);

        if (i === animation.length - 1) {
          setTimeout(() => {
            for (let j = 0; j < bars.length; j++) {
              bars[j].style.backgroundColor = "green";
            }
            callback(); // Re-enable sorting
          }, animationSpeed);
        }
      }, i * animationSpeed);
    }
  }

  function MergeAnimation(animations, callback) {
    const bars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      let [index, value, swap] = animations[i];

      setTimeout(() => {
        bars[index].style.background = swap ? "red" : "yellow";

        if (swap) {
          bars[index].style.height = `${value}px`;
          bars[index].innerHTML = value;
        }

        setTimeout(() => {
          bars[index].style.background = "rgb(39, 212, 255)";
        }, animationSpeed / 2);

        if (i === animations.length - 1) {
          setTimeout(() => {
            for (let j = 0; j < bars.length; j++) {
              bars[j].style.background = "green";
            }
            callback();
          }, animationSpeed);
        }
      }, i * animationSpeed);
    }
  }

  function InsertionAnimation(animations, callback) {
    const bars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      let [index1, value, swap] = animations[i];

      setTimeout(() => {
        let bar = bars[index1];

        if (swap) {
          bar.style.background = "red";

          let tempHeight = bar.style.height;
          bar.style.height = `${bars[value].style.height}`;
          bars[value].style.height = tempHeight;

          let tempContent = bar.innerHTML;
          bar.innerHTML = bars[value].innerHTML;
          bars[value].innerHTML = tempContent;
        } else {
          bar.style.background = "green";
          bar.style.height = `${value}px`;
          bar.innerHTML = value;
        }

        setTimeout(() => {
          bar.style.background = "rgb(39, 212, 255)";
        }, animationSpeed / 2);

        if (i === animations.length - 1) {
          setTimeout(() => {
            for (let j = 0; j < bars.length; j++) {
              bars[j].style.background = "green";
            }
            callback();
          }, animationSpeed);
        }
      }, i * animationSpeed);
    }
  }

  return (
    <>
      <Header />
      <div className="containers">
        <Control
          GenerateNewArray={GenerateNewArray}
          handleSorting={handleSorting}
          userArray={userArray}
          setuserArray={setuserArray}
          sorting={sorting} // Pass sorting state to disable buttons
          animationSpeed={animationSpeed}
          setAnimationSpeed={setAnimationSpeed}
        />
        <Sorting array={array} setSorting={setSorting} />
      </div>
      <Footer />
    </>
  );
}
