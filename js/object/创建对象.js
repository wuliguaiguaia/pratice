/* 创建对象的几种方式 */

/* 1、工厂模式 */

function createPerson(name, age) {
  let o = new Object()
  o.name = name;
  o.age = age;
  o.sayName = function () {
    console.log(this.name);
  }
  return o
}

let jon = createPerson('jon', 24)
// console.log(jon instanceof ...); // 不知道
/* 
  优点：解决了创建多个相似对象时，代码的复用问题
  缺点：使用工厂模式创建的对象，没有解决对象识别的问题（就是怎样知道一个对象的类型是什么）
*/


/* 2、构造函数模式 */

function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = () => {
    console.log(this.name);
  }
  return this
}

let we = new Person('we', 24)
we.sayName()
console.log(we instanceof Person);

/* 
  优点：解决了类型识别问题
  缺点：如果构造函数里有对象的话，没实例化一遍，都会重新创建一遍，造成内存浪费
*/

/* 3、原型模式 */

function People() {

}
People.prototype.name = "alias"
People.prototype.sayName = function() {
  console.log(this.name);
}
let alias = new People()
alias.sayName()
/* 
  优点：解决了多次创建相同函数的问题，多个实例共用一组属性和方法
  缺点：属性问题
*/


/* 4、构造函数+原型 */

function Human(name, age) {
  this.name = name;
  this.age = age
}
Human.prototype = {
  constructor: Human,
  sayName() {
    console.log(this.name);
  }
}
let zhi = new Human('zhi', 26)
zhi.sayName()

/* 
  优点：
  缺点：由于使用了两种模式，因此对于代码的封装性来说不是很好。
*/

/* 5、动态原型模式 */

function Man(name, age) {
  this.name = name
  this.age = age
  if (typeof this.sayName !== 'function') {
    Man.prototype.sayName = function () {
      console.log(this.name);
    }
  }
}
let man = new Man('ll', 24)
man.sayName()

/* 6、寄生构造函数模式 */

function NewNumber(number) {
  let o = new Number(number)
  o.number = number
  o.valueOf = function () {
    return o.number++
  }
  return o
}

let x = new NewNumber(1)
console.log(x == 1); // true
console.log(x == 2); // true

/* 
  相对于工厂函数，使用了 new
  优势：一般使用在 基于已有类型进行扩展，不会污染原始类型
  缺点：类型问题(没有this)
*/

/* 7、稳妥构造函数模式 */

/* function Hand(name, age) {
  let o = new Object()

  // 定义私有属性和方法
  o.sayName = function () {
    console.log(this.name);
  }
  return o
}
let d = Hand('fs', 12)
d.sayName()
 */


