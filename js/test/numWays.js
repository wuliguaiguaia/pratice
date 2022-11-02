/* 青蛙跳台阶 */
// https://leetcode.cn/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/

function numWays(n) {
    if (n === 0) { return 1; }
    if (n === 1) { return 1; }
    if (n === 2) { return 2; }
    return numWays(n - 1) + numWays(n - 2);
}

// 复杂度近似为O(2 ^ N)
// 等比数列求和 https://www.shuxuele.com/algebra/sequences-sums-geometric.html

// 尾递归优化
function numWays1(n, c = 3, s = 1, e = 2) {
    if (n === 1) { return s; }
    if (n === 2) { return e; }
    if (c === n) {
        return s + e;
    }
    return numWays1(n, c + 1, e, s + e);
}

// 记忆化，算过的不用再算
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

// 动态规划，前一结果递推
function numWays3(n) {
    if (n === 0) { return 1; }
    if (n === 1) { return 1; }
    if (n === 2) { return 2; }
    let f = 1;
    let f2 = 2;
    let ans;
    for (let i = 3; i <= n; i++) {
        ans = f + f2;
        f = f2;
        f2 = ans;
    }
    return ans;
}
// 大数越界： 随着 n 增大, f(n) 会超过 Int32 甚至 Int64 的取值范围，导致最终的返回值错误
