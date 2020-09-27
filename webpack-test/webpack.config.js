const TerserPlugin = require("terser-webpack-plugin");

const config = {
  mode: "production",
  entry: "./src/main.js",
  output: {
    filename: "[name].js",
  },
  devtool: "cheap-source-map",
  optimization: {
    concatenateModules: true,
    // minimizer:[ new TerserPlugin({
    //   terserOptions: {
    //     compress: {
    //       // drop_console: true,
    //       collapse_vars: true,
    //       // 提取出出现多次但是没有定义成变量去引用的静态值
    //       reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
    //     },
    //     warnings: false,
    //     output: {
    //       // 最紧凑的输出
    //       beautify: false,
    //       // 删除所有的注释
    //       comments: false,
    //     },
    //   },
    // }),
  // ]
  },
  plugins: [],
};

// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
// .BundleAnalyzerPlugin;
// config.plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 8889 }));

module.exports = config