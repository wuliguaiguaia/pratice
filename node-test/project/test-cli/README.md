## cli

command line interface

快速创建一个项目内容，配置公共的eslint、webpack等配置工具

- [commander](https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md)：获取命令行参数

- [inquirer](https://www.npmjs.com/package/inquirer)：命令行的表单

- [clui](https://www.npmjs.com/package/clui) 命令行的loading效果

- [chalk](https://www.npmjs.com/package/chalk) 命令行中的可变颜色效果

### 软连接

```package.json
"bin": {
  "cli": "./app.js"
}
```

```app.js
#!/usr/bin/env node
```

```bash
$ npm link


# 任意目录
$ cli vue.config.js
``
### 备份

```js
// @module-plugin-log
module.exports = (content, dir) => {
  content = content + `console.log(123)`;
  console.log(`正在上${dir}中输出内容：${content}`);
  return content;
}
```
