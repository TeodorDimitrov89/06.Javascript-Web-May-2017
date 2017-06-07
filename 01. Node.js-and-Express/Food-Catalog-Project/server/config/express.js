// Тука трябва да имам middlewares за проекта cookie, authorization,
// Допълнителните модули за аутентикацията
// Install Express Middleware
const path = require('path')
const express = require('express')
const stylus = require('stylus')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')
module.exports = (app, config) => {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(express.static(path.normalize(path.join(config.rootPath, '/public'))))
  app.set('view engine', 'pug')
  app.use(cookieParser())
  app.use(session({
    secret: 'se!@#$%@!&^%c#re@#$@!t*&^!@#$%',
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(stylus.middleware('/public'))
  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = req.user
    }
    next()
  })
  app.set('views', path.normalize(path.join(config.rootPath, 'server/views')))
  app.locals.basedir = app.get('views')
}
