module.exports = {
  /* 指定解析器，默认Espree */
  "parser": "espree",
  // 自动启用es6语法, 可使用 新的 ES6 全局变量
  // { "env": { "es6": true } }

  /* 一个环境定义了一组预定义的全局变量, 可以根据需要选择适合的环境 */
	"env": {
		"browser": true,
    "es2021": true,
    "node": true
  },

  /* 处理器 */
  // 从另一种文件中提取 JavaScript 代码，然后让 ESLint 检测 JavaScript 代码
  "processor": {},
	"extends": [
		"eslint:recommended",
		"plugin:vue/essential"
  ],

  // 执行期间访问的额外的全局变量
  "globals": {

  },

  /* 解析选项：允许你指定你想要支持的 JavaScript 语言选项 */
  //  支持 ES6 语法并不意味着同时支持新的 **ES6 全局变量或类型**（比如 Set 等新类型），{ "parserOptions": { "ecmaVersion": 6 } } 不自动启用es6全局变量
	"parserOptions": {
    "ecmaVersion": 12, // 指定使用的 ECMAScript 版本
    "sourceType": "module", // 表示使用ECMAScript模块
    "ecmaFeatures": { // 使用额外的语言特性
      // "jsx": true // 支持jsx语法
    }
  },

	"plugins": [
		"vue"
  ],
  
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"never"
		]
	}
}
