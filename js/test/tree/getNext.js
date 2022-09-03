// 二叉树的下一个节点
// https://www.nowcoder.com/practice/9023a0c988684a53960365b889ceaf5e?tpId=265&tqId=39212&rp=1&ru=/exam/oj/ta&qru=/exam/oj/ta&sourceUrl=%2Fexam%2Foj%2Fta%3FtpId%3D13&difficulty=undefined&judgeStatus=undefined&tags=&title=

// 可以从二叉树的 左右节点 两种情况分析：
// 左节点下一个是父节点
// 右节点下一个是 子树最左节点或者是上上一个父节点

function GetNext(node) {
    if (!node) { return null; }
    if (node.right) { // 有右节点
        return findNextOnRight(node.right);
    }

    while (node.next && node.next.left !== node) {
        node = node.next;
    }
    return node.next;
}


function findNextOnRight(node) {
    while (node.left) {
        node = node.left;
    }
    return node;
}