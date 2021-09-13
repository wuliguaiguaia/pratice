//分析index.js里面代码依赖的文件
import { parse } from '@babel/parser'
import * as babel from '@babel/core';
import { resolve, relative, dirname } from 'path'
import { readFileSync } from 'fs'

import { fileURLToPath } from 'url';
import traverse from '@babel/traverse';


//设置项目根目录
const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname)

/* type DepRelation = {
  [key: string]: {
    deps: string[],
    code: string
  }
} */

//初始化
const depRelation = {}
console.log(depRelation);
function collectCodeAndDeps(filepath) {
  let key = getProjectPath(filepath)
  if (Object.keys(depRelation).includes(key)) {
    // 注意，重复依赖不一定是循环依赖
    return
  }
  //先读取index文件的内容
  //把字符串代码转换成ast
  let code = readFileSync(resolve(filepath)).toString()

  //把读取到的es6代码先进行转换成es5的
  const { code: es5Code } = babel.transform(code, {
    presets: ['@babel/preset-env']
  })

  //把入口文件的文件名当做map的key
  depRelation[key] = {
    deps: [],
    code: es5Code
  }

  let ast = parse(code, {
    sourceType: 'module'
  })

  //遍历ast
  traverse.default(ast, {
    enter: path => {
      //如果发现当前语句是 import 就把inport的value 写入到依赖中去
      if (path.node.type === 'ImportDeclaration') {
        //当前文件的上一级目录 与获取到当前文件的依赖文件进行拼接。
        let depAbsolutePath = resolve(dirname(filepath), path.node.source.value)
        //获取当前文件与根目录的相对路径
        const depProjectPath = getProjectPath(depAbsolutePath)
        // 把依赖写进 depRelation
        depRelation[key].deps.push(depProjectPath)
        //拿到依赖文件的真实路径进行再一次依赖分析
        collectCodeAndDeps(depAbsolutePath)
      }
    }
  })
}

collectCodeAndDeps(resolve(projectRoot, 'index.js'))

console.log(depRelation)

function getProjectPath(path) {
  return relative(projectRoot, path)
}
