const http = require('http');
http.createServer((req, res, err) => {
  console.log(req.headers.origin);

  res.setHeader('Access-Control-Allow-Origin', req.headers.origin); //访问控制允许来源
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); //访问控制允许报头 X-Requested-With: xhr请求
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS'); //访问控制允许方法

  // res.setHeader('Access-Control-Expose-Headers', 'Cache-Control'); // 允许跨域
  res.setHeader('Access-Control-Allow-Credentials', true);

  res.setHeader('X-Powered-By', 'nodejs'); //自定义头信息，表示服务端用nodejs

  res.setHeader('Content-type', 'text/javascript')
  res.end('999');
}).listen(8083, '127.0.0.1')






/* 
1、请求头增加 origin 字段，表示来自哪个源，服务器根据这个值，决定是否同意这次请求
2、服务器可以控制跨域的请求方法、请求头、是否可以发送cookie，
*/