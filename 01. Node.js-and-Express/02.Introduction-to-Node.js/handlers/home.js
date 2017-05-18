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
      let allProduct = database.getAll()
      if (queryData.query) {
        allProduct = allProduct.filter(prod => {
          if (prod.name.toLowerCase().indexOf(queryData.query.toLowerCase()) !== -1 || prod.description.toLowerCase().indexOf(queryData.query.toLowerCase()) !== -1) {
            return prod.name
          }
        })
      }
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.write(jsTemplate.render(data, {obj: allProduct}))
      res.end()
    })
  } else {
    continueWithNextHandler = true
    return continueWithNextHandler
  }
}
