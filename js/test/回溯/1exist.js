// 矩阵中的路径
// https://leetcode.cn/problems/ju-zhen-zhong-de-lu-jing-lcof/

function exist(arr, str) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (findPath(arr, i, j, str)) {
                return true;
            }
        }
    }
    return false;
}

function findPath(arr, i, j, str) {
    if (i < 0 || i >= arr.length) { return false; }
    if (j < 0 || j >= arr[0].length) { return false; }
    if (arr[i][j] === true) { return false; } // 不可重复
    if (arr[i][j] !== str[0]) { return false; }
    str = str.slice(1, str.length);
    if (str.length === 0) { return true; }
    let item = arr[i][j]; // //// 记住值！！！！
    arr[i][j] = true;
    if (findPath(arr, i - 1, j, str)) { // 上
        return true;
    }
    if (findPath(arr, i + 1, j, str)) { // 下
        return true;
    }
    if (findPath(arr, i, j - 1, str)) { // 左
        return true;
    }
    if (findPath(arr, i, j + 1, str)) { // 右
        return true;
    }
    arr[i][j] = item; // 退出栈恢复值！！！！！
    return false;
}


console.log(exist([['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'F']], 'ABCESFECFSADE'));
console.log(exist([['A', 'B']], 'ABBA')); // 不能重复使用
console.log(exist([['C', 'A', 'A'], ['A', 'A', 'A'], ['B', 'C', 'D']], 'AAB')); // 不能重复使用


// 既然编程功底不行，建议再抄一遍代码

function hasPath(arr, str) {
    let rows = arr.length, cols = arr[0].length;
    let visited = new Array(rows * cols).fill(false); // 是否访问过 对于 row为i，col为j,排在 row*cols+col
    let pathLength = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (hasPathCore(arr, rows, cols, i, j, str, pathLength, visited)) {
                return true;
            }
        }
    }
    return false;
}
function hasPathCore(arr, rows, cols, i, j, str, pathLength, visited) {
    if (pathLength === str.length) { return true; }
    let hasPath = false;
    if (i >= 0 && i < rows
    && j >= 0 && j < cols
    && arr[i][j] === str[pathLength]
    && !visited[i * cols + j]) {
        pathLength++; // 修改状态
        visited[i * cols + j] = true; // 修改状态
        hasPath = hasPathCore(arr, rows, cols, i - 1, j, str, pathLength, visited)
      || hasPathCore(arr, rows, cols, i + 1, j, str, pathLength, visited)
      || hasPathCore(arr, rows, cols, i, j - 1, str, pathLength, visited)
          || hasPathCore(arr, rows, cols, i, j + 1, str, pathLength, visited);

        if (!hasPath) { // 状态重置
            pathLength--;
            visited[i * cols + j] = false;
        }
    }
    return hasPath;
}