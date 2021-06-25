define(function (require) {
  setTimeout(() => {
    const m = require('./b');
      console.log('a', m);  // 一样
  }, 2000)
})