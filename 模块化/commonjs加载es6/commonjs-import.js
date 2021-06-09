(async () => {
  const x = await import('./es6.mjs')
  console.log(x.a);
})()
// http://www.ruanyifeng.com/blog/2020/08/how-nodejs-use-es6-module.html
// 由于es6模块在编译时会进行依赖的静态分析，不会像commonjs模块必须执行完才知道输出那些接口，因此后续的解析和执行是异步的，如果要commonjs模块加载es6模块，则必须使用 await 动态 import的方式，将异步变同步。