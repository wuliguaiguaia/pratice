// 作为 JavaScript 中处理异常的一种标准方式
// 问题：try-catch 无法处理异步代码和一些其他场景
try {
  console.log('会执行');
  eee
  console.log('不会执行'); // 如果 try 块中的任何代码发生了错误，就会立即退出代码执行过程，然后执行 catch 块
} catch (error) {
  // 在错误发生时怎么处理
  console.log(error); // 此时 catch 块会接收到一个包含错误信息的对象，这个对象中包含的信息因浏览器而异，但共同的是有一个保存着错误信息的 message 属性。
  console.log(error.message);  // eee is not defined
}
console.log('依旧会执行');



function testFinally() {
  try {
    return "出去玩";
  } catch (error) {
    return "看电视";
  } finally {
    return "做作业"; // finally 子句一经使用，其代码无论如何都会执行
    // 只要代码中包含 finally 子句，则无论 try 或 catch 语句中包含什么代码——甚至是 return 语句，都不会阻止 finally 子句执行
  }
  return "睡觉";
}

console.log(testFinally()); // 做作业，导致 try 块里的 return 语句被忽略



// 1、 捕捉 TypeError
class People {
  constructor(name) {
    this.name = name;
  }
  sing() {}
}
const xiaoming = new People("小明");
try {
  xiaoming.dance(); // 抛出 TypeError
  xiaoming.girlfriend.name; // 抛出 TypeError
} catch (e) {
  console.log(e);
}

// 2、无法捕捉 SyntaxError，但还是有漏网之鱼
/* try {
  #
} catch(error) {
  console.log(error);
} */
// 运行结果
// Uncaught SyntaxError: Invalid or unexpected token

try {
  JSON.parse('{name:xiaoming}');      // 漏网之鱼：Uncaught SyntaxError: Unexpected token n in JSON at position 1
  // var testFunc () => { };     // 无法捕捉：Uncaught SyntaxError: Unexpected token '('
} catch (e) {
  console.log('漏网之鱼', e);
}

// 使用 JSON.parse 解析时出现异常就是一个很好的使用 try-catch 的场景：

// 3、异步错误
try {
  setTimeout(() => {
    // e    // 无法捕获 Uncaught ReferenceError: e is not defined
            // 并没有捕获到异常，try-catch 对【语法】和【异步错误】却无能为力，捕获不到，这是需要我们特别注意的地方。
  }, 10);
} catch (e) {
  console.log(e,'async');
}



