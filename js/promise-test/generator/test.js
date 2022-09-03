function run(gen) {
  var g = gen();

  function next(data) {
    var result = g.next(data);
    if (result.done) return result.value;
    result.value.then(function (data) {
      next(data);
    });
  }

  next();
}
function* foo() {
  let response1 = yield fetch('http://127.0.0.1:5501/promise-test/test/id.txt') //返回promise对象
  console.log('response1')
  console.log(response1)
  let response2 = yield fetch('http://127.0.0.1:5501/promise-test/test/article.txt') //返回promise对象
  console.log('response2')
  console.log(response2)
}
// run(foo);

let x = foo()
let next1 = x.next() // next 里传值是给 yield 的返回
                      // next 的返回值是yield 后面的值
next1.value.then(res => { 
  let next2 = x.next(res)
  next2.value.then(res2 => {
    let next3 = x.next(res2)
  })
})

// next()是将yield表达式替换成一个值。


