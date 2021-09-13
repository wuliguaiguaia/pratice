//使用@babel/core 和 @babel/preset-env把代码自动转化成ES5

import { parse } from '@babel/parser'
import * as babel from '@babel/core'
import * as fs from 'fs'
import * as path from 'path'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
console.log(import.meta.url); // file:///Users/alias/code/pratice/w-babel-test/babel-test/let2var.js

const __dirname = dirname(__filename);

//从文件中读取源代码，并转成字符串
let code = fs.readFileSync(path.resolve(__dirname, './test.js')).toString()

//把字符串转成ast
const ast = parse(code, { sourceType: 'module' })

debugger

//把ats变成字符串
const result = babel.transformFromAstSync(ast, code, {
  presets: ['@babel/preset-env'] // 配置选项
})


let fileName = path.resolve(__dirname, './test.output.js')
fs.writeFileSync(fileName, result.code)

