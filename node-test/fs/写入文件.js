const fs = require('fs');
const path = require('path');
let filePath = path.resolve(__dirname, './test.txt');


let content = '覆盖写入哈哈哈'


/* 覆盖写入 */
/* fs.writeFile(filePath, content, err => {
  if (err) {
    console.error(err)
    return
  }
  console.log('文件写入成功')
}) */



/* 同步覆盖写入 */
try {
/*
  fs.writeFileSync(filePath, 'content content content content')
 */
} catch (e) {
  console.log('文件写入失败');
}

/* 使用文件描述符修改默认行为 */
/* filePath = path.resolve(__dirname, 'test2.txt') // 不存在则创建
fs.writeFile(filePath, content, { flag: 'a+' }, err => { }) */

/* fs.appendFile() 追加到文件， 不存在则创建 */
fs.appendFile(filePath, content, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('文件内容追加成功');
})


