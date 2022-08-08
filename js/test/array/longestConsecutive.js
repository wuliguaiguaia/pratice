// 128. 最长连续序列
// https://leetcode.cn/problems/longest-consecutive-sequence/


// 复杂度不过关
var longestConsecutive = function (nums) {
    if (nums.length === 0) { return 0; }
    nums = nums.sort((x, y) => x - y);
    let dp = new Array(nums.length).fill(1);
    let res = 1;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i - 1] === nums[i]) { // 可以重复的
            dp[i] = dp[i - 1];
            continue;
        }
        if (nums[i - 1] + 1 === nums[i]) {
            dp[i] = dp[i - 1] + 1;
        }
        if (dp[i] > res) { res = dp[i]; }
    }
    return res;
};

// 复杂度 O(N)  哈希表 存储端点
var longestConsecutive1 = function (nums) {
    if (nums.length === 0) { return 0; }
    let hash = {};
    let res = 0;
    for (let n of nums) {
        if (hash[n]) { continue; }
        let left = hash[n - 1] || 0;
        let right = hash[n + 1] || 0;
        let length = left + 1 + right;
        hash[n] = 1;// 只要能标记就行
        hash[n - left] = length;
        hash[n + right] = length;
        res = Math.max(res, length);
    }
    return res;
};

// 复杂度 O(N)  哈希set, 不让遍历时可以用 obj、set 或 map 存储，使用key快捷获取
var longestConsecutive2 = function (nums) {
    if (nums.length === 0) { return 0; }
    let set = new Set();
    for (let n of nums) { // 去重
        set.add(n);
    }
    let res = 1;
    for (let n of nums) {
        if (set.has(n - 1)) { continue; } // 前一个是否存在
        let curLen = 0;
        let curN = n;
        while (set.has(curN)) {
            curN += 1;
            curLen += 1;
        }
        res = Math.max(res, curLen);
    }
    return res;
};
