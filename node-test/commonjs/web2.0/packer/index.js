const fs = require('fs');
const { resolve, dirname } = require('path');
const { existsSync, readFileSync, writeFileSync } = require('fs');
const root = process.cwd(); // 打包执行路径

// 这里只支持 js 文件的打包，可省略后缀
const getFilePath = (module) => [module, `${module}.js`, `${module}/index.js`].find(existsSync);

// 字符串拼接
const funcWrapper = ['function(require, module, exports) {\n', '\n}'];

const moduleList = []; // 文件内容，index作为模块标识
const moduleDepMapList = []; // 模块依赖项与对应内容的映射

const modulePathIdMap = {}; // 路径与id映射

const template = fs.readFileSync(resolve(__dirname, './bundle.boilerplate'), 'utf-8');

main(require(resolve(root, 'packer.config')));

function main(config) {
    const { entry, output } = config;
    // 1. 遍历提取子模块
    deepTravel(resolve(root, entry));

    // 2.模板替换
    let bundle = template
        .replace('__moduleList__', moduleList.join(','))
        .replace('__moduleDepMapList__', JSON.stringify(moduleDepMapList, null, 2));

    // 3. 写入文件
    writeFileSync(resolve(root, output, 'index.bundle.js'), bundle, 'utf-8');
}

function deepTravel(fullPath) {
    let content = readFileSync(getFilePath(fullPath), 'utf-8');
    const matchesRegExp = /require\(["'`](.+)["'`]\)/g;
    const moduleDepMap = {};
    const funcStr = funcWrapper[0] + content + funcWrapper[1];
    moduleList.push(funcStr);
    modulePathIdMap[fullPath] = moduleList.length - 1; // 路径与id映射

    let matches = null;
    while (matches = matchesRegExp.exec(content)) {
        const [, match] = matches;
        const childModuleAbsolutePath = resolve(dirname(fullPath), match); // 子模块路径
        if (typeof modulePathIdMap[childModuleAbsolutePath] === 'number') { // 已经遍历过了
            moduleDepMap[match] = modulePathIdMap[childModuleAbsolutePath];
            continue;
        }
        deepTravel(childModuleAbsolutePath);
        moduleDepMap[match] = modulePathIdMap[childModuleAbsolutePath];
    }

    moduleDepMapList[modulePathIdMap[fullPath]] = moduleDepMap;
}
module.exports = main;