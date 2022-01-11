/**
 * @param {number} capacity
 */
let LRUCache = function (maxLen) {
    this.head = null;
    this.tail = null;
    this.map = {};
    this.maxLen = maxLen;
    this.curLen = 0;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    const node = this.map[key];
    if (!node) { return -1; }
    if (this.curLen === 1) {
        return node.value;
    }
    let { head, tail } = removeNode(node, this.head, this.tail);
    this.head = head;
    this.tail = tail;
    return node.value;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    if (!this.head) {
        this.head = {
            key,
            value,
            prev: null,
            next: null,
        };
        this.curLen = 1;
        this.map[key] = this.head;
        return;
    }
    let node = this.map[key];
    if (!node) {
        const newNode = {
            key,
            value,
        };
        const head = this.head;
        newNode.next = head;
        this.head.prev = newNode;
        this.head = newNode;
        if (this.curLen === this.maxLen) { /* 清除 */
            if (this.maxLen === 1) {
                this.map[head.key] = null;
            } else {
                this.map[this.tail.key] = null;
                const prev = this.tail.prev;
                prev.next = null;
                this.tail = prev;
            }
        } else {
            this.curLen += 1;
        }
        if (!this.tail) {
            this.tail = head;
            this.tail.prev = newNode;
        }
        this.map[key] = newNode;
    } else {
        if (this.curLen === 1) {
            this.head.value = value;
            this.map[key] = this.head;
            return;
        }

        let { head, tail } = removeNode(node, this.head, this.tail);
        this.head = head;
        this.tail = tail;
        node.value = value;
        this.map[key] = node;
    }
};

function removeNode(node, head, tail) {

    /* 移除双向链表的节点 */
    if (node === tail) {
        node.prev.next = null;
        tail = node.prev;
    } else {
        if (this.maxLen === 1) {
            
        } else {
            node.prev.next = node.next;
            node.next.prev = node.prev;
        }
    }

    /* 放在表头 */
    node.next = head;
    head.prev = node;
    node.prev = null;
    head = node;
    return {head, tail};
}

let cache = new LRUCache();/* 缓存容量 */
cache.put(1, 1);
cache.put(2, 2);
console.log(cache);
console.log(cache.get(1)); // 返回  1
console.log(cache);
cache.put(3, 3); // 该操作会使得密钥 2 作废
console.log(cache);
console.log(cache.get(2)); // 返回 -1 (未找到)
console.log(cache);
cache.put(4, 4); // 该操作会使得密钥 1 作废
console.log(cache);
cache.get(1); // 返回 -1 (未找到)
console.log(cache);
console.log(cache.get(3)); // 返回  3
console.log(cache);
console.log(cache.get(4)); // 返回  4
console.log(cache);


// 22:00 + 5