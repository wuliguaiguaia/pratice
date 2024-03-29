/* 测试如果文件不存在时进行读写 */

const fs = require('fs');
const path = require('path');
const pathFile = path.resolve(__dirname, 'fff', '22.txt');
console.log(pathFile);
/* fs.readFile(pathFile, (err, data) => {
  console.log(data, '----'); // undefined ---- 
  // 不存在的文件不会报错
}); */


/* 如果未指定编码，则返回原始缓冲区。 */
/* fs.readFile(pathFile, { flag: 'a+' }, (err, data) => {
  console.log(data, '----'); // <Buffer > ----
  // 文件不存在则创建, w+会覆盖
  // 目录不存在，不创建
}); */


/* 指定编码返回具体的文件内容，否则就是 buffer */
/* fs.readFile(pathFile, 'utf8', (err, data) => {
  console.log(data, '----'); // fsfsdf ----
});
 */



/* fs.writeFile(file, data[, options], callback)
   如果 options 是字符串，则它指定编码：
 */

/* fs.writeFile(pathFile, 'fsd', (err) => {
  console.log(err); // 文件不存在则创建，目录不存在报错
}) */


/* fs.appendFile(pathFile, 'fsd', (err) => {
  console.log(err); // 文件不存在则创建，目录不存在报错
}) */


/* 配合文件描述符 */
/* fs.open(pathFile, 'w+', (err, fd) => {
  fs.writeFile(fd, '3333', err => {
    console.log(err); // 文件不存在则创建，目录不存在不报错
  });
}); */

/* console.log(fs.existsSync(path.resolve(__dirname, '..', 'fd')));
 */


/* 文件夹不存在 */
/* fs.readdir(path.resolve(__dirname, 'gg', ''), (err, files) => {
  console.log(files); // 不存在则为undefined
}) */
