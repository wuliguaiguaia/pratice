function mergeSort(arr) {
    if (arr.length <= 1) { return arr; }
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid, arr.length));

    let result = [], i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    result = result.concat(i === left.length ? right.slice(j) : left.slice(i));
    return result;
}

let arr = [4, 7, 5, 3, 2, 6, 9];
console.log(mergeSort(arr));


Array.prototype.slice();
String.prototype.slice();

// 不会改动原字符串或数组

// slice(start, end)
// start 为负数时，start = start + arr.legnth;
// end 默认 arr.length，end 为负数同样 + arr.length


function mergeSort2(arr) {
    if (arr.length <= 1) { return arr; }
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort2(arr.slice(0, mid));
    const right = mergeSort2(arr.slice(mid, arr.length));

    if (arr[mid - 1] < arr[mid]) { // 已排好序
        return arr;
    }

    let result = [];

    while (left.length && right.length) {
        if (left[0] < right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    result = result.concat(left.length ? left : right);
    return result;
}

console.log(mergeSort2([4, 6, 9, 3, 6, 1, 0]));


function mergeSort3(arr) {
    if (arr.length < 2) { return arr; }
    split(arr, 0, arr.length - 1);
    return arr;
}
function split(arr, start, end) {
    if (start >= end) { return; }
    const mid = Math.floor((start + end) / 2);
    split(arr, start, mid);
    split(arr, mid + 1, end);
    merge(arr, start, mid, end, arr.slice());
}
function merge(arr, start, mid, end, tempArr) {
    let i = start;
    let j = mid + 1;
    for (let k = start; k <= end; k++) {
        if (i > mid) {
            arr[k] = tempArr[j++];
        } else if (j > end) {
            arr[k] = tempArr[i++];
        } else if (tempArr[i] > tempArr[j]) {
            arr[k] = tempArr[j++];
        } else {
            arr[k] = tempArr[i++];
        }
    }
}

/*
    运行时间：122ms
    超过13.46 % 用Javascript提交的代码
    占用内存：11428KB
    超过13.46 % 用Javascript提交的代码
*/
console.log(mergeSort3([9, 4, 3, 6]));