// 剑指 Offer 36. 二叉搜索树与双向链表

function treeToDoublyList(root) {
    if (!root) { return null; }
    convertRoot(root, { node: null });
    let head = root, tail = root;
    while (head.left) {
        head = head.left;
    }
    while (tail.right) {
        tail = tail.right;
    }
    tail.right = head;
    head.left = tail;
    console.log(head);
    return head;
}

function convertRoot(root, lastNode) {
    if (!root) { return null; }
    convertRoot(root.left, lastNode);
    if (lastNode.node) {
        lastNode.node.right = root;
        root.left = lastNode.node;
    }
    lastNode.node = root;
    convertRoot(root.right, lastNode);
}

var root1 = {
    val: 4,
    left: {
        val: 2,
        left: {
            val: 1,
        },
        right: {
            val: 3,
        },
    },
    right: {
        val: 5,
    },
};
// console.log(treeToDoublyList(root1));

// dfs 中序遍历
function dfs(root) {
    if (!root) { return; }
    dfs(root.left); // 左
    console.log(root.val); // 根
    dfs(root.right); // 右
}

// dfs(root1);


function treeToDoublyList2(root) {
    if (!root) { return null; }
    let head, preNode;
    dfs2(root);
    head.left = preNode;
    preNode.right = head;
    function dfs2(node) {
        if (!node) { return; }
        dfs2(node.left);
        if (preNode) {
            preNode.right = node;
        } else {
            head = node;
        }
        node.left = preNode;
        preNode = node;
        dfs2(node.right);
    }
    return head;
}

console.log(treeToDoublyList2(root1));
// console.log(treeToDoublyList({
//     val: 5,
//     right: {
//         val: 7,
//         left: {
//             val: 6,
//         },
//         right: {
//             val: 8,
//         },
//     },
// }));

// console.log(treeToDoublyList({
//     val: 5,
//     right: {
//         val: 7,
//         right: {
//             val: 8,
//         },
//     },
// }));