function copy(obj, map = new WeakMap()) {
  let type = Object.prototype.toString.call(obj).split(' ')[1].slice(0, -1).toLocaleLowerCase()
  let result
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
        let item = obj[key]
        if (item instanceof Object) {
          item = copy(item)
        }
        obj[key] = item
        return obj
      }, [])
    case 'object':
      result = {}
      if (map.get(obj)) {
        return map.get(obj)
      }
      map.set(obj, result)
      for (let key in obj) {
        result[key] = copy(obj[key], map)
      }
      return result
      break
    case 'set':
      break
    case 'map':
      break
    case 'function':
      break
    case 'symbol':
      return Object(Symbol.prototype.valueOf.call(obj))
      break
    case 'regexp':
      return Object(Symbol.prototype.valueOf.call(obj))
    default:
      return obj
  }
}
const target = Symbol(123)
console.log(target);
x = copy(target)
console.log(x);