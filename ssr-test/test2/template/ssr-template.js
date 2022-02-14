const Vue = require('vue');
const renderer = require('vue-server-renderer').createRenderer;
const express = require('express');
const app = express();
const fs = require('fs')
const path = require('path')



app.get('/', async (req, res) => {
  const vueapp = {
    data() {
      return {
        message: 'hello world'
      }
    },
    template: '<h1>123</h1>'
  }

  const vapp = new Vue(vueapp);
  const html = await renderer({
    template: fs.readFileSync(path.resolve(__dirname, './html-template.html'), 'utf-8')
  }).renderToString(vapp);
  res.send(html);
})

app.listen('3002', () => {
  console.log('listening localhost:3002/');
})
