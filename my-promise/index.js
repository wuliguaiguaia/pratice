// 判断变量否为function
const isFunction = variable => typeof variable === 'function'

const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
  constructor(handle) {
    if (!isFunction(handle)) {
      throw new Error('MyPromise must accept a function as a parameter')
    }

    this._status = PENDING;
    this._value = undefined;
    // 成功回调
    this._fulfilledQueues = [];
    // 失败回调
    this._rejectedQueues = [];
    try {
      handle(this._resolve.bind(this), this._reject.bind(this))
    } catch (err) { // catch捕获非promise错误
      this._reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    let { _status, _value } = this;
    return new MyPromise(() => {
      switch (_status) {
        case 'PENDING': // push到队列
          this._fulfilledQueues.push(onFulfilled);
          this._rejectedQueues.push(onRejected);
          break;
        case 'FULFILLED': // 立即执行
          onFulfilled(_value);
          break;
        case 'REJECTED': // 立即执行
          onRejected(_value);
          break;
      }
    })
  }
  _resolve(val) {
    if (this._status !== PENDING) return
    setTimeout(() => { // 异步执行
      this._status = FULFILLED
      this._value = val

      const runFulfilled = (value) => {
        let cb;
        while (cb = this._fulfilledQueues.shift()) {
          cb(value)
        }
      }
      runFulfilled(val);
    })
  }

  _reject(err) {
    if (this._status !== PENDING) return
    setTimeout(() => { // 异步执行
      this._status = REJECTED
      this._value = err

      const runRejected = (value) => {
        let cb;
        while (cb = this._rejectedQueues.shift()) {
          cb(value)
        }
      }
      runRejected(err)
    })
  } 
}

new MyPromise((resolve) => {
  setTimeout(() => {
    resolve("promise");
  }, 3000)
})
  .then((res) => {
    setTimeout(() => {
      console.log("then1", res);

    }, 1000)
    return 123
  })
  .then((res) => {
    setTimeout(() => {
      console.log("then2", res);
    }, 1001)
  });
