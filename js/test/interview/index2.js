// 华为 od
// 两数和绝对值最小

function fn(arr) {
    arr = arr.sort((x, y) => x - y);
    let left = 0, right = arr.length - 1;
    let res = Number.MAX_SAFE_INTEGER;
    let ans = '';
    while (left < right) {
        let data = arr[left] + arr[right];
        data = Math.abs(data);
        if (data < res) {
            res = data;
            ans = [arr[left], arr[right], res];
        }
        if (res === 0) { return ans; }
        if (Math.abs(arr[left]) > Math.abs(arr[right])) {
            left++;
        } else {
            right--;
        }
    }
    return ans;
}

console.log(fn([-1, -3, 7, 5, 11, 15]));
console.log(fn([-1, -4]));
// console.log(fn([-1]));
// console.log(fn([]));