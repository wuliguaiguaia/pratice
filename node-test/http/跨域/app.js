const http = require('http');
http.createServer((req, res, err) => {
  console.log(req);
  res.setHeader('Access-Control-Allow-Origin', '*'); //访问控制允许来源：所有
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); //访问控制允许报头 X-Requested-With: xhr请求
  res.setHeader('Access-Control-Allow-Metheds', 'PUT, POST, GET, DELETE, OPTIONS'); //访问控制允许方法
  res.setHeader('X-Powered-By', 'nodejs'); //自定义头信息，表示服务端用nodejs
  res.end('999');
}).listen(8083, '127.0.0.1')
