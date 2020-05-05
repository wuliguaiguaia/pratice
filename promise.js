class MyPromise {
    constructor(handleFunc) {
        this._status = 'pending';
        this._value = undefined;

        this._fulfilledQueues = [];
        this._rejectedQueues = [];

        try {
            handleFunc(this._resolve.bind(this), this._reject.bind(this)); // 立即执行
        } catch (err) {
            this._reject(err);
        }
    }

    _resolve (val) {
        if (this._status !== 'pending') return;
        setTimeout(() => {  
            // onFulfilled or onRejected must not be called until the execution context stack contains only platform code. 
            // eventloop调用机制
            this._status = 'fulfilled';
            this._value = val;
            const runFulfilled = val => {
                let cb;
                while(cb = this._fulfilledQueues.shift()){
                    cb(val);
                }
            }
    
            const runRejected = err => {
                let cb;
                while(cb = this._rejectedQueues.shift()) {
                    cb(err);
                }
            }
            
            if (val instanceof MyPromise) {
                // 直接resolve一个promise, 执行此promise，并将结果传递给下一个
                val.then(res => {
                    this._status = 'fulfilled';
                    this._value = res;
                    runFulfilled(res);
                }, err => {
                    this._status = 'rejected';
                    this._value = err;
                    runRejected(err); // 这里可以捕捉所有的reject？
                })
            } else {
                runFulfilled(val);
            }
        });
    }

    _reject (error) {
        if (this._status !== 'pending') return;
        setTimeout(() => {
            this._status = 'rejected';
            this._value = error;
            let cb;
            while (cb = this._rejectedQueues.shift()) {
                cb(err);
            }
        })
    }

    then (onFulfilled, onRejected) {
        let {_status, _value} = this;
        return new MyPromise((onFulfilledNext, onRejectedNext) => {
            // 串联下一个promise，保证链式调用
            const fulfilled = val => {
                try {
                    if (typeof onFulfilled !== 'function') {
                        onFulfilledNext(val); // 将结果传递给下一个promise
                    } else {
                        let res = onFulfilled(val); // 执行当前onfuilled，并将结果传递
                        if (res instanceof MyPromise) {
                            // 回调仍是promise，则采取它的执行结果
                            res.then(onFulfilledNext, onRejectedNext);
                        } else {
                            // 直接进入推给下一个回调
                            onFulfilledNext(res);
                        }
                    }
                } catch (err) {
                    onRejectedNext(err);
                }
            }

            const rejected = err => {
                try {
                    if (typeof onRejected !== 'function') {
                        onRejectedNext(err);
                    } else {
                        let res = onRejected(err);
                        if(res instanceof MyPromise) {
                            res.then(onFulfilledNext, onRejectedNext);
                        } else { 
                            onFulfilledNext(res); // 有返回值一律为fulfilled
                        }
                    }
                } catch (err) {
                    onRejectedNext(err)
                }
            }
            switch (_status) {
                case 'pending':  // 注册异步回调
                    this._fulfilledQueues.push(fulfilled);
                    this._rejectedQueues.push(rejected);
                    break;
                case 'fulfilled': 
                    fulfilled(_value);
                    break;
                case 'rejected': 
                    rejected(_value);
                    break;
            }
        })
    }

    catch (onRejected) {
        return this.then(undefined, onRejected);
    }

    static resolve (val) {
        if(val instanceof MyPromise) return val;
        return new MyPromise(resolve => resolve(val));
    }

    static reject (val) {
        return new MyPromise((_, reject) => reject(val));
    }

    static all (list) {
        return new MyPromise((resolve, reject) => {
            let count = 0;
            let result = [];
            list.forEach(item => {
                this.resolve(item).then(res => {
                    result.push(res);
                    count++;
                }).catch(err => {
                    reject(err);
                })
            });
            if (count === list.length) {
                resolve(result);
            }
        })
    }

    static race (list) {
        return new MyPromise((resolve, reject) => {
            // forEach为同时执行，for顺序执行
            list.forEach(item => {
                this.resolve(item).then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            });
        })
    }

    static finally (cb) {
        // 接受一个函数作为参数，无论怎样都会执行
        return this.then(res => {
            this.resolve(cb()).then(() => res)
        },err => {
            this.reject(cb()).then(_, () =>  {throw err;})
        })
    }
}

// 测试1：测试执行顺序
// let promise1 = new MyPromise( (resolve, reject) => {
//     setTimeout(_ => {
//         console.log('promise1', 1);
//         resolve(2);
//     }, 1000)
// })
// let promise2 = new MyPromise((resolve, reject) => {
//     console.log('promise2', 2);
//     resolve(promise1);
// })

// promise2.then(function(val) {
//     setTimeout(() => {
//         console.log(val, 3);
//         return 3;
//     }, 2000);
// }).then(function(val) {
//     console.log(val, 4)
// })


// 测试1：then 返回一个Promise对象
// let promise3 = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve()
//     }, 1000)
// })
// promise4 = promise3.then(res => {
//     return new MyPromise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('这里返回一个Promise')
//         }, 2000)
//     })
// })
// promise4.then(res => {
//     console.log(res) //3秒后打印
// })

// 测试3：异常测试
// let promise1 = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('success')
//     }, 1000)
// })
// promise2 = promise1.then(res => {
//     throw new Error('这里抛出一个异常e')
// })
// promise2.then(res => {
//     console.log(res)
// }, err => {
//     console.log(1, err) //1秒后打印出：这里抛出一个异常e
// })

// 测试4：向下传递
// let promise1 = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('success')
//     }, 1000)
// })
// promise2 = promise1.then('这里的onFulfilled本来是一个函数，但现在不是')
// promise2.then(res => {
//     console.log(res) // 1秒后打印出：success
// }, err => {
//     console.log(err)
// })

// let promise3 = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         reject('fail')
//     }, 1000)
// })
// promise4 = promise3.then(res => res, '这里的onRejected本来是一个函数，但现在不是')
// promise4.then(res => {
//     console.log(res)
// }, err => {
//     console.log(err)  // 1秒后打印出：fail
// })

// 测试5：静态方法
console.log(Promise.resolve(123));
console.log(MyPromise.resolve(123));


 
