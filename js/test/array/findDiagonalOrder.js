// 打印二维数组 对角线s形打印二维数组  明之梦
// https://leetcode.cn/problems/diagonal-traverse/


// 越界后再处理。。。麻了 服了 猪脑子啊
function findDiagonalOrder(arr) {
    let row = arr.length, col = arr[0].length;
    let isUp = true;
    let res = [];
    let i = 0, j = 0;
    while (true) {
        if (i >= row && j >= col) { break; }
        if (i > -1 && j > -1 && i < row && j < col) {
            // 不越界保存
            res.push(arr[i][j]);
        } else {
            // 越界处理
            if (isUp) {
                isUp = false;
                if (j === col) {
                    i++;
                } else {
                    j++;
                }
            } else {
                isUp = true;
                if (i === row) {
                    j++;
                } else {
                    i++;
                }
            }
        }
        // 正常流程
        if (isUp) {
            i--;
            j++;
        } else {
            i++;
            j--;
        }
    }
    return res;
}

console.log(findDiagonalOrder([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]));
// 1 2 4 7 5 3 6 8 9


// 原版 边界处理好窒息。。
function fn(arr) {
    let row = arr.length, col = arr[0].length;
    let i = 0, j = 0, dir = 1;
    let res = [];
    while (true) {
        console.log(i, j, dir);
        res.push(arr[i][j]);
        if (i === row - 1 && j === col - 1) { break; }
        if (dir === 1) {
            if (i - 1 >= 0 || j + 1 < col) {
                if (i - 1 >= 0) {
                    i = i - 1;
                } else {
                    dir = 0;
                }
                if (j + 1 < col) { j = j + 1; }
            } else {
                i = i + 1;
                dir = 0;
            }
        } else {
            if (i + 1 < row || j - 1 >= 0) {
                if (j - 1 >= 0 && i + 1 < row) {
                    j = j - 1;
                } else {
                    dir = 1;
                    // j = j +1
                }
                if (i + 1 < row) { i = i + 1; }
            } else {
                j = j + 1;
                dir = 1;
            }
        }
    }
    return res;
}

