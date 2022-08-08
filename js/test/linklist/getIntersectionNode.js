// https://leetcode.cn/problems/intersection-of-two-linked-lists-lcci/
// 相交链表

// 双指针

function getIntersectionNode(l1, l2) {
    let h1 = l1, h2 = l2;
    while (h1 !== h2) {
        h1 = h1 === null ? l2 : h1.next;
        h2 = h2 === null ? l1 : h2.next;
    }
    return h1;
}