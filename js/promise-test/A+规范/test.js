new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject(1)
  }, 2000)
}).catch((e) => {
  console.log(e);
})