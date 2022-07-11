/* 买卖股票的最佳时机
  https://leetcode.cn/explore/featured/card/bytedance/246/dynamic-programming-or-greedy/1042/
*/

// 动态规划
function maxProfit(arr) {
    for (let i = 0; i < arr.length; i++) {
        let max = 0;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] - arr[i] > max) { max = arr[j] - arr[i]; }
        }
        arr[i] = max;
    }
    return Math.max(...arr);
}

// 超过时间限制


function maxProfit1(arr) {
    let ar1 = [];
    let curMax = 0;
    // 从后向前循环，更新当前元素后面的最大值
    for (let i = arr.length - 2; i >= 0; i--) {
        if (arr[i + 1] > curMax) { curMax = arr[i + 1]; }
        ar1[i] = curMax;
    }
    let max = 0;
    for (let i = 0; i < arr.length - 1; i++) {
        if (ar1[i] - arr[i] > max) { max = ar1[i] - arr[i]; }
    }
    return max;
}

// 可以买多次，但每天持有一股
// 回溯
function maxProfitPro(arr) {
    let res = 0;
    fnx(0, 0, arr, arr.length);
    function fnx(k, curRes, arr, n) {
        for (let i = k; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                if (arr[j] > arr[i]) {
                    fnx(j + 1, curRes + arr[j] - arr[i], arr, n);
                }
            }
        }
        if (curRes > res) { res = curRes; }
    }
    return res;
}
// 超出时间限制

// 动态规划
function maxProfitPro1(arr) {
    let dp = [];
    dp[0] = [0, -arr[0]];

    for (let i = 1; i < arr.length; i++) {
        dp[i] = [];
        // 继续不买 or 上次买的卖了
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + arr[i]);
        // 继续上次卖的，或者再买
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - arr[i]);
    }
    return dp[arr.length - 1][0];
}


// 贪心
function maxProfitPro2(arr) {
    if (arr.length < 2) { return 0; }
    let res = 0;
    for (let i = 1; i < arr.length; i++) {
        let diff = arr[i] - arr[i - 1];
        if (diff > 0) {
            res += diff;
        }
    }
    return res;
}

/*
 转换公式
 res =  (prices[3] - prices[2]) + (prices[2] - prices[1]) + (prices[1] - prices[0])
     =  prices[3] - prices[0]
 */

console.log(maxProfitPro2([7, 1, 5, 3, 6, 4]));
console.log(maxProfitPro2([1, 2, 3, 4, 5, 10]));
console.log(maxProfitPro2([7, 6, 4, 3, 1]));
console.log(maxProfitPro2([3, 2, 6, 5, 0, 3]));
console.log(maxProfitPro2([1, 2, 3, 4, 5]));

