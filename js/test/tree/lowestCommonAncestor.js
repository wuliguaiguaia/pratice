/* 二叉树的最近公共祖先 */

// 1 根据索引查找父元素，过程好麻烦。。。最后还超时了 T T
var lowestCommonAncestor = function (root, p, q) {
  let queue = [root];
  let temp = [];
  let index = -1, pindex = -1, qindex = -1;
  while (queue.length) {
    let data = queue.shift();
    temp.push(data);
    index++;
    if (data.val === p.val) {
      pindex = index;
    }
    if (data.val === q.val) {
      qindex = index;
    }
    // if(qindex !== -1 && pindex !==-1) queue.length = 0
    const s = queue.filter(v => v)
    if (s.length || data?.left || data?.right) {
      queue.push(data?.left || null);
      queue.push(data?.right || null);
    }

  }
  console.log(pindex, qindex);

  let parr = [pindex], cur = pindex, qarr = [qindex];
  while (cur > 0) {
    cur = Math.floor((cur - 1) / 2);
    parr.unshift(cur);
  }
  cur = qindex;
  while (cur > 0) {
    cur = Math.floor((cur - 1) / 2);
    qarr.unshift(cur);
  }
  console.log(parr, qarr);

  let arr = parr.filter(item => qarr.includes(item));
  console.log(arr);
  return temp[arr.pop()];
};


// 递归 一步步逼近结果  只想哭啊 T T T T T T T T
var lowestCommonAncestor1 = function (root, p, q) {
  if (!root) return null
  if (root === p || root === q) {
    return root
  }
  const left = lowestCommonAncestor1(root.left, p, q)
  const right = lowestCommonAncestor1(root.right, p, q)

  if (left && right) { // 一个在左 一个在右
    return root
  }

  if (left) { // 都在左
    return left
  }

  if (right) { // 都在右
    return right
  }

  return null
}


// 2 前序遍历找到路径
var lowestCommonAncestor2 = function (root, p, q) {
  if (p === root || q === root) return root
  let path1 = [], path2 = []
  getPath(root, p, path1)
  getPath(root, q, path2)
  let n = Math.min(path1.length, path2.length)
  let res = null
  for (let i = 0; i < n; i++) {
    if (path2[i] === path1[i]) {
      res = path1[i]
    }
  }
  return res
}
// 喵的，可以不用索引找父节点的。。 前序遍历找 root 到 node 的路径，进行剪枝就行了额。。。。。


function getPath(root, node, path) {
  if (!root) return
  path.push(root)
  if (root === node) return
  if (path[path.length - 1] !== node) { // 找到了不向左走了
    getPath(root.left, node, path)
  }
  if (path[path.length - 1] !== node) { // 左边找到了不向右走了
    getPath(root.right, node, path)
  }
  if (path[path.length - 1] !== node) { // 左右都遍历完了，还没找到，就删除
    path.pop()
  }
}

// getPath 另一种写法
function dfs(root, node, path) {
  if (!root) return false
  path.push(root)
  if (root === node) return true
  if (dfs(root.left, node, path) || dfs(root.right, node, path)) { // 在root的左边或者右边找到啦
    return true
  }
  path.pop() // root 的左边和右边都没找到 就删了 root
}