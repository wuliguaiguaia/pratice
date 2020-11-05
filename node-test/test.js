// process.stdin.on('data', function (chunk) {
//     console.log('stream by stdin', chunk)
//     console.log('stream by stdin', chunk.toString())
// })

const path = require('path');
const fs = require('fs');
const http = require('http');
 
const server = http.createServer((err, res) => {
    res.end('hello world 2')
})

server.listen(8888, '127.0.0.1', (err, res) => {
    console.log(0);
})

























// const promisify = (func) => {
//     return function (...args) {
//         return new Promise((resolve, reject) => {
//             args.push((err, res) => {
//                 if (err) reject(err);
//                 resolve(res);
//             })
//             func.apply(func, args);
//         })
//     }
// }

// const server = http.createServer((err, res) => {
//     res.writeHead(200, { 'x-fds': 'fsd' })
//     res.end('hello world');
// })

// server.listen(8888, '127.0.0.1', (err, res) => {
//     console.log('listen 8888');
// })