// 剑指 Offer II 076.数组中的第 k 大的数字

var findKthLargest = function (nums, k) {
    nums = nums.sort((x, y) => y - x);
    return nums[k - 1];
};


var findKthLargest1 = function (nums, k) {
    if (nums.length <= 1) { return nums; }
    let mid = Math.floor(nums.length / 2);
    let left = [], right = [];
    for (let i = 0; i < nums.length; i++) {
        if (mid === i) { continue; }
        if (nums[i] < nums[mid]) {
            right.push(nums[i]);
        } else {
            left.push(nums[i]);
        }
    }
    let j = left.length;
    if (j === k - 1) { return nums[mid]; }
    if (j > k - 1) { return findKthLargest(left, k); }
    if (j < k - 1) { // nums[mid] 只是这次不符合，不代表要被舍弃啊
        right.unshift(nums[mid]);
        return findKthLargest(right, k - j);
    }
};

// [-1,2,0] 2
//   ,2,  -1 0, 2
//     , 0 , -1