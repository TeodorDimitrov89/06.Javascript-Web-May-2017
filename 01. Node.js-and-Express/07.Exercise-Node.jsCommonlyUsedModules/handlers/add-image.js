let allModules = require('../custom_modules/all-needed-modules')
let pathFile = allModules.path.normalize(allModules.path.join(__dirname, '../views/add-image.html'))
let imageSave = require('../custom_modules/save-image')

module.exports = (req, res) => {
  req.pathname = req.pathname || allModules.url.parse(req.url).pathname
  if (req.pathname === '/add-image' && req.method === 'GET') {
    allModules.fs.readFile(pathFile, (err, data) => {
      if (err) allModules.errorHandler.throwError(err)
      // let acceptEncoding = req.headers['accept-encoding']
      // res.writeHead(200, {'Content-Encoding': 'gzip'})
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      data = data.toString()
      res.write(allModules.mustache.render(data, [], {menu: allModules.menu, style: allModules.style}))
      res.end()
    })
  } else if (req.pathname === '/add-image' && req.method === 'POST') {
    imageSave.saveImage(req, res)
  } else {
    return true
  }
}
