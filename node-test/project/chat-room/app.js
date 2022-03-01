const http = require('http');
const fs = require('fs');
const path = require('path');
const server = http.createServer();
server.on('request', (req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    console.log(data.toString());
  });
  res.writeHead(200, { 'Content-type': 'text/html' });
  const file = fs.readFileSync(path.resolve(__dirname, './index.htm'), 'utf-8');
  res.end(file);
});

// WebSocket是依赖HTTP协议进行握手的
const io = require('socket.io')(server);
io.on('connection', function (socket) {
  socket.send('青花瓷');
  socket.on('message', function (msg) {
    console.log(msg);
    socket.send('天青色等烟雨，而我在等你');
  });
});
// 监听3000端口
server.listen(3002);
