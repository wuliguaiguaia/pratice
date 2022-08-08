/* 合并k个升序链表 */

const mergeTwoLists = require('./mergeTwoLists');
function mergeKLists(lists) {
    if (!lists.length) { return null; }
    let res = lists.shift();
    while (lists.length) {
        let x = lists.shift();
        res = mergeTwoLists(res, x);
    }
    return res;
}