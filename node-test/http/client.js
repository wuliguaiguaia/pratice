const http = require('http');
/* 发送post请求 */
const postData = JSON.stringify({
  'msg': 'Hello World!'
});

const options = {
  hostname: '127.0.0.1',
  port: 3000,
  // path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options);
req.on('response', (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`STATUS_Message: ${res.statusMessage}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');

  let data = '';
  res.on('data', (chunk) => {
    data += chunk
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.', data);
  });
})

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});


req.on('close', (e) => {
  console.error(`closed`);
});


// 将数据写入请求正文
req.write(postData);
req.end();
