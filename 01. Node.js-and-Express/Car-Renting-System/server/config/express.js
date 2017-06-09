// TODO: Всякакви настройки на middleware, който ще се ползват
let express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
module.exports = (app, config) => {
  app.set('view engine', 'pug')
  app.set('views', path.normalize(path.join(config.rootPath, 'views')))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(session({ secret: 'someSecret@$#$%^&*^*@#', resave: false, saveUninitialized: false }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = req.user
    }
    next()
  })
  app.use((req, res, next) => {
    if (req.user) {
      res.locals.isAdmin = req.user.roles.indexOf('Admin') > -1
    }
    next()
  })
  app.use(express.static(path.normalize(path.join(config.rootPath, '/public'))))
  console.log('Express ready!')
}
