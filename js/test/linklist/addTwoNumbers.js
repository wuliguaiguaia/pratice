/* 两数相加 */

function addTwoNumbers(l1, l2) {
    let res = {};
    let x = res;
    let temp = 0;
    while (l1 && l2) {
        const cur = l1.val + l2.val + temp;
        x.next = {
            val: cur >= 10 ? cur - 10 : cur,
            next: null,
        };
        temp = cur >= 10 ? 1 : 0;
        x = x.next;
        l1 = l1.next;
        l2 = l2.next;
    }
    if (l1) {
        while (l1) {
            const cur = l1.val + temp;
            x.next = {
                val: cur >= 10 ? cur - 10 : cur,
                next: null,
            };
            temp = cur >= 10 ? 1 : 0;
            x = x.next;
            l1 = l1.next;
        }
    } else if (l2) {
        while (l2) {
            const cur = l2.val + temp;
            x.next = {
                val: cur >= 10 ? cur - 10 : cur,
                next: null,
            };
            temp = cur >= 10 ? 1 : 0;
            x = x.next;
            l2 = l2.next;
        }
    }
    if (temp) {
        x.next = { val: temp, next: null };
    }
    return res.next;
}


console.log(addTwoNumbers(
    { val: 2, next: { val: 4, next: { val: 3 } } },
    { val: 5, next: { val: 6, next: { val: 9, next: {val: 9, next: {val: 9}}} } })
);

// 喵的，next 蒙了，还是要有个空头的才能连上


/*
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode p1 = l1, p2 = l2;
        ListNode dummy = new ListNode(-1);
        ListNode p = dummy;
        int carry = 0, newVal = 0;
        while (p1 != null || p2 != null || carry > 0) {
            newVal = (p1 == null ? 0: p1.val) + (p2 == null ? 0: p2.val) + carry;
            carry = newVal / 10;
            newVal %= 10;
            p.next = new ListNode(newVal);
            p1 = p1 == null? null: p1.next;
            p2 = p2 == null? null: p2.next;
            p = p.next;
        }
        return dummy.next;
    }
}
*/
