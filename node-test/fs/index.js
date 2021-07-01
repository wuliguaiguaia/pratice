const fs = require('fs');

/* 更改文件的权限 */
fs.chmod('my_file.txt', 0o775, (err) => {
  if (err) throw err;
  console.log('The permissions for file "my_file.txt" have been changed!');
});