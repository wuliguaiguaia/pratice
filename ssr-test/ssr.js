const Vue = require('vue');
const renderer = require('vue-server-renderer').createRenderer();
const express = require('express');
const app = express();



app.get('/', async (req, res) => {
  const vueapp = {
    data() {
      return {
        message: 'hello world'
      }
    },
    template: `<h1>{{message}}</h1>`,
    mounted() {
      console.log(111111); // 无法执行钩子
    },
    created() {
      // console.log(window); // 编译错误，window is not defined
      this.ss()
    },
    methods: {
      ss() {
        // let a = window.a
        // console.log(a); // node 环境，编译错误
      }
    }
  }

  
  const vapp = new Vue(vueapp);
  const html = await renderer.renderToString(vapp);
  res.send(html);
})

app.listen('3001', () => {
  console.log('listening localhost:3001/');
})
