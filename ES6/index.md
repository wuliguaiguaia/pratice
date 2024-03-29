## 1. Iterator 和 for...of 循环

### 1.1 可迭代协议 与 迭代器协议
    https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols

### 1.2 为什么要有两个协议
    不可能知道一个特定的对象是否实现了迭代器协议，然而创造一个同时满足迭代器协议和可迭代协议的对象是很 容易的（就像下面的example所示）。这样做允许一个迭代器能被不同希望迭代的语法方式所使用。 因此，很少只实现迭代器协议而不实现可迭代协议。

### 1.3 都有哪些语法或特性，使用或实现了可迭代协议与迭代器协议
    for...of / ... / Array.from 使用了迭代器协议，自制？？？
    [] / Set / Map / generators 实现了Iterators

## 2. Generator函数与异步应用

### 2.1 基本用法
    ```
    function* liangpiGenerators() {
        console.log('和面之前');
        var a = yield '和面';
        console.log('和完面了');
        var b = yield '蒸';
        console.log('蒸完了');
        var cne = yield '切';
    }

    var handler = liangpiGenerators();
    console.log('handler', handler);
    handler.next();
    console.log('和面完成');
    handler.next();
    ```
### 2.2 next传递参数
```
function* liangpiGenerators() {
    console.log('和面之前');
    window.status = yield '和面';
    console.log('和完面了');
    var b = yield '蒸';
    console.log('蒸完了');
    var c = yield '切';
}

var handler = liangpiGenerators();
console.log('handler', handler);
handler.next();
console.log('和面完成');
handler.next('累');
```

### 2.3 用for...of迭代generators
```
function* liangpiGenerators() {
    console.log('和面之前');
    window.status = yield '和面';
    console.log('和完面了');
    var b = yield '蒸';
    console.log('蒸完了');
    var c = yield '切';
}
for (let item of liangpiGenerators()) {
    console.log('item:', item);
}
```

### 2.4 generators处理异步
```js
function buy(name, cb) {
    setTimeout(() => {
        cb && cb(null, 'content:' + name);
    }, 5);
}
buy('cai', function (err, content) {
    console.log('content', content);
});
```

### 2.5 封装异步处理函数
类似于co中的使用方式
```
const co = require('co');
const fetch = require('node-fetch');

co(function *() {
    const res = yield fetch('https://mcs.snssdk.com/v1/list?rdn=0.5130960891765854');
    const jsonRes = yield res.json();

    console.log("jsonRes:", jsonRes);
});
```


## 3. async函数
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function
### 3.1 基本用法
封装隐式的Promise行为，趋近于同步行为，实则为语法糖
```
async function buyAmountGenerators() {
    var caiContent = await buyPromise('cai');
    var paomianContent = await buyPromise('paomian' + caiContent);
    var shuanghuanglianContent = await buyPromise('shuanghuanglian' + paomianContent);
    return shuanghuanglianContent;
}
```

### 3.2 如何封装旧的函数以适应async/await语法
将error first风格的函数，封装为Promise形式的函数即可
```
function buy(name, cb) {
    setTimeout(() => {
        cb && cb(null, 'content:' + name);
    }, 5);
}
function buyPromise(name) {
    return new Promise((resolve, reject) => {
        buy(name, function (err, content) {
            if (err) {
                reject();
            }
            resolve(content);
        });
    });
}

async function buyAmountAsync() {
    var caiContent = await buyPromise('cai');
    var paomianContent = await buyPromise('paomian' + caiContent);
    var shuanghuanglianContent = await buyPromise('shuanghuanglian' + paomianContent);
    return shuanghuanglianContent;
}

buyAmountAsync().then(content => {
    console.log('content:::::::', content);
});
```

### 3.3 babel编译下的generators/async/await
```
看编译后的源码
generators -> 代码切割
async/await的原理还是老一套（generators）
```

### 3.4 优势t
比Promise优势
```
axios()
    .then(function () {
        new Promise(() => {
            reject();
        });
    })
    .then(function () {
        
    })
    .catch(function () {
        // 统一???!!!
    });
```

1. 对于流的控制，更加精细化
2. 直接简单的try-catch体验
3. 同步的书写体验


## 4. Proxy与Reflect用法

### 4.1 基本用法
```js
// obj.name
// obj.money
// obj.money = 100000000;
J 
```

```
// obj.money = 100000000;
var obj = {};
var proxiedObj = new Proxy({}, {
    get(target, key, receiver) {
        console.log('key:', key);
    },

    set(target, key, value, receiver) {
        console.log('key:', key, value);
    }
});
proxiedObj.asdasd = 1;
```

### 4.2 可撤销对象
```
var {proxy, revoke} = Proxy.revocable({}, {
    get(target, key, receiver) {
        console.log('key:', key);
    },

    set(target, key, value, receiver) {
        console.log('key:', key, value);
    }
});
revoke();
```

### 4.3 Reflect基本用法

### 4.4 在Vue3.0中的应用
    代理对象与处理对象部分的源码，使用的是Proxy，虽然使用的是TS，但是和ES6中的Proxy与Reflect一致


## 5. Decorators用法与注意事项

### 5.3 如何装饰类与方法
```
const itemFy = (target) => {
    console.log('target::::', target);
};

@itemFy
class MyComponent {
    render() {
        return '<div>内容</div>';
    }
}
```

### 5.4 babel编译下的Decorators


### 5.5 decorators与proxy的联系与区别
1. Decorators会更改原始对象，装饰是对于原油对象的修改
2. Proxy注重于“代理”，产生新的对象，而非对原始的修改

## 6. class语法
第二节课(面向对象)讲过，同学们可以自行回顾复习


## 7. babel配置与插件书写

### 7.1 babel中的术语

#### Presets
一系列配置的集合

#### polyfill（腻子）
补丁，用于兼容各个浏览器对于语法支持程度的不同，补充的方法或属性集合

#### plugin
现在，Babel 虽然开箱即用，但是什么动作都不做。它基本上类似于 const babel = code => code; ，将代码解析之后再输出同样的代码。如果想要 Babel 做一些实际的工作，就需要为其添加插件

### 7.2 babel-loader在webpack中的注意事项
webpack loader
babel-loader
babel-loader 6.0
babel-plugin-proposal-decorators
babel-preset-env

babel-loader 7.0 @babel/plugin-proposal-decorators

module: {
    use: {
        test: /\.js$/,
        loader: 'babel-loader'
    }
}