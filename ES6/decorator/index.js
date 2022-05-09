@testable // 修饰类
class MyTestableClass {
  @readonly
  name = 123

  set data(value) {
    this.name = value;
  }

}

function testable(target) {
  target.isTestable = true;
}

function readonly(target, name, descriptor) {
  descriptor.writable = false;
  return descriptor;
}
console.log(MyTestableClass.isTestable); // true

const test = new MyTestableClass()
test.name = 222
console.log(test.name); // 123


