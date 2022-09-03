// 浅拷贝
function shallowCopy(object) {
    if (typeof object !== 'object') { return; } // 只拷贝对象
    let res = Array.isArray(object) ? [] : {};
    for (let i in object) {
        res[i] = object[i];
    }
    return res;
}

let a = [1, 2, [3, [4]]];
let b = shallowCopy(a);
a[2] = [];
console.log(a, b);

let c = Object.assign([1, [3, 4]], [2, 4]);
console.log(c); // [2,4]
c = Object.assign([1, [3, [4]], 6], [2, [7, 8]]);
console.log(c); // [ 2, [ 7, 8 ], 6 ]