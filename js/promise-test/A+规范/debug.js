/**
 * 测试1：多个顺序请求
 */
new MyPromise((resolve) => {
  const xhr = new XMLHttpRequest()
  xhr.open('get', './test/permission.txt')
  xhr.onreadystatechange = (per) => {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        console.log(xhr.responseText)
        resolve(xhr.responseText)
      }
    }
  }
  xhr.send()
}).then(per => {
  return new MyPromise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('get', './test/id.txt')
    xhr.onreadystatechange = (res) => {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
          resolve(new MyPromise(resolve => {
            setTimeout(() => {
              resolve('10000')
            }, 1000);
          }))
        }
      }
    }
    xhr.send()
  })
}).then(per => {
  console.log(per, 'per');
  const xhr = new XMLHttpRequest()
  xhr.open('get', './test/article.txt')
  xhr.onreadystatechange = () => {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
        return xhr.responseText
      }
    }
  }
  xhr.send()
})

/**
 * 测试2：promise.all
 */
const promise1 = new MyPromise((resolve, reject) => {
  const xhr = new XMLHttpRequest()
  xhr.open('get', './test/permission.txt')
  xhr.onreadystatechange = () => {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        reject(xhr.responseText)
      }
    }
  }
  xhr.send()
})
const promise2 = new MyPromise((resolve, reject) => {
  const xhr = new XMLHttpRequest()
  xhr.open('get', './test/id.txt')
  xhr.onreadystatechange = () => {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        resolve(xhr.responseText)
      }
    }
  }
  xhr.send()
})

const promise3 = new MyPromise((resolve, reject) => {
  const xhr = new XMLHttpRequest()
  xhr.open('get', './test/article.txt')
  xhr.onreadystatechange = () => {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        resolve(xhr.responseText)
      }
    }
  }
  xhr.send()
})

MyPromise.all([promise1, promise2, promise3]).then(res => {
  console.log(res);
}, err => {
  console.log(err);
})

/** 
 * 测试: race
*/
MyPromise.race([promise1, promise2, promise3]).then(res => {
  console.log(res, '-----');
}, err => {
  console.log(err);
})

/* 
  测试：finally
 */

promise1.finally(_ => {
  console.log('+++'); // 无论如何都【立即】执行
}).then(res => { // 依旧可以拿到结果
  console.log(res,']]]');
}, err => {
  console.log(err, '[[[');
})

