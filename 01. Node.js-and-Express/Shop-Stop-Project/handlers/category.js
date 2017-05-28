const allModules = require('../custom_modules/all-needed-modules')
const Category = require('../models/Category')

let pathFile = allModules.path.normalize(allModules.path.join(__dirname, '../views/category/add.ejs'))

module.exports = (req, res) => {
  req.pathname = req.pathname || allModules.url.parse(req.url).pathname
  let continueWithNextHandle = false
  if (req.pathname === '/category/add' && req.method === 'GET') {
    allModules.fs.readFile(pathFile, (err, data) => {
      if (err) {
        allModules.errorHandler.error404(res, 'Page not Found!')
        return
      }
      Category
        .find()
        .then(() => {
          res.writeHead(200, {'Content-Type': 'text/html'})
          res.write(data)
          res.end()
        })
    })
  } else if (req.pathname === '/category/add' && req.method === 'POST') {
    let body = ''
    req.on('data', (data) => {
      body += data
    })
    req.on('end', () => {
      let category = allModules.query.parse(body)
      Category
        .create(category)
        .then(() => {
          res.writeHead(302, {
            'Location': '/'
          })
          res.end()
        })
    })
  } else {
    continueWithNextHandle = true
    return continueWithNextHandle
  }
}
