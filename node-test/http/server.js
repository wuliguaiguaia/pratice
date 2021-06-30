const http = require('http');


/* 当使用 http.createServer() 初始化 HTTP 服务器时，服务器会在获得所有 HTTP 请求头（而不是请求正文时）时调用回调。

在连接回调中传入的 request 对象是一个流。

因此，必须监听要处理的主体内容，并且其是按数据块处理的。 */

const server = http.createServer();

server.on('request', (req, res) => {
  // console.log(req, '===', res);
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  })
  req.on('end', () => {
    console.log(JSON.parse(data));
    console.log('receive end');
  })

  req.on('aborted', () => {
    console.log('请求被终止');
  })

  req.on('close', () => {
    console.log('底层连接已关闭');
  })

  console.log('req.httpVersion', req.httpVersion);
  console.log('req.url', req.url);
  res.statusCode = 200;
  res.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']); //  response.setHeader response.writeHead() 的标头优先。尽量使用setheader

  // res.end('发士大夫撒', '', ($1, $2) => {
  //   console.log('$', $1, $2);
  // })
  res.statusMessage = 'okkkk';

  const x = res.write('发士') // 这会发送一块响应正文。 可以多次调用此方法以提供正文的连续部分。
  console.log(x); // 整个数据已成功刷新到内核缓冲区，则返回 true
  res.write('大夫撒')
  // 第一次调用 response.write() 时，它会将缓存的标头信息和正文的第一个块发送给客户端。 
  // 第二次调用 response.write() 时，Node.js 假设数据将被流式传输，并单独发送新数据。 也就是说，响应被缓冲到正文的第一个块。
  res.end()  // 必须在每个响应上调用



  res.on('finish', () => {
    console.log('res finish 当响应头和正文的最后一段已移交给操作系统以通过网络传输时，则将触发此事件。 这并不意味着客户端已收到任何东西');
  })
  res.addTrailers({ 'Content-MD5': '7895bf4b8828b55ceaf47747b4bca667' }); // 向响应添加 HTTP 尾随标头??

})

server.listen(3000, () => {
  console.log('server is running in localshot:3000');
})

server.on('close', () => {
  console.log('server closed');
})


// 设置从客户端接收整个请求的超时值（以毫秒为单位）。
server.requestTimeout = 5


