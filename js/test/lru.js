/* lru 缓存：“最近最少使用”缓存，该缓存会删除最近最少使用的项目
    缓存应该从键映射到值(允许你插入和检索特定键对应的值)，并在初始化时指定最大容量。
    当缓存被填满时，它应该删除最近最少使用的项目。


    LRU 最近最久未使用
    LFU  最近最少使用（最不常用）
*/
var LRUCache = function (capacity) {
    this.capacity = capacity;
    this.data = new Map();
};


LRUCache.prototype.get = function (key) {
    let val = this.data.get(key);
    if (val !== undefined) {
        this.data.delete(key);
        this.data.set(key, val);
        return val;
    } else {
        return -1;
    }
};


LRUCache.prototype.put = function (key, value) {
    const has = this.data.has(key);
    if (has) { // 更新频率
        this.data.delete(key);
    } else if (this.data.size >= this.capacity) {
        const keys = [...this.data.keys()];
        this.data.delete(keys[0]);
    }
    this.data.set(key, value);
};


// 链表  get put 复杂度为 O(1)
function LRUCache1(cap) {
    this.maxSize = cap;
    this.curSize = 0;
    this.map = {};
    this.head = LRUCache1.createNewNode(null, null);
    this.tail = LRUCache1.createNewNode(null, null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
}

LRUCache1.prototype.get = function (key) {
    const node = this.map[key];
    if (!node) { return -1; }
    LRUCache1.removeNode(node);
    LRUCache1.addNewNode(this.head, node);
    return node.val;
};

LRUCache1.prototype.put = function (key, val) {
    let node = this.map[key];
    if (!node) {
        node = LRUCache1.createNewNode(key, val);
        if (this.curSize === this.maxSize) { /* 超出清除 */
            const removeNode = this.tail.prev;
            this.map[removeNode.key] = null;
            LRUCache1.removeNode(removeNode);
            LRUCache1.addNewNode(this.head, node);
        } else {
            LRUCache1.addNewNode(this.head, node);
            this.curSize++;
        }
        this.map[key] = node;
    } else {
        node.val = val;
        LRUCache1.removeNode(node);
        LRUCache1.addNewNode(this.head, node);
    }
};

LRUCache1.createNewNode = function (key, val) {
    return {
        key,
        val,
        pre: null,
        next: null,
    };
};

LRUCache1.removeNode = function (node) {
    const prev = node.prev;
    const next = node.next;
    prev.next = next;
    next.prev = prev;
};

LRUCache1.addNewNode = function (head, node) {
    const next = head.next;
    head.next = node;
    node.next = next;
    next.prev = node;
    node.prev = head;
};


let cache = new LRUCache1(2 /* 缓存容量 */);

cache.put(2, 1);
cache.put(1, 1);
cache.put(2, 3);
cache.put(4, 1);
console.log(cache.get(1));
console.log(cache.get(2));
console.log(cache);
