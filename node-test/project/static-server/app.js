const http = require('http');
const path = require('path');
const fs = require('fs');
const mime = require('./mime').types;
const config = require('./config');

const server = http.createServer();

server.on('request', (req, res) => {
  const pathname = new URL(req.url, 'http://127.0.0.1').pathname;
  const filePath = path.join('example', pathname);
  if (!fs.existsSync(filePath)) {
    res.writeHead(404, {
      'Content-type': 'text/plain'
    })
    res.end("This request URL " + pathname + " was not found on this server.")
  } else {
    const ext = path.extname(filePath)?.slice(1) || '';
    const content = fs.readFileSync(filePath, 'binary');
    const contentType = mime[ext] || 'text/plain';

    if (ext.match(config.Expires.fileMatch)) {
      const expires = new Date();
      expires.setTime(expires.getTime() + config.Expires.maxAge);
      res.setHeader('Expires', expires.toUTCString());
      res.setHeader('Cache-Control', 'max-age=' + config.Expires.maxAge);
      const lastModified = fs.statSync(filePath).mtime.toUTCString();
      res.setHeader('Last-Modified', lastModified)
    }

    const { headers: { ifModifiedSince } } = req;
    console.log(req.headers);

    res.writeHead(200, {'Content-type': contentType })
    res.write(content, 'binary');
    res.end()
  }
});


server.listen('8000');
console.log('Server running in localhost:8000 ');