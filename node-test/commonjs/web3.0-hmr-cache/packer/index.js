/* eslint-disable */
const fs = require('fs')
const path = require('path')
const { resolve, dirname } = require('path')
const { existsSync, readFileSync, writeFileSync, watch} = require('fs')
const root = dirname(require.main.paths[1]); // 执行路径 process.cwd()

const getFilePath = (module) => [module, `${module}.js`, `${module}/index.js`].find(existsSync)

const funcWrapper = [
  'function (require, module, exports) {\n',
  '\n}'
]


const template = fs.readFileSync(path.resolve(__dirname, './bundle.boilerplate'), 'utf-8')
const defaultConfig = {
  entry: 'index',
  output: 'dist'
}

main(require(resolve(root, 'packer.config')))


function main(config) {
  const moduleList = [] // 文件内容，index作为模块标识
  const moduleDepMapList = [] // 模块依赖项与对应内容的映射
  const modulePathIdMap = {} // 模块路径与标识的映射

  const bundleConfig = Object.assign({}, defaultConfig, config, { context: path.dirname(config.entry) })
  const { entry, output } = bundleConfig
  
  deepTravel(resolve(root, entry), moduleList, moduleDepMapList, modulePathIdMap)

  let bundle = template
    .replace('__runtimeConfig__', JSON.stringify(bundleConfig, null, 2))
    .replace('__moduleList__', moduleList.join(','))
    .replace('__moduleDepMapList__', JSON.stringify(moduleDepMapList, null, 2))
  writeFileSync(resolve(root, output, 'index.bundle.js'), bundle, 'utf-8')

  // 监听模式
  watch(bundleConfig.context,
    { encoding: 'utf-8', recursive: true },
    (eventType, filename) => {
      console.log('hmr.....', 'eventType:', eventType, ', filename:', filename);
      eventType === "change" && main(bundleConfig)
    });
}

function deepTravel(fullPath, moduleList, moduleDepMapList, modulePathIdMap) {
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
    deepTravel(childModuleAbsolutePath, moduleList, moduleDepMapList, modulePathIdMap)
    moduleDepMap[match] = modulePathIdMap[childModuleAbsolutePath]
  }
  const funcStr = funcWrapper[0] + content + funcWrapper[1]
  moduleList.push(funcStr)
  moduleDepMapList.push(moduleDepMap)
  modulePathIdMap[fullPath] = moduleList.length - 1
}
module.exports = main;