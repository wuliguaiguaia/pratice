const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
  mode: 'production',
  entry: './entry-client.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'build.js',
    publicPath: '/dist'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: 'vue-loader'
    }]
  },
  plugins: [
    new VueLoaderPlugin(),
  ]
}
