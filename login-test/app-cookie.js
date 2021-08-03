const express = require('express')
var cookieSession = require('cookie-session')
const app = express()
app.use(
  cookieSession({
    name: 'session',
    keys: [
      /* secret keys */
      'eee',
    ],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
)
// session.sig，它是一个 27 字节的 SHA1 签名，用以校验 session 是否被篡改，是 cookie 安全的又一层保障。

// Set-Cookie: session = eyJ0ZXN0IjoiaGV5In0 =; path = /; expires=Thu, 13 May 2021 11:54:04 GMT; httponly
// Set-Cookie: session.sig = QBoXofGvnXbVoA8dDmfD - GMMM6E; path = /; expires=Thu, 13 May 2021 11:54:04 GMT; httponly
// Cookie: session = eyJ0ZXN0IjoiaGV5In0 =; 
//         session.sig = QBoXofGvnXbVoA8dDmfD - GMMM6E

app.get('/', function (req, res) {
  req.session.isLogin = true
  res.json({
    wow: 'crazy',
  })
})

app.get('/xx', function (req, res) {
  if (req.session.isLogin) console.log('logn')
  console.log(req.session.isLogin);
  res.json({
    test: 'rrrr',
  })
})

app.listen(3005)

