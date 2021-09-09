require('@babel/register');
require('./main.js')
export const arr = Array.from('foo');
console.log(arr);  // [ 'f', 'o', 'o' ]