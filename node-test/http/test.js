const http = require('http');

const port = 3000;
const host = "127.0.0.1";

const server = http.createServer((req, res) => { // 创建服务器并返回
  res.statusCode = 202;
  res.setHeader('content-xxx', 'cccc');
  res.write('hello ');
})

server.on('request', (req, res) => {
  res.end('world') // 结果是 hello world ；；； res.write 可多次调用
})
server.listen(port, host, () => {
  console.log('服务运行在', host,":" , port);
})

console.log(http.METHODS);
console.log(http.STATUS_CODES);
console.log(http.globalAgent);