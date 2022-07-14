/* 俄罗斯套娃 */

// 最长递增子序列的二维版本

// 暴力回溯
function maxEnvelopes(arr) {
    let res = 1;
    arr.forEach((_, i) => {
        fn(arr, i, 1, [i]);
    });
    function fn(arr, i, cur, arr2) {
        for (let j = 0; j < arr.length; j++) {
            if (!arr2.includes(j) && arr[i][0] > arr[j][0] && arr[i][1] > arr[j][1]) {
                let arr3 = arr2.concat(j);
                fn(arr, j, cur + 1, arr3);
            }
        }
        if (cur > res) {
            res = cur;
        }
    }
    return res;
}

// 动态规划
// 先排序后规划
function maxEnvelopes2(arr) {
    arr = arr.sort((x, y) => {
        if (x[0] !== y[0]) {
            return x[0] - y[0];
        } else {
            return x[1] - y[1];
        }
    });
    let max = 1;
    const dp = new Array(arr.length).fill(1);
    for (let i = 1; i < arr.length; i++) {
        for (let j = i - 1; j >= 0; j--) {
            if (arr[j][0] < arr[i][0] && arr[j][1] < arr[i][1]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
                if (dp[i] > max) { max = dp[i]; }
            }
        }
    }
    return max;
}

// 烦死人，还是超出时间限制

console.log(maxEnvelopes2([[30, 50], [12, 2], [3, 4], [12, 15]]));