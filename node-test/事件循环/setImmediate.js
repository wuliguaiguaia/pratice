
/* 在事件循环的下一个迭代中执行

setImmediate(() => {
  console.log('setImmediate');
})

setTimeout(() => {
  console.log('setTimeout');
}, 0);

setImmediate
setTimeout

*/


function s() {
  console.log('do something');

  setTimeout(s, 1000);
}

setTimeout(s, 1000)