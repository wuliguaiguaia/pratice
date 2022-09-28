// 华为 od
// 打印任务排序
function fn(arr) {
    if (!arr.length) { return ''; }
    let temp = arr.slice();
    temp = temp.sort((x, y) => y - x);
    let map = new Map();
    temp.forEach((item, index) => {
        let val = map.get(item);
        if (typeof val !== 'undefined') {
            if (Array.isArray(val)) {
                val.push(index);
            } else {
                val = [val, index];
            }
            map.set(item, val);
        } else {
            map.set(item, index);
        }
    });
    let ans = [];
    arr.forEach(item => {
        let val = map.get(item);
        if (Array.isArray(val)) {
            ans.push(val.shift());
        } else {
            ans.push(val);
        }
    });
    return ans;
}


console.log(fn([9, 3, 5]));
console.log(fn([1, 2, 3, 4, 5, 2]));
console.log(fn([1, 2, 3, 4, 5]));
console.log(fn([7, 4, 3, 2, 5, 1]));