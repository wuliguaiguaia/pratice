## 登录验证
### express-session
1、使用 express-session 将登录信息存储在服务端
2、使用 connect-redis 连接 redis 数据库

```js
  const redis = require('redis')
  const session = require('express-session')

  const RedisStore = require('connect-redis')(session)
  const redisClient = redis.createClient(
    config.redisServer.port,
    config.redisServer.host
  ) // 创建Redis客户端

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      saveUninitialized: false,
      secret: 'nest test',
      resave: false,
    })
  )
```
3、redis 配置 
```js
"redisServer": {
  "host": "127.0.0.1",
  "port": 6379
}
```

#### redis
Redis 通常被称为数据结构服务器，因为值（value）可以是字符串(String)、哈希(Hash)、列表(list)、集合(sets)和有序集合(sorted sets)等类型


### JWT