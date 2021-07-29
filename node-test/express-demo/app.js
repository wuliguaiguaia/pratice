const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())  // 面向切面编程
// 是对于需要多次书写的业务逻辑，我们可以使⽤⼀种切⾯的形式，对相同逻辑进⾏通⽤处理。
/* app.use((req, res, next) => {
  console.log(req.url, 'start');
  next() // 将控制权交给下一个处理程序，所有程序走完后，又会再回来(洋葱模型)
  console.log(req.url, 'end');
}) // 定义中间价，劫持所有的请求 */



const sleep = (time) => new Promise(resolve => setTimeout(resolve, time * 1000))

app.use(async (req, res, next) => {
  console.log('1 start express');
  await sleep(1).then(next)
  console.log('1 end express');
})

app.use(async (req, res, next) => {
  console.log('2 start express');
  await sleep(2).then(next)
  console.log('2 end express');
})
/* 
  1 start express
  2 start express
  1 end express
  2 end express 
*/

app.get('/', (req, res) => {
  console.log('ooo\\\ppp');
  res.send('0000')
})

app.get('/sss', (req, res) => {
  console.log('ooo');
  res.send('0000')
})
app.listen(8080)
