let allModules = require('../custom_modules/all-needed-modules')
let favicon = '/favicon.ico'

module.exports = (req, res) => {
  req.pathname = req.pathname || allModules.url.parse(req.url).pathname
  if (req.pathname === favicon && req.method === 'GET') {
    allModules.fs.readFile('.' + favicon, (err, data) => {
      if (err) allModules.errorHandler.throwError(err)
      res.writeHead(200)
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}

