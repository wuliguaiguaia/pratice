// 1反转链表

// 递归
function reverseList(l) {
    if (!l || !l.next) { return l; }
    let x = reverseList(l.next); // 检索直到最后一个
    l.next.next = l; // 后续修改指向
    l.next = null;
    return x;
}


// 喵的，返回的是指针尾 T T

// 迭代
function reverseList2(l) {
    if (!l || !l.next) { return l; }
    let res = null;
    while (l) {
        res = {
            val: l.val,
            next: res,
        };
        l = l.next;
    }
    return res;
}


// 2反转前 n 个节点
// 递归
let x = null;
function reverseList3(l, n) {
    if (!l || !l.next) { return l; }
    if (n === 1) { x = l.next; return l; }
    let y = reverseList3(l.next, n - 1); // 检索直到最后一个
    l.next.next = l; // 后续修改指向
    l.next = x;
    return y;
}


// 迭代
function reverseList4(l, n) {
    if (!l || !l.next) { return l; }
    if (n === 1) { return l; }
    let l1 = l;
    let m = 1;
    while (m < n && l1.next) {
        l1 = l1.next;
        m++;
    }
    let res = l1.next;
    while (l && n >= 1) {
        res = {
            val: l.val,
            next: res,
        };
        l = l.next;
        n--;
    }
    return res;
}

// 3反转中间节点
// 递归
function reverseList5(l, s, e) {
}


// 迭代
function reverseList6(l) {
}
console.log(reverseList4({
    val: 1,
    next: {
        val: 2,
        next: {
            val: 3,
            // next: {
            //     val: 4,
            // },
        },
    },
}, 2, 3));