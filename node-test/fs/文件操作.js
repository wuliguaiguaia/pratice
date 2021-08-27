const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, './test.txt');


fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
})


/* 同步 */
try {
  const data = fs.readFileSync(filePath, 'utf8')
  console.log(data)
} catch (err) {
  console.error(err)
}

/* 
  fs.readFile() 和 fs.readFileSync() 都会在返回数据之前将文件的全部内容读取到内存中。

  这意味着大文件会对内存的消耗和程序执行的速度产生重大的影响。

  在这种情况下，更好的选择是使用流来读取文件的内容。
*/


/* 拷贝文件 */
fs.copyFileSync(path.resolve(__dirname, 'test.txt'), path.resolve(__dirname, 'test1.txt'))

/* 文件重命名 */
fs.renameSync(path.resolve(__dirname, 'test1.txt'), path.resolve(__dirname, 'test-rename.txt'))

/* 是否是文件 */
console.log(fs.lstatSync(path.resolve(__dirname, 'test-rename.txt')).isFile());

/* 更新时间戳 */
fs.utimes(path.resolve(__dirname, 'test.txt'), 99999999, 999999999, () => {
  console.log(1);
})


console.log(fs.realpathSync(process.cwd())); // 返回解析的目录名。。
console.log(process.cwd()); // 返回命令运行时的目录