const url = require('url')
const fs = require('fs')
const path = require('path')
const jsTemplate = require('ejs')
const database = require('../config/database')
const query = require('querystring')
const filePath = path.normalize(path.join(__dirname, '../views/home/index.ejs')) // changed from .html to .ejs
module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname
  let continueWithNextHandler = false
  if (req.pathname === '/' && req.method === 'GET') {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log(err)
        res.writeHead(404)
        res.write('404 not found!')
        res.end()
        return
      }
      let queryData = query.parse(url.parse(req.url).query)
      data = data.toString()
      let allProduct = database.products.getAll()
      allProduct.then((products) => {
        products = JSON.parse(products) // I need to use JSON.Parse because in this time product is a buffer
        if (queryData.query) {
          let queryString = queryData.query
          products = database.findByNameOrDescription(products, queryString) // Filter product by name or description
        }
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(jsTemplate.render(data, {obj: products}))
        // data .ejs file. The products is the array of objects
        res.end()
      })
    })
  } else {
    continueWithNextHandler = true
    return continueWithNextHandler
  }
}
