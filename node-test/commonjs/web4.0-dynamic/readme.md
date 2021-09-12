### 异步

1、require.ensure
> require.ensure() 是 webpack 特有的，已被 import() 取代。
> 给定 dependencies 参数，将其对应的文件拆分到一个单独的 bundle 中，此 bundle 会被异步加载。当使用 CommonJS 模块语法时，这是动态加载依赖项的唯一方法。这意味着，可以在模块执行时才允许代码，只有在满足特定条件时才会加载 dependencies。

2、dynamic import

> 使用 webpackInclude and webpackExclude 选项可让你添加正则表达式模式，以减少 webpack 打包导入的文件数量。


<!-- https://webpack.docschina.org/api/module-methods/#magic-comments -->
```js
// 单个目标
import(
  /* webpackChunkName: "my-chunk-name" */
  /* webpackMode: "lazy" */
  /* webpackExports: ["default", "named"] */
  'module'
);

// 多个可能的目标
import(
  /* webpackInclude: /\.json$/ */
  /* webpackExclude: /\.noimport\.json$/ */
  /* webpackChunkName: "my-chunk-name" */
  /* webpackMode: "lazy" */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  `./locale/${language}`
);
```
将 webpackIgnore 设置为 true 则不进行代码分割
```js
import(/* webpackIgnore: true */ 'ignored-module.js');
```






