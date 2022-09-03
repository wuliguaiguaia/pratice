// 函数柯里化指的是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。
/*
  function curry(???){
      ???
      return ???
  }
  var abc = function(a, b, c) {
    return [a, b, c];
  };

  var curried = curry(abc);

  curried(1)(2)(3);
  // => [1, 2, 3]

  curried(1, 2)(3);
  // => [1, 2, 3]

  curried(1, 2, 3);
  // => [1, 2, 3]
*/

// fn.length 可以拿到函数参数长度


// 参数固定
function curry(fn) {
    let len = fn.length;
    let originArgs = [...arguments].slice(1);
    return function (...args) {
        let curArg = originArgs.concat(args);
        if (curArg.length === len) {
            return fn(...curArg);
        } else {
            return curry(fn, ...curArg);
        }
    };
}

var abc = function (a, b, c) {
    return [a, b, c];
};

var curried = curry(abc);
console.log(curried(1)(2)(3));
console.log(curried(1, 2)(3));
console.log(curried(1, 2, 3));

// 参数不固定
// add(3)(4)(5)()

function curry2(fn) {
    let args = [];
    return function tempFn(...args1) {
        if (args1.length === 0) {
            let val = fn(...args);
            args = [];
            return val;
        } else {
            args = [...args, ...args1];
            return tempFn;
        }
    };
}

function add(...args) {
    return args.reduce((a, b) => a + b);
}

let addCurry = curry2(add);
console.log(addCurry(1)(2)(3)(4, 5)()); // 15
console.log(addCurry(1)(2)(3, 4, 5)()); // 15
console.log(addCurry(1)(2, 3, 4, 5)()); // 15