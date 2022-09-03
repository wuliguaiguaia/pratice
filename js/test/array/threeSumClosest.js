// 最接近的三数之和
// https://leetcode.cn/problems/3sum-closest/

// 排序加双指针
var threeSumClosest = function (nums, target) {
    let res = Number.MAX_SAFE_INTEGER;
    let len = nums.length;
    nums = nums.sort((x, y) => x - y);
    for (let i = 0; i < len - 2; i++) {
        let left = i + 1, right = len - 1;
        while (left < right) {
            let cur = nums[i] + nums[left] + nums[right];
            if (cur > target) {
                right--;
            } else if (cur < target) {
                left++;
            } else {
                return cur;
            }
            res = Math.min(Math.abs(cur - target), Math.abs(res - target)) + target;
        }
    }
    return res;
};

console.log(threeSumClosest([1, 1, 1, 0], -100));