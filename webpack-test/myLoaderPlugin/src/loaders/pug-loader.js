// https://www.pugjs.cn/api/reference.html
const pug = require('pug');
const loaderUtils = require('loader-utils');
module.exports = function (source) { // 只接受一个参数，源代码字符串形式
    const options = loaderUtils.getOptions(this);
    console.log(options);
    return pug.render(source, options);
};
