// 二维数组中的查找

// 从右上角开始搜索，逐步缩小查找范围
function findNumberIn2DArray(matrix, target) {
    if (!matrix.length) { return false; }
    if (target === undefined) { return false; }
    let rows = matrix.length, columns = matrix[0].length;
    let row = 0, column = columns - 1;
    while (row < rows & column >= 0) {
        let item = matrix[row][column];
        if (item === target) { return true; }
        if (item > target) {
            column--;
        } else {
            row++;
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