/*
  二分搜索
  随机算法
 */

const { QuickSort1 } = require('./sort/quickSort.js');

// 二分 - 迭代
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

// console.log(binarySearch([0, 2, 1, 4, 9, 6, 7], 9));


function shuffle(arr) {
    const len = arr.length;
    for (let i = len - 1; i > 0; i--) { // 倒序
        const randomIndex = Math.floor(Math.random() * i); // 或i+1,可能为i 此时不交换
        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
    return arr;
}

// console.log(shuffle([1, 2, 3, 4, 5]));


// 使用二分找到数组旋转后的最小值
var minArray = function (arr) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] > arr[right]) {
            left = mid + 1;
        } else if (arr[mid] < arr[right]) {
            right = mid;
        } else {
            right--; // 相等就略过 缩小范围！！！
        }
    }
    return arr[left];
};

// console.log(rotateSearch([3, 4, 5, 1, 2])); // 1

/*
  递归二分搜索
  有索引的切换，需要有个递归函数作为辅助
*/
function binarySearch2(arr, value) {
    let len = arr.length;
    let low = 0;
    let high = len - 1;
    return binarySearchRecurisive(arr, low, high, value);
}

function binarySearchRecurisive(arr, low, high, value) {
    if (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (arr[mid] > value) {
            return binarySearchRecurisive(arr, low, mid - 1, value);
        } else if (arr[mid] < value) {
            return binarySearchRecurisive(arr, mid + 1, high, value);
        } else {
            return mid;
        }
    }
    return -1;
}

console.log(binarySearch2([1, 2, 3, 4, 5, 7, 9, 10], 3));
