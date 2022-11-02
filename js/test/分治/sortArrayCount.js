// 排序数组中某数值出现的次数
// taptap mianshi

// 要求复杂度 lgn
function fn(arr, x) {
    let ans = 0,
        len = arr.length,
        l = 0,
        r = len - 1;
    while (l <= r) {
        let mid = Math.floor((l + r) / 2);
        if (arr[mid] === x) {
            ans += 1;
            if (mid + 1 <= r && arr[mid + 1] === x) {
                ans += fn(arr.slice(mid + 1, r + 1), x);
            }
            if (mid - 1 >= l && arr[mid - 1] === x) {
                ans += fn(arr.slice(l, mid), x);
            }
            return ans;
        } else if (arr[mid] > x) {
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return ans;
}

console.log(fn([1, 2, 3, 3, 4, 5, 5, 5], 5));