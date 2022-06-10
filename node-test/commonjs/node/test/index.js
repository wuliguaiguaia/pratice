const { foo } = require('./a.js');
foo();
console.log(require.main); // 表示当前模块

/* 

Module {
  id: '.',
  path: '/Users/alias/code/pratice/node-test/commonjs/node/test',
  exports: {},
  filename: '/Users/alias/code/pratice/node-test/commonjs/node/test/index.js',
  loaded: false,
  children: [
    Module {
      id: '/Users/alias/code/pratice/node-test/commonjs/node/test/a.js',
      path: '/Users/alias/code/pratice/node-test/commonjs/node/test',
      exports: [Object],
      filename: '/Users/alias/code/pratice/node-test/commonjs/node/test/a.js',
      loaded: true,
      children: [],
      paths: [Array]
    }
  ],
  paths: [
    '/Users/alias/code/pratice/node-test/commonjs/node/test/node_modules',
    '/Users/alias/code/pratice/node-test/commonjs/node/node_modules',
    '/Users/alias/code/pratice/node-test/commonjs/node_modules',
    '/Users/alias/code/pratice/node-test/node_modules',
    '/Users/alias/code/pratice/node_modules',
    '/Users/alias/code/node_modules',
    '/Users/alias/node_modules',
    '/Users/node_modules',
    '/node_modules'
  ]
}

*/