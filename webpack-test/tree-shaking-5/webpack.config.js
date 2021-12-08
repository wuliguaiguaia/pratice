const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './test-src2/index'),
  output: {
    filename: '[name]1.js',
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
    new HtmlWebpackPlugin()
  ]

}