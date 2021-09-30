# 错误处理

## 错误类型

### 七种错误类型

- Error：错误的基类，其他错误都继承自该类型
- EvalError：Eval 函数执行异常
- RangeError：数组越界
- ReferenceError：尝试引用一个未被定义的变量时，将会抛出此异常
  引用不存在的变量
- SyntaxError：语法解析不合理
- TypeError：类型错误，用来表示值的类型非预期类型时发生的错误: 
  调用不存在的函数，解构不是迭代器的对象
  [在变量中保存着意外类型时，或者在访问不存在的方法时，都会导致这种错误。错误的原因虽然多种多样，但归根结底还是由于在执行特定类型的操作时，变量的类型并不符合要求所致]
- URIError：以一种错误的方式使用全局 URI 处理函数而产生的错误

发生这些错误的时机 除了代码处理错误，还有可能是 接口处理错误，数据异常

### 其他错误

除了基本的错误类型，还有 资源加载错误，服务器/网络异常

## 不同程度的错误处理

[任何错误处理策略中最重要的一个部分，就是确定错误是否致命]

- 是否是致命的，会不会导致其他连带错误
- 后续的代码是否还可以执行，用户还能不能操作
- 是否需要将错误信息反馈给用户，提示用户如何处理该错误
- 是否需要进行数据上报


1、服务器异常导致【p1】：阻塞用户操作，弹窗提示“服务器异常，请稍后重试”，并提供刷新按钮
2、数据异常导致【p1】，阻塞用户操作，提示“服务器异常，请联系客服处理”，同时将错误上报，开发人员通过异常堆栈和埋点定位找到原因
3、如果解析错误属于预料之中，也有替代的默认值，可以使用默认值代替【容错处理】
  
## 错误捕获

- try-catch 可以捕获同步错误，无法捕获一些语法错误 和 异步错误
- window.onerror 可以捕捉同步和异步 事件处理器，但无法捕捉 资源错误、[promise 错误]
- addEventListener('error') 可以捕捉同步和异步 事件处理器，资源错误, 但无法捕捉 [promise 错误]
- vue 的 errorhanlder 和 react 的 componentDidCatch 只能捕捉到 框架的错误，提供组件信息，无法捕获异步和事件处理器的错误

  Vue.config.errorHandler = (err, vm, info) => {}
  // err: 错误信息 和堆栈
  // vm: 发生错误的组件
  // info: mounted hook ..

- axios 请求使用拦截器

1. 请求拦截器

```js
  axios.defaults.headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  axios.defaults.withCredentials = true;
  axios.interceptors.request.use(config => {
    if (config.method === 'post' && config.headers['content-type'] === 'application/json') {
      config.data = JSON.stringify(config.data)
    } else if (config.method === 'post' && config.headers['content-type'] !== 'multipart/form-data') {
      config.data = qs.stringify(config.data)
    }
    return config
  }, error => {
    return Promise.reject(error)
  })

  axios.interceptors.request.use((config) => {
    startTimestamp = (new Date()).getTime();
    if (loadingStack.length === 0) {
      Vue.startLoading(); // 开始loading
    }
    loadingStack.push(startTimestamp);
    return config;
  }, (error) => {
    Promise.reject(error);
  });
```

2. 响应拦截器

```js
  axios.interceptors.response.use((response) => {
    if (response.data) {
      showMessage(response);
      checkIsNeedLogin(response); // 检查是否要登录，根据状态码判断显示登录弹窗
    }
    if (loadingStack.length === 1) {
      Vue.endLoading(); // 结束 loading
    }
    loadingStack.pop();

    if (typeof response.data !== 'object') {
      throw new Error(`Url api response error, url: ${response.config.url}, params: ${JSON.stringify(response.config.params)}`);
    }
    return response;
  }, (error) => {
    Message.error('网络错误');
    if (loadingStack.length === 1) {
      Vue.endLoading();
    }
    loadingStack.pop();
    return Promise.reject(error);
  });
```

## 异常上报

### sentry

与构建系统结合，构建项目时自动生成 Sentry 项目，注入 Sentry 脚本
客服端注入 Sentry 客户端脚本后，按项目、页面等不同粒度配置告警事件的过滤规则
对接钉钉消息系统，将告警消息推送到订阅群
过滤接口错误和优化 Promise 错误上报信息
