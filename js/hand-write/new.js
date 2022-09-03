function new1(Factory, ...args) {
    // 创建一个空对象， 原型就是构造函数的 prototype
    const obj = Object.create(Factory.prototype);
    // 修改构造函数执行时的 this指向
    const result = Factory.apply(obj, args);

    // 如果 构造函数有返回 且是对象或者函数,直接返回
    let flag = result && (typeof result === 'object' || typeof result === 'function');

    return flag ? result : obj;
}


function F1(a) {
    this.a = a;
}
F1.prototype = {};
let o = new1(F1, 1);
console.log(o instanceof F1); // true