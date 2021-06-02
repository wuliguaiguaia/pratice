const Vue = require('vue');
const renderer = require('vue-server-renderer').createRenderer();
const express = require('express');
const app = express();


const vueapp = {
  data() {
    return {
      message: 'hello world'
    }
  },
  template: `<h1>{{message}}</h1>`
}

app.get('/', async (req, res) => {
  const vapp = new Vue(vueapp);
  const html = await renderer.renderToString(vapp);
  res.send(html);
})

app.listen('3000', () => {
  console.log('listening localhost:3000/');
})
