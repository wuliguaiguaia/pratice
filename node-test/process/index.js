// 1、可以通过 NODE_ENV=dev node index.js 的方式设置环境变量
console.log(process.env); // 启动程序时设置的所有环境变量
console.log(process.env.NODE_ENV);

// 2、process.argv 参数列表
console.log(process.argv);



const minimist = require('minimist')
console.log(minimist(process.argv.slice(2)));