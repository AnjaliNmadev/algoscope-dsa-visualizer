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
