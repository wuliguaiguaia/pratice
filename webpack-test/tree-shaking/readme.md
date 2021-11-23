## tree-shaking

> tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块系统中的静态结构特性，例如 import 和 export。这个术语和概念实际上是兴起于 ES2015 模块打包工具 rollup。

> 原理是 webpack 能将标记为 side-effects-free 的包由 import {a} from xx 转换为 import {a} from 'xx/a'，从而自动修剪掉不必要的 import

## 启用 tree-shaking

webpack production 默认启用

或者使用 pageage.json 的 sideEffects: false

```js
// 所有文件都有副作用，全都不可 tree-shaking, 代码全部保留
{
 "sideEffects": true
}
// 没有文件有副作用，全都可以 tree-shaking
{
 "sideEffects": false
}
// 只有这些文件有副作用，所有其他文件都可以 tree-shaking，但会保留这些文件
{
 "sideEffects": [
  "./src/file1.js",
  "./src/file2.js"
 ]
}

```

> 副作用：副作用可以大致可以理解成：一个函数会、或者可能会对函数外部变量产生影响的行为。

对库的导入和本地代码导入的处理方式不同，本地代码不用就不会打包，库不用还是会完全打包

[结论] 最好还是使用具名导入或者直接导入具体的模块

```js
// 全部导入 (不支持 tree-shaking)
import _ from "lodash";
// 具名导入(支持 tree-shaking)
import { debounce } from "lodash";
// 直接导入具体的模块 (支持 tree-shaking)
import debounce from "lodash/lib/debounce";
```

## 问题

1、import 的 css 会被清除，loader 里使用 sideEffects：true
2、直接 import 的 js 如果没有副作用会被彻底清除（比如 svg），因为 webpack 发现他没有导出任何接口，如果 import 了没有用，也会被清除，可以在 sideEffects 配置
3、动态 import 的模块无法进行 tree-shaking,4 和 5 是一样的

## 测试 tree-shaking 效果

1、

```js
// index.js
import * as xx from "./a";

// a.js
const a = { a: 2, b: { c: 3 } };
fetch("www.baidu.com").then((res) => {
  console.log(res);
});
export default a;
```

开发环境

- 有 sideEffects：false, a.js 完全被清除
- 无，a.js 完全被保留

生产环境

- 有 sideEffects：false, a.js 完全被清除
- 无，a.js 剩余 fetch

【结论】：

1. 生产环境默认有 tree-shaking
2. 如果在生产环境加了 sideEffects：false，所有副作用都会被清除

## 结论

1 在 package.json 启用 sideEffets false，在代码中保证所有模块都使用 import export，
2 不要用 commonjs 语法，他会把 require('./xxx') 这一行直接打包在内
3 在引入库的使用，尽量使用具名导入, webpack 对库做了特殊处理，如果引入整个库，会把所有内容都打包在内(启用了 sideEffets:false 就不会有此问题。。。)
