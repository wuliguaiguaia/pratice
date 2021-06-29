const http = require('http');


/* 当使用 http.createServer() 初始化 HTTP 服务器时，服务器会在获得所有 HTTP 请求头（而不是请求正文时）时调用回调。

在连接回调中传入的 request 对象是一个流。

因此，必须监听要处理的主体内容，并且其是按数据块处理的。 */

const server = http.createServer((req, res) => {
  console.log(req);
  let data = '';
  req.on('data', (chunk) => {
    console.log(chunk);
    data += chunk;
  })
  req.on('end', () => {
    console.log(JSON.parse(data));
    console.log('receive end');
  })
  res.statusCode = 202;
  res.end('发士大夫撒') // content-length：15
})

server.listen(3000, () => {
  console.log('server is running in localshot:3000');
})