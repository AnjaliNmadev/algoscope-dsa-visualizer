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
