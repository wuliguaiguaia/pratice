Function.prototype.mycall = function (context, ...args) {
    let fn = this;
    if (typeof fn !== 'function') {
        throw new Error('不是函数');
    }
    if (!context) { context = window; }
    let key = Symbol();
    context[key] = fn;
    const res = context[key](...args);
    delete context[key];
    return res;
};

Function.prototype.myapply = function (context, args) {
    let fn = this;
    if (typeof fn !== 'function') {
        throw new Error('不是函数');
    }
    if (!context) { context = window; }
    let key = Symbol();
    context[key] = fn;
    const res = context[key](...args); // 和call只有参数的不同
    delete context[key];
    return res;
};

Function.prototype.mybind = function (context, ...args) {
    let fn = this;
    if (typeof fn !== 'function') {
        throw new Error('不是函数');
    }
    return function (...args1) {
        fn.apply(context, [...args, ...args1]);
    };
};


function fn(a, b) {
    console.log(this.name, a, b);
}

let o = {
    name: 'alias',
};

// fn.mycall(o, 1, 2)
// fn.myapply(o, [1, 2])
let fn2 = fn.mybind(o, 'p');
fn2('x');