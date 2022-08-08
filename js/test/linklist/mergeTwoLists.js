// 合并两个有序链表

// 递归
function mergeTwoLists(l1, l2) {
    if (!l1) { return l2; }
    if (!l2) { return l1; }

    if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    }
}

console.log(mergeTwoLists({ val: 2, next: { val: 3 } }, { val: 1 }));


// 迭代
var mergeTwoLists1 = function (h1, h2) {
    if (!h1 || !h2) { return h1 || h2; }
    let res = { next: null };
    let h = res;
    while (h1 && h2) {
        if (h1.val < h2.val) {
            h.next = h1;
            h1 = h1.next;
        } else {
            h.next = h2;
            h2 = h2.next;
        }
        h = h.next;
    }
    h.next = h1 || h2;
    return res.next;
};

module.exports = mergeTwoLists