const fs = require('fs');
const path = require('path');
const vm = require('vm');
const Module = function (id, parent) {
    this.id = id;
    this.path = path.dirname(id);
    this.exports = {};
    this.loaded = false;
    this.children = [];
    this.parent = parent?.id;
};

let __dirname2 = ''
Module.cache = Object.create(null);
Module.prototype.r = function (filename) {
    const fullFilename = path.resolve(__dirname2, filename); // 1、基于传入的路径拿到绝对路径
    return Module._load(fullFilename, this, false);
};
Module._load = function (_path, parent, isMain) {
    if (parent && !parent.children.includes(_path)) { // 建立模块间关系
        parent.children.push(_path);
    }
    if (Module.cache[_path]) {
        // 从缓存中取，证明commonjs只在第一次require时执行，之后获取的是同一个结果
        return Module.cache[_path].exports; // 不考虑循环依赖
    }
    const curModule = new Module(_path, parent);
    Module.cache[_path] = curModule;
    if (isMain) {
        process.mainModule = curModule; // 定义入口模块
        __dirname2 = path.dirname(_path) // 确定执行路径
    }
    return curModule.load(_path);
};
Module.prototype.load = function (_path) {
    const extension = path.extname(_path);
    return Module._extensions[extension](this, _path);
};
Module._extensions = Object.create(null);
Module._extensions['.js'] = function (module, _path) {
    const content = fs.readFileSync(_path, 'utf-8'); // 2、读取文件内容
    const wrapper = ['(function(r, module, exports){',
        '})'];
    const wrapperContent = wrapper[0] + content + wrapper[1]; // 3、内容包裹
    const script = new vm.Script(wrapperContent, {
        filename: 'index.js',
    });
    const result = script.runInThisContext(); // 4、将字符串变成可执行的函数，类似于eval
    return module.compile(result, _path);
};
Module.prototype.compile = function (result, _path) {
    const r = (_path) => { // 重写require
        return this.r(_path);
    };
    r.main = process.mainModule; // 即使是子模块，获取的也是一样的
    result(r, this, this.exports); // 6、注入 require, module,exports 参数，实现导入导出
    Module.cache[_path].exports = this.exports;
    Module.cache[_path].loaded = true;
    return this.exports; // 7、返回值就是文件内用 module.exports 导出的内容
};
module.exports = Module;