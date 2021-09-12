module.exports = class WatchHTMLPlugin {
  constructor({ filePath }) {
    this.filePath = filePath
  }
  apply(compiler) {
    compiler.hooks.afterCompile.tap('fsd', (compilation, callback) => {
      // 把 HTML 文件添加到文件依赖列表, 让 Webpack 去监听 HTML 模块文件，在 HTML 模版文件发生变化时重新启动一次编译
      // compilation.fileDependencies.add(this.filePath);
      callback && callback();
    });
  }
}