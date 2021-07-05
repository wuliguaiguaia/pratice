function sayHello(person: string) {
  return 'Hello, ' + person;
}

let user = [0, 1, 2];
console.log(sayHello(user));
/* 即使编译报错，还是会生成编译结果 */