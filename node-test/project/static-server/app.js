const fs = require('fs');
const path = require('path');
const http = require('http');
const mime = require('./mime').types;
const config = require('./config');
const zlib = require('zlib');
const utils = require('./utils');

const server = http.createServer();

server.on('request', (req, res) => {
  let pathname = new URL(req.url, 'http://127.0.0.1').pathname.slice(1);

  // pathname = path.normalize(pathname.replace(/\.\./g, '')); // 防止 curl -i http://localhost:8000/../app.js

  if (pathname === '') {
    pathname = config.Welcome.file;
  }
  let filePath = path.resolve('example', pathname);
  
  /* 文件夹返回 其下index.html */
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    pathname = path.join(pathname) + '/' + config.Welcome.file;
    filePath = path.resolve('example', pathname);
  }
  
  const stats = fs.statSync(filePath);
  console.log('size', stats.size);

  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-type': 'text/plain' });
    res.end('not found');
  } else {
    const ext = path.extname(filePath)?.slice(1) || '';
    const contentType = mime[ext];
    res.setHeader('Content-type', contentType);

    /* 设置缓存头 */
    if (ext.match(config.Expires.fileMatch)) {
      let expires = new Date();
      expires.setTime(expires.getTime() + config.Expires.maxAge * 1000);
      res.setHeader('Expires', expires.toUTCString())
      res.setHeader('Cache-Control', 'max-age=' + config.Expires.maxAge);

      const mtime = fs.statSync(filePath).mtime.toUTCString();
      res.setHeader('Last-Modified', mtime);

      const modifiedSince = req.headers['if-modified-since'];
      if (modifiedSince && modifiedSince === mtime) {
        res.statusCode = 304;
        res.end();
        return;
      }
    }

    res.statusCode = 200;

    /* 使用文件流 */
    let raw = fs.createReadStream(filePath);

    /* 支持断点 */
    res.setHeader('Accept-Ranges', 'bytes');
    const reqRange = req.headers.range;

    if (reqRange) {
      const range = utils.parseRange(reqRange, stats.size);
      console.log(range);
      if (range) {
        res.setHeader("Content-Range", "bytes " + range.start + "-" + range.end + "/" + stats.size);
        res.setHeader("Content-Length", (range.end - range.start + 1));
        raw = fs.createReadStream(filePath, {
          "start": range.start,
          "end": range.end
        });
        res.statusCode = 206; // 'Partial Content'
      } else {
        res.removeHeader("Content-Length");
        res.statusCode = 416; // 'Range Not Satisfiable'
        res.end();
        return;
      }
    }
    
    /* 压缩 */
    const acceptEncoding = req.headers['accept-encoding']; // gzip, deflate, br
    const match = ext.match(config.Compress.fileMatch);
    if (match && acceptEncoding?.match(/\bgzip\b/)) {
      res.setHeader('Content-Encoding', 'gzip');
      raw.pipe(zlib.createGzip()).pipe(res);
    } else if (match && acceptEncoding?.match(/\bdeflate\b/)) {
      res.setHeader('Content-Encoding', 'deflate');
      raw.pipe(zlib.createDeflate()).pipe(res);
    } else {
      raw.pipe(res);
    }
    /* 无需使用res.end();  */
  }
})

server.listen(8000);
console.log('server running in localhost:8000');
