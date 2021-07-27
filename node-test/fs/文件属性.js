const fs = require('fs')

/* 提供有关文件的信息 */
fs.stat('./test.txt', (err, stats) => {
  if (err) {
    console.error(err)
    return
  }

  console.log(stats);

  /* 
      Stats {
        dev: 16777220,
        mode: 33188,
        nlink: 1,
        uid: 501,
        gid: 20,
        rdev: 0,
        blksize: 4096,
        ino: 34770877,
        size: 5, // 获取文件的大小（以字节为单位）
        blocks: 8,
        atimeMs: 1625037868217.9675,
        mtimeMs: 1625037866990.775,
        ctimeMs: 1625037866990.775,
        birthtimeMs: 1625037815668.5525,
        atime: 2021-06-30T07:24:28.218Z, // 最后一次访问时间
        mtime: 2021-06-30T07:24:26.991Z, // 最后一次修改时间
        ctime: 2021-06-30T07:24:26.991Z, // 最后一次更改文件状态时间戳
        birthtime: 2021-06-30T07:23:35.669Z // 创建时间的时间戳
      }
  */
  
  
  console.log('stats.isFile(): ', stats.isFile());
  console.log('stats.isDirectory():', stats.isDirectory());
  console.log('stats.isSymbolicLink():', stats.isSymbolicLink()); // 判断文件是否符号链接?
})



/* 
  fs.stat(path[, options], callback): 获取文件详细信息

  path 默认命令执行的路径


  不推荐在调用 fs.open()、fs.readFile() 或 fs.writeFile() 之前使用 fs.stat() 检查文件是否存在。 
  而是，用户代码应该直接打开/读取/写入文件，并在文件不可用时处理引发的错误。

  要检查文件是否存在而不对其进行操作，建议使用 fs.access()。

  */

