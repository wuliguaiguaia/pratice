// Promise 中的异常不能被 try-catch 和 window.onerror 捕获，这时候我们就需要监听 unhandledrejection 来帮我们捕获这部分错误。

window.addEventListener("unhandledrejection", function (e) {
  e.preventDefault();
  console.log("捕获到 promise 错误了");
  console.log("错误的原因是", e.reason);
  console.log("Promise 对象是", e.promise);
  return true;
});

Promise.reject("promise1 error");
new Promise((resolve, reject) => {
  reject("promise2 error");
});
new Promise((resolve) => {
  resolve();
}).then(() => {
  throw "promise3 error";
});