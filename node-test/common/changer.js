const Module = require('module');

// 可自定义：让 .test 后缀的文件以js文件的方式解析
Module._extensions['.test'] = Module._extensions['.js'];


// 在解析js文件之前做一些事情   ---- 基于 commonjs 做一些高级的操作，可以做拦截
const prevFunc = Module._extensions['.js'];
Module._extensions['.js'] = function (...args) {
  console.log('load script');
  prevFunc.apply(prevFunc, args);
}

