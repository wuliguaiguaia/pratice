/*
  矩阵中的最大正方形
*/

// 动态规划
function maximalSquare(arr) {
    if (arr.length === 0) { return 0; }
    let max = 0;
    arr.unshift(new Array(arr[0].length + 1).fill(0));

    for (let i = 1; i < arr.length; i++) {
        arr[i].unshift(0);
        for (let j = 1; j < arr[i].length; j++) {
            arr[i][j] = Number(arr[i][j]);
            if (arr[i][j] === 1) {
                arr[i][j] = Math.min(arr[i - 1][j], arr[i][j - 1], arr[i - 1][j - 1]) + 1;
            }
            if (max < arr[i][j]) { max = arr[i][j]; }
        }
    }
    return max * max;
}

console.log(maximalSquare([
    ['1', '0', '1', '0', '0'],
    ['1', '0', '1', '1', '1'],
    ['1', '1', '1', '1', '1'],
    ['1', '0', '0', '1', '0'],
]));
console.log(maximalSquare([['0', '1'], ['1', '0']]));

// 哇哇哇 做出来了必须表扬一下自己，第一次这么顺畅啊啊啊啊啊啊啊，进步不少啊啊啊 7.11