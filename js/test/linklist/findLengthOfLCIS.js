/* 最长连续递增序列 */


// 1 暴力：双层 for ，woc 我好像只会双层for循环。。。。。。
var findLengthOfLCIS = function (nums) {
    let res = 1;
    for (let i = 0; i < nums.length; i++) {
        let cur = 1;
        // for (let j = 1; j < nums.length; j++) {
        for (let j = i + 1; j < nums.length; j++) { // 服了，就这 j 也能错？？？？？
            if (nums[j] > nums[j - 1]) {
                cur++;
            } else {
                break;
            }
        }
        if (cur > res) { res = cur; }
    }
    return res;
};

// 2 动态规划
var findLengthOfLCIS2 = function (nums) {
    if (nums.length === 0) { return 0; }
    let res = 1;
    let distance = 0;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) {
            res = Math.max(i - distance + 1, res);
        } else {
            distance = i;
        }
    }
    return res;
};

// 3 也算是动态规划吧 结果根据每个阶段向后递推
var findLengthOfLCIS3 = function (nums) {
    if (nums.length === 0) { return 0; }
    let res = 1;
    let count = 1;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) {
            count++;
        } else {
            count = 1;
        }
        res = Math.max(count, res);
    }
    return res;
};

// 4 dp 动态规划 使用 dp
var findLengthOfLCIS4 = function (nums) {
    let len = nums.length;
    if (len < 2) { return len; }
    let res = 1;
    let dp = new Array(len).fill(1);
    for (let i = 1; i < len; i++) {
        if (nums[i - 1] < nums[i]) {
            dp[i] = Math.max(dp[i - 1], dp[i]) + 1;
        }
        if (res < dp[i]) { res = dp[i]; }
    }
    return res;
};

// 5 滑动窗口 双指针移动
var findLengthOfLCIS5 = function (nums) {
    let len = nums.length;
    if (len < 2) { return len; }
    let res = 1;
    let left = 0;
    let right = 1;
    while (right < len) {
        if (nums[right - 1] >= nums[right]) {
            left = right;
        }

        res = Math.max(right - left + 1, res);
        right++;
    }
    return res;
};