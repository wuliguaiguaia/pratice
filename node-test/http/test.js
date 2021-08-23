const http = require('http');

const port = 3000;
const host = "127.0.0.1";

const server = http.createServer();

server.on('request', (req, res) => { // 创建服务器并返回
  console.log('fdsfsdfdsfsdf');
  res.statusCode = 200;
  res.setHeader('content-xxx', 'cccc');
  res.end('hello');
});

server.listen(port, host, () => {
  console.log('服务运行在', host, ':', port);
});
/* 
console.log(http.METHODS);
console.log(http.STATUS_CODES);
console.log(http.globalAgent); 
*/ 