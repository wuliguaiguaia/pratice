const http = require('http');
const server = http.createServer();
server.on('request', (req, res) => {
  console.log(req.url);
  res.end('fds')
})

server.listen(3900, () => {
  console.log('server is running in localhost:3000');
})

