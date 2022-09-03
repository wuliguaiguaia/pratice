// 接雨水


// 双指针。。 缩小窗口
function trap(height) {
    let i = 0, j = height.length - 1;
    let leftmax = 0, rightmax = 0;
    let ans = 0;
    while (i < j) {
        leftmax = Math.max(leftmax, height[i]);
        rightmax = Math.max(rightmax, height[j]);
        if (leftmax < rightmax) {
            ans += leftmax - height[i];
            i++;
        } else {
            ans += rightmax - height[j];
            j--;
        }
    }
    return ans;
}
