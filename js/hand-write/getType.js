// 类型判断
function getType(x) {
    return Object.prototype.toString.apply(x).slice(8, -1).toLowerCase();
}

console.log(getType(/d/)); // regexp