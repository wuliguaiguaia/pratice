// 计算逆序对  分治
function reverseCount(arr) {
    let count = 0;
    return split(arr, count, 0, arr.length - 1);
}

function split(arr, count, start, end) {
    if (start >= end) { return count; }
    const mid = Math.floor((start + end) / 2);
    const leftCount = split(arr, count, start, mid);
    const rightCount = split(arr, count, mid + 1, end);
    const mergeCount = merge(arr, start, mid, end);
    count += leftCount + rightCount + mergeCount;
    return count;
}

function merge(arr, start, mid, end) {
    let i = start;
    let count = 0;
    while (i <= mid) {
        let j = mid + 1;
        while (j <= end) {
            if (arr[i] > arr[j]) {
                count += 1;
            }
            j++;
        }
        i++;
    }
    return count;
}

console.log(reverseCount([1, 5, 6, 2, 3, 4]));
console.log(reverseCount([4, 7, 5, 6, 2]));