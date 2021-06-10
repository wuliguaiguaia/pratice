/* 测试1 */
// process.nextTick(() => {
//   console.log('nextTick');
// })

// setImmediate(() => {
//   console.log('setImmediate');
// })
// console.log('立即执行');


/* 测试2 */
setImmediate(() => {
  console.log('setImmediate');
})
process.nextTick(() => {
  console.log('nextTick');
})
console.log('立即执行');
/* 和测试1结果一致 */


/* 多行注释：Option + Shift +A */
