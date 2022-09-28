// 岛屿数量
// https://leetcode.cn/problems/number-of-islands/

function numIslands(grid) {
    let row = grid.length;
    let col = grid[0].length;
    let visited = new Array(row * col).fill(false);
    let res = 0;
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (grid[i][j] === '1' && !visited[i * col + j]) {
                dfs(i, j, visited, row, col, grid);
                res += 1;
            }
        }
    }
    return res;
}

function dfs(i, j, visited, row, col, grid) {
    if (visited[i * col + j]) { return; }
    if (i < 0 || i >= row) { return; }
    if (j < 0 || j >= col) { return; }
    if (grid[i][j] !== '1') { return; }
    visited[i * col + j] = true;
    dfs(i - 1, j, visited, row, col, grid);
    dfs(i + 1, j, visited, row, col, grid);
    dfs(i, j - 1, visited, row, col, grid);
    dfs(i, j + 1, visited, row, col, grid);
}

console.log(numIslands([
    ['1', '0', '1', '1', '1'],
    ['1', '0', '1', '0', '1'],
    ['1', '1', '1', '0', '1'],
]));