/* 支持异步加载 
  根据 chunk名 拿到对应的
 */
__dynamicRequire('chunk_1', function (require, module, exports) {
console.log('2s后，2');
setTimeout(() => {
  require.ensure('./moduleB').then(res => {
    console.log(res);
  })
}, 2000);
module.exports = '2s后，3'

});