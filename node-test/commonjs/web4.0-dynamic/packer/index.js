const fs = require('fs');
const { resolve, dirname } = require('path');
const { existsSync, rmdirSync, readFileSync, writeFileSync, watch, mkdirSync } = require('fs');
const root = process.cwd(); // 执行路径

const getFilePath = (module) => [module, `${module}.js`, `${module}/index.js`].find(existsSync);

const funcWrapper = ['function(require, module, exports) {\n', '\n}'];

// 同步模板
const template = fs.readFileSync(resolve(__dirname, './bundle.boilerplate'), 'utf-8');
// 异步模板
const chunkTemplate = fs.readFileSync(resolve(__dirname, './chunk.boilerplate'), 'utf-8');

main(require(resolve(root, 'packer.config')));

function main(config) {
    const moduleList = []; // 文件内容，index作为模块标识
    const moduleDepMapList = []; // 模块依赖项与对应内容的映射
    const modulePathIdMap = {}; // 模块路径与标识的映射

    const chunkModuleList = [];
    const chunkModulePathIdMap = {};

    const bundleConfig = formatConfig(config); // 补充配置文件
    const { context, entry, output } = bundleConfig;

    deepTravel(resolve(root, context, entry), moduleList, moduleDepMapList, modulePathIdMap, chunkModuleList, chunkModulePathIdMap);

    const outputPath = resolve(root, context, output.path);
    rmdirSync(outputPath, { recursive: true });
    mkdirSync(outputPath);

    // 异步包包装 写入文件
    chunkModuleList.forEach(([chunkContent, p], index) => {
        const chunkName = 'chunk_' + index + '_' + p;
        const content = chunkTemplate.replace('__chunkName__', chunkName)
            .replace('__chunkFn__', chunkContent);
        writeFileSync(resolve(outputPath, chunkName + '.js'), content, 'utf-8');
    });

    // 入口文件包装 写入文件
    let bundle = template
        .replace('__runtimeConfig__', JSON.stringify(bundleConfig, null, 2))
        .replace('__moduleList__', moduleList.join(','))
        .replace('__moduleDepMapList__', JSON.stringify(moduleDepMapList, null, 2));

    writeFileSync(resolve(outputPath, output.filename), bundle, 'utf-8');

    // 监听模式
    watch(context,
        { encoding: 'utf-8', recursive: true },
        (eventType, filename) => {
            console.log('hmr.....', 'eventType:', eventType, ', filename:', filename);
            eventType === 'change' && main(bundleConfig);
        });
}

function deepTravel(fullPath, moduleList, moduleDepMapList, modulePathIdMap, chunkModuleList, chunkModulePathIdMap, isDynamic = false) {
    let content = readFileSync(getFilePath(fullPath), 'utf-8');
    content = changeImport(content); // 将动态import转为require.ensure
    const matchesRegExp = /require(\.ensure)?\(["'`](.+)["'`],?(.+)?\)/g;
    const funcStr = funcWrapper[0] + content + funcWrapper[1];

    moduleList.push(funcStr);
    modulePathIdMap[fullPath] = moduleList.length - 1;
    if (isDynamic) { // chunk单独保存 生成索引
        chunkModulePathIdMap[fullPath] = chunkModuleList.length;
        chunkModuleList.push([funcStr, modulePathIdMap[fullPath]]); // 保存
    }

    let matches = null;
    const moduleDepMap = {};
    while (matches = matchesRegExp.exec(content)) {
        const [, isDynamic, match] = matches;
        const childModuleAbsolutePath = resolve(dirname(fullPath), match);
        if (modulePathIdMap[childModuleAbsolutePath] !== undefined) { // 已经遍历过了
        } else {
            deepTravel(childModuleAbsolutePath, moduleList, moduleDepMapList, modulePathIdMap, chunkModuleList, chunkModulePathIdMap, !!isDynamic);
        }
        console.log(chunkModulePathIdMap);
        moduleDepMap[match] = isDynamic
            ? `chunk_${chunkModulePathIdMap[childModuleAbsolutePath]}_${modulePathIdMap[childModuleAbsolutePath]}` // 作为上级依赖
            : modulePathIdMap[childModuleAbsolutePath];
    }

    moduleDepMapList[modulePathIdMap[fullPath]] = moduleDepMap;
}

function formatConfig(config) {
    // const defaultConfig = {}
    return config;
}

function changeImport(content) {
    return content;
}
module.exports = main;