//  字符串的排列
var permutation = function (s) {
    let arr = s.split('');
    return Array.from(fn(arr));
};

function fn(arr) {
    if (arr.length <= 1) { return arr; }
    let set = new Set(); // 防止重复
    for (let i = 0; i < arr.length; i++) {
        let temp = arr.slice();
        temp.splice(i, 1);
        let cur = fn(temp);
        cur.forEach(item => {
            set.add(arr[i] + item);
        });
    }
    return set;
}