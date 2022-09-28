// taptap

// 1 排序数组中某个数出现的次数
function fn(arr, num) {
    if (!arr.length) { return 0; }
    let left = 0, right = arr.length - 1;
    let res = 0;
    fn1(left, right, num, arr);

    function fn1(left, right, num, arr) {
        if (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (arr[mid] === num) {
                res++;
            }
            fn1(left, mid - 1, num, arr);
            fn1(mid + 1, right, num, arr);
        }
    }

    return res;
}


console.log(fn([1, 2, 3, 3, 3, 3, 4, 4, 5], 2)); // 1
console.log(fn([1, 2, 3, 3, 3, 3, 4, 4, 5], 3)); // 4
console.log(fn([1, 2, 3, 3, 3, 3, 4, 4, 5], 4)); // 2
console.log(fn([1, 2, 3, 3, 3, 3, 4, 4, 5], 5)); // 1
console.log(fn([2, 2, 2, 3, 5], 2)); // 3
console.log(fn([2, 2, 2, 3, 5], 5)); // 1
console.log(fn([2, 2, 2, 3, 5, 5, 5, 5], 2)); // 3
console.log(fn([2, 2, 2, 3, 5, 5, 5, 5], 5)); // 4
console.log(fn([2, 2, 2, 3, 5, 5, 5, 5], 6)); // 0
console.log(fn([], 3)); // 0

// 2 随机算法
function shuffle(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let randomIndex = Math.random()*
  }
}