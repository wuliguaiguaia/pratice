/* 八皇后 */

// 1 迭代 - 只有一种解决方案
/* 二维数组表示状态 */
function queens(n) {
    let arr = [];
    let arr2 = [];
    let i = 0;
    let flag = false;
    while (i < n) {
        if (!arr[i]) { arr[i] = []; }
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0 && !flag) {
                arr[0][0] = true;
                arr2.push([0, 0]);
                falsyFn(i, j, n, arr, -1);
                i++;
                break;
            } else {
                while (j <= n && (typeof arr[i][j] === 'number')) {
                    j++;
                }
                if (j >= n) {
                    let lastPosition = arr2.pop();
                    console.log(lastPosition);
                    falsyFn1(lastPosition[0], lastPosition[1], n, arr);
                    arr[lastPosition[0]][lastPosition[1]] = -1;
                    i--;
                    flag = true;
                    break;
                } else {
                    arr[i][j] = true;
                    arr2.push([i, j]);
                    falsyFn(i, j, n, arr);
                    flag = false;
                    i++;
                    break;
                }
            }
        }
    }
    return arr;
}

function falsyFn(row, col, n, arr) {
    for (let i = row; i < n; i++) {
        if (!arr[i]) { arr[i] = []; }
        for (let j = 0; j < n; j++) {
            if (i !== row && arr[i][j] === -1) { arr[i][j] = null; }
            if (i === row && j === col) { continue; }
            if ((i === row) || (j === col) || (i - j === row - col) || (i + j === row + col)) {
                if (!arr[i][j] && arr[i][j] !== 0) {
                    arr[i][j] = row;
                }
            }
        }
    }
}

function falsyFn1(row, col, n, arr) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (arr[i][j] === row) {
                arr[i][j] = null;
            }
        }
    }
}


// 2 递归 - 多个解决方案
function queens1(n) {
    const result = new Array(n);// 全局或成员变量,下标表示行, 值表示queen存储在哪一列
    cal8queens(0, result, n);
}
function cal8queens(row, result, n) { // 调用方式：cal8queens(0);
    if (row === n) { // 8个棋子都放置好了，打印结果
        printQueens(result, n);
        return;
    }
    for (let column = 0; column < n; ++column) { // 每一行都有8中放法
        if (isOk(result, row, column, n)) { // 有些放法不满足要求
            result[row] = column; // 第row行的棋子放到了column列
            cal8queens(row + 1, result, n); // 考察下一行
        }
    }
}

function isOk(result, row, column, n) { // 判断row行column列放置是否合适
    let leftup = column - 1, rightup = column + 1;
    for (let i = row - 1; i >= 0; --i) { // 逐行往上考察每一行
        if (result[i] === column) { return false; } // 竖
        if (leftup >= 0) { // 考察左上对角线：第i行leftup列有棋子吗？
            if (result[i] === leftup) { return false; }
        }
        if (rightup < n) { // 考察右上对角线：第i行rightup列有棋子吗？
            if (result[i] === rightup) { return false; }
        }
        --leftup; ++rightup;
    }
    return true;
}

function printQueens(result, n) { // 打印出一个二维矩阵
    let sres = [];
    for (let row = 0; row < n; ++row) {
        let str = '';
        for (let column = 0; column < n; ++column) {
            if (result[row] === column) {
                str += 'Q';
            } else {
                str += '*';
            }
        }
        sres.push(str);
    }
    console.log(sres);
    return sres;
}


queens1(4);
