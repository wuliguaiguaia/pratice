/* 迷宫老鼠问题 */
/* 从[0,0] 到[n-1, n-1] */

function ratInAMaze(arr) {
    let res = [];
    let hs = arr.length;
    let vs = arr[0].length;
    for (let i = 0; i < hs; i++) {
        res[i] = [];
        for (let j = 0; j < vs; j++) {
            res[i][j] = 0;
        }
    }
    if (findPath(res, arr, 0, 0, hs, vs)) {
        return res;
    }
    return false;
}

function findPath(res, arr, i, j, hs, vs) {
    if (i === hs - 1 && j === vs - 1) {
        res[i][j] = 1;
        return true;
    }
    if (i >= hs || j >= vs || i < 0 || j < 0) { return false; }
    console.log(i, j, res[i][j]);
    if (res[i][j]) { return false; } // 已经走过了
    if (arr[i][j]) {
        res[i][j] = 1;
        if (findPath(res, arr, i + 1, j, hs, vs)) { return true; }
        if (findPath(res, arr, i, j + 1, hs, vs)) { return true; }
        if (findPath(res, arr, i, j - 1, hs, vs)) { return true; }
        if (findPath(res, arr, i - 1, j, hs, vs)) { return true; }
        res[i][j] = 0;
        return false;
    }
    return false;
}
console.log(1e6);
console.log(ratInAMaze(
    [
        [1, 0, 1, 1, 1],
        [1, 1, 1, 0, 1],
        [0, 0, 1, 1, 1],
        [0, 1, 0, 1, 0],
        [0, 1, 1, 1, 1],
    ]
));

// 如果网格数是 10e6 呢。。