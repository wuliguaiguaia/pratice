const http = require('http');
const fs = require('fs');
http.createServer((_, res) => {
  /* fs.createReadStream(path[, options]) */
  const stream = fs.createReadStream(__dirname + '/index.html');
  /* 当要发送的数据块已获得时就立即开始将其流式传输到 HTTP 客户端，而不是等待直到文件被完全读取。 */
  stream.pipe(res);
})
.listen(8000)