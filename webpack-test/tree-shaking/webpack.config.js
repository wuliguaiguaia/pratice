const path = require('path')
module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './src/index'),
  output: {
    filename: 'production.[name].11ku.js',
    path: path.resolve(__dirname, './dist')
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: []
  },
  plugins: [
  ]

}