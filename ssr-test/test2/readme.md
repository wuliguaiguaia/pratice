主要是 vue-server-renderer


路由同构：
在服务端运行一遍，在客户端再运行一遍， 服务端渲染完成页面结构，客户端渲染绑定事件。它是在 SPA 的基础上，利用服务端渲染直出首屏，解决了单页面应用首屏渲染慢的问题