/* JavaScript 继承的几种实现方式 */

/* 1、原型链继承 */
// 父方法
function SupperFunction(flag1) {
    this.flag1 = flag1;
}

// 子方法
function SubFunction(flag2) {
    this.flag2 = flag2;
}

// 父实例
var superInstance = new SupperFunction(true);

// 子继承父
SubFunction.prototype = superInstance;

// 子实例
var subInstance = new SubFunction(false);
// 子调用自己和父的属性
subInstance.flag1; // true
subInstance.flag2; // false

/*
  优点：
  缺点：包含引用类型的原型属性会被所有实例属性共享，容易造成属性的修改混乱。
       在创建子类型的实例时，不能向超类型的构造函数中传递参数。
*/


/* 2、借用构造函数 */
function SuperType() {
    this.colors = ['red', 'blue', 'green'];
}

function SubType() {
    SuperType.call(this); // 继承了 SuperType
}

var instance1 = new SubType();
instance1.colors.push('black');
console.log(instance1.colors); // "red,blue,green,black"

var instance2 = new SubType();
console.log(instance2.colors); // "red,blue,green"

/*
  优点：可以在子类型构造函数中向超类型构造函数添加参数
  缺点：和构造函数模式一样的问题，所有的方法都在构造函数中定义，因此就无法做到函数的复用。而且超类型的原型中定义的方法，对于子类型而言也是不可见的。
*/


/* 3、组合继承 */

function SuperType1(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

SuperType1.prototype.sayName = function () {
    console.log(this.name);
};

function SubType1(name, age) {
    // *****继承属性*****
    SuperType1.call(this, name);
    this.age = age;
}

//* ****继承方法*****
SubType1.prototype = Object.create(SuperType1.prototype); // 也可以是new SuperType1()
SubType1.prototype.constructor = SubType1;
//* ****继承方法*****
SubType1.prototype.sayAge = function () {
    console.log(this.age);
};

var instance1 = new SubType1('james', 9);
instance1.colors.push('black');
console.log(instance1.colors); // "red,blue,green,black"
instance1.sayName(); // "james"
instance1.sayAge(); // 9

var instance2 = new SubType1('kobe', 10);
console.log(instance2.colors); // "red,blue,green"
instance2.sayName(); // "kobe"
instance2.sayAge(); // 10

/* 4、原型式继承 */

function extend(o) {
    function F() { }
    F.prototype = o;
    return new F();
}

function Fn1(name) {
    this.name = name;
    this.sayName = function () {
        console.log(this.name);
    };
}

let o = new Fn1('sss');
let o2 = extend(o);
o2.sayName();


/* 6、寄生组合继承 */

function myExtends(subType, superType) {
    let prototype = Object.create(superType);
    prototype.constructor = subType;
    subType.prototype = prototype;
}

myExtends(SubType, SuperType);

/* http://cavszhouyou.top/JavaScript%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E4%B9%8B%E7%BB%A7%E6%89%BF.html */


function Super(name) {
    this.name = name;
}

function Sub(name, age) {
    Super.call(this, name);
    this.age = age;
}

Sub.prototype = Object.create(Super.prototype);
Sub.prototype.constructor = Sub;