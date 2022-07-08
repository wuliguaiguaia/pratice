/* eslint-disable max-depth */
/* 数独解题器 */

function sudukuSolver(arr) {
    if (fn(arr)) {
        // console.log(arr);
        return arr;
    }
    return false;
}
function fn(arr) {
    let hasBlank = false;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[i][j] === '.') {
                hasBlank = true;
                let flag = false;
                for (let k = 1; k <= 9; k++) {
                    if (isSafe(arr, i, j, k + '')) {
                        arr[i][j] = k + '';
                        if (fn(arr)) {
                            flag = true;
                            return true;
                        } else {
                            arr[i][j] = '.'; // 回退
                        }
                    }
                }
                if (!flag) { return false; } // 没有符合条件的 1-9 or 有回退
            }
        }
    }
    if (hasBlank === false) { return true; } //   结束条件
}

function isSafe(arr, i, j, k) {
    // 水平
    for (let m = 0; m < arr[0].length; m++) {
        if (arr[i][m] === k) { return false; }
    }
    // 垂直
    for (let m = 0; m < arr.length; m++) {
        if (arr[m][j] === k) { return false; }
    }
    // 3x3
    let x = i - (i % 3);
    let y = j - (j % 3);
    for (let m = 0; m < 3; m++) {
        for (let n = 0; n < 3; n++) {
            if (arr[m + x][n + y] === k) { return false; }
        }
    }
    return true;
}

/* console.log(sudukuSolver([
    ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9']]
));
console.log(sudukuSolver(
    [['8', '3', '.', '.', '7', '.', '.', '.', '.'],
        ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
        ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
        ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
        ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
        ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
        ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
        ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
        ['.', '.', '.', '.', '8', '.', '.', '7', '9']]

)); */