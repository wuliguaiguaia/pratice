// 机器人的运动范围
// https://leetcode.cn/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof/

var movingCount = function (m, n, k) {
    let arr = new Array(m * n).fill(false);
    let res = 0;
    dfs(0, 0);
    function dfs(i, j) {
        if (arr[i * n + j]) { return; } // 被访问过
        if (i < 0 || i >= m || j < 0 || j >= n) { return; } // 超出范围
        let count = getCount(i, j);
        if (count > k) { return; }
        arr[i * n + j] = true; // 状态修改
        res += 1;
        dfs(i - 1, j);
        dfs(i + 1, j);
        dfs(i, j - 1);
        dfs(i, j + 1);
    }
    return res;
};

function getCount(i, j) {
    let res = 0;
    let row = String(i);
    let col = String(j);
    while (row) {
        res += Number(row[0]);
        row = row.slice(1);
    }
    while (col) {
        res += Number(col[0]);
        col = col.slice(1);
    }
    return res;
}

// 改进 getCount

function getDigitNum(num) {
    let res = 0;
    while (num) {
        res += num % 10;
        num = Math.floor(num / 10);
    }
    return res;
}