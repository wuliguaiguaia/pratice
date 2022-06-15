const { watch, watchFile } = require('fs');
const { cwd } = require('process');
const context = cwd();
const test = require('./test/index');

const a = 2;
watch(context, {
    encoding: 'utf8',
    recursive: true, // 监视所有子目录，还是仅监视当前目录
}, (eventType, filename) => {
    console.log('eventType:', eventType, ', filename:', filename);

    console.log(test(a)); // 不会变！node并不会重新读取文件，用的还是缓存的值
    // 即使函数参数由外面控制，也不会影响输出结果。。。一整个大离谱
});

// 在大多数平台上，只要目录中文件名出现或消失，就会触发 'rename'。


// 要在文件被修改（而不仅仅是访问）时得到通知，则需要比较 curr.mtime 和 prev.mtime。
// 使用 fs.watch() 比 fs.watchFile 和 fs.unwatchFile 更高效。 应尽可能使用 fs.watch 而不是 fs.watchFile 和 fs.unwatchFile。

/* let filepath = resolve(context, 'test/index')
watchFile(filepath, (curr, prev) => {
  console.log(curr, prev); // 返回stat实例
}) */