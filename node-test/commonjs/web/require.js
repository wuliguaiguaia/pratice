// commonjs 在web 中执行
const map = {
  './moduleA': moduleA
}

function require(id) {
  const module = map[id]
  const _Module = { exports: {} }
  module(_Module)
  return _Module.exports
}

function moduleA(module) {
  module.exports = {date: Date.now()}
}

// index.js
const a = require('./moduleA')
console.log(a);