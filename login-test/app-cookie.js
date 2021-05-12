const express = require('express')
var cookieSession = require('cookie-session')
const app = express()
app.use(
  cookieSession({
    name: 'session',
    keys: [
      /* secret keys */
      'key',
    ],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
)

// Set-Cookie: session = eyJ0ZXN0IjoiaGV5In0 =; path = /; expires=Thu, 13 May 2021 11:54:04 GMT; httponly
// Set-Cookie: session.sig = QBoXofGvnXbVoA8dDmfD - GMMM6E; path = /; expires=Thu, 13 May 2021 11:54:04 GMT; httponly
// Cookie: session = eyJ0ZXN0IjoiaGV5In0 =; session.sig = QBoXofGvnXbVoA8dDmfD - GMMM6E

app.get('/', function (req, res) {
  req.session.test = 'hey'
  res.json({
    wow: 'crazy',
  })
})

app.get('/xx', function (req, res) {
  res.json({
    test: 'rrrr',
  })
})

app.listen(3001)

