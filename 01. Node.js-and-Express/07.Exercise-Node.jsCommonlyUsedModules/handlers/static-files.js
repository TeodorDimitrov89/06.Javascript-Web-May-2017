let allModules = require('../custom_modules/all-needed-modules')
let getContentType = (url) => {
  let contentType = 'text/plain'
  if (url.endsWith('.css')) {
    contentType = 'text/css'
  } else if (url.endsWith('.js')) {
    contentType = 'application/javascript'
  } else if (url.endsWith('.html')) {
    contentType = 'text/html'
  } else {
    contentType = 'image/jpeg'
  }
  return contentType
}
let checkIfFileExtensionAllowed = (req) => {
  let isAllowed = false
  let allowedFileExtension = [
    '.css', '.html', '.js', '.jpg'
  ]
  for (let fileExtension of allowedFileExtension) {
    if (req.pathname.endsWith(fileExtension)) {
      isAllowed = true
    }
  }
  return isAllowed
}

module.exports = (req, res) => {
  req.pathname = req.pathname || allModules.url.parse(req.url).pathname
  allModules.fs.readFile('.' + req.pathname, (err, data) => {
    let isAllowedFolder = req.pathname.startsWith('/content')
    let isAllowedFileExtension = checkIfFileExtensionAllowed(req)
    if (err || !isAllowedFolder || !isAllowedFileExtension) {
      let message = 'folder or extension file not allowed'
      allModules.errorHandler.error404(res, message)
      return
    }
    let contentType = getContentType(req.pathname, allModules.database)
    res.writeHead(200, {
      'Content-Type': contentType
    })
    res.write(data)
    res.end()
  })
}
