let index = 0;
let cache = {
  method() {
    console.log('this is cache', index);
  }
}

debugger
function cacheInfo(info) {
  index += 1
  const prevCache = cache;
  const method = () => {
    if (prevCache) {
      prevCache.method()
    }
  }

  cache = {
    info,
    method() {
      method()
      console.log('this is method', index)
    }
  }
} 

for (let i = 0; i < 100000; i++){
  const info = new Array(100000)
  cacheInfo(info)
}

// node --inspect-brk --inspect debug.js
// chrome://inspect/#devices