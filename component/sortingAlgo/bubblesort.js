
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

   

    return animation;
}

export default BubbleSort;
