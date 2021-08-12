/*
MDN：  Promise 对象用于表示一个异步操作的最终状态（完成或失败），以及该异步操作的结果值。

必须有⼀个 then ⽅法
  ⼀个 promise 必须提供⼀个 then ⽅法以访问其当前值和原因。
  promise 的 then ⽅法接受两个参数： promise.then(onFulfilled, onRejected) 他们都是可选参数，同时他们都是函数，如果 onFulfilled 或 onRejected 不是函数，则需要忽略他们。【1】
    如果 onFulfilled 是⼀个函数
      当 promise 执⾏结束后其必须被调⽤，其第⼀个参数为 promise 的结果
      在 promise 执⾏结束前其不可被调⽤
      其调⽤次数不可超过⼀次
    如果 onRejected 是⼀个函数
      当 promise 被拒绝执⾏后其必须被调⽤，其第⼀个参数为 promise 的原因
      在 promise 被拒绝执⾏前其不可被调⽤
      其调⽤次数不可超过⼀次
  在执⾏上下⽂堆栈仅包含平台代码之前，不得调⽤ onFulfilled 或 onRejected
  onFulfilled 和 onRejected 必须被作为普通函数调⽤（即⾮实例化调⽤，这样函数内部 this ⾮严格模式下指向 window）
  then ⽅法可以被同⼀个 promise 调⽤多次
    当 promise 成功执⾏时，所有 onFulfilled 需按照其注册顺序依次回调
    当 promise 被拒绝执⾏时，所有的 onRejected 需按照其注册顺序依次回调
  then ⽅法必须返回⼀个 promise 对象 promise2 = promise1.then(onFulfilled, onRejected);
    只要 onFulfilled 或者 onRejected 返回⼀个值 x ，promise 2 都会进⼊ onFulfilled 状态【2】
    如果 onFulfilled 或者 onRejected 抛出⼀个异常 e ，则 promise2 必须拒绝执⾏，并返回拒因 e 【3】
    如果 onFulfilled 不是函数且 promise1 状态变为已完成， promise2 必须成功执⾏并返回相同的值【4】
    如果 onRejected 不是函数且 promise1 状态变为已拒绝， promise2 必须执⾏拒绝回调并返回相同的据因 【5】
*/
/* new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(11)
  }, 1000);
})
  // 【1】如果 onFulfilled 或 onRejected 不是函数，则需要忽略他们
  .then(1)
  .then(res => {
    console.log(res);
  }) */


/* new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject(11)
  }, 1000);
})
  .then(res => {
    return res - 1
   }, err => {
    return err + 1
  })
  // 【2】只要 onFulfilled 或者 onRejected 返回⼀个值 x ，promise 2 都会进⼊ onFulfilled 状态
  .then(res => {
    console.log(res); // 这里 12
  }, err => {
    console.log(err);
  }) */

/* new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject(11)
  }, 1000);
})
  .then(res => {
    return res - 1
  }, err => {
    throw new Error(err + 1)
  })
  // 【3】如果 onFulfilled 或者 onRejected 抛出⼀个异常 e ，则 promise2 必须拒绝执⾏，并返回拒因 e
  .then(res => {
    console.log(res);
  }, err => {
    console.log(err);
  })
 */

/* new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(11)
  }, 1000);
})
  .then(11)
  // 【4】如果 onFulfilled 不是函数且 promise1 状态变为已完成， promise2 必须成功执⾏并返回相同的值？
  .then(res => {
    console.log(res);
  }, err => {
    console.log(err);
  })
 */

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject(11)
  }, 1000);
})
  .then()
  .then(res => {
    console.log(res);
  }, err => {
    // 【5】如果 onRejected 不是函数且 promise1 状态变为已拒绝， promise2 必须执⾏拒绝回调并返回相同的据因 
    console.log(err, '---'); // 这里
  })



// 没有抛出错误
/* function promise3() {
  return new Promise(function (resolve, reject) {
    var random = Math.random() * 10; // 随机⼀个 1 - 10 的数字
    setTimeout(function () {
      if (random >= 5) {
        resolve(random);
      } else {
        reject(random);
      }
    }, 1000);
  });
}
var onResolve = function (val) {
  console.log('已完成：输出的数字是', val);
};
var onReject = function (val) {
  console.log('已拒绝：输出的数字是', val);
}

// promise 的 then 也可以接受两个函数，第⼀个参数为 resolve 后执⾏，第⼆个函数为 reject 后执⾏
promise3().then(onResolve, onReject);
// 也可以通过 .catch ⽅法拦截状态变为已拒绝时的 promise
promise3().catch(onReject).then(onResolve);
// 也可以通过 try catch 进⾏拦截状态变为已拒绝的 promise
try {
  promise3().then(onResolve);
} catch (e) {
  onReject(e);
} */