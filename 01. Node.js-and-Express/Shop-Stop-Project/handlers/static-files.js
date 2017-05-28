const allModules = require('../custom_modules/all-needed-modules')

function getContentType (url) {
  let contentType = { 'Content-Type': 'text/plain' }
  if (url.endsWith('.css')) {
    contentType = { 'Content-Type': 'text/css' }
  } else if (url.endsWith('.html')) {
    contentType = { 'Content-Type': 'text/html' }
  } else if (url.endsWith('.ejs')) {
    contentType = { 'Content-Type': 'text/html' }
  }
  return contentType
}

module.exports = (req, res) => {
  req.pathname = req.pathname || allModules.url.parse(req.url).pathname
  let continueWithNextHandler = false
  if (req.pathname.startsWith('/content/') && req.method === 'GET') {
    let filePath = allModules.path.normalize(allModules.path.join(__dirname, `..${req.pathname}`))
    allModules.fs.readFile(filePath, (err, data) => {
      if (err) {
        allModules.errorHandler.error404(res, 'Resource not found!')
        return
      }
      let contentType = getContentType(req.pathname)
      res.writeHead(200, contentType)
      res.write(data)
      res.end()
    })
  } else {
    continueWithNextHandler = true
    return continueWithNextHandler
  }
}
