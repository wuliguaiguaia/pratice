const http = require('http');

const port = 3000;
const host = "127.0.0.1";

const server = http.createServer((req, res) => { // 创建服务器并返回
  res.statusCode = 202;
  res.setHeader('content-xxx', 'cccc');
  res.end('hello world');
})

server.listen(port, host, () => {
  console.log('服务运行在', host, ":", port);
  console.log(`This process is pid ${process.pid}`);
  setTimeout(() => {
    process.kill(process.pid, 'SIGTERM') // 已知pid终止进程
    // [1]    75846 terminated  node exit.js
  }, 3000)
})

process.on('sigterm', () => {
  server.close((err) => {
    console.log('进程终止', err); // 没有打印:TODO
  })
})

// setTimeout(() => {
//   process.exit();
//   process.exitCode = 1;  // 当进程正常退出或通过 process.exit() 退出而不指定代码时，将作为进程退出码的数字. 补充作用
// }, 3000)

console.log(process.version); // v16.3.0
console.log(process.versions); // v16.3.0
/**
 * {
    node: '16.3.0',
    v8: '9.0.257.25-node.16',
    uv: '1.41.0',
    zlib: '1.2.11',
    brotli: '1.0.9',
    ares: '1.17.1',
    modules: '93',
    nghttp2: '1.42.0',
    napi: '8',
    llhttp: '6.0.2',
    openssl: '1.1.1k+quic',
    cldr: '39.0',
    icu: '69.1',
    tz: '2021a',
    unicode: '13.0',
    ngtcp2: '0.1.0-DEV',
    nghttp3: '0.1.0-DEV'
  }
 */

