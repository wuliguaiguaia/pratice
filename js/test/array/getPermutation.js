// 排列序列
// https://leetcode.cn/problems/permutation-sequence/


// 1 递归找出全排列，索引取值
var getPermutation = function (n, k) {
    return fn(n)[k - 1];
};

function fn(n) {
    let arr = [];
    for (let i = 1; i <= n; i++) {
        arr.push(i + '');
    }
    return fn2(arr);
}
function fn2(arr) {
    if (arr.length === 1) { return arr; }
    let x = [];
    for (let i = 0; i < arr.length; i++) {
        let arr1 = arr.slice();
        arr1.splice(i, 1);
        let data = fn2(arr1);
        data.forEach(item => { // 多个结果
            x.push(arr[i] + item);
        });
    }
    return x; // 每次返回当前输出
}

// 2 数学 + 缩小问题规模
var getPermutation1 = function (n, k) {
    // 第 k 个序列所在的所有序列的索引
    let index = k - 1;
    // 未确定位置的数字列表
    const arr = new Array(n).fill(0).map((_, index) => index + 1);
    // 以其中一个数字作为开头的序列，一共有 m 种情况， n * m 即为 n!
    let factorial = new Array(n - 1).fill(0).map((_, index) => index + 1).reduce((preVal, curVal) => preVal * curVal, 1);

    const ans = []; // 结果数组

    for (let i = 0; i < n; i++) { // 确定第 i 位的数字，确定完 n 个数字需要 n 轮
        const t = index / factorial | 0; // Math.floor(index / factorial) // 确定 i 位的数字在 arr 中的索引
        ans.push(arr[t]); // 确定 i 位的数字

        index %= factorial; // 更新 index
        arr.splice(t, 1); // 更新 arr，确定了第 i 个位置的数字就删除
        factorial /= (n - i - 1); // 更新 factorial，下一轮，缩小范围
    }

    return ans.join('');
};

function fnx(n) {
    if (n === 0) { return 0; }
    if (n === 1) { return 1; }
    if (n === 2) { return 2; }
    return n * fnx(n - 1);
}
console.log(getPermutation1(4, 9));