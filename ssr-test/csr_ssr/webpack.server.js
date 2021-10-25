const baseConfig = require('./webpack.client')
const path = require('path')
const {merge}  = require('webpack-merge')

module.exports = merge(baseConfig, {
  target: 'node', // 使用 node webpack 会编译为用于「类 Node.js」环境（使用 Node.js 的 require ，而不是使用任意内置模块（如 fs 或 path）来加载 chunk）。
  entry: {
    app: './src/entry-server.js'
  },
  output: {
    path: __dirname,
    filename: 'server.bundle.js',
    libraryTarget: 'commonjs2'
  }
})
