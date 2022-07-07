/* 支持异步加载 
  根据 chunk名 拿到对应的
 */
__dynamicRequire('chunk_0_1', function(require, module, exports) {
console.log('2');
require.ensure('./moduleB').then(res => {
    console.log('5', res);
    require('./moduleC');
});
module.exports = '3';

});