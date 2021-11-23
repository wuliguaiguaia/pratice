const path = require('path')
module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './test-src2/index'),
  output: {
    filename: '11production.src2.33ku.js',
    path: path.resolve(__dirname, './dist')
  },
  optimization: {
    // runtimeChunk: true
    minimize: false
  },
  module: {
    rules: []
  },
  plugins: [
  ]

}