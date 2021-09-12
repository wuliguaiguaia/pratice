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
const chunkTemplate = fs.readFileSync(path.resolve(__dirname, './chunk.boilerplate'), 'utf-8')

const defaultConfig = {
  context: root,
  entry: 'index',
  output: 'dist',
  public: resolve(root, 'examples')
}

main(require(resolve(root, 'packer.config')))


function main(config) {
  const moduleList = [] // 文件内容，index作为模块标识
  const moduleDepMapList = [] // 模块依赖项与对应内容的映射
  const modulePathIdMap = {} // 模块路径与标识的映射
  
  const chunkModuleList = []
  const chunkModulePathIdMap = {}

  const bundleConfig = Object.assign({}, defaultConfig, config)
  const { entry, output } = bundleConfig
  
  deepTravel(resolve(root, entry), moduleList, moduleDepMapList, modulePathIdMap, chunkModuleList, chunkModulePathIdMap)
  
  // 异步包包装 写入文件
  chunkModuleList.forEach((chunkContent, index) => {
    const chunkName = 'chunk_' + index
    const content = chunkTemplate.replace('__chunkName__', chunkName)
      .replace('__chunkFn__', chunkContent)
    writeFileSync(resolve(root, output, chunkName + '.js'), content, 'utf-8')
  })
  
  // 入口文件包装 写入文件
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

function deepTravel(fullPath, moduleList, moduleDepMapList, modulePathIdMap, chunkModuleList, chunkModulePathIdMap, isDynamic = false) {
  let content = readFileSync(getFilePath(fullPath), 'utf-8')
  const matchesRegExp = /require(\.ensure)?\(["'`](.+)["'`],?(.+)?\)/g
  const moduleDepMap = {}
  let matches = null
  
  while (matches = matchesRegExp.exec(content)) {
    const [, isDynamic, match] = matches
    const childModuleAbsolutePath = resolve(dirname(fullPath), match)
    if (false) {
      continue
    }
    deepTravel(childModuleAbsolutePath, moduleList, moduleDepMapList, modulePathIdMap, chunkModuleList, chunkModulePathIdMap, !!isDynamic)
    moduleDepMap[match] = isDynamic ?
      `chunk_${chunkModulePathIdMap[childModuleAbsolutePath]}_${modulePathIdMap[childModuleAbsolutePath]}` // 作为上级依赖
      : modulePathIdMap[childModuleAbsolutePath]
  }
  const funcStr = funcWrapper[0] + content + funcWrapper[1]
  if (isDynamic) { // chunk单独保存 生成索引
    chunkModuleList.push(funcStr)
    chunkModulePathIdMap[fullPath] = chunkModuleList.length - 1
  }
  moduleList.push(funcStr)
  modulePathIdMap[fullPath] = moduleList.length - 1
  moduleDepMapList.push(moduleDepMap)
}
module.exports = main;