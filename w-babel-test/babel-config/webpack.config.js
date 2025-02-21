const path = require('path')
module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    // rules: [
    //   {
    //     test: /\.[j]sx?$/,
    //     exclude: /(node_modules|bower_components)/,
    //     use: {
    //       loader: 'babel-loader',
    //     }
    //   }]
  }
}