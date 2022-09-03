// 华为 od
// 最大成员组数量，成员只能是1个或2个
// ab 表示最小要达到的能力

console.log([21, 1, 12, 3].sort()); // 默认排序顺序是将元素转换为字符串，然后比较它们的unicode编码

function fn(n, arr, ab) {
    if (n <= 0) { return 0; }
    let res = 0;
    arr = arr.sort((x, y) => x - y);
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        if (arr[right] >= ab) {
            res++;
            right--;
            continue;
        }
        if (left !== right) {
            let count = arr[left] + arr[right];
            if (count >= ab) {
                res++;
                left++;
                right--;
            } else {
                left++;
            }
        } else {
            left++;
        }
    }
    return res;
}
console.log(fn(5, [3, 1, 5, 7, 9], 8));
console.log(fn(3, [3, 4, 9], 8));
console.log(fn(2, [8, 9], 8));
console.log(fn(1, [9], 8));

console.log(typeof NaN);
console.log(Number.isNaN(parseInt('')));
