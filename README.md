This project is a **Data structure Algorithm Visualizer** built using **React.js** to build frontent and 

**react-router** to make single page Application and

 **boostrap** 
Bootstrap is a CSS framework that helps design responsive and visually appealing websites quickly. It provides pre-styled components like buttons, grids, forms, and modals, along with utilities for spacing. 

 It allows users to see step-by-step animations of different Data structure algorithms like that help user to easily interact with DSA and can unterstand easily.

 **1.sorting algorithm**
 1.1 Bubble Sort 
 1.2 Selection Sort 
 1.3 Insertion Sort 
 1.4 Merge Sort 
 1.5 Quick Sort 

 **2.searching algorithm**

 2.1 Linear searching
  2.2  Binary searching

 **3 Dynamic Programming algorithm**
 3.1 Fibonacci Series
  3.2 Knapsack Problem
   3.3 Longest Common Subsequence (LCS)
 3.4 Longest Increasing Subsequence (LIS)


**4 Graphs Algorithms**
4.1 Breadth-First Search
4.2 Depth-First Search
4.3 Dijkstra’s Algorithm
4.4 Prim’s Algorithm
4.5 Kruskal’s Algorithm

**5 Tree Algorithms**
5.1 Depth-First Search (DFS)
5.2 Binary Search Tree (BST)
 5.3 Lowest Common Ancestor (LCA)
 5.4 AVL Tree


\\ **1.sorting algorithm**

**1.1 Bubble Sort**

Approach:

Repeatedly compares adjacent elements and swaps them if they are in the wrong order.
The largest element "bubbles" to the right in each pass.
Steps:

Compare arr[0] and arr[1], swap if needed.
Move to arr[1] and arr[2], swap if needed.
Repeat until the largest element is at the end.
Reduce the range and repeat.

function BubbleSort(array) {
    let animation = [];
    let tempArr = [...array];

    for (let i = 0; i < tempArr.length - 1; i++) {
        for (let j = 0; j < tempArr.length - 1 - i; j++) {
            // First, record the comparison (before deciding swap)
            animation.push([j, j + 1, false]); // Initially mark as no swap

            if (tempArr[j] > tempArr[j + 1]) {
                // Swap the elements
                let temp = tempArr[j];
                tempArr[j] = tempArr[j + 1];
                tempArr[j + 1] = temp;

                // Now, update the animation with a swap
                animation[animation.length - 1][2] = true; // Update last entry to true
            }
        }
    }

 **1.2 Selection Sort** 

 Approach:

Finds the smallest element and places it at the beginning.
Repeats the process for the remaining elements.
Steps:

Find the smallest element and swap it with the first element.
Find the second smallest and swap it with the second position.
Repeat for the remaining elements.

export default function SelectionSort(arr) {
    let animations = [];
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            animations.push([j, minIndex, false]); // Comparison
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            animations.push([i, minIndex, true]); // Swap
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }

    return animations;
}


 **1.3 Insertion Sort** 

Approach:

Builds a sorted array one element at a time by inserting each element into its correct position.
Steps:

Start from the second element.
Compare it with previous elements.
Insert it at the correct position.
Repeat for all elements.
export default function InsertionSort(arr) {
    let animations = [];
    let n = arr.length;

    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            animations.push([j + 1, j, true]); // Swap
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
        animations.push([j + 1, key, false]); // Insert
    }

    return animations;
}

 **1.4 Merge Sort** 

 Approach:

Divide the array into halves until each part has one element.
Merge the sorted halves back together.
Steps:

Divide the array into two halves recursively.
Sort each half.
Merge the sorted halves.
export default function MergeSort(arr) {
    let animations = [];
    if (arr.length <= 1) return arr;
    
    function mergeSortHelper(arr, left, right) {
        if (left >= right) return;
        const mid = Math.floor((left + right) / 2);
        
        mergeSortHelper(arr, left, mid);
        mergeSortHelper(arr, mid + 1, right);
        merge(arr, left, mid, right, animations);
    }

    function merge(arr, left, mid, right, animations) {
        let temp = [];
        let i = left, j = mid + 1;
        
        while (i <= mid && j <= right) {
            animations.push([i, j, false]); // Comparison
            if (arr[i] <= arr[j]) {
                temp.push(arr[i++]);
            } else {
                temp.push(arr[j++]);
            }
        }

        while (i <= mid) temp.push(arr[i++]);
        while (j <= right) temp.push(arr[j++]);

        for (let k = left; k <= right; k++) {
            arr[k] = temp[k - left];
            animations.push([k, arr[k], true]); // Swap values
        }
    }

    let arrayCopy = [...arr];
    mergeSortHelper(arrayCopy, 0, arrayCopy.length - 1);
    return animations;
}


 **1.5 Quick Sort**

 Approach:

Picks a pivot element.
Partitions the array so that smaller elements go to the left, larger to the right.
Recursively sorts the partitions.
Steps:

Select a pivot (usually the last or middle element).
Rearrange elements such that elements smaller than the pivot are on the left and larger ones on the right.
Recursively sort left and right parts.

export default function QuickSort(arr) {
    let animations = [];
    quickSortHelper(arr, 0, arr.length - 1, animations);
    return animations;
}

function quickSortHelper(arr, low, high, animations) {
    if (low < high) {
        let pivotIndex = partition(arr, low, high, animations);
        quickSortHelper(arr, low, pivotIndex - 1, animations);
        quickSortHelper(arr, pivotIndex + 1, high, animations);
    }
}

function partition(arr, low, high, animations) {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        animations.push([j, high, false]); // Comparison
        if (arr[j] < pivot) {
            i++;
            animations.push([i, j, true]); // Swap
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    animations.push([i + 1, high, true]); // Swap pivot
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    
    return i + 1;
}



 for sorting algorithm i also used enternal Css **style.css**

 is used for navbar [headerpart] to nake more good ui and give hover effect and also for [footerpart],
 and for [card.js] but also used boostrap to make it responsive and [conatct.js] ,[about.js] ,[privacy.js].


 and for sorting algorithm used **sorting.css** for sorting-container,array-container ,array-bar,buttons , button , select,input and also give hover effect and use [mediaquery] for make responsive .

 **sort.js** in this all sorting algorithm code and animation is written here , all the state variable is here and passing as a [props] to every sorting algoritm **sortingalgo[bubblesort.js],[insertionsort.js] ,[selectionsort.js],[quicksort.js],[mergesort.js] code is present here**,

 and speed feature is also include in this sorting visualizer 



 // **2.searching algorithm**

 2.1 Linear searching [LinearSearchVisualizer.js]

 Approach:

Start from the first element and compare it with the target.
Move to the next element and repeat until the target is found or the list ends.
Steps:

Start from the first element.
Compare with the target.
If a match is found, return the index.
If not, move to the next element.
Repeat until the target is found or the list ends.

const handleSearch = async () => {
    if (!target) return;
    setCurrentIndex(null);
    setFoundIndex(null);
    setMessage("");
    setSearching(true);

    for (let i = 0; i < array.length; i++) {
      setCurrentIndex(i);
      await new Promise((resolve) => setTimeout(resolve, 400)); // Animation delay

      if (array[i] === parseInt(target)) {
        setFoundIndex(i);
        setMessage(`✅ Found at index ${i}`);
        setSearching(false);
        return;
      }
    }

    setMessage("❌ Not Found");
    setSearching(false);
  };

  const generateNewArray = () => {
    if (searching) return;
    const newArray = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 500) + 1
    );
    setArray(newArray);
    setCurrentIndex(null);
    setFoundIndex(null);
    setMessage("");
  };

  2.2  Binary searching [BinarySearchVisualizer.js]

  Approach:

Repeatedly divide the array in half.
Compare the middle element with the target.
If the middle element is the target, return its index.
If the middle is greater, search the left half.
If the middle is smaller, search the right half.
Steps:

Find the middle element.
Compare it with the target.
If it matches, return the index.
If the target is smaller, repeat the process for the left half.
If the target is larger, repeat the process for the right half.
 useEffect(() => {
    if (animating && !found) {
      const timer = setTimeout(() => {
        stepSearch();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [animating, low, high]);

  const stepSearch = () => {
    if (low <= high && !found) {
      let middle = Math.floor((low + high) / 2);
      setMid(middle);

      setTimeout(() => {
        if (array[middle] === target) {
          setFound(true);
          setAnimating(false);
        } else if (array[middle] < target) {
          setLow(middle + 1);
        } else {
          setHigh(middle - 1);
        }
      }, 500);
    } else {
      setAnimating(false);
    }
  };

  const startAnimation = () => {
    setAnimating(true);
  };

  const resetSearch = () => {
    setLow(0);
    setHigh(array.length - 1);
    setMid(null);
    setFound(false);
    setAnimating(false);
  };


  i used **boostrap** to make it responsive [utility class  and spacing ,rounded shadow ,border ,button ].



 **3 Dynamic Programming algorithm**

 **3.1 Fibonacci Series**[Fibonaccisequence.js]

The Fibonacci sequence follows the recurrence relation
  F(n)=F(n−1)+F(n−2)
  Using memoization (top-down) or tabulation (bottom-up), we avoid redundant calculations.
   Steps:

Create an array dp[] where dp[i] stores F(i).
Initialize base cases: dp[0] = 0, dp[1] = 1.
Use a loop to compute F(n), storing results to reuse.
const fibMemo = (n, memo = {}) => {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    return memo[n];
  };

  const fibTabulation = (n) => {
    let dp = Array(n + 1).fill(0);
    dp[1] = 1;
    for (let i = 2; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp;
  };

  const calculateFib = async () => {
    if (!method) return;
    let memoValues = [];
    let tabValues = fibTabulation(n);
    setProgressMemo(0);
    setProgressTab(0);

    for (let i = 0; i <= n; i++) {
      if (method === "memoization") {
        memoValues.push(fibMemo(i));
        setFibMemoValues([...memoValues]);
        setHighlightMemo(i);
        setProgressMemo(((i + 1) / (n + 1)) * 100);
      } else if (method === "tabulation") {
        setFibTabValues(tabValues.slice(0, i + 1));
        setHighlightTab(i);
        setProgressTab(((i + 1) / (n + 1)) * 100);
      }
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  };



  **3.2 Knapsack Problem**[KnapsackVisualizer.js]

  We decide whether to include an item or not based on its weight and value.
Use a 2D DP table dp[i][w], where:
i represents the number of items considered.
w is the weight limit.
Create a 2D table dp[][] of size (n+1) × (W+1).
If item weight wt[i] > W, exclude the item:

dp[i][w]=dp[i−1][w]
Otherwise, choose the maximum of including or excluding the item
dp[i][w]=max(dp[i−1][w],val[i−1]+dp[i−1][w−wt[i−1]])


  const knapsackDP = async () => {
    const n = items.length;
    const dp = Array(n + 1)
      .fill(null)
      .map(() => Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
      for (let w = 1; w <= capacity; w++) {
        if (items[i - 1].weight <= w) {
          dp[i][w] = Math.max(
            items[i - 1].value + dp[i - 1][w - items[i - 1].weight],
            dp[i - 1][w]
          );
        } else {
          dp[i][w] = dp[i - 1][w];
        }
        setHighlight([i, w]);
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    }

    let w = capacity;
    let selected = [];
    for (let i = n; i > 0 && w > 0; i--) {
      if (dp[i][w] !== dp[i - 1][w]) {
        selected.push(items[i - 1]);
        w -= items[i - 1].weight;
      }
    }
    setSelectedItems(selected);
  };

  const addItem = () => {
    if (newWeight && newValue) {
      setItems([...items, { weight: parseInt(newWeight), value: parseInt(newValue) }]);
      setNewWeight("");
      setNewValue("");
    }
  };

   **3.3 Longest Common Subsequence (LCS)**


   Find the longest sequence present in both strings.
Use a 2D DP table dp[i][j], where:
i represents the length of the first string.
j represents the length of the second string.

step:
1. If characters match
dp[i][j]=1+dp[i−1][j−1]
2. Otherwise, take the maximum of excluding either character
dp[i][j]=max(dp[i−1][j],dp[i][j−1])
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
    }


 3.4 Longest Increasing Subsequence (LIS)

 How It Works:
Find the longest subsequence where elements are strictly increasing.
Use a DP array dp[i], where:
dp[i] stores the length of LIS ending at index i.
Use nested loops to compare previous elements.
Steps:

Initialize dp[i] = 1 for all elements.
For each element arr[i], check all previous elements arr[j]:
If arr[j] < arr[i], update
dp[i]=max(dp[i],dp[j]+1)


  const parseSequence = () => sequence.split(",").map(num => parseInt(num.trim(), 10)).filter(num => !isNaN(num));

  const calculateLIS = async () => {
    const arr = parseSequence();
    const n = arr.length;
    const lis = Array(n).fill(1);
    const prevIndex = Array(n).fill(-1);

    setProgress(0);
    setLisArray([]);
    setLisResult([]);

    for (let i = 1; i < n; i++) {
      for (let j = 0; j < i; j++) {
        if (arr[i] > arr[j] && lis[i] < lis[j] + 1) {
          lis[i] = lis[j] + 1;
          prevIndex[i] = j;
        }
      }
      setLisArray([...lis]);
      setHighlight(i);
      setProgress(((i + 1) / n) * 100);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    let maxIndex = lis.indexOf(Math.max(...lis));
    let lisSequence = [];
    while (maxIndex !== -1) {
      lisSequence.unshift(arr[maxIndex]);
      maxIndex = prevIndex[maxIndex];
    }
    setLisResult(lisSequence);
  };

 i used **boostrap** to make it responsive [utility class  and spacing ,rounded shadow ,border ,button ].


 
**4 Graphs Algorithms**
**4.1 Breadth-First Search**

How It Works:
Explores all neighbors level by level (like ripples in water).
Uses a queue (FIFO) for traversal.
Best for: Shortest path in an unweighted graph.
 Steps:

Start from a node and mark it as visited.
Add it to a queue.
Process the node and visit its unvisited neighbors, adding them to the queue.
Repeat until the queue is empty.


    const generateRandomNodes = () => {
        let nodeCount = Math.floor(Math.random() * 10) + 5; // Generate between 5 to 15 nodes
        let autoNodes = [];
        let autoEdges = [];
        let spacingX = 120;
        let spacingY = 120;

        for (let i = 0; i < nodeCount; i++) {
            let randomId = Math.floor(Math.random() * 1000);
            let x = (i % 5) * spacingX + 100;
            let y = Math.floor(i / 4) * spacingY + 100;
            autoNodes.push({ id: randomId, x, y });

            if (i > 0) {
                let parentIndex = Math.floor(Math.random() * i);
                autoEdges.push({ from: autoNodes[parentIndex].id, to: randomId });
            }
        }

        setNodes(autoNodes);
        setEdges(autoEdges);
        setBfsOrder([]); // Reset BFS order
    };

    const bfs = (startId) => {
        if (isRunning) return;
        setIsRunning(true);
        let queue = [startId];
        let visited = new Set();
        let order = [];

        const interval = setInterval(() => {
            if (queue.length === 0) {
                clearInterval(interval);
                setIsRunning(false);
                return;
            }
            const current = queue.shift();
            if (!visited.has(current)) {
                visited.add(current);
                order.push(current);
                setBfsOrder([...order]);

                const neighbors = edges
                    .filter((edge) => edge.from === current || edge.to === current)
                    .map((edge) => (edge.from === current ? edge.to : edge.from))
                    .filter((neighbor) => !visited.has(neighbor));

                queue.push(...neighbors);
            }
        }, 800);
    };


**4.2 Depth-First Search**
const generateRandomNodes = () => {
        let nodeCount = Math.floor(Math.random() * 10) + 5; // Generate between 5 to 15 nodes
        let autoNodes = [];
        let autoEdges = [];
        let spacingX = 120;
        let spacingY = 120;

        for (let i = 0; i < nodeCount; i++) {
            let randomId = Math.floor(Math.random() * 1000);
            let x = (i % 5) * spacingX + 100;
            let y = Math.floor(i / 4) * spacingY + 100;
            autoNodes.push({ id: randomId, x, y });

            if (i > 0) {
                let parentIndex = Math.floor(Math.random() * i);
                autoEdges.push({ from: autoNodes[parentIndex].id, to: randomId });
            }
        }

        setNodes(autoNodes);
        setEdges(autoEdges);
        setDfsOrder([]); // Reset DFS order
    };

    const dfs = (startId) => {
        if (isRunning) return;
        setIsRunning(true);
        let stack = [startId];
        let visited = new Set();
        let order = [];

        const interval = setInterval(() => {
            if (stack.length === 0) {
                clearInterval(interval);
                setIsRunning(false);
                return;
            }
            const current = stack.pop();
            if (!visited.has(current)) {
                visited.add(current);
                order.push(current);
                setDfsOrder([...order]);

                const neighbors = edges
                    .filter((edge) => edge.from === current || edge.to === current)
                    .map((edge) => (edge.from === current ? edge.to : edge.from))
                    .filter((neighbor) => !visited.has(neighbor));

                stack.push(...neighbors.reverse()); // Reverse for proper DFS order
            }
        }, 800);
    };

**4.3 Dijkstra’s Algorithm**
How It Works:
Finds shortest path from a source node to all others in a weighted graph.
Uses a priority queue (min-heap) to process nodes with the smallest cost first.
const generateRandomGraph = () => {
        let nodeCount = Math.floor(Math.random() * 10) + 5; // Generate between 5 to 15 nodes
        let autoNodes = [];
        let autoEdges = [];
        let spacingX = 120;
        let spacingY = 120;

        for (let i = 0; i < nodeCount; i++) {
            let randomId = Math.floor(Math.random() * 1000);
            let x = (i % 5) * spacingX + 100;
            let y = Math.floor(i / 4) * spacingY + 100;
            autoNodes.push({ id: randomId, x, y });
        }

        for (let i = 0; i < nodeCount; i++) {
            for (let j = i + 1; j < nodeCount; j++) {
                if (Math.random() > 0.5) { // Randomly connect nodes
                    let weight = Math.floor(Math.random() * 20) + 1;
                    autoEdges.push({ from: autoNodes[i].id, to: autoNodes[j].id, weight });
                }
            }
        }

        setNodes(autoNodes);
        setEdges(autoEdges);
        setDistances({});
        setVisitedNodes([]);
    };

    const dijkstra = (startId) => {
        if (isRunning) return;
        setIsRunning(true);

        let distances = {};
        let visited = new Set();
        let pq = [{ node: startId, dist: 0 }];
        let order = [];

        nodes.forEach(node => distances[node.id] = Infinity);
        distances[startId] = 0;

        const interval = setInterval(() => {
            if (pq.length === 0) {
                clearInterval(interval);
                setIsRunning(false);
                return;
            }

            pq.sort((a, b) => a.dist - b.dist); // Min-Heap Simulation
            let { node: current, dist } = pq.shift();

            if (!visited.has(current)) {
                visited.add(current);
                order.push(current);
                setVisitedNodes([...order]);

                edges
                    .filter(edge => edge.from === current || edge.to === current)
                    .forEach(edge => {
                        let neighbor = edge.from === current ? edge.to : edge.from;
                        let newDist = dist + edge.weight;

                        if (newDist < distances[neighbor]) {
                            distances[neighbor] = newDist;
                            pq.push({ node: neighbor, dist: newDist });
                        }
                    });

                setDistances({ ...distances });
            }
        }, 800);
    };


**4.4 Prim’s Algorithm**
How It Works:
Finds the minimum cost tree connecting all nodes.
Uses a priority queue to always expand the lowest-cost edge first.

    const generateRandomGraph = () => {
        let nodeCount = Math.floor(Math.random() * 10) + 5;
        let autoNodes = [];
        let autoEdges = [];
        let spacingX = 120;
        let spacingY = 120;

        for (let i = 0; i < nodeCount; i++) {
            let randomId = Math.floor(Math.random() * 1000);
            let x = (i % 5) * spacingX + 100;
            let y = Math.floor(i / 4) * spacingY + 100;
            autoNodes.push({ id: randomId, x, y });
        }

        for (let i = 0; i < nodeCount; i++) {
            for (let j = i + 1; j < nodeCount; j++) {
                let weight = Math.floor(Math.random() * 20) + 1;
                autoEdges.push({ from: autoNodes[i].id, to: autoNodes[j].id, weight });
            }
        }

        setNodes(autoNodes);
        setEdges(autoEdges);
        setMstEdges([]);
        setVisitedNodes([]);
    };

    const primsAlgorithm = () => {
        if (isRunning) return;
        setIsRunning(true);

        let visited = new Set();
        let mst = [];
        let edgeQueue = [];

        let startNode = nodes[0]?.id;
        if (!startNode) return;

        visited.add(startNode);
        setVisitedNodes([startNode]);

        edges.forEach((edge) => {
            if (edge.from === startNode || edge.to === startNode) {
                edgeQueue.push(edge);
            }
        });

        edgeQueue.sort((a, b) => a.weight - b.weight);

        const interval = setInterval(() => {
            if (visited.size === nodes.length || edgeQueue.length === 0) {
                clearInterval(interval);
                setIsRunning(false);
                return;
            }

            let nextEdge = edgeQueue.shift();
            let newNode = visited.has(nextEdge.from) ? nextEdge.to : nextEdge.from;

            if (!visited.has(newNode)) {
                visited.add(newNode);
                mst.push(nextEdge);
                setMstEdges([...mst]);
                setVisitedNodes([...visited]);

                edges.forEach((edge) => {
                    if ((edge.from === newNode || edge.to === newNode) && !visited.has(edge.from) && !visited.has(edge.to)) {
                        edgeQueue.push(edge);
                    }
                });
                
                edgeQueue.sort((a, b) => a.weight - b.weight);
            }
        }, 1000);
    };

4.5 Kruskal’s Algorithm
const generateRandomGraph = () => {
        let nodeCount = Math.floor(Math.random() * 10) + 5;
        let autoNodes = [];
        let autoEdges = [];
        let spacingX = 120;
        let spacingY = 120;

        for (let i = 0; i < nodeCount; i++) {
            let randomId = Math.floor(Math.random() * 1000);
            let x = (i % 5) * spacingX + 100;
            let y = Math.floor(i / 4) * spacingY + 100;
            autoNodes.push({ id: randomId, x, y });
        }

        for (let i = 0; i < nodeCount; i++) {
            for (let j = i + 1; j < nodeCount; j++) {
                if (Math.random() > 0.5) {
                    let weight = Math.floor(Math.random() * 20) + 1;
                    autoEdges.push({ from: autoNodes[i].id, to: autoNodes[j].id, weight });
                }
            }
        }

        setNodes(autoNodes);
        setEdges(autoEdges);
        setMstEdges([]);
        setVisitedNodes([]);
    };

    const find = (parent, i) => {
        if (parent[i] === i) return i;
        return find(parent, parent[i]);
    };

    const union = (parent, rank, x, y) => {
        let rootX = find(parent, x);
        let rootY = find(parent, y);

        if (rootX !== rootY) {
            if (rank[rootX] < rank[rootY]) {
                parent[rootX] = rootY;
            } else if (rank[rootX] > rank[rootY]) {
                parent[rootY] = rootX;
            } else {
                parent[rootY] = rootX;
                rank[rootX]++;
            }
        }
    };

    const kruskal = () => {
        if (isRunning) return;
        setIsRunning(true);

        let sortedEdges = [...edges].sort((a, b) => a.weight - b.weight);
        let parent = {};
        let rank = {};
        nodes.forEach(node => {
            parent[node.id] = node.id;
            rank[node.id] = 0;
        });

        let mst = [];
        let visited = new Set();
        let edgeIndex = 0;

        const interval = setInterval(() => {
            if (mst.length === nodes.length - 1 || edgeIndex >= sortedEdges.length) {
                clearInterval(interval);
                setIsRunning(false);
                return;
            }

            let edge = sortedEdges[edgeIndex];
            let rootFrom = find(parent, edge.from);
            let rootTo = find(parent, edge.to);

            if (rootFrom !== rootTo) {
                mst.push(edge);
                visited.add(edge.from);
                visited.add(edge.to);
                union(parent, rank, rootFrom, rootTo);
            }

            edgeIndex++;
            setMstEdges([...mst]);
            setVisitedNodes([...visited]);
        }, 800);
    };

 i used **boostrap** to make it responsive [utility class  and spacing ,rounded shadow ,border ,button ].

**5 Tree Algorithms**
5.1 Depth-First Search (DFS)
How It Works:
DFS explores a tree deeply before backtracking.
It can be implemented in three ways:
Preorder (Root → Left → Right)
Inorder (Left → Root → Right)
Postorder (Left → Right → Root)
Uses recursion (or stack) for traversal.
 Steps:

Start at the root.
Recursively visit left and right subtrees.

 generateRandomTree = () => {
        const values = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100));
        const newTree = buildBinaryTree(values, 600, 50, 250); // Adjusted X offset
        setTree(newTree);
        setTraversalOrder([]);
        setActiveNode(null);
    };
    
    const buildBinaryTree = (values, x, y, offset) => {
        if (values.length === 0) return null;
        const mid = Math.floor(values.length / 2);
        return {
            value: values[mid],
            x: Math.max(50, Math.min(1200, x)), // Prevents nodes from going too far left/right
            y: Math.max(50, y), // Ensures nodes stay within bounds
            left: buildBinaryTree(values.slice(0, mid), x - offset, y + 100, offset / 1.5),
            right: buildBinaryTree(values.slice(mid + 1), x + offset, y + 100, offset / 1.5),
        };
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

5.2 Binary Search Tree (BST)

How It Works:
A BST is a tree where:
Left subtree contains nodes less than the root.
Right subtree contains nodes greater than the root.
Efficient for search operations (O(log N) average case).
 Steps to Insert a Node:

If the tree is empty, create a new node.
If the value is less than root, insert in left subtree.
If the value is greater than root, insert in right subtree.

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

 5.3 Lowest Common Ancestor (LCA)

 How It Works:
The LCA of two nodes is the deepest node that has both nodes as descendants.
Efficient for BSTs:
If both nodes are smaller, go left.
If both nodes are greater, go right.
If one node is on the left and the other on the right, current node is the LCA.
 Steps:

Start from root.
Traverse left if both nodes are smaller.
Traverse right if both nodes are greater.
If one node is on each side, return the current node.
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

 5.4 AVL Tree
 How It Works:
AVL tree is a self-balancing BST.
Ensures height difference (balance factor) between left & right subtrees is ≤ 1.
Uses rotations to maintain balance:
Right Rotation (LL Case)
Left Rotation (RR Case)
Left-Right Rotation (LR Case)
Right-Left Rotation (RL Case)
 Steps to Insert:

Insert as in a BST.
Check balance factor (height(left) - height(right)).
Perform rotation if needed.
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

 i used **boostrap** to make it responsive [utility class  and spacing ,rounded shadow ,border ,button ].
