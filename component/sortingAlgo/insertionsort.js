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
