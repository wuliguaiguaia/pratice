module.exports = class WatchRunPlugin {
  apply(compiler) {
    compiler.hooks.watchRun.tap('watchrun', (compiler, callback) => {
      // 获取发生变化的文件列表
      const changedFiles = compiler.watchFileSystem.watcher;
      console.log(Object.keys(changedFiles));
      // changedFiles 格式为键值对，键为发生变化的文件路径。
      console.log('--', changedFiles, '-changedFiles---');
      callback && callback();
    })
  }
}