// 搜索旋转排序数组
// https://leetcode.cn/problems/search-in-rotated-sorted-array/

// 先看无序还不如先看有序。。

/*
 while(left <= right){
  // if(nums[left] == target) return left;
  // if(nums[right] == target) return right;

  int mid = left + (right - left) / 2;
  if(nums[mid] == target) return mid;
  // 右边有序
  if(nums[mid] < nums[right]){
      // 目标值在右边
      if(target > nums[mid] && target <= nums[right]){
          left = mid + 1;
      // 目标值在左边
      }else{
          right = mid - 1;
      }
  // 左边有序
  }else{
      // 目标值在左边
      if(target >= nums[left] && target < nums[mid]){
          right = mid - 1;
      // 目标值在右边
      }else{
          left = mid + 1;
      }
  }
}
*/


var search = function (nums, target) {
    let l = 0, r = nums.length - 1;
    while (l <= r) {
        let mid = Math.floor((l + r) / 2);
        let item = nums[mid];
        if (nums[mid] > nums[r]) { // 右边不正常
            if (target > nums[mid] || target <= nums[r]) {
                l = mid + 1;
                continue;
            }
        } else if (nums[l] > nums[mid]) { // 左边不正常
            if (target >= nums[l] || target < nums[mid]) {
                r = mid - 1;
                continue;
            }
        }

        if (target > nums[mid] && target <= nums[r]) {
            l = mid + 1;
            continue;
        }
        if (target >= nums[l] && target < nums[mid]) {
            r = mid - 1;
            continue;
        }
        if (item === target) { return mid; }

        return -1;
    }
    return -1;
};

