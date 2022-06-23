function QuickSort0(arr) {
    if (arr.length === 0) { return []; }
    if (arr.length === 1) { return arr; }
    const len = arr.length;
    const mid = Math.floor(len / 2); // Math.random() * (max - min) + min;
    let left = [];
    let right = [];
    for (let i = 0; i < len; i++) {
        let item = arr[i];
        if (mid === i) { continue; }
        if (item < arr[mid]) {
            left.push(item);
        } else {
            right.push(item);
        }
    }
    return QuickSort0(left).concat(arr[mid]).concat(QuickSort0(right));
}

// 原地排序
const QuickSort1 = function (arr) {
    sorter(arr, 0, arr.length - 1);
    return arr;
};

function sorter(arr, start, end) {
    let left = start,
        right = end,
        mid = arr[Math.floor((end + start) / 2)];
    while (left <= right) { // 必须全部遍历比较，保证left位置开始向后比mid大
        if (arr[left] >= mid && arr[right] <= mid) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
            continue;
        }

        if (arr[left] < mid) { left++; }
        if (arr[right] > mid) { right--; }
    }
    if (left - 1 > start) {
        sorter(arr, start, left - 1);
    }
    if (left < end) {
        sorter(arr, left, end);
    }
}
const arr = [4, 9, 2, 0, 9, 7, 6, 4, 3];
console.log(QuickSort1(arr));

exports.QuickSort1 = QuickSort1;
