/* 最短路径之和 -- ’杨辉三角‘ */

// 暴力回溯
function minimumTotal(arr) {
    let res = Number.MAX_SAFE_INTEGER;
    fn(0, 0, 0);
    function fn(i, j, cur) {
        if (i === arr.length) {
            if (res > cur) { res = cur; }
            return;
        }
        fn(i + 1, j, cur + arr[i][j]);
        fn(i + 1, j + 1, cur + arr[i][j]);
    }
    return res;
}

// 动态规划 - 状态转移表
function minimumTotal1(arr) {
    let arr1 = new Array(arr.length).fill(Number.MAX_SAFE_INTEGER);
    arr1[0] = arr[0][0];
    let temp = [];
    for (let i = 1; i < arr.length; i++) {
        temp = arr1.slice();
        for (let j = 0; j < arr[i].length; j++) {
            arr1[j] = j === 0 ? temp[j] + arr[i][j]
                : Math.min(temp[j - 1], temp[j]) + arr[i][j];
        }
    }
    return Math.min(...arr1);
}


// 动态规划 - 状态转移方程
function minimumTotal2(arr) {
    let res = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < arr.length; i++) {
        let d = fn(arr.length - 1, i);
        if (d < res) {
            res = d;
        }
    }
    function fn(i, j) {
        if (i < 0) { return 0; }
        if (j < 0 || j >= arr[i].length) { return Number.MAX_SAFE_INTEGER; }
        return Math.min(fn(i - 1, j - 1), fn(i - 1, j)) + arr[i][j];
    }
    return res;
}

// 回溯 与 状态转移方程 超出时间限制


// 原地修改
function minimumTotal3(arr) {
    for (let i = 1; i < arr.length; i++) {
        for (let j = 0; j <= i; j++) {
            if (j === 0) {
                arr[i][j] = arr[i][j] + arr[i - 1][j];
            } else if (j === i) {
                arr[i][j] = arr[i][j] + arr[i - 1][j - 1];
            } else {
                arr[i][j] = arr[i][j] + Math.min(arr[i - 1][j - 1], arr[i - 1][j]);
            }
        }
    }
    return Math.min(...arr.pop());
}
console.log(minimumTotal3([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]));
console.log(minimumTotal3([[-10]]));

