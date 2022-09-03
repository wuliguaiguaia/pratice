// 大数相加 - 字符串版


function fn2(l1, l2) {
    let overflow = 0;
    let head = res = {};
    while (l1 || l2 || overflow) {
        let n1 = l1 ? l1.val : 0;
        let n2 = l2 ? l2.val : 0;
        let n = n1 + n2 + overflow;
        overflow = n >= 10 ? 1 : 0;
        n = n >= 10 ? n - 10 : n;
        res.next = {
            val: n,
            next: null,
        };
        res = res.next;
        if (l1) { l1 = l1.next; }
        if (l2) { l2 = l2.next; }
    }
    return head.next;
}

console.log(fn('777777777771111111119876545433', '111111111111198765456789'));
console.log(fn('0', '111111111111198765456789'));
console.log(fn('99909', '1'));