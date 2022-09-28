// 剑指 Offer II 105. 岛屿的最大面积
// 1 表示土地， 0 表示水域
// https://leetcode.cn/problems/ZL6zAn/


var maxAreaOfIsland = function (grid) {
    let res = 0;
    let rows = grid.length, cols = grid[0].length;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j]) {
                let data = dfs(grid, i, j, rows, cols);
                res = Math.max(res, data);
            }
        }
    }
    return res;
};

function dfs(grid, i, j, rows, cols) {
    if (i < 0 || i >= rows || j < 0 || j >= cols) { return 0; }
    if (!grid[i][j]) { return 0; }
    grid[i][j] = 0;
    return dfs(grid, i - 1, j, rows, cols)
    + dfs(grid, i + 1, j, rows, cols)
    + dfs(grid, i, j - 1, rows, cols)
    + dfs(grid, i, j + 1, rows, cols) + 1;
}