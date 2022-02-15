import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import http from 'http'
import path from 'path'
import fs from 'fs'
import appVue from './App.vue'
const server = http.createServer()
server.on('request', async (req, res) => {
  const url = req.url
  if (url === '/') {
    // 1 创建应用实例
    const app = createSSRApp(appVue)
    // 2 编译成字符串
    const appContent = await renderToString(app)
    console.log('---', appContent);
    // 3 插入到html内
    const html = `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <script defer="defer" src="/dist/build.js"></script>
      </head>
      <body><div id="app">${appContent}</div></body>
    </html>`
    // 4 返回带有内容的html
    console.log(html);
    res.end(html)
  } else {
    const file = fs.readFileSync(path.resolve(process.cwd(), url.slice(1)), 'utf-8')
    res.end(file)
  }
})

server.listen(3004, (e) => {
  console.log('服务运行在 localhost:3004');
});

