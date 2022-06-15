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

// function mergeSort3(arr, start = 0) {
//     if (arr.length <= 1) { return arr; }
//     const mid = Math.floor(arr.length / 2);
//     const left = mergeSort2(arr.slice(0, mid), start);
//     const right = mergeSort2(arr.slice(mid, arr.length), start + mid);

//     if (arr[mid - 1] < arr[mid]) { // 已排好序
//         return arr;
//     }
//     let i = 0;
//     let len = right.length;
//     for (let j = 0; j < len - 1; j++) {
//         if (left[i] > right[j] && left[i] < right[j + 1]) {
//             [arr[i + start], arr[start + mid + j]] = [arr[start + mid + j], arr[i + start]];
//         } else if (left[i] > right[j + 1]) {
//             arr.push(arr.splice(i + start, 1));
//         } else {
//             arr.unshift(arr.splice(i + start, 1));
//         }
//         i++;
//     }
//     return arr;
// }

// console.log(mergeSort3([4, 6, 9, 3, 6, 1, 0]));