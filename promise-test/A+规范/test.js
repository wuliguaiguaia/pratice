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