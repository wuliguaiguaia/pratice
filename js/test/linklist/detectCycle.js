// 环形链表
// 双指针法：例如寻找距离尾部第K个节点、寻找环入口、寻找公共尾部入口、寻找中间节点等。

// 分析：https://leetcode.cn/problems/linked-list-cycle-ii/solution/linked-list-cycle-ii-kuai-man-zhi-zhen-shuang-zhi-/

/*
f = 2s
f = s + nb (快指针比慢指针多走 nb 才能相遇) n 为整数

f = 2nb, s = nb

1 第一次相遇时慢指针已经走了nb步
1 走a+nb步一定是在环入口

 */
function detectCycle(l) {
    if (!l || !l.next) { return null; }
    let slow = l, fast = l;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) { // nb 相遇
            slow = l;
            while (slow) {
                if (slow === fast) { // 环入口在链表头
                    return slow;
                }
                slow = slow.next;
                fast = fast.next;
            }
        }
    }
    return null;
}

let node0 = {
    val: 5,
    next: null,
};
let node1 = {
    val: 3,
    next: {
        val: 4,
        next: node0,
    },
};

node0.next = node1;

let l = {
    val: 1,
    next: {
        val: 2,
        next: node1,
    },
};

console.log(detectCycle(l));