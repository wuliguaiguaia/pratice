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



/* 
promise.then(function (x) {
  console.log('会执⾏这个函数，同时传⼊ x 变量的值', x);
});

如果 x 有 then ⽅法且看上去像⼀个 Promise ，解决程序即尝试使 promise 接受 x 的状态；否则其⽤ x 的值来执⾏ promise 。
如果 promise 和 x 指向同⼀对象，以 TypeError 为据因拒绝执⾏ promise
  如果 x 为 promise
    如果 x 处于等待态， promise 需保持为等待态直⾄ x 被执⾏或拒绝
    如果 x 处于执⾏态，⽤相同的值执⾏ promise
    如果 x 处于拒绝态，⽤相同的据因拒绝 promise
*/

var promise1 = function () {
  return new MyPromise(function (resolve) {
    setTimeout(function () {
      console.log(1);
      resolve();
    }, 1000)
  });
}
var promise2 = function () {
  return new MyPromise(function (resolve) {
    setTimeout(function () {
      console.log(2);
      resolve();
    }, 2000);
  });
}
promise1()
  .then(function () {
    return promise2(); // 此处返回⼀个 promise 实例
  })
  .then(function () { console.log('已完成') }, function () { console.log('已拒绝') });


/* 
  如果 x 为 Object 或 function（不常⻅）
    ⾸先尝试执⾏ x.then
      如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
      如果 then 是函数，将 x 作为函数的作⽤域 this 调⽤。传递两个回调函数作为参数，第⼀ 个参数叫做 resolvePromise ，第⼆个参数叫做 rejectPromise:
    如果 resolvePromise 以值 y 为参数被调⽤，则运⾏[[Resolve]](promise, y)
    如果 rejectPromise 以据因 r 为参数被调⽤，则以据因 r 拒绝 promise
    如果 resolvePromise 和 rejectPromise 均被调⽤，或者被同⼀参数调⽤了多次，则优先
    采⽤⾸次调⽤并忽略其他的调⽤
    如果调⽤ then ⽅法抛出了异常 e
    如果 resolvePromise 或 rejectPromise 已经被调⽤，则忽略
    否则以 e 为据因拒绝 promise
    如果 then 不为函数，以 x 为参数将 promise 变为已完成状态
  如果 x 不为对象或者函数，以 x 为参数将 promise 变为已完成状态（重要且常⻅） 
*/







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