## 基础配置测试

0、安装 webpack
npm i webpack webpack-cli -S
(测试版本：^5.52.1, ^4.8.0)

1、webpack 会进行默认计算
```js
// src/index.js
const fn = ()=>{
  var a = 100
  var b = 100
  setTimeout(()=>{
    console.log(a + b)
  })
}

fn()

// 直接运行 webpack 命令，没有config.js
// dist/main.js输出

setTimeout((()=>{console.log(200)}));
```

2、使其支持 ie，增加 .browserslistrc 文件

3、用babel-loader打包jsx

4、支持 eslint
npm i @typescript-eslint/eslint-plugin@^4.0.0  @typescript-eslint/parser@^4.0.0 babel-eslint@^10.0.0 eslint@^7.5.0 eslint-plugin-flowtype@^5.2.0  eslint-plugin-import@^2.22.0  eslint-plugin-jsx-a11y@^6.3.1  eslint-plugin-react@^7.20.3  eslint-plugin-react-hooks@^4.0.8

eslint-config-react-app

4.1、让webpack可以感知到eslint的配置,从而在编译的过程中提示报错信息

npm i html-webpack-plugin

5、支持 stylelint

npm i stylelint stylelint-config-standard

.stylelintrc.json

```json
{
  "extends": "stylelint-config-standard",
  "plugins": [
    "stylelint-less"
  ],
  "customSyntax": "postcss-less",
  "rules": {
    "block-no-empty": null,
    "at-rule-no-unknown": null
  }
}
```

6、用babel-loader打包TypeScript
@babel/preset-typescript -D

7、让eslint支持TypeScript

npm i eslint-config-airbnb-typescript @types/react -D

8、用babel-loader打包tsx
npx tsc --init
{
 "jsx": "react", // Specify JS
 "strict": false, // 关闭严格模式  
 "noImplicitAny": true,  //没有隐式的any
}

9、让js和ts支持@alias
```js
// webpack.config.js
const path = require('path')
resolve: {
  alias: {
    '@': path.join(__dirname, './src/')
  }
},

  
// ts 支持
// tsconfig.json 添加
"compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
}
```

10、让webpack支持scss
npm i sass-loader sass style-loader css-loader -D

```js
{
  test: /\.s[ac]ss$/i,
  //执行顺序从右到左
  use: [
    // Creates `style` nodes from JS strings
    "style-loader",
    // Translates CSS into CommonJS
    "css-loader",
    // Compiles Sass to CSS
    "sass-loader",
  ],
},
```

11、scss自动import全局文件

```js
{
  loader: "sass-loader",
  options: {
    //需要添加的字符串
    additionalData: `
    @import '@/var.scss';
    `,
    sassOptions: {
      includePaths: [__dirname]  //基于当前目录
    },
  },
},

```

12、scss分享变量给js
```js
+ scss-export.scss

:export {
  border-color: $body-color;
}
index.js

import vars from './scss-export.scss';

console.log(vars)
```

13、支持less文件
npm i less less-loader -D
```js
{
    test: /\.less$/i,
    use: [
      {
        loader: "style-loader",
      },
      {
        loader: "css-loader",
        options: {
          modules: {
            compileType: 'icss',
          },
        },
      },
      {
        loader: "less-loader",
        options: {
          additionalData: `
                @import './_var.less';
              `
        },
      },
    ],
  },
```

14、less分享给js
```js
// var.less

@color: pink;

:export{
  color: @color;
}
// index.js
import vars from './var.less';

console.log(vars)

```

15、支持stylus,分享给js
npm i stylus stylus-loader -D

16、生产页面单独提取css文件
npm i mini-css-extract-plugin -D

```js
const cssLoaders = (...loaders) => [
  // Creates `style` nodes from JS strings
  mode === 'production' ? MiniCssExtractPlugin.loader : "style-loader",
  // Translates CSS into CommonJS
  {
    loader: 'css-loader',
    options: {
      modules: {
        compileType: 'icss',
      },
    },
  },
  ...loaders
]

plugins: [
    new ESLintPlugin({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    mode === 'production' && new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
].filter(Boolean)
```

17、自动生成HTML页面
html-webpack-plugin 可不传递参数

18、webpack优化 
1. 单独打包runtime
```js
optimization: {
  runtimeChunk: 'runtime',  //运行时文件单独打包
},
```

- runtime里面的文件是webpack为了运行main.js文件所要依赖的文件。
- 如果不单独打包，如果我们修改了webpack的配置之后main.js里面的内容就会发生变化，用户的缓存就会失效，如果单独打包的话当修改完webpack的配置之后只，如果我们没有改变main.js里面的内容的话，就不会重新打包main.js的内容，这样就可以节省宽带，提高用户访问页面的速度。

- 所以只影响了 main.js 的缓存逻辑？

2. webpack优化 固定modules
// deterministic 选项有益于长期缓存
    moduleIds: 'deterministic', // 固定

3. splitChunk: 提取 vendors
```js
cacheGroups: {
  vendor: {
    priority: 10,
    minSize: 0, /* 如果不写 0，由于 React 文件尺寸太小，会直接跳过 */
    test: /[\\/]node_modules[\\/]/, // 为了匹配 /node_modules/ 或 \node_modules\
    name: 'vendors', // 文件名
    chunks: 'all',  // all 表示同步加载和异步加载，async 表示异步加载，initial 表示同步加载
    // 这三行的整体意思就是把两种加载方式的来自 node_modules 目录的文件打包为 vendors.xxx.js
    // 其中 vendors 是第三方的意思
  }
},
```

4. splitChunk: 提取公共文件 common
```js
common: {
  priority: 5,
  minSize: 0,
  minChunks: 2, //同一个文件至少被多少个入口引用了
  chunks: 'all',
  name: 'common'
}
```

19、删除 dist，每次重新生成

20、增加 spinner 提示，chalk 样式

21、无限页面

22、提交时lint检查
[husky](https://www.npmjs.com/package/husky)

npm install husky --save-dev
npm set-script prepare "husky install"
npm run prepare
npx husky add .husky/pre-commit "npm test"
