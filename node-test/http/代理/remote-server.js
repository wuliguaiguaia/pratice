const http = require('http')
http.createServer((req, res) => {
  req.on('data', (chunk) => {
    console.log('远程服务器接收数据', chunk.toString());
  })
  res.end('远程服务器发送数据：remote-server hhhhhhag')
}).listen(8085)
