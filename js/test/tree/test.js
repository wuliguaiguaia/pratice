// 先序遍历
function dfs2(root) {
    if (!root) { return; }
    console.log(root.val);
    dfs2(root.left);
    dfs2(root.right);
}

// 中序遍历
function dfs(root) {
    if (!root) { return; }
    dfs(root.left);
    console.log(root.val);
    dfs(root.right);
}

// 后序遍历
function dfs3(root) {
    if (!root) { return; }
    dfs3(root.left);
    dfs3(root.right);
    console.log(root.val);
}

// 层次遍历
function bfs(root) {
    if (!root) { return; }
    let temp = [root];
    while (temp.length) {
        let f = temp.shift();
        console.log(f.val);
        if (f.left) { temp.push(f.left); }
        if (f.right) { temp.push(f.right); }
    }
}


var tree = {
    val: 5,
    left: {
        val: 3,
        left: {
            val: 2,
        },
        right: {
            val: 4,
        },
    },
    right: {
        val: 7,
        left: {
            val: 6,
        },
        right: {
            val: 8,
        },
    },
};

bfs(tree);