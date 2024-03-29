var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')

var app = express()

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  })
)
// Set - Cookie: connect.sid = s % 3AGxLCgj4WkeXPBCu7Y_UqElwE3PHa6Wr2.6ug2ZIzmQE50o0hwPWjM8NtiZhoizwQUsZI3aPe9VhE; Path = /; HttpOnly

app.use(function (req, res, next) {
  if (!req.session.views) {
    req.session.views = {}
  }

  // get the url pathname
  var pathname = parseurl(req).pathname

  //count the views
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1

  next()
})

app.get('/foo', function (req, res, next) {
  res.json({
    session: req.session,
  })
})

app.get('/bar', function (req, res, next) {
  console.log(req.session.views);
  res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
})

app.listen(3002)
