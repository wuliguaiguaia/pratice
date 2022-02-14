const { createSSRApp } = require('vue')
const { renderToString } = require('@vue/server-renderer')
const http = require('http')
const server = http.createServer()
server.on('request', async (req, res) => {
  // 1 创建模板
  const app = createSSRApp({
    data() {
      return {
        username: '',
        account: 0,
      }
    },
    template: `<div>
      <h1>hello {{username}}</h1>
      <p>您的银行卡余额是 {{account}}</p>
    </div>`,
    created() {
      const { username, account } = getData()
      this.username = username
      this.account = account
    }
  })

  // 2 编译成字符串
  const appContent = await renderToString(app)
  // 3 插入到html内
  const html = `
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Document</title>
    </head>
    <body>
      <div id="app">${appContent}</div>
    </body>
  </html>
  `
  // 4 返回带有内容的html
  res.end(html)
})

server.listen(3004, (e) => {
  console.log('服务运行在 localhost:3004');
});

function getData() {
  return {
    username: 'alias',
    account: 10000000000000,
  };
}