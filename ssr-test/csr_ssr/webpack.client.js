const webpack = require('webpack')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'production',
  entry: './src/entry-client.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'build.js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.vue']
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}