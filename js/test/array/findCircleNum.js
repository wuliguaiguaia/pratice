// 省份数量
// https://leetcode.cn/problems/number-of-provinces

// 求无向图的连通域个数

// 1 深度优先搜索 一条路走到头
var findCircleNum = function (isConnected) { // 无向图的邻接矩阵
    const n = isConnected.length; // 无向图的顶点数量
    const visited = new Array(n); // 是否访问过
    let res = 0; // 连通域数量
    for (let i = 0; i < n; i++) {
        if (visited[i]) { continue; }
        // 未被访问  表示开始一个新的连通域
        res++;
        dfs(i, isConnected, visited);
    }
    return res;
};
function dfs(i, isConnected, visited) {
    visited[i] = true;
    for (let j = 0; j < isConnected.length; j++) {
        // visited[j]阻止重复访问
        if (isConnected[i][j] === 1 && !visited[j]) {
            dfs(j, isConnected, visited);
        }
    }
}

// 2 广度优先遍历
var findCircleNum2 = function (isConnected) { // 无向图的邻接矩阵
    const n = isConnected.length; // 无向图的顶点数量
    const visited = new Array(n); // 是否访问过
    let res = 0; // 连通域数量
    for (let i = 0; i < n; i++) {
        if (visited[i]) { continue; }
        const queue = [];
        visited[i] = true;
        res++;
        queue.push(i);

        while (queue.length) {
            let k = queue.shift();
            for (let j = 0; j < isConnected.length; j++) {
                if (isConnected[k][j] === 1 && !visited[j]) {
                    visited[j] = true;
                    queue.push(j);
                }
            }
        }
    }
    return res;
};

// 3 并查集

// https://leetcode.cn/problems/number-of-provinces/solution/jsti-jie-by-a-ba-li-0fwg/
