"use strict";

var ESLintPlugin = require('eslint-webpack-plugin');

var path = require('path');

var MiniCssExtractPlugin = require("mini-css-extract-plugin");

var HtmlWebpackPlugin = require('html-webpack-plugin');

var resolve = function resolve(_path) {
  return path.resolve(__dirname, '..', _path);
};

var mode = 'development';

var cssLoaders = function cssLoaders() {
  for (var _len = arguments.length, loaders = new Array(_len), _key = 0; _key < _len; _key++) {
    loaders[_key] = arguments[_key];
  }

  return [// Creates `style` nodes from JS strings
  mode === 'production' ? MiniCssExtractPlugin.loader : "style-loader", // Translates CSS into CommonJS
  {
    loader: 'css-loader',
    options: {
      modules: {// compileType: 'icss',
      }
    }
  }].concat(loaders);
};

module.exports = {
  mode: mode,
  context: path.resolve(__dirname, '../'),
  entry: {
    main: './src/index.js',
    admin: './src/admin.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: resolve('dist')
  },
  module: {
    rules: [{
      test: /\.[tj]sx?$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-env'], ['@babel/preset-react', {
            runtime: 'classic' //使用经典版

          }], ['@babel/preset-typescript']]
        }
      }
    }, {
      test: /\.s[ac]ss$/i,
      //执行顺序从下到上
      use: cssLoaders({
        loader: "sass-loader",
        options: {
          additionalData: "\n              @import '@/common/sass/var.scss';\n              ",
          sassOptions: {
            includePaths: [__dirname] //基于当前目录

          }
        }
      })
    }, {
      test: /\.less$/i,
      use: cssLoaders({
        loader: "less-loader",
        options: {
          additionalData: "\n              @import '@/common/less/var.less';\n            "
        }
      })
    }, {
      test: /\.styl$/,
      use: cssLoaders({
        loader: "stylus-loader",
        options: {
          stylusOptions: {
            import: [resolve('src/common/stylus/var.styl')]
          }
        }
      })
    }]
  },
  resolve: {
    alias: {
      '@': resolve('./src/')
    }
  },
  optimization: {
    // deterministic 选项有益于长期缓存
    moduleIds: 'deterministic',
    // 固定
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          priority: 10,
          minSize: 0,

          /* 如果不写 0，由于 React 文件尺寸太小，会直接跳过 */
          test: /[\\/]node_modules[\\/]/,
          // 为了匹配 /node_modules/ 或 \node_modules\
          name: 'vendors',
          // 文件名
          chunks: 'all' // all 表示同步加载和异步加载，async 表示异步加载，initial 表示同步加载
          // 这三行的整体意思就是把两种加载方式的来自 node_modules 目录的文件打包为 vendors.xxx.js
          // 其中 vendors 是第三方的意思

        },
        common: {
          priority: 5,
          minSize: 0,
          minChunks: 2,
          //同一个文件至少被多少个入口引用了
          chunks: 'all',
          name: 'common'
        }
      }
    }
  },
  plugins: [new ESLintPlugin({
    extensions: ['.js', '.jsx', '.ts', '.tsx'] //不加就不会去检测.jsx文件了

  }), mode === 'production' && new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css'
  }), new HtmlWebpackPlugin({
    filename: 'index.html',
    chunks: ['vendors', 'main']
  }), new HtmlWebpackPlugin({
    filename: 'admin.html',
    chunks: ['vendors', 'admin']
  })].filter(Boolean)
};