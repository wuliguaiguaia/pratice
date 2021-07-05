/* 在控制台完整打印对象 */
const obj = {
  name: 'joe',
  age: 35,
  person1: {
    name: 'Tony',
    age: 50,
    person2: {
      name: 'Albert',
      age: 21,
      person3: {
        name: 'Peter',
        age: 23
      }
    }
  }
}

/* 1、console.log(JSON.stringify(obj, null, 2))
*/

/* 2、第 2 级之后的嵌套对象会被展平，这可能是复杂对象的问题。 */
require('util').inspect.defaultOptions.depth = null
console.log(obj)
