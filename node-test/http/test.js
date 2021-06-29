const http = require('http');

const port = 3000;
const host = "127.0.0.1";

const server = http.createServer((req, res) => { // 创建服务器并返回
  res.statusCode = 202;
  res.setHeader('content-xxx', 'cccc');
  res.end('hello world');
})

server.listen(port, host, () => {
  console.log('服务运行在', host,":" , port);
})

console.log(http.METHODS);
console.log(http.STATUS_CODES);