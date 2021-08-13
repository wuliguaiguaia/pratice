/* 
MDN：迭代协议具体分为两个协议：可迭代协议和迭代器协议

可迭代协议：对象可以通过 for...of遍历，比如Array，map实现了可迭代协议，原理是对象内部有一个 @@iterator方法，当对象被迭代的时候，调用iterator方法内部返回相应的值

迭代器协议：实现了next方法，对象就可以成为迭代器。next方法有两个属性，done表示是否迭代完成已经到最后一步，value表示此时迭代器返回的值

 */
let obj = {
  val: [1, 2, 3, 4],
  key: 0,
  next() {
    let keys = Object.keys(this.val)
    let value = this.val[keys[this.key]]
    if (!value) {
      return {
        value: undefined,
        done: true
      }
    } else {
      this.key++
      return {
        value,
        done: false
      }
    }
  },
  [Symbol.iterator]() { return this }
}

// console.log(obj.next());
// console.log(obj.next());
// console.log(obj.next());
// console.log(obj.next());
// console.log(obj.next());
/*
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
{ value: 4, done: false }
{ value: undefined, done: true }
*/

for (let item of obj) {
  console.log(item);
}

/* 遍历的时候，会先拿到对象的 [Symbol.Iterator]，执行后去调用对象的next方法拿到value值，直到 done 为true时结束遍历

for...of / ... / Array.from 使用了迭代器协议，可如上面自制
[] / Set / Map / generators 实现了Iterators

*/