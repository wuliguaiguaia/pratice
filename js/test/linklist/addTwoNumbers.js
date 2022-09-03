/* 两数相加 - 链表版 */

function addTwoNumbers(l1, l2) {
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


console.log(addTwoNumbers(
    { val: 2, next: { val: 4, next: { val: 3 } } },
    { val: 5, next: { val: 6, next: { val: 9, next: {val: 9, next: {val: 9}}} } })
);

/*
  注意：
    加空头，函数返回
    l1 l2 指针变化 null
    res 指针移动
*/

/* 大数相加 - 字符串版 */
function fn(str1, str2) {
    let i = str1.length - 1;
    let j = str2.length - 1;
    let overflow = 0;
    let res = '';
    while (i >= 0 || j >= 0 || overflow) {
        let n1 = parseInt(str1[i--]) || 0;
        let n2 = parseInt(str2[j--]) || 0;
        let n = n1 + n2 + overflow;
        overflow = n >= 10 ? 1 : 0;
        n = n >= 10 ? n - 10 : n;
        res = n + res;
    }
    return res;
}

/* 注意：
    从后到为遍历
    不存在的情况
*/