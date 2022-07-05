/* 最长递增子序列 */

// 回溯
function lengthOfLIS(arr) {
    let res = 1;
    for (let i = 0; i < arr.length; i++) {
        fn(i, 1);
    }
    function fn(i, cw) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] > arr[i]) {
                fn(j, cw + 1);
            }
        }
        if (cw > res) { res = cw; }
    }
    return res;
}

// 动态规划 - 状态转移表
function lengthOfLIS1(arr) {
    let arr1 = new Array(arr.length).fill(1);
    for (let i = 1; i < arr.length; i++) {
        for (let j = i - 1; j >= 0; j--) {
            if (arr[i] > arr[j]) {
                arr1[i] = Math.max(arr1[i], arr1[j] + 1);
            }
        }
    }
    return Math.max(...arr1);
}


console.log(lengthOfLIS1([2, 9, 3, 6, 5, 1, 7]));
console.log(lengthOfLIS1([4, 5, 3, 7]));
console.log(lengthOfLIS1([0, 1, 0, 3, 2, 3]));
console.log(lengthOfLIS1([10, 9, 2, 5, 3, 7, 101, 18]));
console.log(lengthOfLIS1([3, 1, 6, 2, 2, 7]));