const fs = require('fs')
const path = require('path')

const boundler = require('./../src/index')
const content = boundler('./index') // 入口文件

fs.writeFileSync(path.resolve(__dirname, 'index.boundle.js'), content, 'utf-8')

