/* eslint-disable */
const fs = require('fs')
const path = require('path')

const root = path.dirname(require.main.paths[0]); // 执行路径 process.cwd()

const getFilePath = (module) => [module, `${module}.js`].find(fs.existsSync)

const funcWrapper = [
  'function(require, module, exports) {\n',
  '\n}'
]

const absolutePathToModule = {} // 模块绝对路径与文件内容的映射
const requiredToModule = {} // 模块名与内容的映射

const template = `
const map = __map__

function require(id) {
  const module = map[id]
  const _Module = { exports: {} }
  module(require, _Module, _Module.exports)
  return _Module.exports
};`


/* 根据模块标识符读取文件 并处理 */
function main(id, isEntry = true) {
  const pathToModule = getFilePath(path.resolve(root, id))
  const content = fs.readFileSync(pathToModule, 'utf-8')
  const matchesRegExp = /require\(["'`](.+)["'`]\)/g
  let matches = null
  while (matches = matchesRegExp.exec(content)) {
    const [, match] = matches
    const childPath = getFilePath(path.resolve(path.dirname(pathToModule), match))
    if (absolutePathToModule[childPath]) { // 避免重复
      continue
    }
    main(childPath, false)
    const childContent = absolutePathToModule[childPath]
    requiredToModule[match] = childContent
  }
  const funcStr = funcWrapper[0] + content + funcWrapper[1]
  absolutePathToModule[pathToModule] = funcStr // 每次包装后的内容

  const tpl = template.replace('__map__', JSON.stringify(requiredToModule))
  if (isEntry) {
    return `${tpl}
(${funcStr})(require)
`
  } else {
    return tpl
  }
}

module.exports = main;