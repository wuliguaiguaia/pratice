// 二维数组中的查找

// 从右上角开始搜索，【逐步缩小查找范围】
function findNumberIn2DArray(arr, target) {
    if (!arr.length) { return false; }
    let row = arr.length, col = arr[0].length;
    let i = 0, j = col - 1;
    while (i < row && j >= 0) {
        let item = arr[i][j];
        if (item === target) { return true; }
        if (item > target) {
            j--;
        } else {
            i++;
        }
    }
    return false;
}

console.log(findNumberIn2DArray([
    [1, 4, 7, 11, 15],
    [2, 5, 8, 12, 19],
    [3, 6, 9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30],
], 30
));

console.log(findNumberIn2DArray([], 9));
console.log(findNumberIn2DArray([
    [1],
]));
console.log(findNumberIn2DArray([
    [1, 2],
    [3, 5],
], 3));