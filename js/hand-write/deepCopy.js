/*

浅拷贝:
  将一个对象的属性值复制到另一个对象，如果有的属性的值为引用类型的话，
  那么会将这个【引用的地址】复制给对象，因此两个对象会有同一个引用类型的引用。
  可以使用 Object.assign 和展开运算符来实现。

深拷贝:
  相对浅拷贝而言，如果遇到属性值为引用类型的时候，它【新建一个引用类型】并将对应的值复制给它
  因此对象获得的一个新的引用类型而不是一个原有类型的引用。

  深拷贝对于一些对象可以使用 JSON 的两个函数来实现
  但是由于 JSON 的对象格式比 js 的对象格式更加严格
  所以如果属性值里边【出现函数或者 Symbol 类型的值时，会转换失败】
*/

/*
（1）JSON.stringify()
    原理就是利用JSON.stringify 将js对象序列化（JSON字符串），再使用JSON.parse来反序列化(还原)js对象。
    问题：拷贝的对象中如果有函数，undefined，symbol，当使用过JSON.stringify()进行处理之后，都会消失。
*/

// console.log(JSON.stringify({ a: function () { } })); // {} 函数消失


/*
（2）函数库lodash的_.cloneDeep方法
*/

// （3）手写

function deepClone(data) {
    const type = Object.prototype.toString.apply(data).slice(8, -1).toLowerCase();
    let res;
    switch (type) {
        case 'undefined':
        case 'null':
        case 'string':
        case 'boolean':
        case 'number':
            return data;
        case 'map':
            break;
        case 'set':
            break;
        case 'function':
            break;
        case 'array':
        case 'object':
            res = Array.isArray(data) ? [] : {};
            for (let i in data) {
                res[i] = deepClone(data[i]);
            }
    }
    return res;
}


let a = { a: 1, b: { c: 2 } };
let b = deepClone(a);
a.b = 1;
console.log(b);

function copy(obj, map = new WeakMap()) {
    let type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    let result;
    switch (type) {
        case 'number':
        case 'boolean':
        case 'string':
        case 'error':
        case 'date':
            const Ctor = obj.constructor;
            return new Ctor(obj);
        case 'array':
            return Object.keys(obj).reduce((res, key) => {
                obj[key] = copy(obj[key]);
                return obj;
            }, []);
        case 'object':
            result = {};
            if (map.get(obj)) {
                return map.get(obj);
            }
            map.set(obj, result);
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    result[key] = copy(obj[key], map);
                }
            }
            return result;
        case 'set':
            break;
        case 'map':
            break;
        case 'function':
            break;
        case 'symbol':
            return Object(Symbol.prototype.valueOf.call(obj));
        case 'regexp':
            break;
        default:
            return obj;
    }
}