function* foo() {
  let response1 = yield fetch('http://127.0.0.1:5501/promise-test/test/id.txt') //返回promise对象
  console.log('response1')
  console.log(response1)
  let response2 = yield fetch('http://127.0.0.1:5501/promise-test/test/article.txt') //返回promise对象
  console.log('response2')
  console.log(response2)
  return response2
}

function asyncFn(generator) { // 作为一个高阶函数，包装 generator 返回一个新的函数
  return function () {
    const gen = generator.apply(this, arguments)
    return new Promise((resolve, reject) => { // 执行函数返回一个promise
      const step = (method, data) => {
        try {
          const { value, done } = gen[method](data)
          if (done) {
            resolve(value) // 执行完毕
          } else {
            Promise.resolve(value).then(res => {
              step('next', res)
            }, err => {
              step('throw', err)
            })
          }
        } catch (err) {
          reject(err)
        }

      }
      step('next') // 第一次执行
    })
  }
}

const 包装原函数 = asyncFn(foo)
包装原函数().then(res => {
  console.log(res, '+++');
})


// 另一种写法
function fn(handler) {
  return Promise.resolve().then(function nextAction(value) {
    const next = handler.next(value)
    if (next.done) {
      return next.value // 可返回最终return后的值，没有就是undefined，也可以手动给他返回上次value
    } else {
      return Promise.resolve(next.value).then(nextAction)
    }
  })
}

/* let x = foo()
fn(x).then(res => {
  console.log(res, '====');
}) */
