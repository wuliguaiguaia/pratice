/*
  6.21
  二分搜索
  随机算法
 */

const { QuickSort1 } = require('./sort/quickSort.js');

function binarySearch(arr, value) {
    arr = QuickSort1(arr);
    let low = 0;
    let high = arr.length - 1;
    while (low <= high) {
        let mid = Math.floor((high + low) / 2);
        let item = arr[mid];
        if (item === value) {
            return mid;
        } else if (item < value) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}

console.log(binarySearch([0, 2, 1, 4, 9, 6, 7], 9));


function shuffle(arr) {
    const len = arr.length;
    for (let i = len - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * i); // 或i+1,可能为i 此时不交换
        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
    return arr;
}

console.log(shuffle([1, 2, 3, 4, 5]));

function rotateSearch(arr) {
    let len = arr.length;
    let low = 0;
    let high = len - 1;
    let mid = Math.floor((low + high) / 2);
    while (low < high) {
        let val = arr[mid];
        if (val > arr[high]) {
            low = mid + 1; // 可跳过
        } else if (val < arr[high]) {
            high = mid;
        }
        mid = Math.floor((low + high) / 2);
    }
    return arr[low];
}

console.log(rotateSearch([3, 4, 5, 1, 2]));