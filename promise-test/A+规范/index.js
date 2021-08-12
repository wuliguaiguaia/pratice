// const Promise = MyPromise
new Promise((resolve) => {
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
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('get', './test/id.txt')
    xhr.onreadystatechange = (res) => {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
          resolve(new Promise(resolve => {
            setTimeout(() => {
              reject('10000')
            }, 1000);
          }))
        }
      }
    }
    xhr.send()
  })
}).then(per => {
  console.log(per,'per');
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