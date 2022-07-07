/* 支持异步加载 
  根据 chunk名 拿到对应的
 */
__dynamicRequire('chunk_1_2', function(require, module, exports) {
console.log('4');
module.exports = 6;
});