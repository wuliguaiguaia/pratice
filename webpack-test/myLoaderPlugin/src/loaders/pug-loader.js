// https://www.pugjs.cn/api/reference.html
const pug = require('pug')
const loaderUtils = require('loader-utils')
module.exports = function (source) {
  const options = loaderUtils.getOptions(this)
  return pug.render(source, options)
}
