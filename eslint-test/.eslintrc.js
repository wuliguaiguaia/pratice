module.exports = {
  /* 将 ESLint 限制到一个特定的项目, */
  root: true,
  /* 指定解析器，默认Espree */
  // parser: espree,
  // 自动启用es6语法, 可使用 新的 ES6 全局变量
  // { env: { es6: true } }

  /* 一个环境定义了一组预定义的全局变量, 可以根据需要选择适合的环境 */
  env: {
    browser: true,
    es6: true, // 必须和parserOptions的一致？
    node: true
  },

  /* 处理器 */
  // 从另一种文件中提取 JavaScript 代码，然后让 ESLint 检测 JavaScript 代码
  // processor: {},

  /* 继承特定的规则 */
  extends: [
    "plugin:vue/essential",
    // "standard", // 启用一系列核心规则，这些规则报告一些常见问题
    // 可共享的配置 是一个 npm 包，它输出一个配置对象
    "@vue/standard" // 可以省略包名的前缀 eslint-config-
  ],

  // 配置全局变量
  globals: {

  },

  /* 解析选项：允许你指定你想要支持的 JavaScript 语言选项 */
  //  支持 ES6 语法并不意味着同时支持新的 **ES6 全局变量或类型**（比如 Set 等新类型），{ parserOptions: { ecmaVersion: 6 } } 不自动启用es6全局变量
  parserOptions: {
    // ecmaVersion: 7, // 指定使用的 ECMAScript 版本
    // sourceType: "module", // 表示使用ECMAScript模块
    // ecmaFeatures: { // 使用额外的语言特性
    //   // jsx: true // 支持jsx语法
    // },
    parser: "babel-eslint"
  },

  /* 插件名称可以省略 eslint-plugin- 前缀 */
  /* plugins: [ "vue" ], */

  rules: {
    /* 通用配置 */
    // 两个空格缩进
    indent: ["error", 2],
    // 双引号
    quotes: ["error", "double"],
    // 不要分号
    semi: ["error", "never"],
    // 换行
    "linebreak-style": ["error", "unix"],
    // 最多两行空行
    "no-multiple-empty-lines": ["error", { max: 2 }],
    // 仅dev下可用debugger
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"

    // 属性的空格
    // "computed-property-spacing": ["error", "never", { enforceForClassMembers: true}],
    // "object-curly-spacing": ["error", "never", { "arraysInObjects": true }],
    // "array-bracket-even-spacing": ["error", "never"]

    /* 最佳实践 */
  }
}
