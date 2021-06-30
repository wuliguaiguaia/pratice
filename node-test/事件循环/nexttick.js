/* process.nextTick：在当前操作结束（在下一个事件循环滴答开始之前）时调用此函数

  调用 setTimeout(() => {}, 0) 会在下一个滴答结束时执行该函数，比使用 nextTick()（其会优先执行该调用并在下一个滴答开始之前执行该函数）晚得多。 ？？？
  // settimeout 在下一次结束？

  当要确保在下一个事件循环迭代中代码已被执行，则使用 nextTick()。

setTimeout(() => {
  console.log('settimoutout', 0);

});

process.nextTick(() => {
  console.log('nextTick');
})

nextTick
settimoutout 0
*/


setTimeout(() => {
  console.log('setTimeout');
}, 0);
process.nextTick(() => {
  console.log('nextTick');
})
setImmediate(() => {
  console.log('setImmediate');
})

nextTick
setTimeout
setImmediate