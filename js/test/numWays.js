/* 青蛙跳台阶 */

function numWays(n) {
    if (n === 0) { return 1; }
    if (n === 1) { return 1; }
    if (n === 2) { return 2; }
    return numWays(n - 1) + numWays(n - 2);
}

// 记忆化
function numWays2(n) {
    let arr = [1, 1, 2];
    function fn(n) {
        if (arr[n]) {
            return arr[n];
        } else {
            let res = numWays(n - 1) + numWays(n - 2);
            arr[n] = res;
            return res;
        }
    }
    return fn(n);
}

// 复杂度近似为O(2 ^ N)

// 动态规划
function numWays3(n) {
    let arr = [1, 1];
    if (arr[n]) {
        return arr[n];
    }
    for (let i = 2; i <= n; i++) {
        arr[i] = arr[i - 1] + arr[i - 2];
    }
    return arr[n];
}

// 大数越界： 随着 n 增大, f(n) 会超过 Int32 甚至 Int64 的取值范围，导致最终的返回值错误

console.log(numWays(20));