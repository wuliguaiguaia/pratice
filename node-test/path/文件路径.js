/* 以下均在 node-test 目录下运行 */

const path = require('path');

const notes = '/users/joe/notes.txt';

console.log(path.dirname(notes)); // /users/joe
console.log(path.basename(notes)); // notes.txt
console.log(path.extname(notes)); // .txt

// 获取不带后缀的文件名
console.log(path.basename(notes, path.extname(notes))); // notes


/* 仅拼接路径 */
console.log(path.join('users', 'joe', 'notes.txt')); // users/joe/notes.txt
console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')); // /foo/bar/baz/asdf
console.log(path.join('foo', '/bar', 'baz/asdf')); // foo/bar/baz/asdf
console.log(path.join()); // .


/* 获得相对路径的绝对路径: 取决于运行目录 */
console.log(path.resolve('/foo', '/bar', 'baz')); // 从右到左处理，每个后续的 path 会被追加到前面，直到构建绝对路径
// /bar/baz

console.log(path.resolve('./xxx.js')); // 如果在处理完所有给定的 path 片段之后，还没有生成绝对路径，则使用当前工作目录
// /Users/alias/code/pratice/node-test/xxx.js

console.log(path.resolve('alias', 'xxx.js')); // 第一个参数将作为第二个参数的基础
// /Users/alias/code/pratice/node-test/alias/xxx.js

console.log(path.resolve('/alias', 'xxx.js')); // / 绝对路径
// /alias/xxx.js

console.log(path.resolve()); // 没有传值，返回当前运行目录
console.log(path.resolve() === process.cwd()); // true


/* 当包含诸如 .、.. 或双斜杠之类的相对说明符时，其会尝试计算实际的路径 */
console.log(path.normalize('/users/alias/..//test.txt')); // /users/test.txt


/*
  path.delimiter: 提供特定于平台的路径定界符：
    ; 用于 Windows
    : 用于 POSIX
*/
console.log('path.delimiter', path.delimiter);
console.log(process.env.PATH.split(path.delimiter));


/* 是否是绝对路径 */
console.log(path.isAbsolute('xxx.js')); // false


/* 路径解析 */
console.log(path.parse('/home/user/dir/file.txt'));

/*
  {
    root: '/',
    dir: '/home/user/dir',
    base: 'file.txt',
    ext: '.txt',
    name: 'file'
  }
*/

/* path.format() 方法从对象返回路径字符串。 这与 path.parse() 相反。 */


/* 对 path 方法的 POSIX 特定实现的访问 */
console.log(path.posix);


/* 根据当前工作目录返回从 from 到 to 的相对路径 */
console.log(path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')); // ../../impl/bbb


/* 返回当前文件所在目录 */
console.log(__dirname); // /Users/alias/code/pratice/node-test/path