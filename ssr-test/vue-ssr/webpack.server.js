const baseConfig = require('./webpack.client')
const { merge } = require('webpack-merge')
module.exports = merge(baseConfig, {
  target: 'node',
  mode: 'production',
  entry: './entry-server.js',
  output: {
    path: __dirname,
    filename: 'server.bundle.js',
    // libraryTarget: 'commonjs2'
  }
})