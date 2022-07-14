/* 最大子数组和 */

// 暴力搜索 O(N^2)
function maxSubArray(arr) {
    if (arr.length === 1) { return arr[0]; }
    let max = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < arr.length; i++) {
        let cur = 0;
        for (let j = i; j < arr.length; j++) {
            cur += arr[j];
            if (cur > max) {
                max = cur;
            }
        }
    }
    return max;
}


// 动态规划 O(N)
// 从dp[i] 递推到 dp[i+1]
// 若dp[i−1]≤0 ，说明dp[i−1] 对dp[i] 产生负贡献，即dp[i−1]+nums[i] 还不如nums[i] 本身大。

function maxSubArray1(arr) {
    if (arr.length === 1) { return arr[0]; }
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] > 0) {
            arr[i] = arr[i] + arr[i - 1];
        }
        if (arr[i] > max) { max = arr[i]; }
    }
    return max;
}


// 分治 O(nlogn)
function maxSubArray2(arr) {
    if (arr.length === 1) { return arr[0]; }
    return fn(arr, 0, arr.length - 1);
    function fn(arr, start, end) {
        if (start === end) { return arr[start]; }
        const mid = Math.floor((start + end) / 2);
        const leftMax = fn(arr, start, mid);
        const rightMax = fn(arr, mid + 1, end);
        const mergeMax = fn2(arr, start, mid, end);
        return Math.max(leftMax, rightMax, mergeMax);
    }
    function fn2(arr, start, mid, end) {
        if (start === end) { return arr[start]; }
        let leftMax = Number.MIN_SAFE_INTEGER;
        let count = 0;
        for (let i = mid; i >= start; i--) { // 从右往左，连续性
            count += arr[i];
            if (count > leftMax) { leftMax = count; }
        }
        let rightMax = Number.MIN_SAFE_INTEGER;
        count = 0;
        for (let i = mid + 1; i <= end; i++) {
            count += arr[i];
            if (count > rightMax) { rightMax = count; }
        }
        return leftMax + rightMax;
    }
}

console.log(maxSubArray2([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
console.log(maxSubArray2([5, 4, -1, 7, 8]));