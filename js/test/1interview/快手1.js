function createRequest({ pool }) {
  let num = 0
  let queue = []
  const request = (url, param) => {
    queue.push([url, param])
    if (num < pool) {
      num = num + 1
      const data = queue.shift()
      const promise = fetch(...data).then(() => {
        num = num - 1
        if (queue.length !== 0) {
          let data1 = queue.shift()
          request(...data1)
        }
      })
    }
  }
  return request
}


function fetch(url, param) {
  return new Promise((res) => {
    setTimeout(() => {
      console.log(url, '请求成功', String(new Date(Date.now())).slice(15, 25))
      res(url);
    }, 1000);
  })
}


const myRequest = createRequest({ pool: 2 })

const urlList = (Array.from(new Array(10))).map((item, idx) => ({
  url: idx,
  param: idx
}))

urlList.map(item => myRequest(item.url, item.param));


