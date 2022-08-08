const MinHeap = require('./../sort/minHeap');
const mergeTwoLists = require('./mergeTwoLists');

// 堆排序
function sortList(l) {
    let heap = new MinHeap((a, b) => a.val - b.val);
    while (l) {
        heap.insert(l);
        l = l.next;
    }
    const res = {val: 0, next: null};
    let cur = res;
    while (heap.size) {
        cur.next = {
            val: heap.extract().val,
            next: null};
        cur = cur.next;
    }
    return res.next;
}

// 堆排序牛了，还能这么用 T T, 复杂度也是 nlogn

// 归并
function sortList2(l) {
    if (!l || !l.next) { return l; }
    let midNode = findMidNode(l);
    l = sortList2(l);
    midNode = sortList2(midNode);
    return mergeTwoLists(l, midNode);
}

// 找到中间节点
function findMidNode(l) {
    let fast = l.next, slow = l;
    while (fast?.next) {
        fast = fast.next.next;
        slow = slow.next;
    }
    const midNode = slow.next;
    slow.next = null;
    return midNode;
}
// nlogn 直接想到归并，就是不知道怎么找到中间节点，还以为要用hash记。。。 还有这个问题直接演变到合并两个有序链表了。。。

console.log(sortList2({
    val: 10,
    next: {
        val: -1,
        next: {
            val: 3,
            next: {
                val: 2,
            },
        },
    },
}), 9);