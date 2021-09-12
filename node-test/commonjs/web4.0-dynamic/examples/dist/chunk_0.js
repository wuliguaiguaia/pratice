/* 支持异步加载 
  根据 chunk名 拿到对应的
 */
__dynamicRequire('chunk_0', function (require, module, exports) {
console.log('4s后，4');
require('./moduleC')
module.exports = 6
});