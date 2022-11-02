[Module 的加载实现](https://es6.ruanyifeng.com/#docs/module-loader)

<img src="./image.png">

### node 环境运行 es6

1. package.json 配置 "type": "module"
2. 文件后缀 .mjs

### 浏览器环境运行 es6

script type="module"

### commonjs 加载 es6

由于es6模块在编译时会进行依赖的静态分析，不会像commonjs模块必须执行完才知道输出那些接口，因此后续的解析和执行是异步的
但commonjs是同步加载的，如果要commonjs模块加载es6模块，则必须使用 await 动态 import的方式，将异步变同步。

### es6 加载 commonjs

1. module.exports 导出，import 整体引入（不支持解构导出）
2. exports.xx 导出

### umd

同构的方式 ---  根据关键字区分使用哪种规范导出

### ES6 模块与 CommonJS 模块的差异

1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
3. CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。

因为 CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

### commonjs输出值拷贝

一旦导出一个值，模块内部的变化就影响不到这个值

### es6输出值引用

静态分析时，遇到import生成一个只读引用，直到用到的时候才会去取值

ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

### CommonJS 模块的加载原理

加载一个脚本时，会在内存生成一个对象
{
  id: '...', // 模块名
  exports: { ... }, // 模块导出的所有接口
  loaded: true, // 该模块是否执行完毕
}

在用的时候，会从 exports 中取值，再次require时，不会去取值，而是从缓存中取；
无论加载多少次，都只会在第一次加载时运行一次，以后加载只返回第一次运行的结果，除非手动清除系统缓存。

### commonjs循环加载

CommonJS 模块的重要特性是加载时执行，即脚本代码在require的时候，就会执行。一旦出现某个模块被"循环加载"，

先输出已经执行的部分，还未执行的部分不会输出，等执行完后回到该文件继续执行

### es6循环加载

静态分析只会生成引用，需要开发者保证用到的时候能取到值


> 一句话总结：
  commonjs 同步加载；运行时加载，                 ； 输出值的拷贝
  es6      异步加载；会进行静态分析（编译时输出接口）； 值是动态引用的

关于 es 异步加载的问题：
  浏览器对于带有type="module"的<script>，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了<script>标签的defer属性。
