const allModules = require('../custom_modules/all-needed-modules')
const Product = require('../models/Product')
const Category = require('../models/Category')
let pathFile = allModules.path.normalize(allModules.path.join(__dirname, '../views/products/add.ejs'))
module.exports = (req, res) => {
  req.pathname = req.pathname || allModules.url.parse(req.url).pathname
  let continueWithNextHandle = false
  if (req.pathname === '/product/add' && req.method === 'GET') {
    allModules.fs.readFile(pathFile, (err, data) => {
      if (err) {
        allModules.errorHandler.error404(res, 'Page not Found!')
        return
      }
      Category
        .find()
        .then((category) => {
          res.writeHead(200, {'Content-Type': 'text/html'})
          data = data.toString()
          res.write(allModules.ejsTemplate.render(data, { categories: category }))
          res.end()
        })
    })
  } else if (req.pathname === '/product/add' && req.method === 'POST') {
    let form = new allModules.multiparty.Form()
    let product = {}
    form.on('part', (part) => {
      if (part.filename) {
        let fileName = allModules.shortid.generate()
        let filePath = allModules.path.normalize(allModules.path.join('./content/images', fileName + part.filename))
        let bodyFile = ''
        part.setEncoding('binary')
        part.on('data', (file) => {
          bodyFile += file
        })
        part.on('end', () => {
          product.image = filePath
          allModules.fs.writeFile(filePath, bodyFile, 'binary', (err) => {
            if (err) {
              allModules.errorHandler.throwError(err)
            }
          })
        })
      } else {
        let bodyFile = ''
        part.setEncoding('utf-8')
        part.on('data', (data) => {
          bodyFile += data
        })
        part.on('end', () => {
          product[part.name] = bodyFile
        })
      }
    })
    form.on('close', () => {
      Product
        .create(product)
        .then((insertedProduct) => {
          Category
            .findById(product.category)
            .then(category => {
              category.products.push(insertedProduct._id)
              category.save()
            })
          res.writeHead(302, {
            'Location': '/'
          })
          res.end()
        })
    })
    form.parse(req)
  } else {
    continueWithNextHandle = true
    return continueWithNextHandle
  }
}
