const fs = require('fs');
const { constants } = fs;

const path = require('path');
let dirPath = path.resolve(__dirname, 'test');

/* 使用 fs.access() 检查文件夹是否存在以及 Node.js 是否具有访问权限。 */
/* 检查当前目录中是否存在该文件/目录 */
fs.access(dirPath, constants.F_OK, (err) => {
  console.log(`${dirPath} ${err ? 'does not exist' : 'exists'}`);
})

/* 检查文件是否可读。 */
fs.access(dirPath, constants.R_OK, (err) => {
  console.log(`${dirPath} ${err ? 'is not readable' : 'is readable'}`);
});

/* 检查文件是否可写。 */
fs.access(dirPath, constants.W_OK, (err) => {
  console.log(`${dirPath} ${err ? 'is not writable' : 'is writable'}`);
});

/* 检查当前目录中是否存在文件，是否可写 */
fs.access(dirPath, constants.F_OK | constants.W_OK, (err) => {
  if (err) {
    console.error(
      `${dirPath} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`);
  } else {
    console.log(`${dirPath} exists, and it is writable`);
  }
});

/* 
  在调用 fs.open()、fs.readFile() 或 fs.writeFile() 之前，不要使用 fs.access() 检查文件的可访问性。 
  这样做会引入竞争条件，因为其他进程可能会在两次调用之间更改文件的状态。 
  而是，用户代码应直接打开/读取/写入文件，并处理无法访问文件时引发的错误
*/

/* console.log(constants);
 */

/* 创建文件夹 */
let folderName = path.resolve(__dirname, 'folderName')
try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName)
  }
} catch (err) {
  console.error(err)
}

/* 读取目录的内容 */
    // 会读取文件夹的内容（全部的文件和子文件夹），并返回它们的相对路径：非递归
let folderPath = path.resolve(__dirname, 'test')
let data = fs.readdirSync(folderPath); // [ '1.js', 'testss' ]
data = data.map(name => path.join(folderPath, name)); // 返回完整路径
data = data.filter(name => fs.lstatSync(name).isFile()); // 过滤文件夹
console.log(data); // [ '/Users/alias/code/pratice/node-test/fs/test/1.js' ]


/* 重命名文件夹 */
let originName = path.resolve(__dirname, 'originName')
let rename = path.resolve(__dirname, 'rename')
fs.rename(originName, rename, err => {
  if (err) {
    console.error(err)
    return
  }
  console.log('重命名成功');
})

/* 删除文件夹 */
const fs_extra = require('fs-extra')
let deletename = path.resolve(__dirname, 'deletename')
fs_extra.remove(deletename, err => {
  if (err) {
    console.error(err)
    return;
  }
  console.log('删除成功');
})