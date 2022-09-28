// 剑指 Offer 03. 数组中重复的数字
// 【所有数字都在 0 ~ n - 1 之间，不会出现超出长度的数字】

// 1 排序对比 i和i+1： 时间：O(nlgn)
// 2 hash 是否存在：时间 O(n) 空间 O(n)
// 3 交换下标与值： 时间 O(n) 空间 O(1)

function fn(arr) {
    if (!arr.length) { return null; }
    for (let i = 0; i < arr.length; i++) {
        while (i !== arr[i]) { // 位置不对
            if (arr[arr[i]] === arr[i]) { // 位置上已经有了
                return arr[i];
            }
            [arr[i], arr[arr[i]]] = [arr[arr[i]], arr[i]];
        }
    }
    return null;
}

// console.log(fn([2, 3, 1, 0, 2, 5, 3]));
// console.log(fn([3, 5, 1, 4, 2, 0]));
// console.log(fn([3, 5, 1, 2, 3, 2, 0]));
// console.log(fn([]));

// 扩展：不修改原数组
// 【长度 n，范围 1-n，至少有一个重复的数字】
// 二分 O(nlgn) 空间 O(1)

// 对 1 ~ n 进行二分，从原数组找值在 1 ~ m 内的值的数量，如果大于m表示有重复
function fn2(arr) {
    if (!arr.length) { return -1; }
    let len = arr.length;
    let left = 1, right = len - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let count = computedCount(arr, left, mid);
        if (left === right) {
            if (count > 1) { return left; }
        }
        if (count > mid - left + 1) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return -1;
}

function computedCount(arr, left, right) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= left && arr[i] <= right) {
            count++;
        }
    }
    return count;
}

console.log(fn2([6, 2, 4, 3, 2, 5, 1]));
console.log(fn2([2, 3, 5, 4, 3, 2, 6, 7]));