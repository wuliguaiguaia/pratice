const fs = require('fs')
const path = require('path')

const boundler = require('../packer/index')
const content = boundler('../examples/index') // 入口文件

fs.writeFileSync(path.resolve(__dirname, '../examples/dist', 'index.boundle.js'), content, 'utf-8')

