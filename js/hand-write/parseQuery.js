// 兼容多种情况与给定默认值

/* url
    保留字符：; / ? : @ & = + $ , # {11个}
    其他字符需要转义
*/
/*
    特殊情况处理：
       1 未组成对的情况 ?a=&b=1      ->  默认undefined
       2 无值情况 ?enable&c=1       ->  在做一层replace
*/


function fn(url) {
    let obj = {};
    let index = url.indexOf('?')
    let string = url.slice(index)
    string = string.replace(/([^?=&#]+)=([^?=&#]+)/g, (_, key, val) => {
        obj[key] = val;
        return ''
    }).replace(/(?<=[?|&])([^?=&#]+)(&|$|#)/g, (_, key) => {
        obj[key] = true
    });
    console.log(string);
    return obj
}


function fn2(url) {
    let obj = {}
    let index = url.indexOf('?') // 是否有 ？
    if (index === -1) return obj
    let string = url.slice(index + 1)
    let index2 = string.indexOf('#') // query 后是否跟着锚点
    if (index2 !== -1) {
        string = string.slice(0, index2)
    }
    let tempArr = string.split('&')
    tempArr.forEach(item => {
        if (item.includes('=')) {
            let [key, val] = item.split('=')
            if (obj[key]) {
                if (!Array.isArray(obj[key])) {
                    obj[key] = [obj[key]]
                }
                obj[key].push(val)
            } else {
                obj[key] = val
            }
        } else {
            obj[item] = true
        }
    });
    return obj
}
console.log(fn2('http://www.domain.com/#99999fsdjfjkaj?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&a=&enabled#999'));
console.log(fn2('http://www.domain.com/#99999fsdjfjkaj?enabled#'));