$ curl -v http://127.0.0.1:3000

* Uses proxy env variable http_proxy == 'http://127.0.0.1:1081'
*   Trying 127.0.0.1...  // tcp三次连接
* TCP_NODELAY set
* Connected to 127.0.0.1 (127.0.0.1) port 1081 (#0)
> GET http://127.0.0.1:3000/ HTTP/1.1 // 请求报文
> Host: 127.0.0.1:3000
> User-Agent: curl/7.64.1
> Accept: */*
> Proxy-Connection: Keep-Alive
>                                      // 请求体
< HTTP/1.1 200 OK                      // 响应报文
< content-xxx: cccc
< Date: Sat, 03 Jul 2021 09:15:59 GMT
< Connection: keep-alive
< Transfer-Encoding: chunked
< Proxy-Connection: keep-alive
< 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  hhhhhhhhhhaaa
</body>
* Connection #0 to host 127.0.0.1 left intact
</html>* Closing connection 0-+