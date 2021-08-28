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



function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

return function (context, next) {
  // last called middleware #
  let index = -1
  return dispatch(0)
  function dispatch(i) {
    if (i <= index) return Promise.reject(new Error('next() called multiple times'))
    index = i
    let fn = middleware[i]
    if (i === middleware.length) fn = next
    if (!fn) return Promise.resolve()
    try {
      return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
