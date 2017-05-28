const homeHandler = require('../handlers/home')
const products = require('../handlers/product')
const category = require('../handlers/category')
const staticFiles = require('../handlers/static-files')
module.exports = [homeHandler, products, category, staticFiles]
