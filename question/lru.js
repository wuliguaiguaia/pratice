
/* 
  Lru 最近最少使用，淘汰算法
  【双向链表】
  https://leetcode-cn.com/problems/lru-cache-lcci/

  IndexedDB 浏览器存储限制和清理标准
*/

function LRUCache(cap) {
  this.maxSize = cap
  this.curSize = 0
  this.map = {}
  this.head = LRUCache.createNewNode(null, null)
  this.tail = LRUCache.createNewNode(null, null)
  this.head.next = this.tail
  this.tail.prev = this.head
}


LRUCache.prototype.get = function (key) {
  const node = this.map[key]
  if (!node) return -1
  LRUCache.removeNode(node)
  LRUCache.addNewNode(this.head, node)
  return node.val
}

LRUCache.prototype.put = function (key, val) {
  let node = this.map[key]
  if (!node) {
    node = LRUCache.createNewNode(key, val)
    if (this.curSize === this.maxSize) {/* 超出清除 */
      const removeNode = this.tail.prev
      this.map[removeNode.key] = null
      LRUCache.removeNode(removeNode)
      LRUCache.addNewNode(this.head, node)
    } else {
      LRUCache.addNewNode(this.head, node)
      this.curSize++
    }
    this.map[key] = node
  } else {
    node.val = val
    LRUCache.removeNode(node)
    LRUCache.addNewNode(this.head, node)
  }
}

LRUCache.createNewNode = function (key, val) {
  return {
    key,
    val,
    pre: null,
    next: null
  }
}

LRUCache.removeNode = function (node) {
  const prev = node.prev
  const next = node.next
  prev.next = next
  next.prev = prev
}

LRUCache.addNewNode = function (head, node) {
  const next = head.next
  head.next = node
  node.next = next
  next.prev = node
  node.prev = head
}

LRUCache.printHead = function (link) {
  let head = link
  const arr = []
  while (head) {
    arr.push([head.key, head.val])
    head = head.next
  }
  console.log(arr);
}

LRUCache.printTail = function (link) {
  let head = link
  const arr = []
  while (head) {
    arr.push([head.key, head.val])
    head = head.prev
  }
  console.log(arr);
}


const cache = new LRUCache(1 /* 缓存容量 */);

cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1));
cache.put(3, 3);
console.log(cache.get(2));
cache.put(4, 4);
console.log(cache.get(3));;
console.log(cache.get(4));
LRUCache.printHead(cache.head)
LRUCache.printTail(cache.tail)

// cache.get(1);       // 返回 -1 (未找到)
// cache.get(4);       // 返回  4





