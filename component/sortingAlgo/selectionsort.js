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
