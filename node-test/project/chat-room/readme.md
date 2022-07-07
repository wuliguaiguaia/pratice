[命令行使用 websocket](https://github.com/joewalnes/websocketd)
https://github.com/joewalnes/websocketd/releases/tag/v0.4.1
[websocket客户端API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
[阮一峰 wesocket教程](https://www.ruanyifeng.com/blog/2017/05/websocket.html)
项目参考

https://juejin.cn/post/6844904065046937607#comment

https://juejin.cn/post/6844903696560553991

GET /HTTP/1.1 
Host: server.example.com 
Upgrade: websocket 
Connection: Upgrade 
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw== 
Sec-WebSocket-Protocol: chat, superchat 
Sec-WebSocket-Version: 13 
Origin: http://example.com


HTTP/1.1 101 Switching Protocols 
Upgrade: websocket 
Connection: Upgrade 
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk= 
Sec-WebSocket-Protocol: chat

原生监听 ungrade


index.htm：打开无头浏览器