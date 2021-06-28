const doSomething = () => console.log('测试')
const measureDoingSomething = () => {
  console.time('doSomething()') // 开始计时
  //做点事，并测量所需的时间。
  doSomething()
  console.timeEnd('doSomething()') // 计时结束并打印时间差
}
measureDoingSomething()

console.log('\x1b[33m%s\x1b[0m', '你好')
