require('./require.js');
global.r('./common.js');
const result = global.r('./common.js');

require('./changer.js')
// // const result = require('./common.test');
// const result = require('./common.js');
console.log(result);
