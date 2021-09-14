const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = (_path) => path.resolve(__dirname, '..', _path)


const mode = 'production'
const cssLoaders = (...loaders) => [
  // Creates `style` nodes from JS strings
  mode === 'production' ? MiniCssExtractPlugin.loader : "style-loader",
  // Translates CSS into CommonJS
  {
    loader: 'css-loader',
    options: {
      modules: {
        // compileType: 'icss',
      },
    },
  },
  ...loaders
]



let entry = {}
let outputHtml = []

const pagesDir = resolve('./src/pagesx')
const pages = fs.readdirSync(pagesDir)
pages.forEach((item) => {
  console.log(item, 'item');
  let name = item.replace('.js', '')
  entry[name] = `${pagesDir}/${item}`
  outputHtml.push(new HtmlWebpackPlugin({
    filename: `${name}.html`,
    chunks: [name]
  }))
})

console.log(entry)
console.log(outputHtml)



module.exports = {
  mode,
  context: path.resolve(__dirname, '../'),
  entry: entry,
  output: {
    filename: '[name].[contenthash].js',
    path: resolve('dist')
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env'],
              ['@babel/preset-react',
                {
                  runtime: 'classic'  //使用经典版
                }
              ],
              ['@babel/preset-typescript']
            ]
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        //执行顺序从下到上
        use: cssLoaders({
          loader: "sass-loader",
          options: {
            additionalData: `
              @import '@/common/sass/var.scss';
              `,
            sassOptions: {
              includePaths: [__dirname]  //基于当前目录
            },
          },
        })
      },
      {
        test: /\.less$/i,
        use: cssLoaders({
          loader: "less-loader",
          options: {
            additionalData: `
              @import './src/common/less/var.less';
            `
          }
        })
      },
      {
        test: /\.styl$/,
        use: cssLoaders({
          loader: "stylus-loader",
          options: {
            stylusOptions: {
              import: [resolve('./src/common/stylus/var.styl')]
            }
          }
        })
      }
    ]
  },
  resolve: {
    alias: {
      '@': resolve('./src/')
    }
  },
  optimization: {
    // deterministic 选项有益于长期缓存
    moduleIds: 'deterministic', // 固定
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          priority: 10,
          minSize: 0, /* 如果不写 0，由于 React 文件尺寸太小，会直接跳过 */
          test: /[\\/]node_modules[\\/]/, // 为了匹配 /node_modules/ 或 \node_modules\
          name: 'vendors', // 文件名
          chunks: 'all',  // all 表示同步加载和异步加载，async 表示异步加载，initial 表示同步加载
          // 这三行的整体意思就是把两种加载方式的来自 node_modules 目录的文件打包为 vendors.xxx.js
          // 其中 vendors 是第三方的意思
        },
        common: {
          priority: 5,
          minSize: 0,
          minChunks: 2, //同一个文件至少被多少个入口引用了
          chunks: 'all',
          name: 'common'
        }
      },
    },
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['.js', '.jsx', '.ts', '.tsx']  //不加就不会去检测.jsx文件了
    }),
    mode === 'production' && new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    ...outputHtml
  ].filter(Boolean),
}
