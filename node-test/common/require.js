const fs = require('fs');
const path = require('path');
const vm = require('vm');


//  简化版require
function r(filename) {
  const _path = path.resolve(__dirname, filename);
  const content = fs.readFileSync(_path, 'utf-8');

  const wrapper = ["(function(require, module, exports){",
    "})"];
  
  const wrapperContent = wrapper[0] + content + wrapper[1];
  
  const script = new vm.Script(wrapperContent, {
    filename: 'index.js'
  })
  const result = script.runInThisContext();

  const module = {
    exports: {}
  };

  result(r, module, module.exports);

  return module.exports; // 返回值就是文件内用 module.exports 导出的内容
}

global.r = r;
