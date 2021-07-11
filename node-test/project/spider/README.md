## node 爬虫

### api 方式 和 服务端渲染

- api 直接通过 http 请求
- 服务端渲染：由于结果已经在html里了，使用 cheerio，可以通过 jquery 的形式操作dom找数据

### api 爬虫快捷方式

1、copy as cURL 复制带有完整请求信息的请求
2、copy as fetch 与 node fetch，node多了cookie做鉴权

### 图片的防盗链一般校验refer

如果不是，就增加其他需要的header
403： 增加  headers: { referer: "https://www.bigbigwork.com/" } 做校验

### axios

1、axios 可以同时在客户端和服务端使用，客户端封装了 XMLHttpRequest 对象和fetch对象，服务端对http和https做了封装构造请求
鉴权：其实就是一个请求，带上cookie

2、图片文件返回的是二进制流，需要使用 buffer 处理

### 防止爬虫

1、验证短时间内某ip次数是否多次访问，到一定阈值，验证码或者其他方式
