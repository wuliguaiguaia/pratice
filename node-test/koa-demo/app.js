const Koa = require('koa')
const koaRouter = require('koa-router')

const app = new Koa()
const router = new koaRouter()


app
  .use(router.routes())
  .use(router.allowedMethods())

const sleep = (time) => new Promise(resolve => setTimeout(resolve, time * 1000))

router.use(async (ctx, next) => {
  console.log('1 start koa');
  await sleep(1).then(next)
  console.log('1 end koa');
})
router.use(async (ctx, next) => {
  console.log('2 start koa');
  await sleep(2).then(next)
  console.log('2 end koa');
})

/*
  1 start koa
  2 start koa
  2 end koa
  1 end koa 
*/
// 与express相比，koa可以完美的处理异步的场景，express缺了promise.resolve方法
// 尤其是在next之后有操作，需要特别注意 express

router.get('/', ctx => {
  ctx.body = 'hello koa'
})

app.listen(9999)


