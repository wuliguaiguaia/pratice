# 静态文件服务器

浏览器发送 URL，服务端解析 URL，对应到硬盘上的文件。如果文件存在，返回 200 状态码，并发送文件到浏览器端；如果文件不存在，返回 404 状态码，发送一个 404 的文件到浏览器端


1、mime 类型

2、增加缓存

3、使用文件流、gzip 压缩

4、[x] 无法访问 app.js

5、默认 index.html, 包括 目录的处理

6、支持断点
  测试
    curl --header "Range:0-10" -i http://localhost:8000/index.html

7、将其变成可执行文件

```
#!/usr/bin/env node

chmod +x 

export PATH="/Users/alias/code/pratice/node-test/project/static-server:$PATH"
alias nse="app.js"

brew cleanup // 修复 source ~/.zshrc 报错
```

8、自动打开浏览器

### 使用

```
$ nse 8000 example
Server running in localhost: 8002 ;
----------
The static file directory is example
```

### question
1、请求头没有if-modified-since ，只有在 cache-control 设置的时间过期后才有