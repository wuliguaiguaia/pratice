### 监听

```js
fs.watch(bundleConfig.context,
  { 
    encoding: 'utf-8', 
    recursive: true  // 递归监听
  },
  (eventType, filename) => {
    console.log('hmr.....', 'eventType:', eventType, ', filename:', filename);
    eventType === "change" && main(bundleConfig)
  });
```

1、监听项目实际运行目录
2、监听配置文件，不用重新启动即可重新编译
3、文件类型区分，不用走一遍完整的编译过程
