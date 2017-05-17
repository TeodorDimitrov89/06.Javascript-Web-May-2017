const homeHandler = require('../handlers/home')
const products = require('../handlers/product')
const staticFiles = require('../handlers/static-files')
module.exports = [homeHandler, products, staticFiles]
