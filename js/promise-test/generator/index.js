function promise1() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log(1);
      resolve();
    }, 1000)
  });
}
function promise2() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log(2);
      resolve();
    }, 2000);
  });
}
// 使⽤ generator 函数
function* gen() {
  console.log(22);
  yield promise1();
  yield promise2();
}
var g = gen();
// g.next();
// g.next();

// 使⽤ async/await 函数` 
(async function () {
  try {
    await promise1();
    await promise2();
    console.log('已完成');
  } catch (e) {
    console.log(e);
    console.log('已拒绝');
  }
}());