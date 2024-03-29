const { resolve } = require("core-js/fn/promise");

// 判断变量否为function
const isFunction = variable => typeof variable === 'function';
// 定义Promise的三种状态常量
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class MyPromise {
    constructor(handle) {
        if (!isFunction(handle)) {
            throw new Error('MyPromise must accept a function as a parameter');
        }
        // 添加状态
        this._status = PENDING;
        // 添加状态
        this._value = undefined;
        // 添加成功回调函数队列
        this._fulfilledQueues = [];
        // 添加失败回调函数队列
        this._rejectedQueues = [];
        // 执行handle
        try {
            handle(this._resolve.bind(this), this._reject.bind(this));
        } catch (err) {
            this._reject(err);
        }
    }
    // 添加resovle时执行的函数
    _resolve(val) {
        const run = () => {
            if (this._status !== PENDING) { return; }
            // 依次执行成功队列中的函数，并清空队列
            const runFulfilled = (value) => {
                let cb;
                while (cb = this._fulfilledQueues.shift()) {
                    cb(value);
                }
            };
            // 依次执行失败队列中的函数，并清空队列
            const runRejected = (error) => {
                let cb;
                while (cb = this._rejectedQueues.shift()) {
                    cb(error);
                }
            };

            /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
              当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
            */
            if (val instanceof MyPromise) {
                debugger;
                // 如何做到上一个状态不结束，下面的代码就不会执行？ 下面promise.then内部会被自动resolve，自动执行then的某个参数，才能实现本次状态的修改，才保证了上层resolve，下层才会被执行，达到连续请求的效果
                val.then(value => {
                    this._value = value;
                    this._status = FULFILLED;
                    runFulfilled(value);
                }, err => {
                    this._value = err;
                    this._status = REJECTED;
                    runRejected(err);
                });
            } else {
                this._value = val;
                this._status = FULFILLED;
                runFulfilled(val);
            }
        };
        // throw new Error(12); /* 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部 */
        // 为了支持同步的Promise，这里采用异步调用
        // 为了保证执行顺序, 等待当前执行栈执行完成，还需要给constructor的resolve和reject函数里面使用setTimeout包裹起来，避免影响当前执行的任务。
        setTimeout(run, 0);
    }
    // 添加reject时执行的函数
    _reject(err) {
        if (this._status !== PENDING) { return; }
        // 依次执行失败队列中的函数，并清空队列
        const run = () => {
            this._status = REJECTED;
            this._value = err;
            let cb;
            while (cb = this._rejectedQueues.shift()) {
                cb(err);
            }
        };
        // 为了支持同步的Promise，这里采用异步调用
        setTimeout(run, 0);
    }
    // 添加then方法
    then(onFulfilled, onRejected) {
        const { _value, _status } = this;
        // 返回一个新的Promise对象
        return new MyPromise((onFulfilledNext, onRejectedNext) => {
            // 封装一个成功时执行的函数
            let fulfilled = value => {
                try {
                    if (!isFunction(onFulfilled)) {
                        onFulfilledNext(value);
                    } else {
                        let res = onFulfilled(value);
                        if (res instanceof MyPromise) {
                            // 如果当前回调函数返回MyPromise对象，等状态改变后在执行下一个回调
                            res.then(onFulfilledNext, onRejectedNext);
                        } else {
                            // 否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                            onFulfilledNext(res);
                        }
                    }
                } catch (err) {
                    // 如果函数执行出错，新的Promise对象的状态为失败
                    onRejectedNext(err);
                }
            };
            // 封装一个失败时执行的函数
            let rejected = error => {
                try {
                    if (!isFunction(onRejected)) {
                        onRejectedNext(error);
                    } else {
                        let res = onRejected(error);
                        if (res instanceof MyPromise) {
                            // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                            res.then(onFulfilledNext, onRejectedNext);
                        } else {
                            // 否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                            onFulfilledNext(res);
                        }
                    }
                } catch (err) {
                    // 如果函数执行出错，新的Promise对象的状态为失败
                    onRejectedNext(err);
                }
            };
            console.log(_status);
            switch (_status) {
                // 当状态为pending时，将then方法回调函数加入执行队列等待执行
                case PENDING:
                    this._fulfilledQueues.push(fulfilled);
                    this._rejectedQueues.push(rejected);
                    break;
                // 当状态已经改变时，立即执行对应的回调函数
                case FULFILLED:
                    fulfilled(_value);
                    break;
                case REJECTED:
                    rejected(_value);
                    break;
            }
        });
    }
    // 添加catch方法
    catch(onRejected) {
        return this.then(undefined, onRejected);
    }
    // 添加静态resolve方法
    static resolve(value) {
        // 1 参数是一个 Promise 实例,不做任何修改、原封不动地返回这个实例
        if (value instanceof Promise) {
            return value;
        }
        // 2 参数是一个thenable对象,将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。
        if (value?.then) {
            return new Promise((resolve, reject) => {
                value.then(resolve, reject);
            });
        }
        // 3 参数不是具有then方法的对象，或根本就不是对象
        // 4 不带有任何参数
        return new Promise((resolve) => {
            resolve(value);
        });
    }
    // 添加静态reject方法
    static reject(value) {
        return new MyPromise((resolve, reject) => reject(value));
    }
    // 添加静态all方法
    static all(list) {
        return new MyPromise((resolve, reject) => { // 返回一个promise
            /**
             * 返回值的集合
             */
            let values = [];
            let count = 0;
            for (let [i, p] of list.entries()) {
                // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
                this.resolve(p).then(res => {
                    values[i] = res;
                    count++;
                    // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
                    if (count === list.length) { resolve(values); }
                }, err => {
                    // 有一个被rejected时返回的MyPromise状态就变成rejected
                    reject(err);
                });
            }
        });
    }
    // 添加静态race方法
    static race(list) {
        return new MyPromise((resolve, reject) => { // 返回一个promise
            for (let p of list) {
                // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
                this.resolve(p).then(res => {
                    resolve(res);
                }, err => {
                    reject(err);
                });
            }
        });
    }
    finally(cb) {
        return this.then(
            value => MyPromise.resolve(cb())
                .then(() => value), // 返回promise携带结果值
            reason => MyPromise.resolve(cb())
                .then(() => { throw reason; }) // 返回promise携带错误
        );
    }
}
MyPromise.resolve()
    .then(() => {
        console.log("then1");
        Promise.resolve()
            .then(() => {
                 
                return new MyPromise(() => resolve(1))
            })
            .then(() => {
                console.log("then1-2");
            });
    })
    .then(() => {
        console.log("then2");
    })
    .then(() => {
        console.log("then3");
    })
    .then(() => {
        console.log("then4");
    });