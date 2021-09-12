const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddCommntPlugin = require('./src/plugins/changeFileContent.js')
const WatchRunPlugin = require('./src/plugins/watchRun.js')
const WatchHTMLPlugin = require('./src/plugins/watchHTML.js')
module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './src/index'),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          'html-loader', // 必须加 htmlloader处理html字符串，https://www.webpackjs.com/loaders/html-loader/
          {
            loader: 'pug-loader',
            options: {
              name: 'hhhhhhaamm'
            }
          }
        ]
      },
    ]
  },
  resolveLoader: { // 配置寻找loader处理文件
    modules: [path.resolve(__dirname, './src/loaders'), 'node_modules']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.pug'
    }),
    new HtmlWebpackPlugin({
      template: './src/index2.html',
      filename: 'index2.html'
    }),
    new AddCommntPlugin(),
    new WatchRunPlugin(),
    new WatchHTMLPlugin({
      filePath: path.resolve(__dirname, './src/index.pug')
    })
  ]

}