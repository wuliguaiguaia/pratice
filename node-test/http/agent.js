/* agent 负责管理 HTTP 客户端连接的持久性和重用 */

const http = require('http');
const keepAliveAgent = new http.Agent({ keepAlive: true });
console.log(keepAliveAgent);
const postData = JSON.stringify({
  'msg': 'Hello World!'
});


const options = {
  hostname: '127.0.0.1',
  port: 3000,
  agent: keepAliveAgent,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};


const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});


req.on('close', () => {
  console.log('closed');
})
// 将数据写入请求正文
req.write(postData);
req.end();
