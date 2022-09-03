/* 三数之和 */
// https://leetcode.cn/problems/3sum/
// nums[i] + nums[j] + nums[k] == 0

// 暴力法超时了
var threeSum = function (nums) {
    const res = [];
    let len = nums.length;
    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            for (let k = j + 1; k < len; k++) {
                if (nums[j] + nums[k] + nums[i] === 0) {
                    let data = [nums[i], nums[j], nums[k]].sort((x, y) => x - y);
                    const x = res.find(item => {
                        return item[0] === data[0] && item[1] === data[1] && item[2] === data[2];
                    });
                    !x && res.push(data);
                }
            }
        }
    }
    return res;
};

// 排序 + 双指针
var threeSum1 = function (nums) {
    if (!nums || nums.length < 3) { return []; }
    let res = [];
    nums = nums.sort((x, y) => x - y);
    const len = nums.length;
    // for (let i = 0; i < len && nums[i] > 0; i++) {
    for (let i = 0; i < len - 2 && nums[i] <= 0; i++) {
        // if (nums[i] > 0) { break; } // 如果一开始就大于0，直接break
        if (i > 0 && nums[i] === nums[i - 1]) { continue; } // 和前面一样一定会重复，去重
        // 双指针从后面找 和为0
        let l = i + 1, r = len - 1;
        while (l < r) {
            const count = nums[i] + nums[l] + nums[r];
            if (count === 0) {
                res.push([nums[i], nums[l], nums[r]]);
                // 继续向后，但可能依旧会有重复的情况, 需要继续去重
                while (l < r && nums[l] === nums[l + 1]) { l++; }
                while (l < r && nums[r] === nums[r - 1]) { r--; }
                // 继续向后遍历
                l++;
                r--;
            } else if (count > 0) {
                r--; // 太大了，往前缩一缩
            } else {
                l++; // 太小了，向后走一步
            }
        }
    }
    return res;
};

// 排序 + 特殊情况 [0,0,0] + 去重 + 双指针
var threeSum2 = function (nums) {

};