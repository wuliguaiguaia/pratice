// 剑指 Offer II 105. 岛屿的最大面积

// 1 表示土地， 0 表示水域

// 遇到1就dfs 进行深度遍历
var maxAreaOfIsland = function (grid) {
  let max = 0
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 1) {
        let cur = {data: 0}
        dfs(i, j, grid, cur)
        if (cur.data > max) { max = cur.data }
      }
    }
  }
  return max
};


// cur 必须为引用
function dfs(i, j, grid, cur) {
  if (grid[i]?.[j] === undefined) return
  if (grid[i][j] === 0) return
  cur.data = cur.data + 1
  grid[i][j] = 0
  dfs(i - 1, j, grid, cur)
  dfs(i, j - 1, grid, cur)
  dfs(i, j + 1, grid, cur)
  dfs(i + 1, j, grid, cur)
}

function x() {
  let a = 0
  y(a)
  console.log(a) // 不是引用
}

function y(a) {
  a = a+1
}

console.log(x())