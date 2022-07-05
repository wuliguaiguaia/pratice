/*
  矩阵最短路径
  左上角移动到右下角的最短路径长度
*/


/*
  状态转移表法 二维数组索引为行列，值为当前阶段结果
*/
function minPath(arr) {
    const arr2 = [];
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        arr2[i] = [];
        for (let j = 0; j < len; j++) {
            if (i === 0 && j === 0) {
                arr2[i][j] = arr[i][j];
            } else if (i === 0) {
                arr2[i][j] = arr[i][j] + arr2[i][j - 1];
            } else if (j === 0) {
                arr2[i][j] = arr[i][j] + arr2[i - 1][j];
            } else {
                arr2[i][j] = arr[i][j] + Math.min(arr2[i][j - 1], arr2[i - 1][j]);
            }
        }
    }
    console.log(arr2);
    return arr2[len - 1][len - 1];
}


/* 状态转移方程 */
function minPath2(arr) {
    const len = arr.length;
    return fn(len - 1, len - 1);
    function fn(i, j) {
        if (i === 0 && j === 0) {
            return arr[i][j];
        }
        if (i === 0) {
            return arr[i][j] + arr[i][j - 1];
        }
        if (j === 0) {
            return arr[i][j] + arr[i - 1][j];
        }
        return arr[i][j] + Math.min(fn(i - 1, j), fn(i, j - 1));
    }
}
console.log(minPath2([[1, 3, 5, 9], [2, 1, 3, 4], [5, 2, 6, 7], [6, 8, 4, 3]]));