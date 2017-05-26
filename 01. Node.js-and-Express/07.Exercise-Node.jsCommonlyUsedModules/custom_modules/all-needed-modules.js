let fs = require('fs')
let url = require('url')
let path = require('path')
let mustache = require('mustache')
let database = require('../database/database')
let shortid = require('shortid')
let formidable = require('formidable')
let zlib = require('zlib')
let errorHandler = require('./error-Handler')

let menu = require('../custom_modules/menu')
let style = require('../custom_modules/style')

let allModules = {
  fs,
  url,
  path,
  mustache,
  database,
  errorHandler,
  shortid,
  formidable,
  zlib,
  menu,
  style
}

module.exports = allModules
