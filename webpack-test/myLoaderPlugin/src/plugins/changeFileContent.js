class AddCommntPlugin {
  constructor(options) {
    
  }
  apply(compiler) {
    compiler.hooks.emit.tap('add-comment', (compilation, cb) => {
      compilation.chunks.forEach(chunk => {
        console.log(chunk.files);
        chunk.files.forEach(filename => {
          console.log(filename);
          const source = compilation.assets[filename].source()
          console.log(source);
          const fileContent = '/* auto comment */' + source
          compilation.assets[filename] = {
            source: () => fileContent,
            // 返回文件大小
            size: () => {
              return Buffer.byteLength(fileContent, 'utf8');
            }
          }
        })
      });
      console.log(cb);
      cb && cb()
    })
  }
}

module.exports = AddCommntPlugin;