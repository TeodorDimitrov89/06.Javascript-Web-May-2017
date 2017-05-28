const allModules = require('../custom_modules/all-needed-modules')
const jsTemplate = require('ejs')
const Product = require('../models/Product')

const filePath = allModules.path.normalize(allModules.path.join(__dirname, '../views/home/index.ejs'))
module.exports = (req, res) => {
  req.pathname = req.pathname || allModules.url.parse(req.url).pathname
  let continueWithNextHandler = false
  if (req.pathname === '/' && req.method === 'GET') {
    allModules.fs.readFile(filePath, (err, data) => {
      if (err) {
        allModules.errorHandler.error404(res, 'Page not Found!')
        return
      }
      let queryData = allModules.query.parse(allModules.url.parse(req.url).query)
      data = data.toString()
      Product
        .find()
        .then((products) => {
          if (queryData.query) {
            products = products.filter(
              p => p.name.toLowerCase().includes(queryData.query))
            // products = database.findByNameOrDescription(products, queryString)
          }
          res.writeHead(200, {'Content-Type': 'text/html'})
          res.write(jsTemplate.render(data, { obj: products }))
          res.end()
        }).catch(err => console.log(err))
    })
  } else {
    continueWithNextHandler = true
    return continueWithNextHandler
  }
}
