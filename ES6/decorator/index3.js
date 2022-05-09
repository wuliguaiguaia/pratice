// 类没有 descriptor, 只有属性有
// 修改类的行为 改变target，修改属性的行为，修改 descriptor

class MyTestableClass {
  @readonly
  name = {}
}
 
function readonly(target, name, descriptor) {
  target.vv = 0 // 无效
  return target
  console.log(target, name, descriptor);
  descriptor.writable = false;
  return descriptor;
}


function test(target, name, descriptor) {
  target.name = 8888
  return target
}

console.log(MyTestableClass.vv);