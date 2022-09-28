// 合并两个有序数组 https://leetcode.cn/problems/sorted-merge-lcci/
// 给定两个排序后的数组 A 和 B，其中 A 的末端有足够的缓冲空间容纳 B。 编写一个方法，将 B 合并入 A 并排序。
// 初始化 A 和 B 的元素数量分别为 m 和 n。

// 涉及到多次移动，可以从尾到头进行替换！
var merge1 = function (A, m, B, n) {
    let len = m + n - 1;
    m = m - 1;
    n = n - 1;
    while (n >= 0) {
        if (A[m] > B[n]) {
            A[len--] = A[m--]; // arr[-1] === undefined 直接超出比较undefiend
        } else {
            A[len--] = B[n--];
        }
    }
    return A;
};

var merge = function (A, m, B, n) {
    if (!A.length) { return B; }
    if (!B.length) { return A; }
    let temp = A.length - 1;
    m = m - 1;
    n = n - 1;
    while (m >= 0 || n >= 0 || temp >= 0) {
        if (A[m] > B[n]) {
            [A[m], A[temp]] = [A[temp], A[m]];
            m--;
            temp--;
        } else {
            if (n >= 0) {
                A[temp] = B.pop();
            } else {
                m--;
            }
            n--;
            temp--;
        }
    }
    return A;
};

var merge2 = function (A, m, B, n) {
    if (!A.length) { return B; }
    if (!B.length) { return A; }
    let temp = A.length - 1;
    m = m - 1;
    n = n - 1;
    while (m >= 0 && n >= 0) {
        if (A[m] > B[n]) {
            A[temp--] = A[m--];
        } else {
            A[temp--] = B[n--];
        }
    }
    while (n >= 0) {
        A[temp--] = B[n--];
    }
    return A;
};


console.log(merge(
    [1, 2, 3, 0, 0, 0]
    , 3
    , [2, 5, 6]
    , 3
));
console.log(merge(
    [1, 2, 3, 0]
    , 3
    , [2]
    , 1
));
console.log(merge(
    [1, 2, 3]
    , 3
    , []
    , 0
));