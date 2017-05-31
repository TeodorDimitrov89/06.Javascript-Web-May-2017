const fs = require('fs')
const url = require('url')
const path = require('path')
const multiparty = require('multiparty')
const query = require('querystring')
const errorHandler = require('./error-handler')
const allModules = {
  fs,
  url,
  path,
  errorHandler,
  multiparty,
  query
}

module.exports = allModules
