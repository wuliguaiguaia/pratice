(function (self) {
    const runtimeConfig = {
  "context": "./examples",
  "entry": "index.js",
  "output": {
    "path": "dist/",
    "filename": "index.bundle.js",
    "publicPath": ""
  }
};
    const moduleDepMapList = [
  {
    "./moduleA": "chunk_0_1"
  },
  {
    "./moduleB": "chunk_1_2",
    "./moduleC": 3
  },
  {},
  {}
];
    const moduleList = [function(require, module, exports) {
console.log('1');
require.ensure('./moduleA').then(res => {
    console.log('3', res);
});
},function(require, module, exports) {
console.log('2');
require.ensure('./moduleB').then(res => {
    console.log('5', res);
    require('./moduleC');
});
module.exports = '3';

},function(require, module, exports) {
console.log('4');
module.exports = 6;
},function(require, module, exports) {
console.log('6');
}];
    const cache = {};

    function require(id, parentId) {
        if (parentId && parentId.includes('_')) { // 异步模块里有异步模块
            parentId = parentId.split('_').pop();
        }
        const currentModuleId = parentId !== undefined ? moduleDepMapList[parentId][id] : id;
        if (cache.hasOwnProperty(currentModuleId)) {
            return cache[currentModuleId];
        }
        const module = moduleList[currentModuleId];
        const _Module = { exports: {} };
        module((function (parentModuleId) { // 构造新的require
            function closureRequire(curId) {
                return require(curId, parentModuleId);
            }
            closureRequire.ensure = function (curId) {
                return require.ensure(curId, parentModuleId);
            };
            return closureRequire;
        })(currentModuleId), _Module, _Module.exports);
        cache[currentModuleId] = _Module.exports;
        return cache[currentModuleId];
    }

    // jsonp 形式获取文件内容
    require.ensure = function (chunkId, parentId) {
        if (parentId && parentId.includes('_')) { // 异步模块里有异步模块
            parentId = parentId.split('_').pop();
        }
        const currentChunkId = moduleDepMapList[parentId][chunkId]
        const chunkPromise = cache[currentChunkId];

        if (!chunkPromise) {
            const $script = document.createElement('script');
            const { output: { path, publicPath } } = runtimeConfig;
            $script.src = publicPath + path + currentChunkId + '.js';
            document.body.appendChild($script);
            // 异步请求，构造promise
            const promise = new Promise((resolve) => {
                const chunkCache = [resolve];
                chunkCache.chunkStatus = true;
                cache[currentChunkId] = chunkCache;
                // 存储resolve，等实际执行完后 把chunk里 导出的内容 resolve 出去，then接受
            });
            cache[currentChunkId].push(promise);
            return promise;
        }
        if (chunkPromise.chunkStatus) {
            return chunkPromise[1];
        }

        return chunkPromise;
    };

    self['__dynamicRequire'] = function (chunkId, chunkFn) { // chunkId 只带有chunk索引
        const chunkCache = cache[chunkId];
        const resolve = chunkCache[0];
        const module = { exports: {} };
        chunkFn((function (parentModuleId) { // 构造新的require
            function closureRequire(curId) {
                return require(curId, parentModuleId);
            }
            closureRequire.ensure = function (curId) {
                return require.ensure(curId, parentModuleId);
            };
            return closureRequire;
        })(chunkId), module, module.exports);
        // cache[chunkId] = module.exports;
        resolve(module.exports);
    };

    require(0);
})(this);