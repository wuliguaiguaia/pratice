#!/usr/bin/env node 
const program = require('commander');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

console.log(chalk.blue('Hello world!'));

let config = {};
try {
  // config = require(path.resolve(process.cwd(), './cli-config'));
} catch (e) { }

console.log(config);
const { plugins = [] } = config;

program
  .arguments('<dir>') /* 参数，尖括号必填 */
  .description('this is first cli', { /* 描述，通过 -h 查看 */
    dir: '一些描述'
  }) 
  .action((dir) => { /* 回调参数为 传入参数，通过commander规则解析 */
    inquirer.prompt([
      {
        type: 'list',
        name: 'framework',
        message: 'which framework do you like best?',
        choices: ['vue', 'react']
      }
    ])
      .then(answers => {
        const filePath = path.resolve(__dirname, 'index.bolierplate') /* 模板文件 */
        let content = fs.readFileSync(filePath, 'utf-8');
        content = content.replace('_template', answers.framework); /* 可根据传入做内容替换  */

        plugins.forEach(plugin => {
          const pluginModule = require(`@module-plugin-${plugin}`);
          content = pluginModule(content, `${answers.framework}.config.js`); /* 插件执行, 修改输出结果 */
        });

        fs.writeFileSync(path.resolve(process.cwd(), `${answers.framework}.config.js`), content) /* 最终导出生成配置文件 */
    })
  });

program.parse(process.argv); /*  解析命令行参数 */
