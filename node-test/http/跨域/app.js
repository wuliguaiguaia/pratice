const http = require('http');
http.createServer((req, res, err) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  })
  req.on('end', () => {
    console.log(data);
  })
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.end(888)
}).listen(8083)
