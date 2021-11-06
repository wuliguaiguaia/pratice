let obj = {}
let count = 1
function getDouble(val) {
  return val * 2
}
double = getDouble(count)

Object.defineProperty(obj, 'count', {
  get() {
    return count
  },
  set(val) {
    count = val
    double = getDouble(val)
  }
})

// 修改
obj.count = 9
console.log(double)

// 删除
delete obj.count
console.log(double) // 18 无法拦截删除


console.log('------------------------');

let obj2 = {}
let obj2Proxy = new Proxy(obj2, {
  get(target, prop) {
    return target[prop]
  },
  set(target, prop, value) {
    target[prop] = value
    if (prop === 'count') {
      double = getDouble(value)
    }
  },
  deleteProperty(target, prop) {
    delete target[prop]
    if (prop === 'count') {
      double = NaN
    }
  }
})
obj2Proxy.count = 3
console.log(double)
delete obj2Proxy.count
console.log(double)


console.log('---------------------');

let _value1 = 1
double = getDouble(_value1)
let count1 = {
  get xx() {
    return _value1
  },
  set xx(val) {
    _value1 = val
    double = getDouble(_value1)
  },
  get ee() {
    return _value1
  },
  set ee(val) {
    _value1 = val
    double = getDouble(_value1)
  }
}
console.log(count1.ee, double) //  1 2
count1.ee = 2
console.log(count1.ee, double) // 2 4
count1.xx = 2
console.log(count1.xx, double) // 2 4