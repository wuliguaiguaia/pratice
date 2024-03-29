function QuickSort0(arr) {
    if (arr.length === 0) { return []; }
    if (arr.length === 1) { return arr; }
    const len = arr.length;
    const mid = Math.floor(len / 2); // Math.random() * (max - min) + min;
    let left = [];
    let right = [];
    for (let i = 0; i < len; i++) {
        let item = arr[i];
        if (mid === i) { continue; } // 可能有重复！
        if (item < arr[mid]) {
            left.push(item);
        } else {
            right.push(item);
        }
    }
    return QuickSort0(left).concat(arr[mid]).concat(QuickSort0(right));
}

// 原地排序
const QuickSort1 = function (arr, fn = function (a, b) { return a - b; }) {
    sorter(arr, 0, arr.length - 1, fn);
    return arr;
};

function sorter(arr, start, end, fn) {
    let left = start,
        right = end,
        // 预选一个主元，在交换的过程中找到真正的主元
        mid = arr[Math.floor((end + start) / 2)];
    while (left <= right) { // 必须全部遍历比较，保证left位置开始向后比mid大
        if (fn(arr[left], mid) >= 0 && fn(arr[right], mid) <= 0) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
            continue;
        }

        if (fn(arr[left], mid) < 0) { left++; }
        if (fn(arr[right], mid) > 0) { right--; }
    }
    // 结束循环后left 为真正的主元
    if (left - 1 > start) { // left 左边都是比它小的
        sorter(arr, start, left - 1, fn);
    }
    if (left < end) { // left 右边都是比他大的
        sorter(arr, left, end, fn);
    }
}
const arr = [4, 9, 2, 0, 9, 7, 6, 4, 3];
// console.log(QuickSort1(arr, function (a, b) { return b - a; }));

exports.QuickSort1 = QuickSort1;