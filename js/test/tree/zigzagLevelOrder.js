// 103. 二叉树的锯齿形层序遍历
var zigzagLevelOrder = function (root) {
  if (!root) { return []; }
  let queue = [root]
  let res = [[]]
  let f = 1, a = 1, k = 0;
  while (queue.length) {
    let data = queue.shift()
    data?.val !== undefined && res[k].push(data?.val)
    f--;
    if (f === 0) {
      f = a * 2;
      a = f
      res.push([])
      k++
    }
    queue.push(data?.left || null)
    queue.push(data?.right || null)
    const end = queue.filter(v => v)
    if (!end.length) {
      queue.length = 0
    }
  }
  if (res[res.length - 1].length === 0) res.pop()
  return res.map((item, i) => {
    if (i % 2 !== 0) {
      item = []
      while (res[i].length) {
        item.push(res[i].pop())
      }
    }
    return item
  })
};


var zigzagLevelOrder = function (root) {
  if (!root) return []
  let queue = [root]
  let level = 0
  let res = []
  while (queue.length) {
    let isReverse = level % 2 === 1
    let length = queue.length
    let temp = []
    while (length--) {
      let node = queue.shift()
      if (isReverse) {
        temp.unshift(node.val)
      } else {
        temp.push(node.val)
      }
      if (node.left) queue.push(node.left)
      if(node.right) queue.push(node.right)
    }
    res[level++] = temp
  }
  return res
}