const { watch, watchFile } = require('fs')
const { cwd } = require('process')
const { resolve } = require('path')
const context = cwd()

watch(context, {
  encoding: 'utf-8',
  recursive: true
}, (eventType, filename) => {
  console.log('eventType:', eventType, ', filename:', filename);
})



// 要在文件被修改（而不仅仅是访问）时得到通知，则需要比较 curr.mtime 和 prev.mtime。
// 使用 fs.watch() 比 fs.watchFile 和 fs.unwatchFile 更高效。 应尽可能使用 fs.watch 而不是 fs.watchFile 和 fs.unwatchFile。

/* let filepath = resolve(context, 'test/index')
watchFile(filepath, (curr, prev) => {
  console.log(curr, prev); // 返回stat实例
}) */