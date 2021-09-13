### 测试 tree-shaking 效果

原理是 webpack 能将标记为 side-effects-free 的包由 import {a} from xx 转换为 import {a} from 'xx/a'，从而自动修剪掉不必要的 import

问题
1、直接 import 的 js 会被彻底清除，因为webpack 发现他没有导出任何接口，如果import了没有用，也会被清楚
2、动态 import 的模块无法进行 tree-shaking
