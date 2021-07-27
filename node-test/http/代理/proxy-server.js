const http = require('http')
const dns = require('dns')

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 

  const preq = http.request({
    method: req.method,
    host: '127.0.0.1',
    port: 8085
  }, (pres) => {
    pres.pipe(res)
    pres.on('end', () => {
      console.log('done');
    })
  })

  if (/POST|PUT/i.test(req.method)) {
    req.pipe(preq) // 获取来源流，并将其通过管道传输到目标流
  } else {
    preq.pipe()
  }
}).listen(8086)

