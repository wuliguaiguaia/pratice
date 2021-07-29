const net = require('net');

/* 创建TCP服务器 */
const server = net.createServer((socket) => { /* 回调类似于 connection */
  socket.on('data', (data) => {
    console.log('data', data.toString());
    socket.write('你好');
  });

  socket.on('end', () => {
    console.log('连接断开');
  });

  socket.write('welcome!');
});

server.listen(8124);
/* telnet 127.0.0.1 8124 */
/* TELENT: 远程控制web服务器 */

/* 监听 Domain Socket  */
// server.listen('/tmp/echo.sock');
/* nc -U /tmp/echo.sock */


console.log('server bound');
