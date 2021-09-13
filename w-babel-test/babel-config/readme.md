## 修改 .babelrc 文件 配置对比输出内容

1、默认无配置 输出与原文件一致

npx babel index.js -o index.no-env.js

2、增加 @babel/preset-env 输出编译后的 es5

npx babel index.js -o index.add-env.js

3、增加 "useBuiltIns": "usage" 为文件自动增加polyfill，而不是加载全部的polyfill，优化polyfill的选项

npx babel index.js -o index.add-env-usage.js


