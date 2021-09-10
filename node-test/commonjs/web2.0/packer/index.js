/* eslint-disable */
const fs = require('fs')
const path = require('path')
const { resolve, dirname } = require('path')
const { existsSync, readFileSync, writeFileSync} = require('fs')
const root = dirname(require.main.paths[1]); // 执行路径 process.cwd()

const getFilePath = (module) => [module, `${module}.js`, `${module}/index.js`].find(existsSync)

const funcWrapper = [
  'function(require, module, exports) {\n',
  '\n}'
]

const moduleList = [] // 文件内容，index作为模块标识
const moduleDepMapList = [] // 模块依赖项与对应内容的映射
const modulePathIdMap = {} // 模块路径与标识的映射

const template = fs.readFileSync(path.resolve(__dirname, './bundle.boilerplate'), 'utf-8')

main(require(resolve(root, 'packer.config')))

function main(config) {
  const { entry, output } = config
  
  deepTravel(resolve(root, entry))
  
  let bundle = template
    .replace('__moduleList__', moduleList.join(','))
    .replace('__moduleDepMapList__', JSON.stringify(moduleDepMapList, null, 2))
  writeFileSync(resolve(root, output, 'index.bundle.js'), bundle, 'utf-8')
}

function deepTravel(fullPath) {
  let content = readFileSync(getFilePath(fullPath), 'utf-8')
  const matchesRegExp = /require\(["'`](.+)["'`]\)/g
  const moduleDepMap = {}

  let matches = null
  while (matches = matchesRegExp.exec(content)) {
    const [, match] = matches
    const childModuleAbsolutePath = resolve(dirname(fullPath), match)
    if (false) {
      continue
    }
    deepTravel(childModuleAbsolutePath)
    moduleDepMap[match] = modulePathIdMap[childModuleAbsolutePath]
  }
  const funcStr = funcWrapper[0] + content + funcWrapper[1]
  moduleList.push(funcStr)
  moduleDepMapList.push(moduleDepMap)
  modulePathIdMap[fullPath] = moduleList.length - 1
}
module.exports = main;