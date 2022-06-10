const fs = require('fs');
const path = require('path');
const vm = require('vm');


//  简化版require
function r(filename) {
  const _path = path.resolve(__dirname, filename); // 1、基于传入的路径拿到绝对路径
  const content = fs.readFileSync(_path, 'utf-8'); // 2、读取文件内容

  const wrapper = ["(function(require, module, exports){",
    "})"];

  const wrapperContent = wrapper[0] + content + wrapper[1]; // 3、内容包裹

  const script = new vm.Script(wrapperContent, {
    filename: 'index.js'
  })
  const result = script.runInThisContext(); // 4、将字符串变成可执行的函数，类似于eval

  const module = { // 5、构造 module，exports 存储导出接口
    exports: {}
  };

  result(r, module, module.exports); // 6、注入 require, module,exports 参数，实现导入导出

  return module.exports; // 7、返回值就是文件内用 module.exports 导出的内容
}

global.r = r;
