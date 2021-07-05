const http = require('http');
const url = require('url')

const server = http.createServer();

server.on('request', (req, res) => {
  // const pathname = url.parse(req.url).pathname;， 
  const myURL = new URL('https://example.org/?abc=123');
  console.log(myURL.searchParams.get('abc'));
  // 打印 123

  myURL.searchParams.append('abc', 'xyz');
  console.log(myURL.href);
  // 打印 https://example.org/?abc=123&abc=xyz

  myURL.searchParams.delete('abc');
  myURL.searchParams.set('a', 'b');

  console.log(req.url);
  const test2 = new URL(req.url, 'http://127.0.0.1'); // 不能是localhost
  console.log(test2);

  /* 
    URL {
      href: 'http://127.0.0.1/main.js',
      origin: 'http://127.0.0.1', // protocol + host
      protocol: 'http:',
      username: '',
      password: '',
      host: '127.0.0.1',
      hostname: '127.0.0.1', // 不带端口号的host
      port: '',
      pathname: '/main.js',
      search: '',
      searchParams: URLSearchParams {}, // 可以进行 get set delete 等操作
      hash: ''
    }
  */

  res.end(test2.href);
});


server.listen('8001');
console.log('Server running in localhost:8001 ');