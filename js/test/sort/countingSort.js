function countingSort(arr) {
    let maxValue = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > maxValue) {
            maxValue = arr[i];
        }
    }
    const bucket = new Array(maxValue + 1).fill(0);
    for (let i = 0; i < arr.length; i++) {
        bucket[arr[i]]++;
    }
    let index = 0;
    for (let i = 0; i < bucket.length; i++) {
        let count = bucket[i];
        while (count > 0) {
            arr[index] = i;
            index++;
            count--;
        }
    }
    return arr;
}

const arr = [804289383];
console.log(countingSort(arr));