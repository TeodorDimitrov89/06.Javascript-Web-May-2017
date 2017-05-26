let allModules = require('../custom_modules/all-needed-modules')

let pathFile = allModules.path.normalize(allModules.path.join(__dirname, '../views/index.html'))
module.exports = (req, res) => {
  req.pathname = req.pathname || allModules.url.parse(req.url).pathname
  if (req.pathname === '/' && req.method === 'GET') {
    allModules.fs.readFile(pathFile, (err, data) => {
      if (err)allModules.errorHandler.throwError(err)
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}
