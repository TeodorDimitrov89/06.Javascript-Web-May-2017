/* eslint-disable no-trailing-spaces */
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

module.exports = (app, config) => {
  // Should set Default view Engine
  app.set('view engine', 'pug')
  app.set('views', path.normalize(path.join(config.rootPath, 'views')))
  
  // Configure middleware for parsing form data
  app.use(bodyParser.urlencoded({extended: true}))
  // Configure public folder
  app.use((req, res, next) => {
    if (req.url.startsWith('/content')) {
      req.url = req.url.replace('/content', '')
    }
    next()
  }, express.static(
    path.normalize(
      path.join(
        config.rootPath, 'content')
    )))
}
