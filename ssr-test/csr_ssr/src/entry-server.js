const express = require('express')
const fs = require('fs')
const path = require('path')
const renderer = require('vue-server-renderer').createRenderer()

const {createApp} = require('./index')

const app = express()
const curPath = process.cwd()

app.get('/build.js', (req, res) => {
    res.sendFile(path.resolve(curPath, './dist/build.js'))
})

app.get('*', async (req, res) => {
    const url = req.url
    const {vm, store} = createApp()
    const html = await renderer.renderToString(vm)
    res.send(`
    <html>
        <body>
            <div id="app">${html}</div>
            <script src="/build.js"></script>
            /* 不加载 build.js 就是 纯ssr */
            /* 加载 build.js 就是 同构 */
        </body>
    </html>`)
})

app.listen(8888)