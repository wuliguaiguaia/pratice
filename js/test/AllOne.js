// 全 O(1) 的数据结构

// 双向链表 + 哈希
// 每个节点保存相同 count 的多个 key
// Node 类的 insert remove 操作通用
class Node {
    constructor(key, count) {
        this.keys = new Set();
        this.count = count || 0;
        this.keys.add(key || '');
    }
    insert(node) {
        let next = this.next;
        next.prev = node;
        node.next = next;
        this.next = node;
        node.prev = this;
    }

    remove() {
        let prev = this.prev;
        prev.next = this.next;
        this.next.prev = prev;
    }
}
var AllOne = function () {
    this.map = {};
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.size = 0;
    this.tail.prev = this.head;
};


AllOne.prototype.inc = function (key) {
    let node = this.map[key];
    if (!node) {
        if (this.size === 0 || this.tail.prev.count > 1) {
            node = new Node(key, 1);
            this.tail.prev.insert(node);
            this.size++;
        } else {
            this.tail.prev.keys.add(key);
        }
        this.map[key] = this.tail.prev;
    } else {
        let count = node.count + 1;
        let prev = node.prev;
        node.keys.delete(key); // 先删除
        if (node.keys.size === 0) {
            this.size--;
            node.remove(); // 如果删完了删除当前节点
        }
        if (prev.count === 0 /* 首级 */ || prev.count > count /* 中间 */) {
            prev.insert(new Node(key, count));
            this.size++;
            this.map[key] = prev.next;
        } else {
            prev.keys.add(key);
            this.map[key] = prev;
        }
    }
};


AllOne.prototype.dec = function (key) {
    let node = this.map[key];
    let count = node.count - 1;
    let { next } = node;
    node.keys.delete(key);
    if (node.keys.size === 0) {
        node.remove();
        this.size--;
    }
    if (count === 0) {
        delete this.map[key];
        return;
    }
    if (next.count === 0 || next.count < count) {
        next.prev.insert(new Node(key, count));
        this.size++;
        this.map[key] = next.prev;
    } else {
        next.keys.add(key);
        this.map[key] = next;
    }
};


AllOne.prototype.getMaxKey = function () {
    return [...this.head.next.keys][0];
};


AllOne.prototype.getMinKey = function () {
    return [...this.tail.prev.keys][0];
};

// ["AllOne","inc","inc","inc","inc","inc","inc","inc","inc","inc","inc","dec","dec","getMaxKey"]
// [[], ["hello"], ["l"], ["l"], ["l"], ["k"], ["k"], ["k"], ["j"], ["j"], ["j"], ["j"], ["k"], []]
const allOne = new AllOne();
allOne.inc('hello');
allOne.inc('l');
allOne.inc('l');
allOne.inc('l');
allOne.inc('k');
allOne.inc('k');
allOne.inc('k');
allOne.inc('j');
allOne.inc('j');
allOne.inc('j');
allOne.dec('j');
console.log(allOne.head.next);
allOne.dec('k');
console.log(allOne.getMaxKey());