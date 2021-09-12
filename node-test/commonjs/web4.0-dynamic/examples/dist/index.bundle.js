(function(self){
  const runtimeConfig = {
  "context": "/Users/alias/code/pratice/node-test/commonjs/web4.0-dynamic",
  "entry": "./examples/index",
  "output": "./examples/dist",
  "public": "/Users/alias/code/pratice/node-test/commonjs/web4.0-dynamic/examples"
}
  const moduleDepMapList = [
  {},
  {
    "./moduleC": 0
  },
  {
    "./moduleB": "chunk_0_1"
  },
  {
    "./moduleA": "chunk_1_2"
  }
]
  const moduleList = [function (require, module, exports) {
console.log('4s后，5')
},function (require, module, exports) {
console.log('4s后，4');
require('./moduleC')
module.exports = 6
},function (require, module, exports) {
console.log('2s后，2');
setTimeout(() => {
  require.ensure('./moduleB').then(res => {
    console.log(res);
  })
}, 2000);
module.exports = '2s后，3'

},function (require, module, exports) {
console.log('1');
setTimeout(() => {
  require.ensure('./moduleA').then(res => {
    console.log(res);
  })
}, 2000);
}]
  const cache = {}

  function require(id, parentId) {
    const currentModuleId = parentId ? moduleDepMapList[parentId][id] : id 
    const module = moduleList[currentModuleId]
    const _Module = { exports: {} }
    module((function(parentModuleId){ // 构造新的require
      function closureRequire(curId) {
        return require(curId, parentModuleId)
      }
      closureRequire.ensure = function(curId) {
        return require.ensure(curId, parentModuleId)
      }
      return closureRequire
    })(currentModuleId), _Module, _Module.exports)
    return _Module.exports
  };

  self["__dynamicRequire"] = function(chunkId, chunkFn) { // chunkId 只带有chunk索引
    const chunkCacheIndex = Object.keys(cache).find(item => item.includes(chunkId)) // 拿到完整的索引
    const chunkCache = cache[chunkCacheIndex]
    const resolve = chunkCache[0]
    const module = {exports: {}}
    chunkFn((function(parentModuleId){ // 构造新的require
      function closureRequire(curId) {
        return require(curId, parentModuleId)
      }
      closureRequire.ensure = function(curId) {
        return require.ensure(curId, parentModuleId)
      }
      return closureRequire
    })(chunkCacheIndex.slice(-1)), module, module.exports)
    cache[chunkId] = module.exports
    resolve(module.exports)
  }


  // jsonp 形式获取文件内容
  require.ensure = function(chunkId, parentId) {
    const currentChunkId = moduleDepMapList[parentId][chunkId] // chunk_chunk索引_module索引
    const $script = document.createElement('script')
    $script.src = 'dist/' + currentChunkId.slice(0, -2) + '.js' // 拿到chunk索引
    document.body.appendChild($script)

    const statusSymbol = 'pending'

    const chunkPromise = cache[currentChunkId]
    if(chunkPromise) {
      return chunkPromise[1]
    } else {
      // 异步请求，构造promise
      const promise = new Promise((resolve, reject)=>{
        const chunkCache = [resolve] // 存储resolve，等实际执行完后 把chunk里 导出的内容 resolve 出去，then接受
        cache[currentChunkId] = chunkCache
      })
      cache[currentChunkId].push(promise)
      return promise
    }
  }


  // 加载入口文件
  require(moduleList.length - 1)

})(this)