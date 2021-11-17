/* ts中使用js文件，如何使用类型 */
interface NNN {
  (a:number, b:number):() => number
}
/* 第一种方式：使用 require */
/* const add: NNN = require('./add.js'); 

const deee = add(1, 2);
console.log(deee); */

/* 第二种，为其增加xxx.d.ts 文件 */

import add, {xxx} from './add.js'
add(1, '2');
xxx('1')