// 链表中倒数第k个节点  https://leetcode.cn/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/

/** 边界条件、特殊输入、错误处理 * */

var getKthFromEnd = function (head, k) {
    if (!head) { return null; }
    if (k === 0) { return null; }

    let head1 = head, head2 = head;
    while (k > 0) {
        if (!head1) { return null; } // k 大于 链表长度
        head1 = head1.next;
        k--;
    }
    while (head1 && head.next) {
        head1 = head1.next;
        head2 = head2.next;
    }
    return head2;
};

console.log(getKthFromEnd(null, 0));
console.log(getKthFromEnd({val: 1, next: null}, 0));
console.log(getKthFromEnd({val: 1, next: null}, 3));
console.log(getKthFromEnd({
    val: 1,
    next: {
        val: 2,
        next: {
            val: 3,
            next: null,
        },
    },
}, 2));
console.log(getKthFromEnd({
    val: 1,
    next: {
        val: 2,
        next: {
            val: 3,
            next: null,
        },
    },
}, 3));